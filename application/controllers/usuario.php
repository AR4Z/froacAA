<?php

//Clase Usuario, encargada de todas las operaciones y
//metodos de los usuarios.

class Usuario extends CI_Controller {


    //Metodo constructor de la clase
    public function __construct() {
        parent::__construct();
        $this->load->model("usuario_model");//Import al modelo de la clase
        $this->load->model("lo_model");//Import al modelo lo_model
    }

    //Metodo para obtener datos basicos del usuario
    public function get_usr_data($username) {
        $this->load->view('base/login_view');
    }

///metodo que carga la vista acerca
    public function acerca() {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $rol = $this->usuario_model->get_rol ( $session_data ['username'] );
            if ($rol [0] ['use_rol_id'] == 2) {
                $content = array(
                "main_view" => "shared_views/acerca_view",
                "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                "encabezado" => "Acerca de",
                "url" => "usuario/acerca/",
                'id_view'=> 'aboutFROAC'
                );

        $this->load->view('base/est_template', $content);
    }
    else{
        $content = array(
                "main_view" => "shared_views/acerca_view",
                "encabezado" => "Acerca de",
                "url" => "usuario/acerca/",
                'id_view'=> 'aboutFROAC'
                );

        $this->load->view('base/base_template', $content);

    }
} else {
            $content = array(
                "main_view" => "shared_views/acerca_view",
                "encabezado" => "Acerca de",
                "url" => "usuario/acerca/",
                'id_view'=> 'aboutFROAC'
                );

        $this->load->view('base/base_template', $content);
        }
    }

//metodo que carga el test de estilos de aprendizaje

    public function estilos() {
        $content = array(
            "main_view" => "shared_views/estilos_view",
                "encabezado" => "Test Estilos de Aprendizaje",
                "url" => "usuario/estilos/"
        );
        $this->load->view('base/est_template', $content);
    }

