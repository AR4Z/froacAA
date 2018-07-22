<?php
if ($sess == 1) {
    $logged = 1;
}else $logged = 0;
?>
<script type="text/javascript">
    var dataResult = <?php echo $js_result?>
</script>
<link rel="stylesheet" href="<?php echo base_url()?>asset/raty/jquery.raty.css" />
<script src="<?php echo base_url()?>asset/raty/jquery.raty.js"></script>
<script src="<?php echo base_url()?>asset/js/pagination.min.js"></script>
<div class="col-lg-9">
    <div class="card border-0">

        <h4 class="card-title">Resultados que incluyen todas las palabras <b>(<?php echo $palabras ?> )</b></h4>
        <p class="no-results" >No hay resultados.</p>
        <div id="show_oas" class="card-body">

        </div>

        <br/>

    </div>
</div>

<!--<div class="col-lg-3" id="recomendacion">
    <script>
        //Script para mostrar recomendación
        $(document).ready(function(){
            $("#prueba").hide();
            $("#prueba").text("<?php echo urlencode($oasadaptados) ?>");
            $("#recomendacion").load("<?php echo base_url(); ?>index.php/lo/llenar_recomendacion/" + $("#prueba").text() + "");

        });



    </script>

</div>-->

<!-- Modal Metadata -->
<div class="modal fade" id="dialog_medatada" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" aria-label="Dialogo para ver metadata del objeto de aprendizaje" >
    <div class="modal-dialog"  role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Metadatos estandar LOM</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
            </div>

            <div class="modal-body" id="dialog_metadata_result">

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
                <h4 class="modal-title">Indicadores</h4>
            </div>
            <div class="modal-body">

                <b>Ranking de busqueda: <a href="">(Que significa esto?)</a><br></b>
                <h4><span id="rank"></span></h4>
                <?php if ($logged == 1) { ?>
                <b>Usted ha calificado este objeto:</b>
                <div class="raty" id="" rep_id="" data-score="" username=""></div>
                <?php }else{ ?>
                <b>Promedio de calificación de los usuarios:</b>
                <div class="raty" id="" rep_id="" data-score="5" username=""></div>
                Si desea calificar este objeto y agregarlo a su lista de favoritos, debe crear una cuenta e iniciar sesión!
                <?php }?>

                <!--<div id="dialog_inidicadores_result"></div>-->
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-success" type="button">Aceptar</button>
            </div>
        </div>
    </div>
</div>
<!-- modal-->

<script type="text/javascript">
    $(document).ready(function() {

        page();
    });
    function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}
    function page() {
        var container = $('#nav_oas');
        var info = dataResult;
        var options = {
            dataSource: info,
            pageSize: 5,
            callback: function(response, pagination) {
                $('.paginationjs-pages ul').addClass('pagination justify-content-center');
                $('.paginationjs-pages ul li').addClass('page-item');
                $('.paginationjs-pages ul li a').addClass('page-link');

                window.console && console.log(response, pagination);
                var dataHtml = '';
                $.each(response, function(index, item) {
                    dataHtml += `
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">
                                ${item['lo_title']}
                            </h5>
                        </div>
                        <div class="card-body">
                            <b>Descripción: </b><p class="card-text">
                                ${item['lo_description']}
                            </p><br>
                            <b>Palabras claves: </b><p class="card-text">
                                ${item['lo_keyword']}
                            </p>
                        </div>
                        <div class="card-footer">
                            <a onclick="verMetadata('${item['lo_id']}/${item['rep_id']}')" class="btn btn-lg btn-info card-link d-inline" data-toggle="modal" href="#dialog_medatada">
                                <i class="fa fa-eye"></i> Ver metadatos
                            </a>
                            <a id="${item['lo_id']}" target="_blank" rep_id="${item['rep_id']}" logged="<?php echo $logged ?>" class="btn btn-lg btn-success card-link d-inline" href="<?php echo base_url()?>lo/load_lo/${b64EncodeUnicode(item['lo_location'])}/${b64EncodeUnicode(item['lo_title'])}">
                                <i class="fa fa-eye"></i> Ver objeto
                            </a>
                        </div>
                        </div>
                        <br/>
                `;

                });
                $('#show_oas').html(dataHtml);
                if(!(dataResult.length != 0)){
                    $('.no-results').show();
                } else {
                    $('.no-results').hide();
                }
            }
        };
        container.pagination(options);
    }

    $(document).keypress(function(e) {
        console.log("AR4Z");
        if ($("#dialog_medatada").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
            $('#dialog_medatada').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }

    });

    function verMetadata(id) {
        $(".insideiframe").attr("src", "<?php echo base_url(); ?>index.php/lo/load_metadata/" + id);
        $(".insideiframe").show();

    }

    function verIndicadores(id, rank) {
        var res = id.split("/");

        var lo_id = res[0];
        var rep_id = res[1];
        var username = res[2];
        $("#dialog_inidicadores_result").load("<?php echo base_url(); ?>index.php/lo/load_indicadores/" + id);
        $("#rank").text(rank);
        <?php if ($logged == 1) { ?>
        $.post("<?php echo base_url() ?>index.php/usuario/get_score/", {
            username: username,
            lo_id: lo_id,
            rep_id: rep_id
        }).done(function(data) {
            // $.fn.raty.defaults.path = 'asset/raty/images/';
            $.fn.raty.defaults.path = '<?php echo base_url()?>asset/raty/images/';
            $(".raty").attr("id", lo_id).attr("rep_id", rep_id).attr("username", username).raty({
                score: data,
                cancel: true,
                click: function(score, evt) {
                    $.ajax({
                        type: "POST",
                        url: "<?php echo base_url() ?>index.php/usuario/set_score",
                        data: {
                            lo_id: this.id,
                            rep_id: $(this).attr('rep_id'),
                            username: $(this).attr('username'),
                            score: score
                        },
                        success: function(datos) {}
                    });
                }
            });
        });
        <?php }else{ ?>
        $.post("<?php echo base_url() ?>index.php/lo/get_score_avg/", {
            lo_id: lo_id,
            rep_id: rep_id
        }).done(function(data) {

            $.fn.raty.defaults.path = '<?php echo base_url()?>asset/raty/images/';
            $(".raty").attr("id", lo_id).attr("rep_id", rep_id).raty({
                score: data,
                cancel: true
            });
        });

        <?php }?>

    }
    $(".titulo").click(function() { //cargando datos de lo elegido en las opciones de las busquedas
        $.ajax({
            type: "POST",
            url: "<?php echo base_url() ?>index.php/lo/set_visita",
            data: "lo_id=" + this.id + "&rep_id=" + $(this).attr('rep_id') + "&logged=" + $(this).attr('logged') + "",
            success: function(datos) {
                // alert("Se guardaron los datos: " + datos);
            }
        });

    });
</script>
