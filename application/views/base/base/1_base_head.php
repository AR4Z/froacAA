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
    <?php if (!($this->session->userdata('logged_in')) || $this->session->userdata('need_custom_interfaz')):?>
        <link id='serif' rel="stylesheet" href='https://fonts.googleapis.com/css?family=PT+Serif' >
        <link id='cantarell' rel="stylesheet" href='https://fonts.googleapis.com/css?family=Cantarell'>
        <link id='source-code-pro' rel="stylesheet" href='https://fonts.googleapis.com/css?family=Source+Code+Pro'>
        <link id="contrast-styles" href="<?php echo base_url() ?>asset/css/enactors.css" rel="stylesheet">
    <?php endif;?>
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/button.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/flag-icon.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap-select.min.css" rel="stylesheet">
    <?php if ($id_view == 'lo_view'):?>
      <link href="<?php echo base_url() ?>asset/css/please-wait.css" rel="stylesheet">
      <script src="<?php echo base_url()?>asset/js/please-wait.js"></script>
    <?php endif;?>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.28.7/css/keyboard-dark.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/driver.js/dist/driver.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">  
    <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>
    <?php if ($id_view == 'lo_view') : ?>
    <link href="<?php echo base_url() ?>asset/css/star-rating.css" rel="stylesheet">
    <?php endif;?>
    <style>
        .card {
          min-height: 225px;
          min-width: 200px;
          margin-right: 5px;
        }

        .container-fluid {
          overflow-x: auto;
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

        div.ui-keyboard button.ui-keyboard-button.ui-keyboard-actionkey.large>span {
          position: static;
          font-size: calc(.8em + 1vw);
        }  
    </style>
    <script type="text/javascript">
    $(document).ready(function () {
      <?php if ($id_view == 'lo_view'):?>
      window.loading_screen = window.pleaseWait({
        logo: "<?php echo base_url()?>" + 'asset/img/frog_min.png',
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

      window.session_user = <?php echo json_encode($this->session->userdata('logged_in'));?>;
      window.needCustomInterfaz = Boolean(<?php echo $this->session->userdata('need_custom_interfaz');?>) || !session_user;
      window.needNarrator = Boolean(<?php echo $this->session->userdata('need_narrator');?>) || !session_user;
      window.needScreenReader = Boolean(<?php echo $this->session->userdata('need_screen_reader');?>) || !session_user;
      window.needLscTranslator = (Boolean(<?php echo $this->session->userdata('need_lsc_translator');?>) || !session_user) && ("<?php echo $this->session->userdata('site_lang');?>" == 'spanish');
      window.needStructuralNavigation = Boolean(<?php echo $this->session->userdata('need_structural_nav');?>) || !session_user;
      window.needVirtualKeyboard = Boolean(<?php echo $this->session->userdata('need_virtual_keyboard');?>) || !session_user;
      window.idView = "<?php echo $id_view ?>" || "nada";
      window.base_url = "<?php echo base_url()?>";
      window.idView = "<?php echo $id_view ?>" || "nada";
      window.userLang = "<?php echo $this->session->userdata('site_lang');?>" || "spanish";
      window.accessibilityBar = new AccessibilityBar(session_user,
        window.base_url,
        window.needCustomInterfaz,
        window.needNarrator,
        window.needScreenReader,
        window.needLscTranslator,
        window.needVirtualKeyboard,
        window.needStructuralNavigation)
      
      window.firstTime = localStorage.getItem('firstTime') === null

      if (window.idView != 'lo_view') {
        window.accessibilityBar.fetchDataAccessibilityBar()
          .then(data => {
            window.accessibilityBar.dataAccessibilityBar = data
            window.accessibilityBar.createAccessibilityElements()
          })
          .catch(e => console.error(e))
      }

      if (document.getElementById(idView) && document.getElementById(idView).length > 0) {
        document.getElementById(idView).classList.add('active')
      }
      window.tour = new Tour()
        window.next = false

        let introModal = document.getElementById('introModal')
        let helpButton = document.getElementById('accessibilityBarHelpButton')
        let modalIntroInstance = new Modal(introModal)

        introModal.addEventListener('shown.bs.modal', e => {
          hotkeys('enter', function (event, handler) {
            window.next = true
            modalIntroInstance.hide()
          })

          window.tour.speech('welcome')
        })

        introModal.addEventListener('hidden.bs.modal', e => {
          localStorage.setItem('firstTime', false)
          hotkeys.unbind('enter')
          if (window.tour.synth.speaking) {
            window.tour.synth.cancel()
          }

          if (window.accessibilityBar.lscTranslator &&
            window.accessibilityBar.lscTranslator.isTranslating) {
            window.accessibilityBar.lscTranslator.stop()
          }

          if (next) {
            let handler = function (e) {
              window.tour.start()
              window.accessibilityBar.collapse.removeEventListener('shown.bs.collapse', handler)
            }

            window.accessibilityBar.collapse.addEventListener('shown.bs.collapse', handler)
            window.accessibilityBar.collapseInstance.show()
          }
        })

        helpButton.addEventListener('click', e => {
          modalIntroInstance.show()
        })

      if (window.firstTime) {
        modalIntroInstance.show()
      }

    })
    </script>
</head>
<?php if ($id_view == 'login') : ?>

<body class="login-body" style='line-height:1.5; font-family:"Open Sans", sans-serif; cursor: auto;'>
  <?php if ($this->session->userdata('site_lang') == 'spanish'):?>
  <?php $this->load->view('base/base/accessibility/iris');?>
  <?php endif?>
  <?php $this->load->view('base/base/accessibility/toc');?>
  <?php else : ?>

  <body>
    <?php if (($this->session->userdata('need_lsc_translator')  || !$this->session->userdata('logged_in')) && ($this->session->userdata('site_lang') == 'spanish')):?>
    <?php $this->load->view('base/base/accessibility/iris');?>
    <?php endif?>

    <?php if ($this->session->userdata('need_structural_nav') || !($this->session->userdata('logged_in'))):?>
    <?php $this->load->view('base/base/accessibility/toc');?>
    <?php endif?>

    <div class="inner page">
      <?php endif;?>
      <audio id="key-sound" src="<?php echo base_url() ?>asset/audios/key.mp3">
      </audio>
      <div class="modal fade" id="introModal" tabindex="-1" role="dialog" aria-labelledby="labelWelcomeModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                <div class="col-sm">
                <select aria-label="Seleccionar idioma del sitio" onchange="localStorage.removeItem('firstTime');javascript:window.location.href='<?php echo base_url(); ?>LanguageSwitcher/switchLang/'+this.value;">
                    <option data-content='<span class="flag-icon flag-icon-co"></span> Español' value="spanish" <?php
                      if ($this->session->userdata('site_lang')
                      == 'spanish') {
                          echo 'selected="selected"';
                      } ?>><?php echo $this->lang->line('spanish'); ?> </a></option>
                    <option data-content='<span class="flag-icon flag-icon-us"></span> Inglés' value="english" <?php
                      if ($this->session->userdata('site_lang')
                      == 'english') {
                          echo 'selected="selected"';
                      } ?>><?php echo $this->lang->line('english'); ?> </a></option>
                    <option data-content='<span class="flag-icon flag-icon-br"></span> Portugués' value="portuguese"
                      <?php if ($this->session->userdata('site_lang')
                      == 'portuguese') {
                          echo 'selected="selected"';
                      } ?>><?php echo $this->lang->line('portuguese'); ?> </a></option>
                  </select>
                </div>
                <div class="col-sm">
                </div>
                  <div class="col-sm">
                    <?php if (!$this->session->userdata('logged_in')):?>
                    <button onclick="tour.takeMeToSignUp()" class="btn btn-outline-success btn-lg interprete-button"
                  type="submit">
                  Crear una cuenta
                </button>
                    <?php endif;?>
                  </div>
                </div>
                <div class="row justify-content-md-center">
                  <img src="<?php echo base_url() ?>asset/img/logo2.png" alt="Logo FROAC" width="100" height="143.383">
                </div>
                <div class="row justify-content-md-center">
                  <h2 id="labelWelcomeModal" class="title"><?php echo $this->lang->line('welcome'); ?> </h2>
                  <p class="description">
                  <?php echo $this->lang->line('description_intro_modal'); ?> </a>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="mr-auto">
                <?php if ($this->session->userdata('site_lang') == 'spanish') : ?>
                <button onclick="tour.interprete('welcome')" class="btn btn-outline-success btn-lg interprete-button"
                  type="submit">
                  <i class="fas fa-sign-language"></i>
                  <?php echo $this->lang->line('interprete'); ?> 
                </button>
                <?php endif;?>
                <button onclick="tour.speech('welcome')" class="btn btn-outline-success btn-lg text-to-speech-button"
                  type="submit">
                  <i class="fas fa-headphones"></i>
                  <?php echo $this->lang->line('listen'); ?>
                </button>
              </div>
              <button class="btn btn-danger" data-dismiss="modal" type="submit">
              <?php echo $this->lang->line('exit'); ?>
              </button>
              <button onclick="next=true" class="btn btn-primary" data-dismiss="modal" type="submit">
              <?php echo $this->lang->line('continue'); ?>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade bd-example-modal-lg" id="controlsModal" tabindex="-1" role="dialog" aria-labelledby="labelCommandsModal"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="height: 95%;">
          <div class="modal-content" style="height: 95%;">
            <div class="modal-body">
              <div id="controlsAccessibilityTools" style="height: 95%;" class="carousel slide" data-ride="carousel"
                data-interval="false">
                <h2 id="labelCommandsModal" class="sr-only">Comandos de herramientas de accesibilidad</h2>
                <div class="carousel-inner" style="height: 95%;">
                  <div class="carousel-item active">
                    <div class="container-fluid">
                      <div class="row justify-content-md-center">
                        <h2 class="title"><?php echo $this->lang->line('screen_reader_shortcuts'); ?> </h2>
                      </div>
                      <dl class="row">
                        <dt class="col-sm-3"><strong>Ctrl + s</strong></dt>
                        <dd class="col-sm-9"><?php echo $this->lang->line('on_screen_reader'); ?> </dd>
                        <dt class="col-sm-3"><strong>Ctrl + d</strong></dt>
                        <dd class="col-sm-9"><?php echo $this->lang->line('next_screen_reader'); ?> </dd>
                        <dt class="col-sm-3">Ctrl + p</dt>
                        <dd class="col-sm-9"><?php echo $this->lang->line('previous_screen_reader'); ?></dd>
                        <dt class="col-sm-3">Ctrl + f</dt>
                        <dd class="col-sm-9"><?php echo $this->lang->line('mode_screen_reader'); ?> </dd>
                        <dt class="col-sm-3">Ctrl + a</dt>
                        <dd class="col-sm-9"><?php echo $this->lang->line('off_screen_reader'); ?> </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="container-fluid">
                      <div class="row justify-content-md-center">
                        <h2 class="title"><?php echo $this->lang->line('narrator_shortcuts'); ?></h2>
                      </div>
                      <dl class="row">
                        <dt class="col-sm-3"><strong>Ctrl + e</strong></dt>
                        <dd class="col-sm-9"><?php echo $this->lang->line('on_narrator'); ?> </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="container-fluid">
                      <div class="row justify-content-md-center">
                        <h2 class="title"><?php echo $this->lang->line('voice_commands'); ?> </h2>
                      </div>
                      <dl class="row">
                        <dt class="col-sm-4"><strong><?php echo $this->lang->line('go_to_link'); ?></strong></dt>
                        <dd class="col-sm-8"><?php echo $this->lang->line('do_click_link'); ?> </dd>
                        <dt class="col-sm-4"><strong><?php echo $this->lang->line('focus_field'); ?></strong></dt>
                        <dd class="col-sm-8"><?php echo $this->lang->line('write_focus_field'); ?> </dd>
                        <dt class="col-sm-4"><strong><?php echo $this->lang->line('send_form'); ?> </strong></dt>
                        <dd class="col-sm-8"><?php echo $this->lang->line('send_focus_form'); ?> </dd>
                        <dt class="col-sm-4"><strong><?php echo $this->lang->line('writer_content'); ?> </strong></dt>
                        <dd class="col-sm-8"><?php echo $this->lang->line('writer_in_current_field'); ?></dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="mr-auto">
                <?php if ($this->session->userdata('site_lang') == 'spanish') : ?>
                <button onclick="tour.interprete('controls')" class="btn btn-outline-success btn-lg interprete-button"
                  type="submit">
                  <i class="fas fa-sign-language"></i>
                  <?php echo $this->lang->line('interprete'); ?> 
                </button>
                <?php endif;?>
                <button onclick="tour.speech('controls')" class="btn btn-outline-success btn-lg text-to-speech-button"
                  type="submit">
                  <i class="fas fa-headphones"></i>
                  <?php echo $this->lang->line('listen'); ?> </button>
              </div>
              <button id="prevButtonControls" onclick="tour.prevControlsSlide()" class="btn btn-outline-primary" type="submit">
              <?php echo $this->lang->line('before'); ?>
              </button>
              <button id="nextButtonControls" onclick="tour.nextControlsSlide()" class="btn btn-outline-primary" type="submit">
              <?php echo $this->lang->line('next'); ?>
              </button>
              <button id="finishButtonControls" class="btn btn-primary" data-dismiss="modal" type="submit" style="display:none;">
              <?php echo $this->lang->line('finish'); ?> 
              </button>
            </div>
          </div>
        </div>
      </div>
