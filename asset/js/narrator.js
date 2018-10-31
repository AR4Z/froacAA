let loLang;
function dataNarrator() {
    audioSrcs = []
    // voice narrator config
    cfgVoiceNarrator = {
        rate: 1,
        pitch: 1,
        volume: 0.5,
    };

    // class that should ignored for narrator
    srClass = {
        'sr-av': true,
        'js-sr-av': true,
    }

    // verifico si hay una sesion iniciada y si el usuario necesita usar narrador para cargar los valores desde la DB
    if (session_user && needNarrator) {
        localStorage['speed_reading_nr'] = preferencesNarrator['speed_reading'];
        localStorage['pitch_nr'] = preferencesNarrator['pitch_nr'];
        localStorage['volume_id_nr'] = preferencesNarrator['volume_id'];
        localStorage['voice_gender_id_nr'] = preferencesNarrator['voice_gender_id'];
        localStorage['links_id_nr'] = preferencesNarrator['links_id'];
        localStorage['highlight_id_nr'] = preferencesNarrator['highlight_id'];
        localStorage['reading_unit_id_nr'] = preferencesNarrator['reading_unit_id'];
        localStorage['read_puncts'] = preferencesNarrator['read_puncts'];
        localStorage['punct_signs'] = preferencesNarrator['punct_signs'];
    }

    loadLineStyle();
    loadTreeNarrator();
    try {
        treeNarrator.nextNode();
    } catch {
        console.log("temporal");
    }
    loadNarrator();
}


$(window).keydown(function (event) {
    if (event.ctrlKey && event.keyCode == 69) {
        narrator();
        event.preventDefault();
    }
});

// changes methods for narrator settings
//**********************************************************************************************/
$("input[name='speed-nr']").change(function () {
    let speedIDselected = $("input[name='speed-nr']:checked").val();

    setSpeechSpeedNarrator(speedIDselected);
});

$("input[name='pitch-nr']").change(function () {
    let pitchIDselected = $("input[name='pitch-nr']:checked").val();

    setPitchNarrator(pitchIDselected);
});

$("input[name='volume-narrator']").change(function () {
    let volumeIDselected = $("input[name='volume-narrator']:checked").val();
    setVolumeNarrator(volumeIDselected, $(this).data('default'));
});

$("input[name='gender-narrator']").change(function () {
    let genderIDselected = $("input[name='gender-narrator']:checked").val();
    setVoiceGenderNarrator(genderIDselected, $(this).data('default'));
});

$("input[name='link-narrator']").change(function () {
    let linkIDselected = $("input[name='link-narrator']:checked").val();
    setLinkNarrator(linkIDselected, $(this).data('default'));
});

$("input[name='highlight-narrator']").change(function () {
    let highlightIDselected = $("input[name='highlight-narrator']:checked").val();
    setHighlightNarrator(highlightIDselected, $(this).data('default'));
});

$("input[name='reading-unit-narrator']").change(function () {
    let readingUnitIDselected = $("input[name='reading-unit-narrator']:checked").val();
    setReadingUnitNarrator(readingUnitIDselected, $(this).data('default'));
});

