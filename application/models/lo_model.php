<?php

class Lo_model extends CI_Model
{
    public function get_oas_b($orParams, $andParams, $language=false)
    {
        if ($language) {
            $andQuery = $this->db->query(
                "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                        lo_keyword, lo_location, lo_xml_lom,
                        ts_rank_cd(campo_busqueda_index_col, query) AS rank
                        FROM lo, to_tsquery" . $andParams . "query
                            WHERE query @@ campo_busqueda_index_col
                            and lo_location is not null and lo_language='".$language."' ORDER BY rank DESC;"
            );
          
            $orQuery = $this->db->query(
                "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                        lo_keyword, lo_location, lo_xml_lom,
                         ts_rank_cd(campo_busqueda_index_col, query) AS rank
                        FROM lo, to_tsquery" . $orParams . "query
                            WHERE query @@ campo_busqueda_index_col and lo_location is not null and lo_language='".$language."' ORDER BY rank DESC;"
            );
        } else {
            $andQuery = $this->db->query(
                "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                        lo_keyword, lo_location, lo_xml_lom,
                        ts_rank_cd(campo_busqueda_index_col, query) AS rank
                        FROM lo, to_tsquery" . $andParams . "query
                            WHERE query @@ campo_busqueda_index_col
                            and lo_location is not null  ORDER BY rank DESC;"
            );
          
            $orQuery = $this->db->query(
                "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                        lo_keyword, lo_location, lo_xml_lom,
                         ts_rank_cd(campo_busqueda_index_col, query) AS rank
                        FROM lo, to_tsquery" . $orParams . "query
                            WHERE query @@ campo_busqueda_index_col and lo_location is not null  ORDER BY rank DESC;"
            );
        }
        
        $result = array();
        $resultAnd = array();
        $resultOr = array();
        foreach ($andQuery->result_array() as $and) {
            array_push($resultAnd, $and);
        }

        foreach ($orQuery->result_array() as $or) {
            array_push($resultOr, $or);
        }
        $result = array_unique(array_merge($resultAnd, $resultOr), SORT_REGULAR);
        
        return $result;
    }


    public function get_oas_full($val)
    {
        if ($val[0]!='') {
            if ($val[1]!='') {
                if ($val[2]!='') {
                    $query= $this->db->query(
                        "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                    lo_keyword, lo_location,ts_rank_cd(campo_busqueda_index_col, query) AS rank
                            FROM lo WHERE lo_keyword ilike '$val[0]' AND lo_language='$val[1]' AND lo_format='$val[2]';"
                    );
                } else {
                    $query= $this->db->query(
                        "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                    lo_keyword, lo_location,ts_rank_cd(campo_busqueda_index_col, query) AS rank
                            FROM lo WHERE lo_keyword ilike '$val[0]' AND lo_language='$val[1]';"
                    );
                }
            } else {
                $query= $this->db->query(
                    "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                    lo_keyword, lo_location,ts_rank_cd(campo_busqueda_index_col, query) AS rank
                            FROM lo WHERE lo_keyword ilike '$val[0]';"
                );
            }
        } elseif ($val[1]!='') {
            if ($val[2]!='') {
                $query= $this->db->query(
                    "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                    lo_keyword, lo_location,ts_rank_cd(campo_busqueda_index_col, query) AS rank
                            FROM lo WHERE lo_language='$val[1]' AND lo_format='$val[2]';"
                );
            } else {
                $query= $this->db->query(
                    "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                    lo_keyword, lo_location,ts_rank_cd(campo_busqueda_index_col, query) AS rank
                            FROM lo WHERE lo_language='$val[1]';"
                );
            }
        } else {
            $query= $this->db->query(
                "SELECT lo_id, rep_id, lo_title, lo_language, lo_description,
                    lo_keyword, lo_location,ts_rank_cd(campo_busqueda_index_col, query) AS rank
                            FROM lo WHERE lo_format='$val[2]';"
            );
        }
    }

    public function get_metadata($lo_id, $rep_id)
    {
        $query = $this->db->query("select lo_xml_lom from lo where lo_id='".$lo_id."' and rep_id='".$rep_id."'");

        return $query->result_array();
    }

    public function set_visita_lo()
    {
        $query = $this->db->get_where('lo_visitas', array('lo_id' => $this->input->post("lo_id"),
            'rep_id' => $this->input->post("rep_id")));

        if ($query->num_rows() != 1) {
            $data = array(
                "lo_id" => $this->input->post("lo_id"),
                "rep_id" => intval($this->input->post("rep_id")),
                "logged" => intval($this->input->post("logged")),
                "clicked" => 1
            );

            $this->db->insert('lo_visitas', $data);
        } else {
            $lo = $this->input->post("lo_id");
            $rep = intval($this->input->post("rep_id"));
            $sql = "UPDATE lo_visitas 
                        SET clicked = (SELECT clicked FROM lo_visitas WHERE lo_id = '$lo' AND rep_id = $rep) + 1
                            WHERE lo_id = '$lo' AND rep_id = $rep;";
            //!!Verificar la referencia de fk_rep en la tabla lo_visitas esta desde lo y deberia ser desde rep.
            $this->db->query($sql);
        }
    }