//metodo que carga el equipo de trabajo de froac
    public function equipo() {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $rol = $this->usuario_model->get_rol ( $session_data ['username'] );
            if ($rol [0] ['use_rol_id'] == 2) {
                $content = array(
                "main_view" => "shared_views/equipo_view",
                "encabezado" => "Equipo FROAC",
                "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                "url" => "usuario/equipo/",
                'id_view'=> 'teamFROAC'
            );
                $this->load->view('base/est_template', $content);
    }
    else{
        $content = array(
                "main_view" => "shared_views/equipo_view",
                "encabezado" => "Equipo FROAC",
                "url" => "usuario/equipo/",
                'id_view'=> 'teamFROAC'
            );
                $this->load->view('base/base_template', $content);

    }
} else {
            $content = array(
                "main_view" => "shared_views/equipo_view",
                "encabezado" => "Equipo FROAC",
                "url" => "usuario/equipo/",
                'id_view'=> 'teamFROAC'
            );
                $this->load->view('base/base_template', $content);
        }
    }



    public function glosario() {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $rol = $this->usuario_model->get_rol ( $session_data ['username'] );
            if ($rol [0] ['use_rol_id'] == 2) {
                $content = array(
                "main_view" => "shared_views/glosario_view",
                "encabezado" => "Glosario",
                "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                "url" => "usuario/glosario/",
                'id_view'=> 'glossary'
            );
                $this->load->view('base/est_template', $content);
    }
    else{
        $content = array(
                "main_view" => "shared_views/glosario_view",
                "encabezado" => "Glosario",
                "url" => "usuario/glosario/",
                'id_view'=> 'glossary'
            );
                $this->load->view('base/base_template', $content);

    }
} else {
             $content = array(
                "main_view" => "shared_views/glosario_view",
                "encabezado" => "Glosario",
                "url" => "usuario/glosario/",
                'id_view'=> 'glossary'
            );
                $this->load->view('base/base_template', $content);
        }
    }

    //Metodo que carga la pagina de inicio de sesión
    public function login() {
      if($this->session->userdata('logged_in')) {
        redirect(base_url(), 'refresh');
      } else {
        $this->load->view('base/login_view');
      }
    }

    //Metodo para crear una nueva cuenta
    public function registro(){
        if ($this->session->userdata('logged_in')) {
            redirect(base_url(), 'refresh');//Definir que pasa si ya esta loggeado
        } else {
            $content = array(
                "preferencias" => $this->usuario_model->get_preferencias(),
                "diversity_profiles" => $this->usuario_model->get_diversity_profiles(),
                "nivel_educativo" => $this->usuario_model->get_nivel_educativo(),
                'optsAdapta' => $this->usuario_model->get_opts_adapta(),
                "main_view" => "register/registro_view",
                'id_view'=> 'create-account'
            );
            $this->load->view('base/base_template', $content);
        }
    }

    public function busqueda(){
        if ($this->session->userdata('logged_in')) {
            redirect(base_url(), 'refresh');//Definir que pasa si ya esta loggeado
        } else {
            $content = array(
                "preferencias" => $this->usuario_model->get_preferencias(),
                "nivel_educativo" => $this->usuario_model->get_nivel_educativo(),
                "main_view" => "shared_views/busqueda_avanzada_view"
            );
            $this->load->view('base/base_template', $content);
        }
    }

    //Metodo que muestra el perfil del usuario.
    public function perfil() {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $rol = $this->usuario_model->get_rol ( $session_data ['username'] );
            if ($rol [0] ['use_rol_id'] == 1) {
                $content = array(
                    "user" => $session_data['username'],
                    "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                    "usr_all_data" => $this->usuario_model->get_all_admin_data($session_data['username']),
                    "main_view" => "admin/perfil_view",
                    "id_view" => "profile_user"
                );
                $this->load->view('base/admin_template', $content);
            } else {
                if ($rol [0] ['use_rol_id'] == 3) {
                    $content = array(
                        "user" => $session_data['username'],
                        "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                        "usr_all_data" => $this->usuario_model->get_all_admin_data($session_data['username']),
                        "main_view" => "admin/perfil_view",
                        "id_view" => "profile_user"
                    );
                    $this->load->view('base/rep_template', $content);
                }else {
                    $content = array(
                        "user" => $session_data['username'],
                        "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                        "usr_all_data" => $this->usuario_model->get_all_usr_data($session_data['username']),
                        "main_view" => "usr/perfil_view",
                        "id_view" => "profile_user"
                    );
                    $this->load->view('base/est_template', $content);
                }
            }

        } else {
            redirect(base_url(), 'refresh');
        }
    }


    /**
     * Esta función envía el correo electronico ingresado a la función "verify_email" de usuario_model
     * para verificar si ya existe en la base de datos
     */
     public function verify_email(){
        $_POST = json_decode(file_get_contents('php://input'), true);
        $email = $_POST['email'];
        $email = strtolower($email);
        $result = $this->usuario_model->verify_email($email);
        header('Content-Type: application/json');
        echo json_encode(array(
            'success' =>($result>=1),
        ));
    }

    // Método que guarda los datos de un usuario al ser registrado desde el administrador

    public function nuevo_usuario(){
        $session_data = $this->session->userdata('logged_in');
        if ($this->session->userdata('logged_in')) {
            if ($session_data ['username'] == "admin"){

                $content = array(
                    "main_view" => "admin/nuevo_user_view",
                    "user" => $session_data ['username'],
                    "usr_data" => $this->usuario_model->get_usr_data ( $session_data ['username'] ),
                    //"usuarios" => $this->repositorio_model->get_user_repo()
                    "rol" => $this->usuario_model->get_rol_data(),
                    "id_view" => "add_user"
                );
            }
            $this->load->view('base/admin_template', $content);
        }else {
            $this->lista();
        }
    }

    //Metodo que establece la calificación de los usuarios para cada
    //OA parametros cadena = "lo_id, rep_id, lo_score, username"
    function set_score(){

        $this->usuario_model->save_score();

    }

    function get_score(){
        $score = $this->usuario_model->get_score();
        echo $score[0]["use_sco_score"];
    }

    /**
     * Esta función envía el nombre de usuario ingresado a la función "verify_username" de usuario_model
     * para verificar si ya existe en la base de datos
     */
    public function verify_username(){
        $_POST = json_decode(file_get_contents('php://input'), true);
        $username = $_POST["username"];
        //echo $_POST;
        $username = strtolower($username);
        $result = $this->usuario_model->verify_username($username);
        header('Content-Type: application/json');
        echo json_encode(array(
            'success' => ($result>=1),
        ));
    }

    public function save_user(){

        $this->usuario_model->guardar_usuario();
        $this->login();

    }