$("input[name='punctSigns']").change(function () {
    let punctSigns = $(this).val();
    let noLetters = punctSigns.replace(/[^,.;:¿?¡!\(\)\[\]\"\-\*\']/g, '');
    if (noLetters == '') {
        noLetters = ".,;?";
    }
    $(this).val(noLetters);
    $("input[name='readPuncts']").prop('checked', localStorage['read_puncts'] == 'true').change();
});

$("input[name='readPuncts']").change(function () {
    // decided if user use read punctutation 
    if ($(this).prop("checked")) {
        // decide if a user is logged in to save their preferences in the db
        if (session_user && needNarrator && (localStorage['read_puncts'] != "true" || localStorage['punct_signs'] != $("input[name='punctSigns']").val()) && !($(this).data('default'))) {
            updateValuesNarratorInSession(['read_puncts', 'punct_signs'], ["true", $("input[name='punctSigns']").val()]);
        }
        // show input signs for user can change the signs
        $('#div-punct-signs').show();

        // save decision in local storage
        localStorage['read_puncts'] = "true";

        // set signs punct in config voice
        // when its true then send puncts that want to read
        cfgVoiceNarrator['punct'] = $("input[name='punctSigns']").val();
    } else {
        // decide if a user is logged in to save their preferences in the db
        if (session_user && needNarrator && (localStorage['read_puncts'] != "false") && !($(this).data('default'))) {
            updateValuesNarratorInSession(['read_puncts'], ["false"]);
        }

        // hide signs input for user cannot change the signs
        $('#div-punct-signs').hide();

        // save in local storage 
        localStorage['read_puncts'] = "false";

        // set signs punct in config voice = false
        cfgVoiceNarrator['punct'] = $(this).prop('checked');
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $(this).data('default', false);
    localStorage['punct_signs'] = $("input[name='punctSigns']").val();
});


function textIsALink(node) {
    let currentNode = node;
    while (currentNode) {
        if (currentNode.tagName == 'A') {
            return {
                isLink: true,
                nodeLink: currentNode,
            };
        } else {
            currentNode = currentNode.parentNode;
        }
    }
    return {
        isLink: false,
    };
}

function shouldBeignored(node) {
    let currentNode = node;
    while (currentNode) {
        if (srClass[$(currentNode).attr('class')]) {
            return true;
        } else {
            currentNode = currentNode.parentNode;
        }
    }
    return false;
}


function nodeTypeIsText(node) {
    let chNodes = node.childNodes;
    console.log(chNodes);
    for (let indexNode = 0; indexNode < chNodes.length; indexNode++) {
        const chNode = chNodes[indexNode];
        //console.log("is text?");
        if (chNode.nodeType === 3) {
            parentElementText = chNode.parentElement;
            textReading = chNode.nodeValue;
            //console.log(textReading)
        }
        return (chNode.nodeType === 3) && (chNode.nodeValue != '\n');
    }
    return false;
}


function cleanText(txt) {
    if (txt[0] == '-') {
        txt = '\\' + txt;
    }
    return txt;
}

function narrator() {
    removeHighlightToText();


    if (typeof (Worker) !== "undefined") {
        if (textIsALink(treeNarrator.currentNode)['isLink']) {
            readLink();
        }
        switch (localStorage['reading_unit_id_nr']) {
            case '1':
                {
                    switch (localStorage['highlight_id_nr']) {
                        case '1':
                            {
                                let HTMLwords = splitInWords(treeNarrator.currentNode.parentNode);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iWord = 0; iWord < HTMLwords.length; iWord++) {
                                    const wordElement = HTMLwords[iWord];
                                    let txt = cleanText(wordElement.textContent);
                                    queueForSpeech.push(txt);
                                    htmlElements.push([wordElement]);
                                }

                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];

                                break;
                            }
                        case '2':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const lineElement = HTMLlines[iLine];
                                    let words = lineElement.textContent.split(' ');

                                    for (let iWord = 0; iWord < words.length; iWord++) {
                                        let txt = cleanText(words[iWord]);

                                        queueForSpeech.push(txt);
                                        htmlElements.push([lineElement]);
                                    }
                                }
                                break;
                            }
                        case '3':
                            {
                                let HTMLSentences = splitInSentences(treeNarrator.currentNode.parentNode);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let i = 0; i < HTMLSentences.length; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                                    const sentenceElement = HTMLSentences[iSentence];
                                    let words = sentenceElement.textContent.split(' ');

                                    for (let iWord = 0; iWord < words.length; iWord++) {
                                        var txt = cleanText(words[iWord]);

                                        queueForSpeech.push(txt);
                                        htmlElements.push([sentenceElement]);
                                    }

                                }
                                break;
                            }
                        case '4':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const lineElement = HTMLlines[iLine];
                                    let words = lineElement.textContent.split(' ');

                                    for (let iWord = 0; iWord < words.length; iWord++) {
                                        var txt = cleanText(words[iWord]);

                                        queueForSpeech.push(txt);
                                        htmlElements.push(HTMLlines);
                                    }
                                }
                                break;
                            }
                    }
                    break;
                }
            case '2':
                {
                    switch (localStorage['highlight_id_nr']) {
                        case '1':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                let HTMLWords = [];
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    HTMLWords.push(splitInWords(HTMLlines[iLine]));
                                }

                                for (let iWords = 0; iWords < HTMLWords.length; iWords++) {
                                    const wordsLineElements = HTMLWords[iWords];
                                    for (let iWord = 0; iWord < wordsLineElements.length; iWord++) {
                                        let txt = cleanText(wordsLineElements[iWord].textContent);

                                        queueForSpeech.push(txt);
                                        htmlElements.push([wordsLineElements[iWord]]);
                                    }
                                }
                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];
                                break;
                            }
                        case '2':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const lineElement = HTMLlines[iLine];

                                    queueForSpeech.push(lineElement.textContent);
                                    htmlElements.push([lineElement]);
                                }

                                break;
                            }
                        case '3':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                let HTMLSentences = [];
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    HTMLSentences.push(splitInSentences(HTMLlines[iLine]));
                                }

                                for (let iSentences = 0; iSentences < HTMLSentences.length; iSentence++) {
                                    const sentencesLineElements = HTMLSentences[iSentences];

                                    for (let iSentence = 0; iSentence < sentencesLineElements.length; iSentence++) {
                                        let txt = cleanText(sentencesLineElements[iSentence].textContent);

                                        queueForSpeech.push(txt);
                                        htmlElements.push([sentencesLineElements[iSentence]]);
                                    }
                                }
                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];
                                break;
                            }
                        case '4':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const lineElement = HTMLlines[iLine];

                                    queueForSpeech.push(lineElement.textContent);
                                    htmlElements.push(HTMLlines);
                                }
                                break;
                            }
                    }
                    break;
                }
            case '3':
                {
                    switch (localStorage['highlight_id_nr']) {
                        case '1':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                let HTMLWords = [];
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    HTMLWords.push(splitInWords(HTMLlines[iLine]));
                                }

                                for (let iWords = 0; iWords < HTMLWords.length; iWords++) {
                                    const wordsLineElements = HTMLWords[iWords];
                                    for (let iWord = 0; iWord < wordsLineElements.length; iWord++) {
                                        let txt = cleanText(wordsLineElements[iWord].textContent);

                                        queueForSpeech.push(txt);
                                        htmlElements.push([wordsLineElements[iWord]]);
                                    }
                                }
                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];
                                break;
                            }
                        case '2':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                htmlElements = [];
                                queueForSpeech = [];
                                let HTMLSentences = [];

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    HTMLSentences.push(splitInSentences(HTMLlines[iLine]));
                                }

                                for (let iSentences = 0; iSentences < HTMLSentences.length; iSentences++) {
                                    const sentencesInLineElements = HTMLSentences[iSentences];

                                    for (let iSentence = 0; iSentence < sentencesInLineElements.length; iSentence++) {
                                        let txt = cleanText(sentencesInLineElements[iSentence].textContent);

                                        queueForSpeech.push(txt);
                                        htmlElements.push([getParentLine(sentencesInLineElements[iSentence])]);
                                    }
                                }

                                treeNarrator.currentNode = HTMLSentences[(HTMLSentences.length - 1)][HTMLSentences[(HTMLSentences.length - 1)].length - 1].childNodes[0];
                                break;
                            }
                        case '3':
                            {
                                let HTMLSentences = splitInSentences(treeNarrator.currentNode.parentNode);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                                    const sentenceElement = HTMLSentences[iSentence];
                                    let txt = cleanText(sentenceElement.textContent);

                                    queueForSpeech.push(txt);
                                    htmlElements.push([sentenceElement]);
                                }

                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];
                                break;
                            }
                        case '4':
                            {

                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                let HTMLSentences = [];
                                queueForSpeech = [];
                                htmlElements = [];


                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const sentencesInLineElements = splitInSentences(HTMLlines[iLine]);

                                    for (let iSentences = 0; iSentences < sentencesInLineElements.length; iSentences++) {
                                        HTMLSentences.push(sentencesInLineElements[iSentences]);
                                    }
                                }

                                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                                    const sentenceElement = HTMLSentences[iSentence];
                                    let txt = cleanText(sentenceElement.textContent);

                                    queueForSpeech.push(txt);
                                    htmlElements.push(HTMLlines);
                                }

                                treeNarrator.currentNode = HTMLSentences[HTMLSentences.length - 1].childNodes[0];
                                break;
                            }
                    }
                    break;
                }
            case '4':
                {
                    switch (localStorage['highlight_id_nr']) {
                        case '1':
                            {
                                let HTMLwords = splitInWords(treeNarrator.currentNode.parentNode);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iWord = 0; iWord < HTMLwords.length; iWord++) {
                                    const wordElement = HTMLwords[iWord];
                                    let txt = cleanText(wordElement.textContent);
                                    queueForSpeech.push(txt);
                                    htmlElements.push([wordElement]);
                                }

                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];

                                break;
                            }
                        case '2':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const lineElement = HTMLlines[iLine];

                                    queueForSpeech.push(lineElement.textContent);
                                    htmlElements.push([lineElement]);
                                }

                                break;
                            }
                        case '3':
                            {
                                let HTMLSentences = splitInSentences(treeNarrator.currentNode.parentNode);
                                queueForSpeech = [];
                                htmlElements = [];

                                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                                    const sentenceElement = HTMLSentences[iSentence];
                                    let txt = cleanText(sentenceElement.textContent);

                                    queueForSpeech.push(txt);
                                    htmlElements.push([sentenceElement]);
                                }

                                treeNarrator.currentNode = htmlElements[(htmlElements.length - 1)][htmlElements[(htmlElements.length - 1)].length - 1].childNodes[0];
                                break;
                            }
                        case '4':
                            {
                                let HTMLlines = Array.prototype.slice.call(splitInLines(treeNarrator.currentNode.parentNode), 0);
                                let txt = "";
                                queueForSpeech = [];
                                htmlElements = [];


                                for (let i = 0; i < HTMLlines.length - 1; i++) {
                                    treeNarrator.nextNode();
                                }

                                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                                    const lineElement = HTMLlines[iLine];

                                    txt += cleanText(lineElement.textContent);
                                    htmlElements.push(HTMLlines);
                                }
                                queueForSpeech.push(txt);
                                break;
                            }
                    }
                    break;
                }
            default:
                break;
        }

        createUtterancesNarrator(queueForSpeech);
        playQueue();

    } else {
        console.log("not support web worker :(!");
    }
}

