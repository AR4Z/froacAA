<!--<h1><?php var_dump($usr_all_data)?></h1>
<h2><?php var_dump($usr_data)?>></h2>-->

<?php foreach($usr_all_data as $usr_data){ ?>
      <!--main content start-->

      <div class="content-inner">
          <br/>

          <section>
          <div class="container-fluid">
              <div class="row">
                  <aside class="profile-nav col-lg-3" role="complementary" aria-label="Perfil del usuario">
                      <div class="card">
                          <div class="card-header user-header">
                              <a href="#">
                                  <img src="<?php echo base_url()?>asset/img/user.gif"  class="img-profile-user"alt="">
                              </a>
                              <h1><?php echo $usr_data['use_nombre'].' '.$usr_data['use_apellido']?></h1>
                              <p><?php echo $usr_data['use_email']?></p>
                          </div>
                          <div class="card-body">
                              <ul class="list-group list-group-flush profile-nav">
                                  <li class="list-group-item"><a  href="<?php echo base_url()?>usuario/mis_objetos"> <i class="fa fa-book"></i> Mis objetos</a></li>
                                 <!-- <li><a href="profile-activity.html"> <i class="icon-rss-sign"></i> Noticias <span class="label label-danger pull-right r-activity">9</span></a></li>-->
                                  <li class="list-group-item"><a  href="<?php echo base_url()?>usuario/editar_usr"> <i class="fa fa-pencil"></i> Editar perfil</a></li>
                                  <!--<li><a href="<?php echo base_url()?>usuario/estilos"> <i class="icon-edit"></i> Test de Estilos de Aprendizaje </a></li>>-->
                              </ul>
                          </div>
                      </div>
                  </aside>
                  <aside class="profile-info col-lg-9" role="complementary" aria-label="Acerca del usuario">
                      <div class="card border-0">

                              <h2 class="card-title" style="color: #89817e;">Acerca de mi</h2>

                          <div class="card-body bio-graph-info">

                              <div class="row">
                                  <div class="bio-row">
                                     <p><span>Nombres: </span> <?php echo $usr_data['use_nombre']?></p>
                                  </div>

                                  <div class="bio-row">
                                     <p><span>Apellidos: </span> <?php echo $usr_data['use_apellido']?></p>
                                  </div>
                                  <div class="bio-row">
                                      <p><span>Fecha de Nacimiento:</span> <?php echo $usr_data['use_stu_datebirth']?></p>
                                  </div>
                                  <div class="bio-row">
                                      <p><span>Email: </span> <?php echo $usr_data['use_email']?></p>
                                  </div>
                                  <div class="bio-row">
                                      <p><span>Educación: </span> <?php echo $usr_data['use_level']?></p>
                                  </div>
                                  <div class="bio-row">
                                      <p><span>Registro: </span> <?php echo $usr_data['use_fecha_registro']?></p>
                                  </div>
                                  <div class="bio-row">
                                      <p><span>Rol: </span> <?php echo $usr_data['use_rol_nombre']?></p>
                                  </div>
                                  <div class="bio-row">
                                     <p><span>Estilo de Aprendizaje: </span> <?php echo $usr_data['use_ls_learningstyle']?></p>
                                  </div>
                                  <div class="bio-row">
                                     <p><span>Descripción del Estilo de Aprendizaje: </span> <?php echo $usr_data['use_ls_description']?></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </aside>
              </div>
          </div>
      </section>
<?php };?>
      <!--main content end-->