/*
    public function xml_service(){

        $this->load->view('shared_views/xml_service');
    }


    public function search_service($params){
        $content = array(
            "main_view" => "shared_views/service_view",
                "encabezado" => "This XML file does not appear to have any style information associated with it. The document tree is shown below.",
                "url" => "usuario/search_service/"
                "metadatos"=> $this->usuario_model->get_metadatos($params);
        );
            $this->load->view('base/base_template', $content);
    }

*/
    public function editar_usr(){
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $rol = $this->usuario_model->get_rol ( $session_data ['username'] );
            if ($rol [0] ['use_rol_id'] == 1) {
                $content = array(
                    "user" => $session_data['username'],
                    "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                    "nivel_educativo" => $this->usuario_model->get_nivel_educativo(),
                    "usr_all_data" => $this->usuario_model->get_all_usr_data($session_data['username']),
                    "main_view" => "admin/perfil_view",
                    "id_view" => "edit_user"
                );
                $this->load->view('base/admin_template', $content);
            } else {
                // pregunto si el usuario necesita adaptaciones de la interfaz
                $use_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username']);
                $use_adapta_interfaz = $use_adapta_interfaz[0]["use_adapta_interfaz_id"];

                // pregunto si el usuario necesita usar narrador
                $use_narrator = $this->usuario_model->get_need_narrator($session_data['username']);
                $use_narrator = $use_narrator[0]['use_narrator_id'];

                // pregunto si el usuario necesita usar screen reader
                $use_sr = $this->usuario_model->get_need_sr($session_data['username']);
                $use_sr = $use_sr[0]['use_screen_reader_id'];

                // pregunto si el usuario necesita usar el traductor de español a lsc
                $use_LSCTraslator = $this->usuario_model->get_need_translator_lsc($session_data['username']);
                $use_LSCTraslator = $use_LSCTraslator[0]['use_traslator_lsc_id'];

                $use_structuralNav = $this->usuario_model->get_need_structural_nav($session_data['username']);
                $use_structuralNav = $use_structuralNav[0]['use_structural_nav_id'];

                $use_keyboard = $this->usuario_model->get_need_kb($session_data['username']);
                $use_keyboard = $use_keyboard[0]['use_kb_id'];

                $content = array(
                    "user" => $session_data['username'],
                    "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                    "nivel_educativo" => $this->usuario_model->get_nivel_educativo(),
                    "usr_all_data" => $this->usuario_model->get_all_usr_data($session_data['username']),
                    'optsAdapta' => $this->usuario_model->get_opts_adapta(),
                    'selectedOptInterfaz'=> $use_adapta_interfaz,
                    'selectedOptNarrator'=> $use_narrator,
                    'selectedOptScreenReader'=>$use_sr,
                    "selectedOptLSCTranslator"=>$use_LSCTraslator,
                    'selectedOptStructuralNav'=>$use_structuralNav,
                    'selectedOptKeyboard'=>$use_keyboard,
                    "main_view" => "usr/editar_view",
                    "id_view" => "edit_user"
                );
                $this->load->view('base/est_template', $content);
            }

        } else {
            redirect(base_url(), 'refresh');
        }
    }

    function update_user(){
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $this->usuario_model->update_user($session_data["username"]);
            // pregunto si el usuario necesita adaptaciones de la interfaz
            $use_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username']);
            $use_adapta_interfaz = $use_adapta_interfaz[0]["use_adapta_interfaz_id"];

            // pregunto si el usuario necesita usar narrador
            $use_narrator = $this->usuario_model->get_need_narrator($session_data['username']);
            $use_narrator = $use_narrator[0]['use_narrator_id'];

            // pregunto si el usuario necesita usar screen reader
            $use_sr = $this->usuario_model->get_need_sr($session_data['username']);
            $use_sr = $use_sr[0]['use_screen_reader_id'];


            $use_LSCTranslator = $this->usuario_model->get_need_translator_lsc($session_data['username']);
            $use_LSCTranslator = $use_LSCTranslator[0]['use_traslator_lsc_id'];

            $use_structuralNav = $this->usuario_model->get_need_structural_nav($session_data['username']);
            $use_structuralNav = $use_structuralNav[0]['use_structural_nav_id'];

            $use_keyboard = $this->usuario_model->get_need_kb($session_data['username']);
            $use_keyboard = $use_keyboard[0]['use_kb_id'];
            // actualizo valores sesion, desde alla son aztualizados en DB
            $this->loadPreferencesInSession($use_adapta_interfaz, $use_narrator, $use_sr, $use_LSCTranslator, $use_structuralNav, $use_keyboard);
            
            // redirecciono al perfil del usuario
            redirect(base_url().'usuario/perfil', 'refresh');
        } else {
            redirect(base_url(), 'refresh');
        }
    }

    public function get_data_interfaz(){
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_all_data_adaptability_interfaz($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_data_narrator(){
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_all_data_adaptability_narrator($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_data_screen_reader(){
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_all_data_adaptability_sr($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_data_structural_navigation(){
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_all_data_adaptability_sn($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_custom_colors() {
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_custom_colors($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_data_lsc_translator() {
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_all_data_adaptability_lsc_translator($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_data_virtual_keyboard() {
      $session_data = $this->session->userdata('logged_in');
      $result = $this->usuario_model->get_all_data_adaptability_keyboard($session_data['username']);
      header('Content-Type: application/json');
      echo json_encode( $result );
    }

    public function get_data_accessibility_bar(){
      $session_data = $this->session->userdata('logged_in');
      $data_accessibility_bar = array();
      $need_custom_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username'])[0]["adapta_interfaz_id"];
      $need_structural_nav = $this->usuario_model->get_need_structural_nav($session_data['username'])[0]['use_structural_nav_id']; 
      $need_narrator =  $this->usuario_model->get_need_narrator($session_data['username'])[0]['use_narrator_id']; 
      $need_screen_reader = $this->usuario_model->get_need_sr($session_data['username'])[0]['use_screen_reader_id'];
      $need_lsc_translator = $this->usuario_model->get_need_translator_lsc($session_data['username'])[0]['use_traslator_lsc_id'];
      $need_virtual_keyboard = $this->usuario_model->get_need_kb($session_data['username'])[0]['use_kb_id'];

      if($need_custom_interfaz == "1" || $need_custom_interfaz == "2"){
        $result = $this->usuario_model->get_all_data_adaptability_interfaz($session_data['username']);
        $data_accessibility_bar["data_custom_interfaz"] = $result[0];
        $data_accessibility_bar['data_custom_interfaz']['custom_colors'] = $this->usuario_model->get_custom_colors($session_data['username'])[0];
      }

      if($need_structural_nav == "1" || $need_structural_nav == "2"){
        $result = $this->usuario_model->get_all_data_adaptability_sn($session_data['username']);
        $data_accessibility_bar["data_structural_nav"] = $result[0];
      }

      if($need_narrator == "1" || $need_narrator == "2"){
        $result = $this->usuario_model->get_all_data_adaptability_narrator($session_data['username']);
        $data_accessibility_bar["data_narrator"] = $result[0];
      }

      if($need_screen_reader == "1" || $need_screen_reader == "2"){
        $result = $this->usuario_model->get_all_data_adaptability_sr($session_data['username']);
        $data_accessibility_bar["data_screen_reader"] = $result[0];
      }

      if($need_lsc_translator == "1" || $need_lsc_translator == "2"){
        $result = $this->usuario_model->get_all_data_adaptability_lsc_translator($session_data['username']);
        $data_accessibility_bar["data_lsc_translator"] = $result[0];
      }

      if($need_virtual_keyboard == "1" || $need_virtual_keyboard == "2"){
        $result = $this->usuario_model->get_all_data_adaptability_keyboard($session_data['username']);
        $data_accessibility_bar["data_virtual_keyboard"] = $result[0];
      }

      header('Content-Type: application/json');
      echo json_encode( $data_accessibility_bar );
    }
    // este metodo se encarga de cargar los valores de adaptabilidad y accesibilidad en sesion
    // despues de que hayan sido actualizados por el usuario
    public function loadPreferencesInSession($use_adapta_interfaz, $use_narrator, $use_sr, $use_LSCTranslator, $use_structuralNav, $use_keyboard){
        $session_data = $this->session->userdata('logged_in');

        // si el usuario necesita adaptaciones de la interfaz entonces lo almaceno en sesion y tambien sus preferencias
        if($use_adapta_interfaz == "1" || $use_adapta_interfaz == "2"){
            $this->session->set_userdata('need_custom_interfaz', true);
        } else {
            // en caso se que no necesite tambien lo almaceno en sesion
            $this->session->set_userdata('need_custom_interfaz', false);
        }

        // si el usuario necesita el narrador entonces lo almaceno en sesion y tambien sus preferencias
        if($use_narrator == "1" || $use_narrator == "2") {
            $this->session->set_userdata('need_narrator', true);
        } else {
            // en caso se que no necesite tambien lo almaceno en sesion
            $this->session->set_userdata('need_narrator', false);
        }

        // si el usuario necesita el screen reader entonces lo almaceno en sesion y tambien sus preferencias
        if($use_sr == "1" || $use_sr == "2") {
            $this->session->set_userdata('need_screen_reader', true);
        } else {
            // en caso se que no necesite tambien lo almaceno en sesion
            $this->session->set_userdata('need_screen_reader', false);
        }

        // si el usuario necesita el lsc traductor entonces lo almaceno en sesion y tambien sus preferencias
        if($use_LSCTranslator == "1" || $use_LSCTranslator == "2") {
            $this->session->set_userdata('need_lsc_translator', true);
        } else {
            // en caso se que no necesite tambien lo almaceno en sesion
            $this->session->set_userdata('need_lsc_translator', false);
        }


        // si el usuario necesita el lsc traductor entonces lo almaceno en sesion y tambien sus preferencias
        if($use_structuralNav == "1" || $use_structuralNav == "2") {
            $this->session->set_userdata('need_structural_nav', true);
        } else {
            // en caso se que no necesite tambien lo almaceno en sesion
            $this->session->set_userdata('need_structural_nav', false);
        }

        if($use_keyboard == "1" || $use_keyboard == "2") {
            $this->session->set_userdata('need_virtual_keyboard', true);
        } else {
            // en caso se que no necesite tambien lo almaceno en sesion
            $this->session->set_userdata('need_virtual_keyboard', false);
        }

    }

    // este metodo se encarga de actualizar los valores de adaptacion de la interfaz en la sesion
    // para que luego sean actualizados en la db
    public function update_interface_preferences(){
        $session_data = $this->session->userdata('logged_in');
        $_POST = json_decode(file_get_contents('php://input'), true);
        $this->usuario_model->update_preferences_interfazDB($session_data['username'], $_POST['preferencesInterface']);
    }

    public function update_custom_colors(){
        $session_data = $this->session->userdata('logged_in');
        $_POST = json_decode(file_get_contents('php://input'), true);
        $this->usuario_model->update_custom_colors($session_data['username'], $_POST['customColors']);
    }

    // este metodo se encarga de actualizar los valores del narrador en la sesion
    // para que luego sean actualizados en la db
    public function update_narrator_preferences(){
        $session_data = $this->session->userdata('logged_in');
        $_POST = json_decode(file_get_contents('php://input'), true);
        $this->usuario_model->update_preferences_narratorDB($session_data['username'], $_POST['preferencesNarrator']);  
    }

    // este metodo se encarga de actualizar los valores del screen reader en la sesion
    // para que luego sean actualizados en la db
    public function update_screen_reader_preferences(){
      $session_data = $this->session->userdata('logged_in');
      $_POST = json_decode(file_get_contents('php://input'), true);
      $this->usuario_model->update_preferences_srDB($session_data['username'], $_POST['preferencesScreenReader']);  
    }

    public function update_lsc_translator_preferences(){
      $session_data = $this->session->userdata('logged_in');
      $_POST = json_decode(file_get_contents('php://input'), true);
      $this->usuario_model->update_preferences_LSC_translatorDB($session_data['username'], $_POST['preferencesLscTranslator']);  
    }
    

    public function update_structural_nav_preferences(){
      $session_data = $this->session->userdata('logged_in');
      $_POST = json_decode(file_get_contents('php://input'), true);
      $this->usuario_model->update_preferences_structuralNav($session_data['username'], $_POST['preferencesStructuralNav']);  
    }


    public function update_keyboard_preferences(){
      $session_data = $this->session->userdata('logged_in');
      $_POST = json_decode(file_get_contents('php://input'), true);
      $this->usuario_model->update_preferences_keyboard($session_data['username'], $_POST['preferencesKeyboard']);  
    }

    public function set_all_preferences_to_default() {
      $session_data = $this->session->userdata('logged_in');

      if($this->session->userdata('need_custom_interfaz')) {
        $default_preferences = array(
          'color_cursor' => 'rgb(255,18,18)',
          'contrast_colors_id' => 1,
          'cursor_size_id' => 1,
          'cursor_url' => 'auto',
          'font_size' => 12,
          'font_type_id' => 1,
          'invert_color_general' => 'false',
          'invert_color_image' => 'false',
          'size_line_spacing'=> 1.5,
          'trail_cursor_color' => 'rgb(255,18,18)',
          'trail_cursor_size_id' => 1
        );

        $default_colors = array(
          'foreground_colour' => "rgb(0,0,0)",
          'background_colour' => "rgb(255,255,255)",
          'highlight_colour' => "rgb(211,211,211)",
          'link_colour' => "rgb(255,255,0)"
        );
        $this->usuario_model->update_preferences_interfazDB($session_data['username'], $default_preferences);
        $this->usuario_model->update_custom_colors($session_data['username'], $default_colors);
      }

      if($this->session->userdata('need_narrator')) {
        $default_preferences = array(
          'speed_reading' => 2,
          'pitch_nr' => 2,
          'volume_id' => 2,
          'voice_gender_id' => 1,
          'links_id' => 1,
          'highlight_id' => 1,
          'reading_unit_id' => 1
        );

        $this->usuario_model->update_preferences_narratorDB($session_data['username'], $default_preferences);  
      }

      if($this->session->userdata('need_screen_reader')) {
        $default_preferences = array(
          'speed_reading_id' => 2,
          'pitch_id' => 2,
          'volume_id' => 2,
          'voice_gender_id' => 1,
          'links_id' => 2
        );

        $this->usuario_model->update_preferences_srDB($session_data['username'], $default_preferences);  
      }

      if($this->session->userdata('need_lsc_translator')) {
        $default_preferences = array(
          'sign_speed' => 20,
          'model_id' => 1
        );

        $this->usuario_model->update_preferences_LSC_translatorDB($session_data['username'], $default_preferences);
      }

      if($this->session->userdata('need_structural_nav')) {
        $default_preferences = array(
          'nav_strategy_id' => 1,
          'showtoc' => 'false'
        );

        $this->usuario_model->update_preferences_structuralNav($session_data['username'], $default_preferences);
      }

      if($this->session->userdata('need_virtual_keyboard')) {
        $default_preferences = array(
          'kb_size_id' => 2,
          'play_key_sound' => 'true'
        );

        $this->usuario_model->update_preferences_keyboard($session_data['username'], $default_preferences);  
      }
    }

    public function chpasswd(){
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $this->load->view("usr/chpasswd_view");

        } else {
            redirect(base_url(), 'refresh');
        }
    }

    public function verificar_passwd() {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $res = $this->usuario_model->verificar_passwd(md5($_POST["passwd"]),$session_data["username"]);
            if ($res == 1) {
                echo 1;
            }elseif ($res == 0) {
                echo 0;
            }
        } else {
            redirect(base_url(), 'refresh');
        }


    }

    function upd_passwd(){
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $this->usuario_model->actualizar_passwd(md5($_POST["new_password"]), $session_data["username"]);
            $this->session->unset_userdata('logged_in');
            redirect(base_url(), 'refresh');

        } else {
            redirect(base_url(), 'refresh');
        }
    }

    public function mis_objetos(){

        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');

                $content = array(
                    "user" => $session_data['username'],
                    "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                    "usr_all_data" => $this->usuario_model->get_all_usr_data($session_data['username']),
                    "main_view" => "base/result_view_st",
                    "encabezado" => "Objetos calificados",
                    "url" => "usuario/perfil/",
                    "result" => $this->lo_model->get_lo_usr($session_data['username']),
                    "sess" => 1,
                    "id_view" => "my_los"
                );
                $this->load->view('base/est_template', $content);


        } else {
            redirect(base_url(), 'refresh');
        }

    }

    public function mail(){

        // El mensaje
        $mensaje = "Línea 1\r\nLínea 2\r\nLínea 3";

        // Si cualquier línea es más larga de 70 caracteres, se debería usar wordwrap()
        $mensaje = wordwrap($mensaje, 70, "\r\n");

        // Enviarlo
        mail('leegixus@gmail.com', 'Mi título', $mensaje);

    }


    //Metodo que guarda los registros cuando se crea una cuenta por parte del estudiante,
    // en la tabla usuario y estudiante

    public function guardar() {
        $optInterfaz = $this->input->post('personaliceInterfaz');
        $optNarrator = $this->input->post('useNarrator');
        $optScreenReader = $this->input->post('useSr');
        $optLSCTranslator = $this->input->post('useLSCTranslator');
        $optStructuralNav = $this->input->post('useStructuralNav');
        $optKeyboard = $this->input->post('useKeyboard');
        $prefInterfaz = json_decode($this->input->post('interfazPreferences'), TRUE);
        $customColors = json_decode($this->input->post('customColors'), TRUE);
        $dataInterfaz = array(
            "prefInterfaz" => $prefInterfaz,
            "customColors" => $customColors
        );
        $dataNarrator = json_decode($this->input->post('narratorPreferences'), TRUE);
        $dataScreenReader = json_decode($this->input->post('screenReaderPreferences'), TRUE);
        $dataLSCTranslator = json_decode($this->input->post('lscTranslatorPreferences'), TRUE);
        $dataStructuralNav = json_decode($this->input->post('structuralNavPreferences'), TRUE);
        $dataKeyboard = json_decode($this->input->post('keyboardPreferences'), TRUE);


        $this->usuario_model->guardar_estudiante();
        if ($_POST['educationalResource']) {
            foreach ($_POST['educationalResource'] as $key => $value) {
                $this->usuario_model->insert_pref($value, $this->input->post('username'));
            }
        }

        $this->usuario_model->insert_access_mode();

        // esto agrega al usuario para usar las adaptaciones de interfaz el narrador
        // o el screen segun lo que el necesite
        // en $opt--- va la opcion elegida por el usuario para cada adaptacion, si requiere, opcional o no requiere
        // en $data--- va las preferencias del usuario para cada adaptacion
        $this->usuario_model->insertaAdaptaciones($this->input->post('username'), $optInterfaz, $optNarrator, 
        $optScreenReader, $optLSCTranslator, $optStructuralNav, $optKeyboard, $dataInterfaz, 
        $dataNarrator, $dataScreenReader, $dataLSCTranslator, $dataStructuralNav, $dataKeyboard);

        $name = $this->input->post('nombre') . ' ' . $this->input->post('apellido');
        
        $this->session->set_userdata('username', $this->input->post('username'));
        $this->session->set_userdata('name', $name);
        redirect(base_url().'usuario/exito', 'refresh');
    }


    // Metodo que muestra un mensaje de exito cuando se crea una cuenta correctamente

    public function exito() {
        $id = $this->session->userdata('username');
        $name = $this->session->userdata('name');
        
        // pregunto si el usuario necesita adaptaciones de la interfaz
        $use_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($id);
        $use_adapta_interfaz = $use_adapta_interfaz[0]["adapta_interfaz_id"];

        // pregunto si el usuario necesita usar narrador
        $use_narrator = $this->usuario_model->get_need_narrator($id);
        $use_narrator = $use_narrator[0]['use_narrator_id'];

        // pregunto si el usuario necesita usar screen reader
        $use_sr = $this->usuario_model->get_need_sr($id);
        $use_sr = $use_sr[0]['use_screen_reader_id'];

        // pregunto si el usuario necesita usar screen reader
        $use_LSCTranslator = $this->usuario_model->get_need_translator_lsc($id);
        $use_LSCTranslator = $use_LSCTranslator[0]['use_traslator_lsc_id'];

        $use_structuralNav = $this->usuario_model->get_need_structural_nav($id);
        $use_structuralNav = $use_structuralNav[0]['use_structural_nav_id'];

        $use_keyboard = $this->usuario_model->get_need_kb($id);
        $use_keyboard = $use_keyboard[0]['use_kb_id'];
        
        $content = array(
            "title" => "Registro éxitoso",
            "main_view" => "register/exito_view",
            "username" => $id,
            "name" => $name,
            "needNarrator" => $use_narrator,
            "needPrefInterfaz"=> $use_adapta_interfaz,
            "needSr" => $use_sr,
            "needLSCTranslator" => $use_LSCTranslator,
            "needStructuralNav" => $use_structuralNav,
            "needKeyboard" => $use_keyboard,
            'id_view' => 'exito'
        );
        $this->load->view('base/base_template', $content);
    }

    /*public function test_result() {

        $this->clasificaresp();
    }*/

    // Metodo que calcula el resultado del Test de Estilo de Aprendizaje

    public function test_result() {
        $cant_V = 0;
        $cant_A = 0;
        $cant_R = 0;
        $cant_K = 0;

        $cant_G = 0;
        $cant_S = 0;

        for ($i = 1; $i <= 13; $i++) {
            if ($this->input->post($i) == 'V')
                $cant_V++;

            if ($this->input->post($i) == 'A')
                $cant_A++;

            if ($this->input->post($i) == 'R')
                $cant_R++;

            if ($this->input->post($i) == 'K')
                $cant_K++;
        }
        /*
          echo '   Cantidad de V    ';
          echo $cant_V;

          echo '   Cantidad de A    ';
          echo $cant_A;

          echo '   Cantidad de R    ';
          echo $cant_R;

          echo '   Cantidad de K    ';
          echo $cant_K; */

        //GLOBAL _ SECUENCIAL

        for ($j = 49; $j <= 70; $j++) {
            if ($this->input->post($j) == 'G')
                $cant_G++;
            if ($this->input->post($j) == 'S')
                $cant_S++;
        }

    /*$this->usuario_model->guardar_estudiante($cant_V,$cant_A,$cant_R,$cant_K,$cant_G,$cant_S);

        /* echo "   cantidad G  ";
          echo $cant_G;
          echo "   cantidad S  ";
          echo $cant_S; */

        // $mayor = "";

        $puntaje = 0;
        if ($cant_V >= $cant_A && $cant_V >= $cant_R && $cant_V >= $cant_K) {
            $mayor = 7; //Visual
            $puntaje = $cant_V;
        } else
        if ($cant_A >= $cant_V && $cant_A >= $cant_R && $cant_A >= $cant_K) {
            $mayor = 1; //Auditivo
            $puntaje = $cant_A;
        } else
        if ($cant_R >= $cant_V && $cant_R >= $cant_A && $cant_R >= $cant_K) {
            $mayor = 5; //Lector
            $puntaje = $cant_R;
        } else
        if ($cant_K >= $cant_R && $cant_K >= $cant_V && $cant_K >= $cant_A) {
            $mayor = 3; //kinestesico
            $puntaje = $cant_K;
        }

        if ($cant_G >= $cant_S) {
            $mayor = $mayor + 0; //Global
            $puntaje = $puntaje . '-' . $cant_G;
        } else {
            $mayor = $mayor + 1; //Secuencial
            $puntaje = $puntaje . ' - ' . $cant_S;
        }

        $datos = array($mayor,$cant_V,$cant_A,$cant_R,$cant_K,$cant_G,$cant_S);

        echo json_encode($datos);#$mayor.",".$cant_V.",".$cant_A.",".$cant_R.",".$cant_K.",".$cant_G.",".$cant_S;
        /*

esta es una opción que dio valen usando javascrip en la cual se manda la variable mayor y las
6 variables cant en una cadena serada por un caracter especial para desde la vista desarmar la
cadena y enviar al modelo estos valores
        echo $mayor."&".$cant_K;*/


        //echo 'Su estilo de aprendizaje es: ' . $mayor . ' con un resultado de ' . $puntaje;
       // $data = $this->input->post('1');
        // $data = json_decode(stripslashes($_POST['1']),true);
        //echo $data;

        //$this->usuario_model->guardar_test();
    }


    /**
     * Esta Función guarda los resultados del test para personas con necesidades especiales
     */
   public function test_need()
   {
       $discapacidades = array();
       //Resultados de limitación Visual
       for ($i = 7; $i <= 8; $i++) {
           if ($this->input->post($i) == 'Vision Nula') {
               $discapacidades[] = array("Vision Nula" => "Si");
               $resultadoVisual = "Visión Nula";
           } else {
               $discapacidades[] = array("Vision Nula" => "No");
               if ($this->input->post($i + 1) == 'Tamaño 1.1') {
                   $discapacidades[] = array("Vision Tamaño 1.1" => "Si");
                   $resultadoVisual = "1.1";
               } else {
                   $discapacidades[] = array("Vision Tamaño 1.1" => "No");
                   if ($this->input->post($i + 1) == 'Tamaño 1.3') {
                       $discapacidades[] = array("Vision Tamaño 1.3" => "Si");
                       $resultadoVisual = "1.3";
                   } else {
                       $discapacidades[] = array("Vision Tamaño 1.3" => "No");
                       if ($this->input->post($i + 1) == 'Tamaño 1.7') {
                           $discapacidades[] = array("Vision Tamaño 1.7" => "Si");
                           $resultadoVisual = "1.7";
                       } else {
                           $discapacidades[] = array("Vision Tamaño 1.7" => "No");
                           if($this->input->post($i + 1) == 'Tamaño 2.0'){
                               $discapacidades[] = array("Vision Tamaño 2.0" => "Si");
                               $resultadoVisual = "2.0";
                           }else{
                               $discapacidades[] = array("Vision Tamaño 2.0" => "No");
                           }

                       }
                   }
               }

           }
       }


        //Resultados de Limitación Auditiva

       for ($i = 9; $i <= 11; $i++) {
           if ($this->input->post($i) == 'Audicion Nula') {
               $discapacidades[] = array("Audicion Nula" => "Si");
               $resultadoAuditivo = "Audición Nula";
           } else {
               $discapacidades[] = array("Audicion Nula" => "No");
               if ($this->input->post($i) == 'Baja Audicion') {
                   $discapacidades[] = array("Baja Audicion" => "Si");
                   $resultadoAuditivo = "Baja Audicion";
               }
           }
           if ($this->input->post($i) == 'Si Lenguaje') {
               $discapacidades[] = array("Si Lenguaje" => "Si");
               $resultadoAuditivo1 = "Lenguaje de Señas";
           }
           if ($this->input->post($i) == 'Si Idioma') {
               $discapacidades[] = array("Si Idioma" => "Si");
               $resultadoAuditivo2 = "Español";
           }
       }

        //Resultados de Limitación Motriz

       for ($i = 12; $i <= 13; $i++) {
           if ($this->input->post($i) == 'No mouse') {
               $discapacidades[] = array("No mouse" => "Si");
               $resultadoMotriz = "Mouse";
           }

           if ($this->input->post($i) == 'No teclado') {
               $discapacidades[] = array("No teclado" => "Si");
               $resultadoMotriz1 = "Teclado";
           }

       }

        //Resultados de Limitación Cognitiva

       for ($i = 13; $i <= 17; $i++) {
           if ($this->input->post($i) == 'No concentra') {
               $discapacidades[] = array("No concentra" => "Si");
               $resultadoCognitivo="Concentra";
           }
           if ($this->input->post($i) == 'No texto') {
               $discapacidades[] = array("No texto" => "Si");
               $resultadoCognitivo1="Texto";
           }
           if ($this->input->post($i) == 'No instrucciones') {
               $discapacidades[] = array("No instrucciones" => "Si");
               $resultadoCognitivo2 = "Instrucciones";
           }

           if ($this->input->post($i) == 'No distrae') {
               $discapacidades[] = array("No distrae" => "Si");
               $resultadoCognitivo3 = "No se distrae";
           }

       }
   }


   /*
    public function up_test() {
        $cant_V = 0;
        $cant_A = 0;
        $cant_R = 0;
        $cant_K = 0;

        $cant_G = 0;
        $cant_S = 0;

        for ($i = 1; $i <= 13; $i++) {
            if ($this->input->post($i) == 'V')
                $cant_V++;

            if ($this->input->post($i) == 'A')
                $cant_A++;

            if ($this->input->post($i) == 'R')
                $cant_R++;

            if ($this->input->post($i) == 'K')
                $cant_K++;
        }

        //GLOBAL _ SECUENCIAL

        for ($j = 49; $j <= 70; $j++) {
            if ($this->input->post($j) == 'G')
                $cant_G++;
            if ($this->input->post($j) == 'S')
                $cant_S++;
        }


        $puntaje = 0;
        if ($cant_V >= $cant_A && $cant_V >= $cant_R && $cant_V >= $cant_K) {
            $mayor = 7; //Visual
            $puntaje = $cant_V;
        } else
        if ($cant_A >= $cant_V && $cant_A >= $cant_R && $cant_A >= $cant_K) {
            $mayor = 1; //Auditivo
            $puntaje = $cant_A;
        } else
        if ($cant_R >= $cant_V && $cant_R >= $cant_A && $cant_R >= $cant_K) {
            $mayor = 5; //Lector
            $puntaje = $cant_R;
        } else
        if ($cant_K >= $cant_R && $cant_K >= $cant_V && $cant_K >= $cant_A) {
            $mayor = 3; //kinestesico
            $puntaje = $cant_K;
        }

        if ($cant_G >= $cant_S) {
            $mayor = $mayor + 0; //Global
            $puntaje = $puntaje . '-' . $cant_G;
        } else {
            $mayor = $mayor + 1; //Secuencial
            $puntaje = $puntaje . ' - ' . $cant_S;
        }

       $this->usuario_model->update_test($mayor,$cant_V,$cant_A,$cant_R,$cant_K,$cant_G,$cant_S,  $session_data['username']);
        else{
                        //If no session, redirect to login page
            redirect('init', 'refresh');

        }

    }*/

    public function sitemap() {
        $content = array (
            'main_view' => 'shared_views/sitemap',
            'id_view' => 'sitemap'
        );
        $this->load->view('base/base_template', $content);
    }


}
