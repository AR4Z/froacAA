<?php if($this->session->userdata('logged_in')){$sess = 1; $usr = $user;}else{ $sess = 0; $usr=0;} ?>
<div class="content-inner" role="main">
    <section>
        <div class="container-fluid">
            <div class="row" style="display: none;" id="hide-s"  aria-hidden="true">
                <div class="col">
                    <div class="flexBox" style="display: flex;flex-flow: row wrap;justify-content: center;">
                        <div class="input-group mb-3" aria-label="Buscar objeto de aprendizaje">
                        <input type="search" aria-label="search text" class="form-control form-control-lg" id="searchLoAux" placeholder="<?php echo $this->lang->line('search_learning_object'); ?>">
                            <button type="submit" onclick="searchLo()" class="btn btn-outline-success btn-lg">
                              <?php echo $this->lang->line('search');?>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div id="show-s">
                <div class="row">
                    <div class="col text-center">
                        <h1 title="Federación de Repositorios de Objetos de Aprendizaje Colombia">Federación de Repositorios de Objetos de Aprendizaje Colombia
                            <img src="<?php echo base_url() ?>asset/img/logo2.png" alt="Logo FROAC" width="50">
                        </h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="flexBox" style="display: flex;flex-flow: row wrap;justify-content: center;">
                          <div role="search" class="input-group mb-3">
                            <input type="search" aria-label="search text" class="form-control form-control-lg" id="searchLo" placeholder="<?php echo $this->lang->line('search_learning_object'); ?>">
                            <button type="submit" onclick="searchLo()" class="btn btn-outline-success btn-lg">
                              <?php echo $this->lang->line('search');?>
                            </button>
                          </div> 
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div class="row">
                    <div class="col-lg-3 col-sm-6">
                        <div class="card border-0">
                            <div class="row">
                                <div class="col text-center">
                                    <div class="symbol" style="background:#6ccac9;">
                                        <i class="fa fa-user"></i>
                                    </div>
                                </div>
                                <div class="col text-center">
                                    <div class="value">
                                        <p class="numeros">
                                            <?php echo $total_user ?>
                                        </p>
                                        <p><?php echo $this->lang->line('user'); ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card border-0">
                            <div class="row">
                                <div class="col text-center">
                                    <div class="symbol" style="background:#ff6c60;">
                                        <i class="fa fa-sitemap" ></i>
                                    </div>
                                </div>
                                <div class="col text-center">
                                    <div class="value">

                                        <p class="numeros">
                                            <?php echo $total_rep ?>
                                        </p>
                                        <p><?php echo $this->lang->line('repositories'); ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card border-0">
                            <div class="row">
                                <div class="col text-center">
                                    <div class="symbol" style="background:#f8d347;">
                                        <i class="fa fa-file"></i>
                                    </div>
                                </div>
                                <div class="col text-center">

                                    <div class="value">
                                        <p class="numeros">
                                            <?php echo $total_lo ?>
                                        </p>
                                        <p><?php echo $this->lang->line('objects'); ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card border-0">
                            <div class="row">
                                <div class="col text-center">
                                    <div class="symbol" style="background:#57c8f2;">
                                        <i class="fa fa-check"></i>
                                    </div>
                                </div>
                                <div class="col text-center">

                                    <div class="value">
                                        <p class="numeros">
                                            <?php echo $total_lo_score ?>
                                        </p>
                                        <p><?php echo $this->lang->line('objects_qualified'); ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="result">
            </div>
            <div class="row">
                <div class="col">
                    <nav id="nav_oas" aria-label="Navegación en objetos de aprendizaje encontrados">

                    </nav>
                </div>
            </div>
        </div>
    </section>
    
    <script>
    $(document).ready(() => {
      let inputSearch = document.getElementById('searchLo')
      let inputSearchAux = document.getElementById('searchLoAux')
      let handleEnterKey = (event) => {
        event.preventDefault()

        if(event.keyCode === 13) {
          searchLo()
        }
      }
      inputSearch.addEventListener('keyup', handleEnterKey)
      inputSearchAux.addEventListener('keyup', handleEnterKey)
    })
    function searchLo() {
      let divShow = document.getElementById('show-s')
      let divHide = document.getElementById('hide-s')
      let keywords = divHide.style.display == 'none' ? document.getElementById('searchLo').value : document.getElementById('searchLoAux').value
      let keywordsWithUnderscore = keywords.toLowerCase().replace(/ /g, '_')

      fetch(`${ window.base_url }index.php/lo/buscar_lo/${ keywordsWithUnderscore }/<?php echo $sess ?>/<?php echo $usr ?>`)
        .then(response => {
          return response.text();
        })
        .then(body => {          
          document.getElementById('searchLoAux').value= keywords
          document.getElementById('result').style.display = ''
          document.getElementById('result').setAttribute('aria-hidden', 'false')
          $(divShow).hide('slow')
          $(divHide).show('slow')
          divShow.setAttribute('aria-hidden', 'true')
          divHide.setAttribute('aria-hidden', 'false')
          document.getElementById('result').innerHTML = ''
          $('#result').append(body)
        })
    }
    </script>
