<div class="tab-pane fade" id="interfaz" role="tabpanel" aria-labelledby="interfaz-tab">
    <div class="d-flex flex-row flex-nowrap">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center">
                <span>
                    <b>TAMAÑO DE FUENTE</b>
                </span>
            </div>
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
                            <input type="text" name="quant[0]" id="inputFontSize" class="form-control input-number" value="12" min="9" max="36" step="1"
                                data-decimals="0" style="text-align:center">
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
            <div class="card-header text-center">
                <span>
                    <b>TAMAÑO DE INTERLINEADO</b>
                </span>
            </div>
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
                            <input type="text" name="quant[1]" id="inputInterlineSize" class="form-control input-number" value="1.5" min="1" max="2"
                                step="0.1" data-decimals="1" style="text-align:center">
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
            <div class="card-header text-center">
                <span>
                    <b>CONTRASTE</b>
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar el contraste.</p>
                    </div>

                </div>

                <div class="row">
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio1"
                                value="1">
                            <label class="form-check-label contrast-label" for="inlineRadio1">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/no.png" />
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio2"
                                value="2" checked>
                            <label class="form-check-label contrast-label" for="inlineRadio2">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-white.png" />
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio3"
                                value="3">
                            <label class="form-check-label contrast-label" for="inlineRadio3">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/white-black.png" />
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio4"
                                value="4">
                            <label class="form-check-label contrast-label" for="inlineRadio4">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-yellow.png" />
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio5"
                                value="5">
                            <label class="form-check-label contrast-label" for="inlineRadio5">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/yellow-black.png" />
                            </label>
                        </div>

                    </div>
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio6"
                                value="6">
                            <label class="form-check-label contrast-label" for="inlineRadio6">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/gray.png" />
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <input class="form-check-input contrast-input" style="display:none;" type="radio" name="radioOptionscontrast" id="inlineRadio7"
                                value="7">
                            <label class="form-check-label contrast-label" for="inlineRadio7">
                                <img style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/gray.png" />
                            </label>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                    <div id="div-color-foreground" class="no-high-contrast" style="display:none">
                            <b class="no-high-contrast">COLOR FUENTE</b>
                            <br/>
                            <div id="cp3" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                <input type="text" name="foregroundColor" value="rgb(0,0,0)" class="form-control no-high-contrast no-invert-color"
                                />
                                <div class="input-group-append no-high-contrast no-invert-color">
                                    <span class="input-group-text input-group-addon no-high-contrast no-invert-color">
                                        <i class="no-high-contrast no-invert-color"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                    <div id="div-color-background" class="no-high-contrast" style="display:none">
                            <b class="no-high-contrast">COLOR DEL FONDO</b>
                            <br/>
                            <div id="cp4" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                <input type="text" name="backgroundColor" value="rgb(255, 255, 255)" class="form-control no-high-contrast no-invert-color"
                                />
                                <div class="input-group-append no-high-contrast no-invert-color">
                                    <span class="input-group-text input-group-addon no-high-contrast no-invert-color">
                                        <i class="no-high-contrast no-invert-color"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col">
                    <div id="div-color-highlight" class="no-high-contrast" style="display:none">
                            <b class="no-high-contrast">COLOR DE RESALTADO</b>
                            <br/>
                            <div id="cp5" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                <input type="text" name="highlightColor" value="rgb(211, 211, 211)" class="form-control no-high-contrast no-invert-color"
                                />
                                <div class="input-group-append no-high-contrast no-invert-color">
                                    <span class="input-group-text input-group-addon no-high-contrast no-invert-color">
                                        <i class="no-high-contrast no-invert-color"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                    <div id="div-color-link" class="no-high-contrast" style="display:none">
                            <b class="no-high-contrast">COLOR ENLACES</b>
                            <br/>
                            <div id="cp6" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                <input type="text" name="linkColor" value="rgb(255, 255, 0)" class="form-control no-high-contrast no-invert-color"
                                />
                                <div class="input-group-append no-high-contrast no-invert-color">
                                    <span class="input-group-text input-group-addon no-high-contrast no-invert-color">
                                        <i class="no-high-contrast no-invert-color"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 20rem;">
            <div class="card-header text-center">
                <span>
                    <b>TIPO DE FUENTE</b>
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar el tipo de fuente.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type-font" id="defaultFont" value="1">
                                    <label class="form-check-label sans" for="defaultFont">Open Sans</label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type-font" id="serifFont" value="2">
                                    <label class="form-check-label serif" for="serifFont">Serif</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type-font" id="cantarellFont" value="3">
                                    <label class="form-check-label cantarell" for="cantarellFont">Cantarell</label>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="type-font" id="sourceCodePROFont" value="4">
                                    <label class="form-check-label sourceCodePRO" for="sourceCodePROFont">Source Code PRO</label>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>

            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 40rem; min-width: 40rem;">
            <div class="card-header text-center">
                <span>
                    <b>CONFIGURACIÓN DEL CURSOR
                        <i class="fa fa-mouse-pointer" id="icon-pointer" style="font-size:1px;"></i>
                    </b>
                </span>
            </div>
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
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="normalSizeCursor" value="1">
                            <label class="form-check-label" for="normalSizeCursor">No cambiar</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize16" value="2">
                            <label class="form-check-label" for="cursorSize16">16 x 16</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize32" value="3">
                            <label class="form-check-label" for="cursorSize32">32 x 32</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursor" id="cursorSize40" value="4">
                            <label class="form-check-label" for="cursorSize40">40 x 40</label>
                        </div>

                        <div id="div-color-cursor" class="no-high-contrast" style="display:none">
                            <b class="no-high-contrast">COLOR DEL CURSOR</b>
                            <br/>
                            <div id="cp1" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                <input type="text" name="colorMousePointer" value="rgb(255, 18, 18)" class="form-control no-high-contrast no-invert-color"
                                />
                                <div class="input-group-append no-high-contrast no-invert-color">
                                    <span class="input-group-text input-group-addon no-high-contrast no-invert-color">
                                        <i class="no-high-contrast no-invert-color"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <b>TAMAÑO DEL RASTRO</b>
                        <br/>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="normalSizeCursorTrails" value="1" checked>
                            <label class="form-check-label" for="normalSizeCursorTrails">Sin rastro</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails12" value="2">
                            <label class="form-check-label" for="cursorSizeTrails12">12</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="cursorSizeTrails24" value="3">
                            <label class="form-check-label" for="cursorSizeTrails24">24</label>
                        </div>
                        <div id="div-color-cursor-trails" class="no-high-contrast" style="display:none">
                            <b class="no-high-contrast">COLOR DEL RASTRO</b>
                            <br/>
                            <div id="cp2" class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                                <input type="text" name="colorCursorTrails" id="colorCursorTrails" value="rgb(255, 18, 18)" class="form-control no-high-contrast no-invert-color"
                                />
                                <div class="input-group-append no-high-contrast no-invert-color">
                                    <span class="input-group-text input-group-addon no-high-contrast no-invert-color">
                                        <i class="no-high-contrast no-invert-color"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem; min-width: 18rem;">
            <div class="card-header text-center">
                <span>
                    <b>CONFIGURACIÓN DE COLORES</i>
                    </b>
                </span>
            </div>
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
                                <input name="invertImages" type="checkbox">
                                <span>Imagenes</span>
                            </label>
                        </div>
                        <br/>
                        <div class="form-check checkbox-slider--b">
                            <label>
                                <input name="invertGeneral" type="checkbox">
                                <span>General</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>