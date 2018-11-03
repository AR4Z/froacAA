<div class="content-inner" role="main">
    <section>
        <div class="container-fluid">
            <div class="card border-0">
                <h1 id="name-lo">
                    <?php echo base64_decode($lo_name)?>
                    </b>
                </h1>

                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="col embed-responsive embed-responsive-21by9" id="div-lo">
                                <iframe id="oa" title="<?php echo base64_decode($lo_name);?>" aria-label="Objeto de aprendizaje" class="embed-responsive-item"
                                    src=""></iframe>
                            </div>
                            <div id="loading">
                                <div class="row mt-2">
                                    <div class="col-6 mx-auto d-flex justify-content-center flex-wrap">
                                        <img alt="Logo FROAC" src="<?php echo base_url()?>asset/img/frog1.png" width="50" height="70" />
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 mx-auto text-center">
                                        <img alt="Cargando objeto de aprendizaje" src="<?php echo base_url()?>asset/img/ajax-loader.gif" width="250" height="30"
                                        />
                                        <p>Esto puede tardar algunos minutos...</p>
                                    </div>
                                </div>
                            </div>
                            
                            </div>
                        <!-- Esto es una prueba de vizualización de el objeto -->
                    </div>
                    <div id="error" class="jumbotron jumbotron-fluid">
                                <div class="container">
                                    <h1 class="display-4">¡Error!</h1>
                                    <p class="lead">Al parecer el objeto ya no existe :(</p>
                                    <hr class="my-4">
                                    <a class="btn btn-success btn-lg" href="<?php echo base_url()?>" role="button">
                                    Volver a buscar
                                    <i class="fa fa-undo" ></i>
                                    </a>
                                 </div>
                            </div>
                </div>
                
            </div>
        </div>
    </section>


    <script type="text/javascript">
        let url = "<?php echo base64_decode($url); ?>";
        let lo_name = "<?php echo base64_decode($lo_name); ?>";
        let path = "<?php echo base_url()?>"
        let iframe_oa = document.getElementById("oa");
        let dataj;

        $(document).ready(function () {
            let formData = new FormData();
            formData.append("url", url);
            formData.append("name", lo_name);
            $('#div-lo').hide();
            $('#error').hide();
            $('#loading').show();
            $.ajax({
                url: "<?php echo base_url()?>lo/getLO/",
                type: "post",
                dataType: "json",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                async: true,
                success: function (data) {
                    console.log(data);
                    dataj = data;
                    let dataJSON = JSON.parse(data);
                    if (dataJSON.path_lo == '404') {
                        $('#loading').fadeOut(50);
                        $('#name-lo').fadeOut(50);
                        $('#error').fadeIn(600);
                    } else {
                        iframe_oa.src = path + "LOs/" + dataJSON.path_lo+'?time='+Date.now();
                        $('#loading').fadeOut(50);
                        $('#div-lo').fadeIn(600);
                    }
                },
                error: function (data){
                    console.log(data);
                    
                }
            })

            $.ajax({
                url: "<?php echo base_url()?>lo/getLanguage/",
                type: "post",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                async: true,
                success: function (data) {
                    let dataJSON = JSON.parse(data);
                    languages = {
                        en:'english',
                        es:'spanish',
                        pt:'portuguese'
                    }
                    console.log(dataJSON['language'])
                    loLang = languages[dataJSON['language']];
                },
                error: function (data){
                    console.log(data);
                    
                },
            })
        });
    </script>