function createUtterancesNarrator(text) {
    for (let index = 0; index < text.length; index++) {
        const element = text[index];
        audioSrcs[index] = new SpeechSynthesisUtterance(element);
        audioSrcs[index].onstart = clearQueue;
        audioSrcs[index].onend = nextElement;        
        audioSrcs[index].pitch = cfgVoiceNarrator.pitch;
        audioSrcs[index].volume = cfgVoiceNarrator.volume;
        audioSrcs[index].rate = cfgVoiceNarrator.rate;
        
        if(loLang == "en") {
            audioSrcs[index].lang = "en-GB";
            audioSrcs[index].voice = synth.getVoices()[57];
        } else if(loLang == "pt") {
            console.log("postugures")
            audioSrcs[index].lang = "pt-BR";
            audioSrcs[index].voice = synth.getVoices()[46];
        } else {
            audioSrcs[index].lang = "es-419";
            audioSrcs[index].voice = synth.getVoices()[65];
        }
        
    }
}


function splitInSentences(node) {
    $(node).blast({
        delimiter: "sentence",
        search: false,
        tag: "span",
        customClass: "sentence",
        generateIndexID: true,
        generateValueClass: false,
        stripHTMLTags: false,
        returnGenerated: false,
        aria: true
    });
    let sentenceElms = Array.prototype.slice.call(node.getElementsByClassName('sentence'), 0);
    let validSentenceElms = sentenceElms.filter(sentenceElm => $(sentenceElm).is(':visible') && !$(sentenceElm).is(':hidden'));

    return validSentenceElms;
}

