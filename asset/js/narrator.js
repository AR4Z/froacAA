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
    // cada una de las configuraciones toma el valor que hay en cache o el default
    $('#input-speed-speech-narrator').val(localStorage['speed_reading_nr'] || 180).change();
    $("input[name='pitch-narrator'][value=" + (localStorage['pitch_id_nr'] || '2') + "]").prop('checked', true).change();
    $("input[name='volume-narrator'][value=" + (localStorage['volume_id_nr'] || '2') + "]").prop('checked', true).change();
    $("input[name='gender-narrator'][value=" + (localStorage['voice_gender_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='link-narrator'][value=" + (localStorage['links_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='highlight-narrator'][value=" + (localStorage['highlight_id_nr'] || '1') + "]").prop('checked', true).change();
    $("input[name='reading-unit-narrator'][value=" + (localStorage['reading_unit_id_nr'] || '1') + "]").prop('checked', true).change();
});

$("input[name='pitch-narrator']").change(function(){
    let pitchIDselected = $("input[name='pitch-narrator']:checked").val();
    setPitchNarrator(pitchIDselected);
});

$("input[name='volume-narrator']").change(function(){
    let volumeIDselected = $("input[name='volume-narrator']:checked").val();
    setVolumeNarrator(volumeIDselected);
});

$("input[name='gender-narrator']").change(function(){
    let genderIDselected = $("input[name='gender-narrator']:checked").val();
    setVoiceGenderNarrator(genderIDselected);
});

$("input[name='link-narrator']").change(function(){
    let linkIDselected = $("input[name='link-narrator']:checked").val();
    setLinkNarrator(linkIDselected);
});

$("input[name='highlight-narrator']").change(function(){
    let highlightIDselected = $("input[name='highlight-narrator']:checked").val();
    setHighlightNarrator(highlightIDselected);
});

$("input[name='reading-unit-narrator']").change(function(){
    let readingUnitIDselected = $("input[name='reading-unit-narrator']:checked").val();
    setReadingUnitNarrator(readingUnitIDselected);
});


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
    $('#input-speed-speech-narrator').val(180).change();
    $("input[name='pitch-narrator'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='volume-narrator'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='gender-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='link-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='highlight-narrator'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='reading-unit-narrator'][value=" + ('1') + "]").prop('checked', true).change();
}

function setSpeechSpeedNarrator(speed){
    console.log("swswej");
    if((speed != localStorage['speed_reading_nr']) && needNarrator){
        console.log("trae" +localStorage['speed_reading_nr']);
        updateValuesNarratorInSession(['speed_reading'], [speed]);
    }
    localStorage['speed_reading_nr'] = speed;
}

function setPitchNarrator(pitchID) {
    if((pitchID != localStorage['pitch_id_nr']) && needNarrator) {
        updateValuesNarratorInSession(['pitch_id'], [pitchID]);
    }
    localStorage['pitch_id_nr'] = pitchID;
}

function setVolumeNarrator(volumeID) {
    if((volumeID != localStorage['volume_id_nr']) && needNarrator) {
        updateValuesNarratorInSession(['volume_id'], [volumeID]);
    }
    localStorage['volume_id_nr'] = volumeID;
}

function setVoiceGenderNarrator(genderID) {
    if((genderID != localStorage['voice_gender_id_nr']) && needNarrator) {
        updateValuesNarratorInSession(['voice_gender_id'], [genderID]);
    }
    localStorage['voice_gender_id_nr'] = genderID;
}

function setLinkNarrator(linkID) {
    if((linkID != localStorage['links_id_nr']) && needNarrator) {
        updateValuesNarratorInSession(['links_id'], [linkID]);
    }
    localStorage['links_id_nr'] = linkID;

}

function setHighlightNarrator(highlightID) {
    if((highlightID != localStorage['highlight_id_nr']) && needNarrator) {
        updateValuesNarratorInSession(['highlight_id'], [highlightID]);
    }
    localStorage['highlight_id_nr'] = highlightID;
}

function setReadingUnitNarrator(readingUnitID) {
    if((readingUnitID != localStorage['reading_unit_id_nr']) && needNarrator) {
        updateValuesNarratorInSession(['reading_unit_id'], [readingUnitID]);
    }
    localStorage['reading_unit_id_nr'] = readingUnitID;
}
