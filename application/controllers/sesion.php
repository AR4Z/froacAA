<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sesion extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('sesion_model');
        $this->load->model('usuario_model');
    }

    public function index()
    {
        $this->login();
    }

    public function login()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_check_database');

        if ($this->form_validation->run() == FALSE) {
            //Field validation failed.  User redirected to login page
            $data = array(
                'id_view' => 'login'
            );
            $this->load->view('base/login/login_view', $data);
        } else {
            //Go to private area
            $this->verificar_rol();
        }
    }


    function check_database($password)
    {
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

    public function verificar_rol()
    {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $rol = $this->usuario_model->get_rol($session_data['username']);
            $this->session->set_userdata('role', $rol[0]['use_rol_id']);
            if ($rol[0]['use_rol_id'] > 1) {
                // pregunto si el usuario necesita adaptaciones de la interfaz
                $use_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username']);
                $use_adapta_interfaz = $use_adapta_interfaz[0]["adapta_interfaz_id"];

                // pregunto si el usuario necesita usar narrador
                $use_narrator = $this->usuario_model->get_need_narrator($session_data['username']);
                $use_narrator = $use_narrator[0]['use_narrator_id'];

                // pregunto si el usuario necesita usar screen reader
                $use_sr = $this->usuario_model->get_need_sr($session_data['username']);
                $use_sr = $use_sr[0]['use_screen_reader_id'];

                $use_LSCTranslator = $this->usuario_model->get_need_translator_lsc($session_data['username']);
                $use_LSCTranslator  = $use_LSCTranslator[0]['use_traslator_lsc_id'];

                $use_structuralNav = $this->usuario_model->get_need_structural_nav($session_data['username']);
                $use_structuralNav = $use_structuralNav[0]['use_structural_nav_id'];

                $use_keyboard = $this->usuario_model->get_need_kb($session_data['username']);
                $use_keyboard = $use_keyboard[0]['use_kb_id'];

                // si el usuario necesita adaptaciones de la interfaz entonces lo almaceno en sesion y tambien sus preferencias
                if ($use_adapta_interfaz == "1" || $use_adapta_interfaz == "2") {
                    $this->session->set_userdata('need_custom_interfaz', true);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('need_custom_interfaz', false);
                }

                // si el usuario necesita el narrador entonces lo almaceno en sesion y tambien sus preferencias
                if ($use_narrator == "1" || $use_narrator == "2") {
                    $this->session->set_userdata('need_narrator', true);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('need_narrator', false);
                }

                // si el usuario necesita el screen reader entonces lo almaceno en sesion y tambien sus preferencias
                if ($use_sr == "1" || $use_sr == "2") {
                    $this->session->set_userdata('need_screen_reader', true);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('need_screen_reader', false);
                }
                // si el usuario necesita el lsc translator entonces lo almaceno en sesion y tambien sus preferencias
                if ($use_LSCTranslator == "1" || $use_LSCTranslator == "2") {
                    $this->session->set_userdata('need_lsc_translator', true);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('need_lsc_translator', false);
                }

                if ($use_structuralNav == "1" || $use_structuralNav == "2") {
                    $this->session->set_userdata('need_structural_nav', true);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('need_structural_nav', false);
                }

                if ($use_keyboard == "1" || $use_keyboard == "2") {
                    $this->session->set_userdata('need_virtual_keyboard', true);
                } else {
                    // en caso se que no necesite tambien lo almaceno en sesion
                    $this->session->set_userdata('need_virtual_keyboard', false);
                }
                $this->session->set_flashdata('show_context_modal', 'true');

                redirect('main', 'refresh');
            } elseif ($rol[0]['use_rol_id'] == 1) {
                redirect(base_url() . 'admin', 'refresh'); // recordar configuración de enable_query_strings puede traer algunos problemas
            } else {
                $this->logout();
            }
        }
    }

    public function verificar_email($email)
    {

        $email = str_replace('|', '@', urldecode($email));
        $res = $this->usuario_model->verificar_uername($email);

        if ($res == 1) {
            $this->load->view('alert_acount_view');
        } elseif ($res == 0) {
            $this->load->view('pass_acount_view');
        }
    }

    public function logout()
    {
        $this->session->unset_userdata('logged_in');
        $this->session->unset_userdata('role');

        $this->session->unset_userdata('need_custom_interfaz');
        $this->session->unset_userdata('need_structural_nav');
        $this->session->unset_userdata('need_narrator');
        $this->session->unset_userdata('need_screen_reader');
        $this->session->unset_userdata('need_lsc_translator');
        $this->session->unset_userdata('need_virtual_keyboard');

        redirect(base_url(), 'refresh');
    }
}
