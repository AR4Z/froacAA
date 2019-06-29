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
        $dissabilities_id = array();
        $languages = ["spanish" => "es", "portuguese" => "pt", "english" => "en"];
        $lang = $languages[$this->session->userdata('site_lang') ];
        $params = urldecode($params);
        $params = preg_replace('/_+/', '_', $params);
        if (substr($params, -1) == "_") {
            $params = substr($params, 0, -1);
        }

        // $params = $this->limpiar($params);

        $arrayParams = explode("_", $params);
        foreach ($arrayParams as $key => $value) {
            if (substr($value, -3) == "ion") {
                $arrayParams[$key] = substr($value, 0, -3) . "iÃ³n";
            }
        }

        $stopwordsConTildes = array(
            "a",
            "acÃ¡",
            "ahÃ­",
            "ajena",
            "ajenas",
            "ajeno",
            "ajenos",
            "al",
            "algo",
            "algÃºn",
            "alguna",
            "algunas",
            "alguno",
            "algunos",
            "allÃ¡",
            "alli",
            "allÃ­",
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
            "aquÃ­",
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
            "cÃ³mo",
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
            "cuÃ¡n",
            "cuando",
            "cuanta",
            "cuÃ¡nta",
            "cuantas",
            "cuÃ¡ntas",
            "cuanto",
            "cuÃ¡nto",
            "cuantos",
            "cuÃ¡ntos",
            "de",
            "dejar",
            "del",
            "demÃ¡s",
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
            "Ã©l",
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
            "jamÃ¡s",
            "junto",
            "juntos",
            "la",
            "largo",
            "las",
            "lo",
            "los",
            "mas",
            "mÃ¡s",
            "me",
            "menos",
            "mi",
            "mÃ­a",
            "mia",
            "mias",
            "mientras",
            "mio",
            "mÃ­o",
            "mios",
            "mis",
            "misma",
            "mismas",
            "mismo",
            "mismos",
            "modo",
            "mucha",
            "muchas",
            "muchÃ­sima",
            "muchÃ­simas",
            "muchÃ­simo",
            "muchÃ­simos",
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
            "por quÃ©",
            "porque",
            "primero",
            "primero desde",
            "puede",
            "pueden",
            "puedo",
            "pues",
            "que",
            "quÃ©",
            "querer",
            "quien",
            "quiÃ©n",
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
            "sÃ­",
            "siempre",
            "siendo",
            "sin",
            "sÃ­n",
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
            "tambiÃ©n",
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
            "tÃº",
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
            "yo"
        );
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
            $dissabilities = $this->usuario_model->get_discapacidad_est($session_data['username']);
            $etnica = $this->usuario_model->get_etnica($session_data['username']);
            foreach ($result as $oa => $obj) {
                $result[$oa]['val'] = 0;
            }

            foreach ($dissabilities as $dissability) {
                array_push($dissabilities_id, $dissability->use_dissability_id);
            }

            if (in_array(2, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $auditory = $dom->getElementsByTagName('auditory') [0]->textContent == 'voz';
                    $hearingalternative = $dom->getElementsByTagName('hearingalternative') [0]->textContent == 'yes';
                    $textual = $dom->getElementsByTagName('textual') [0]->textContent == 'yes';
                    $textualalterantive = $dom->getElementsByTagName('textualalternative') [0]->textContent == 'yes';
                    $interactivitylevel_text = $dom->getElementsByTagName('interactivitylevel') [0]->textContent;
                    $interactivitylevel_low = $interactivitylevel_text == 'low';
                    $interactivitylevel_medium = $interactivitylevel_text == 'medium';
                    $interactivitylevel_high = $interactivitylevel_text == 'high';
                    $format_text_content = $dom->getElementsByTagName('format') [0]->textContent;
                    $format_audio = $format_text_content == 'audio';
                    $format_video = $format_text_content == 'video';
                    $format_text = $format_text_content == 'text';
                    if (($auditory && $hearingalternative) || ($textual && $textualalterantive)) {
                        $result[$oa]['val']+= 0.7;
                    }

                    if ($interactivitylevel_low || $interactivitylevel_medium || $interactivitylevel_high) {
                        $result[$oa]['val']+= 0.15;
                    }

                    if ($format_audio || $format_video || $format_text) {
                        $result[$oa]['val']+= 0.15;
                    }
                }
            }

            if (in_array(1, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $auditory = $dom->getElementsByTagName('auditory') [0]->textContent == 'voz';
                    $hearingalternative = $dom->getElementsByTagName('hearingalternative') [0]->textContent == 'yes';
                    $format_text_content = $dom->getElementsByTagName('format') [0]->textContent;
                    $format_audio = $format_text_content == 'audio';
                    $format_video = $format_text_content == 'video';
                    $interactivitylevel_text = $dom->getElementsByTagName('interactivitylevel') [0]->textContent;
                    $interactivitylevel_very_low = $interactivitylevel_text == 'very low';
                    $interactivitylevel_medium = $interactivitylevel_text == 'medium';
                    $interactivitylevel_low = $interactivitylevel_text == 'low';
                    if ($auditory && $hearingalternative) {
                        $result[$oa]['val']+= 0.8;
                    }

                    if ($interactivitylevel_low || $interactivitylevel_medium || $interactivitylevel_very_low) {
                        $result[$oa]['val']+= 0.1;
                    }

                    if ($format_audio || $format_video) {
                        $result[$oa]['val']+= 0.1;
                    }
                }
            }

            if (in_array(3, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $signalalternative = $dom->getElementsByTagName('signlanguage') [0]->textContent == 'yes';
                    $interactivitylevel_text = $dom->getElementsByTagName('interactivitylevel') [0]->textContent;
                    $interactivitylevel_very_low = $interactivitylevel_text == 'very low';
                    $interactivitylevel_medium = $interactivitylevel_text == 'medium';
                    $interactivitylevel_low = $interactivitylevel_text == 'low';
                    if ($signalalternative) {
                        $result[$oa]['val']+= 0.9;
                    }

                    if ($interactivitylevel_low || $interactivitylevel_medium || $interactivitylevel_very_low) {
                        $result[$oa]['val']+= 0.1;
                    }
                }
            }

            if (in_array(4, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $signalalternative = $dom->getElementsByTagName('signlanguage') [0]->textContent == 'yes';
                    $textual = $dom->getElementsByTagName('textual') [0]->textContent == 'yes';
                    $textualalterantive = $dom->getElementsByTagName('textualalternative') [0]->textContent == 'yes';
                    $interactivitylevel_text = $dom->getElementsByTagName('interactivitylevel') [0]->textContent;
                    $interactivitylevel_very_low = $interactivitylevel_text == 'very low';
                    $interactivitylevel_medium = $interactivitylevel_text == 'medium';
                    $interactivitylevel_low = $interactivitylevel_text == 'low';
                    $format_text_content = $dom->getElementsByTagName('format') [0]->textContent;
                    $format_text = $format_text_content == 'text';
                    $format_image = $format_text_content == 'image';
                    $format_application = $format_text_content == 'application';
                    if (($signalalternative || $textual) && $textualalterantive) {
                        $result[$oa]['val']+= 0.8;
                    }

                    if ($interactivitylevel_low || $interactivitylevel_medium || $interactivitylevel_very_low) {
                        $result[$oa]['val']+= 0.1;
                    }

                    if ($format_text || $format_image || $format_application) {
                        $result[$oa]['val']+= 0.1;
                    }
                }
            }

            if (in_array(6, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $mouse = $dom->getElementsByTagName('mouse') [0]->textContent == 'yes';
                    if ($mouse) {
                        $result[$oa]['val']+= 1;
                    }
                }
            }

            if (in_array(5, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $keyboard = $dom->getElementsByTagName('keyboard') [0]->textContent == 'yes';
                    if ($keyboard) {
                        $result[$oa]['val']+= 1;
                    }
                }
            }

            if (!(in_array(5, $dissabilities_id) || in_array(6, $dissabilities_id))) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $keyboard = $dom->getElementsByTagName('keyboard') [0]->textContent == 'yes';
                    $mouse = $dom->getElementsByTagName('mouse') [0]->textContent == 'yes';
                    if ($keyboard || $mouse) {
                        $result[$oa]['val']+= 1;
                    }
                }
            }

            if (in_array(7, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $auditory_textcontent = $dom->getElementsByTagName('auditory') [0]->textContent;
                    $auditory_voice = $auditory_textcontent == 'voice';
                    $auditory_sound = $auditory_textcontent == 'sound';
                    $visual = $dom->getElementsByTagName('visual') [0]->textContent == 'yes';
                    if ($auditory_sound || $auditory_voice || $visual) {
                        $result[$oa]['val']+= 1;
                    }
                }
            }

            if (in_array(8, $dissabilities_id)) {
                foreach ($result as $oa => $obj) {
                    $dom = new DOMDocument();
                    $dom->loadXML($result[$oa]['lo_xml_lom']);
                    $interactivitylevel_text = $dom->getElementsByTagName('interactivitylevel') [0]->textContent;
                    $interactivitylevel_very_low = $interactivitylevel_text == 'very low';
                    $interactivitylevel_medium = $interactivitylevel_text == 'medium';
                    $interactivitylevel_low = $interactivitylevel_text == 'low';
                    if ($interactivitylevel_low || $interactivitylevel_medium || $interactivitylevel_very_low) {
                        $result[$oa]['val']+= 1;
                    }
                }
            }

            foreach ($result as $i_oa => $oa) {
                if ($result[$i_oa]['val'] < 0.8) {
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
        $lo_rating = json_encode($this->lo_model->get_lo_gral_rating(base64_decode($lo_id), base64_decode($rep_id)));
        if ($this->session->userdata('logged_in')) {
			$session_data = $this->session->userdata('logged_in');
			$user_lo_rank = json_encode($this->lo_model->get_user_rate_learning_object($session_data['username'], base64_decode($lo_id), base64_decode($rep_id)));
            $content = array(
                "user" => $session_data['username'],
                "usr_data" => $this->usuario_model->get_usr_data($session_data['username']) ,
                "usr_all_data" => $this->usuario_model->get_all_usr_data($session_data['username']) ,
                "main_view" => "base/lo_view",
                "sess" => 1,
                "url" => $url,
                "lo_name" => $lo_name,
                "lo_id" => $lo_id,
                "rep_id" => $rep_id,
                "lo_rating"=> $lo_rating,
                "user_lo_rank" => $user_lo_rank,
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
                "lo_rating"=> $lo_rating,
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
        echo($json);
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
}
