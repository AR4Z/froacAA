<?php

class Usuario_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }


    function get_usr_data($username) {

        $this->db->select('use_username, use_nombre, use_rol_id');
        $this->db->from('users');
        $this->db->where('use_username', $username);
        $query = $this->db->get();

        return $query->result_array();
    }

    // Metodo que obtiene los registros de un estudiante a partir de un nombre de usuario dado,
    // a partir de la tabla estudiante, rol y nivel educativo


    function get_all_usr_data($username) {
       $query = $this->db->query("select users.use_username, users.use_nombre, users.use_email, users.use_fecha_registro,users.use_apellido, use_rol.use_rol_nombre, use_rol.use_rol_id,
use_student.use_stu_datebirth, use_level.use_level, use_level.use_id_level, use_ls.use_ls_learningstyle, use_ls.use_ls_description
from users
inner join use_student on use_student.use_username=users.use_username
inner join use_level on cast(use_level.use_id_level as text)=use_student.use_stu_level
left join use_ls on use_ls.use_ls_id=use_student.use_ls_id
inner join use_rol on use_rol.use_rol_id=users.use_rol_id
where users.use_username='".$username."'");


        return $query->result_array();
    }

function get_all_data_adaptability_interfaz($username) {
    $query = $this->db->query("select use_pref_interfaz.use_username, use_pref_interfaz.cursor_size_id, use_pref_interfaz.color_cursor, use_pref_interfaz.trail_cursor_size_id, use_pref_interfaz.trail_cursor_color, use_pref_interfaz.invert_color_general, use_pref_interfaz.invert_color_image,
    use_pref_interfaz.contrast_colors_id, use_pref_interfaz.font_size, use_pref_interfaz.font_type_id, use_pref_interfaz.size_line_spacing, use_pref_interfaz.cursor_url
    from use_pref_interfaz
    inner join use_opts_contr_colors on use_opts_contr_colors.contrast_colors_id=use_pref_interfaz.contrast_colors_id
    inner join use_opts_cursor_size on use_opts_cursor_size.cursor_size_id=use_pref_interfaz.cursor_size_id
    inner join use_opts_font  on use_opts_font.font_type_id=use_pref_interfaz.font_type_id
    inner join use_opts_trail_cursor_size  on use_opts_trail_cursor_size.use_opt_trail_cursor_size_id=use_pref_interfaz.trail_cursor_size_id
    inner join users on users.use_username=use_pref_interfaz.use_username
    where use_pref_interfaz.use_username='".$username."'");

        return $query->result_array();
}

// este metodo se encarga de obtener las preferencias del usuario para usar el narrador
function get_all_data_adaptability_narrator($username) {
    $query = $this->db->query("select use_pref_narrator.use_username, use_pref_narrator.speed_reading, use_pref_narrator.pitch_id, use_pref_narrator.volume_id, use_pref_narrator.voice_gender_id, use_pref_narrator.links_id, use_pref_narrator.highlight_id,
    use_pref_narrator.speech_component_id, use_pref_narrator.reading_unit_id
    from use_pref_narrator
    inner join scales_pitch_volume on scales_pitch_volume.scale_id=use_pref_narrator.pitch_id
    inner join scales_pitch_volume AS spv  on spv.scale_id=use_pref_narrator.volume_id
    inner join gender_options  on gender_options.gender_id=use_pref_narrator.voice_gender_id
    inner join links_reading_opts on links_reading_opts.opt_link_id=use_pref_narrator.links_id
    inner join reading_units on reading_units.unit_id=use_pref_narrator.highlight_id
    inner join reading_units AS ru on ru.unit_id=use_pref_narrator.reading_unit_id
    inner join components_read_opts on components_read_opts.component_read_id=use_pref_narrator.speech_component_id
    inner join users on users.use_username=use_pref_narrator.use_username
    where use_pref_narrator.use_username='".$username."'");

    return $query->result_array();
}


// este metodo se encarga de obtener las preferencias del usuario para usar el screen reader
function get_all_data_adaptability_sr($username) {
    $query = $this->db->query("select use_pref_sr.use_username, use_pref_sr.speed_reading, use_pref_sr.pitch_id, use_pref_sr.volume_id, use_pref_sr.voice_gender_id, use_pref_sr.links_id
    from use_pref_sr
    inner join scales_pitch_volume on scales_pitch_volume.scale_id=use_pref_sr.pitch_id
    inner join scales_pitch_volume AS spv on spv.scale_id=use_pref_sr.volume_id
    inner join gender_options on gender_options.gender_id=use_pref_sr.voice_gender_id
    inner join links_reading_opts on links_reading_opts.opt_link_id=use_pref_sr.links_id
    inner join users on users.use_username=use_pref_sr.use_username
    where use_pref_sr.use_username='".$username."'");

    return $query->result_array();
}


// metodo que se encarga de obtener los colores en caso de que el usuario seleccione la opcion
// customized
function get_custom_colors($username) {
    $query = $this->db->query("select use_custom_colors.use_username, use_custom_colors.foreground_colour,
    use_custom_colors.background_colour, use_custom_colors.highlight_colour, use_custom_colors.link_colour
    from use_custom_colors
    inner join users on users.use_username=use_custom_colors.use_username
    where use_custom_colors.use_username='".$username."'");
    
    return $query->result_array();
}

    // Metodo que obtiene los registros del administrador a partir del nombre de usuario a partir de la tabla usuario

    function get_all_admin_data($username){
        $query = $this->db->query("select users.use_nombre, users.use_apellido, users.use_email, users.use_fecha_registro, use_rol.use_rol_nombre
from users inner join use_rol on use_rol.use_rol_id=users.use_rol_id
where users.use_username='".$username."'");

        return $query->result_array();
    }

    function save_score() {
        $query = $this->db->get_where('use_score', array('lo_id' => $this->input->post("lo_id"),
            'rep_id' => $this->input->post("rep_id"),"use_username" => $this->input->post("username")));
        if ($query->num_rows() == 0) {
            $data = array(
                "lo_id" => $this->input->post("lo_id"),
                "rep_id" => intval($this->input->post("rep_id")),
                "use_sco_score" => intval($this->input->post("score")),
                "use_sco_date" => date("j-m-y"),
                "use_username" => $this->input->post("username")
                );

            $this->db->insert('use_score', $data);
        } else {
            $data = array(
                "use_sco_score" => intval($this->input->post("score")),
                "use_sco_date" => date("j-m-y"),
                );

            $this->db->where('lo_id', $this->input->post("lo_id"));
            $this->db->where('use_username', $this->input->post("username"));
            $this->db->update('use_score', $data);
        }
    }

    function get_rol($username) {
    	$this->db->select('use_rol_id');
    	$this->db->from('users');
    	$this->db->where('use_username', $username);
    	$this->db->limit(1);

    	$query = $this->db->get();

    	if ($query->num_rows() == 1) {
    		return $query->result_array();
    	} else {
    		return false;
    	}
    }


    // Metodo que verifica si un nombre de usuario dado existe en la base de datos

    function verify_username($username) {
        $this->db->where('use_username', $username);
        $query = $this->db->get('users');
        return $query->num_rows();
    }

    // Metodo que guarda los registros a partir de la creación de una cuenta por parte del administrador.

    public function guardar_usuario() {

        $data = array(
         "use_username"        =>  $this->input->post("username"),
         "use_nombre"          =>  $this->input->post("nombre"),
         "use_apellido"        =>  $this->input->post("apellidos"),
         "use_clave"           =>  md5($this->input->post("passwd2")),
         "use_email"           =>  $this->input->post("mail"),
         "use_fecha_registro"  =>  date("Y-m-d"),
         "use_rol_id"          =>  $this->input->post("rol"),
         );
        $this->db->insert('users', $data);
    }

    // Cuando un usuario (estudiante) se registra, la información se guarda en la tabla
    // de usuario: "users" y en la tabla del estudiante: "use_student"

    public function guardar_estudiante() {

        $today = date("Y-m-d");

/*
ESTAS CANTIDADES SON LAS QUE DEBERIAN LLEGAR DESDE EL CONTROLADOR
cantidad1
cantidad2
cantidad3
cantidad4
cantidad5
cantidad6*/

if ($this->input->post('result_test')!='') {
    $result_test = $this->input->post('result_test');
}else{
    $result_test = null;
}

if ($this->input->post('cantidad1')!='') {
    $cantidad1 = $this->input->post('cantidad1');
}else{
    $cantidad1 = null;
}

if ($this->input->post('cantidad2')!='') {
    $cantidad2 = $this->input->post('cantidad2');
}else{
    $cantidad2 = null;
}

if ($this->input->post('cantidad3')!='') {
    $cantidad3 = $this->input->post('cantidad3');
}else{
    $cantidad3 = null;
}

if ($this->input->post('cantidad4')!='') {
    $cantidad4 = $this->input->post('cantidad4');
}else{
    $cantidad4 = null;
}

if ($this->input->post('cantidad5')!='') {
    $cantidad5 = $this->input->post('cantidad5');
}else{
    $cantidad5 = null;
}

if ($this->input->post('cantidad6')!='') {
    $cantidad6 = $this->input->post('cantidad6');
}else{
    $cantidad6 = null;
}


        $data = array(
            'use_username' => $this->input->post('username'),
            'use_stu_datebirth' => $today,
            'use_ls_id' => $result_test,
            'use_stu_level' => $this->input->post('nevel_ed'),
            'use_ls_cant_V' => $cantidad1,
            'use_ls_cant_A' => $cantidad2,
            'use_ls_cant_R' => $cantidad3,
            'use_ls_cant_K' => $cantidad4,
            'use_ls_cant_G' => $cantidad5,
            'use_ls_cant_S' => $cantidad6,
            'use_etnica' => $this->input->post('etnica'),
            'use_institution'=> $this->input->post('institution_username'),
            'use_adapta_interfaz_id'=> $this->input->post('personaliceInterfaz'),
            'use_narrator_id'=>$this->input->post('useNarrator'),
            'use_screen_reader_id'=>$this->input->post('useSr'),
        );
        $data2 = array(
            'use_username' => $this->input->post('username'),
            'use_nombre' => $this->input->post('nombre'),
            'use_apellido'=>  $this->input->post('apellidos'),
            'use_clave' => md5($this->input->post('passwd')),
            'use_email' => ($this->input->post('mail')),
            'use_fecha_registro' => $today,
            'use_rol_id'=> 2,
        );

        $this->db->insert('users', $data2);
        $this->db->insert('use_student', $data);
    }

    public function insertaAdaptaciones($username, $optInterfaz, $optNarrator, $optScreenReader, $dataInterfaz, $dataNarrator, $dataScreenReader){
        // en caso de que el usuario requiera o desee usar las adaptaciones de forma opcional entonces
        // se agregara a la tabla de preferencias de interfaz
        if($optInterfaz == 1 || $optInterfaz == 2){
            $this->usuario_model->insert_pref_interfaz($username, $dataInterfaz);
        }

        // en caso de que el usuario requiera o desee usar el narrador de forma opcional entonces
        // se agregara a la tabla de preferencias de narardor
        if($optNarrator == 1 || $optNarrator == 2){
            $this->usuario_model->insert_pref_narrator($username, $dataNarrator);
        }

        // en caso de que el usuario requiera o desee usar el screen reader de forma opcional entonces
        // se agregara a la tabla de preferencias de screen reader
        if($optScreenReader == 1 || $optScreenReader == 2){
            $this->usuario_model->insert_pref_sr($username, $dataScreenReader);
        }
    }

    // almacena los valores para adaptar la interfaz
    public function insert_pref_interfaz($id, $data){
        if(!($this->usuario_model->alreadyExists($id, 'use_pref_interfaz'))){
            if(!$data['prefInterfaz']){
                // valores por default
                $data['prefInterfaz'] = array(
                    'use_username' => $id,
                );
            }
            if(!$data['customColors']){
                $data['customColors'] = array(
                    'use_username' => $id,
                );
            }
            $this->db->insert('use_pref_interfaz', $data['prefInterfaz']);
            $this->insert_custom_colors($id, $data['customColors']);
        }
    }

    // almacena los colores seleccionados por el usuario en la opcion customized
    public function insert_custom_colors($id, $data){
        if(!($this->usuario_model->alreadyExists($id, 'use_custom_colors'))){
            if(!$data){
                // valores por default
                $data = array(
                    'use_username' => $id,
                );
            }
            $this->db->insert('use_custom_colors', $data);
        }
    }

    // almacena los valores para usar el narrador
    public function insert_pref_narrator($id, $data){
        if(!($this->usuario_model->alreadyExists($id, 'use_pref_narrator'))){
            if(!$data){
                // valores por default
                $data = array(
                    'use_username' => $id,
                );
            }
            $this->db->insert('use_pref_narrator', $data);
        }
    }

    // almacena los valores para usar el screen reader
    public function insert_pref_sr($id, $data){
        if(!($this->usuario_model->alreadyExists($id, 'use_pref_sr'))){
            if(!$data){
                // valores por default
                $data = array(
                    'use_username' => $id,
                );
            }
            $this->db->insert('use_pref_sr', $data);
        }

    }

    //Guarda cada una de las preferencias del estudiante en la tabla "use_pre_stu"

    public function insert_pref($pref, $id) {

        $data = array(
            'use_pre_id' => $pref,
            'use_username' => $id
        );
        $this->db->insert('use_pre_stu', $data);
    }

    //Guarda cada una de las discapacidades del estudiante en la tabla "use_dissability_stu"

    public function insert_dissability($dissability, $id) {

        $data = array(
            'use_dissability_id' => $dissability,
            'use_username' => $id,
        );
        $this->db->insert('use_dissability_stu', $data);
    }
    //Si el usuario tiene una NEED se actualiza

    public function has_need($username){
        $data = array("use_username" => $username);
        $this->db->insert("use_need", $data);
    }

    public function update_has_need($username,$need_vision, $need_visiondescri, $need_audicion, $need_audiciondescri,
                                    $need_motriz, $need_motrizdescri, $need_coginitiva, $need_cognitivatexto,
                                    $need_cognitivainstru, $need_cognitivaconcentra)
    {
        $data = array(
            "use_need_vision" => $need_vision,
            "use_need_visiondescri"=> $need_visiondescri,
            "use_need_audicion" => $need_audicion,
            "use_need_audiciondescri" => $need_audiciondescri,
            "use_need_motriz" => $need_motriz,
            "use_need_motrizdescri" => $need_motrizdescri,
            "use_need_cognitiva" => $need_coginitiva,
            "use_need_cognitivatexto" => $need_cognitivatexto,
            "use_need_cognitivainstru" => $need_cognitivainstru,
            "use_need_cognitivaconcentr" => $need_cognitivaconcentra);

        $this->db->where("use_username", $username);
        $this->db->update('use_need', $data);

    }

    // me dice si un usuario necesita adaptar la interfaz o no
    public function get_need_adapta_interfaz($username){

        $this->db->select('use_adapta_interfaz_id');
    	$this->db->from('use_student');
    	$this->db->where('use_username', $username);
        $this->db->limit(1);
    	$query = $this->db->get();


        return $query->result_array();

    }

    // me dice si un usuario necesita usar el narrador
    public function get_need_narrator($username){
        $this->db->select('use_narrator_id');
        $this->db->from('use_student');
        $this->db->where('use_username', $username);
        $this->db->limit(1);
        $query = $this->db->get();

        return $query->result_array();
    }

    // me dice si un usuario necesita usar el screen reader
    public function get_need_sr($username){
        $this->db->select('use_screen_reader_id');
        $this->db->from('use_student');
        $this->db->where('use_username', $username);
        $this->db->limit(1);
        $query = $this->db->get();

        return $query->result_array();
    }

    public function alreadyExists($username, $typeAdapt){
        $this->db->from($typeAdapt);
        $this->db->where('use_username',$username);
        $query = $this->db->get();
        return $query->num_rows() == 1;
    }

    // Se obtienen los registros de las preferencias que hay en la tabla "use_preference"

    public function get_preferencias() {

        $query = $this->db->get('use_preference');

        return $query->result();
    }

    // Se obtienen los registros de las discapacidades que hay en la tabla "use_dissabilities"

    public function get_dissabilities() {

        $query = $this->db->get('use_dissabilities');

        return $query->result();
    }
    // Se obtienen los registros de las preferencias que hay en la tabla "use_level"

    public function get_nivel_educativo() {


        $query = $this->db->get('use_level');

        return $query->result();
    }

    // se obtienen las opciones para activar la personalización de la interfaz, el narrador y el lector de pantalla
    public function get_opts_adapta(){
        $query = $this->db->get('options_use');
        return $query->result();
    }
    //Metodo que selecciona las preferencias de un estudiante dado

    public function get_preferencia_est($user) {
        $this->db->select('*');
        $this->db->from('use_pre_stu');
        $this->db->where('use_username', $user);
        $this->db->join('use_preference', 'use_pre_stu.use_pre_id = use_preference.use_pre_id');
        $query = $this->db->get();
        return $query->result();
    }

    public function get_discapacidad_est($user) {
       $this->db->select('*');
       $this->db->from('use_dissability_stu');
       $this->db->where('use_username', $user);
       $this->db->join('use_dissabilities', 'use_dissability_stu.use_dissability_id = use_dissabilities.use_dissability_id');
       $query = $this->db->get();
       return $query->result();
   }

    public function update_user($username){
        $optInterfaz = $this->input->post('personaliceInterfaz');
        $optNarrator = $this->input->post('useNarrator');
        $optScreenReader = $this->input->post('useSr');

        $data1 = array(
            "use_nombre"          =>  $this->input->post("nombre"),
            "use_apellido"        =>  $this->input->post("apellidos"),
            "use_email"           =>  $this->input->post("mail"),
            "use_rol_id"          =>  $this->input->post("tipoU"),
        );
        $data2 = array(
            "use_stu_level"       =>  $this->input->post("nevel_ed"),
            "use_stu_datebirth"       =>  $this->input->post("fecha_nac"),
            "use_adapta_interfaz_id" => $optInterfaz,
            "use_narrator_id" => $optNarrator,
            "use_screen_reader_id" => $optScreenReader,
        );

        // actualiza las adaptaciones que el usuario requiere
        // por ejemplo: si el usuario ya necesita el screen reader
        $this->usuario_model->insertaAdaptaciones($username, $optInterfaz, $optNarrator, $optScreenReader, NULL, NULL, NULL);

        $this->db->where('use_username', $username);
        $this->db->update('users', $data1);
        $this->db->where('use_username', $username);
        $this->db->update('use_student', $data2);
    }

    // este metodo se encarga de actualizar las preferencias a la hora de adaptar la interfaz en la DB tabla: "use_pref_interfaz"
    public function update_preferences_interfazDB($username, $data){
        $this->db->where('use_username', $username);
        $this->db->update('use_pref_interfaz', $data);
    }

    // este metodo se encarga de actualizar los colores para la seleccion customized
    public function update_custom_colors($username, $data){
        $this->db->where('use_username', $username);
        $this->db->update('use_custom_colors', $data);
    }

    // este metodo se encarga de actualizar las preferencias a la hora de usar el narrador en la DB tabla: "use_pref_narrator"

    public function update_preferences_narratorDB($username, $data){
        $this->db->where('use_username', $username);
        $this->db->update('use_pref_narrator', $data);
    }

    // este metodo se encarga de actualizar las preferencias a la hora de usar el lector de pantalla en la DB tabla: 'use_pref_sr'
    public function update_preferences_srDB($username, $data){
        $this->db->where('use_username', $username);
        $this->db->update('use_pref_sr', $data);
    }

    //Se verifica si el correo electrónico ingresado existe en la base de datos

    function verify_email($mail){
        $this->db->where('use_email', $mail);
        $query = $this->db->get('users');
        return $query->num_rows();
    }


    public function get_rol_data() {

        // Se obtienen los registros de los roles que hay en la tabla "use_rol"
        $query = $this->db->get('use_rol');

        return $query->result();
    }

    function verificar_passwd($passwd, $username){
        $this->db->select('use_clave');
        $this->db->from('users');
        $this->db->where('use_username', $username);
        $this->db->where('use_clave', $passwd);
        $this->db->limit(1);

        $query = $this->db->get();

        return $query->num_rows();
    }

    function actualizar_passwd($passwd, $username){

        $data = array(
            "use_clave"          =>  $passwd
        );
        $this->db->where('use_username', $username);
        $this->db->update('users', $data);

    }

    function get_score(){
        $query = $this->db->get_where('use_score', array('lo_id' => $this->input->post("lo_id"),
            'rep_id' => $this->input->post("rep_id"), 'use_username' => $this->input->post("username") ));

        return $query->result_array();
    }

    /*
    function update_test($estilo,$cant_V,$cant_A,$cant_R,$cant_K,$cant_G,$cant_S, $id) {

        $data = array(
            'use_ls_id' => $estilo
            'use_ls_cant_V' => $cant_V
            'use_ls_cant_R' => $cant_R
            'use_ls_cant_A' => $cant_A
            'use_ls_cant_K' => $cant_K
            'use_ls_cant_G' => $cant_G
            'use_ls_cant_S' => $cant_S
        );

        $this->db->where('use_username', $id);
        $this->db->update('use_student', $data);
    }



*/




}
