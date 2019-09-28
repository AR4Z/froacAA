<div class="content-inner" role="main">
    <div class="container-fluid">
    <div class="modal fade" id="askProfileModal" tabindex="-1" role="dialog" aria-labelledby="labelAskProfileModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                <div class="col-sm">
                <select aria-label="Seleccionar idioma del sitio" onchange="localStorage.removeItem('firstTime');javascript:window.location.href='<?php echo base_url(); ?>LanguageSwitcher/switchLang/'+this.value;">
                    <option data-content='<span class="flag-icon flag-icon-co"></span> Español' value="spanish" <?php
                      if ($this->session->userdata('site_lang')
                      == 'spanish') {
                          echo 'selected="selected"';
                      } ?>><?php echo $this->lang->line('spanish'); ?> </a></option>
                    <option data-content='<span class="flag-icon flag-icon-us"></span> Inglés' value="english" <?php
                      if ($this->session->userdata('site_lang')
                      == 'english') {
                          echo 'selected="selected"';
                      } ?>><?php echo $this->lang->line('english'); ?> </a></option>
                    <option data-content='<span class="flag-icon flag-icon-br"></span> Portugués' value="portuguese"
                      <?php if ($this->session->userdata('site_lang')
                      == 'portuguese') {
                          echo 'selected="selected"';
                      } ?>><?php echo $this->lang->line('portuguese'); ?> </a></option>
                  </select>
                </div>
                </div>
                <div class="row justify-content-md-center">
                  <h2 id="labelAskProfileModal" class="title">¿Tienes alguna dificultad?</h2>
                  
                </div>
                <div class="row justify-content-md-center">
                <label>
  <input type="radio" name="selectProfile" value="audible" checked>
  <img src="<?php echo base_url(); ?>asset/img/ear.png"/ width="60" height="60" alt="Auditiva">
</label>

<label>
  <input type="radio" name="selectProfile" value="visual">
  <img src="<?php echo base_url(); ?>asset/img/eye.png"/ width="60" height="60" alt="Visual">
</label>
<label>
  <input type="radio" name="selectProfile" value="none">
  <img src="<?php echo base_url(); ?>asset/img/x.png"/ width="60" height="60" alt="Ninguna">
