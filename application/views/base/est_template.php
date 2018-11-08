<?php

$this->load->view('base/base/1_base_head');
if($this->session->userdata('need_screen_reader') || $this->session->userdata('need_custom_interfaz') || $this->session->userdata('need_narrator') || $this->session->userdata('need_lsc_translator') || $this->session->userdata('need_structural_nav') || $this->session->userdata('need_virtual_keyboard')){
    $this->load->view('base/base/accessibility/panel');
}
$this->load->view('base/base/2_base_header');
$this->load->view('base/base/3_base_aside');
$this->load->view($main_view);
$this->load->view('base/base/4_base_footer');
