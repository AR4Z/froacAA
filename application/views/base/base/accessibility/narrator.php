<div class="tab-pane fade" id="narrator" role="tabpanel" aria-labelledby="narrator-tab">
  <div id="carouselNarratorCards" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="d-flex flex-row flex-nowrap">
          <div id="card-narrator-speed" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('read_speed'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_speed_narrator">
                <div class="row">
                  <div class="col">
                    <legend id="group_speed_narrator" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_read_speed'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="speed-nr" id="speedBajoNarrator"
                            value="1">
                          <label class="form-check-label" for="speedBajoNarrator">
                            <?php echo $this->lang->line('low'); ?>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="speed-nr" id="speedMedioNarrator"
                            value="2">
                          <label class="form-check-label" for="speedMedioNarrator">
                            <?php echo $this->lang->line('medium'); ?>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="speed-nr" id="speedAltoNarrator"
                            value="3">
                          <label class="form-check-label" for="speedAltoNarrator">
                            <?php echo $this->lang->line('high'); ?></label>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div id="card-narrator-pitch" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('voice_tone'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_pitch_narrator">
                <div class="row">
                  <div class="col">
                    <legend id="group_pitch_narrator" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_voice_tone'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="pitch-nr" id="pitchBajoNarrator"
                            value="1">
                          <label class="form-check-label" for="pitchBajoNarrator">
                            <?php echo $this->lang->line('low'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="pitch-nr" id="pitchMedioNarrator"
                            value="2">
                          <label class="form-check-label" for="pitchMedioNarrator">
                            <?php echo $this->lang->line('medium'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="pitch-nr" id="pitchAltoNarrator"
                            value="3">
                          <label class="form-check-label" for="pitchAltoNarrator">
                            <?php echo $this->lang->line('high'); ?></label>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div id="card-narrator-volume" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('volume'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_narrator_volume">
                <div class="row">
                  <div class="col">
                    <legend id="group_narrator_volume" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_volume'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="volume-narrator" id="volumeBajoNarrator"
                            value="1">
                          <label class="form-check-label" for="volumeBajoNarrator">
                            <?php echo $this->lang->line('low'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="volume-narrator" id="volumeMedioNarrator"
                            value="2">
                          <label class="form-check-label" for="volumeMedioNarrator">
                            <?php echo $this->lang->line('medium'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="volume-narrator" id="volumeAltoNarrator"
                            value="3">
                          <label class="form-check-label" for="volumeAltoNarrator">
                            <?php echo $this->lang->line('high'); ?></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div id="card-narrator-voice-gender" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('gender_voice'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_gender_voice_narrator">
                <div class="row">
                  <div class="col">
                    <legend id="group_gender_voice_narrator" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_gender_voice'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="gender-narrator" id="genderFemaleNarrator"
                            value="1">
                          <label class="form-check-label" for="genderFemaleNarrator">
                            <?php echo $this->lang->line('female'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="gender-narrator" id="genderMasculineNarrator"
                            value="2">
                          <label class="form-check-label" for="genderMasculineNarrator">
                            <?php echo $this->lang->line('male'); ?></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div id="card-narrator-link" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('links'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_link_narrator">
                <div class="row">
                  <div class="col">
                    <legend id="group_link_narrator" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_links'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="link-narrator" id="speak-link-narrator"
                            value="1">
                          <label class="form-check-label" for="speak-link-narrator">
                            <?php echo $this->lang->line('read_normal'); ?></label>
                        </div>

                      </div>

                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="link-narrator" id="different-voice-link-narrator"
                            value="2">
                          <label class="form-check-label" for="different-voice-link-narrator">
                            <?php echo $this->lang->line('change_voice'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="link-narrator" id="sound-effect-link-narrator"
                            value="3">
                          <label class="form-check-label" for="sound-effect-link-narrator">
                            <?php echo $this->lang->line('play_effect'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="raido" name="link-narrator" id="none-link-narrator"
                            value="4">
                          <label class="form-check-label" for="none-link-narrator">
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
      <div class="carousel-item">
        <div class="d-flex flex-row flex-nowrap">
          <div id="card-narrator-highlight" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('highlight_mode'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_highlight_narrator">
                <div class="row">
                  <div class="col">
                    <legend id="group_highlight_narrator" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_highlight'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="highlight-narrator" id="word-highlight-narrator"
                            value="1">
                          <label class="form-check-label" for="word-highlight-narrator">
                            <?php echo $this->lang->line('word'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="highlight-narrator" id="line-highlight-narrator"
                            value="2">
                          <label class="form-check-label" for="line-highlight-narrator">
                            <?php echo $this->lang->line('line'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="highlight-narrator" id="sentence-highlight-narrator"
                            value="3">
                          <label class="form-check-label" for="sentence-highlight-narrator">
                            <?php echo $this->lang->line('sentence'); ?></label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="highlight-narrator" id="paragraph-highlight-narrator"
                            value="4">
                          <label class="form-check-label" for="paragraph-highlight-narrator">
                            <?php echo $this->lang->line('paragraph'); ?></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div id="card-narrator-read-mode" class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>
                  <?php echo $this->lang->line('read_mode'); ?></b></span></div>
            <div class="card-body">
              <fieldset role="radiogroup" aria-labelledby="group_read_mode_highlight">
                <div class="row">
                  <div class="col">
                    <legend id="group_read_mode_highlight" style="font-size:1rem;">
                      <?php echo $this->lang->line('message_read_mode'); ?>
                    </legend>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="reading-unit-narrator" id="ru-word-narrator"
                            value="1">
                          <label class="form-check-label" for="ru-word-narrator">
                            <?php echo $this->lang->line('word_to_word'); ?></label>
                        </div>

                      </div>

                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="reading-unit-narrator" id="ru-line-narrator"
                            value="2">
                          <label class="form-check-label" for="ru-line-narrator">
                            <?php echo $this->lang->line('line_to_line'); ?></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="reading-unit-narrator" id="ru-sentence-narrator"
                            value="3">
                          <label class="form-check-label" for="ru-sentence-narrator">
                            <?php echo $this->lang->line('sentence_to_sentence'); ?></label>
                        </div>

                      </div>

                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" role="radio" name="reading-unit-narrator" id="ru-paragraph-narrator"
                            value="4">
                          <label class="form-check-label" for="ru-paragraph-narrator">
                            <?php echo $this->lang->line('paragraph_to_paragraph'); ?></label>
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
    </div>
    <a style="top:35%;color:black;height:50px;width: 50px;background-color: #bbb;border-radius: 50%;" class="carousel-control-next"
      href="#carouselNarratorCards" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Siguiente</span>
    </a>
  </div>
</div>