</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" data-dismiss="modal" type="submit">
              <?php echo $this->lang->line('exit'); ?>
              </button>
              <button class="btn btn-primary" data-dismiss="modal" type="submit">
              <?php echo $this->lang->line('continue'); ?>
              </button>
            </div>
          </div>
        </div>
      </div>
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
                                  name="name"
                                  placeholder="<?php echo $this->lang->line('name'); ?>"
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
                                  name="email"
                                  placeholder="<?php echo $this->lang->line('email'); ?>"
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
                                <label for="selectGender">
                                  <?php echo $this->lang->line('gender'); ?>:
                                </label>
                                <select
                                  class="form-control input-sm m-bot15"
                                  name="user_gender"
                                  id="selectGender"
                                >
                                    <option value="3" selected>No informar</option>
                                    <option value="1">Femenino</option>
                                    <option value="2">Masculino</option>
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
                                    name="dissabilities[]"
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
                                          name="educationalResource[]"
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
                                  class="form-control input-sm m-bot15 useAccessibilityTools"
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
                                  class="form-control input-sm m-bot15 useAccessibilityTools"
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
                                  class="form-control input-sm m-bot15 useAccessibilityTools"
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
                                  class="form-control input-sm m-bot15 useAccessibilityTools"
                                  name="useLSCTranslator"
                                  aria-labelledby="labelUseLscTranslator"
                                  role="listbox"
                                  aria-required="true"
                                  class="useAccessibilityTools"
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
                                  class="form-control input-sm m-bot15 useAccessibilityTools"
                                  name="useStructuralNav"
                                  aria-labelledby="labelUseStructuralNav"
                                  role="listbox"
                                  aria-required="true"
                                  class="useAccessibilityTools"
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
                                  class="form-control input-sm m-bot15 useAccessibilityTools"
                                  name="useKeyboard"
                                  aria-labelledby="labelUseVirtualKeyboard"
                                  role="listbox"
                                  aria-required="true"
                                  class="useAccessibilityTools"
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
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let validator;
  let pickerBirthDate;

  document.addEventListener('DOMContentLoaded', () => {
    const profileModal = document.getElementById('askProfileModal');
    const profileModalInit  = new Modal(profileModal);

    profileModal.addEventListener('hidden.bs.modal', () => {
      const profileSelected = document.querySelector('input[name="selectProfile"]:checked').value
      localStorage.setItem('redirectFromTour', false)
    })

    if (localStorage.getItem('redirectFromTour') === 'true') {
      profileModalInit.show();
    }

    Array.from(document.querySelectorAll('select.useAccessibilityTools')).forEach((select) => {
      select.addEventListener('change', (e) => {
        if (e.target.value < 3) {
          Toastify({
            text: `Puede cambiar la configuración de las herramientas de accesibilidad dando click <a onclick="document.getElementsByClassName('page')[0].scrollBy({top: -2000, behavior: 'smooth'});window.accessibilityBar.open();">AQUÍ</a>`,
            duration: 3000,
            close: true,
            gravity: 'top', 
            positionLeft: false,
          }).showToast();
        }
      })
    });

    pickerBirthDate = new Pikaday({
      field: document.getElementById('inputBirthDate'),
      format: 'YYYY-MM-DD',
      toString(date, format) {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      },
      minDate: new Date('1975-01-01'),
      maxDate: yesterday
    });

    validator = new Validator(registerForm, {
      fields: {
        name: {
          required: true,
          minLength: 3
        },
        lastName: {
          required: true,
          minLength: 3
        },
        username: {
          required: true,
          validateUsername: true,
          remote: {
            url: '<?php echo base_url()?>index.php/usuario/verify_username',
            method: 'post',
            nameData: 'username',
            check: (data) => {
              return !data.success;
            }
          }
        },
        email: {
          required: true,
          email: true,
          remote: {
            url: '<?php echo base_url()?>index.php/usuario/verify_email',
            method: 'post',
            nameData: 'email',
            check: (data) => {
              return !data.success;
            }
          }
        },
        birthDate: {
          required: true,
          date: 'yyyy-mm-dd',
          dateLess: '1975-01-01',
          dateMax: yesterday
        },
        password: {
          required: true
        },
        passwordConfirmation: {
          required: true,
          confirmation: 'password'
        },
        institutionName: {
          required: true
        }
      },
      rules: {
        validateUsername: (value, params) => {
          const regExUsername = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/;
          return regExUsername.test(value);
        }
      },
      messages: {
        validateUsername: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('invalid_username'); ?></div>",
        required: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('required_field'); ?></div>",
        minLength: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('min_length_field'); ?></div>",
        username: {
          remote: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('use_username'); ?></div>"
        },
        email: {
          remote: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('use_email'); ?></div>"
        },
        birthDate: {
          date: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('invalid_birthdate'); ?></div>",
          dateMax: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('invalid_birthdate_range'); ?></div>",
          dateLess: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('invalid_birthdate_range'); ?></div>"
        },
        passwordConfirmation: {
          confirmation: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('error_confirm_password'); ?></div>"
        }
      },

      submit: e => {
        return new Promise((resolve, reject) => {
          console.log(e);
          const form = e.target;
          const newUserAdaptInfo = {
            needCustomInterfaz: parseInt(form.querySelector("select[name='personaliceInterfaz']").value) < 3,
            needScreenReader: parseInt(form.querySelector("select[name='useSr']").value) < 3,
            needNarrator: parseInt(form.querySelector("select[name='useNarrator']").value) < 3,
            needLscTranslator: parseInt(form.querySelector("select[name='useLSCTranslator']").value) < 3,
            needStructuralNav: parseInt(form.querySelector("select[name='useStructuralNav']").value) < 3,
            needVirtualKeyboard: parseInt(form.querySelector("select[name='useKeyboard']").value) < 3,
          }

          if (newUserAdaptInfo.needCustomInterfaz) {
            const interfazPreferences = {
              'use_username': form.querySelector("input[name='username']").value,
              'cursor_size_id': localStorage.getItem('cursor_size_id'),
              'color_cursor': localStorage.getItem('color_cursor'),
              'trail_cursor_size_id': localStorage.getItem('trail_cursor_size_id'),
              'trail_cursor_color': localStorage.getItem('trail_cursor_color'),
              'invert_color_image': localStorage.getItem('invert_color_image'),
              'invert_color_general': localStorage.getItem('invert_color_general'),
              'contrast_colors_id': localStorage.getItem('contrast_colors_id'),
              'font_size': localStorage.getItem('font_size'),
              'font_type_id': localStorage.getItem('font_type_id'),
              'size_line_spacing': localStorage.getItem('size_line_spacing'),
              'cursor_url': localStorage.getItem('cursor_url'),
            }

            const customColors = {
              'use_username': form.querySelector("input[name='username']").value,
              'foreground_colour': localStorage.getItem('foreground_colour'),
              'background_colour': localStorage.getItem('background_colour'),
              'highlight_colour': localStorage.getItem('highlight_colour'),
              'link_colour': localStorage.getItem('link_colour')
            }

            const inputCustomColors = document.createElement('input');
            inputCustomColors.setAttribute('type', 'hidden');
            inputCustomColors.setAttribute('name', 'customColors')
            inputCustomColors.value = JSON.stringify(customColors);

            const inputInterfazPreferences = document.createElement('input');
            inputInterfazPreferences.setAttribute('type', 'hidden');
            inputInterfazPreferences.setAttribute('name', 'interfazPreferences')
            inputInterfazPreferences.value = JSON.stringify(interfazPreferences);

            form.appendChild(inputCustomColors);
            form.appendChild(inputInterfazPreferences);
          }

          if (newUserAdaptInfo.needNarrator) {
            const narratorPreferences = {
              'use_username': form.querySelector("input[name='username']").value,
              'speed_reading': localStorage.getItem('speed_reading_nr'),
              'pitch_nr': localStorage.getItem('pitch_nr'),
              'volume_id': localStorage.getItem('volume_id_nr'),
              'voice_gender_id': localStorage.getItem('voice_gender_id_nr'),
              'links_id': localStorage.getItem('links_id_nr'),
              'highlight_id': localStorage.getItem('highlight_id_nr'),
              'reading_unit_id': localStorage.getItem('reading_unit_id_nr'),
              'read_puncts': localStorage.getItem('read_puncts'),
              'punct_signs': localStorage.getItem('punct_signs'),
            }

            const inputNarratorPreferences = document.createElement('input');
            inputNarratorPreferences.setAttribute('type', 'hidden');
            inputNarratorPreferences.setAttribute('name', 'narratorPreferences')
            inputNarratorPreferences.value = JSON.stringify(narratorPreferences);
            form.appendChild(inputNarratorPreferences);
          }

          if (newUserAdaptInfo.needScreenReader) {
            const screenReaderPreferences = {
              'use_username': form.querySelector("input[name='username']").value,
              'speed_reading_id': localStorage.getItem('speed_reading_sr'),
              'pitch_id': localStorage.getItem('pitch_id_sr'),
              'volume_id': localStorage.getItem('volume_id_sr'),
              'voice_gender_id': localStorage.getItem('voice_gender_id_sr'),
              'links_id': localStorage.getItem('links_id_sr'),
            }

            const inputScreenReaderPreferences = document.createElement('input');
            inputScreenReaderPreferences.setAttribute('type', 'hidden');
            inputScreenReaderPreferences.setAttribute('name', 'screenReaderPreferences');
            inputScreenReaderPreferences.value = JSON.stringify(screenReaderPreferences);
            form.appendChild(inputScreenReaderPreferences);
          }

          if (newUserAdaptInfo.needLscTranslator) {
            const lscTranslatorPreferences = {
              'use_username': form.querySelector("input[name='username']").value,
              'sign_speed': localStorage.getItem('sign_speed'),
              'model_id': localStorage.getItem('model_id')
            }

            const inputLscTranslatorPreferences = document.createElement('input');
            inputLscTranslatorPreferences.setAttribute('type', 'hidden');
            inputLscTranslatorPreferences.setAttribute('name', 'lscTranslatorPreferences');
            inputLscTranslatorPreferences.value = JSON.stringify(lscTranslatorPreferences);
            form.appendChild(inputLscTranslatorPreferences);
          }

          if (newUserAdaptInfo.needStructuralNav) {
            const structuralNavPreferences = {
              'use_username': form.querySelector("input[name='username']").value,
              'nav_strategy_id': localStorage.getItem('nav_strategy_id'),
              'showtoc': localStorage.getItem('show_toc')
            }

            const inputStructuralNavPreferences = document.createElement('input');
            inputStructuralNavPreferences.setAttribute('type', 'hidden');
            inputStructuralNavPreferences.setAttribute('name', 'structuralNavPreferences');
            inputStructuralNavPreferences.value = JSON.stringify(structuralNavPreferences);
            form.appendChild(inputStructuralNavPreferences);
          }

          if (newUserAdaptInfo.needVirtualKeyboard) {
            const keyboardPreferences = {
              'use_username': form.querySelector("input[name='username']").value,
              'kb_size_id': localStorage.getItem('kb_size_id'),
              'play_key_sound': localStorage.getItem('play_key_sound')
            }
            const inputKeyboardPreferences = document.createElement('input');
            inputKeyboardPreferences.setAttribute('type', 'hidden');
            inputKeyboardPreferences.setAttribute('name', 'keyboardPreferences');
            inputKeyboardPreferences.value = JSON.stringify(keyboardPreferences);
            form.appendChild(inputKeyboardPreferences);
          }
          return resolve();
        })
      }
    })
  })
</script>