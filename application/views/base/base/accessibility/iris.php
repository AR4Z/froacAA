<div id="container-iris" class="container-iris draggable" style="width:340px; height:475px; background-color:black; padding-top:10px; padding-bottom:5px; border-radius: 15px; z-index:1001; position:absolute;">
    <div class="container-top-iris" style="width:320px; height:40px; margin:auto;">
        <h5 style="text-align:center; color:white; font-weight: bold;">
        <?php echo $this->lang->line('lsc_translator'); ?>
            <a onclick="accessibilityBar.lscTranslator.minimize()" id="minimize-iris" class="button button-raised button-primary button-circle button-small"
                style="float:right;">
                <i class="fas fa-window-minimize"></i>
            </a>
            <a onclick="accessibilityBar.lscTranslator.maximize()" id="maximize-iris" class="button button-raised button-primary button-circle button-small"
                style="float:right; display:none;">
                <i class="fas fa-window-maximize"></i>
            </a>
        </h5>
    </div>
    <div id="container-body-iris" style="display:none;">
        <div class="video" id="iris" style="width:320px; height:240px; margin:auto; background-image: url(<?php echo base_url()?>asset/img/lengua/conector_espera.jpg); position:relative">
        </div>
        <div id="control-iris" style="width:320px; height:40px; margin:auto; text-align: center; padding-top:10px; position:relative;">
            <button id="play-iris" class="button button-raised button-primary button-circle button-small"
                style="display:none;">
                <i class="fa fa-play"></i>
            </button>
            <button id="pause-iris" class="button button-raised button-primary button-circle button-small"
            style="display:none;">
                <i class="fa fa-pause"></i>
            </button>
            <button  id="stop-iris" class="button button-raised button-primary button-circle button-small"
            style="display:none;">
                <i class="fa fa-stop"></i>
            </button>
        </div>
        <div id="container-input-iris" style="width:320px; height:140px; margin:auto; position:relative; padding-top:10px;">
            <textarea id="input-iris" placeholder="<?php echo $this->lang->line('message_text_lsc'); ?>" rows="4" cols="42" style="resize: none; position:relative"></textarea>
            <a onclick="accessibilityBar.lscTranslator.clean()" class="button button-raised button-circle button-primary button-small" style="float:left; margin-top:5px"><i
                    class="fa fa-trash"></i></a>

            <a id="lscTranslate" class="button button-raised button-pill button-primary button-small" style="float:right; margin-top:5px"><?php echo $this->lang->line('translate'); ?></a>
        </div>
    </div>
</div>