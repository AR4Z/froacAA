<?php
class FirstTimeUser {
  function saveVisitor() {
    $ci = &get_instance();
    $ci->load->model('visitors_model');
    
    if ($ci->visitors_model->exist_visitor($ci->input->ip_address())) {
      $ci->session->set_userdata('first_time', 'false');
    } else {
      $ci->visitors_model->insert_visitor($ci->input->ip_address());        
      $ci->session->set_userdata('first_time', 'true');
    }
  }
}
