<section id="main-content" role="main">
    <section class="wrapper">
        <br>
        <section class="panel">
            <header class="panel-heading">
                <?php echo base64_decode($lo_name);?></b>
            </header>
            <div class="panel-body">
                <div class="row">

                    <!-- Esto es una prueba de vizualización de el objeto -->
                    <center id="location_lo">
                        <iframe id="oa" src="" style="aling:center; border:hidden;" width="90%" height="600em"></iframe>
                        -->

                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
                        <script type="text/javascript">
                            let url = "<?php echo base64_decode($url); ?>";
                            let lo_name = "<?php echo base64_decode($lo_name); ?>";
                            let path = "<?php echo base_url()?>"
                            let iframe_oa = document.getElementById("oa");
                        </script>
                        <script type='text/javascript'>
                            console.log("desde afuera");
                            $(document).ready(function () {
                                console.log("LOOOOL");
                                let formData = new FormData();
                                formData.append("url", url);
                                formData.append("name", lo_name);
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
                                    }
                                })
                            });
                        </script>
                    </center>

                </div>
            </div>
        </section>
        <div class="row" id="result">

        </div>
    </section>
</section>
