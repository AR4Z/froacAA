<!--main content start-->
<section id="main-content" role="main">
    <section class="wrapper">
        <script type="text/javascript">
            $(document).ready(function() {
                //$('#pass').hide();
                //$('#2').hide();
                $('#1').click(function() {
                    window.location = "<?php echo base_url()?>login";
                });
            });
        </script>
        <div class="art-postcontent" aria-label="Iniciar sesión" role="form">
            <h1>¡Registro exitoso!</h1><br>
            <h4>Bienvenido a FROAC,
                <?php echo $name ?>
            </h4>
            <br>
            <form autocomplete="off" action="<?php echo base_url()?>index.php/sesion" method="post" name="login" id="form-login">
                <h5>Si desea iniciar su sesión digite su contraseña:</h5>
                <input type="hidden" name="username" alt="username" size="18" value="<?php echo $username ?>" aria-hidden="true"/>
                <label id="pass">Contraseña: <input type="password" name="password" id="passwd" alt="username" placeholder="Contraseña" aria-labelledby="pass" autofocus/></label>
                <input type="submit" value="Iniciar sesión" class="btn btn-info" id="2">
            </form>
            <br></br>
            <a href="<?php echo base_url() ?>"><input type="button" value="No, tal vez mas tarde" class="btn btn-info"></a>

            <?php if($user){$sess = 1; $usr = $user;}else{ $sess = 0; $usr=0;} ?>

        </section>
</section>
