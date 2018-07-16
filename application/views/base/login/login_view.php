
        <?php $this->load->view('base/base/1_base_head');?>
        <div class="row">
            <div class="col">
                <a class="btn btn-success pull-right" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">ACCESIBILIDAD</a>
            </div>
        </div>
            <form role="form" aria-label="Iniciar seción en FROAC" class="form-signin" action="<?php echo base_url()?>index.php/sesion" method="POST">
                <p class="form-signin-heading">Federación de Repositorios de Objetos de Aprendizaje Colombia <br><br>
                    <img src="<?php echo base_url() ?>asset/img/logo2.png" alt="Logo FROAC" width="50"></p>
                <?php echo validation_errors(); ?>
                <?php echo form_open('sesion'); ?>
                <div class="login-wrap">
                    <input type="text" title="Nombre de usuario FROAC" class="form-control" placeholder="Nombre de usuario" name="username" autofocus>
                    <input type="password" title="Contraseña" class="form-control" name="password" placeholder="Contraseña">
                    <label class="checkbox">
                        <input type="checkbox" aria-selected="true" value="remember-me"> Recordarme
                        <span class="pull-right">
                            <a data-toggle="modal" href="#myModal"> Olvide mi contraseña?</a>
                        </span>
                    </label>
                    <button class="btn btn-lg btn-login btn-block" type="submit">Iniciar Sesión</button>
                    <div class="registration" align="center">
                        No tienes una cuenta aun?<br>
                        <a class="" href="<?php echo base_url()?>usuario/registro">
                            Crear una nueva cuenta
                        </a>
                    </div><br>
                    <div class="registration" align="center">

                        <a class="" href="<?php echo base_url()?>">
                            <li class="icon-reply"><strong>Volver</strong></li>
                        </a>
                    </div>

                </div>


            </form>

        <!-- js placed at the end of the document so the pages load faster
        <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>
        <script src="<?php echo base_url() ?>asset/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url() ?>asset/js/modifyStyle.js"></script>-->
    <?php $this->load->view('base/base/4_base_footer');?>
