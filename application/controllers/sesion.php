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
                $use_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username']);
                $use_adapta_interfaz = $use_adapta_interfaz[0]["use_adapta_interfaz_id"];
                if($use_adapta_interfaz == "1" || $use_adapta_interfaz == "2"){
                    $preferences_array = $this->usuario_model->get_all_data_adaptability_interfaz($session_data['username']);
                    $this->session->set_userdata('adaptaInterfaz', true);
                    $this->session->set_userdata('preferencesAdaptainterfaz', $preferences_array);
                } else {
                    $this->session->set_userdata('adaptaInterfaz', false);
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

        redirect(base_url(), 'refresh');
    }

}

?>
