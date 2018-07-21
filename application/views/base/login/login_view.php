<?php $this->load->view('base/base/1_base_head');?>
<div class="row">
    <div class="col">
        <a class="btn btn-success pull-right" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">ACCESIBILIDAD</a>
    </div>
</div>
<form role="form" aria-label="Iniciar seción en FROAC" class="form-signin" action="<?php echo base_url()?>index.php/sesion" method="POST">
    <p class="form-signin-heading">Federación de Repositorios de Objetos de Aprendizaje Colombia <br><br>
        <img src="<?php echo base_url() ?>asset/img/logo2.png" alt="Logo FROAC" width="50"></p>

    <?php echo form_open('sesion'); ?>
    <div class="login-wrap">
        <?php if(validation_errors()):?>
        <div class="alert alert-danger" role="alert" aria-hidden='true' aria-live='assertive'>
          <?php echo validation_errors(); ?>
        </div>
        <?php endif;?>
        <input type="text" title="Nombre de usuario FROAC" class="form-control" placeholder="Nombre de usuario" name="username" autofocus>
        <input type="password" title="Contraseña" class="form-control" name="password" placeholder="Contraseña">

        <div class="form-group">
            <div class="form-check">
                <span class="pull-right">
                    <a data-toggle="modal" href="#myModal"> Olvide mi contraseña?</a>

                </span>
            </div>

        </div>
        <button class="btn btn-lg btn-success btn-block" type="submit">Iniciar Sesión</button>
        <div class="registration text-center">
            ¿No tienes una cuenta aún?<br>
            <a class="" href="<?php echo base_url()?>usuario/registro">
                Crear una nueva cuenta
            </a>
        </div><br>
        <div class="registration text-center">
            <a class="" href="<?php echo base_url()?>">
                <i class="fa fa-reply"></i>Volver
            </a>
        </div>
    </div>
</form>

<!-- js placed at the end of the document so the pages load faster
        <script src="<?php echo base_url() ?>asset/js/jquery.js"></script>
        <script src="<?php echo base_url() ?>asset/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url() ?>asset/js/modifyStyle.js"></script>-->
<?php $this->load->view('base/base/4_base_footer');?>
