<div id="container-toc" class="container-toc draggable" style="width:340px; height:475px; background-color:black; padding-top:10px; padding-bottom:5px; border-radius: 15px; z-index:1001; position:absolute; top:calc(100% - 49px);left:0px; display:none;">
    <div class="container-top-toc" style="width:320px; height:40px; margin:auto;">
        <h5 style="text-align:center; color:white; font-weight: bold;">
        <?php echo $this->lang->line('table_of_content'); ?>
            <a id="minimize-toc" class="button button-raised button-primary button-circle button-small"
                style="float:right;">
                <i class="fas fa-window-minimize"></i>
            </a>
            <a id="maximize-toc" class="button button-raised button-primary button-circle button-small"
                style="float:right; display:none;">
                <i class="fas fa-window-maximize"></i>
            </a>
        </h5>
    </div>
    <div id="container-body-toc" style="background-color:white; width:320px;margin:auto;">
    </div>
</div>