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
    <link rel="stylesheet" id="fontAwesomess" href="<?php echo base_url() ?>asset/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" id="font">
    <link href="<?php echo base_url() ?>asset/css/bootstrap.min.css" rel="stylesheet">

    <link href="<?php echo base_url() ?>asset/css/bootstrap-colorpicker.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/style.css" rel="stylesheet">

    <link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/enactors.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>asset/css/titatoggle.min.css" rel="stylesheet">
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

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
    <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
          <script src="js/respond.min.js"></script>

        <![endif]-->
<script type="text/javascript">
    let session_user = <?php echo json_encode($this->session->userdata('logged_in'));?>;
    if(session_user){
        localStorage['cursor_size_id'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['cursor_size_id']?>"
        localStorage['color_cursor'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['color_cursor']?>"
        localStorage['trail_cursor_size_id'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['trail_cursor_size_id']?>"
        localStorage['trail_cursor_color'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['trail_cursor_color']?>"
        localStorage['invert_color_general'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['invert_color_general']?>"
        localStorage['invert_color_image'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['invert_color_image']?>"
        localStorage['contrast_colors_id'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['contrast_colors_id']?>";
        localStorage['font_size'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['font_size']?>";
        localStorage['font_type_id'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['font_type_id']?>";
        localStorage['size_line_spacing'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['size_line_spacing']?>";
    }
</script>
</head>
<?php if($view == 'base/login/login_view') : ?>
    <body class="login-body" style='line-height:1.5; font-family:"Open Sans", sans-serif; cursor: auto;'>
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
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio1" value="1">
                                <label class="form-check-label contrast-label" for="inlineRadio1"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/no.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio2" value="2">
                                <label class="form-check-label contrast-label" for="inlineRadio2"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-white.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio3" value="3">
                                <label class="form-check-label contrast-label" for="inlineRadio3"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/white-black.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio4" value="4">
                                <label class="form-check-label contrast-label" for="inlineRadio4"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-yellow.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio5" value="5">
                                <label class="form-check-label contrast-label" for="inlineRadio5"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/yellow-black.png" /></label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio6" value="6">
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
                    <div class="card-header text-center"><span><b>CONFIGURACIÓN DEL CURSOR <i class="fa fa-mouse-pointer" id="icon-pointer" style="font-size:1px;"></i></b></span></div>
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
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="normalSizeCursor" value="normalCursor">
                                    <label class="form-check-label" for="normalSizeCursor">No cambiar</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize16" value="cursorSize16">
                                    <label class="form-check-label" for="cursorSize16">16 x 16</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize32" value="cursorSize32">
                                    <label class="form-check-label" for="cursorSize32">32 x 32</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize40" value="cursorSize40">
                                    <label class="form-check-label" for="cursorSize40">40 x 40</label>
                                </div>

                                <div id="div-color-cursor" class="no-high-contrast" style="display:none">
                                    <b class="no-high-contrast">COLOR DEL CURSOR</b>
                                    <br/>
                                    <div id="cp1" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                        <input type="text" name="colorMousePointer" value="rgb(255, 18, 18)" class="form-control no-high-contrast no-invert-color" />
                                        <div class="input-group-append no-high-contrast no-invert-color">
                                            <span class="input-group-text input-group-addon no-high-contrast no-invert-color"><i class="no-high-contrast no-invert-color"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <b>TAMAÑO DEL RASTRO</b>
                                <br/>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="normalSizeCursorTrails" value="sizeCursorTrails0" checked>
                                    <label class="form-check-label" for="normalSizeCursorTrails">Sin rastro</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails12" value="sizeCursorTrails12">
                                    <label class="form-check-label" for="cursorSizeTrails12">12</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails24" value="sizeCursorTrails24">
                                    <label class="form-check-label" for="cursorSizeTrails24">24</label>
                                </div>
                                <div id="div-color-cursor-trails" class="no-high-contrast" style="display:none">
                                    <b class="no-high-contrast">COLOR DEL RASTRO</b>
                                    <br/>
                                    <div id="cp2" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                        <input type="text" name="colorCursorTrails" id="colorCursorTrails" value="rgb(255, 18, 18)" class="form-control no-high-contrast no-invert-color" />
                                        <div class="input-group-append no-high-contrast no-invert-color">
                                            <span class="input-group-text input-group-addon no-high-contrast no-invert-color"><i class="no-high-contrast no-invert-color"></i></span>
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

        <div class="container">
    <?php else : ?>
        <body>
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
                                    <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio1" value="1">
                                    <label class="form-check-label contrast-label" for="inlineRadio1"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/no.png" /></label>
                                </div>
                                <div class="col-md-2">
                                    <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio2" value="2" checked>
                                    <label class="form-check-label contrast-label" for="inlineRadio2"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-white.png" /></label>
                                </div>
                                <div class="col-md-2">
                                    <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio3" value="3">
                                    <label class="form-check-label contrast-label" for="inlineRadio3"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/white-black.png" /></label>
                                </div>
                                <div class="col-md-2">
                                    <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio4" value="4">
                                    <label class="form-check-label contrast-label" for="inlineRadio4"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-yellow.png" /></label>
                                </div>
                                <div class="col-md-2">
                                    <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio5" value="5">
                                    <label class="form-check-label contrast-label" for="inlineRadio5"><img style="height: 64px; width: 64px;" src="<?php echo base_url() ?>asset/img/iconContrast/yellow-black.png" /></label>
                                </div>
                                <div class="col-md-2">
                                    <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio6" value="6">
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
                        <div class="card-header text-center"><span><b>CONFIGURACIÓN DEL CURSOR <i class="fa fa-mouse-pointer" id="icon-pointer" style="font-size:1px;"></i></b></span></div>
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
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="normalSizeCursor" value="normalCursor">
                                        <label class="form-check-label" for="normalSizeCursor">No cambiar</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize16" value="cursorSize16">
                                        <label class="form-check-label" for="cursorSize16">16 x 16</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize32" value="cursorSize32">
                                        <label class="form-check-label" for="cursorSize32">32 x 32</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize40" value="cursorSize40">
                                        <label class="form-check-label" for="cursorSize40">40 x 40</label>
                                    </div>

                                    <div id="div-color-cursor" class="no-high-contrast" style="display:none">
                                        <b class="no-high-contrast">COLOR DEL CURSOR</b>
                                        <br/>
                                        <div id="cp1" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                            <input type="text" name="colorMousePointer" value="rgb(255, 18, 18)" class="form-control no-high-contrast no-invert-color" />
                                            <div class="input-group-append no-high-contrast no-invert-color">
                                                <span class="input-group-text input-group-addon no-high-contrast no-invert-color"><i class="no-high-contrast no-invert-color"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <b>TAMAÑO DEL RASTRO</b>
                                    <br/>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="normalSizeCursorTrails" value="sizeCursorTrails0" checked>
                                        <label class="form-check-label" for="normalSizeCursorTrails">Sin rastro</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails12" value="sizeCursorTrails12">
                                        <label class="form-check-label" for="cursorSizeTrails12">12</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails24" value="sizeCursorTrails24">
                                        <label class="form-check-label" for="cursorSizeTrails24">24</label>
                                    </div>
                                    <div id="div-color-cursor-trails" class="no-high-contrast" style="display:none">
                                        <b class="no-high-contrast">COLOR DEL RASTRO</b>
                                        <br/>
                                        <div id="cp2" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                            <input type="text" name="colorCursorTrails" id="colorCursorTrails" value="rgb(255, 18, 18)" class="form-control no-high-contrast no-invert-color" />
                                            <div class="input-group-append no-high-contrast no-invert-color">
                                                <span class="input-group-text input-group-addon no-high-contrast no-invert-color"><i class="no-high-contrast no-invert-color"></i></span>
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

<?php endif;?>
