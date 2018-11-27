<?php

Class Visitors_model extends CI_Model {
  function insert_visitor($ip) {
    $data = array(
      'address' => $ip
    );

    $this->db->insert('visitors', $data);
  }

  function exist_visitor($ip) {
    $this->db->from('visitors');
    $this->db->where('address',$ip);

    $query = $this->db->get();
    return $query->num_rows() >= 1;
  }
}