<?php $this->load->view('base/base/1_base_head');?>
<?php $this->load->view('base/base/accessibility/panel');?>
<div class="container">
<div class="btn-group btn-group-toggle" data-toggle="buttons">
  <a id="accessibilityBarButton" class="btn btn-success" data-toggle="collapse" href="#accessibilityBar" role="button"
  aria-expanded="false" aria-controls="accessibilityBar">
    <?php echo $this->lang->line('accessibility'); ?>
  </a>
  <a  id="accessibilityBarHelpButton" class="btn btn-info" role="button">
    <?php echo $this->lang->line('help'); ?> 
  </a>
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
            <input type="text" title="Nombre de usuario FROAC" class="form-control" placeholder="<?php echo $this->lang->line('username'); ?>" name="username" autofocus>
            <input type="password" title="Contraseña" class="form-control" name="password" placeholder="<?php echo $this->lang->line('password'); ?>">

            <div class="form-group">
                
            </div>
            <button class="btn btn-lg btn-success btn-block" type="submit"><?php echo $this->lang->line('signin'); ?></button>
            <div class="registration text-center">
            <?php echo $this->lang->line('message_signup'); ?><br>
                <a class="" href="<?php echo base_url()?>usuario/registro">
                <?php echo $this->lang->line('create_account'); ?>
                </a>
            </div><br>
            <div class="registration text-center">
                <a class="" href="<?php echo base_url()?>">
                    <i class="fa fa-reply"></i><?php echo $this->lang->line('return'); ?>
                </a>
            </div>
        </div>
    </form>
</div>

<?php $this->load->view('base/base/4_base_footer');?>
