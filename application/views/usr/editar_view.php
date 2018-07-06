<link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">
<link href="<?php echo base_url();?>asset/css/datepicker.css" rel="stylesheet"></link>
<script type="text/javascript" src="<?php echo base_url();?>asset/js/es-CO.min.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>asset/js/datepicker.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
<section id="main-content" role="main">
    <section class="wrapper">
        <!-- page start-->
        <div class="row">
            <div class="col-md-12">
                <section class="card border-right-0 border-bottom-0 border-left-0 border-top-0" role="form" aria-label="Editar mis datos">
                    <header class="card-heading">
                        <h1>Editar mis datos</h1>
                        <a onclick="chpasswd()" class="btn btn-warning pull-right" data-toggle="modal" href="#dialog_chpasswd" style="margin-right:10px;">
                            <li class="icon-edit"> Cambiar contraseña</li>
                        </a>
                    </header>
                    <div class="card-body">

                        <form method="POST" role="form" action="<?php echo base_url();?>index.php/usuario/update_user" enctype='multipart/form-data' id="form">
                            <div class="col-lg-12">
                                <section class="card  border-right-0 border-bottom-0 border-left-0 border-top-0">
                                    <header class="card-heading">
                                        <h6>Información personal</h6>
                                    </header>
                                    <div class="card-body">
                                        <input type="hidden" value="2" name="tipoU">
                                        <!--   <div class="form-group">
                                                <label for="exampleInputEmail1">Usted es:</label>
                                                <select class="form-control input-sm m-bot15" name="tipoU" required>
                                                    <option value="<?php echo $usr_all_data[0]["use_rol_id"]?>" ><?php echo $usr_all_data[0]["use_rol_nombre"]?></option>
                                                    <option value="2">Estudiante</option>
                                                    <option value="3">Profesor</option>
                                                </select>
                                            </div>
                                            -->
                                        <div class="form-group">
                                            <label for="nombre" id="nombre">Nombre:</label>
                                            <input type="text" class="name form-control" value="<?php echo $usr_all_data[0]["use_nombre"]?>" name="nombre" placeholder="Nombres" id="input_name" aria-labelledby="nombre" aria-required="true" autofocus>
                                        </div>
                                        <div id="nombre-validate">
                                        </div>
                                        <div class="form-group">
                                            <label for="apellidos" id="apellidos">Apellidos:</label>
                                            <input type="text" value="<?php echo $usr_all_data[0]["use_apellido"]?>" class="form-control" name="apellidos" placeholder="Apellidos" aria-labelledby="apellidos">
                                        </div>
                                        <div id="apellidos-validate">
                                        </div>
                                        <div id="cont_fecha_nac" class="form-group">
                                            <label id="fecha_nac" for="input_fecha_nac">Fecha de nacimiento:</label>
                                            <!--<input data-date-viewmode="years" data-date-format="dd-mm-yyyy" type="text" class="form-control" id="fecha_nac" name="fecha_nac" placeholder="Selecciona año, mes y día" required>-->
                                            <input type="text" class="birthdate form-control" value="<?php echo $usr_all_data[0]['use_stu_datebirth']?>" id="input_fecha_nac" name="fecha_nac" placeholder="fecha de nacimiento" aria-labelledby="fecha_nac"></input>
                                        </div>
                                        <div id="fecha_nac-validate">
                                        </div>
                                        <div class="form-group">
                                            <label id="mail" for="mail">E-mail:</label>
                                            <input value="<?php echo $usr_all_data[0]["use_email"]?>" type="text" id="input_mail" class="form-control" name="mail" placeholder="Correo electronico" aria-labelledby="mail">
                                        </div>
                                        <div id="mail-validate">
                                        </div>
                                        <div class="form-group">
                                            <label for="fecha_nac">Nivel de educación:</label>
                                            <select class="form-control input-sm m-bot15" name="nevel_ed" required>
                                                    <option value="<?php echo $usr_all_data[0]["use_edu_level"]?>"><?php echo $usr_all_data[0]["use_level"]?></option>
                                                    <option value="0">Seleccione una opción</option>
                                                    <option value="1">Básica Primaria</option>
                                                    <option value="2">Básica Secundaria</option>
                                                    <option value="3">Educación Media</option>
                                                    <option value="4">Educación Superior</option>
                                                    <option value="5">Carrera Técnica/Tecnológica</option>
                                                    <option value="6">Pregrado</option>
                                                    <option value="7">Especialización</option>
                                                    <option value="8">Maestría</option>
                                                    <option value="9">Doctorado</option>
                                                    <option value="10">Posdoctorado</option>
                                                </select>
                                        </div>
                                        <button id="sub" type="submit" class="btn btn-info">Actualizar mis datos</button>
                                        <a class="btn btn-success pull-right" href="<?php echo base_url()?>usuario/perfil">
                                            <li class="icon-reply"> Volver</li>
                                        </a>
                                    </div>
                                </section>
                            </div>
                        </form>

                    </div>
                </section>
            </div>

        </div>
        <!-- page end-->
    </section>
