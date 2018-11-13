<div class="content-inner" role="main">
    <section>
        <div class="container-fluid">
            <div class="card border-0">
                <h1 id="name-lo">
                    <?php echo base64_decode($lo_name)?>
                    </b>
                </h1>

                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="col embed-responsive embed-responsive-21by9" id="div-lo" style="display:none;">
                                <iframe id="oa" title="<?php echo base64_decode($lo_name);?>" aria-label="Objeto de aprendizaje" class="embed-responsive-item"
                                    src=""></iframe>
                            </div>
                          </div>
                        <!-- Esto es una prueba de vizualización de el objeto -->
                    </div>
                    <div id="error" class="jumbotron jumbotron-fluid" style="display:none;">
                                <div class="container">
                                    <h1 class="display-4">¡Error!</h1>
                                    <p class="lead">Al parecer el objeto ya no existe :(</p>
                                    <hr class="my-4">
                                    <a class="btn btn-success btn-lg" href="<?php echo base_url()?>" role="button">
                                    Volver a buscar
                                    <i class="fa fa-undo" ></i>
                                    </a>
                                 </div>
                            </div>
                </div>
                
            </div>
        </div>
    </section>
<script type="text/javascript">
  let lo_url = "<?php echo base64_decode($url); ?>";
  let lo_name = "<?php echo base64_decode($lo_name); ?>";
  $(document).ready(function () {
    learningObject = new LearningObject(lo_url, lo_name)
  });
</script>
