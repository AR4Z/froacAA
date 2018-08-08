$(document).ready(function(){
    srClass = {
        'sr-av': true,
        'js-sr-av': true,
    }
    // verifico si hay una sesion iniciada y si el usuario necesita usar narrador para cargar los valores desde la DB
    if(session_user && needNarrator){
        localStorage['speed_reading_nr'] = preferencesNarrator['speed_reading'];
        localStorage['pitch_id_nr'] = preferencesNarrator['pitch_id'];
        localStorage['volume_id_nr'] = preferencesNarrator['volume_id'];
        localStorage['voice_gender_id_nr'] = preferencesNarrator['voice_gender_id'];
        localStorage['links_id_nr'] = preferencesNarrator['links_id'];
        localStorage['highlight_id_nr'] = preferencesNarrator['highlight_id'];
        localStorage['reading_unit_id_nr'] = preferencesNarrator['reading_unit_id'];
    }


    // en la vista de LOS (id: lo_view) se tiene un iframe asi que para poder cargar los estilos del usuario
    // se debe esperar a que el iframe haya cargado de modo que el usuario pueda ver sus estilos
    // en ambos html
    if (idView == 'lo_view') {
        $("iframe").on('load', function () {
            loadTreeNarrator();
            treeNarrator.nextNode();
            loadVoice();
            loadNarrator();
            loadObserver();
        });
    } else {
        loadVoice();
        loadNarrator();
    }
});

$("input[name='pitch-narrator']").change(function(){
    let pitchIDselected = $("input[name='pitch-narrator']:checked").val();
    setPitchNarrator(pitchIDselected, $(this).data('default'));
});

$("input[name='volume-narrator']").change(function(){
    let volumeIDselected = $("input[name='volume-narrator']:checked").val();
    setVolumeNarrator(volumeIDselected, $(this).data('default'));
});

$("input[name='gender-narrator']").change(function(){
    let genderIDselected = $("input[name='gender-narrator']:checked").val();
    setVoiceGenderNarrator(genderIDselected, $(this).data('default'));
});

$("input[name='link-narrator']").change(function(){
    let linkIDselected = $("input[name='link-narrator']:checked").val();
    setLinkNarrator(linkIDselected, $(this).data('default'));
});

$("input[name='highlight-narrator']").change(function(){
    let highlightIDselected = $("input[name='highlight-narrator']:checked").val();
    setHighlightNarrator(highlightIDselected, $(this).data('default'));
});

$("input[name='reading-unit-narrator']").change(function(){
    let readingUnitIDselected = $("input[name='reading-unit-narrator']:checked").val();
    setReadingUnitNarrator(readingUnitIDselected, $(this).data('default'));
});

function loadVoice(){
    // carga configuración para speak y la voz en el idioma es-la
    meSpeak.loadConfig(base_url+"asset/js/mespeak_config.json");
    meSpeak.loadVoice(base_url+"asset/js/es-la.json");
}

function speakNow(txt){
    // se detiene la reproduccion que este en curso
    meSpeak.stop();

    // reproduce el nuevo texto
    meSpeak.speak(txt, {
        amplitud: 150,
        wordgap:0,
        pitch:50,
        speed: 175,
        variant:'None',
    });
}


function textIsALink(node) {
    let currentNode = node;
    while (currentNode) {
        if (currentNode.tagName == 'A'){
            return {
                isLink:true, 
                nodeLink:currentNode,
            };
        } else {
            currentNode = currentNode.parentNode;
        }    
    }
    return {
        isLink:false,
    };
}

function shouldBeignored(node){
    let currentNode = node;
    while(currentNode){
        if(srClass[$(currentNode).attr('class')]){
            return true;
        } else {
            currentNode = currentNode.parentNode;
        }
    }
    return false;
}


function nodeTypeIsText(node){
    let chNodes = node.childNodes;
    console.log(chNodes);
    for (let indexNode = 0; indexNode < chNodes.length; indexNode++) {
        const chNode = chNodes[indexNode];
        //console.log("is text?");
        if(chNode.nodeType === 3){
            textReading = chNode.nodeValue;
            //console.log(textReading)
        }
        return (chNode.nodeType === 3) && (chNode.nodeValue != '\n');
    }
    return false;
}


