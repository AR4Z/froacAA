let treeSr;
let cfgVoiceSr = {
    amplitud: 100,
    wordgap: 0,
    pitch: 50,
    speed: 175,
    variant: 'f1',
    volume: 1,
    punct: true,
    rawdata: 'base64',

}

let cfgReproductorSr= {
    src: [],
    format: ['wav']
}
playerSr = new Howl(cfgReproductorSr);


$(document).ready(function(){
    // verifico si hay una sesion iniciada y si el usuario necesita usar screen reader para cargar los valores desde la DB
    if(session_user && needSr){
        localStorage['speed_reading_sr'] = preferencesSr['speed_reading'];
        localStorage['pitch_id_sr'] = preferencesSr['pitch_id'];
        localStorage['volume_id_sr'] = preferencesSr['volume_id'];
        localStorage['voice_gender_id_sr'] = preferencesSr['voice_gender_id'];
        localStorage['links_id_sr'] = preferencesSr['links_id'];
    }
    // cada una de las configuraciones toma el valor que hay en cache o el default
    $('#input-speed-speech-sr').val(localStorage['speed_reading_sr'] || 180).change();
    $("input[name='pitch-sr'][value=" + (localStorage['pitch_id_sr'] || '2') + "]").prop('checked', true).change();
    $("input[name='volume-sr'][value=" + (localStorage['volume_id_sr'] || '2') + "]").prop('checked', true).change();
    $("input[name='gender-sr'][value=" + (localStorage['voice_gender_id_sr'] || '1') + "]").prop('checked', true).change();
    $("input[name='link-sr'][value=" + (localStorage['links_id_sr'] || '1') + "]").prop('checked', true).change();
});

function setDefaultValuesSr(){
    $('#input-speed-speech-sr').data('default', true);
    $('#input-speed-speech-sr').val(180).change();
    $("input[name='pitch-sr']").data('default', true);
    $("input[name='pitch-sr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='volume-sr']").data('default', true);
    $("input[name='volume-sr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='gender-sr']").data('default', true);
    $("input[name='gender-sr'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='link-sr']").data('default', true);
    $("input[name='link-sr'][value=" + ('1') + "]").prop('checked', true).change();

    if(session_user){
        let names_preferences_sr = ['speed_reading', 'pitch_id', 'volume_id', 'voice_gender_id', 'links_id'];
        let values = [180, 2, 2, 1, 1];
        updateValuesSrInSession(names_preferences_sr, values);
    }
}

$("input[name='pitch-sr']").change(function(){
    let pitchIDselected = $("input[name='pitch-sr']:checked").val();
    setPitchSr(pitchIDselected);
});

$("input[name='volume-sr']").change(function(){
    let volumeIDselected = $("input[name='volume-sr']:checked").val();
    setVolumeSr(volumeIDselected);
});

$("input[name='gender-sr']").change(function(){
    let genderIDselected = $("input[name='gender-sr']:checked").val();
    setVoiceGenderSr(genderIDselected);
});

$("input[name='link-sr']").change(function(){
    let linkIDselected = $("input[name='link-sr']:checked").val();
    setLinkSr(linkIDselected);
});

function updateValuesSrInSession(names_preferences_sr, values){
    console.log("update in session");

    $.ajax({
        url : base_url+"usuario/update_preferences_srSession",
        type : "POST",
        dataType : "json",
        data : { "username": session_user['username'], "names_preferences_sr":names_preferences_sr, "values":values},
        success : function(data) {
            console.log(data);
        },
        error : function(data) {
            console.log(data);
        }
    });
}

function setSpeechSpeedSr(speed, setDefault){
    console.log("swswej");
    if((speed != localStorage['speed_reading_sr']) && needSr && !setDefault){
        console.log("trae" +localStorage['speed_reading_sr']);
        updateValuesSrInSession(['speed_reading'], [speed]);
    }
    $('#input-speed-speech-sr').data('default', false);
    localStorage['speed_reading_sr'] = speed;
}

function setPitchSr(pitchID, setDefault) {
    if((pitchID != localStorage['pitch_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['pitch_id'], [pitchID]);
    }
    $("input[name='pitch-sr']").data('default', false);
    localStorage['pitch_id_sr'] = pitchID;
}

function setVolumeSr(volumeID, setDefault) {
    if((volumeID != localStorage['volume_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['volume_id'], [volumeID]);
    }
    $("input[name='volume-sr']").data('default', false);
    localStorage['volume_id_sr'] = volumeID;
}

function setVoiceGenderSr(genderID, setDefault) {
    if((genderID != localStorage['voice_gender_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['voice_gender_id'], [genderID]);
    }
    $("input[name='gender-sr']").data('default', false);
    localStorage['voice_gender_id_sr'] = genderID;
}

function setLinkSr(linkID, setDefault) {
    if((linkID != localStorage['links_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['links_id'], [linkID]);
    }
    $("input[name='link-sr']").data('default', false);
    localStorage['links_id_sr'] = linkID;


}

function loadTreeSr() {
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
        treeSr = document.createTreeWalker(document.getElementsByTagName('body')[0], NodeFilter.SHOW_TEXT, filter, false);
    } catch {
        console.log("temporal");
    }
}

function is_all_ws(node) {
    // Use ECMA-262 Edition 3 String and RegExp features
    return !(/[^\t\n\r ]/.test(node.textContent.trim()));
}

function isValidNode(node) {
    if ($(node.parentElement).is(':hidden') && !$(node.parentElement).is(':visible')) {
        return false;
    }

    if (is_all_ws(node)) {
        console.log("son solo espacios")
        return false;
    }

    return true;
}

function sr() {
    cfgReproductorSr.src[0] = "data:audio/wav;base64," + meSpeak.speak(treeSr.currentNode.textContent, cfgVoiceSr);
    playerSr.init(cfgReproductorSr);
    playerSr.play();
    treeSr.nextNode();
}

