<?php if(!($id_view == 'login')) : ?>
<footer class="main-footer">
  <div class="container-fluid">
    <div class="row">
      <div class="col text-center">
        <p><a rel="nofollow" href="http://www.tawdis.net" title="Análisis de la accesibilidad de la página con TAW"><img
              style="border: 0; width: 60px; height: 31px;" src="<?php echo base_url()?>asset/img/taw.png" alt="TAW. Nivel doble A. WCAG 1.0 WAI"></a>
          <a href="http://www.w3.org/WAI/WCAG1AA-Conformance" title="Explicación del Nivel Doble-A de
                          Conformidad"><img
              height="32" width="88" src="http://www.w3.org/WAI/wcag1AA-blue" alt="Icono de conformidad con el Nivel Doble-A,
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
<script src="<?php echo base_url() ?>asset/js/jquery-ui.min.js"></script>
<script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>
<script src="https://unpkg.com/driver.js/dist/driver.min.js"></script>
<script src="https://unpkg.com/popper.js/dist/umd/popper.min.js"></script>
<script src="<?php echo base_url()?>asset/js/bootstrap-native-v4.js"></script>
<script src="<?php echo base_url()?>asset/js/color.js"></script>
<script src="<?php echo base_url()?>asset/js/bootstrap-notify.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/lining.js"></script>
<script src="<?php echo base_url() ?>asset/js/button.js"></script>


<?php if($this->session->userdata('need_narrator') || !($this->session->userdata('logged_in'))):?>
<script src="<?php echo base_url()?>asset/js/jquery.blast.min.js"></script>
<script src="<?php echo base_url()?>asset/js/narratorObj.js"></script>
<?php endif;?>

<?php if($this->session->userdata('need_custom_interfaz') || !($this->session->userdata('logged_in'))):?>
<script src="<?php echo base_url() ?>asset/js/jquery.awesome-cursor.min.js"></script>
<script src="<?php echo base_url()?>asset/js/jscolor.js"></script>
<script src="<?php echo base_url()?>asset/js/trailDots.js"></script>
<script src="<?php echo base_url()?>asset/js/cursorTrail.js"></script>
<script src="<?php echo base_url()?>asset/js/customInterfaz.js"></script>
<?php endif;?>

<?php if($this->session->userdata('need_screen_reader') || !($this->session->userdata('logged_in'))):?>
<script src="<?php echo base_url()?>asset/js/screenReaderObj.js"></script>
<?php endif;?>

<?php if(($this->session->userdata('need_lsc_translator') || !$this->session->userdata('logged_in')) && ($this->session->userdata('site_lang') == 'spanish')):?>
<script src="<?php echo base_url() ?>asset/js/written-number.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/canvid.js"></script>
<script src="<?php echo base_url() ?>asset/js/dataLscTranslator.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/lscTranslator.js"></script>
<?php endif;?>

<?php if($this->session->userdata('need_structural_nav') || !($this->session->userdata('logged_in'))):?>
<script src="<?php echo base_url() ?>asset/js/structuralNavigationObj.js"></script>
<?php endif;?>

<?php if($this->session->userdata('need_virtual_keyboard') || !($this->session->userdata('logged_in'))):?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.28.7/js/jquery.keyboard.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.28.7/languages/es.min.js"></script>
<script src="<?php echo base_url()?>asset/js/keyboardObj.js"></script>
<?php endif;?>

<script src="<?php echo base_url()?>asset/js/accessibilityBar.js"></script>
<script src="<?php echo base_url() ?>asset/js/lo.js"></script>
<script src="<?php echo base_url() ?>asset/js/common-scripts.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
<script src="<?php echo base_url()?>asset/js/voiceBrowser.js"></script>
<script src="<?php echo base_url()?>asset/js/tour.js"></script>
</body>

</html>