    public function get_rep_lo($rep_id)
    {
        $query = $this->db->get_where('lo', array('rep_id' => $rep_id));
        return $query->result_array();
    }

    public function get_lo_usr($username)
    {
        $query = $this->db->query("SELECT lo.lo_id, lo.rep_id, lo_title, lo_language, lo_description,
                  lo_keyword, use_score.use_username FROM lo
                  JOIN use_score on use_score.lo_id = lo.lo_id AND use_score.rep_id = lo.rep_id
                  where use_username = '$username' ORDER BY use_score.use_sco_score  DESC");
        return $query->result_array();
    }

    public function get_avg_score()
    {
        $lo = $this->input->post("lo_id");
        $rep = intval($this->input->post("rep_id"));
        $query = $this->db->query("SELECT AVG(use_sco_score) FROM use_score where
                                   lo_id = '$lo' AND rep_id = '$rep'");
        return $query->result_array();
    }

    public function titulos_recomendacion($idlom, $idrepository)
    {
        //recuperar los titulos y las localizaciones de los OAs resultado de la recomendación
        $this->db->select('lo_title, lo_location');
        $this->db->from('lo');
        $this->db->where('rep_id', $idrepository);
        $this->db->where('lo_id', $idlom);
        //$this->db->join('technical_location', 'lom.idlom = technical_location.idlom   and lom.idlom = technical_location.idlom and lom.idrepository = technical_location.idrepository', 'left');
        $query = $this->db->get();

        return $query->result_array();
    }

    public function get_language($url)
    {
        $this->db->select('lo_language');
        $this->db->from('lo');
        $this->db->where('lo_location', $url);
        $query = $this->db->get();
        return $query->result_array();
    }

    
    public function update_kb_for_search()
    {
        $this->db->query("UPDATE lo SET campo_busqueda_index_col = to_tsvector('spanish'::regconfig, (((COALESCE(lo_title, ''::character varying)::text || ' '::text) || COALESCE(lo_description, ''::character varying)::text) || ' '::text) || COALESCE(lo_keyword, ''::character varying)::text)");
    }

    public function rate_learning_object($data)
    {
        $query_user_rate = $this->db->get_where('lo_rating', array(
            'lo_id' => $data['lo_id'],
            'rep_id' => $data['rep_id'],
            'use_username' => $data['username']));

        if ($query_user_rate->num_rows() != 1) {
            $this->db->insert('lo_rating', array('lo_id' => $data['lo_id'],
                'rep_id' => $data['rep_id'],
                'use_username'  => $data['username'],
                'effectiveness' => $data['effectiveness'],
                'motivation'=> $data['motivation'],
                'usability' => $data['usability'],
                'accessibility' => $data['accessibility'],
                'adaptability' => $data['adaptability']));
        } else {
            $this->db->set('effectiveness', $data['effectiveness'], false);
            $this->db->set('motivation', $data['motivation'], false);
            $this->db->set('usability', $data['usability'], false);
            $this->db->set('accessibility', $data['accessibility'], false);
            $this->db->set('adaptability', $data['adaptability'], false);
            $this->db->where('lo_id', $data['lo_id']);
            $this->db->where('rep_id', $data['rep_id']);
            $this->db->where('use_username', $data['username']);
            $this->db->update('lo_rating');
        }
    }

    public function get_user_rate_learning_object($username, $lo_id, $rep_id)
    {
        $query = $this->db->get_where('lo_rating', array(
            'lo_id' => $lo_id,
            'rep_id' => $rep_id,
            'use_username' => $username));
        
        return $query->result_array();
    }

    public function get_lo_gral_rating($lo_id, $rep_id)
    {

        $this->db->select_avg('effectiveness');
        $this->db->select_avg('motivation');
        $this->db->select_avg('usability');
        $this->db->select_avg('accessibility');
        $this->db->select_avg('adaptability');
        $query = $this->db->get_where('lo_rating', array(
            'lo_id' => $lo_id,
            'rep_id' => $rep_id));

        return $query->result_array();
    }

//    function get_metadata($lo_id, $rep_id) {
//
//
//        $query = $this->db->query("select lo_xml_lom from lo where lo_id = '$lo_id' AND rep_id = $rep_id");
//
//        return $query->result_array();
//    }
}
