<?php if($this->session->userdata('logged_in')){$sess = 1; $usr = $user;}else{ $sess = 0; $usr=0;} ?>
<div class="content-inner" role="main">
    <section>
        <div class="container-fluid">
            <div class="row" style="display: none;" id="hide-s"  aria-hidden="true">
                <div class="col">
                    <div class="flexBox" style="display: flex;flex-flow: row wrap;justify-content: center;">
                        <div class="input-group mb-3" role="search" aria-label="Buscar objeto de aprendizaje">
                            <input type="text" class="form-control form-control-lg"  id="hide-input" placeholder="Buscar objeto de aprendizaje" aria-label="Buscar objeto de aprendizaje" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <a class="btn btn-outline-success btn-lg" role="button" href="">Buscar</a>
                            </div>
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
                            <div class="input-group mb-3" role="search" aria-label="Buscar objeto de aprendizaje">
                                <input type="text" class="form-control form-control-lg"  id="search" placeholder="Buscar objeto de aprendizaje" aria-label="Buscar objeto de aprendizaje" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <a class="btn btn-outline-success btn-lg" role="button" href="<?php echo base_url()?>usuario/busqueda">Buscar</a>
                                </div>
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
                                        <p>Usuarios</p>
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
                                        <p>Repositorios</p>
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
                                        <p>Objetos</p>
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
                                        <p>Objetos calificados</p>
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
                    <nav id="nav_oas" aria-label="Navegación en obejtos de aprendizaje encontrados">

                    </nav>
                </div>
            </div>
        </div>
    </section>
    <script>
       function verify_params() {
           var params = $("#hide-input").val();
           params = params.toLowerCase().replace(/ /g, '_');
           $("#result").load("<?php echo base_url(); ?>index.php/lo/buscar_lo/" + params + "/" + <?php echo $sess ?> + "/" + "<?php echo $usr ?>");
       }
       $("#result").show();
       $("#search").keyup(function() {
           $("#hide-s").show("slow");
           $("#hide-s").attr('aria-hidden', 'false');
           $("#show-s").hide("slow");
           $("#show-s").attr('aria-hidden', 'true');
           $("#hide-input").val($("#search").val());
           $("#hide-input").focus();
       });
       $(".buscar").click(function() {
           verify_params();
           $("#info").hide("slow");
           $("#info").attr('aria-hidden', 'true');
       });
       $(document).keypress(function(e) {
           if (e.which == 13 && ($("#hide-input").val().length > 0)) {
               verify_params();
               $("#info").hide("slow");
               $("#info").attr('aria-hidden', 'true');
               
           }
       });
    </script>
