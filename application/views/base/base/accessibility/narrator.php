<div class="tab-pane fade" id="narrator" role="tabpanel" aria-labelledby="narrator-tab">

    <div class="d-flex flex-row flex-nowrap">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>VELOCIDAD DE LECTURA</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar la velocidad de lectura. (Palabras por minuto)</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[2]">
                                    <span class="oi oi-minus"></span>
                                </button>
                            </span>
                            <input type="text" name="quant[2]" id="input-speed-speech-narrator" class="form-control input-number" value="175" min="80" max="500" step="1" data-decimals="0" style="text-align:center">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[2]">
                                    <span class="oi oi-plus"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>TONO DE VOZ</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar el tono de voz.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[4]">
                                    <span class="oi oi-minus"></span>
                                </button>
                            </span>
                            <input type="text" name="quant[4]" id="input-pitch-narrator" class="form-control input-number" value="50" min="0" max="99" step="1" data-decimals="0" style="text-align:center">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[4]">
                                    <span class="oi oi-plus"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>VOLUMEN</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar el volumen de voz.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-narrator" id="volumeBajo" value="1">
                                    <label class="form-check-label" for="volumeBajo">Bajo</label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-narrator" id="volumeMedio" value="2">
                                    <label class="form-check-label" for="volumeMedio">Medio</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="volume-narrator" id="volumeAlto" value="3">
                                    <label class="form-check-label" for="volumeAlto">Alto</label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>GENERO DE VOZ</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar el genero de la voz.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender-narrator" id="genderFemaleNarrator" value="1">
                                    <label class="form-check-label" for="genderFemaleNarrator">Femenino</label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender-narrator" id="genderMasculineNarrator" value="2">
                                    <label class="form-check-label" for="genderMasculineNarrator">Masculino</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>ENLACES - LINKS</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar el comportamiento a la hora de leer un enlace.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="speak-link-narrator" value="1">
                                    <label class="form-check-label" for="speak-link-narrator">Leer normal</label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="different-voice-link-narrator" value="2">
                                    <label class="form-check-label" for="different-voice-link-narrator">Cambiar voz</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="sound-effect-link-narrator" value="3">
                                    <label class="form-check-label" for="sound-effect-link-narrator">Reproducir efecto</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="link-narrator" id="none-link-narrator" value="4">
                                    <label class="form-check-label" for="none-link-narrator">No leer enlaces</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>MODO DE RESALTADO</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambiar la porción del texto resaltada mientras se lee el contenido.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="word-highlight-narrator" value="1">
                                    <label class="form-check-label" for="word-highlight-narrator">Palabra</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="line-highlight-narrator" value="2">
                                    <label class="form-check-label" for="line-highlight-narrator">Linea</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="sentence-highlight-narrator" value="3">
                                    <label class="form-check-label" for="sentence-highlight-narrator">Oración</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="highlight-narrator" id="paragraph-highlight-narrator" value="4">
                                    <label class="form-check-label" for="paragraph-highlight-narrator">Párrafo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header text-center"><span><b>MODO DE LECTURA</b></span></div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Cambia la forma en la cual el narrador lee el contenido.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-word-narrator" value="1">
                                    <label class="form-check-label" for="ru-word-narrator">Palabra a Palabra</label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-line-narrator" value="2">
                                    <label class="form-check-label" for="ru-line-narrator">Linea a linea.</label>
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
                                    <label class="form-check-label" for="ru-sentence-narrator">Oración a oración</label>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="reading-unit-narrator" id="ru-paragraph-narrator" value="4">
                                    <label class="form-check-label" for="ru-paragraph-narrator">Párrafo a párrafo</label>
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
                    <b>LEER PUNTUACIÓN
                    </b>
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>Permite leer el nombre de un signo de puntuación cuando se encuentre en el texto.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-check checkbox-slider--b">
                            <label>
                                <input name="readPuncts" type="checkbox"/>
                                <span></span>
                            </label>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
