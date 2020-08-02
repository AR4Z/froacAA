<div class="collapse container-fluid" id="accessibilityBar" aria-label="Barra de accesibilidad">
    <ul class="nav nav-tabs" id="accessibilityTab" role="tablist">

        <?php if( $this->session->userdata('need_custom_interfaz') || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="interfaz-tab" data-toggle="tab" href="#interfaz" role="tab" aria-controls="<?php echo $this->lang->line('interface'); ?>" aria-selected='false'><?php echo $this->lang->line('interface'); ?></a>
        </li>
        <?php endif?>
        <?php if($this->session->userdata('need_narrator') || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="narrator-tab" data-toggle="tab" href="#narrator" role="tab" aria-controls="<?php echo $this->lang->line('narrator'); ?>" aria-selected="false"><?php echo $this->lang->line('narrator'); ?></a>
        </li>
        <?php endif?>
        <?php if(($this->session->userdata('need_screen_reader') && !$this->session->userdata('use_external_sr')) || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="screen-reader-tab" data-toggle="tab" href="#screen-reader" role="tab" aria-controls="<?php echo $this->lang->line('screen_reader'); ?>" aria-selected="false"><?php echo $this->lang->line('screen_reader'); ?></a>
        </li>
        <?php endif?>
        <?php if(($this->session->userdata('need_lsc_translator') || !$this->session->userdata('logged_in')) && ($this->session->userdata('site_lang') == 'spanish')):?>        <li class="nav-item">
            <a class="nav-link" id="LSC-translator-tab" data-toggle="tab" href="#LSC-translator" role="tab" aria-controls="<?php echo $this->lang->line('lsc_translator'); ?>" aria-selected="false"><?php echo $this->lang->line('lsc_translator'); ?></a>
        </li>
        <?php endif?>
        <?php if($this->session->userdata('need_structural_nav') || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="structural-navigation-tab" data-toggle="tab" href="#structural-navigation" role="tab" aria-controls="<?php echo $this->lang->line('struc_nav'); ?>" aria-selected="false"><?php echo $this->lang->line('struc_nav'); ?></a>
        </li>
        <?php endif?>
        <?php if(($this->session->userdata('need_virtual_keyboard') && !$this->session->userdata('use_external_sr')) || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="keyboard-tab" data-toggle="tab" href="#keyboard-cf" role="tab" aria-controls="<?php echo $this->lang->line('virtual_keyboard'); ?>" aria-selected="false"><?php echo $this->lang->line('virtual_keyboard'); ?></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="behavior-tab" data-toggle="tab" href="#behavior" role="tab" aria-controls="Comportamiento" aria-selected="false">Comportamiento</a>
        </li>
        <?php endif?>
        <?php if(!($this->session->userdata('logged_in')) || $this->session->userdata('need_screen_reader') ||  $this->session->userdata('need_narrator') ||  $this->session->userdata('need_custom_interfaz') ||  $this->session->userdata('need_lsc_translator') || $this->session->userdata('need_structural_nav') || $this->session->userdata('need_virtual_keyboard')):?>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><?php echo $this->lang->line('reset_values'); ?></a>
            <div class="dropdown-menu">
                <?php if( $this->session->userdata('need_custom_interfaz') || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="accessibilityBar.customInterfaz.setDefaultValues()" href="#"><?php echo $this->lang->line('interface'); ?></a>
                <?php endif?>
                <?php if($this->session->userdata('need_narrator') || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="accessibilityBar.narrator.setDefaultValues()" href="#"><?php echo $this->lang->line('narrator'); ?></a>
                <?php endif?>
                <?php if(($this->session->userdata('need_screen_reader') && !$this->session->userdata('use_external_sr')) || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="accessibilityBar.screenReader.setDefaultValues()" href="#"><?php echo $this->lang->line('screen_reader'); ?></a>
                <?php endif?>
                <?php if(($this->session->userdata('need_lsc_translator') || !$this->session->userdata('logged_in')) && ($this->session->userdata('site_lang') == 'spanish')):?>
                <a class="dropdown-item" onclick="accessibilityBar.lscTranslator.setDefaultValues()" href="#"><?php echo $this->lang->line('lsc_translator'); ?></a>
                <?php endif?>
                <?php if($this->session->userdata('need_structural_nav') || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="accessibilityBar.structuralNavigation.setDefaultValues()" href="#"><?php echo $this->lang->line('struc_nav'); ?></a>
                <?php endif?>
                <?php if(($this->session->userdata('need_virtual_keyboard') && !$this->session->userdata('use_external_vk')) || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="accessibilityBar.virtualKeyboard.setDefaultValues()" href="#"><?php echo $this->lang->line('virtual_keyboard'); ?></a>
                <?php endif?>
                <a class="dropdown-item" onclick="accessibilityBar.behavior.setDefaultValues()" href="#">Comportamiento</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" id="reset-all" onclick="accessibilityBar.setDefaultAllValues()" href="#"><?php echo $this->lang->line('all'); ?></a>
            </div>
        </li>
    <?php endif;?>
    </ul>
    <div class="tab-content" id="myTabContent">
        <br>
        <?php if( $this->session->userdata('need_custom_interfaz') || !($this->session->userdata('logged_in'))):?>
            <?php $this->load->view('base/base/accessibility/interfaz');?>
        <?php endif?>

        <?php if($this->session->userdata('need_narrator') || !($this->session->userdata('logged_in'))):?>
            <?php $this->load->view('base/base/accessibility/narrator');?>
        <?php endif?>
        
        <?php if(($this->session->userdata('need_screen_reader') && !$this->session->userdata('use_external_sr')) || !($this->session->userdata('logged_in'))):?>
            <?php $this->load->view('base/base/accessibility/screen_reader');?>
        <?php endif?>
        
        <?php if(($this->session->userdata('need_lsc_translator') || !$this->session->userdata('logged_in')) && ($this->session->userdata('site_lang') == 'spanish')):?>
            <?php $this->load->view('base/base/accessibility/LSCTranslator');?>
        <?php endif?>

        <?php if($this->session->userdata('need_structural_nav') || !$this->session->userdata('logged_in')):?>
            <?php $this->load->view('base/base/accessibility/structuralNavigation');?>
        <?php endif?>

        <?php if(($this->session->userdata('need_virtual_keyboard') && !$this->session->userdata('use_external_sr')) || !($this->session->userdata('logged_in'))):?>
            <?php $this->load->view('base/base/accessibility/keyboard');?>
        <?php endif?>
        <?php $this->load->view('base/base/accessibility/behavior');?>
    </div>
    <br/>
</div>
