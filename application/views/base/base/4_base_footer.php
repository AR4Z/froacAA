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
<script src="<?php echo base_url()?>asset/js/bootstrap-notify.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/common-scripts.js"></script>
<script src="<?php echo base_url() ?>asset/js/lining.js"></script>
<script src="<?php echo base_url() ?>asset/js/button.js"></script>
<script src="<?php echo base_url() ?>asset/js/bootstrap-select.min.js"></script>


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
    <script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>
    <script src="<?php echo base_url()?>asset/js/screenReader.js"></script>
<?php endif;?>

<?php if($this->session->userdata('needLSCTranslator') || !($this->session->userdata('logged_in'))):?>
    <script src="<?php echo base_url() ?>asset/js/jquery-ui.min.js"></script>
    <script src="<?php echo base_url() ?>asset/js/written-number.min.js"></script>
    <script src="<?php echo base_url() ?>asset/js/canvid.js"></script>
    <script src="<?php echo base_url() ?>asset/js/traductor-LSC.js"></script>
<?php endif;?>

<?php if($this->session->userdata('needStructuralNav') || !($this->session->userdata('logged_in'))):?>
    <script src="<?php echo base_url() ?>asset/js/jquery-ui.min.js"></script>
    <script src="<?php echo base_url() ?>asset/js/structuralNavigation.js"></script>
<?php endif;?>

<?php if($this->session->userdata('needKeyboard') || !($this->session->userdata('logged_in'))):?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.28.7/js/jquery.keyboard.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.28.7/languages/es.min.js"></script>
    <script src="<?php echo base_url()?>asset/js/keyboard.js"></script>
<?php endif;?>

<script src="<?php echo base_url()?>asset/js/voiceBrowser.js"></script>
<script src="<?php echo base_url()?>asset/js/loadAccessibilityBar.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/speechkitt.min.js"></script>
<!--
<script>
if (annyang) {
  // Add our commands to annyang
  
  annyang.setLanguage('es-CO');
  annyang.addCommands({
    'Ir a *linkName': irA,
    'enviar': function() { alert('Hello world!'); },
    'clic en botón enviar': function() { alert('Hello world!'); },
    
  });
  annyang.debug();

  
  annyang.start({ continuous: false });
  function irA(linkName){

  }
  // Tell KITT to use annyang
  /*SpeechKITT.annyang();

  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();*/
  
}
</script>-->
</body>
</html>
