<!DOCTYPE html>
<html lang="es" style="font-size:12px">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="img/favicon.png">
    <link href="<?php echo base_url() ?>/asset/img/frog1.png" rel="icon" />
    <title>FROAC</title>
    <link rel="stylesheet" id="fontAwesomess" href="<?php echo base_url() ?>asset/css/font-awesome.min.css">
    <link id='open-sans' href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" id="font">
    <?php if(!($this->session->userdata('logged_in')) || $this->session->userdata('adaptaInterfaz')):?>
        <link id='serif' rel="stylesheet" href='https://fonts.googleapis.com/css?family=PT+Serif' >
        <link id='cantarell' rel="stylesheet" href='https://fonts.googleapis.com/css?family=Cantarell'>
        <link id='source-code-pro' rel="stylesheet" href='https://fonts.googleapis.com/css?family=Source+Code+Pro'>
        <link href="<?php echo base_url() ?>asset/css/bootstrap-colorpicker.css" rel="stylesheet">
        <link id="contrast-styles" href="<?php echo base_url() ?>asset/css/enactors.css" rel="stylesheet">
    <?php endif;?>
    <link href="<?php echo base_url() ?>asset/css/titatoggle.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/button.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">

    <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>

    <style>
        .card {
            min-height: 200px;
            min-width: 200px;
            margin-right: 5px;
        }

        .container-fluid {
            overflow-x: auto;
        }

        .contrast-input[type="checkbox"][id^="cb"] {
            display: none;
        }

        .contrast-label {
            cursor: pointer;
        }

        .contrast-label:before {
            background-color: white;
            color: white;
            content: " ";
            display: block;
            border-radius: 50%;
            border: 1px solid grey;
            position: absolute;
            top: -5px;
            left: -5px;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 28px;
            transition-duration: 0.4s;
            transform: scale(0);
            z-index: 10;
        }

        .contras-label img {
            height: 64px;
            width: 64px;
            transition-duration: 0.2s;
            transform-origin: 50% 50%;
        }

        :checked+.contras-label {
            border-color: #ddd;
        }

        :checked+.contrast-label:before {
            content: "✔";
            background-color: grey;
            transform: scale(1);
        }

        .trail {
            position: absolute;
            height: 6px;
            width: 6px;
            border-radius: 3px;
            background: teal;
            z-index: 10;
            pointer-events: none;
        }

        .no-invert-color {
            filter: invert(0);
        }
    </style>

    
    <script type="text/javascript">
    let session_user;
    let preferencesAdaptainterfaz;
    let preferencesNarrator;
    let preferencesSr;
    let needPrefAdaptInterfaz;
    let needNarrator;
    let needSr;
    let customColors;
    let base_url;
    let idView;
    let nodeIframe;
    let iframeDocument;
    let nParagraph;
    let pLining;
    let treeNarrator;
    let textReading;
    let parentElementText;
    let target;
    let srClass;
    let cfgVoiceNarrator;
    let cfgReproductor;
    let player;
    let elmLining;
    let audioSrcs;
    let htmlElements;

    $(document).ready(function(){

        session_user = <?php echo json_encode($this->session->userdata('logged_in'));?>;
        preferencesAdaptainterfaz = <?php echo json_encode($this->session->userdata('preferencesAdaptainterfaz'));?>;
        preferencesNarrator = <?php echo json_encode($this->session->userdata('preferencesNarrator'));?>;
        preferencesSr = <?php echo json_encode($this->session->userdata('preferencesSr'));?>;
        needPrefAdaptInterfaz = "<?php echo $this->session->userdata('adaptaInterfaz');?>" || false;
        needNarrator = "<?php echo $this->session->userdata('needNarrator');?>" || false;
        needSr = "<?php echo $this->session->userdata('needSr');?>" || false;
        customColors = <?php echo json_encode($this->session->userdata('customColors'));?>;
        base_url = "<?php echo base_url()?>";
        idView = "<?php echo $id_view ?>" || "nada";

        $("#" + idView).addClass('active');
    });

    </script>

</head>

<?php if($id_view == 'login') : ?>
    <body class="login-body" style='line-height:1.5; font-family:"Open Sans", sans-serif; cursor: auto;'>

    <?php else : ?>
        <body>
        
        <div class="page">
<?php endif;?>
<div class="container-iris draggable" style="width:340px; height:430px; background-color:black; padding-top:10px; padding-bottom:5px; border-radius: 15px; z-index:1000;position:absolute;">
		<div class="video" id="iris" style="width:320px; height:240px; margin:auto; background-image: url(<?php echo base_url()?>asset/img/lengua/conector_espera.jpg); position:relative">
		</div>
		<div id="control-iris" style="width:320px; height:40px; margin:auto; text-align: center; padding-top:10px; position:relative;">
			<button onclick="playIris()" id="play-iris" class="button button-raised button-primary button-circle button-small">
				<i class="fa fa-play"></i>
			</button>
			<button onclick="pauseIris()" id="pause-iris" class="button button-raised button-primary button-circle button-small">
				<i class="fa fa-pause"></i>
			</button>
			<button onclick="stopIris()" id="stop-iris" class="button button-raised button-primary button-circle button-small">
				<i class="fa fa-stop"></i>
			</button>
		</div>
		<div id="container-input-iris" style="width:320px; height:140px; margin:auto; position:relative; padding-top:10px;">
			<textarea id="input-iris" placeholder="Escribe lo que quieras traducir" rows="4" cols="42" style="resize: none; position:relative"></textarea>
			<a onclick="cleanInputIris()" class="button button-raised button-circle button-primary button-small" style="float:left; margin-top:5px"><i class="fa fa-trash"></i></a>

			<a onclick="translate()" class="button button-raised button-pill button-primary button-small" style="float:right; margin-top:5px">Traducir</a>
		</div>
	</div>

