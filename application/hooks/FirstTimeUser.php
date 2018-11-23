<?php
class FirstTimeUser
{
    function setCookie() {
      $ci =& get_instance();
      $firstTime = $ci->session->userdata('first_time');

      if ($firstTime) {
        $ci->session->set_userdata('first_time', 'false');
      } else {        
        $ci->session->set_userdata('first_time', 'true');
      }
    }
}
