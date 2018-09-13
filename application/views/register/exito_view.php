<!--main content start-->
<script type="text/javascript">
    $(document).ready(function () {
        //$('#pass').hide();
        //$('#2').hide();
        $('#1').click(function () {
            window.location = "<?php echo base_url()?>login";
        });

    });
</script>
<div class="content-inner" role='main'>
    <section>
        <div class="container-fluid">
            <div class="card border-0">
                <h1>¡Registro exitoso!</h1>
                <div class="card-body">
                    <h4>Bienvenido a FROAC,
                        <?php echo $name?>
                    </h4>
                    <br>
                    <form autocomplete="off" action="<?php echo base_url()?>index.php/sesion" method="post" name="login" id="form-login">
                        <h5>Si desea iniciar su sesión digite su contraseña:</h5>
                        <input id="username" type="hidden" name="username" alt="username" size="18" value="<?php echo $username ?>" aria-hidden="true"
                        />
                        <label id="pass">Contraseña:
                            <input type="password" name="password" id="passwd" alt="username" placeholder="Contraseña"
                                aria-labelledby="pass" autofocus/>
                        </label>
                        <input type="submit" value="Iniciar sesión" class="btn btn-info" id="2">
                    </form>
                    <br>
                    <a href="<?php echo base_url() ?>">
                        <input type="button" value="No, tal vez mas tarde" class="btn btn-info">
                    </a>

                    <?php if($this->session->userdata('logged_in')){$sess = 1; $usr = $user;}else{ $sess = 0; $usr=0;} ?>
                </div>

            </div>

        </div>
    </section>



    <script type="text/javascript">
        /*
        $('#form-login').submit(function(event) {

            let dataInterfaz ={};
            let dataSr = {};
            let dataNarrator = {};
            let needInterfaznw = "<?php echo $needPrefInterfaz?>" || false;
            let needNarratornw = "<?php echo $needNarrator?>" || false;
            let needSrnw = "<?php echo $needSr?>" || false;
            let dataPreferences = {};
            if(needInterfaznw){
                dataInterfaz = {
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
                dataPreferences['needInterfaz'] = needInterfaznw;
                dataPreferences['dataInterfaz'] = dataInterfaz;
            }
            if(needNarratornw){
                dataNarrator = {
                    'speed_reading':localStorage['speed_reading_nr'],
                    'pitch_id':localStorage['pitch_id_nr'],
                    'volume_id': localStorage['volume_id_nr'],
                    'voice_gender_id':localStorage['voice_gender_id_nr'],
                    'links_id':localStorage['links_id_nr'],
                    'highlight_id':localStorage['highlight_id_nr'],
                    'reading_unit_id':localStorage['reading_unit_id_nr'],
                }
                dataPreferences['needNarrator'] = needNarratornw;
                dataPreferences['dataNarrator'] = dataNarrator;
            }

            if(needSrnw){
                dataSr = {
                    'speed_reading':localStorage['speed_reading_sr'],
                    'pitch_id':localStorage['pitch_id_sr'],
                    'volume_id':localStorage['volume_id_sr'],
                    'voice_gender_id':localStorage['voice_gender_id_sr'],
                    'links_id':localStorage['links_id_sr'],
                }
                dataPreferences['needSr'] = needSrnw;
                dataPreferences['dataSr'] = dataSr;
            }
            dataPreferences['username'] = "<?php echo $username ?>";
            $.ajax({
                url : base_url + "usuario/update_preferences_new_user",
                type : "POST",
                data : dataPreferences,
                async:false,
                success : function(data) {
                    console.log(data);
                    $('#form-login').attr('action', "<?php echo base_url()?>index.php/sesion");

                    $('#form-login')[0].submit();
                },
                error : function(data) {
                    console.log(data);
                }
            });
        });*/
    </script>
