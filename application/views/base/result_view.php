<?php
if ($sess == 1) {
  $logged = 1;
} else $logged = 0;
?>
<script type="text/javascript">
  var dataResult = <?php echo json_encode($result); ?>
</script>
<script src="<?php echo base_url() ?>asset/js/pagination.min.js"></script>


<div class="col-lg-9">
  <div class="card border-0">
    <h4 class="card-title"><?php echo $this->lang->line('message_result'); ?> <b>(<?php echo $palabras ?> )</b> En total: <?php echo $len_result ?></h4>
    <p class="no-results"><?php echo $this->lang->line('no_results'); ?>.</p>
    <label for="resultsPerPage">Resultados por página:</label>
    <select id="resultsPerPage">
      <option selected>10</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
      <option>50</option>
    </select>
    <div id="show_oas" class="card-body">
    </div>
    <br />
  </div>
</div>

<div class="modal fade" id="dialog_metadata" tabindex="-1" role="dialog" aria-labelledby="metadataModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" role="document">
      <div class="modal-header">

        <h4 class="modal-title" id="metadataModal"><?php echo $this->lang->line('metadata_standard_lom'); ?></h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>

      <div class="modal-body" id="dialog_metadata_result">
        <div class="embed-responsive embed-responsive-21by9">
          <iframe id="metadataIframe" src="" class="insideiframe embed-responsive-item" style="display: none"></iframe>
        </div>

      </div>
      <div class="modal-footer">
        <button data-dismiss="modal" class="btn btn-success" type="button"><?php echo $this->lang->line('accept'); ?></button>
      </div>
    </div>
  </div>
</div>


<script type="text/javascript">
  $(document).ready(() => {
    $("#hide-s").show()
    page(localStorage.getItem('resultsPerPage') ? localStorage.getItem('resultsPerPage') : 10)
    selectResultsPerPage = document.getElementById('resultsPerPage')
    selectResultsPerPage.value = localStorage.getItem('resultsPerPage') ? localStorage.getItem('resultsPerPage') : 10
    selectResultsPerPage.addEventListener('change', (e) => {
      page(e.target.value)
      localStorage.setItem('resultsPerPage', e.target.value)
    })
  })

  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16))
    }))
  }

  function page(num) {
    let container = $('#nav_oas')
    let los = dataResult
    let options = {
      dataSource: los,
      pageSize: num,
      callback: (response, pagination) => {
        $('.paginationjs-pages ul').addClass('pagination justify-content-center')
        $('.paginationjs-pages ul li').addClass('page-item')
        $('.paginationjs-pages ul li a').addClass('page-link')

        let dataHtml = '';
        $.each(response, function(index, item) {
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
                            <a id="${item['lo_id']}" target="_blank" rep_id="${item['rep_id']}" logged="<?php echo $logged ?>" class="btn btn-lg btn-success card-link d-inline" href="<?php echo base_url() ?>lo/load_lo/${b64EncodeUnicode(item['lo_location'])}/${b64EncodeUnicode(item['lo_title'])}/${b64EncodeUnicode(item['lo_id'])}/${b64EncodeUnicode(item['rep_id'])}">
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
</script>