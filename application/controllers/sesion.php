<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sesion extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('sesion_model');
        $this->load->model('usuario_model');
    }

    public function index(){
        $this->login();
    }

    public function login() {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_check_database');

        if ($this->form_validation->run() == FALSE) {
            //Field validation failed.  User redirected to login page
            $data = array(
                'view' => 'base/login/login_view'
            );
            $this->load->view('base/login/login_view', $data);
        } else {
            //Go to private area
            $this->verificar_rol();
        }
    }


    function check_database($password) {
        //Field validation succeeded.  Validate against database
        $username = $this->input->post('username');

        //query the database
        $result = $this->sesion_model->login($username, $password);

        if ($result) {
            $sess_array = array();
            foreach ($result as $row) {
                $sess_array = array(
                    'username' => $row->use_username
                );
                $this->session->set_userdata('logged_in', $sess_array);
            }
            return TRUE;
        } else {
            $this->form_validation->set_message('check_database', 'Usuario o password inválido, por favor intente de nuevo');
            return false;
        }
    }

    public function verificar_rol() {
    	if ($this->session->userdata('logged_in')) {
    		$session_data = $this->session->userdata('logged_in');
    		$rol = $this->usuario_model->get_rol($session_data['username']);

    		if ($rol[0]['use_rol_id']>1) {
                // pregunto si el usuario necesita adaptaciones de la interfaz
                $use_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username']);
                $use_adapta_interfaz = $use_adapta_interfaz[0]["use_adapta_interfaz_id"];

                // pregunto si el usuario necesita usar narrador
                $use_narrator = $this->usuario_model->get_need_narrator($session_data['username']);
                $use_narrator = $use_narrator[0]['use_narrator_id'];

                // pregunto si el usuario necesita usar screen reader
                $use_sr = $this->usuario_model->get_need_sr($session_data['username']);
                $use_sr = $use_sr[0]['use_screen_reader_id'];

                // si el usuario necesita adaptaciones de la interfaz entonces lo almaceno en sesion y tambien sus preferencias
                if($use_adapta_interfaz == "1" || $use_adapta_interfaz == "2"){
                    $preferencesInterfaz = $this->usuario_model->get_all_data_adaptability_interfaz($session_data['username']);
                    $this->session->set_userdata('adaptaInterfaz', true);
                    $this->session->set_userdata('preferencesAdaptainterfaz', $preferencesInterfaz[0]);
                    
                    // si el usuario necesita usar colores personalizados
                    if($preferencesInterfaz[0]['contrast_colors_id'] == '7'){
                        // pido los colores y los almaceno en sesion
                        $customColors = $this->usuario_model->get_custom_colors($session_data['username'])[0];
                        $this->session->set_userdata('needcustomColors', true);
                        $this->session->set_userdata('customColors', $customColors);
                    } else {
                        // en caso de que no necesite colores personalizados lo almaceno en sesion
                        $this->session->set_userdata('needcustomColors', false);
                    }
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('adaptaInterfaz', false);
                }

                // si el usuario necesita el narrador entonces lo almaceno en sesion y tambien sus preferencias
                if($use_narrator == "1" || $use_narrator == "2") {
                    $preferencesNarrator = $this->usuario_model->get_all_data_adaptability_narrator($session_data['username']);
                    $this->session->set_userdata('needNarrator', true);
                    $this->session->set_userdata('preferencesNarrator', $preferencesNarrator[0]);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('needNarrator', false);
                }

                // si el usuario necesita el screen reader entonces lo almaceno en sesion y tambien sus preferencias
                if($use_sr == "1" || $use_sr == "2") {
                    $preferencesSr = $this->usuario_model->get_all_data_adaptability_sr($session_data['username']);
                    $this->session->set_userdata('needSr', true);
                    $this->session->set_userdata('preferencesSr', $preferencesSr[0]);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('needSr', false);
                }
    			redirect('main', 'refresh');
    		}elseif($rol[0]['use_rol_id'] == 1) {
                redirect(base_url().'admin', 'refresh'); // recordar configuración de enable_query_strings puede traer algunos problemas
    		}else{
                $this->logout();
            }
    	}
    }

    public function verificar_email($email) {

    	$email = str_replace('|', '@', urldecode($email));
    	$res = $this->usuario_model->verificar_uername($email);

    	if ($res == 1) {
    		$this->load->view('alert_acount_view');
    	}elseif ($res == 0) {
    		$this->load->view('pass_acount_view');
    	}

    }

    public function logout() {

        $this->session->unset_userdata('logged_in');
        $this->session->unset_userdata('adaptaInterfaz');
        $this->session->unset_userdata('preferencesAdaptainterfaz');
        $this->session->unset_userdata('preferencesNarrator');
        $this->session->unset_userdata('needNarrator');
        $this->session->unset_userdata('preferencesSr');
        $this->session->unset_userdata('needSr');

        redirect(base_url(), 'refresh');
    }

}

?>
