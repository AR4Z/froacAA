<div class="tab-pane fade" id="keyboard-cf" role="tabpanel" aria-labelledby="keyboard-tab">
    <div class="d-flex flex-row flex-nowrap">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('keyboard_size'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_kb_size'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="keyboard-size" id="smallkb"
                                        value="1">
                                    <label class="form-check-label" for="smallkb"><?php echo $this->lang->line('small'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="keyboard-size" id="mediumkb"
                                        value="2">
                                    <label class="form-check-label" for="mediumkb"><?php echo $this->lang->line('medium'); ?></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="keyboard-size" id="largekb"
                                        value="3">
                                    <label class="form-check-label" for="largekb"><?php echo $this->lang->line('big'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem; min-width: 18rem;">
            <div class="card-header text-center">
                <span>
                    <b><?php echo $this->lang->line('sound'); ?>
                    </b>
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_kb_sound'); ?></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <br/>
                        <div class="form-check checkbox-slider--b">
                            <label>
                                <input name="play_key_sound" type="checkbox"/>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <div id="useKeyboardDiv" class="card bg-light mb-3" style="max-width: 18rem; min-width: 18rem;">
            <div class="card-header text-center">
                <span>
                    <b><?php echo $this->lang->line('keyboard'); ?>
                    </b>
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('use_kb'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <br/>
                        <div class="form-check checkbox-slider--b">
                            <label>
                                <input name="useKeyboard" type="checkbox"/>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
