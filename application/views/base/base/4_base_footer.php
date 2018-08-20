<?php if(!($id_view == 'login')) : ?>
<footer class="main-footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col text-center">
                <p><a rel="nofollow" href="http://www.tawdis.net" title="Análisis de la accesibilidad de la página con TAW"><img style="border: 0; width: 60px; height: 31px;" src="<?php echo base_url()?>asset/img/taw.png" alt="TAW. Nivel doble A. WCAG 1.0 WAI"></a>
                    <a href="http://www.w3.org/WAI/WCAG1AA-Conformance" title="Explicación del Nivel Doble-A de
                          Conformidad"><img height="32" width="88" src="http://www.w3.org/WAI/wcag1AA-blue" alt="Icono de conformidad con el Nivel Doble-A,
                            de las Directrices de Accesibilidad para el
                            Contenido Web 1.0 del W3C-WAI"></a></p>
            </div>
        </div>
    </div>
</footer>
</div>
</div>
</div>
<?php endif;?>

<!-- js placed at the end of the document so the pages load faster -->
<script src="<?php echo base_url() ?>asset/js/popper.js"></script>
<script src="<?php echo base_url()?>asset/js/bootstrap.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/common-scripts.js"></script>
<script src="<?php echo base_url() ?>asset/js/lining.js"></script>

<?php if($this->session->userdata('needNarrator') || !($this->session->userdata('logged_in'))):?>
<script src="<?php echo base_url()?>asset/js/jquery.blast.min.js"></script>
<script src="<?php echo base_url()?>asset/js/howler.min.js"></script>
<script src="<?php echo base_url()?>asset/js/narrator.js"></script>
<?php endif;?>

<?php if($this->session->userdata('adaptaInterfaz') || !($this->session->userdata('logged_in'))):?>
<script src="<?php echo base_url() ?>asset/js/jquery.awesome-cursor.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/bootstrap-colorpicker.js"></script>
<script src="<?php echo base_url() ?>asset/js/modifyStyle.js"></script>
<?php endif;?>

<?php if($this->session->userdata('needSr') || !($this->session->userdata('logged_in'))):?>
    <script src="<?php echo base_url()?>asset/js/artyom.js"></script>
    <script src="<?php echo base_url()?>asset/js/screenReader.js"></script>
<?php endif;?>
<script src="<?php echo base_url()?>asset/js/loadAccessibilityBar.js"></script>
</body>
</html>