function narrator(){
    treeNarrator.nextNode();
    while(treeNarrator.currentNode.hasChildNodes() && !nodeTypeIsText(treeNarrator.currentNode)){
        console.log(treeNarrator.currentNode);
        treeNarrator.nextNode();
    }
    observer.disconnect();
    loadObserver();
    speakNow(textReading);
}


function loadNarrator(){    
     // cada una de las configuraciones toma el valor que hay en localStorage o el default
     $('#input-speed-speech-narrator').val(localStorage['speed_reading_nr'] || 180).change();
     $("input[name='pitch-narrator'][value=" + (localStorage['pitch_id_nr'] || '2') + "]").prop('checked', true).change();
     $("input[name='volume-narrator'][value=" + (localStorage['volume_id_nr'] || '2') + "]").prop('checked', true).change();
     $("input[name='gender-narrator'][value=" + (localStorage['voice_gender_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='link-narrator'][value=" + (localStorage['links_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='highlight-narrator'][value=" + (localStorage['highlight_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='reading-unit-narrator'][value=" + (localStorage['reading_unit_id_nr'] || '1') + "]").prop('checked', true).change();
}


function updateValuesNarratorInSession(names_preferences_narrator, values){
    console.log("update in session");

    $.ajax({
        url : base_url+"usuario/update_preferences_narratorSession",
        type : "POST",
        dataType : "json",
        data : { "username": session_user['username'], "names_preferences_narrator":names_preferences_narrator, "values":values},
        success : function(data) {
            console.log(data);
        },
        error : function(data) {
            console.log(data);
        }
    });
}

function setDefaultValuesNarrator(){
    // el data-default sirve para realizar solo una peticion cuando se actualicen todos los valores
    $("#input-speed-speech-narrator").data('default', true);
    $('#input-speed-speech-narrator').val(180).change();
    $("input[name='pitch-narrator']").data('default', true);
    $("input[name='pitch-narrator'][value=" + ('2') + "]").prop('checked', true).change();
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

    if(session_user){
        let names_preferences_narrator = ['speed_reading', 'pitch_id', 'volume_id', 'voice_gender_id', 'links_id', 'highlight_id', 'reading_unit_id'];
        let values = [180, 2, 2, 1, 1, 1, 1];
        updateValuesNarratorInSession(names_preferences_narrator, values);
    }

}

function setSpeechSpeedNarrator(speed, setDefault){
    console.log("swswej");
    if((speed != localStorage['speed_reading_nr']) && needNarrator && !setDefault){
        console.log("trae" +localStorage['speed_reading_nr']);

        updateValuesNarratorInSession(['speed_reading'], [speed]);
    }
    $("#input-speed-speech-narrator").data('default', false);
    localStorage['speed_reading_nr'] = speed;
}

function setPitchNarrator(pitchID, setDefault) {
    if((pitchID != localStorage['pitch_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['pitch_id'], [pitchID]);
    }
    $("input[name='pitch-narrator']").data('default', false);
    localStorage['pitch_id_nr'] = pitchID;
}

function setVolumeNarrator(volumeID, setDefault) {
    if((volumeID != localStorage['volume_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['volume_id'], [volumeID]);
    }
    $("input[name='volume-narrator']").data('default', false);
    localStorage['volume_id_nr'] = volumeID;
}

function setVoiceGenderNarrator(genderID, setDefault) {
    if((genderID != localStorage['voice_gender_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['voice_gender_id'], [genderID]);
    }
    $("input[name='gender-narrator']").data('default', false);
    localStorage['voice_gender_id_nr'] = genderID;
}

function setLinkNarrator(linkID, setDefault) {
    if((linkID != localStorage['links_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['links_id'], [linkID]);
    }
    $("input[name='link-narrator']").data('default', false);
    localStorage['links_id_nr'] = linkID;

}

function setHighlightNarrator(highlightID, setDefault) {
    let optsHighlight= {
        '1':'word',
        '2':'line',
        '3':'sentence',
        '4':'paragraph'
    }
    let selectedOptHighlight = optsHighlight[highlightID];

    if(selectedOptHighlight == 'line'){
        console.log('linesss');
    }


    if((highlightID != localStorage['highlight_id_nr']) && needNarrator && !setDefault) {
        updateValuesNarratorInSession(['highlight_id'], [highlightID]);
    }
    $("input[name='highlight-narrator']").data('default', false);
    localStorage['highlight_id_nr'] = highlightID;
}

function loadLineStyle(){
    let style =  `
    <style id='line-style'>

        p .line-narrator[last] {
            color: red;
        }

        p text-line#reading-line {
            background-color: #FFFF00;
        } 
    </style>`

    $('iframe').contents().find('head').append(style);
}

function readNthLine(nthline){
    let indexCurrentLine = $('iframe').contents().find('#reading-line').attr('index');
    if(indexCurrentLine != nthline){
        $('iframe').contents().find("text-line[index='" + indexCurrentLine + "']").removeAttr('id');
        $('iframe').contents().find("text-line[index='" + nthline + "']").attr('id', 'reading-line');
    }
}

function nextOrPrevLine(next, prev){
    let indexCurrentLine = $('iframe').contents().find('#reading-line').attr('index') || 0;
    $('iframe').contents().find("text-line[index='" + indexCurrentLine + "']").removeAttr('id');
    if(next){
        $('iframe').contents().find("text-line[index='" + (parseInt(indexCurrentLine) + 1) + "']").attr('id', 'reading-line');
    } else if(prev) {
        $('iframe').contents().find("text-line[index='" + (parseInt(indexCurrentLine) - 1) + "']").attr('id', 'reading-line');
    }
}

function changeParent(){
    treeNarrator.nextSibling();
    treeNarratorChild = iframeDocument.createTreeWalker(treeNarrator.currentNode, NodeFilter.SHOW_ELEMENT, filter, false);
    separateInLines(treeNarrator.currentNode);
    loadLineStyle();
}

function separateInLines(ps){
    if(pLining){
        pLining.unlining();
    }
    pLining = lining(ps, {
        'autoResize':true,
        'lineClass':'line-narrator'
    });
    
    pLining.relining();
    //nextOrPrevLine(true, false);
}

function setReadingUnitNarrator(readingUnitID, setDefault) {
    if((readingUnitID != localStorage['reading_unit_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['reading_unit_id'], [readingUnitID]);
    }
    $("input[name='reading-unit-narrator']").data('default', false);
    localStorage['reading_unit_id_nr'] = readingUnitID;
}


function isValidNode(node) {
    if(!$(node).is(':visible')) {
        return false;
    }

    if($(node).is(':empty')){
        return false;
    }

    if($(node).prop('tagName') == 'OPTION' && $(node).attr('selected') != 'selected'){
        return false;
    }
    
    if($(node).prop('tagName') == 'LABEL'){
        return false;
    }

    if(shouldBeignored(node)){
        return false;
    }

    return true;
}


function loadTreeNarrator(){
    let filter = {
        acceptNode: function (n) {
            if (isValidNode(n)) {
                return NodeFilter.FILTER_ACCEPT;
            } else {
                return NodeFilter.FILTER_SKIP;     
            }
        }
    }
    treeNarrator = iframeDocument.createTreeWalker(iframeDocument.getElementsByTagName('body')[0], NodeFilter.SHOW_ELEMENT, filter, false);
}

function loadObserver(){
    let currentNodeIsLink = textIsALink(treeNarrator.currentNode);

    if(currentNodeIsLink.isLink){
        target = currentNodeIsLink.nodeLink;
    } else {
        target = treeNarrator.currentNode;
    }
     // configuration of the observer:
     var config = { attributes: true, subtree: false };
     // pass in the target node, as well as the observer options
     observer.observe(target, config);
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
    treeNarrator.currentNode = mutations[mutations.length - 1].target;
});
 

