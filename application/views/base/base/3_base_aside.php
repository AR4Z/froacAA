<div id="sidebar" class="nav-collapse" role="navigation" aria-label="Barra de navegación FROAC">
    <!-- sidebar menu start-->
    <ul class="sidebar-menu" id="nav-accordion">

        <?php if($usr_data == null) : ?>
        <li>
            <a href="<?php echo base_url()?>usuario/registro">
                <i class="icon-user"></i>
                <span>Crear una cuenta</span>
            </a>
        </li>
        <?php endif; ?>

        <li>
            <a href="<?php echo base_url()?>">
                <i class="icon-search"></i>
                <span>Buscador</span>
            </a>
        </li>

        <li>
            <a href="<?php echo base_url()?>repositorio/lista">
                <i class="icon-sitemap"></i>
                <span>Repositorios</span>
            </a>
        </li>



        <!--   <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="icon-cogs"></i>
                    <span>Aplicaciones</span>
                </a>

            </li>

            <li>
                <a href="javascript:;" >
                    <i class="icon-comment"></i>
                    <span>Blog</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" >
                    <i class="icon-rss"></i>
                    <span>Noticias</span>
                </a>
            </li>-->
        <li>
            <a href="<?php echo base_url()?>usuario/equipo">
                <i class="icon-info"></i>
                <span>Equipo FROAC</span>
            </a>
        </li>
        <li>
            <a href="<?php echo base_url()?>usuario/acerca">
                <i class="icon-info"></i>
                <span>Acerca de</span>
            </a>
        </li>
        <li>
            <a href="<?php echo base_url()?>usuario/glosario">
                <i class="icon-info"></i>
                <span>Glosario</span>
            </a>
        </li>
        <li>
            <a href="http://froac.manizales.unal.edu.co/GAIA/">
                <i class="icon-info"></i>
                <span>GAIA</span>
            </a>
        </li>
    </ul>
    <!-- sidebar menu end-->
</div>
