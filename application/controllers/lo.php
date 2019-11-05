<?php
class Lo extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("lo_model");
        $this->load->model("usuario_model");
    }

    public function index()
    {
        echo 'algo';
    }

    public function buscar_lo($params, $sess, $user)
    {
        $languages = ["spanish" => "es", "portuguese" => "pt", "english" => "en"];
        $lang = $languages[$this->session->userdata('site_lang')];
        $params = urldecode($params);
        $params = preg_replace('/_+/', '_', $params);
        if (substr($params, -1) == "_") {
            $params = substr($params, 0, -1);
        }

        // $params = $this->limpiar($params);

        $arrayParams = explode("_", $params);
        foreach ($arrayParams as $key => $value) {
            if (substr($value, -3) == "ion") {
                $arrayParams[$key] = substr($value, 0, -3) . "ión";
            }
        }

        $stopwordsConTildes = array("a", "acá", "ahí", "ajena", "ajenas", "ajeno", "ajenos", "al", "algo", "algún", "alguna", "algunas", "alguno", "algunos", "allá", "alli", "allí", "ambos", "ampleamos", "ante", "antes", "aquel", "aquella", "aquellas", "aquello", "aquellos", "aqui", "aquí", "arriba", "asi", "atras", "aun", "aunque", "bajo", "bastante", "bien", "cabe", "cada", "casi", "cierta", "ciertas", "cierto", "ciertos", "como", "cómo", "con", "conmigo", "conseguimos", "conseguir", "consigo", "consigue", "consiguen", "consigues", "contigo", "contra", "cual", "cuales", "cualquier", "cualquiera", "cualquieras", "cuan", "cuán", "cuando", "cuanta", "cuánta", "cuantas", "cuántas", "cuanto", "cuánto", "cuantos", "cuántos", "de", "dejar", "del", "demás", "demas", "demasiada", "demasiadas", "demasiado", "demasiados", "dentro", "desde", "donde", "dos", "el", "él", "ella", "ellas", "ello", "ellos", "empleais", "emplean", "emplear", "empleas", "empleo", "en", "encima", "entonces", "entre", "era", "eramos", "eran", "eras", "eres", "es", "esa", "esas", "ese", "eso", "esos", "esta", "estaba", "estado", "estais", "estamos", "estan", "estar", "estas", "este", "esto", "estos", "estoy", "etc", "fin", "fue", "fueron", "fui", "fuimos", "gueno", "ha", "hace", "haceis", "hacemos", "hacen", "hacer", "haces", "hacia", "hago", "hasta", "incluso", "intenta", "intentais", "intentamos", "intentan", "intentar", "intentas", "intento", "ir", "jamás", "junto", "juntos", "la", "largo", "las", "lo", "los", "mas", "más", "me", "menos", "mi", "mía", "mia", "mias", "mientras", "mio", "mío", "mios", "mis", "misma", "mismas", "mismo", "mismos", "modo", "mucha", "muchas", "muchísima", "muchísimas", "muchísimo", "muchísimos", "mucho", "muchos", "muy", "nada", "ni", "ningun", "ninguna", "ningunas", "ninguno", "ningunos", "no", "nos", "nosotras", "nosotros", "nuestra", "nuestras", "nuestro", "nuestros", "nunca", "os", "otra", "otras", "otro", "otros", "para", "parecer", "pero", "poca", "pocas", "poco", "pocos", "podeis", "podemos", "poder", "podria", "podriais", "podriamos", "podrian", "podrias", "por", "por qué", "porque", "primero", "primero desde", "puede", "pueden", "puedo", "pues", "que", "qué", "querer", "quien", "quién", "quienes", "quienesquiera", "quienquiera", "quiza", "quizas", "sabe", "sabeis", "sabemos", "saben", "saber", "sabes", "se", "segun", "ser", "si", "sí", "siempre", "siendo", "sin", "sín", "sino", "so", "sobre", "sois", "solamente", "solo", "somos", "soy", "sr", "sra", "sres", "sta", "su", "sus", "suya", "suyas", "suyo", "suyos", "tal", "tales", "también", "tambien", "tampoco", "tan", "tanta", "tantas", "tanto", "tantos", "te", "teneis", "tenemos", "tener", "tengo", "ti", "tiempo", "tiene", "tienen", "toda", "todas", "todo", "todos", "tomar", "trabaja", "trabajais", "trabajamos", "trabajan", "trabajar", "trabajas", "trabajo", "tras", "tú", "tu", "tus", "tuya", "tuyo", "tuyos", "ultimo", "un", "una", "unas", "uno", "unos", "usa", "usais", "usamos", "usan", "usar", "usas", "uso", "usted", "ustedes", "va", "vais", "valor", "vamos", "van", "varias", "varios", "vaya", "verdad", "verdadera", "vosotras", "vosotros", "voy", "vuestra", "vuestras", "vuestro", "vuestros", "y", "ya", "yo");
        $stopwordsSinTildes = array(
            "a",
            "aca",
            "ahi",
            "ajena",
            "ajenas",
            "ajeno",
            "ajenos",
            "al",
            "algo",
            "algun",
            "alguna",
            "algunas",
            "alguno",
            "algunos",
            "alla",
            "alli",
            "alli",
            "ambos",
            "ampleamos",
            "ante",
            "antes",
            "aquel",
            "aquella",
            "aquellas",
            "aquello",
            "aquellos",
            "aqui",
            "aqui",
            "arriba",
            "asi",
            "atras",
            "aun",
            "aunque",
            "bajo",
            "bastante",
            "bien",
            "cabe",
            "cada",
            "casi",
            "cierta",
            "ciertas",
            "cierto",
            "ciertos",
            "como",
            "como",
            "con",
            "conmigo",
            "conseguimos",
            "conseguir",
            "consigo",
            "consigue",
            "consiguen",
            "consigues",
            "contigo",
            "contra",
            "cual",
            "cuales",
            "cualquier",
            "cualquiera",
            "cualquieras",
            "cuan",
            "cuan",
            "cuando",
            "cuanta",
            "cuanta",
            "cuantas",
            "cuantas",
            "cuanto",
            "cuanto",
            "cuantos",
            "cuantos",
            "de",
            "dejar",
            "del",
            "demas",
            "demas",
            "demasiada",
            "demasiadas",
            "demasiado",
            "demasiados",
            "dentro",
            "desde",
            "donde",
            "dos",
            "el",
            "el",
            "ella",
            "ellas",
            "ello",
            "ellos",
            "empleais",
            "emplean",
            "emplear",
            "empleas",
            "empleo",
            "en",
            "encima",
            "entonces",
            "entre",
            "era",
            "eramos",
            "eran",
            "eras",
            "eres",
            "es",
            "esa",
            "esas",
            "ese",
            "eso",
            "esos",
            "esta",
            "estaba",
            "estado",
            "estais",
            "estamos",
            "estan",
            "estar",
            "estas",
            "este",
            "esto",
            "estos",
            "estoy",
            "etc",
            "fin",
            "fue",
            "fueron",
            "fui",
            "fuimos",
            "gueno",
            "ha",
            "hace",
            "haceis",
            "hacemos",
            "hacen",
            "hacer",
            "haces",
            "hacia",
            "hago",
            "hasta",
            "incluso",
            "intenta",
            "intentais",
            "intentamos",
            "intentan",
            "intentar",
            "intentas",
            "intento",
            "ir",
            "jamas",
            "junto",
            "juntos",
            "la",
            "largo",
            "las",
            "lo",
            "los",
            "mas",
            "mas",
            "me",
            "menos",
            "mi",
            "mia",
            "mia",
            "mias",
            "mientras",
            "mio",
            "mio",
            "mios",
            "mis",
            "misma",
            "mismas",
            "mismo",
            "mismos",
            "modo",
            "mucha",
            "muchas",
            "muchisima",
            "muchisimas",
            "muchisimo",
            "muchisimos",
            "mucho",
            "muchos",
            "muy",
            "nada",
            "ni",
            "ningun",
            "ninguna",
            "ningunas",
            "ninguno",
            "ningunos",
            "no",
            "nos",
            "nosotras",
            "nosotros",
            "nuestra",
            "nuestras",
            "nuestro",
            "nuestros",
            "nunca",
            "os",
            "otra",
            "otras",
            "otro",
            "otros",
            "para",
            "parecer",
            "pero",
            "poca",
            "pocas",
            "poco",
            "pocos",
            "podeis",
            "podemos",
            "poder",
            "podria",
            "podriais",
            "podriamos",
            "podrian",
            "podrias",
            "por",
            "por que",
            "porque",
            "primero",
            "primero desde",
            "puede",
            "pueden",
            "puedo",
            "pues",
            "que",
            "que",
            "querer",
            "quien",
            "quien",
            "quienes",
            "quienesquiera",
            "quienquiera",
            "quiza",
            "quizas",
            "sabe",
            "sabeis",
            "sabemos",
            "saben",
            "saber",
            "sabes",
            "se",
            "segun",
            "ser",
            "si",
            "si",
            "siempre",
            "siendo",
            "sin",
            "sin",
            "sino",
            "so",
            "sobre",
            "sois",
            "solamente",
            "solo",
            "somos",
            "soy",
            "sr",
            "sra",
            "sres",
            "sta",
            "su",
            "sus",
            "suya",
            "suyas",
            "suyo",
            "suyos",
            "tal",
            "tales",
            "tambien",
            "tambien",
            "tampoco",
            "tan",
            "tanta",
            "tantas",
            "tanto",
            "tantos",
            "te",
            "teneis",
            "tenemos",
            "tener",
            "tengo",
            "ti",
            "tiempo",
            "tiene",
            "tienen",
            "toda",
            "todas",
            "todo",
            "todos",
            "tomar",
            "trabaja",
            "trabajais",
            "trabajamos",
            "trabajan",
            "trabajar",
            "trabajas",
            "trabajo",
            "tras",
            "tu",
            "tu",
            "tus",
            "tuya",
            "tuyo",
            "tuyos",
            "ultimo",
            "un",
            "una",
            "unas",
            "uno",
            "unos",
            "usa",
            "usais",
            "usamos",
            "usan",
            "usar",
            "usas",
            "uso",
            "usted",
            "ustedes",
            "va",
            "vais",
            "valor",
            "vamos",
            "van",
            "varias",
            "varios",
            "vaya",
            "verdad",
            "verdadera",
            "vosotras",
            "vosotros",
            "voy",
            "vuestra",
            "vuestras",
            "vuestro",
            "vuestros",
            "y",
            "ya",
            "yoz"
        );
        foreach ($arrayParams as $key_p => $word) {
            foreach ($stopwordsSinTildes as $key_s => $stop) {
                if ($word == $stop) {
                    unset($arrayParams[$key_p]);
                }
            }
        }

        $palabras = implode(", ", $arrayParams);
        $params = implode("_", $arrayParams);
        $andParams = "('spanish', '" . preg_replace('/_/', ' & ', $params) . "')";
        $orParams = "('spanish','" . preg_replace('/_/', ' | ', $params) . "')";
        $result = $this->lo_model->get_oas_b($orParams, $andParams, $lang);


        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $user_narrator = $this->usuario_model->get_need_narrator($session_data['username'])[0];
            $access_mode = $this->usuario_model->get_access_modes($session_data['username'])[0];
            $access_mode_textual = $access_mode->textual == 't';
            $access_mode_visual = $access_mode->visual == 't';
            $access_mode_auditive = $access_mode->auditive == 't';
            $user_sr = $this->usuario_model->get_need_sr($session_data['username'])[0];
            $user_lsc  = $this->usuario_model->get_need_translator_lsc($session_data['username'])[0];
            $user_adapta_interfaz = $this->usuario_model->get_need_adapta_interfaz($session_data['username'])[0];
            $user_data = $this->usuario_model->get_all_usr_data($session_data['username'])[0];
            $user_prefer_resource_types = $this->usuario_model->get_preferencia_est($session_data['username']);
            $context_educational_purpose = $this->session->userdata('educational_purpose');
            $context_concentration  = $this->session->userdata('concentration');
            $available_time = $this->session->userdata('available_time');


            //var_dump($user_data);
            /*
            foreach ($result as $oa => $obj) {
                $dom = new DOMDocument();
                $dom->loadXML($result[$oa]['lo_xml_lom']);
                if (
                    strtolower(trim($dom->getElementsByTagName('language')[0]->textContent))  == strtolower(trim($user_data['pref_lo_language'])) &&
                    strtolower(trim($dom->getElementsByTagName('language')[0]->textContent)) == strtolower(trim($user_data['use_level']))
                )
            }*/
            foreach ($result as $oa => $obj) {
                $result[$oa]['val'] = 0.0;
            }

            foreach ($result as $oa => $obj) {
                $dom = new DOMDocument();
                $dom->loadXML($result[$oa]['lo_xml_lom']);
                $textual = $dom->getElementsByTagName('textual')[0]->textContent;
                $textual_alternative = $dom->getElementsByTagName('textualalternative')[0]->textContent;
                $interactivity_level = $dom->getElementsByTagName('interactivitylevel')[0]->textContent;
                $rights_cost = $dom->getElementsByTagName('cost')[0]->textContent;
                $rights_copyrightandotherrestrictions = $dom->getElementsByTagName('copyrightandotherrestrictions')[0]->textContent;
                $accessibility_sign_lang = $dom->getElementsByTagName('signlanguage')[0]->textContent;
                $accessibility_presen_visual = $dom->getElementsByTagName('visual')[0]->textContent;
                $accessibility_presen_auditory = $dom->getElementsByTagName('auditory')[0]->textContent;
                $accessibility_subtitles = $dom->getElementsByTagName('subtitles')[0]->textContent;
                $adaptation_type_audio_description = $dom->getElementsByTagName('audiodescription')[0]->textContent;
                $adaptation_type_hearing_alternative = $dom->getElementsByTagName('hearingalternative')[0]->textContent;
                $educational_context = $dom->getElementsByTagName('context')[0]->textContent;
                $resource_types = $dom->getElementsByTagName('learningresourcetype');
                $interaction_mode_keyboard = $dom->getElementsByTagName('keyboard')[0]->textContent;
                $interaction_mode_mouse = $dom->getElementsByTagName('mouse')[0]->textContent;
                $difficulty = $dom->getElementsByTagName('difficulty')[0]->textContent;
                $oa_resource_types = [];

                foreach ($resource_types as $key => $tag) {
                    array_push($oa_resource_types, $tag->textContent);
                }

                if (strtolower($user_data['use_level']) == $educational_context) {
                    $result[$oa]['val'] += 10;
                }

                foreach ($user_prefer_resource_types as $key => $prefer_resource) {
                    if (in_array($prefer_resource, $oa_resource_types)) {
                        $result[$oa]['val'] += 10;
                    }
                }

                if ($user_narrator == 1 || $user_sr == 1) {
                    if ($access_mode_auditive && ($accessibility_presen_auditory == 'voz' || $accessibility_presen_auditory == 'voice'
                        || $accessibility_presen_auditory = 'sonido' || $accessibility_presen_auditory = 'sound' || $adaptation_type_audio_description == 'si' || $adaptation_type_audio_description == 'yes' || $adaptation_type_hearing_alternative == 'si' || $adaptation_type_hearing_alternative == 'yes')) {
                        $result[$oa]['val'] += 20;
                    }


                    if ($access_mode_textual && ($textual == 'yes' || $textual == 'si' || $textual_alternative == 'yes' || $textual_alternative == 'si') && $rights_cost == 'no' && $rights_copyrightandotherrestrictions == 'no') {
                        $result[$oa]['val'] += 15;
                    }

                    if ($interactivity_level == 'low' || $interactivity_level == 'bajo' || $interactivity_level == 'medium' || $interactivity_level == 'medio') {
                        $result[$oa]['val'] += 5;
                    }
                }

                if ($user_lsc == 1) {
                    if ($accessibility_sign_lang  == 'yes' || $accessibility_sign_lang  == 'si') {
                        $result[$oa]['val'] += 20;
                    }
                    if (
                        $access_mode_textual && ($textual == 'yes' || $textual == 'si' || $textual_alternative == 'yes' || $textual_alternative == 'si') &&
                        $rights_cost == 'no' && $rights_copyrightandotherrestrictions == 'no'
                    ) {
                        $result[$oa]['val'] += 15;
                    }

                    if ($accessibility_subtitles == 'yes' || $accessibility_subtitles == 'si') {
                        $result[$oa]['val'] += 10;
                    }

                    if ($access_mode_visual && ($accessibility_presen_visual == 'yes' || $accessibility_presen_visual == 'si')) {
                        $result[$oa]['val'] += 10;
                    }
                    if (
                        $interactivity_level == 'very low' || $interactivity_level == 'muy bajo'
                        || $interactivity_level == 'low' || $interactivity_level == 'bajo'
                        || $interactivity_level == 'medium' || $interactivity_level == 'medio'
                    ) {
                        $result[$oa]['val'] += 5;
                    }
                }

                if ($user_adapta_interfaz == 1) {
                    if ($access_mode_textual && ($textual == 'yes' || $textual == 'si' || $textual_alternative == 'yes' || $textual_alternative == 'si')) {
                        $result[$oa]['val'] += 15;
                    }

                    if ($access_mode_visual && ($accessibility_presen_visual == 'yes' || $accessibility_presen_visual == 'si')) {
                        $result[$oa]['val'] += 10;
                    }


                    if ($rights_cost == 'no' && $rights_copyrightandotherrestrictions == 'no') {
                        $result[$oa]['val'] += 0.10;
                    }
                }

                if ($user_data['id_input_device'] == 1 && ($interaction_mode_keyboard == 'yes' || $interaction_mode_keyboard == 'si')) {
                    $result[$oa]['val'] += 5;
                }

                if ($user_data['id_input_device'] == 2 && ($interaction_mode_mouse == 'yes' || $interaction_mode_mouse == 'si')) {
                    $result[$oa]['val'] += 5;
                }

                if ($context_educational_purpose == '2' && in_array('Actividad interactiva', $oa_resource_types)) {
                    $result[$oa]['val'] += 10;
                }

                if ($context_concentration == '2' || $context_concentration == '3' && ($difficulty == 'muy fácil'
                    || $difficulty == 'very easy') || ($difficulty == 'medium' || $difficulty == 'medio')) {
                    $result[$oa]['val'] += 10;
                }

                if (
                    $context_concentration == '1' && ($difficulty == 'difícil' || $difficulty == 'difficult')
                    || ($difficulty == 'muy difícil' || $difficulty == 'very difficult')
                ) {
                    $result[$oa]['val'] += 10;
                }
            }
            foreach ($result as $i_oa => $oa) {
                if ($result[$i_oa]['val'] < 40) {
                    unset($result[$i_oa]);
                }
            }

            array_multisort(array_column($result, 'val'), SORT_DESC, $result);
        }

        $content = array(
            "result" => $result,
            "palabras" => $palabras,
            "sess" => $sess,
            "user" => $user
        );
        $this->load->view("base/result_view", $content);
    }

    public function limpiar($cadena)
    {
        $no_permitidas = array(
            "Ã¡",
            "Ã©",
            "Ã­",
            "Ã³",
            "Ãº",
            "Ã",
            "Ã‰",
            "Ã",
            "Ã“",
            "Ãš",
            "Ã±",
            "Ã€",
            "Ãƒ",
            "ÃŒ",
            "Ã’",
            "Ã™",
            "Ãƒâ„¢",
            "Ãƒ ",
            "ÃƒÂ¨",
            "ÃƒÂ¬",
            "ÃƒÂ²",
            "ÃƒÂ¹",
            "Ã§",
            "Ã‡",
            "ÃƒÂ¢",
            "Ãª",
            "ÃƒÂ®",
            "ÃƒÂ´",
            "ÃƒÂ»",
            "Ãƒâ€š",
            "ÃƒÅ ",
            "ÃƒÅ½",
            "Ãƒâ€",
            "Ãƒâ€º",
            "Ã¼",
            "ÃƒÂ¶",
            "Ãƒâ€“",
            "ÃƒÂ¯",
            "ÃƒÂ¤",
            "Â«",
            "Ã’",
            "ÃƒÂ",
            "Ãƒâ€ž",
            "Ãƒâ€¹"
        );
        $permitidas = array(
            "a",
            "e",
            "i",
            "o",
            "u",
            "A",
            "E",
            "I",
            "O",
            "U",
            "n",
            "N",
            "A",
            "E",
            "I",
            "O",
            "U",
            "a",
            "e",
            "i",
            "o",
            "u",
            "c",
            "C",
            "a",
            "e",
            "i",
            "o",
            "u",
            "A",
            "E",
            "I",
            "O",
            "U",
            "u",
            "o",
            "O",
            "i",
            "a",
            "e",
            "U",
            "I",
            "A",
            "E"
        );
        $texto = str_replace($no_permitidas, $permitidas, $cadena);
        return $texto;
    }

    public function load_metadata($id_lo, $id_rep)
    {
        $cosa = $this->lo_model->get_metadata($id_lo, $id_rep);
        $content = array(
            "xml" => $cosa
        );
        $this->load->view("base/metadata_view", $content);
    }

    // RecomendaciÃ³n Paula

    protected function recomendacion($oas, $user)
    {
        $parametros = array(
            'idUsuarioActivo' => $user,
            'OAs' => $oas
        );
        $wsdl_url = 'http://localhost:6020/ServicioWeb?wsdl';

        // $wsdl_url = 'http://froac.manizales.unal.edu.co:6020/ServicioWeb';

        $client = new SOAPClient($wsdl_url);
        $result = $client->adaptarOAs($parametros);
        $cadena = "";
        $otro = "";
        foreach ($result as $paulis) {
            foreach ($paulis as $no) {

                // echo $no->idOA . "-" . $no->idRepository . "$";

                $cadena = $cadena . $no->idOA . "-" . $no->idRepository . "$";
            }
        }

        // $this->llenar_recomendacion($p,$supone);
        //        $this->llenar_recomendacion($result);

        return $cadena;
    }

    public function llenar_recomendacion($return1)
    {
        $return = urldecode($return1);
        $ob = explode("$", $return);
        $ob1 = array_pop($ob);
        $todos = array();
        foreach ($ob as $key) {
            $temp = explode("-", $key);
            $comp = array(
                'idOA' => $temp[0],
                'idRepository' => $temp[1]
            );
            array_push($todos, $comp);
        }

        // print_r($todos);
        // Con los id de los OAs recomendados, busco el titulo y la localizaciÃ³n

        for ($i = 0; $i < count($todos); $i++) {
            $rec[$i] = $this->lo_model->titulos_recomendacion($todos[$i]['idOA'], $todos[$i]['idRepository']);
        }

        $data = array(
            "rec" => $rec
        );
        $this->load->view('base/llenar_recomendacion_view', $data);
    }

    public function load_indicadores($id_lo, $id_rep, $username)
    {
        echo $id_lo, $id_rep, $username;
    }

    public function set_visita()
    {
        $this->lo_model->set_visita_lo();
    }

    // Hacer que el usuario admin pueda ver los objetos

    public function load_lo($url, $lo_name, $lo_id, $rep_id)
    {
        //$lo_rating = json_encode($this->lo_model->get_lo_gral_rating(base64_decode($lo_id), base64_decode($rep_id)));
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            //$user_lo_rank = json_encode($this->lo_model->get_user_rate_learning_object($session_data['username'], base64_decode($lo_id), base64_decode($rep_id)));
            $content = array(
                "user" => $session_data['username'],
                "usr_data" => $this->usuario_model->get_usr_data($session_data['username']),
                "usr_all_data" => $this->usuario_model->get_all_usr_data($session_data['username']),
                "main_view" => "base/lo_view",
                "sess" => 1,
                "url" => $url,
                "lo_name" => $lo_name,
                "lo_id" => $lo_id,
                "rep_id" => $rep_id,
                //"lo_rating"=> $lo_rating,
                //"user_lo_rank" => $user_lo_rank,
                "id_view" => "lo_view"
            );
            if ($session_data['username'] == "admin") {
                $this->load->view('base/base_template', $content);
            } else {
                $this->load->view('base/base_template', $content);
            }
        } else {
            $content = array(
                "main_view" => "base/lo_view",
                "sess" => 0,
                "url" => $url,
                "lo_name" => $lo_name,
                "lo_id" => $lo_id,
                //"lo_rating"=> $lo_rating,
                "user_lo_rank" => json_encode(array()),
                "rep_id" => $rep_id,
                "id_view" => "lo_view"
            );
            $this->load->view('base/base_template', $content);
        }
    }

    public function getLO()
    {
        $this->load->library('curl');
        $url = "http://127.0.0.1:5000/downloadLO/";
        $_POST = json_decode(file_get_contents('php://input'), true);
        $post_data = array(
            'url' => $_POST['url'],
            'name' => $_POST['name']
        );
        $output = $this->curl->simple_post($url, $post_data);
        header('Content-Type: application/json');
        $json = json_encode($output);
        echo ($json);
    }

    public function getLanguage()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
        $result = $this->lo_model->get_language($_POST['url']);
        $response = array(
            'language' => $result[0]['lo_language']
        );
        echo json_encode($response);
    }

    public function get_score_avg()
    {
        $result = $this->lo_model->get_avg_score();
        $avg = round($result[0]['avg']);
        echo $avg;
    }

    public function rateLearningObject()
    {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');
            $_POST = json_decode(file_get_contents('php://input'), true);
            $data = $_POST['rate'];
            $data['username'] = $session_data['username'];
            $this->lo_model->rate_learning_object($data);
        }
    }

    public function getLOGralRating()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
        $rating = $this->lo_model->get_lo_gral_rating($_POST['lo_id'], $_POST['rep_id']);
        header('Content-Type: application/json');
        $json = json_encode($rating);
        echo ($json);
    }
}
