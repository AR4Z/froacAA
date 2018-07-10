<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Mosaddek">
    <meta name="keyword" content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <link rel="shortcut icon" href="img/favicon.png">
    <link href="<?php echo base_url() ?>/asset/img/frog1.png" rel="icon" />
    <title>FROAC</title>
    <!-- Bootstrap core CSS -->
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap-reset.css" rel="stylesheet">

    <!--external css-->
    <link href="<?php echo base_url() ?>asset/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="<?php echo base_url() ?>asset/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url() ?>asset/css/owl.carousel.css" type="text/css">
    <!-- Custom styles for this template -->
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style-responsive.css" rel="stylesheet" />
    <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>
    <script src="<?php echo base_url() ?>asset/js/inputSpinner.js"></script>

    <style>
        .card {
            min-height: 200px;
            min-width: 200px;
            margin-right: 5px;
        }

        .container-fluid {
            overflow-x: auto;
        }
    </style>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
    <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
          <script src="js/respond.min.js"></script>

        <![endif]-->

</head>

<body>

    <section id="container">
        <div class="collapse container-fluid" id="collapseExample">
            <br/>
            <div class="d-flex flex-row flex-nowrap">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center"><span><b>TAMAÑO DE FUENTE</b></span></div>
                    <div class="card-body">
                        <p>Cambiar el tamaño de la fuente.</p>
                        <p class="card-text">
                            <input type="number" data-decimals="1" value="1" min="1" max="2" step="0.1" id="fontSizeNav"/>
                        </p>
                    </div>
                </div>

            </div>


        </div>
        <script>

            $("input[type='number']").InputSpinner();

        </script>
