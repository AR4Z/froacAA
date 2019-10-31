<div class="content-inner" role="main">
  <div class="container-fluid">
    <div class="card border-0">
      <h1>
        <?php echo $this->lang->line('signup'); ?> FROAC
      </h1>
      <div class="card-body">
        <form method="POST" action="<?php echo base_url(); ?>index.php/usuario/guardar" enctype="multipart/form-data" id="registerForm" name="registerForm">
          <div class="card border-0">
            <h2><?php echo $this->lang->line('personal_information'); ?></h2>
            <div class="card-body">
              <div class="form-group">
                <label for="inputName" id="labelName">
                  <?php echo $this->lang->line('name'); ?>
                </label>
                <input type="text" class="name form-control" name="name" placeholder="<?php echo $this->lang->line('name'); ?>" id="inputName" aria-labelledby="labelName" aria-required="true" data-validate-field="name" />
              </div>

              <div class="form-group">
                <label for="inputLastName" id="labelLastName">
                  <?php echo $this->lang->line('last_name'); ?>
                </label>
                <input id="inputLastName" type="text" class="form-control" name="lastName" placeholder="<?php echo $this->lang->line('last_name'); ?>" aria-required="true" aria-labelledby="labelLastName" data-validate-field="lastName" />
              </div>
              <div id="cont_fecha_nac" class="form-group">
                <label id="labelBirthDate" for="inputBirthDate">
                  <?php echo $this->lang->line('birthdate'); ?>
                </label>
                <input type="text" class="birthdate form-control" id="inputBirthDate" name="birthDate" placeholder="<?php echo $this->lang->line('birthdate'); ?>" aria-required="true" aria-labelledby="labelBirthDate" data-validate-field="birthDate" />
              </div>
              <div class="form-group">
                <label for="selectGender">
                  <?php echo $this->lang->line('gender'); ?>:
                </label>
                <select class="form-control input-sm m-bot15" name="user_gender" id="selectGender">
                  <option value="3" selected>No informar</option>
                  <option value="1">Femenino</option>
                  <option value="2">Masculino</option>
                </select>
              </div>
              <div class="form-group">
                <label id="labelEmail" for="inputEmail">
                  <?php echo $this->lang->line('email'); ?>
                </label>
                <input type="email" id="inputEmail" class="form-control" name="email" placeholder="<?php echo $this->lang->line('email'); ?>" aria-required="true" aria-labelledby="labelEmail" data-validate-field="email" />
              </div>
              <div class="form-group">
                <label for="inputUsername" id="labelUsername">
                  <?php echo $this->lang->line('username'); ?>:
                </label>
                <input type="text" class="form-control" id="inputUsername" name="username" placeholder="<?php echo $this->lang->line('username'); ?>" aria-required="true" aria-labelledby="labelUsername" data-validate-field="username" />
              </div>
              <div class="form-group">
                <label for="inputPassword" id="labelPassword">
                  <?php echo $this->lang->line('password'); ?>:
                </label>
                <input type="password" class="form-control" id="inputPassword" name="password" placeholder="<?php echo $this->lang->line('password'); ?>" aria-labelledby="labelPassword" aria-required="true" data-validate-field="password" />
                <br />

                <label for="inputPasswordConfirmation" id="labelPasswordConfirmation">
                  <?php echo $this->lang->line('confirmation_password'); ?>:
                </label>
                <input type="password" class="form-control" id="inputPasswordConfirmation" name="passwordConfirmation" placeholder="<?php echo $this->lang->line('confirmation_password'); ?>" aria-labelledby="labelPasswordConfirmation" aria-required="true" data-validate-field="passwordConfirmation" />
              </div>
              <div class="form-group">
                <label for="inputInstitutionName" id="labelInstitutionName">
                  <?php echo $this->lang->line('institution'); ?>:
                </label>
                <input aria-labelledby="labelInstitutionName" type="text" class="form-control" id="inputInstitutionName" name="institutionName" placeholder="<?php echo $this->lang->line('institution'); ?>" data-validate-field="institutionName" />
              </div>
              <div class="form-group">
                <label id="labelEducationLevel" for="selectEducationLevel">
                  <?php echo $this->lang->line('education_level'); ?>:
                </label>
                <select class="form-control input-sm m-bot15" id="selectEducationLevel" name="educationLevel" aria-labelledby="labelEducationLevel" aria-required="true">
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
                  <br />
                  <?php
                  foreach ($preferencias as $key) {
                    $preferencia = preg_replace('/\s+/', '', $key->use_pre_preferencia); ?>
                    <label>
                      <input type="checkbox" aria-selected="true" name="educationalResource[]" value="<?php echo $key->use_pre_id ?>" />
                      <?php echo $key->use_pre_preferencia ?>
                    </label>
                    <br />
                  <?php } ?>
                </fieldset>
              </div>
              <div class="form-group">
                <label id="labelDiversityProfile" for="selectDiversityProfile">
                  <?php echo $this->lang->line('diversity_profile'); ?>:
                </label>
                <select class="form-control input-sm m-bot15" id="selectDiversityProfile" name="diversityProfile" aria-labelledby="labelDiversityProfile" aria-required="true">
                  <?php
                  foreach ($diversity_profiles as $key) { ?>
                    <?php if ($key->id_ == 11) { ?>
                      <option name="diversityProfile" value="<?php echo $key->id_ ?>" selected="selected">
                        <?php echo $key->description ?>
                      </option>
                    <?php } else { ?>
                      <option name="diversityProfile" value="<?php echo $key->id_ ?>">
                        <?php echo $key->description ?>
                      </option>
                    <?php } ?>
                  <?php } ?>
                </select>
              </div>
              <div class="form-group">
                <label id="labelPrefLOLanguage" for="selectPrefLOLanguage">
                  <?php echo $this->lang->line('pref_lo_language'); ?>:
                </label>
                <select class="form-control input-sm m-bot15" id="selectPrefLOLanguage" name="prefLOLanguage" aria-labelledby="labelPrefLOLanguage" aria-required="true">
                  <option name="prefLOLanguage" value="es" selected="selected">
                    <?php echo $this->lang->line('spanish'); ?>
                  </option>
                  <option name="prefLOLanguage" value="en">
                    <?php echo $this->lang->line('english'); ?>
                  </option>
                  <option name="prefLOLanguage" value="pt">
                    <?php echo $this->lang->line('portuguese'); ?>
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input type="checkbox" id="autoTraslateLOs" name="autoTraslateLOs">
                <label for="autoTraslateLOs"><?php echo $this->lang->line('auto_traslate_los_label'); ?></label>
              </div>
              <div class="form-group">
                <fieldset aria-labelledby="legendAccessMode">
                  <legend id="legendAccessMode" style="font-size:1rem;"><?php echo $this->lang->line('access_mode'); ?></legend>
                  <br />
                  <label>
                    <input type="checkbox" aria-selected="true" name="accessModeAuditive" checked />
                    <?php echo $this->lang->line('auditive'); ?>
                  </label>
                  <label>
                    <input type="checkbox" aria-selected="true" name="accessModeTextual" checked />
                    <?php echo $this->lang->line('textual'); ?>
                  </label>
                  <label>
                    <input type="checkbox" aria-selected="true" name="accessModeVisual" checked />
                    <?php echo $this->lang->line('visual'); ?>
                  </label>
                  <br />
                </fieldset>
              </div>
              <div class="form-group">
                <fieldset aria-labelledby="legendAdaptationType">
                  <legend id="legendAdaptationType" style="font-size:1rem;"><?php echo $this->lang->line('adaptation_type'); ?></legend>
                  <br />
                  <label>
                    <input type="checkbox" aria-selected="true" name="adaptationTypeAudioDescription" checked />
                    <?php echo $this->lang->line('audio_description'); ?>
                  </label>
                  <label>
                    <input type="checkbox" aria-selected="true" name="adaptationTypeHearingAlternative" checked />
                    <?php echo $this->lang->line('hearing_alternative'); ?>
                  </label>
                  <label>
                    <input type="checkbox" aria-selected="true" name="adaptationTypeTextualAlternative" checked />
                    <?php echo $this->lang->line('textual_alternative'); ?>
                  </label>
                  <label>
                    <input type="checkbox" aria-selected="true" name="adaptationTypeLSC" checked />
                    <?php echo $this->lang->line('ls'); ?>
                  </label>
                  <label>
                    <input type="checkbox" aria-selected="true" name="adaptationTypeSubtitles" checked />
                    <?php echo $this->lang->line('subtitles'); ?>
                  </label>
                  <br />
                </fieldset>
              </div>
              <div class="form-group">
                <label id="labelInputDevice" for="selectInputDevice">
                  <?php echo $this->lang->line('input_device'); ?>:
                </label>
                <select class="form-control input-sm m-bot15" id="selectInputDevice" name="inputDevice" aria-labelledby="labelInputDevice" aria-required="true">
                  <option name="inputDevice" value="1" selected="selected">
                    <?php echo $this->lang->line('total_control_keyboard'); ?>
                  </option>
                  <option name="inputDevice" value="2">
                    <?php echo $this->lang->line('total_control_mouse'); ?>
                  </option>
                  <option name="inputDevice" value="3">
                    <?php echo $this->lang->line('control_mouse_keyboard'); ?>
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input id="submitRegisterForm" type="submit" class="btn btn-info" value="<?php echo $this->lang->line('save_information'); ?>" />
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
    const setProfileValues = (values) => {
      const accessMode = ['accessModeAuditive', 'accessModeTextual', 'accessModeVisual']
      const adaptationTypes = ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative', 'adaptationTypeLSC', 'adaptationTypeSubtitles']
      const selectInputDevice = document.getElementById('selectInputDevice')
      selectInputDevice.value = values.input_device

      accessMode.forEach((nameAccessMode) => {
        const inputAccessMode = document.getElementsByName(nameAccessMode)[0]
        inputAccessMode.checked = values.access_mode.indexOf(nameAccessMode) >= 0
      })

      adaptationTypes.forEach((nameAdaptationType) => {
        const inputAdaptationType = document.getElementsByName(nameAdaptationType)[0]
        inputAdaptationType.checked = values.adaptation_types.indexOf(nameAdaptationType) >= 0
      })
    }
    document.addEventListener('DOMContentLoaded', () => {
      const profileSelect = document.getElementById('selectDiversityProfile');
      profileSelect.addEventListener('change', (e) => {
        const valuesForProfiles = [{
            input_device: 1,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 1,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeAudioDescription', 'adaptationTypeHearingAlternative', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeVisual', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeLSC', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeVisual', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeSubtitles', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeVisual', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeSubtitles', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeVisual', 'accessModeTextual'],
            adaptation_types: ['adaptationTypeSubtitles', 'adaptationTypeLSC', 'adaptationTypeTextualAlternative']
          },
          {
            input_device: 3,
            access_mode: ['accessModeAuditive', 'accessModeTextual', 'accessModeVisual'],
            adaptation_types: []
          }
        ]
        const idDiversityProfile = parseInt(e.target.value);
        setProfileValues(valuesForProfiles[idDiversityProfile - 1])

      })

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
              url: '<?php echo base_url() ?>index.php/usuario/verify_username',
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
              url: '<?php echo base_url() ?>index.php/usuario/verify_email',
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
            const form = e.target;
            const profiles = [{
                personaliceInterfaz: 3,
                useNarrator: 3,
                useSr: 1,
                useLSCTranslator: 3,
                useStructuralNav: 3,
                useKeyboard: 3,
                useVoiceRecognition: 3
              },
              {
                personaliceInterfaz: 3,
                useNarrator: 3,
                useSr: 1,
                useLSCTranslator: 3,
                useStructuralNav: 3,
                useKeyboard: 3,
                useVoiceRecognition: 2
              },
              {
                personaliceInterfaz: 1,
                useNarrator: 2,
                useSr: 2,
                useLSCTranslator: 3,
                useKeyboard: 2,
                useVoiceRecognition: 2,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 1,
                useNarrator: 2,
                useSr: 2,
                useLSCTranslator: 3,
                useKeyboard: 2,
                useVoiceRecognition: 1,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 1,
                useNarrator: 1,
                useSr: 2,
                useLSCTranslator: 3,
                useKeyboard: 2,
                useVoiceRecognition: 2,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 1,
                useNarrator: 1,
                useSr: 2,
                useLSCTranslator: 3,
                useKeyboard: 2,
                useVoiceRecognition: 1,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 1,
                useNarrator: 2,
                useSr: 2,
                useLSCTranslator: 3,
                useKeyboard: 2,
                useVoiceRecognition: 2,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 1,
                useNarrator: 2,
                useSr: 2,
                useLSCTranslator: 3,
                useKeyboard: 1,
                useVoiceRecognition: 2,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 2,
                useNarrator: 3,
                useSr: 3,
                useLSCTranslator: 1,
                useKeyboard: 2,
                useVoiceRecognition: 3,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 2,
                useNarrator: 3,
                useSr: 3,
                useLSCTranslator: 2,
                useKeyboard: 2,
                useVoiceRecognition: 3,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 2,
                useNarrator: 3,
                useSr: 3,
                useLSCTranslator: 2,
                useKeyboard: 1,
                useVoiceRecognition: 3,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 2,
                useNarrator: 3,
                useSr: 3,
                useLSCTranslator: 1,
                useKeyboard: 2,
                useVoiceRecognition: 3,
                useStructuralNav: 3
              },
              {
                personaliceInterfaz: 3,
                useNarrator: 3,
                useSr: 3,
                useLSCTranslator: 3,
                useKeyboard: 3,
                useVoiceRecognition: 3,
                useStructuralNav: 3
              }
            ]
            const newUserAdaptInfo = profiles[parseInt(form.querySelector("select[name='diversityProfile']").value) - 1];
            const inputPersonaliceInterfaz = document.createElement('input');
            inputPersonaliceInterfaz.setAttribute('type', 'hidden');
            inputPersonaliceInterfaz.setAttribute('name', 'personaliceInterfaz');
            inputPersonaliceInterfaz.value = newUserAdaptInfo.personaliceInterfaz;
            form.appendChild(inputPersonaliceInterfaz);

            const inputUseNarrator = document.createElement('input');
            inputUseNarrator.setAttribute('type', 'hidden');
            inputUseNarrator.setAttribute('name', 'useNarrator');
            inputUseNarrator.value = newUserAdaptInfo.useNarrator;
            form.appendChild(inputUseNarrator);

            const inputUseSr = document.createElement('input');
            inputUseSr.setAttribute('type', 'hidden');
            inputUseSr.setAttribute('name', 'useSr');
            inputUseSr.value = newUserAdaptInfo.useSr;
            form.appendChild(inputUseSr);

            const inputUseLSCTranslator = document.createElement('input');
            inputUseLSCTranslator.setAttribute('type', 'hidden');
            inputUseLSCTranslator.setAttribute('name', 'useLSCTranslator');
            inputUseLSCTranslator.value = newUserAdaptInfo.useLSCTranslator;
            form.appendChild(inputUseLSCTranslator);

            const inputUseStructuralNav = document.createElement('input');
            inputUseStructuralNav.setAttribute('type', 'hidden');
            inputUseStructuralNav.setAttribute('name', 'useStructuralNav');
            inputUseStructuralNav.value = newUserAdaptInfo.useStructuralNav;
            form.appendChild(inputUseStructuralNav);

            const inputUseKeyboard = document.createElement('input');
            inputUseKeyboard.setAttribute('type', 'hidden');
            inputUseKeyboard.setAttribute('name', 'useKeyboard');
            inputUseKeyboard.value = newUserAdaptInfo.useKeyboard;
            form.appendChild(inputUseKeyboard);

            const inputUseVoiceRecognition = document.createElement('input');
            inputUseVoiceRecognition.setAttribute('type', 'hidden');
            inputUseVoiceRecognition.setAttribute('name', 'useVoiceRecognition');
            inputUseVoiceRecognition.value = newUserAdaptInfo.useVoiceRecognition;
            form.appendChild(inputUseVoiceRecognition);

            if (newUserAdaptInfo.personaliceInterfaz < 3) {
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

            if (newUserAdaptInfo.useNarrator < 3) {
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

            if (newUserAdaptInfo.useSr < 3) {
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

            if (newUserAdaptInfo.useLSCTranslator < 3) {
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

            if (newUserAdaptInfo.useStructuralNav < 3) {
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

            if (newUserAdaptInfo.useKeyboard < 3) {
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