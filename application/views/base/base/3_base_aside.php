<div class="page-content d-flex align-items-stretch">
    <!-- Side Navbar -->
        <nav class="side-navbar">
          <!-- Sidebar Header-->
          <div class="sidebar-header d-flex align-items-center">

          </div>
          <ul class="list-unstyled">
                    <li id="searchOA"><a  href="<?php echo base_url()?>"> <i class="fa fa-search"></i>Buscador</a></li>
                    <?php if(!$this->session->userdata('logged_in')):?>
                          <li id="create-account"><a  href="<?php echo base_url()?>usuario/registro"> <i class="fa fa-user"></i>Crear una cuenta </a></li>
                    <?php endif; ?>
                    <li id="repos"><a  href="<?php echo base_url()?>repositorio/lista"> <i class="fa fa-sitemap"></i>Repositorios</a></li>
                    <li id="teamFROAC"><a  href="<?php echo base_url()?>usuario/equipo"> <i class="fa fa-users"></i>Equipo FROAC </a></li>
                    <li id="aboutFROAC"><a  href="<?php echo base_url()?>usuario/acerca"> <i class="fa fa-info-circle"></i>Acerca de</a></li>
                    <li id="glossary"><a  href="<?php echo base_url()?>usuario/glosario"> <i class="fa fa-book"></i>Glosario</a></li>
                    <li><a href="http://froac.manizales.unal.edu.co/GAIA/"> <i class="fa fa-globe"></i>GAIA</a></li>
            </ul>

        </nav>
