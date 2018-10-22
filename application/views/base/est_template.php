<?php

$this->load->view('base/base/1_base_head');
if($this->session->userdata('needSr') || $this->session->userdata('adaptaInterfaz') || $this->session->userdata('needNarrator') || $this->session->userdata('needLSCTranslator') || $this->session->userdata('needStructuralNav') || $this->session->userdata('needKeyboard')){
    $this->load->view('base/base/accessibility/panel');
}
$this->load->view('base/base/2_base_header');
$this->load->view('base/base/3_base_aside');
$this->load->view($main_view);
$this->load->view('base/base/4_base_footer');
