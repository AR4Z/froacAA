<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>asset/css/datepicker.css" rel="stylesheet"></link>
<div class="content-inner" role="main">
    <div class="container-fluid">
        <br/>
        <div class="card border-0">
            <h1>
              <?php echo $this->lang->line('signup'); ?> FROAC
            </h1>
            <div class="card-body">
                <form
                  method="POST"
                  action="<?php echo base_url();?>index.php/usuario/guardar"
                  enctype="multipart/form-data"
                  id="registerForm"
                  name="registerForm">
                    <div class="card border-0">
                        <h2><?php echo $this->lang->line('personal_information'); ?></h2>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="inputName" id="labelName">
                                  <?php echo $this->lang->line('name'); ?>
                                </label>
                                <input
                                  type="text"
                                  class="name form-control"
                                  name="name" placeholder="<?php echo $this->lang->line('name'); ?>"
                                  id="inputName"
                                  aria-labelledby="labelName"
                                  aria-required="true"
                                  data-validate-field="name"
                                />
                            </div>

                            <div class="form-group">
                                <label for="inputLastName" id="labelLastName">
                                  <?php echo $this->lang->line('last_name'); ?>
                                </label>
                                <input
                                  id="inputLastName"
                                  type="text"
                                  class="form-control"
                                  name="lastName"
                                  placeholder="<?php echo $this->lang->line('last_name'); ?>"
                                  aria-required="true"
                                  aria-labelledby="labelLastName"
                                  data-validate-field="lastName"
                                />
                            </div>
                            <div id="cont_fecha_nac" class="form-group">
                                <label id="labelBirthDate" for="inputBirthDate">
                                  <?php echo $this->lang->line('birthdate'); ?>
                                </label>
                                <input
                                  type="text"
                                  class="birthdate form-control"
                                  id="inputBirthDate"
                                  name="birthDate"
                                  placeholder="<?php echo $this->lang->line('birthdate'); ?>"
                                  aria-required="true"
                                  aria-labelledby="labelBirthDate"
                                  data-validate-field="birthDate"
                                />
                            </div>
                            <div class="form-group">
                                <label id="labelEmail" for="inputEmail">
                                  <?php echo $this->lang->line('email'); ?>
                                </label>
                                <input
                                  type="email"
                                  id="inputEmail"
                                  class="form-control"
                                  name="email" placeholder="<?php echo $this->lang->line('email'); ?>"
                                  aria-required="true"
                                  aria-labelledby="labelEmail"
                                  data-validate-field="email"
                                />
                            </div>
                            <div class="form-group">
                                <label for="inputUsername" id="labelUsername">
                                  <?php echo $this->lang->line('username'); ?>:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputUsername"
                                  name="username"
                                  placeholder="<?php echo $this->lang->line('username'); ?>"
                                  aria-required="true"
                                  aria-labelledby="labelUsername"
                                  data-validate-field="username"
                                />
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" id="labelPassword">
                                  <?php echo $this->lang->line('password'); ?>:
                                </label>
                                <input
                                  type="password"
                                  class="form-control"
                                  id="inputPassword"
                                  name="password"
                                  placeholder="<?php echo $this->lang->line('password'); ?>"
                                  aria-labelledby="labelPassword"
                                  aria-required="true"
                                  data-validate-field="password"
                                />
                                <br/>
                                
                                <label for="inputPasswordConfirmation" id="labelPasswordConfirmation">
                                  <?php echo $this->lang->line('confirmation_password'); ?>:
                                </label>
                                <input
                                  type="password"
                                  class="form-control"
                                  id="inputPasswordConfirmation"
                                  name="passwordConfirmation"
                                  placeholder="<?php echo $this->lang->line('confirmation_password'); ?>"
                                  aria-labelledby="labelPasswordConfirmation"
                                  aria-required="true"
                                  data-validate-field="passwordConfirmation"
                                />
                            </div>
                            <div class="form-group">
                                <label for="selectEtnica">
                                  <?php echo $this->lang->line('belong_indigenous'); ?>:
                                </label>
                                <select
                                  class="form-control input-sm m-bot15"
                                  name="etnica"
                                  id="selectEtnica"
                                >
                                    <option value="ninguna">Ninguna</option>
                                    <option value="embera">Embera Chamí</option>
                                    <option value="otra">Otra comunidad</option>
                                </select>
                            </div>
                            <div class="form-group">
                              <fieldset aria-labelledby="haveDissabilities">
                                <legend id="haveDissabilities" style="font-size:1rem;">
                                  <?php echo $this->lang->line('have_disabilities'); ?>:
                                </legend>
                              <br/>
                              <?php
                                  foreach ($dissabilities as $key) { ?>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="dissabilities"
                                    value="<?php echo $key->use_dissability_id ?>"
                                  />
                                  <?php echo $key->use_dissability ?>
                                </label>
                                <br/>
                              <?php } ?>
                              </fieldset>
                            </div>
                            <div class="form-group">
                                <label for="inputInstitutionName" id="labelInstitutionName">
                                  <?php echo $this->lang->line('institution'); ?>:
                                </label>
                                <input
                                  aria-labelledby="labelInstitutionName"
                                  type="text"
                                  class="form-control"
                                  id="inputInstitutionName"
                                  name="institutionName"
                                  placeholder="<?php echo $this->lang->line('institution'); ?>"
                                  data-validate-field="institutionName"
                                />
                            </div>
                            <div class="form-group">
                                <label id="labelEducationLevel" for="selectEducationLevel">
                                  <?php echo $this->lang->line('education_level'); ?>:
                                </label>
                                <select
                                  class="form-control input-sm m-bot15"
                                  id="selectEducationLevel"
                                  name="educationLevel"
                                  aria-labelledby="labelEducationLevel"
                                  aria-required="true">
                                    <?php
                                      foreach ($nivel_educativo as $key) { ?>
                                        <option name="educationLevel" value="<?php echo $key->use_id_level ?>">
                                          <?php echo $key->use_level ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="form-group">
                              <fieldset aria-labelledby="legendEducationalResource">
                                <legend id="legendEducationalResource" style="font-size:1rem;"><?php echo $this->lang->line('educational_resource_pref'); ?></legend>
                                  <br/>

                                  <?php
                                    foreach ($preferencias as $key) { $preferencia = preg_replace('/\s+/', '', $key -> use_pre_preferencia);?>
                                      <label>
                                        <input
                                          type="checkbox"
                                          aria-selected="true"
                                          name="educationalResource"
                                          value="<?php echo $key->use_pre_id ?>"
                                        />
                                        <?php echo $key->use_pre_preferencia ?>
                                      </label>
                                      <br/>
                                    <?php } ?>
                            </fieldset>
                            </div>
                            <div
                              class="form-group"
                              role="group"
                              aria-labelledby="labelCustomInterfaz"
                            >
                                <label for="useCustomInterfaz" id="labelCustomInterfaz">
                                  <?php echo $this->lang->line('customize_interface'); ?>
                                </label>
                                <select
                                  id="useCustomInterfaz"
                                  class="form-control input-sm m-bot15"
                                  name="personaliceInterfaz"
                                  aria-labelledby="labelCustomInterfaz"
                                  role="listbox"
                                  aria-required="true"
                                >
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                  <?php }?>
                                </select>

                            </div>
                            <div
                              class="form-group"
                              role="group"
                              aria-labelledby="labelUseNarrator"
                            >
                              <label for="useNarrator" id="labelUseNarrator">
                                <?php echo $this->lang->line('use_narrator'); ?>
                              </label>
                                <select
                                  id="useNarrator"
                                  class="form-control input-sm m-bot15"
                                  name="useNarrator"
                                  aria-labelledby="labelUseNarrator"
                                  role="listbox"
                                  aria-required="true"
                                >
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>
                            </div>
                            <div
                              class="form-group" 
                              role="group"
                              aria-labelledby="labelUseScreenReader"
                            >
                              <label for="useScreenReader" id="labelUseScreenReader">
                                <?php echo $this->lang->line('use_screen_reader'); ?>
                              </label>
                                <select
                                  id="useScreenReader"
                                  class="form-control input-sm m-bot15"
                                  name="useSr"
                                  aria-labelledby="labelUseScreenReader"
                                  role="listbox"
                                  aria-required="true"
                                >
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>
                            </div>

                            <div
                              class="form-group"
                              role="group"
                              aria-labelledby="labelUseLscTranslator"
                            >
                              <label for="useLSCTranslator" id="labelUseLscTranslator">
                                <?php echo $this->lang->line('use_lsc'); ?>
                              </label>
                                <select
                                  id="useLSCTranslator"
                                  class="form-control input-sm m-bot15"
                                  name="useLSCTranslator"
                                  aria-labelledby="labelUseLscTranslator"
                                  role="listbox"
                                  aria-required="true"
                                >
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                    <?php }?>
                                </select>

                            </div>

                            <div
                              class="form-group"
                              role="group"
                              aria-labelledby="labelUseStructuralNav"
                            >
                              <label for="useStructuralNav" id="labelUseStructuralNav">
                                <?php echo $this->lang->line('use_struc_nav'); ?>
                              </label>
                                <select
                                  id="useStructuralNav"
                                  class="form-control input-sm m-bot15"
                                  name="useStructuralNav"
                                  aria-labelledby="labelUseStructuralNav"
                                  role="listbox"
                                  aria-required="true"
                                >
                                    <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>
                            </div>

                            <div
                              class="form-group"
                              role="group"
                              aria-labelledby="labelUseVirtualKeyboard"
                            >
                              <label for="useKeyboard" id="labelUseVirtualKeyboard">
                                <?php echo $this->lang->line('use_virtual_keyboard'); ?>
                              </label>
                                <select
                                  id="useKeyboard"
                                  class="form-control input-sm m-bot15"
                                  name="useKeyboard"
                                  aria-labelledby="labelUseVirtualKeyboard"
                                  role="listbox"
                                  aria-required="true"
                                >
                                  <?php
                                        foreach($optsAdapta as $key) {?>
                                            <?php if($key->option_use_id == 3): ?>
                                            <option value="<?php echo $key->option_use_id?>" selected><?php echo $key->option_use?></option>
                                        <?php else:?>
                                            <option value="<?php echo $key->option_use_id?>"><?php echo $key->option_use?></option>
                                        <?php endif?>
                                <?php }?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                          <input
                            id="submitRegisterForm"
                            type="submit"
                            class="btn btn-info"
                            value="<?php echo $this->lang->line('save_information'); ?>"
                          />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
<script text="text/javascript">
  const registerForm = document.querySelector('form[name="registerForm"]')
  let validator;
  document.addEventListener("DOMContentLoaded", () => {
    validator = new Validator(registerForm, {
      name: {
        required: true,
        minLength: 3
      }
    }, {}, {})
  })
  
</script>