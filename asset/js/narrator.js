$(document).ready(function(){
    
    cfgReproductor = {
        src: [],
        format: ['wav']
    }
    player = new Howl(cfgReproductor);
   
    // voice narrator config

    cfgVoiceNarrator = {
        amplitud: 100,
        wordgap: 0,
        pitch: 50,
        speed: 175,
        variant:'f1',
        volume:1,
        punct:true,
        rawdata:'base64',
    }

    // class that should ignored for narrator
    srClass = {
        'sr-av': true,
        'js-sr-av': true,
    }

    // verifico si hay una sesion iniciada y si el usuario necesita usar narrador para cargar los valores desde la DB
    if(session_user && needNarrator){
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


    // en la vista de LOS (id: lo_view) se tiene un iframe asi que para poder cargar los estilos del usuario
    // se debe esperar a que el iframe haya cargado de modo que el usuario pueda ver sus estilos
    // en ambos html
    if (idView == 'lo_view') {
        $("iframe").on('load', function () {
            loadTreeNarrator();
            treeNarrator.nextNode();
            loadNarrator();
            loadObserver();
            $(window).keydown(function(event) {
                if(event.ctrlKey && event.keyCode == 69) {
                    narrator();
                    event.preventDefault();
                }
            });
        });
    } else {
        loadNarrator();
    }
});


// changes methods for narrator settings
//**********************************************************************************************/
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

$("input[name='punctSigns']").change(function(){
    let punctSigns = $(this).val();
    let noLetters = punctSigns.replace(/[^,.;:¿?¡!\(\)\[\]\"\-\*\']/g, '');
    if(noLetters == ''){
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
//*******************************************************************************************/

function textIsALink(node) {
    let currentNode = node;
    while (currentNode) {
        if (currentNode.tagName == 'A'){
            return {
                isLink:true, 
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
    cfgReproductor.src = [];
    try {
        if(player.playing()){
            player.stop();
            return;
        }
    }
    catch(error) {
        console.error(error);
    }
    while(treeNarrator.currentNode.hasChildNodes() && !nodeTypeIsText(treeNarrator.currentNode)){
        treeNarrator.nextNode();
    }
    
    if(treeNarrator.currentNode.nodeType === 3){
        textReading = treeNarrator.currentNode.nodeValue;
    }
    observer.disconnect();
    loadObserver();
    if (typeof(Worker) !== "undefined") {
        let narratorWorker = new Worker(base_url + 'asset/js/workerNarrator.js');
        narratorWorker.postMessage({'txt':textReading, 'cfgVoiceNarrator':cfgVoiceNarrator});

        narratorWorker.onmessage = function(event) {
            narratorWorker.terminate();
            if(textIsALink(treeNarrator.currentNode)['isLink']){
                readLink();
            } 
            setSrcCfgPlayer("data:audio/wav;base64," + event.data);
            player.init(cfgReproductor);
            player.play();
            player.on('end', function(){
                if(treeNarrator.currentNode.nextSibling  && (treeNarrator.currentNode.nextSibling.parentNode == treeNarrator.currentNode.parentNode) && isValidNode(treeNarrator.currentNode.nextSibling)){
                    treeNarrator.currentNode = treeNarrator.currentNode.nextSibling;
                    narrator();
                } else if(treeNarrator.nextNode()) {
                    narrator();
                } else {
                    return;
                }
              });
            
        }
    } else {
        console.log("not support web worker :(!")
    }


}

function readLink(){
    switch (localStorage['links_id_nr']) {
        case '1':
            break;
        case '2':
            
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


function setSrcCfgPlayer(src) {
    cfgReproductor['src'].push(src);
}

function loadNarrator(){
    if (localStorage['read_puncts'] == 't') {
        console.log("change value");
        localStorage['read_puncts'] = 'true';
    } else if (localStorage['read_puncts'] == 'f') {
        console.log("change value1");
        localStorage['read_puncts'] = 'false';
    }
     // cada una de las configuraciones toma el valor que hay en localStorage o el default
     $('#input-speed-speech-narrator').val(localStorage['speed_reading_nr'] || 175).change();
     $('#input-pitch-narrator').val(localStorage['pitch_nr'] || 50).change();
     $("input[name='volume-narrator'][value=" + (localStorage['volume_id_nr'] || '2') + "]").prop('checked', true).change();
     $("input[name='gender-narrator'][value=" + (localStorage['voice_gender_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='link-narrator'][value=" + (localStorage['links_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='highlight-narrator'][value=" + (localStorage['highlight_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='reading-unit-narrator'][value=" + (localStorage['reading_unit_id_nr'] || '1') + "]").prop('checked', true).change();
     $("input[name='punctSigns']").val(localStorage['punct_signs'] || ".,;?").change();
     $("input[name='readPuncts']").prop('checked', localStorage['read_puncts'] == 'true').change();
     
}


function updateValuesNarratorInSession(names_preferences_narrator, values){
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
    $('#input-speed-speech-narrator').val(175).change();
    $("#input-pitch-narrator").data('default', true);
    $('#input-pitch-narrator').val(50).change();
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

    if(session_user){
        let names_preferences_narrator = ['speed_reading', 'pitch_nr', 'volume_id', 'voice_gender_id', 'links_id', 'highlight_id', 'reading_unit_id', 'read_puncts', 'punct_signs'];
        let values = [175, 50, 2, 1, 1, 1, 1, false, ".,;?"];
        updateValuesNarratorInSession(names_preferences_narrator, values);
    }

}

function setSpeechSpeedNarrator(speed, setDefault){
    // decide if a user is logged in to save their preferences in the db
    if((speed != localStorage['speed_reading_nr']) && needNarrator && !setDefault){
        console.log("trae" +localStorage['speed_reading_nr']);
        updateValuesNarratorInSession(['speed_reading'], [speed]);
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("#input-speed-speech-narrator").data('default', false);

    // save in local storage
    localStorage['speed_reading_nr'] = speed;
    
    // save in voice config
    cfgVoiceNarrator['speed'] = speed;
}

function setPitchNarrator(pitch, setDefault) {
    // decide if a user is logged in to save their preferences in the db
    if((pitch != localStorage['pitch_nr']) && needNarrator && !setDefault) {
        updateValuesNarratorInSession(['pitch_nr'], [pitch]);
    }

     /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("#input-pitch-narrator").data('default', false);
    
    // save in local storage
    localStorage['pitch_nr'] = pitch;

    // save in voice config
    cfgVoiceNarrator['pitch'] = pitch;
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
    if((volumeID != localStorage['volume_id_nr']) && needNarrator && !setDefault) {
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
        '1':'f5',
        '2':'m7'
    }

    let validVoiceGender = validVoicesGender[genderID];
    if((genderID != localStorage['voice_gender_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['voice_gender_id'], [genderID]);
    }
    $("input[name='gender-narrator']").data('default', false);
    localStorage['voice_gender_id_nr'] = genderID;
    cfgVoiceNarrator['variant'] = validVoiceGender;
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
    if(!$(node).is(':visible') && $(node).is(':hidden')) {
        console.log("invisible")
        return false;
    }

    if($(node).is(':empty')){
        console.log("vacio")
        return false;
    }

    if($(node).prop('tagName') == 'OPTION' && ($(node).attr('selected') != 'selected')){
        console.log("no selected")
        return false;
    }
    
    if($(node).prop('tagName') == 'LABEL'){
        console.log("label")
        return false;
    }

    if(shouldBeignored(node)){
        console.log("deberia ser ignorado")
        return false;
    }
    if(is_all_ws(node)){
        console.log("son solo espacios")
        return false;
    }
    return true;
}

function is_all_ws( nod )
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.textContent));
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
 

