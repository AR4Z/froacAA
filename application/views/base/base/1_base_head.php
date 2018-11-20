<!DOCTYPE html>
<html lang="es" style="font-size:12px">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" type="image/png" href="<?php echo base_url() ?>asset/img/frog_min.ico"/>
    <title>FROAC</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/solid.css" integrity="sha384-VGP9aw4WtGH/uPAOseYxZ+Vz/vaTb1ehm1bwx92Fm8dTrE+3boLfF1SpAtB1z7HW" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css" integrity="sha384-1rquJLNOM3ijoueaaeS5m+McXPJCGdr5HcA03/VHXxcp2kX2sUrQDmFc3jR5i/C7" crossorigin="anonymous">
    <link rel="stylesheet" id="fontAwesomess" href="<?php echo base_url() ?>asset/css/font-awesome.min.css">
    <link id='open-sans' href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" id="font">
    <?php if(!($this->session->userdata('logged_in')) || $this->session->userdata('need_custom_interfaz')):?>
        <link id='serif' rel="stylesheet" href='https://fonts.googleapis.com/css?family=PT+Serif' >
        <link id='cantarell' rel="stylesheet" href='https://fonts.googleapis.com/css?family=Cantarell'>
        <link id='source-code-pro' rel="stylesheet" href='https://fonts.googleapis.com/css?family=Source+Code+Pro'>
        <link id="contrast-styles" href="<?php echo base_url() ?>asset/css/enactors.css" rel="stylesheet">
    <?php endif;?>
    <link href="<?php echo base_url() ?>asset/css/titatoggle.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/button.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/flag-icon.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap-select.min.css" rel="stylesheet">
    <?php if($id_view == 'lo_view'):?>
      <link href="<?php echo base_url() ?>asset/css/please-wait.css" rel="stylesheet">
      <script src="<?php echo base_url()?>asset/js/please-wait.js"></script>
    <?php endif;?>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.28.7/css/keyboard-dark.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/driver.js/dist/driver.min.css">
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

        .ui-keyboard span {
          font-size: calc(4em - 1vw);
        }

        .ui-keyboard-button {
          height: calc(4em - 1vh);
          line-height: calc(4em - 1vh);
          min-width: calc(4em - 5vw);
          margin: .2em;
          cursor: pointer;
        }

        /* increased specificity to override repositioning style */
        div.ui-keyboard button.ui-keyboard-button.ui-keyboard-actionkey>span {
          position: static;
          font-size: calc(.7em + 1vw);
        }

        .ui-keyboard.small span {
          font-size: calc(3em - 1vw);
        }

        .ui-keyboard-button.small {
          height: calc(3em - 1vh);
          line-height: calc(3em - 1vh);
          min-width: calc(3em - 5vw);
          margin: .2em;
          cursor: pointer;
        }

        /* increased specificity to override repositioning style */
        div.ui-keyboard button.ui-keyboard-button.ui-keyboard-actionkey.small>span {
          position: static;
          font-size: calc(.6em + 1vw);
        }

        .ui-keyboard.large span {
          font-size: calc(5em - 1vw);
        }

        .ui-keyboard-button.large {
          height: calc(5em - 1vh);
          line-height: calc(5em - 1vh);
          min-width: calc(5em - 5vw);
          margin: .2em;
          cursor: pointer;
        }

        /* increased specificity to override repositioning style */
        div.ui-keyboard button.ui-keyboard-button.ui-keyboard-actionkey.large>span {
          position: static;
          font-size: calc(.8em + 1vw);
        }
    </style>
    <script type="text/javascript">
    $(document).ready(function(){
      <?php if($id_view == 'lo_view'):?>
      window.loading_screen = window.pleaseWait({
        logo: "<?php echo base_url()?>"+'asset/img/frog_min.png',
        backgroundColor: '#f8f9fa',
        loadingHtml: `
        <p class='loading-message'>Estamos procesando el objeto de aprendizaje</p>
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>
        `
      });
      <?php endif;?>
        
      session_user = <?php echo json_encode($this->session->userdata('logged_in'));?>;
      needCustomInterfaz = Boolean(<?php echo $this->session->userdata('need_custom_interfaz');?>) || !session_user;
      needNarrator = Boolean(<?php echo $this->session->userdata('need_narrator');?>) || !session_user;
      needScreenReader = Boolean(<?php echo $this->session->userdata('need_screen_reader');?>) || !session_user;
      needLscTranslator = (Boolean(<?php echo $this->session->userdata('need_lsc_translator');?>) || !session_user) && ("<?php echo $this->session->userdata('site_lang');?>" == 'spanish');
      needStructuralNavigation = Boolean(<?php echo $this->session->userdata('need_structural_nav');?>) || !session_user;
      needVirtualKeyboard = Boolean(<?php echo $this->session->userdata('need_virtual_keyboard');?>) || !session_user;
      idView = "<?php echo $id_view ?>" || "nada";
      base_url = "<?php echo base_url()?>";
      idView = "<?php echo $id_view ?>" || "nada";
      userLang = "<?php echo $this->session->userdata('site_lang');?>" || "spanish";
      accessibilityBar = new AccessibilityBar(session_user, 
        base_url, 
        needCustomInterfaz, 
        needNarrator,
        needScreenReader, 
        needLscTranslator, 
        needVirtualKeyboard, 
        needStructuralNavigation)

      if (idView != 'lo_view') {
        accessibilityBar.fetchDataAccessibilityBar()
        .then(data => {
          accessibilityBar.dataAccessibilityBar = data
          accessibilityBar.createAccessibilityElements()
        })
        .catch(e => console.error(e))
      }

      if (document.getElementById(idView).length > 0) {
        document.getElementById(idView).classList.add('active')
      }

      tour = new Tour()
      next = false
      
      $('#introModal').modal('show')
      $('#introModal').on('hidden.bs.modal', function (e) {
        if(next) {
          $('#accessibilityBar').collapse('show')
          $('#accessibilityBar').on('shown.bs.collapse', (e) => {
            tour.start()
          })
        }
      })
    });
    </script>