function splitInWords(node) {
    $(node).blast({
        delimiter: "word",
        search: false,
        tag: "span",
        customClass: "word",
        generateIndexID: true,
        generateValueClass: false,
        stripHTMLTags: false,
        returnGenerated: false,
        aria: true
    });
    let wordElms = Array.prototype.slice.call(node.getElementsByClassName('word'), 0);
    let validWordElms = wordElms.filter(wordElm => $(wordElm).is(':visible') && !$(wordElm).is(':hidden'));

    return validWordElms;
}

function splitInLines(node) {
    elmLining = lining(node, {
        'autoResize': true,
        'lineClass': 'my-class',
    });
    if (node.getElementsByTagName('text-line').length != 0) {
        return node.getElementsByTagName('text-line');
    } else {
        treeNarrator.nextNode();
        return [getParentLine(node)]
    }
}


function getParentLine(nodeWord) {
    return nodeWord.getElementsByTagName('TEXT-LINE')[0] || $(nodeWord).closest('TEXT-LINE')[0];
}


function playQueue() {
    synth.speak(audioSrcs[0]);
}


function clearQueue() {
    console.log("CLEAR!");
    removeHighlightToText();
    setHighlightToText(htmlElements[0]);
    audioSrcs.splice(0, 1);
    htmlElements.splice(0, 1);
}


