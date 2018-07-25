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
