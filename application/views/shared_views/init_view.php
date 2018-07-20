<?php if($user){$sess = 1; $usr = $user;}else{ $sess = 0; $usr=0;} ?>
<div class="content-inner">
    <section>
        <div class="container-fluid">
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
                        <div class="input-group mb-3">
                            <input type="text" class="form-control form-control-lg" placeholder="Buscar objeto de aprendizaje" aria-label="Buscar objeto de aprendizaje" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-success btn-lg" type="button">Buscar</button>
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
    </section>
