<!DOCTYPE html>
<html lang="es" style="font-size:12px">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="img/favicon.png">
    <link href="<?php echo base_url() ?>/asset/img/frog1.png" rel="icon" />
    <title>FROAC</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/solid.css" integrity="sha384-VGP9aw4WtGH/uPAOseYxZ+Vz/vaTb1ehm1bwx92Fm8dTrE+3boLfF1SpAtB1z7HW" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css" integrity="sha384-1rquJLNOM3ijoueaaeS5m+McXPJCGdr5HcA03/VHXxcp2kX2sUrQDmFc3jR5i/C7" crossorigin="anonymous">
    <link rel="stylesheet" id="fontAwesomess" href="<?php echo base_url() ?>asset/css/font-awesome.min.css">
    <link id='open-sans' href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" id="font">
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/popper.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/button.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/flag-icon.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap-select.min.css" rel="stylesheet">
    <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>


</head>

<?php if($id_view == 'login') : ?>
    <body class="login-body" style='line-height:1.5; font-family:"Open Sans", sans-serif; cursor: auto;'>
    <?php $this->load->view('base/base/accessibility/iris');?>
    <?php $this->load->view('base/base/accessibility/toc');?>
    <?php else : ?>
        <body>

        <?php if($this->session->userdata('need_lsc_translator') || $this->session->userdata('need_structural_nav') || !($this->session->userdata('logged_in'))):?>
            <?php $this->load->view('base/base/accessibility/iris');?>
            <?php $this->load->view('base/base/accessibility/toc');?>
        <?php endif?>
        
        <div class="page">
<?php endif;?>

<audio id="key-sound" src="<?php echo base_url() ?>asset/audios/key.mp3">
</audio>
