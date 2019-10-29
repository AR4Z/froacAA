<div class="tab-pane fade" id="keyboard-cf" role="tabpanel" aria-labelledby="keyboard-tab">
  <div class="d-flex flex-row flex-nowrap">
    <div id="card-virtual-keyboard-size" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('keyboard_size'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroupd" aria-labelledby="group_size_keyboard">
          <div class="row">
            <div class="col">
              <legend id="group_size_keyboard" style="font-size:1rem;">
                <?php echo $this->lang->line('message_kb_size'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="keyboard-size" id="smallkb" value="1">
                    <label class="form-check-label" for="smallkb">
                      <?php echo $this->lang->line('small'); ?></label>
                  </div>

                </div>

              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="keyboard-size" id="mediumkb" value="2">
                    <label class="form-check-label" for="mediumkb">
                      <?php echo $this->lang->line('medium'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="keyboard-size" id="largekb" value="3">
                    <label class="form-check-label" for="largekb">
                      <?php echo $this->lang->line('big'); ?></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div id="card-virtual-keyboard-key-sound" class="card bg-light mb-3" style="max-width: 18rem; min-width: 18rem;">
      <div class="card-header text-center">
        <span>
          <b>
            <?php echo $this->lang->line('sound'); ?>
          </b>
        </span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <label for="playKeySoundCheck">
              <?php echo $this->lang->line('message_kb_sound'); ?>
              </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
              <input name="play_key_sound" id="playKeySoundCheck" type="checkbox" />
              <span></span>
          </div>
        </div>
      </div>
    </div>
    <div id="card-virtual-keyboard-use" class="card bg-light mb-3" style="max-width: 18rem; min-width: 18rem;">
      <div class="card-header text-center">
        <span>
          <b>
            <?php echo $this->lang->line('keyboard_upper'); ?>
          </b>
        </span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <label for="useKeyboardCheck">
              <?php echo $this->lang->line('use_kb'); ?></label>
          </div>
        </div>
        <div class="row">
          <div class="col">
              <input name="useKeyboard" id="useKeyboardCheck" type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
