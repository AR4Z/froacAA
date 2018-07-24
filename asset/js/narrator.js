$(document).ready(function(){
    // verifico si hay una sesion iniciada y si el usuario necesita usar narrador para cargar los valores desde la DB
    if(session_user && needNarrator){
        localStorage['speed_reading_nr'] = preferencesNarrator['speed_reading_id'];
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
    setGenderNarrator(genderIDselected);
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


function updateValuesInterfazInSession(names_interfaz_preference, values){
    console.log("update in session");

    $.ajax({
        url : base_url+"usuario/update_preferences_interfazSession",
        type : "POST",
        dataType : "json",
        data : { "username": session_user['username'], "names_interfaz_preference":names_interfaz_preference, "values":values},
        success : function(data) {
            console.log(data);
        },
        error : function(data) {
            console.log(data);
        }
    });
}
