<!--<link href="<?php echo base_url() ?>asset/css/open-iconic-bootstrap.css" rel="stylesheet">-->
<link href="<?php echo base_url();?>asset/css/datepicker.css" rel="stylesheet"/>
<script type="text/javascript" src="<?php echo base_url();?>asset/js/es-CO.min.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>asset/js/datepicker.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>

<div class="content-inner" role="main">

        <div class="container-fluid">
            <br/>
            <div class="row">
                <div class="col-md-12">

                    <div class="card border-0" role="form" aria-label="Editar mis datos">
                            <h1 class="card-title"><?php echo $this->lang->line('edit_my_data'); ?></h1>


                        <div class="card-body">

                            <form method="POST" role="form" action="<?php echo base_url();?>index.php/usuario/update_user" enctype='multipart/form-data' id="form-update-info-user">
                                <div class="col-lg-12">
                                    <div class="card border-0">

                                            <h3 class="card-title"><?php echo $this->lang->line('personal_information'); ?></h3>
                                            <div class="text-right">
                                                <a onclick="chpasswd()" class="btn btn-warning pull-right" data-toggle="modal" href="#dialog_chpasswd" style="margin-right:10px;">
                                                       <i class="fa fa-pencil"> </i><?php echo $this->lang->line('change_password'); ?></a>
                                            </div>
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
                                                <label for="nombre" id="nombre"><?php echo $this->lang->line('name'); ?>:</label>
                                                <input type="text" class="name form-control" value="<?php echo $usr_all_data[0]["use_nombre"]?>" name="nombre" placeholder="<?php echo $this->lang->line('name'); ?>" id="input_name" aria-labelledby="nombre" aria-required="true" autofocus>
                                            </div>
                                            <div id="nombre-validate">
                                            </div>
                                            <div class="form-group">
                                                <label for="apellidos" id="apellidos"><?php echo $this->lang->line('last_name'); ?>:</label>
                                                <input type="text" value="<?php echo $usr_all_data[0]["use_apellido"]?>" class="form-control" name="apellidos" placeholder="<?php echo $this->lang->line('last_name'); ?>" aria-labelledby="apellidos" aria-required="true">
                                            </div>
                                            <div id="apellidos-validate">
                                            </div>
                                            <div id="cont_fecha_nac" class="form-group">
                                                <label id="fecha_nac" for="input_fecha_nac"><?php echo $this->lang->line('birthdate'); ?>:</label>
                                                <!--<input data-date-viewmode="years" data-date-format="dd-mm-yyyy" type="text" class="form-control" id="fecha_nac" name="fecha_nac" placeholder="Selecciona año, mes y día" required>-->
                                                <input type="text" class="birthdate form-control" value="<?php echo $usr_all_data[0]['use_stu_datebirth']?>" id="input_fecha_nac" name="fecha_nac" placeholder="<?php echo $this->lang->line('birthdate'); ?>" aria-labelledby="fecha_nac" aria-required="true"></input>
                                            </div>
                                            <div id="fecha_nac-validate">
                                            </div>
                                            <div class="form-group">
                                                <label id="mail" for="mail"><?php echo $this->lang->line('email'); ?>:</label>
                                                <input value="<?php echo $usr_all_data[0]["use_email"]?>" type="text" id="input_mail" class="form-control" name="mail" placeholder="<?php echo $this->lang->line('email'); ?>" aria-labelledby="mail" aria-required="true">
                                            </div>
                                            <div id="mail-validate">
                                            </div>

                                            <div class="form-group">
                                                <label id="label_nivel_educativo" for="nevel_ed"><?php echo $this->lang->line('education_level'); ?>:</label>
                                                <select id="nivel-educacion" class="form-control input-sm m-bot15" name="nevel_ed"  aria-labelledby="label_nivel_educativo" role="listbox" aria-required="true">
                                                                <?php
                                                                foreach ($nivel_educativo as $key) { ?>
                                                                    <?php if($key->use_id_level == $usr_all_data[0]["use_id_level"]):?>
                                                                        <option name="level[]"  value= "<?php echo $key->use_id_level ?>" aria-select="true" selected><?php echo $key->use_level ?></option>
                                                                    <?php else:?>
                                                                        <option name="level[]"  value= "<?php echo $key->use_id_level ?>"><?php echo $key->use_level ?></option>
                                                                    <?php endif?>
                                                                <?php } ?>
                                                            </select>
                                            </div>
                                            <div class="form-group" role="group" aria-labelledby="label_interfaz">
                                                <label for="personaliceInterfaz" id="label_personalice_interfaz"><?php echo $this->lang->line('customize_interface'); ?></label>
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
                                                <label for="useNarrator" id="label_use_narrator"><?php echo $this->lang->line('use_narrator'); ?></label>
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
                                            <div class="form-group" role="group" aria-labelledby="label_use_screen_reader">
                                                <label for="use_screen_reader" id="label_use_screen_reader"><?php echo $this->lang->line('use_screen_reader'); ?></label>
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
                                            <div class="form-group" role="group" aria-labelledby="label_use_lsc">
                                                <label for="useLSCTranslator" id="label_use_lsc"><?php echo $this->lang->line('use_lsc'); ?></label>
                                                <select id="useLSCTranslator" class="form-control input-sm m-bot15" name="useLSCTranslator" aria-labelledby="label_use_lsc" role="listbox" aria-required="true">
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
                                            <div class="form-group" role="group" aria-labelledby="label_use_sn">
                                <label for="useStructuralNav" id="label_use_sn"><?php echo $this->lang->line('use_struc_nav'); ?></label>
                                <select id="useStructuralNav" class="form-control input-sm m-bot15" name="useStructuralNav" aria-labelledby="label_use_sn" role="listbox" aria-required="true">
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
                            <div class="form-group" role="group" aria-labelledby="label_use_kb">
                                <label for="useKeyboard" id="label_use_kb"><?php echo $this->lang->line('use_virtual_keyboard'); ?></label>
                                <select id="useKeyboard" class="form-control input-sm m-bot15" name="useKeyboard" aria-labelledby="label_use_kb" role="listbox" aria-required="true">
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


                                            <button id="sub" type="submit" class="btn btn-info"><?php echo $this->lang->line('update_my_data'); ?></button>
                                            <a class="btn btn-secondary pull-right" href="<?php echo base_url()?>usuario/perfil">
                                                <i class="fa fa-reply"> </i><?php echo $this->lang->line('return'); ?>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



