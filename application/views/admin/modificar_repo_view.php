<div class="content-inner">
  <div class="container-fluid">
    <br />
    <div class="card border-0">
      <h1>Modificar repositorio</h1>
      <div class="card-body">
        <div class="row">
        <?php foreach ($repomod as $key) { ?>
          <form autocomplete="off" action="<?php echo base_url() ?>index.php/repositorio/actualizar_repo/" method="post"  enctype="multipart/form-data">
            <div>
              <div class="form-group">
                <label for="inputName">Nombre</label>
                <input type="text" class="form-control" id="inputName" name="rep_name" value="<?php echo $key['rep_name']; ?>">
              </div>
              <div class="form-group">
                <label for="inputEntity">Entidad</label>
                <input type="text" class="form-control" id="inputEntity" name="rep_affiliation" value="<?php echo $key['rep_affiliation']; ?>">
              </div>
              <div class="form-group">
                <label for="inputEmail">Correo Electrónico</label>
                <input type="text" class="form-control" id="inputEmail" name="rep_email" value="<?php echo $key['rep_email']; ?>">
              </div>
              <div class="form-group">
                <label for="inputRepositoryType">Tipo Repositorio</label>
                <input type="text" class="form-control" id="inputRepositoryType" value="<?php echo $key['rep_typerepository'];?>" name="rep_typerepository" readonly/>
              </div>
              <div class="form-group">
                <label for="inputUrl">URL</label>
                <input type="text" class="form-control" id="inputUrl" name="rep_url" value="<?php echo $key['rep_url']; ?>"/>
              </div>
              <div class="form-group">
                <label for="inputHost">Enlace OAI</label>
                <input type="text" class="form-control" id="inputHost" name="rep_host" value="<?php echo $key['rep_host']; ?>">
              </div>
              <div class="form-group">
                <label for="inputMetadataStandard">Estándar de metadatos</label>
                <input type="text" class="form-control" id="inputMetadataStandard" name="rep_metadata_inf" value="<?php echo $key['rep_metadata_inf'] ?>"/>
              </div>
              <div class="form-group">
                <label for="inputPort">Puerto</label>
                <input type="text" class="form-control" id="inputPort" name="rep_port" value="<?php echo $key['rep_port'] ?>"/>
              </div>
              <div class="form-group">
                <label for="inputDb">Base de datos</label>
                <input type="text" class="form-control" id="inputDb" name="rep_databasename" value="<?php echo $key['rep_databasename'] ?>"/>
              </div>
              <div class="form-group">
                <label for="inputUser">Usuario</label>
                <input type="text" class="form-control" id="inputUser" name="rep_loggin" value="<?php echo $key['rep_loggin'] ?>"/>
              </div>
              <div class="form-group">
                <label for="inputPassword">Contraseña</label>
                <input type="text" class="form-control" id="inputPassword" name="rep_password" value="<?php echo $key['rep_password'] ?>"/>
              </div>
              <div class="form-group">
                <label for="inputPeriodUpdates">Perio. Actualizaciones (días)</label>
                <input type="text" class="form-control" id="inputPeriodUpdates" readonly />
              </div>
              <div class="form-group">
                <label for="inputRepositoryUser">Usuario repositorio</label>
                
                <select type="text" class="form-control" id="inputRepositoryUser" name="use_username">
                <?php
                            foreach ($usuario as $user)
                            {
                                if($user['use_username']==$key['use_username'])
                                {?>
                                    <option selected value="<?php echo $user['use_username']; ?>"><?php echo $user['use_nombre'] . " " . $user['use_apellido']; ?></option>
                        <?php  }
                                else
                               {?>

                                    <option value="<?php echo $user['use_username']; ?>"><?php echo $user['use_nombre'] . " " . $user['use_apellido']; ?></option>
                        <?php  }
                            }
                            ?>
                </select>
                <input type="hidden" value="<?php echo $key['rep_id'] ?>" name="rep_repository" />
                <input type="hidden" value="<?php echo $key['rep_countoas']?>" name="rep_countoas" />
                <input type="hidden" value="<?php echo $key['rep_registrationdate']?>" name="rep_registrationdate">
              </div>
              <?php
                    }
                    ?>
            </div>
            <div class="form-group">
              <input class="btn btn-info" type="submit" id="enviar"  value="Guardar" class="alt_btn">
              <input class="btn btn-danger" type="reset" id="reset" value="Cancelar">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>