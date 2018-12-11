<?php
class FirstTimeUser {
  function saveVisitor() {
    $ci = &get_instance();
    $ci->load->model('visitors_model');
    
    if ($ci->visitors_model->exist_visitor($this->getIp())) {
      $ci->session->set_userdata('first_time', 'false');
    } else {
      $ci->visitors_model->insert_visitor($this->getIp());     
      $ci->session->set_userdata('first_time', 'true');
    }
  }


  function getIp() {
    if (getenv('HTTP_CLIENT_IP')) {
      $ip = getenv('HTTP_CLIENT_IP');
    }
    elseif (getenv('HTTP_X_FORWARDED_FOR')) {
      $ip = getenv('HTTP_X_FORWARDED_FOR');
    }
    elseif (getenv('HTTP_X_FORWARDED')) {
      $ip = getenv('HTTP_X_FORWARDED');
    }
    elseif (getenv('HTTP_FORWARDED_FOR')) {
      $ip = getenv('HTTP_FORWARDED_FOR');
    }
    elseif (getenv('HTTP_FORWARDED')) {
      $ip = getenv('HTTP_FORWARDED');
    }
    else {
      $ip = $_SERVER['REMOTE_ADDR'];
    }
    
    return $ip;
  }
}