<div class="tab-pane fade" id="structural-navigation" role="tabpanel" aria-labelledby="structural-navigation-tab">
    <div class="d-flex flex-row flex-nowrap">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b><?php echo $this->lang->line('nav_strategy'); ?></b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_nav_strategy'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="navigation-strategy" id="depthFirst"
                                        value="1">
                                    <label class="form-check-label" for="depthFirst"><?php echo $this->lang->line('deep'); ?></label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="navigation-strategy" id="breadthFirst"
                                        value="2">
                                    <label class="form-check-label" for="breadthFirst"><?php echo $this->lang->line('breadth'); ?></label>
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
                    <b><?php echo $this->lang->line('table_of_content'); ?>
                    </b>
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p><?php echo $this->lang->line('message_toc'); ?>.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <br/>
                        <div class="form-check checkbox-slider--b">
                            <label>
                                <input name="showTOC" type="checkbox"/>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
