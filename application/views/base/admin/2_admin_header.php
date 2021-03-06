<header id="unalTop" role="navigation" aria-label="Barra de navegación Universidad Nacional de Colombia">


    <div class="logo">
        <a href="http://unal.edu.co">
            <img alt="Escudo de la Universidad Nacional de Colombia" src="<?php echo base_url()?>asset/img/escudoUnal.png" width="150" />
        </a>
        <div class="diag">

        </div>
    </div>
    <div class="seal">
    <select class="selectpicker" data-width="105px" onchange="javascript:window.location.href='<?php echo base_url(); ?>LanguageSwitcher/switchLang/'+this.value;">
    <option data-content='<span class="flag-icon flag-icon-co"></span> Español' value="spanish" <?php if($this->session->userdata('site_lang') == 'spanish') echo 'selected="selected"'; ?>>Español</option>
    <option data-content='<span class="flag-icon flag-icon-us"></span> Inglés' value="english" <?php if($this->session->userdata('site_lang') == 'english') echo 'selected="selected"'; ?>>Inglés</option>
    <option data-content='<span class="flag-icon flag-icon-br"></span> Portugués' value="portuguese" <?php if($this->session->userdata('site_lang') == 'portuguese') echo 'selected="selected"'; ?>>Portugués</option>
       
</select>
        <img alt="Escudo de la República de Colombia" src="<?php echo base_url()?>asset/img/sealColombia.png" width="66" height="66" />
    </div>

    <div class="firstMenu">
    
        <?php if(!($this->session->userdata('logged_in')) || $this->session->userdata('need_screen_reader') || $this->session->userdata('need_custom_interfaz') || $this->session->userdata('need_narrator')  || $this->session->userdata('need_lsc_translator') || $this->session->userdata('need_structural_nav') || $this->session->userdata('need_virtual_keyboard')):?>

        <ul class="socialLinks">
            <li>
                    <a class="btn btn-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><?php echo $this->lang->line('accessibility'); ?> </a>
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
            <?php echo $this->lang->line('signin'); ?> 
            </a>
        </li>
        <?php else : ?>
        <?php foreach ($usr_data as $usr){} ?>

        <li class="nav-item dropdown">
            <button class="btn btn-outline-dark btn-lg dropdown-toggle" id="navbarDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <?php echo $usr['use_nombre'] ?></button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="<?php echo base_url()?>usuario/perfil"><?php echo $this->lang->line('profile'); ?> </a>
                <a onclick="localStorage.clear();" class="dropdown-item" href="<?php echo base_url()?>sesion/logout"><?php echo $this->lang->line('signout'); ?> </a>
            </div>
        </li>

        <?php endif; ?>
    </ul>



</nav>
