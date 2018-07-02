
<header id="unalTop" role="navigation" aria-label="Barra de navegación Universidad Nacional de Colombia">


<!--
    <div class="flc-prefsEditor-separatedPanel fl-prefsEditor-separatedPanel">

        <div class="flc-slidingPanel-panel flc-prefsEditor-iframe"></div>


        <div class="fl-panelBar">
                <span class="fl-prefsEditor-buttons">
                    <button id="Reset" class="flc-prefsEditor-reset fl-prefsEditor-reset"><span
                            class="fl-icon-undo"></span> Restaurar</button>
                    <button id="show-hide" class="flc-slidingPanel-toggleButton fl-prefsEditor-showHide"> Mostrar/Ocultar</button>
                </span>
        </div>
    </div>
     END markup for Preference Editor -->
    <!--header start-->
    <div class="logo">
        <a href="http://unal.edu.co">
            <img alt="Escudo de la Universidad Nacional de Colombia"
                 src="<?php echo base_url()?>asset/img/escudoUnal.png" width="150"/>
        </a>
        <div class="diag">
        </div>
    </div>
    <div class="seal">
        <img alt="Escudo de la República de Colombia" src="<?php echo base_url()?>asset/img/sealColombia.png" width="66"
             height="66"/>
    </div>

    <div class="firstMenu">
        <ul class="socialLinks">
            <dd><a></a></dd>

        </ul>
    </div>
    <div class="navigation">
        <div>

        </div>
    </div>


</header>
<br>

<div class="header white-bg col-lg-12" role="banner" aria-label="Barra FROAC">


    <div class="sidebar-toggle-box">
        <div data-original-title="Oculta barra lateral" data-placement="right" class="icon-reorder tooltips"></div>
    </div>
    <!--logo start-->
    <a href="<?php echo base_url()?>" class="logo tooltips" data-placement="right"><span>FROAC</span></a>
    <!--logo end-->

    <div class="top-nav">

        <?php if($usr_data == null) : ?>

        <!--search & user info start-->
        <ul class="nav pull-left top-menu">

            <!-- user login dropdown start-->
            <li class="dropdown">
                <a data-toggle="" class="" href="<?php echo base_url()?>login">
                    <span class="username" data-placement="left">Iniciar sesión</span>
                </a>
            </li>
            <!-- user login dropdown end -->
        </ul>
        <?php else : ?>
        <?php foreach ($usr_data as $usr){} ?>
        <!--<ul class="nav pull-right top-menu">

            <li class="dropdown">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#" aria-haspopup="true" aria-expanded="false">
                    <span class="username"><?php echo $usr['use_nombre'] ?></span>
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu extended logout" aria-hidden="true" aria-label="submenu">
                    <div class="log-arrow-up"></div>
                    <li><a tabindex="-1" href="<?php echo base_url()?>usuario/perfil"><i class=" icon-suitcase"></i> Perfil</a></li>

                    <li><a href="<?php echo base_url()?>sesion/logout"><i class="icon-key"></i> Salir</a></li>
                </ul>
            </li>

        </ul>-->
        <div class="dropdown nav pull-right top-menu">
  <button class="btn btn-outline-dark btn-lg  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span><?php echo $usr['use_nombre'] ?></span>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="<?php echo base_url()?>usuario/perfil"><i class=" icon-suitcase"></i> Perfil</a>
    <a class="dropdown-item" href="<?php echo base_url()?>sesion/logout"><i class="icon-key"></i> Salir</a>

  </div>
</div>
        <?php endif; ?>
        <!--search & user info end-->
    </div>

</div>
<!--header end-->
<script>


</script>
