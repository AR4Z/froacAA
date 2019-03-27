<?php
if ($sess == 1) {
    $logged = 1;
}else $logged = 0;
?>
<script type="text/javascript">
    var dataResult = <?php echo json_encode($result[0]);?>
</script>
<script src="<?php echo base_url()?>asset/js/pagination.min.js"></script>


<div class="col-lg-9">
    <div class="card border-0">

        <h4 class="card-title"><?php echo $this->lang->line('message_result'); ?> <b>(<?php echo $palabras ?> )</b></h4>
        <p class="no-results"><?php echo $this->lang->line('no_results'); ?>.</p>
        <div id="show_oas" class="card-body">

        </div>

        <br/>

    </div>
</div>



<!-- Modal -->

<div class="modal fade" id="dialog_metadata"  tabindex="-1" role="dialog" aria-labelledby="metadataModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" role="document">
            <div class="modal-header">
                
                <h4 class="modal-title" id="metadataModal"><?php echo $this->lang->line('metadata_standard_lom'); ?></h4>
                <button type="button" class="close" data-dismiss="modal"  aria-label="Close">
                    <span aria-hidden="true">
                    &times;
                    </span>
                </button>
            </div>

            <div class="modal-body"  id="dialog_metadata_result">
                <div class="embed-responsive embed-responsive-21by9">
                <iframe id="metadataIframe" src="" class="insideiframe embed-responsive-item" style="display: none"></iframe>
                </div>
               
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal"  class="btn btn-success" type="button"><?php echo $this->lang->line('accept'); ?></button>
            </div>
        </div>
    </div>
</div>


<!-- Modal indicadores 
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

                <div id="dialog_inidicadores_result"></div>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-success" type="button">Aceptar</button>
            </div>
        </div>
    </div>
</div>-->
<!-- modal-->

<script type="text/javascript">
    $(document).ready(() => {
      $("#hide-s").show()
      page()
    })

    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16))
      }))
    }

    function page() {
      let container = $('#nav_oas')
      let los = dataResult
      let options = {
        dataSource: los,
        pageSize: 5,
        callback: (response, pagination) => {
          $('.paginationjs-pages ul').addClass('pagination justify-content-center')
          $('.paginationjs-pages ul li').addClass('page-item')
          $('.paginationjs-pages ul li a').addClass('page-link')

          let dataHtml = '';
          $.each(response, function (index, item) {
            dataHtml += `
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">
                                ${item['lo_title']}
                            </h5>
                        </div>
                        <div class="card-body">
                            <b><?php echo $this->lang->line('description'); ?>: </b><p class="card-text">
                                ${item['lo_description']}
                            </p><br>
                            <b><?php echo $this->lang->line('keywords'); ?>: </b><p class="card-text">
                                ${item['lo_keyword']}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button onclick="verMetadata('${item['lo_id']}/${item['rep_id']}')" type="button" class="btn btn-lg btn-info card-link d-inline" data-target="#dialog_medatada">
                                <i class="fa fa-eye"></i> <?php echo $this->lang->line('see_metadata'); ?>
                            </button>
                            <a id="${item['lo_id']}" target="_blank" rep_id="${item['rep_id']}" logged="<?php echo $logged ?>" class="btn btn-lg btn-success card-link d-inline" href="<?php echo base_url()?>lo/load_lo/${b64EncodeUnicode(item['lo_location'])}/${b64EncodeUnicode(item['lo_title'])}">
                                <i class="fa fa-eye"></i> <?php echo $this->lang->line('see_object'); ?>
                            </a>
                        </div>
                        </div>
                        <br/>
                `;

          });
          document.getElementById('show_oas').innerHTML = dataHtml

          if (dataResult.length == 0) {
            document.querySelector('.no-results').style.display = ''
          } else {
            document.querySelector('.no-results').style.display = 'none'
          }
        }
      }

      container.pagination(options)
    }

    function verMetadata(id) {
      let iframeMetadataLo = document.getElementById('metadataIframe')
      let modalMetadata = document.getElementById('dialog_metadata')
      let modalMetadataInit = new Modal(modalMetadata)
      let handleShowModal = () => {
        hotkeys('enter', () => {
          modalMetadataInit.hide()
        })
      }
      let handleHideModal = () => {
        hotkeys.unbind('enter')
      }

      iframeMetadataLo.setAttribute('src', `<?php echo base_url(); ?>index.php/lo/load_metadata/${ id }`)
      iframeMetadataLo.style.display = ''
      
      modalMetadata.addEventListener('shown.bs.modal', handleShowModal)
      modalMetadata.addEventListener('hidden.bs.modal', handleHideModal)

      modalMetadataInit.show()
    }

    /*function verIndicadores(id, rank) {
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
      }).done(function (data) {
        // $.fn.raty.defaults.path = 'asset/raty/images/';
        $.fn.raty.defaults.path = '<?php echo base_url()?>asset/raty/images/';
        $(".raty").attr("id", lo_id).attr("rep_id", rep_id).attr("username", username).raty({
          score: data,
          cancel: true,
          click: function (score, evt) {
            $.ajax({
              type: "POST",
              url: "<?php echo base_url() ?>index.php/usuario/set_score",
              data: {
                lo_id: this.id,
                rep_id: $(this).attr('rep_id'),
                username: $(this).attr('username'),
                score: score
              },
              success: function (datos) {}
            });
          }
        });
      });
      <?php }else{ ?>
      $.post("<?php echo base_url() ?>index.php/lo/get_score_avg/", {
        lo_id: lo_id,
        rep_id: rep_id
      }).done(function (data) {

        $.fn.raty.defaults.path = '<?php echo base_url()?>asset/raty/images/';
        $(".raty").attr("id", lo_id).attr("rep_id", rep_id).raty({
          score: data,
          cancel: true
        });
      });

      <?php }?>

    }
    $(".titulo").click(function () { //cargando datos de lo elegido en las opciones de las busquedas
      $.ajax({
        type: "POST",
        url: "<?php echo base_url() ?>index.php/lo/set_visita",
        data: "lo_id=" + this.id + "&rep_id=" + $(this).attr('rep_id') + "&logged=" + $(this).attr('logged') + "",
        success: function (datos) {
          // alert("Se guardaron los datos: " + datos);
        }
      });

    });*/
</script>
