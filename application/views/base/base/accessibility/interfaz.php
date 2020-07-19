<div class="tab-pane fade" id="interfaz" role="tabpanel" aria-labelledby="interfaz-tab">
  <div id="carouselInterfazCards" class="carousel slide" data-ride="carousel" data-interval="false" aria-label="Opciones de accesibilidad para la interfaz">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="d-flex flex-row flex-nowrap">
          <div id="card-font-size" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  <?php echo $this->lang->line('font_size'); ?></b>
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <label for="fontSizeInput">
                    <?php echo $this->lang->line('message_font_size'); ?>
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="input-group">
                    <input type="number" id="fontSizeInput" name="fontSize" value="12" min="9" max="36">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="card-letter-spacing" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  Espacio entre letras</b>
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <label for="letterSpacingInput">
                    
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="input-group">
                    <input type="number" id="letterSpacingInput" name="letterSpacing" value="1,44" min="1,44" max="4,44">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="card-word-spacing" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  Espacio entre palabras</b>
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <label for="wordSpacingInput">
                    
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="input-group">
                    <input type="number" id="wordSpacingInput" name="wordSpacing" value="1,92" min="1,92" max="5,92">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="card-interline-size" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  <?php echo $this->lang->line('interline_size'); ?></b>
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <label for="interlineSpaceSizeInput">
                    <?php echo $this->lang->line('message_interline_size'); ?>
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="input-group">
                    <input type="number" id="interlineSpaceSizeInput" name="interlineSpaceSize" value="1.5" min="1" max="2" step="0.1">
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div id="card-contrast-colors" class="card bg-light mb-3" style="max-width: 45rem; min-width: 45rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  <?php echo $this->lang->line('contrast'); ?></b>
              </span>
            </div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_contrast">
                <div class="row">
                  <div class="col">
                    <legend id="group_contrast" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_contrast'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="normalContrast" value="1" aria-label="<?php echo $this->lang->line('normal'); ?>">
                      <label class="form-check-label contrast-label" for="normalContrast" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('normal'); ?>">
                        <img alt="<?php echo $this->lang->line('normal'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/no.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('normal'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio2" value="2" aria-label="<?php echo $this->lang->line('black_white'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio2" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('black_white'); ?>">
                        <img alt="<?php echo $this->lang->line('black_white'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-white.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('black_white'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio3" value="3" aria-label="<?php echo $this->lang->line('white_black'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio3" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('white_black'); ?>">
                        <img alt="<?php echo $this->lang->line('white_black'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/white-black.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('white_black'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio4" value="4" aria-label="<?php echo $this->lang->line('black_yellow'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio4" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('black_yellow'); ?>">
                        <img alt="<?php echo $this->lang->line('black_yellow'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/black-yellow.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('black_yellow'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio5" value="5" aria-label="<?php echo $this->lang->line('yellow_black'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio5" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('yellow_black'); ?>">
                        <img alt="<?php echo $this->lang->line('yellow_black'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/yellow-black.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('yellow_black'); ?>
                        </span>
                      </label>
                    </div>

                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio6" value="6" aria-label="<?php echo $this->lang->line('gray'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio6" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('gray'); ?>">
                        <img alt="<?php echo $this->lang->line('gray'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/gray.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('gray'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio8" value="8" aria-label="<?php echo $this->lang->line('reverse_colors'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio8" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('reverse_colors'); ?>">
                        <img alt="<?php echo $this->lang->line('reverse_colors'); ?>" style="height: 40px; width: 40px;" src="<?php echo base_url() ?>asset/img/iconContrast/reverse-colors.png" />
                        <span class="sr-only">
                          <?php echo $this->lang->line('reverse_colors'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <input class="form-check-input contrast-input sr-only" type="radio" name="radioOptionscontrast" id="inlineRadio7" value="7" aria-label="<?php echo $this->lang->line('customized'); ?>">
                      <label class="form-check-label contrast-label" for="inlineRadio7" data-toggle="tooltip" data-placement="bottom" title="<?php echo $this->lang->line('customized'); ?>">
                        <i class="fa fa-wrench" style="font-size:40px;"></i>
                        <span class="sr-only">
                          <?php echo $this->lang->line('customized'); ?>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col">
                    <div id="div-color-foreground" class="no-high-contrast" style="display:none">
                      <label for="foregroundColorInput">
                        <b class="no-high-contrast">
                          <?php echo $this->lang->line('font_color'); ?></b>
                      </label>
                      <br />
                      <div class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                        <input type="text" id="foregroundColorInput" name="foregroundColor" value="rgb(0,0,0)" class="jscolor form-control no-high-contrast no-invert-color" />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div id="div-color-background" class="no-high-contrast" style="display:none">
                      <label for="backgroundColorInput">
                        <b class="no-high-contrast">
                          <?php echo $this->lang->line('background_color'); ?></b>
                      </label>
                      <br />
                      <div class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                        <input type="text" id="backgroundColorInput" name="backgroundColor" value="rgb(255, 255, 255)" class="jscolor form-control no-high-contrast no-invert-color" />
                      </div>
                    </div>

                  </div>
                  <div class="col">
                    <div id="div-color-highlight" class="no-high-contrast" style="display:none">
                      <label for="highlightColorInput">
                        <b class="no-high-contrast">
                          <?php echo $this->lang->line('highlight_color'); ?></b>
                      </label>
                      <br />
                      <div class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                        <input type="text" id="highlightColorInput" name="highlightColor" value="rgb(211, 211, 211)" class="jscolor form-control no-high-contrast no-invert-color" />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div id="div-color-link" class="no-high-contrast" style="display:none">
                      <label for="linkColorInput">
                        <b class="no-high-contrast">
                          <?php echo $this->lang->line('link_color'); ?></b>
                      </label>
                      <br />
                      <div class="input-group colorpicker-component formcolorpicker no-high-contrast no-invert-color">
                        <input type="text" id="linkColorInput" name="linkColor" value="rgb(255, 255, 0)" class="jscolor form-control no-high-contrast no-invert-color" />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div id="card-font-type" class="card bg-light mb-3" style="max-width: 20rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  <?php echo $this->lang->line('font_type'); ?></b>
              </span>
            </div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_font_type">
                <div class="row">
                  <div class="col">
                    <legend id="group_font_type" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_font_type'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="type-font" id="defaultFont" value="1">
                          <label class="form-check-label sans" for="defaultFont">Open Sans</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="type-font" id="serifFont" value="2">
                          <label class="form-check-label serif" for="serifFont">Serif</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="type-font" id="cantarellFont" value="3">
                          <label class="form-check-label cantarell" for="cantarellFont">Cantarell</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="type-font" id="sourceCodePROFont" value="4">
                          <label class="form-check-label sourceCodePRO" for="sourceCodePROFont">Source Code PRO</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="d-flex flex-row flex-nowrap">
          <div id="card-config-cursor" class="card bg-light mb-3" style="max-width: 40rem; min-width: 40rem;">
            <div class="card-header text-center">
              <span>
                <b>
                  <?php echo $this->lang->line('cursor_config'); ?>
                  <i class="fa fa-mouse-pointer" id="icon-pointer" style="font-size:1px;"></i>
                </b>
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <p>
                    <?php echo $this->lang->line('message_cursor_config'); ?>
                  </p>
                </div>
              </div>
              <div class="row">
                <fieldset class="col" role="radiogroup" aria-labelledby="group_size_cursor">
                  <legend id="group_size_cursor" style="font-size:1rem; font-weight: bold;">
                    <?php echo $this->lang->line('size_cursor'); ?>
                  </legend>
                  <br />
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="radioOptionsSizeCursor" id="normalSizeCursor" value="1">
                    <label class="form-check-label" for="normalSizeCursor">
                      <?php echo $this->lang->line('no_change'); ?></label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="radioOptionsSizeCursor" id="cursorSize16" value="2">
                    <label class="form-check-label" for="cursorSize16">16 x 16</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="radioOptionsSizeCursor" id="cursorSize32" value="3">
                    <label class="form-check-label" for="cursorSize32">32 x 32</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="radioOptionsSizeCursor" id="cursorSize40" value="4">
                    <label class="form-check-label" for="cursorSize40">40 x 40</label>
                  </div>

                  <div id="div-color-cursor" class="no-high-contrast" style="display:none">
                    <label class="no-high-contrast" for="colorMousePointerInput" style="font-weight:bold">
                      <?php echo $this->lang->line('cursor_color'); ?></label>
                    <br />
                    <div class="input-group formcolorpicker no-high-contrast no-invert-color">
                      <input type="text" id="colorMousePointerInput" name="colorMousePointer" class="jscolor form-control no-high-contrast no-invert-color" />
                    </div>
                  </div>
                </fieldset>
                <fieldset class="col" role="radiogroup" aria-labelledby="group_trail_cursor">
                  <legend id="group_trail_cursor" style="font-size:1rem;font-weight:bold;">
                    <?php echo $this->lang->line('size_trail'); ?>
                  </legend>
                  <br />
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="radioOptionsSizeCursorTrails" id="normalSizeCursorTrails" value="1" checked>
                    <label class="form-check-label" for="normalSizeCursorTrails">
                      <?php echo $this->lang->line('without_trail'); ?></label>
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
                    <label class="no-high-contrast" for="colorCursorTrails" style="font-weight:bold">
                      <?php echo $this->lang->line('trail_color'); ?>
                    </label>
                    <br />
                    <div class="input-group formcolorpicker no-high-contrast no-invert-color">
                      <input type="text" name="colorCursorTrails" id="colorCursorTrails" class="jscolor form-control no-high-contrast no-invert-color" />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a style="top:35%;color:black;height:50px;width: 50px;background-color: #bbb;border-radius: 50%;" class="carousel-control-next" href="#carouselInterfazCards" role="button" data-slide="next" aria-controls="carouselInterfazCards">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Siguiente</span>
    </a>
  </div>
</div>