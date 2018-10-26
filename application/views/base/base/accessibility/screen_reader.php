<div class="tab-pane fade" id="screen-reader" role="tabpanel" aria-labelledby="screen-reader-tab">
    <div class="d-flex flex-row flex-nowrap">
    <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('read_speed'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_read_speed'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="speed-sr" id="speedBajo" value="1">
                                    <label class="form-check-label" for="speedBajo"><?php echo $this->lang->line('low'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="speed-sr" id="speedMedio" value="2">
                                    <label class="form-check-label" for="speedMedio"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="speed-sr" id="speedAlto" value="3">
                                    <label class="form-check-label" for="speedAlto"><?php echo $this->lang->line('high'); ?></label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('voice_tone'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_voice_tone'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pitch-sr" id="pitchBajo" value="1">
                                    <label class="form-check-label" for="pitchBajo"><?php echo $this->lang->line('low'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pitch-sr" id="pitchMedio" value="2">
                                    <label class="form-check-label" for="pitchMedio"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pitch-sr" id="pitchAlto" value="3">
                                    <label class="form-check-label" for="pitchAlto"><?php echo $this->lang->line('high'); ?></label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('volume'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_volume'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-sr" id="volumeBajoSr" value="1">
                                    <label class="form-check-label" for="volumeBajoSr"><?php echo $this->lang->line('low'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-sr" id="volumeMedioSr" value="2">
                                    <label class="form-check-label" for="volumeMedioSr"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-sr" id="volumeAltoSr" value="3">
                                    <label class="form-check-label" for="volumeAltoSr"><?php echo $this->lang->line('high'); ?></label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('gender_voice'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_gender_voice'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender-sr" id="genderFemaleSr" value="1">
                                    <label class="form-check-label" for="genderFemaleSr"><?php echo $this->lang->line('female'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender-sr" id="genderMasculineSr" value="2">
                                    <label class="form-check-label" for="genderMasculineSr"><?php echo $this->lang->line('male'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('links'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_links'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-sr" id="speak-link-sr" value="1">
                                    <label class="form-check-label" for="speak-link-sr"><?php echo $this->lang->line('read_normal'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-sr" id="different-voice-link-sr" value="2">
                                    <label class="form-check-label" for="different-voice-link-sr"><?php echo $this->lang->line('change_voice'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-sr" id="sound-effect-link-sr" value="3">
                                    <label class="form-check-label" for="sound-effect-link-sr"><?php echo $this->lang->line('play_effect'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-sr" id="none-link-sr" value="4">
                                    <label class="form-check-label" for="none-link-sr"><?php echo $this->lang->line('no_read_link'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