function removeHighlightToText() {
    $('iframe').contents().find('.reading').removeClass('reading');
}

function setHighlightToText(listElements) {
    for (let j = 0; j < listElements.length; j++) {
        const element = listElements[j];
        element.classList.add('reading');
    }
}


function nextElement() {
    loadNarrator();
    if (audioSrcs.length >= 1) {
        console.log("OTRO!!")
        playQueue();
    } else {
        if (treeNarrator.nextNode()) {
            try {
                $('iframe').contents().find('.blast-root').blast(false);
                elmLining.unlining();
            } catch {
                console.log("swsw");
            }
            narrator();
        } else {
            return;
        }
    }
}

function readLink() {
    switch (localStorage['links_id_nr']) {
        case '1':
            break;
        case '2':
            cfgVoiceNarrator.variant = 'whisper';
            break;
        case '3':
            let playerClick = new Howl({
                src: [base_url + "asset/audios/click.mp3"]
            });
            playerClick.play();
            break;
        case '4':
            break;
        default:
            break;
    }
}


function loadNarrator() {
    if (localStorage['read_puncts'] == 't') {
        console.log("change value");
        localStorage['read_puncts'] = 'true';
    } else if (localStorage['read_puncts'] == 'f') {
        console.log("change value1");
        localStorage['read_puncts'] = 'false';
    }
    // cada una de las configuraciones toma el valor que hay en localStorage o el default
    $("input[name='speed-nr'][value=" + (localStorage['speed_reading_nr'] || '2') + "]").prop('checked', true).change();
    $("input[name='pitch-nr'][value=" + (localStorage['pitch_nr'] || '2') + "]").prop('checked', true).change();
    $("input[name='volume-narrator'][value=" + (localStorage['volume_id_nr'] || '2') + "]").prop('checked', true).change();
    $("input[name='gender-narrator'][value=" + (localStorage['voice_gender_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='link-narrator'][value=" + (localStorage['links_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='highlight-narrator'][value=" + (localStorage['highlight_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='reading-unit-narrator'][value=" + (localStorage['reading_unit_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='punctSigns']").val(localStorage['punct_signs'] || ".,;?").change();
    $("input[name='readPuncts']").prop('checked', localStorage['read_puncts'] == 'true').change();
}


function updateValuesNarratorInSession(names_preferences_narrator, values) {
    $.ajax({
        url: base_url + "usuario/update_preferences_narratorSession",
        type: "POST",
        dataType: "json",
        data: {
            "username": session_user['username'],
            "names_preferences_narrator": names_preferences_narrator,
            "values": values
        },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}


function setDefaultValuesNarrator() {
    // el data-default sirve para realizar solo una peticion cuando se actualicen todos los valores
    $("input[name='speed-nr']").data('default', true);
    $("input[name='speed-nr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='pitch-nr']").data('default', true);
    $("input[name='pitch-nr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='volume-narrator']").data('default', true);
    $("input[name='volume-narrator'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='gender-narrator']").data('default', true);
    $("input[name='gender-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='link-narrator']").data('default', true);
    $("input[name='link-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='highlight-narrator']").data('default', true);
    $("input[name='highlight-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='reading-unit-narrator']").data('default', true);
    $("input[name='reading-unit-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='readPuncts']").data('default', true);
    $("input[name='readPuncts']").prop('checked', false).change();
    $("input[name='punctSigns']").data('default', true);
    $("input[name='punctSigns']").val(".,;?").change();

    if (session_user) {
        let names_preferences_narrator = ['speed_reading', 'pitch_nr', 'volume_id', 'voice_gender_id', 'links_id', 'highlight_id', 'reading_unit_id', 'read_puncts', 'punct_signs'];
        let values = [2, 2, 2, 1, 1, 1, 1, false, ".,;?"];
        updateValuesNarratorInSession(names_preferences_narrator, values);
    }

}

function setSpeechSpeedNarrator(speed, setDefault) {
    let validSpeeds = {
        '1':0.5,
        '2':1,
        '3':2
    }

    let validSpeed = validSpeeds[speed];
    // decide if a user is logged in to save their preferences in the db
    if ((speed != localStorage['speed_reading_nr']) && needNarrator && !setDefault) {
        console.log("trae" + localStorage['speed_reading_nr']);
        updateValuesNarratorInSession(['speed_reading'], [speed]);
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("input[name='speed-nr']").data('default', false);

    // save in local storage
    localStorage['speed_reading_nr'] = speed;

    // save in voice config
    cfgVoiceNarrator.rate = validSpeed;
}

function setPitchNarrator(pitch, setDefault) {
    let validPitchs = {
        '1': 0.5,
        '2': 1,
        '3': 2,
    }

    let validPitch = validPitchs[pitch];

    // decide if a user is logged in to save their preferences in the db
    if ((pitch != localStorage['pitch_nr']) && needNarrator && !setDefault) {
        updateValuesNarratorInSession(['pitch_nr'], [pitch]);
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("input[name='pitch-nr']").data('default', false);

    // save in local storage
    localStorage['pitch_nr'] = pitch;

    // save in voice config
    cfgVoiceNarrator.pitch = validPitch;
}

function setVolumeNarrator(volumeID, setDefault) {
    // volumes supported by the voice
    let validVolumes = {
        '1': 0.2,
        '2': 0.5,
        '3': 1,
    }
    // volume selected
    let validVolume = validVolumes[volumeID];

    // decide if a user is logged in to save their preferences in the db
    if ((volumeID != localStorage['volume_id_nr']) && needNarrator && !setDefault) {
        updateValuesNarratorInSession(['volume_id'], [volumeID]);
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("input[name='volume-narrator']").data('default', false);

    // save volume in local storage
    localStorage['volume_id_nr'] = volumeID;

    // set voice volume with selected
    cfgVoiceNarrator['volume'] = validVolume;
}

function setVoiceGenderNarrator(genderID, setDefault) {
    let validVoicesGender = {
        '1': 'f5',
        '2': 'm7'
    }

    let validVoiceGender = validVoicesGender[genderID];
    if ((genderID != localStorage['voice_gender_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['voice_gender_id'], [genderID]);
    }
    $("input[name='gender-narrator']").data('default', false);
    localStorage['voice_gender_id_nr'] = genderID;
    cfgVoiceNarrator['variant'] = validVoiceGender;
}

function setLinkNarrator(linkID, setDefault) {
    if ((linkID != localStorage['links_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['links_id'], [linkID]);
    }
    $("input[name='link-narrator']").data('default', false);
    localStorage['links_id_nr'] = linkID;

}

function setHighlightNarrator(highlightID, setDefault) {
    let optsHighlight = {
        '1': 'word',
        '2': 'line',
        '3': 'sentence',
        '4': 'paragraph'
    }
    let selectedOptHighlight = optsHighlight[highlightID];

    if (selectedOptHighlight == 'line') {
        console.log('linesss');
    }


    if ((highlightID != localStorage['highlight_id_nr']) && needNarrator && !setDefault) {
        updateValuesNarratorInSession(['highlight_id'], [highlightID]);
    }
    $("input[name='highlight-narrator']").data('default', false);
    localStorage['highlight_id_nr'] = highlightID;
}

function loadLineStyle() {
    let style = `
    <style id='line-style'>
        .reading {
            background-color: yellow;
        }
    </style>`

    $('iframe').contents().find('head').append(style);
}

function setReadingUnitNarrator(readingUnitID, setDefault) {
    if ((readingUnitID != localStorage['reading_unit_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['reading_unit_id'], [readingUnitID]);
    }
    $("input[name='reading-unit-narrator']").data('default', false);
    localStorage['reading_unit_id_nr'] = readingUnitID;
}


function isValidNode(node) {
    /*if (!$(node).is(':visible') && $(node).is(':hidden')) {
        console.log("invisible")
        return false;
    }

    if ($(node).is(':empty')) {
        console.log("vacio")
        return false;
    }

    if ($(node).prop('tagName') == 'OPTION' && ($(node).attr('selected') != 'selected')) {
        console.log("no selected")
        return false;
    }

    if ($(node).prop('tagName') == 'LABEL') {
        console.log("label")
        return false;
    }
    
    
    if (textIsALink(node)['isLink'] && localStorage['links_id_nr'] == 4) {
        return false;
    }*/

    if (shouldBeignored(node)) {
        console.log("deberia ser ignorado");
        return false;
    }

    if (node.parentElement.tagName == 'OPTION') {
        return false;
    }

    if ($(node.parentElement).is(':hidden') && !$(node.parentElement).is(':visible')) {
        return false;
    }

    if (node.parentElement.tagName == 'SCRIPT') {
        return false;
    }
    if (is_all_ws(node)) {
        console.log("son solo espacios")
        return false;
    }
    return true;
}

function is_all_ws(nod) {
    // Use ECMA-262 Edition 3 String and RegExp features
    return !(/[^\t\n\r ]/.test(nod.textContent.trim()));
}

function loadTreeNarrator() {
    let filter = {
        acceptNode: function (n) {
            if (isValidNode(n)) {
                return NodeFilter.FILTER_ACCEPT;
            } else {
                return NodeFilter.FILTER_SKIP;
            }
        }
    }
    try {
        treeNarrator = iframeDocument.createTreeWalker(iframeDocument.getElementsByTagName('body')[0], NodeFilter.SHOW_TEXT, filter, false);
    } catch {
        console.log("temporal");
    }
}

function loadObserver() {
    let currentNodeIsLink = textIsALink(treeNarrator.currentNode);

    if (currentNodeIsLink.isLink) {
        target = currentNodeIsLink.nodeLink;
    } else {
        target = treeNarrator.currentNode;
    }
    // configuration of the observer:
    var config = {
        attributes: true,
        subtree: false
    };
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

// create an observer instance
var observer = new MutationObserver(function (mutations) {
    treeNarrator.currentNode = mutations[mutations.length - 1].target;
});