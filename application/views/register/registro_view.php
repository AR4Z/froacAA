<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>asset/css/datepicker.css" rel="stylesheet"></link>


<div class="content-inner" role="main">
    <div class="container-fluid">
        <br/>
        <div class="card border-0">
            <h1>Crear cuenta en FROAC</h1>
            <!--FORMULARIO DE REGISTRO DE USUARIO-->
            <div class="card-body">
                <form method="POST" action="<?php echo base_url();?>index.php/usuario/guardar"  role="form" enctype='multipart/form-data' id="form">

                    <div class="card border-0">
                        <h3>Información personal</h3>
                        <div class="card-body">
                            <div class="form-group">
                                <input type="hidden" value="2" name="tipoU">
                                <!--<label for="exampleInputEmail1">Usted es:</label>
                                                <select class="form-control input-sm m-bot15" name="tipoU" required>
                                                <option value="2">Estudiante</option>-->
                                <!-- Se elimina la opción de registrarse con el rol de "profesor" ya que
                                                para este no se deben tener en cuenta las preferencias. A este lo agrega el admin-->
                                <!--<option value="3">Profesor</option>
                                                </select>-->
                            </div>
                            <div class="form-group">
                                <label for="nombre" id="nombre">Nombre:</label>
                                <input type="text" class="name form-control" name="nombre" placeholder="Nombres" id="input_name" aria-labelledby="nombre" aria-required="true" autofocus>
                            </div>
                            <div id="nombre-validate">
                            </div>
                            <div class="form-group">
                                <label for="apellidos" id="apellidos">Apellidos:</label>
                                <input type="text" class="form-control" name="apellidos" placeholder="Apellidos" aria-required="true" aria-labelledby="apellidos">
                            </div>
                            <div id="apellidos-validate">
                            </div>
                            <div id="cont_fecha_nac" class="form-group">
                                <label id="fecha_nac" for="input_fecha_nac">Fecha de nacimiento:</label>
                                <!--<input data-date-viewmode="years" data-date-format="dd-mm-yyyy" type="text" class="form-control" id="fecha_nac" name="fecha_nac" placeholder="Selecciona año, mes y día" required>-->
                                <input type="text" class="birthdate form-control" id="input_fecha_nac" name="fecha_nac" placeholder="fecha de nacimiento" aria-required="true" aria-labelledby="fecha_nac"></input>
                            </div>
                            <div id="fecha_nac-validate">
                            </div>
                            <div class="form-group">
                                <label id="mail" for="mail">E-mail:</label>
                                <!-- Se valida la existencia de @ y . en el correo ingresado por medio del atributo pattern -->
                                <input type="text" id="input_mail" class="form-control" name="mail" placeholder="Correo electronico" aria-required="true" aria-labelledby="mail">
                            </div>
                            <div id="mail-validate">
                            </div>
                            <div class="form-group">
                                <label for="username" id="username">Nombre de usuario:</label>
                                <input type="text" class="form-control" id="input_username" name="username" placeholder="Nombre de usuario unico en FROAC" aria-required="true" aria-labelledby="username">
                            </div>
                            <div id="username-validate">
                            </div>
                            <div class="form-group">
                                <label for="passwd" id="passwd">Password:</label>
                                <input type="password" class="form-control" id="input_passwd" name="passwd" placeholder="Contraseña" aria-labelledby="passwd" aria-required="true"><br>
                                <input type="password" class="form-control" id="input_passwd2" name="passwd2" placeholder="Reescribe la contraseña" aria-labelledby="passwd" aria-required="true">
                            </div>
                            <div id="passwd-validate">
                            </div>
                            <div id="passwd2-validate">
                            </div>
                            <div class="form-group">
                                <label for="etnica">Pertenece a una comunidad indigena:</label>
                                <select class="form-control input-sm m-bot15" name="etnica" id="etnica">
                                    <option value="ninguna">Ninguna</option>
                                    <option value="embera">Embera Chamí</option>
                                    <option value="otra">Otra comunidad</option>

                                </select>
                            </div>

                            <div class="form-group">
                                <label for="dissabilities">Presenta alguna de las siguientes discapacidades:</label>
                                <br>
                                <?php
                                  foreach ($dissabilities as $key) { ?>
                                <input type="checkbox" name="dissabilities[]" value=" <?php echo $key->use_dissability_id ?> " />
                                <?php echo $key->use_dissability ?><br />
                                <?php } ?>
                            </div>

                            <div class="form-group">
                                <label for="institution_username">Institución a la que pertenece:</label>
                                <input aria-labelledby="institution_username" type="text" class="form-control" id="institution_username" name="institution_username" placeholder="Nombre de la institución a la que pertenece">
                            </div>
                            <div id="institution_username-validate">

                            </div>

                            <div class="form-group">
                                <label id="label_nivel_educativo" for="nevel_ed">Nivel Educativo:</label>
                                <select class="form-control input-sm m-bot15" name="nevel_ed" aria-labelledby="label_nivel_educativo" role="listbox" aria-required="true">
                                    <?php
                                                    foreach ($nivel_educativo as $key) { ?>
                                    <option name="level[]" value="<?php echo $key->use_id_level ?>">
                                        <?php echo $key->use_level ?>
                                    </option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="form-group" role="group" aria-labelledby="label_preferences">
                                <label id="label_preferences" for="pref">Preferencias de tipo de recurso educativo</label><br/>

                                <?php
                                                    foreach ($preferencias as $key) { $preferencia = preg_replace('/\s+/', '', $key -> use_pre_preferencia);?>

                                <input type="checkbox" aria-labelledby="<?php echo $preferencia?>" aria-selected="true" name="pref[]" value=" <?php echo $key->use_pre_id ?> " /><label id="<?php echo $preferencia?>">
                                    <?php echo $key->use_pre_preferencia ?></label><br />
                                <?php } ?>

                            </div>
                            <div class="form-group" role="group" aria-labelledby="label_interfaz">
                                <label for="personaliceInterfaz" id="label_personalice_interfaz">¿Desea personalizar la interfaz?</label>
                                <select id="useAdaptInterfaz" class="form-control input-sm m-bot15" name="personaliceInterfaz" aria-labelledby="label_personalice_interfaz" role="listbox" aria-required="true">
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>

                            </div>
                            <div class="form-group" role="group" aria-labelledby="label_narrator">
                                <label for="useNarrator" id="label_use_narrator">¿Desea usar el narrador?</label>
                                <select id="useNarrator" class="form-control input-sm m-bot15" name="useNarrator" aria-labelledby="label_use_narrator" role="listbox" aria-required="true">
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>

                            </div>
                            <div class="form-group" role="group" aria-labelledby="label_narrator">
                                <label for="use_screen_reader" id="label_use_screen_reader">¿Desea usar el lector de pantalla?</label>
                                <select id="useSr" class="form-control input-sm m-bot15" name="useSr" aria-labelledby="label_use_screen_reader" role="listbox" aria-required="true">
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>

                            </div>
                        </div>
                        <div class="form-group" aria-live="assertive">
                            <input type="button" style="display:none;" value="Realizar Test NEED" name="need" id="need" class="btn btn-info">
                            <!--FIN FORMULARIO DE REGISTRO DE USUARIO-->
                            <input type="text" style="display: none;" id="necesidadespecial" name="necesidadespecial">
                        </div>

                        <div class="form-group">
                            <input id="submitg" type="submit" class="btn btn-info" value="Guardar Información">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!--main content end-->
    <script type="text/javascript" src="<?php echo base_url();?>asset/js/es-CO.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>asset/js/datepicker.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
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
            $('.glyphicon-calendar').attr("class", "fa fa-calendar");
            $('.glyphicon-triangle-right').attr('class', "fa fa-caret-right");
            $('.glyphicon-triangle-left').attr('class', "fa fa-caret-left");
            $('.glyphicon-backward').attr('class', "fa fa-media-skip-backward");
            $('.glyphicon-forward').attr('class', "fa fa-media-skip-forward");
            $(".datepicker-button").click(function() {
                $("#datepicker-calendar-input_fecha_nac").attr("style", "left: 20px; top: 284px;");
            });
        });
        $(document).ready(function() {
            function validateUsername(username) {
                let re = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/;
                return re.test(username);
            }
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
            $.validator.addMethod("usernameValidation", function(value) {
                return validateUsername(value);
            })
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
                                return !json.success;
                            }
                        }
                    },
                    username: {
                        required: true,
                        usernameValidation: true,
                        minlength: 4,
                        remote: {
                            type: "POST",
                            url: "<?php echo base_url()?>index.php/usuario/verify_username",
                            dataType: 'json',
                            data: {
                                username: function() {
                                    return $("#input_username").val();
                                }
                            },
                            dataFilter: function(resp) {
                                let json = JSON.parse(resp);
                                return !json.success;
                            }
                        }
                    },
                    passwd: {
                        required: true,
                        minlength: 6
                    },
                    passwd2: {
                        required: true,
                        equalTo: "#input_passwd"
                    },
                    institution_username: {
                        required: true
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
                    },
                    username: {
                        required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre de usuario es obligatorio.</div>",
                        minlength: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre de usuario debe tener como mínimo 4 caracteres de longitud.</div>",
                        usernameValidation: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre de usuario es inválido.</div>",
                        remote: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre de usuario ya esta registrado.</div>"
                    },
                    passwd: {
                        required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> La contraseña es obligatoria.</div>",
                        minlength: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> Tu contraseña debe tener como mínimo 6 caracteres de longitud.</div>"
                    },
                    passwd2: {
                        required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> Reescriba su contraseña.</div>",
                        equalTo: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> Las contraseñas no coinciden.</div>"
                    },
                    institution_username: {
                        required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡Lo sentimos!</strong> El nombre de la institucion educativa es obligatorio.</div>"
                    }
                },
                errorPlacement: function(error, element) {
                    let name = element.attr('name');
                    error.appendTo($("#" + name + "-validate"));
                },
            });
        })
    </script>

    <script type="text/javascript">

    $('#form').submit(function(e) {
        // con esta información sabemos que preferencias de usuario guardar
        // si cada una de las caracteristicas es requerida(1) u opcional(2) seran guardadas
        let newUserAdaptInfo = {
            needAdaptInterfaz: $("#useAdaptInterfaz").val() ==  1 || $("#useAdaptInterfaz").val() ==  2,
            needSr: $('#useSr').val() ==  1 || $("#useSr").val() ==  2,
            needNarrator: $("#useNarrator").val() == 1 || $("#useNarrator").val() == 2,
        }
        // verificamos si el nuevo usuario desea usar las adaptaciones de interfaz
        if(newUserAdaptInfo.needAdaptInterfaz){
            let interfazPreferences = {
                'use_username':$("input[name='username']").val(),
                "cursor_size_id":localStorage['cursor_size_id'],
                'color_cursor':localStorage['color_cursor'],
                'trail_cursor_size_id':localStorage['trail_cursor_size_id'],
                'trail_cursor_color':localStorage['trail_cursor_color'],
                'invert_color_image':localStorage['invert_color_image'],
                'invert_color_general':localStorage['invert_color_general'],
                'contrast_colors_id':localStorage['contrast_colors_id'],
                'font_size':localStorage['font_size'],
                'font_type_id':localStorage['font_type_id'],
                'size_line_spacing':localStorage['size_line_spacing'],
                'cursor_url':localStorage['cursor_url'],
            }
            let inputInterfazPreferences = $("<input>")
               .attr("type", "hidden")
               .attr("name", "interfazPreferences").val(JSON.stringify(interfazPreferences));
               $(this).append($(inputInterfazPreferences));
        }
        // verificamos si el nuevo usuario desea usar el narrador
        if(newUserAdaptInfo.needNarrator){
            let narratorPreferences = {
                'use_username':$("input[name='username']").val(),
                'speed_reading':localStorage['speed_reading_nr'],
                'pitch_id':localStorage['pitch_id_nr'],
                'volume_id': localStorage['volume_id_nr'],
                'voice_gender_id':localStorage['voice_gender_id_nr'],
                'links_id':localStorage['links_id_nr'],
                'highlight_id':localStorage['highlight_id_nr'],
                'reading_unit_id':localStorage['reading_unit_id_nr'],
            }
            let inputNarratorPreferences = $("<input>")
               .attr("type", "hidden")
               .attr("name", "narratorPreferences").val(JSON.stringify(narratorPreferences));
               $(this).append($(inputNarratorPreferences));

        }
        // verificamos si el nuevo usuario desea usar el screen reader
        if(newUserAdaptInfo.needSr){
            let screenReaderPreferences = {
                    'use_username':$("input[name='username']").val(),
                    'speed_reading':localStorage['speed_reading_sr'],
                    'pitch_id':localStorage['pitch_id_sr'],
                    'volume_id':localStorage['volume_id_sr'],
                    'voice_gender_id':localStorage['voice_gender_id_sr'],
                    'links_id':localStorage['links_id_sr'],
                }

            let inputScreenReaderPreferences = $("<input>")
                  .attr("type", "hidden")
                  .attr("name", "screenReaderPreferences").val(JSON.stringify(screenReaderPreferences));
            $(this).append($(inputScreenReaderPreferences));


        }


        return true;

    });


    </script>
