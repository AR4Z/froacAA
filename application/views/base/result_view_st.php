<?php
if ($sess == 1) {
    $logged = 1;
}else $logged = 0;
?>

<link rel="stylesheet" href="<?php echo base_url()?>asset/raty/jquery.raty.css">
<script src="<?php echo base_url()?>asset/raty/jquery.raty.js"></script>

<div class="content-inner">
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <!-- page start-->
                    <div class="card border-0">
                        <h1 class="card-title"> <?php echo $this->lang->line('objects_qualified'); ?>:</h1>
                        <div class="card-body">
                            <?php

                            if (!empty($result)) {
                                foreach ($result as $key) {
                                    $url = base64_encode($key['lo_location']);
                                    $lo_name = base64_encode($key['lo_title']);
                                    ?>
                                    <div class="classic-search">

                                        <p><a target="_blank" class="titulo" id="<?php echo $key['lo_id'] ?>" rep_id="<?php echo $key['rep_id'] ?>" logged="<?php echo $logged ?>" href="<?php echo base_url().'lo/load_lo/'.$url.'/'.$lo_name ?>"><?php echo $key['lo_title'] ?></a>
                                        </p>
                                        <div>
                                            <b><?php echo $this->lang->line('description'); ?>: </b><?php echo $key['lo_description'] ?><br>
                                            <b><?php echo $this->lang->line('keywords'); ?>: </b><?php echo $key['lo_keyword'] ?><br>

                                            <a onclick="verMetadata('<?php echo $key['lo_id'] . '/' . $key['rep_id'] ?>')" class="btn btn-sm btn-info" data-toggle="modal" href="#dialog_medatada" txt="OA1">
                                                <li class="icon-eye-open"></li><?php echo $this->lang->line('see_metadata'); ?>
                                            </a>

                                          <!--  <a onclick="verIndicadores('<?php echo $key['lo_id'] . '/' . $key['rep_id'] . '/' . $user; ?>','<?php echo $key['rank']?>')" class="btn btn-warning btn-sm" data-toggle="modal" href="#dialog_indicaores" txt="OA2">
                                                <li class="icon-eye-open"></li> Ver Indicadores
                                            </a>-->
                                        </div>
                                    </div>
                                    <?php
                                }
                            } else {
                                ?>
                                <?php echo $this->lang->line('no_results'); ?>
                            <?php } ?>
                        </div>
                    </div>
                    <!-- page end-->
                </div>
            </div>
        </div>
    </section>

<!-- Modal Metadata -->
<div class="modal fade" id="dialog_medatada" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"><?php echo $this->lang->line('metadata_standard_lom'); ?></h4>
            </div>

            <div class="modal-body" id="dialog_metadata_result">

            </div>
            <div class="modal-footer">
                <button data-dismiss="modal"  class="btn btn-success" type="button"><?php echo $this->lang->line('accept'); ?></button>
            </div>
        </div>
    </div>
</div>
<!-- modal -->


<!-- Modal indicadores -->
<div class="modal fade" id="dialog_indicaores" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"><?php echo $this->lang->line('indicators'); ?></h4>
            </div>
            <div class="modal-body">

                <?php if ($logged == 1) { ?>
                    <b><?php echo $this->lang->line('you_rank'); ?>:</b>
                    <div class="raty"  id="" rep_id="" data-score=""  username=""></div>
                <?php }else{ ?>
                    <b><?php echo $this->lang->line('average_rank_lo'); ?>:</b>
                    <div class="raty"  id="" rep_id="" data-score="5"  username=""></div>
                    <?php echo $this->lang->line('ad_rank_lo'); ?>!
                <?php }?>

                <!--<div id="dialog_inidicadores_result"></div>-->
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal"  class="btn btn-success" type="button">Aceptar</button>
            </div>
        </div>
    </div>
</div>
<!-- modal -->


<script type="text/javascript">

    function verMetadata(id) {
        $("#dialog_metadata_result").load("<?php echo base_url(); ?>index.php/lo/load_metadata/" + id);

    }

    function verIndicadores(id,rank) {
        var res = id.split("/");

        var lo_id = res[0];
        var rep_id = res[1];
        var username = res[2];
        $("#dialog_inidicadores_result").load("<?php echo base_url(); ?>index.php/lo/load_indicadores/" + id);
        $("#rank").text(rank);
        <?php if ($logged == 1) { ?>
        $.post( "<?php echo base_url() ?>index.php/usuario/get_score/",{ username: username, lo_id: lo_id, rep_id:rep_id }).done(function( data ){
            // $.fn.raty.defaults.path = 'asset/raty/images/';
            $.fn.raty.defaults.path = '<?php echo base_url()?>asset/raty/images/';
            $(".raty").attr("id", lo_id).attr("rep_id", rep_id).attr("username", username).raty({
                score:data,
                cancel     : true,
                click : function(score, evt) {
                    $.ajax({
                        type: "POST",
                        url: "<?php echo base_url() ?>index.php/usuario/set_score",
                        data: {lo_id:this.id, rep_id:$(this).attr('rep_id'),
                            username:$(this).attr('username'), score:score},
                        success: function(datos) {
                        }
                    });
                }
            });
        });
        <?php }else{ ?>
        $.post( "<?php echo base_url() ?>index.php/lo/get_score_avg/",{lo_id: lo_id, rep_id:rep_id }).done(function( data ){

            $.fn.raty.defaults.path = '<?php echo base_url()?>asset/raty/images/';
            $(".raty").attr("id", lo_id).attr("rep_id", rep_id).raty({
                score:data,
                cancel     : true
            });
        });

        <?php }?>;
    }


    $(".titulo").click(function() {
        $.ajax({
            type: "POST",
            url: "<?php echo base_url() ?>index.php/lo/set_visita",
            data: "lo_id=" + this.id + "&rep_id=" + $(this).attr('rep_id') + "&logged=" + $(this).attr('logged') + "",
            success: function(datos) {
                // alert("Se guardaron los datos: " + datos);
            }
        });

    })


</script>
