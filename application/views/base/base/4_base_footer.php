



      <!--footer start-->
        <footer class="container" role="complementary" aria-label="Pie de página">
        <center>
        <div>
            <a rel="nofollow" href="http://www.tawdis.net" title="Análisis de la accesibilidad de la página con TAW"><img style="border: 0; width: 60px; height: 31px;margin-left: 185px" src="<?php echo base_url()?>asset/img/taw.png" alt="TAW. Nivel doble A. WCAG 1.0 WAI"></a>
            <a href="http://www.w3.org/WAI/WCAG1AA-Conformance"
                title="Explicación del Nivel Doble-A de
                Conformidad">
                <img height="32" style="margin-left:20px;" width="88"
                src="http://www.w3.org/WAI/wcag1AA-blue"
                alt="Icono de conformidad con el Nivel Doble-A,
                de las Directrices de Accesibilidad para el
                Contenido Web 1.0 del W3C-WAI"></a>
        </div>
    </center>
    </footer>
      <!--footer end-->
  </section>

    <!-- js placed at the end of the document so the pages load faster -->

    <script src="<?php echo base_url() ?>asset/js/modifyStyle.js"></script>
    <script src="<?php echo base_url() ?>asset/js/popper.js"></script>
    <script src="<?php echo base_url()?>asset/js/bootstrap.min.js"></script>

    <script class="include" type="text/javascript" src="<?php echo base_url()?>asset/js/jquery.dcjqaccordion.2.7.js"></script>
    <script src="<?php echo base_url()?>asset/js/jquery.sparkline.js" type="text/javascript"></script>
    <script src="<?php echo base_url()?>asset/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js"></script>
    <script src="<?php echo base_url()?>asset/js/owl.carousel.js" ></script>
    <script src="<?php echo base_url()?>asset/js/jquery.customSelect.min.js" ></script>
    <script src="<?php echo base_url()?>asset/js/respond.min.js" ></script>
    <script class="include" type="text/javascript" src="<?php echo base_url()?>asset/js/jquery.dcjqaccordion.2.7.js"></script>
    <!--common script for all pages-->
    <script src="<?php echo base_url()?>asset/js/common-scripts.js"></script>
    <script src="<?php echo base_url()?>asset/js/artyom.js"></script>
    <script src="<?php echo base_url()?>asset/js/screenReader.js"></script>

    <!--script for this page-->
    <script src="<?php echo base_url()?>asset/js/sparkline-chart.js"></script>
    <script src="<?php echo base_url()?>asset/js/easy-pie-chart.js"></script>
    <script src="<?php echo base_url()?>asset/js/count.js"></script>

  <script>

      //owl carousel

      $(document).ready(function() {
          $("#owl-demo").owlCarousel({
              navigation : true,
              slideSpeed : 300,
              paginationSpeed : 400,
              singleItem : true,
			  autoPlay:true

          });
      });

      //custom select box

      $(function(){
          $('select.styled').customSelect();
      });

  </script>

  </body>
</html>
