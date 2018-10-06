let treeSr, treeIsIframe = false,flStopSr = false,
    audioSrcsSr = [],
    queueForSpeechSr = [],
    cfgVoiceSr = {
        rate: 1,
        pitch: 1,
        volume: 0.5, 
    };

let synth = window.speechSynthesis;

function dataSr() {
    loadTreeSr(document);
    loadSr();

    hotkeys('ctrl+a,ctrl+d,ctrl+p,ctrl+s', function (event, handler) {
        event.preventDefault()
        let sayEventUtter = new SpeechSynthesisUtterance();

        switch (handler.key) {
            case "ctrl+d":
                nextSr();
                break;
            case "ctrl+p":
                prevSr();
                break;
            case "ctrl+s":
                sayEventUtter.text = "Lector de pantalla encendido";
                sayEventUtter.onend = sr;
                synth.speak(sayEventUtter);
                break;
            case "ctrl+a":
                stopSr();
                break;
        }
    });
}

function loadSr() {
    // verifico si hay una sesion iniciada y si el usuario necesita usar screen reader para cargar los valores desde la DB
    if (session_user && needSr) {
        localStorage['speed_reading_sr'] = preferencesSr['speed_reading_id'];
        localStorage['pitch_id_sr'] = preferencesSr['pitch_id'];
        localStorage['volume_id_sr'] = preferencesSr['volume_id'];
        localStorage['voice_gender_id_sr'] = preferencesSr['voice_gender_id'];
        localStorage['links_id_sr'] = preferencesSr['links_id'];
    }
    // cada una de las configuraciones toma el valor que hay en cache o el default
    $("input[name='speed-sr'][value=" + (localStorage['speed_reading_sr'] || '2') + "]").prop('checked', true).change();
    $("input[name='pitch-sr'][value=" + (localStorage['pitch_id_sr'] || '2') + "]").prop('checked', true).change();
    $("input[name='volume-sr'][value=" + (localStorage['volume_id_sr'] || '2') + "]").prop('checked', true).change();
    $("input[name='gender-sr'][value=" + (localStorage['voice_gender_id_sr'] || '1') + "]").prop('checked', true).change();
    $("input[name='link-sr'][value=" + (localStorage['links_id_sr'] || '1') + "]").prop('checked', true).change();
}


function setDefaultValuesSr() {
    $("input[name='speed-sr']").data('default', true);
    $("input[name='speed-sr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='pitch-sr']").data('default', true);
    $("input[name='pitch-sr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='volume-sr']").data('default', true);
    $("input[name='volume-sr'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='gender-sr']").data('default', true);
    $("input[name='gender-sr'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='link-sr']").data('default', true);
    $("input[name='link-sr'][value=" + ('1') + "]").prop('checked', true).change();

    if (session_user) {
        let names_preferences_sr = ['speed_reading', 'pitch_id', 'volume_id', 'voice_gender_id', 'links_id'];
        let values = [180, 2, 2, 1, 1];
        updateValuesSrInSession(names_preferences_sr, values);
    }
}

$("input[name='speed-sr']").change(function () {
    let speedIDselected = $("input[name='speed-sr']:checked").val();

    setSpeechSpeedSr(speedIDselected);
});

$("input[name='pitch-sr']").change(function () {
    let pitchIDselected = $("input[name='pitch-sr']:checked").val();

    setPitchSr(pitchIDselected);
});

$("input[name='volume-sr']").change(function () {
    let volumeIDselected = $("input[name='volume-sr']:checked").val();

    setVolumeSr(volumeIDselected);
});

$("input[name='gender-sr']").change(function () {
    let genderIDselected = $("input[name='gender-sr']:checked").val();

    setVoiceGenderSr(genderIDselected);
});

$("input[name='link-sr']").change(function () {
    let linkIDselected = $("input[name='link-sr']:checked").val();

    setLinkSr(linkIDselected);
});

