<div class="tab-pane fade" id="screen-reader" role="tabpanel" aria-labelledby="screen-reader-tab">
  <div class="d-flex flex-row flex-nowrap">
    <div id="card-screen-reader-speed" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('read_speed'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroup" aria-labelledby="group_read_speed_sr">
          <div class="row">
            <div class="col">
              <legend id="group_read_speed_sr" style="font-size:1rem;">
                <?php echo $this->lang->line('message_read_speed'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="speed-sr" id="speedBajoSr" value="1">
                    <label class="form-check-label" for="speedBajoSr">
                      <?php echo $this->lang->line('low'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="speed-sr" id="speedMedioSr" value="2">
                    <label class="form-check-label" for="speedMedioSr">
                      <?php echo $this->lang->line('medium'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="speed-sr" id="speedAltoSr" value="3">
                    <label class="form-check-label" for="speedAltoSr">
                      <?php echo $this->lang->line('high'); ?></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div id="card-screen-reader-pitch" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('voice_tone'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroup" aria-labelledby="group_voice_tone_sr">
          <div class="row">
            <div class="col">
              <legend id="group_voice_tone_sr" style="font-size:1rem;">
                <?php echo $this->lang->line('message_voice_tone'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="pitch-sr" id="pitchBajoSr" value="1">
                    <label class="form-check-label" for="pitchBajoSr">
                      <?php echo $this->lang->line('low'); ?></label>
                  </div>

                </div>

              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="pitch-sr" id="pitchMedioSr" value="2">
                    <label class="form-check-label" for="pitchMedioSr">
                      <?php echo $this->lang->line('medium'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="pitch-sr" id="pitchAltoSr" value="3">
                    <label class="form-check-label" for="pitchAltoSr">
                      <?php echo $this->lang->line('high'); ?></label>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div id="card-screen-reader-volume" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('volume'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroup" aria-labelledby="group_volume_sr">
          <div class="row">
            <div class="col">
              <legend id="group_volume_sr" style="font-size:1rem;">
                <?php echo $this->lang->line('message_volume'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="volume-sr" id="volumeBajoSr" value="1">
                    <label class="form-check-label" for="volumeBajoSr">
                      <?php echo $this->lang->line('low'); ?></label>
                  </div>

                </div>

              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="volume-sr" id="volumeMedioSr" value="2">
                    <label class="form-check-label" for="volumeMedioSr">
                      <?php echo $this->lang->line('medium'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="volume-sr" id="volumeAltoSr" value="3">
                    <label class="form-check-label" for="volumeAltoSr">
                      <?php echo $this->lang->line('high'); ?></label>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div id="card-screen-reader-voice-gender" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('gender_voice'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroup" aria-labelledby="group_gender_voice_sr">
          <div class="row">
            <div class="col">
              <legend id="group_gender_voice_sr" style="font-size:1rem;">
                <?php echo $this->lang->line('message_gender_voice'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="gender-sr" id="genderFemaleSr"
                      value="1">
                    <label class="form-check-label" for="genderFemaleSr">
                      <?php echo $this->lang->line('female'); ?></label>
                  </div>

                </div>

              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="gender-sr" id="genderMasculineSr"
                      value="2">
                    <label class="form-check-label" for="genderMasculineSr">
                      <?php echo $this->lang->line('male'); ?></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div id="card-screen-reader-link" class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header text-center"><span><b>
            <?php echo $this->lang->line('links'); ?></b></span></div>
      <div class="card-body">
        <fieldset role="radiogroup" aria-labelledby="group_links_sr">
          <div class="row">
            <div class="col">
              <legend id="group_links_sr" style="font-size:1rem;">
                <?php echo $this->lang->line('message_links'); ?>
              </legend>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="link-sr" id="speak-link-sr" value="1">
                    <label class="form-check-label" for="speak-link-sr">
                      <?php echo $this->lang->line('read_normal'); ?></label>
                  </div>

                </div>

              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="link-sr" id="different-voice-link-sr"
                      value="2">
                    <label class="form-check-label" for="different-voice-link-sr">
                      <?php echo $this->lang->line('change_voice'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="link-sr" id="sound-effect-link-sr"
                      value="3">
                    <label class="form-check-label" for="sound-effect-link-sr">
                      <?php echo $this->lang->line('play_effect'); ?></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" role="radio" name="link-sr" id="none-link-sr" value="4">
                    <label class="form-check-label" for="none-link-sr">
                      <?php echo $this->lang->line('no_read_link'); ?></label>
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