</section>
<!--main content end-->

<!-- Modal chpassword -->
<div class="modal fade" id="dialog_chpasswd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Actualizar Contraseña</h4>
            </div>
            <div class="modal-body" id="dialog_chpassword_view">

            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" id="cancelar" class="btn btn-warning" type="button">Cancelar</button>
                <button data-dismiss="modal" id="aceptar" class="btn btn-success" type="button">Aceptar</button>
            </div>
        </div>
    </div>
</div>
<!-- modal -->
<!--script for this page-->
<script type="text/javascript">
    let today = new Date();
    let dd = today.getDate() - 1;
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    $(document).ready(function() {
        $('.birthdate').datepicker({
            startView: 2,
            inputFormat: ["yyyy/MM/dd"],
            outputFormat: "yyyy/MM/dd",
            min: '1975/01/01',
            max: yyyy + "/" + mm + "/" + dd
        });

        $('.name').focus();
        $('.glyphicon-calendar').attr("class", "oi oi-calendar");
        $('.glyphicon-triangle-right').attr('class', "oi oi-caret-right");
        $('.glyphicon-triangle-left').attr('class', "oi oi-caret-left");
        $('.glyphicon-backward').attr('class', "oi oi-media-skip-backward");
        $('.glyphicon-forward').attr('class', "oi oi-media-skip-forward");
        $(".datepicker-button").click(function() {
            $("#datepicker-calendar-input_fecha_nac").attr("style", "left: 20px; top: 284px;");
        });


    });
</script>
<script type="text/javascript">
    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validateDate(date, infDate, supDate) {
        return (infDate <= date) && (date <= supDate);
    }
    $.validator.addMethod('range_date', function(value) {
        let date = new Date(value);
        let infDate = new Date('1975-01-01');
        return validateDate(date, infDate, today);
    });

    $.validator.addMethod("email_regex", function(value) {
        return validateEmail(value);
    });
    $("#form").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3
            },
            apellidos: {
                required: true,
                minlength: 3
            },
            fecha_nac: {
                required: true,
                dateISO: true,
                range_date: true
            },
            mail: {
                required: true,
                email_regex: true,
                remote: {
                    type: 'POST',
                    url: "<?php echo base_url()?>index.php/usuario/verify_email",
                    dataType: 'json',
                    data: {
                        mail: function() {
                            return $('#input_mail').val();
                        }
                    },
                    dataFilter: function(resp) {
                        let json = JSON.parse(resp);
                        return !json.success || ($('#input_mail').val() == "<?php echo $usr_all_data[0]["use_email"]?>");
                    }
                }
            }
        },
        messages: {
            nombre: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre es obligatorio.</div>",
                minlength: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre debe tener como mínimo 3 caracteres de longitud.</div>"
            },
            apellidos: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El apellido es obligatorio.</div>",
                minlength: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El apellido debe tener como mínimo 3 caracteres de longitud.</div>"
            },
            fecha_nac: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> La fecha de nacimiento es obligatoria.</div>",
                dateISO: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> La fecha de nacimiento ingresada es inválida.</div>",
                range_date: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> La fecha de nacimiento debe estar entre 1975-01-01 y ayer.</div>"
            },
            mail: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El correo es obligatorio.</div>",
                email_regex: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El correo no es válido.</div>",
                remote: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El correo ya fue registrado.</div>"
            }
        },
        errorPlacement: function(error, element) {
            let name = element.attr('name');
            error.appendTo($("#" + name + "-validate"));
        },
    });


    function chpasswd() {
        $("#dialog_chpassword_view").load("<?php echo base_url(); ?>index.php/usuario/chpasswd");
    }

    $("#aceptar").click(function() {
        window.location = "<?php echo base_url()?>";
    })
</script>