<!--main content end-->

<!-- Modal chpassword -->
<div class="modal fade" id="dialog_chpasswd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" aria-label="Dialogo para actualización de contraseña">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" >
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel"><?php echo $this->lang->line('update_password'); ?></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body" id="dialog_chpassword_view">
            </div>
            <!--<div class="modal-footer">
                <button data-dismiss="modal" id="cancelar" class="btn btn-warning" type="button">Cancelar</button>
                <button data-dismiss="modal" id="aceptar" class="btn btn-success" type="button">Aceptar</button>
            </div>-->
        </div>
    </div>
</div>
<!-- modal -->
<!--script for this page-->
<script type="text/javascript">
    let selectedOptInterfaz = "<?php echo $selectedOptInterfaz;?>";
    let selectedOptNarrator = "<?php echo $selectedOptNarrator;?>";
    let selectedOptScreenReader = "<?php echo $selectedOptScreenReader;?>";
    let selectedOptLSCTranslator= "<?php echo $selectedOptLSCTranslator;?>";
    let selectedOptStructuralNav =  "<?php echo $selectedOptStructuralNav;?>";
    let selectedOptKeyboard =  "<?php echo $selectedOptKeyboard;?>";

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

    $('#dialog_chpasswd').on('shown.bs.modal', function () {
      $('#psswd_now').trigger('focus')
    })
    $(document).keypress(function(e) {
        console.log("swssw")
        if ($("#dialog_chpasswd").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
            if(!$('#form').is(':visible')){
                $("#verificar").click();
            } else {
                $('#update').click();
            }

        }
    });
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
    $("#form-update-info-user").validate({
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
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('need_name'); ?>.</div>",
                minlength: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('min_length_name'); ?>.</div>"
            },
            apellidos: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('need_last_name'); ?>.</div>",
                minlength: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong>  <?php echo $this->lang->line('min_length_last_name'); ?>.</div>"
            },
            fecha_nac: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('need_birthdate'); ?>.</div>",
                dateISO: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('invalid_birthdate'); ?>.</div>",
                range_date: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('invalid_birthdate_range'); ?>.</div>"
            },
            mail: {
                required: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('need_email'); ?>.</div>",
                email_regex: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('invalid_email'); ?>.</div>",
                remote: "<br><div id='in_use1' aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><strong>¡<?php echo $this->lang->line('sorry'); ?>!</strong> <?php echo $this->lang->line('use_email'); ?>.</div>"
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

    $('#useAdaptInterfaz').val(selectedOptInterfaz);
    $('#useSr').val(selectedOptScreenReader);
    $('#useNarrator').val(selectedOptNarrator);
    $('#useLSCTranslator').val(selectedOptLSCTranslator);
    $('#useStructuralNav').val(selectedOptStructuralNav);
    $('#useKeyboard').val(selectedOptKeyboard);
</script>
