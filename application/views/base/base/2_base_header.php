<div class="page">
<header id="unalTop" role="navigation" aria-label="Barra de navegación Universidad Nacional de Colombia">


    <div class="logo">
        <a href="http://unal.edu.co">
            <img alt="Escudo de la Universidad Nacional de Colombia" src="<?php echo base_url()?>asset/img/escudoUnal.png" width="150" />
        </a>
        <div class="diag">

        </div>
    </div>
    <div class="seal">

        <img alt="Escudo de la República de Colombia" src="<?php echo base_url()?>asset/img/sealColombia.png" width="66" height="66" />
    </div>

    <div class="firstMenu">
        <?php if(!($this->session->userdata('logged_in')) || $this->session->userdata('needSr') || $this->session->userdata('adaptaInterfaz') || $this->session->userdata('needNarrator')):?>

        <ul class="socialLinks">
            <li>
                    <a class="btn btn-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">ACCESIBILIDAD</a>
            </li>
        </ul>
        <?php endif;?>
    </div>

    <div class="navigation">

    </div>


</header>
<nav class="navbar navbar-static-top navbar-expand-lg navbar-light bg-light">
    <a id="toggle-btn" href="#" class="menu-btn active"><i class="fa fa-bars" style="font-size: 2rem; color:black;"></i></a>
    <a class="navbar-brand" href="<?php echo base_url()?>"><span style="color:#039700; font-size: 2.167rem;  margin-left: 15px;">FROAC</span></a>
    <ul class="nav navbar-nav ml-auto">
        <?php if(!$this->session->userdata('logged_in')): ?>
        <li class="nav-item">
            <a class="btn btn-outline-dark btn-lg" href="<?php echo base_url()?>login" role="button">
                Iniciar sesión
            </a>
        </li>
        <?php else : ?>
        <?php foreach ($usr_data as $usr){} ?>

        <li class="nav-item dropdown">
            <button class="btn btn-outline-dark btn-lg dropdown-toggle" id="navbarDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <?php echo $usr['use_nombre'] ?></button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="<?php echo base_url()?>usuario/perfil">Perfil</a>
                <a onclick="localStorage.clear();" class="dropdown-item" href="<?php echo base_url()?>sesion/logout">Cerrar Sesión</a>
            </div>
        </li>

        <?php endif; ?>
    </ul>



</nav>
