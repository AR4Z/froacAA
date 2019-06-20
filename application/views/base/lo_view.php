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
                <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Evaluar objeto de aprendizaje
</button>
            </div>
        </div>
    </section>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Evaluar objeto de aprendizaje</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-8">
            El recurso le permitió aprender sobre el tema.
            </div>
            <div class="col-md-4">
           
            <span id="effectiveness" class="rating stars" data-stars="5" data-default-rating="0"></span>
            
            </div>
            
        </div>
        <hr/>

        <div class="row">
            <div class="col-md-8">
            Recomendaría este recurso a otra persona.
            </div>
            <div class="col-md-4">
            <span id="motivation" class="rating stars" data-stars="5" data-default-rating="0"></span>
            </div>
            
        </div>
        <hr/>

        <div class="row">
            <div class="col-md-8">
            Pudo interactuar con facilidad y claridad con el recurso.
            </div>
            <div class="col-md-4">
            <span id="usability" class="rating stars" data-stars="5" data-default-rating="0"></span>
            </div>
            
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-8">
            El recurso no presenta barreras que le impidan acceder a los diferentes elementos que lo conforman.
            </div>
            <div class="col-md-4">
            <span id="accessibility" class="rating stars" data-stars="5" data-default-rating="0"></span>
            </div>
            
        </div>
        <hr/>

        <div class="row">
            <div class="col-md-8">
            Considera que los aspectos de presentación y navegación son acordes con sus preferencias y/o necesidades.


            </div>
            <div class="col-md-4">
            <span id="adaptability" class="rating stars" data-stars="5" data-default-rating="0"></span>
            </div>
            
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-8">
            Haga un comentario respecto a su percepción general del recurso.
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


<script type="text/javascript">
  let lo_url = "<?php echo base64_decode($url); ?>";
  let lo_name = "<?php echo base64_decode($lo_name); ?>";
  $(document).ready(function () {
    learningObject = new LearningObject(lo_url, lo_name)
  });
</script>
