<div class="tab-pane fade" id="narrator" role="tabpanel" aria-labelledby="narrator-tab">

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
                                    <input class="form-check-input" type="radio" name="speed-nr" id="speedBajo" value="1">
                                    <label class="form-check-label" for="speedBajo"><?php echo $this->lang->line('low'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="speed-nr" id="speedMedio" value="2">
                                    <label class="form-check-label" for="speedMedio"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="speed-nr" id="speedAlto" value="3">
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
                                    <input class="form-check-input" type="radio" name="pitch-nr" id="pitchBajo" value="1">
                                    <label class="form-check-label" for="pitchBajo"><?php echo $this->lang->line('low'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pitch-nr" id="pitchMedio" value="2">
                                    <label class="form-check-label" for="pitchMedio"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pitch-nr" id="pitchAlto" value="3">
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
                        <p><?php echo $this->lang->line('message_volume'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-narrator" id="volumeBajo" value="1">
                                    <label class="form-check-label" for="volumeBajo"><?php echo $this->lang->line('low'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-narrator" id="volumeMedio" value="2">
                                    <label class="form-check-label" for="volumeMedio"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-narrator" id="volumeAlto" value="3">
                                    <label class="form-check-label" for="volumeAlto"><?php echo $this->lang->line('high'); ?></label>
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
                        <p><?php echo $this->lang->line('message_gender_voice'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender-narrator" id="genderFemaleNarrator" value="1">
                                    <label class="form-check-label" for="genderFemaleNarrator"><?php echo $this->lang->line('female'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender-narrator" id="genderMasculineNarrator" value="2">
                                    <label class="form-check-label" for="genderMasculineNarrator"><?php echo $this->lang->line('male'); ?></label>
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
                        <p><?php echo $this->lang->line('message_links'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="speak-link-narrator" value="1">
                                    <label class="form-check-label" for="speak-link-narrator"><?php echo $this->lang->line('read_normal'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="different-voice-link-narrator" value="2">
                                    <label class="form-check-label" for="different-voice-link-narrator"><?php echo $this->lang->line('change_voice'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="sound-effect-link-narrator" value="3">
                                    <label class="form-check-label" for="sound-effect-link-narrator"><?php echo $this->lang->line('play_effect'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="none-link-narrator" value="4">
                                    <label class="form-check-label" for="none-link-narrator"><?php echo $this->lang->line('no_read_link'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('highlight_mode'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_highlight'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="word-highlight-narrator" value="1">
                                    <label class="form-check-label" for="word-highlight-narrator"><?php echo $this->lang->line('word'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="line-highlight-narrator" value="2">
                                    <label class="form-check-label" for="line-highlight-narrator"><?php echo $this->lang->line('line'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="sentence-highlight-narrator" value="3">
                                    <label class="form-check-label" for="sentence-highlight-narrator"><?php echo $this->lang->line('sentence'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="paragraph-highlight-narrator" value="4">
                                    <label class="form-check-label" for="paragraph-highlight-narrator"><?php echo $this->lang->line('paragraph'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('read_mode'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_read_mode'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-word-narrator" value="1">
                                    <label class="form-check-label" for="ru-word-narrator"><?php echo $this->lang->line('word_to_word'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-line-narrator" value="2">
                                    <label class="form-check-label" for="ru-line-narrator"><?php echo $this->lang->line('line_to_line'); ?>.</label>
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
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-sentence-narrator" value="3">
                                    <label class="form-check-label" for="ru-sentence-narrator"><?php echo $this->lang->line('sentence_to_sentence'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-paragraph-narrator" value="4">
                                    <label class="form-check-label" for="ru-paragraph-narrator"><?php echo $this->lang->line('paragraph_to_paragraph'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
