<div class="content-inner" role="main">
    <section>
        <div class="container-fluid">
            <div class="card border-0">
                <h1>
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
                                    <div class="col-6 mx-auto d-flex justify-content-center flex-wrap">
                                        <img alt="Cargando objeto de aprendizaje" src="<?php echo base_url()?>asset/img/ajax-loader.gif" width="250" height="30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Esto es una prueba de vizualización de el objeto -->
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


        console.log("desde afuera");
        $(document).ready(function () {
            console.log("LOOOOL");
            let formData = new FormData();
            formData.append("url", url);
            formData.append("name", lo_name);
            $('#div-lo').hide();
            $('#loading').show();
            $.ajax({
                url: "http://127.0.0.1:5000/downloadLO/",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data);
                    let dataJSON = JSON.parse(data);
                    iframe_oa.src = path + "LOs/" + dataJSON.path_lo;
                    $('#loading').fadeOut(50);
                    $('#div-lo').fadeIn(600);

                }
            })
        });
    </script>