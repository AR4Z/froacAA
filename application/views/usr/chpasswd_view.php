<script>
    $("#form").hide();
</script>
<h5>Luego de cambiar tu contraseña la sesión sera cerrada, y tendras que volver a ingresar con tus nuevas credenciales.</h5>
<div class="col-lg-12">
    <div class="card border-0" id="verify" role="form" aria-label="Verificación de contraseña actual" aria-hidden="false">
            <label id="current-password-label" for="current-password" >Ingrese su contraseña actual</label>
        <div class="card-body">
                <div class="form-group">
                    <input id="psswd_now" type="password" class="form-control" id="exampleInputPassword1" name="current-password" placeholder="Password" aria-labelledby="current-password-label" aria-required="true" autofocus>
                </div>
                <div id='invalid_password' aria-hidden='true' aria-live='assertive' role='alert' class='alert alert-danger' style='display:none'><strong>¡Lo sentimos!</strong> La contraseña es inválida.</div>
                <input type="submit" class="btn btn-info" id="verificar" value="Verificar"></input>
        </div>
    </div>
    <div class="card border-0" id="form" role="form" aria-label="Ingreso de nueva contraseña" aria-hidden="true">
            <label id="new-password-label" for="new_password">Ingrese su nueva contraseña</label>
        <div class="panel-body">
            <form class="form-horizontal tasi-form" method="POST" id="form_pass" action="<?php echo base_url()?>index.php/usuario/upd_passwd/">
                <div class="form-group">
                    <input id="psswd_new1" type="password" class="form-control" id="exampleInputPassword1" placeholder="Nueva contraseña" aria-labelledby="new-password-label" name="new_password" aria-required="true">
                </div>
                <div id="new_password-validate">
                </div>
                <label class="panel-heading" id="new-password-rewrite-label" for="new_password_rewrite">Reescriba su nueva contraseña</label>
                <div class="form-group">
                    <input id="psswd_new2" name="new_password_rewrite" type="password" aria-labelledby="new-password-rewrite-label" class="form-control"  placeholder="Reescriba su nueva contraseña" aria-required="true">
                </div>
                <div id="new_password_rewrite-validate">
                </div>
                <input type="submit" id="update" class="btn btn-success" value="Actualizar">
            </form>
        </div>
    </div>
</div>


<script>

    $('#psswd_now').bind('input',function(){
        console.log("change");
        if($('#invalid_password').is(':visible')){
            $('#invalid_password').hide();
            $('#invalid_password').attr('aria-hidden', 'true');
        }
    })
    $("#verificar").click(function(){
        $.ajax({
            type: "POST",
            url: "<?php echo base_url() ?>index.php/usuario/verificar_passwd/",
            data: {passwd:$("#psswd_now").val()},
            success: function(datos) {
                if(datos == 1){
                    $("#verify").hide();
                    $("#verify").attr('aria-hidden', 'true');
                    $("#form").show();
                    $("#form").attr('aria-hidden', 'false');
                } else {
                    $('#invalid_password').show();
                    $('#invalid_password').attr('aria-hidden', 'false');
                }
            }
        });
    })

    $("#form_pass").validate({
        rules: {
            new_password: {
                required: true,
                minlength: 6
            },
            new_password_rewrite: {
                required: true,
                equalTo: "#psswd_new1"
            }
        },
        messages: {
            new_password: {
                required: "<div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> La contraseña es obligatoria.</div>",
                minlength: "<div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> Tu contraseña debe tener como mínimo 6 caracteres de longitud.</div>"
            },
            new_password_rewrite: {
                required: "<div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> Reescriba su contraseña.</div>",
                equalTo: "<div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> Las contraseñas no coinciden.</div>"
            }
        },
        errorPlacement: function(error, element) {
            let name = element.attr('name');
            error.appendTo($("#" + name + "-validate"));
        },
    });

</script>
