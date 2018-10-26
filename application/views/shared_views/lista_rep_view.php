<div class="content-inner">
        <div class="container-fluid">
<!--main content start-->
    <br/>
        <div class="card border-0">
                <h1> <?php echo $this->lang->line('message_repositories'); ?> FROAC</h1>
            <div class="card-body">
                <div class="row">
                    <?php
                    $i = 0;
                    foreach ($repos as $key) {
                        $i+=1;
                        ?>
                        <div class="col-lg-4">
                            <!--widget start-->

                                <div class="card">
                                    <div class="card-header" style="padding:30px; background:#10520E; color:white;">
                                        <h2 id="<?php echo preg_replace('/\s+/', '', $key['rep_name'])?>"><?php echo $key['rep_name'] ?></h2>
                                        <p><?php echo $key['rep_affiliation'] ?></p>
                                    </div>
                                    <div class="card-body info-repo">
                                        <ul class="list-group list-group-flush repo">
                                            <li class="list-group-item"><a class="nav-link" aria-labelledby="<?php echo preg_replace('/\s+/', '', $key['rep_name'])?>" href="<?php echo $key['rep_url'] ?>" target="blank"> <i class="fa fa-cloud"></i> <?php echo $this->lang->line('see_repo_site'); ?></a></li>
                                            <li class="list-group-item"><a class="nav-link" href="javascript:;"> <i class="fa fa-file"></i> <?php echo $this->lang->line('standard'); ?>: <strong><?php echo $key['rep_metadata_inf'] ?></strong> </a></li>
                                            <li class="list-group-item"><a class="nav-link" aria-label="Objetos de este repositorio" href="<?php echo base_url()?>repositorio/lo_rep/<?php echo $key['rep_id'] ?>"> <i class="fa fa-list-ol"></i> <?php echo $this->lang->line('objects_amount'); ?> <span class="badge badge-pill badge-info pull-right"><?php echo $key['rep_countoas']?></span></a></li>
                                            <li class="list-group-item"><a class="nav-link" href="javascript:;"> <i class="fa fa-calendar"></i> <?php echo $this->lang->line('last_update'); ?>: <strong><?php echo $key['rep_lastupdate']?></strong> </a></li>
                                            <?php
                                            $session_data = $this->session->userdata('logged_in');
                                                if ($this->session->userdata('logged_in'))
                                                {
                                                    if ($session_data ['username'] == "admin")
                                                    {?>
                                                        <li><a href="<?php echo base_url()?>repositorio/modificar_repo/<?php echo $key['rep_id'] ?>"> <i class="icon-file-text-alt"></i><?php echo $this->lang->line('modified'); ?> </span></a></li>
                                                        <!-- el action  se le cambio la direccion para que actualizara-->
                                                        <form autocomplete="off" action="<?php echo base_url() ?>index.php/repositorio/actualizar_oas/" method="post" enctype="multipart/form-data">                                                        <input type="hidden" id="idrepository" name="idrepository" value="<?php echo $key['rep_id']; ?>" />
                                                            <input type="hidden" id="lastupdate" name="lastupdate" value="<?php echo $key['rep_lastupdate']; ?>" />
                                                            <input type="hidden" id="cadenaoai" name="cadenaoai" value="<?php echo $key['rep_host']; ?>" />
                                                            <input type="hidden" id="metadata" name="metadata" value="<?php echo $key['rep_metadata_inf']; ?>" />
                                                            <?php if($key['rep_typerepository']!='roap'){?>

                                                                <div  id="actualizaroa<?php echo $i; ?>">
                                                                <br>
                                                                <input type="radio" id="actualizar<?php echo $i; ?>" name="actualizar" value="1" checked="TRUE"/><?php echo $this->lang->line('all'); ?><br/> <br/>
                                                                <input type="radio" id="actualizar<?php echo $i; ?>" name="actualizar" value="2"/><?php echo $this->lang->line('from'); ?>: <?php echo $key['rep_lastupdate'] ?> <br/><br/>
                                                                <input type="radio" id="actualizar<?php echo $i; ?>" name="actualizar" value="3"/><?php echo $this->lang->line('date_ranges'); ?>:<br/><br/>
                                                                <!-- SE CAMBIO EL TIPO DE TECT A DATE -->
                                                                <?php echo $this->lang->line('start'); ?>:<input class="form-control" id="fechainicio"type="date"  value="" name="fechainicio" /><br/><br/>
                                                                <!-- SE CAMBIO EL TIPO DE TECT A DATE -->
                                                                <?php echo $this->lang->line('end'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;<input class="form-control" id="fechafin" type="date" value="" name="fechafin" />
                                                                <br/>
                                                                <!-- SE ELIMINO LA ETIQUETA DE IMAGEN PARA EL  BOTON Y SE LE AGREGO ACTUALIZAR -->
                                                                <button input class="btn btn-info pull-right r-activity" id="refreshbu" width="16px"  height="16px"
                                                                type="submit" value="Guardar" class="alt_btn"><?php echo $this->lang->line('update_button'); ?></button>

                                                                </div>
                                                        <?php }?>

                                                        </form>
                                                        </li>

                                                     <?php
                                                    }
                                                }?>
                                        </ul>
                                    </div>

                                </div>
                            <!--widget end-->
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
</div>

<!--main content end-->
