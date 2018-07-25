<div class="collapse container-fluid" id="collapseExample">
    <ul class="nav nav-tabs" id="accessibilityTab" role="tablist">

        <?php if( $this->session->userdata('adaptaInterfaz') || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="interfaz-tab" data-toggle="tab" href="#interfaz" role="tab" aria-controls="interfaz" aria-selected='false'>Interfaz</a>
        </li>
        <?php endif?>
        <?php if($this->session->userdata('needNarrator') || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="narrator-tab" data-toggle="tab" href="#narrator" role="tab" aria-controls="narrador" aria-selected="false">Narrador</a>
        </li>
        <?php endif?>
        <?php if($this->session->userdata('needSr') || !($this->session->userdata('logged_in'))):?>
        <li class="nav-item">
            <a class="nav-link" id="screen-reader-tab" data-toggle="tab" href="#screen-reader" role="tab" aria-controls="Lector de pantalla" aria-selected="false">Lector de pantalla</a>
        </li>
        <?php endif?>
        <?php if(!($this->session->userdata('logged_in')) || $this->session->userdata('needSr') ||  $this->session->userdata('needNarrator') ||  $this->session->userdata('adaptaInterfaz')):?>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Restablecer valores</a>
            <div class="dropdown-menu">
                <?php if( $this->session->userdata('adaptaInterfaz') || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="setDefaultValuesInterfaz()" href="#">Interfaz</a>
                <?php endif?>
                <?php if($this->session->userdata('needNarrator') || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="setDefaultValuesNarrator()" href="#">Narrador</a>
                <?php endif?>
                <?php if($this->session->userdata('needSr') || !($this->session->userdata('logged_in'))):?>
                <a class="dropdown-item" onclick="setDefaultValuesSr()" href="#">Lector de pantalla</a>
                <?php endif?>
                <div class="dropdown-divider"></div>

                <a class="dropdown-item" id="reset-all" onclick="setDefaultAllValues()" href="#">Todos</a>
            </div>
        </li>
    <?php endif;?>
    </ul>
    <div class="tab-content" id="myTabContent">
        <br>
        <?php if( $this->session->userdata('adaptaInterfaz') || !($this->session->userdata('logged_in'))):?>
        <?php $this->load->view('base/base/accessibility/interfaz');?>
        <?php endif?>
        <?php if($this->session->userdata('needNarrator') || !($this->session->userdata('logged_in'))):?>
        <?php $this->load->view('base/base/accessibility/narrator');?>
        <?php endif?>
        <?php if($this->session->userdata('needSr') || !($this->session->userdata('logged_in'))):?>
        <?php $this->load->view('base/base/accessibility/screen_reader');?>
        <?php endif?>

    </div>
    <br/>
</div>
