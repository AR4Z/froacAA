<!DOCTYPE html>
<html lang="es" style="font-size:12px">

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
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" id="font">
    <link rel="stylesheet" href="<?php echo base_url() ?>asset/css/font-awesome.min.css">
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap-reset.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/bootstrap-colorpicker.min.css" rel="stylesheet">

    <!--external css-->
    <link href="<?php echo base_url() ?>asset/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="<?php echo base_url() ?>asset/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url() ?>asset/css/owl.carousel.css" type="text/css">
    <!-- Custom styles for this template -->
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style-responsive.css" rel="stylesheet" />
    <link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/enactors.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/titatoggle.min.css" rel="stylesheet">
    <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>
    <script src="<?php echo base_url() ?>asset/js/jquery.awesome-cursor.min.js"></script>
    <script src="<?php echo base_url() ?>asset/js/bootstrap-colorpicker.min.js"></script>

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
            z-index:10;
        }
    </style>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
    <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
          <script src="js/respond.min.js"></script>

        <![endif]-->

</head>

<body style='line-height:1.5; font-family:"Open Sans", sans-serif; cursor: auto;'>

    <section id="container">
        <div class="collapse container-fluid" id="collapseExample">
            <br/>
            <div class="d-flex flex-row flex-nowrap">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center"><span><b>TAMAÑO DE FUENTE</b></span></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Cambiar el tamaño de la fuente.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="input-group">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[0]">
                                            <span class="oi oi-minus"></span>
                                        </button>
                                    </span>
                                    <input type="text" name="quant[0]" id="inputFontSize" class="form-control input-number" value="12" min="9" max="36" step="1" data-decimals="0" style="text-align:center">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[0]">
                                            <span class="oi oi-plus"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center"><span><b>TAMAÑO DE INTERLINEADO</b></span></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Cambiar el tamaño del interlineado.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="input-group">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
                                            <span class="oi oi-minus"></span>
                                        </button>
                                    </span>
                                    <input type="text" name="quant[1]" id="inputInterlineSize" class="form-control input-number" value="1.5" min="1" max="2" step="0.1" data-decimals="1" style="text-align:center">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                                            <span class="oi oi-plus"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card bg-light mb-3" style="max-width: 45rem; min-width: 45rem;">
                    <div class="card-header text-center"><span><b>CONTRASTE</b></span></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Cambiar el contraste.</p>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio1" value="normal" checked>
                                <label class="form-check-label contrast-label" for="inlineRadio1"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/no.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio2" value="black-white">
                                <label class="form-check-label contrast-label" for="inlineRadio2"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-white.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio3" value="white-black">
                                <label class="form-check-label contrast-label" for="inlineRadio3"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/white-black.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio4" value="black-yellow">
                                <label class="form-check-label contrast-label" for="inlineRadio4"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-yellow.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio5" value="yellow-black">
                                <label class="form-check-label contrast-label" for="inlineRadio5"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/yellow-black.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio6" value="gray">
                                <label class="form-check-label contrast-label" for="inlineRadio6"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/gray.png" /></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center"><span><b>TIPO DE FUENTE</b></span></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Cambiar el tipo de fuente.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <select name="type-font" class="custom-select">
                                    <option selected value="open-sans">Open Sans</option>
                                    <option value="serif">Serif</option>
                                    <option value="cantarell">Cantarell</option>
                                    <option value="source-code-pro">Source code PRO</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card bg-light mb-3" style="max-width: 40rem; min-width: 40rem;">
                    <div class="card-header text-center"><span><b>CONFIGURACIÓN DEL CURSOR <i class="fa fa-mouse-pointer" style="color:green, font-size:16px;"></i></b></span></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Cambiar configuración del cursor.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <b>TAMAÑO DEL CURSOR</b>
                                <br/>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="normalSizeCursor" value="normal" checked>
                                    <label class="form-check-label" for="normalSizeCursor">No cambiar</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize16" value="16">
                                    <label class="form-check-label" for="cursorSize32">16 x 16</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize32" value="32">
                                    <label class="form-check-label" for="cursorSize80">32 x 32</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize40" value="40">
                                    <label class="form-check-label" for="cursorSize128">40 x 40</label>
                                </div>

                                <div id="div-color-cursor" class="no-high-contrast" style="display:none">
                                    <b class="no-high-contrast">COLOR DEL CURSOR</b>
                                    <br/>
                                    <div id="id1" class="input-group colorpicker-component formcolorpicker no-high-contrast">
                                        <input type="text" name="colorMousePointer" id="colorMousePointer" value="rgb(255, 18, 18)" class="form-control no-high-contrast" />
                                        <div class="input-group-append no-high-contrast">
                                            <span class="input-group-text input-group-addon no-high-contrast"><i class="no-high-contrast"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <b>TAMAÑO DEL RASTRO</b>
                                <br/>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="normalSizeCursorTrails" value="0" checked>
                                    <label class="form-check-label" for="normalSizeCursorTrails">Sin rastro</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails12" value="12">
                                    <label class="form-check-label" for="cursorSizeTrails12">12</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails24" value="24">
                                    <label class="form-check-label" for="cursorSizeTrails24">24</label>
                                </div>
                                <div id="div-color-cursor-trails" class="no-high-contrast" style="display:none">
                                    <b class="no-high-contrast">COLOR DEL RASTRO</b>
                                    <br/>
                                    <div id="id1" class="input-group colorpicker-component formcolorpicker no-high-contrast">
                                        <input type="text" name="colorCursorTrails" id="colorCursorTrails" value="rgb(255, 18, 18)" class="form-control no-high-contrast" />
                                        <div class="input-group-append no-high-contrast">
                                            <span class="input-group-text input-group-addon no-high-contrast"><i class="no-high-contrast"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-light mb-3" style="max-width: 18rem; min-width: 18rem;">
                    <div class="card-header text-center"><span><b>CONFIGURACIÓN DE COLORES</i></b></span></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Cambiar configuración de colores.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <b>INVERTIR COLORES</b>
                                <br/>
                                <div class="form-check checkbox-slider--b">
	                                   <label>
		                                   <input name="invertImages" type="checkbox"><span>Imagenes</span>
	                                   </label>
                                </div>
                                <br/>
                                <div class="form-check checkbox-slider--b">
	                                   <label>
		                                   <input name="invertGeneral" type="checkbox"><span>General</span>
	                                   </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            $("input[name='invertImages']").change(function(){
                if ($(this).prop("checked")) {
                    $('img').css('filter', 'invert(1)');
                    $('i').css('filter', 'invert(1)');
                } else {
                    $('img').css('filter', 'invert(0)');
                    $('i').css('filter', 'invert(0)');
                }
            });
            $("input[name='invertGeneral']").change(function(){
                if ($(this).prop("checked")) {
                    $('body').css('filter', 'invert(1)');
                } else {
                    $('body').css('filter', 'invert(0)');
                }
            });
            $('.formcolorpicker').each(function() {
                $(this).colorpicker();
            });

            $("input[name='colorCursorTrails']").change(function(){
                $('.trail').css('background', $("input[name='colorCursorTrails']").val());
            });

            $("input[name='radioOptionsSizeCursorTrails']").change(function(){
                let size = parseInt($("input[name='radioOptionsSizeCursorTrails']:checked").val());
                if(size){
                    $('#div-color-cursor-trails').show();
                    $('.trail').remove();
                    createDots(size);
                    $('.trail').css('background', $("input[name='colorCursorTrails']").val());
                } else {
                    $('#div-color-cursor-trails').hide();
                    $('.trail').remove();
                    createDots(0);
                }
            });
            $("input[name='colorMousePointer']").change(function() {
                let size = $("input[name='radioOptionsSizeCursor']:checked").val();
                console.log(size);
                changeMousePointer(size);
            })
            $("input[name='radioOptionsSizeCursor']").change(function() {
                let size = parseInt($("input[name='radioOptionsSizeCursor']:checked").val());
                console.log(size);
                if (size) {
                    $('#div-color-cursor').show();
                    changeMousePointer(size);
                } else {
                    $('#div-color-cursor').hide();
                    $('body').css('cursor', 'auto');
                }
            });
            $("select[name='type-font']").change(function() {
                changeFontFamily($(this).val());
                console.log("cambiando");
            });
            $("input[name='radioOptionscontrast']").change(function() {
                console.log("hang");
                $('.colorpicker').addClass('no-high-contrast');
                $('.colorpicker-saturation').addClass('no-high-contrast');
                $('.colorpicker-guide').addClass('no-high-contrast');
                $('.colorpicker-hue').addClass('no-high-contrast');
                $('.colorpicker-alpha').addClass('no-high-contrast');
                $('.colorpicker-bar').children().addClass('no-high-contrast');
                highContrast($(this).val());
            });
            $('.btn-number').click(function(e) {
                e.preventDefault();
                console.log("ejecuto");

                fieldName = $(this).attr('data-field');
                console.log(fieldName);
                type = $(this).attr('data-type');
                let input = $("input[name='" + fieldName + "']");
                let currentVal = parseFloat(input.val());
                let step = parseFloat(input.attr('step'));
                let dataDecimals = parseFloat(input.attr('data-decimals')) || 0;
                console.log(dataDecimals);
                let newValue = 0;
                let decimals = 10;
                if (!isNaN(currentVal)) {
                    if (type == 'minus') {
                        input.data('tipo', type);
                        if (currentVal > input.attr('min')) {
                            newValue = currentVal - step;
                            decimals *= dataDecimals;
                            console.log(decimals);
                            if (dataDecimals) {
                                input.val(Math.round(newValue * decimals) / decimals).change();
                            } else {
                                input.val(newValue).change();
                            }
                        }
                        if (parseFloat(input.val()) == input.attr('min')) {
                            $(this).attr('disabled', true);
                        }


                    } else if (type == 'plus') {
                        input.data('tipo', type);
                        if (currentVal < input.attr('max')) {
                            newValue = currentVal + step;
                            decimals *= dataDecimals;
                            if (dataDecimals) {
                                input.val(Math.round(newValue * decimals) / decimals).change();
                            } else {
                                input.val(newValue).change();
                            }
                        }
                        if (parseFloat(input.val()) == input.attr('max')) {
                            $(this).attr('disabled', true);
                        }
                    }
                } else {
                    input.val(0);
                }
            });
            $('.input-number').focusin(function() {
                console.log("segunda");
                $(this).data('oldValue', $(this).val());
            });
            $('.input-number').change(function() {
                console.log("tercera");
                if ($(this).attr('data-decimals') != 0) {
                    $(this).val(Math.round($(this).val() * (10 * $(this).attr('data-decimals'))) / (10 * $(this).attr('data-decimals')));
                } else if ($(this).attr('data-decimals') == 0) {
                    $(this).val(parseInt($(this).val()));
                }
                minValue = parseFloat($(this).attr('min'));
                maxValue = parseFloat($(this).attr('max'));
                valueCurrent = parseFloat($(this).val());
                name = $(this).attr('name');
                if (valueCurrent >= minValue) {
                    $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
                } else {
                    //alert('Sorry, the minimum value was reached');
                    $(this).val($(this).data('oldValue'));
                }
                if (valueCurrent <= maxValue) {
                    $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
                } else {
                    //alert('Sorry, the maximum value was reached');
                    $(this).val($(this).data('oldValue'));
                }
                console.log($(this));

                if ($(this).attr('id') == 'inputInterlineSize') {
                    changeInterlineSpace('#inputInterlineSize');
                } else {
                    changeFontSize('#inputFontSize');
                }
            });
            $(".input-number").keydown(function(e) {
                console.log("cuarta");
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        </script>
