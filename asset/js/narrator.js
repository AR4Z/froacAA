$(document).ready(function(){
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
            loadNarrator();
        });
    } else {
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

function loadNarrator(){
     // cada una de las configuraciones toma el valor que hay en cache o el default
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
        let ps = iframeDocument.getElementsByTagName('p')[6];
        separateInLines(ps);
        loadLineStyle();
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

        p text-line#reading {
            background-color: #FFFF00;
        } 
    </style>`

    $('iframe').contents().find('head').append(style);
}

function changeLine(){
    let indexCurrentLine = $('iframe').contents().find('#reading').attr('index');
    $('iframe').contents().find("text-line[index='" + indexCurrentLine + "']").removeAttr('id');
    $('iframe').contents().find("text-line[index='" + (parseInt(indexCurrentLine) + 1) + "']").attr('id', 'reading');
}


function separateInLines(ps){
    let pLining = lining(ps, {
        'autoResize':true,
        'lineClass':'line-narrator'
    });

    
    pLining.relining();
}

function setReadingUnitNarrator(readingUnitID, setDefault) {
    if((readingUnitID != localStorage['reading_unit_id_nr']) && needNarrator && !setDefault) {

        updateValuesNarratorInSession(['reading_unit_id'], [readingUnitID]);
    }
    $("input[name='reading-unit-narrator']").data('default', false);
    localStorage['reading_unit_id_nr'] = readingUnitID;
}