</head>

<?php if($id_view == 'login') : ?>
    <body class="login-body" style='line-height:1.5; font-family:"Open Sans", sans-serif; cursor: auto;'>
    <?php if($this->session->userdata('site_lang') == 'spanish'):?>
        <?php $this->load->view('base/base/accessibility/iris');?>
    <?php endif?>
    <?php $this->load->view('base/base/accessibility/toc');?>
    <?php else : ?>
    <body>
        <?php if(($this->session->userdata('need_lsc_translator')  || !$this->session->userdata('logged_in')) && ($this->session->userdata('site_lang') == 'spanish')):?>
            <?php $this->load->view('base/base/accessibility/iris');?>
        <?php endif?>
        
        <?php if($this->session->userdata('need_structural_nav') || !($this->session->userdata('logged_in'))):?>
          <?php $this->load->view('base/base/accessibility/toc');?>
        <?php endif?>
        
        <div class="inner page">
<?php endif;?>
<audio id="key-sound" src="<?php echo base_url() ?>asset/audios/key.mp3">
</audio>
<!-- Button trigger modal 
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>-->

<!-- Modal -->
<div class="modal fade" id="introModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
      <img src="<?php echo base_url() ?>asset/img/logo2.png" alt="Logo FROAC" width="100">
      <h2 class="title"">¡Bienvenido a FROAC!</h2>
      <p class="description">
        Contamos con herramientas de accesibilidad para ayudarte a navegar en nuestro sitio.
        En esta guia aprenderas a usarlas para que puedas sacar el mayor provecho.
      </p>
      </div>
      <div class="modal-footer">
        <div class="mr-auto">
          <button onclick="tour.welcome(this)" class="btn btn-outline-success btn-lg interprete-button" type="submit"> 
          <i class="fas fa-sign-language"></i>
          Interpretar</button>
          <button onclick="tour.welcome(thi)" class="btn btn-outline-success btn-lg text-to-speech-button" type="submit">
          <i class="fas fa-headphones"></i>
          Escuchar</button>
        </div>
        <button class="btn btn-danger"  data-dismiss="modal" type="submit">
          Salir
        </button>
        <button onclick="next=true" class="btn btn-primary"  data-dismiss="modal" type="submit">
          Continuar
        </button>
        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>-->
      </div>
    </div>
  </div>
</div>