function updateValuesSrInSession(names_preferences_sr, values) {
    $.ajax({
        url: base_url + "usuario/update_preferences_srSession",
        type: "POST",
        dataType: "json",
        data: {
            "username": session_user['username'],
            "names_preferences_sr": names_preferences_sr,
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

function setSpeechSpeedSr(speedID, setDefault) {
    let validSpeeds = {
        '1': 0.5,
        '2': 1,
        '3': 2,
    }

    let validSpeed = validSpeeds[speedID];

    if ((speedID != localStorage['speed_reading_sr']) && needSr && !setDefault) {
        console.log("trae" + localStorage['speed_reading_sr']);
        updateValuesSrInSession(['speed_reading_id'], [speedID]);
    }

    $("input[name='speed-sr']").data('default', false);
    localStorage['speed_reading_sr'] = speedID;

    cfgVoiceSr.rate = validSpeed;
}

function textIsALinkSr(node) {
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

function textIsALabelSr(node) {
    let currentNode = node;
    while (currentNode) {
        if (currentNode.tagName == 'LABEL') {
            return {
                isLabel: true,
                nodeLabel: currentNode,
            };
        } else {
            currentNode = currentNode.parentNode;
        }
    }
    return {
        isLabel: false,
    };

}

function setPitchSr(pitchID, setDefault) {
    let validPitchs = {
        '1': 0.5,
        '2': 1,
        '3': 2,
    }

    let validPitch = validPitchs[pitchID];


    if ((pitchID != localStorage['pitch_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['pitch_id'], [pitchID]);
    }

    $("input[name='pitch-sr']").data('default', false);
    localStorage['pitch_id_sr'] = pitchID;
    cfgVoiceSr.pitch = validPitch;
}

function setVolumeSr(volumeID, setDefault) {
    let validVolumes = {
        '1': 0.5,
        '2': 1,
        '3': 2,
    }
    let validVolume = validVolumes[volumeID];

    if ((volumeID != localStorage['volume_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['volume_id'], [volumeID]);
    }

    $("input[name='volume-sr']").data('default', false);
    localStorage['volume_id_sr'] = volumeID;
    cfgVoiceSr.volume = validVolume;
}

function setVoiceGenderSr(genderID, setDefault) {
    if ((genderID != localStorage['voice_gender_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['voice_gender_id'], [genderID]);
    }

    $("input[name='gender-sr']").data('default', false);
    localStorage['voice_gender_id_sr'] = genderID;
}

function setLinkSr(linkID, setDefault) {
    if ((linkID != localStorage['links_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['links_id'], [linkID]);
    }

    $("input[name='link-sr']").data('default', false);
    localStorage['links_id_sr'] = linkID;
}

function loadTreeSr(doc) {
    let filter = {
        acceptNode: function (n) {
            if (isValidNodeSr(n)) {
                return NodeFilter.FILTER_ACCEPT;
            } else {
                return NodeFilter.FILTER_SKIP;
            }
        }
    }
    try {
        treeSr = doc.createTreeWalker(doc.getElementsByTagName('body')[0], NodeFilter.SHOW_ELEMENT, filter, false);
    } catch {
        console.log("temporal");
    }
}

function isValidNodeSr(node) {
    if ($(node).is(':hidden') && !$(node).is(':visible')) {
        console.log("invisible");
        return false;
    }

    if (node.tagName != 'INPUT'  && node.tagName != 'IMG' && is_all_ws(node)) {
        console.log("son solo espacios");
        return false;
    }

    if(node.tagName != 'INPUT' && node.tagName != 'IMG'  && getTextSr(node) == ''){
        return false;
    }

    return true;
}

function getTextSr(node){
    // Get the parent element somehow, you can just as well use // .getElementById() or any other DOM method 
    var parentElement = node; 
    // Returns the text content as a string 
    return [].reduce.call(parentElement.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '').trim();
}

function sr() {
    treeSr.nextNode();
    
    queueForSpeechSr = [];
    queueForSpeechSr.push(getComputableName(treeSr.currentNode));

    createUtterances(queueForSpeechSr);
    
    if(textIsALinkSr(treeSr.currentNode)['isLink']) {
        textIsALinkSr(treeSr.currentNode)['nodeLink'].focus();
    } 

    setStyle();
    playQueueSr();
}

function getComputableName(node) {
    return getTextSr(treeSr.currentNode) || treeSr.currentNode.getAttribute('alt');
}

function createUtterances(text) {
    for (let index = 0; index < text.length; index++) {
        const element = text[index];
        audioSrcsSr[index] = new SpeechSynthesisUtterance(element);
        audioSrcsSr[index].onstart = clearQueueSr;
        audioSrcsSr[index].onend = nextElementSr;
        audioSrcsSr[index].voice = synth.getVoices()[65];
        audioSrcsSr[index].pitch = cfgVoiceSr.pitch;
        audioSrcsSr[index].volume = cfgVoiceSr.volume;
        audioSrcsSr[index].rate = cfgVoiceSr.rate;
        audioSrcsSr[index].lang = "es-419";
    }
}

function nextElementSr() {
    if (flStopSr) {
        flStopSr = false;
        return;
    }

    if (audioSrcsSr.length >= 1) {
        console.log("OTRO!!")
        playQueueSr();
    } else {
        if (treeSr.nextNode()) {
            treeSr.previousNode();
            removeStyle();
            sr();
        } else {
            return;
        }
    }
}

function nextSr() {
    if (synth.speaking) {
        synth.cancel();
        audioSrcsSr = [];
    }
}

function prevSr() {
    if (synth.speaking) {
        synth.cancel();
        audioSrcsSr = [];
        removeStyle();

        treeSr.previousNode();
        treeSr.previousNode();

        nextElementSr();
    }
}

function playQueueSr() {
    synth.speak(audioSrcsSr[0]);
}

function clearQueueSr() {
    console.log("CLEAR!");
    audioSrcsSr.splice(0, 1);
}

function setStyle() {
    const node = treeSr.currentNode;

    node.style.outline = "solid black";
}

function removeStyle() {
    const node = treeSr.currentNode;

    node.style.outline = '';
}

function stopSr() {
    if (synth.speaking) {
        removeStyle();
        loadTreeSr(document);
        flStopSr = true;
        synth.cancel();
    }
}
