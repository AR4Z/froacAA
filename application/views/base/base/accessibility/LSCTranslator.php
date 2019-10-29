<div class="tab-pane fade" id="LSC-translator" role="tabpanel" aria-labelledby="LSC-translator-tab">
  <div class="d-flex flex-row flex-nowrap">
    <div id="card-lsc-translator-speed" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('sign_speed'); ?></b></span></div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <label for="signSpeedInput">
              <?php echo $this->lang->line('message_sign_speed'); ?></label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <input type="number" name="signSpeed" id="signSpeedInput" value="20" min="10" max="40" step="10">
            </div>
          </div>
        </div>

      </div>
    </div>
    <div id="card-lsc-translator-model" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('model'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroup" aria-labelledby="group_model_lsc_translator">
          <div class="row">
            <div class="col">
              <legend id="group_model_lsc_translator" style="font-size:1rem;">
                <?php echo $this->lang->line('message_model'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="LSC-translator-model" id="LSC-translator-model-avatar"
                      value="1">
                    <label class="form-check-label" for="LSC-translator-model-avatar">
                      <?php echo $this->lang->line('avatar'); ?></label>
                  </div>

                </div>

              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="LSC-translator-model" id="LSC-translator-model-human"
                      value="2">
                    <label class="form-check-label" for="LSC-translator-model-human">
                      <?php echo $this->lang->line('human'); ?></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>