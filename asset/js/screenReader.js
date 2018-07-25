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
        let names_preferences_sr = ['speed_reading', 'pitch_id', 'volume_id', 'gender_id', 'link_id'];
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
    localStorage['speed_reading_nr'] = speed;
}

function setPitchSr(pitchID, setDefault) {
    if((pitchID != localStorage['pitch_id_sr']) && needSr && !setDefault) {
        updateValuesSrInSession(['pitch_id'], [pitchID]);
    }
    $("input[name='pitch-sr']").data('default', false);
    localStorage['pitch_id_nr'] = pitchID;
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


let currentNode;
let previousNodes = [];
let assistant;
let iframeDocument;

window.onload = function () {
    assistant = new Artyom();
    assistant.initialize({
        lang: "es-ES",
        debug: true
    });
};


let landmarks = getLandmarks(document.querySelectorAll('body *'));
let oaIframe = document.getElementById("oa");
if (oaIframe !== null) {
    oaIframe.addEventListener("load", function () {
        iframeDocument = oaIframe.contentDocument || oaIframe.contentWindow.document;
        iframeDocument.onkeydown = pulsarTecla;
        iframeDocument.onclick = clicked;
    });
}

function pulsarTecla(e) {
    var e = e || event;
    if (e.ctrlKey && e.keyCode === 32) {
        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }
        previousNodes = [];
        walkDOM(document.querySelectorAll('body *'));
    } else if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();

        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }
        walkDOM(restElements(currentNode, document.querySelectorAll('body *')));

    } else if (e.ctrlKey && e.keyCode === 74) {
        e.preventDefault();
        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }

        let newDOM = restElements(previousNodes[previousNodes.indexOf(currentNode) - 1], document.querySelectorAll('body *'));
        newDOM.unshift(previousNodes[previousNodes.indexOf(currentNode) - 1]);
        walkDOM(newDOM);
    } else if (e.ctrlKey && e.keyCode === 76) {
        e.preventDefault();
        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }
        walkDOM(restElements(landmarks[nextLandmark(whichLandmark(currentNode))], document.querySelectorAll('body *')));
    }
}

function nextLandmark(landmark) {

    let foundLandmark = false;
    for (const [currentLandmark, firstLandmarkNode] of Object.entries(landmarks)) {
        if (foundLandmark) {
            return currentLandmark;
        }
        if (currentLandmark === landmark) {
            foundLandmark = true;
        }
    }
    return null;
}

function whichLandmark(node) {

    let landmark, nodes;
    for (const [currentLandmark, firstLandmarkNode] of Object.entries(landmarks)) {
        nodes = restElements(firstLandmarkNode, document.querySelectorAll('body *'));
        nodes.forEach(function (childNode) {
            if (node === childNode) {
                landmark = currentLandmark;
            }
        });
    }
    console.log(landmark);
    return landmark;
}

function getLandmarks(body) {
    let landmarks = {};
    let landmark;
    body.forEach(function (node) {
        if (node.hasAttribute("role")) {
            landmark = node.getAttribute("role") + " " + node.getAttribute("aria-label");
            if (!(landmark in landmarks)) {
                landmarks[landmark] = node;
            }
        }
    });
    return landmarks;
}


function clicked(e) {
    let elementClicked = e.target;

    if ((elementClicked.localName === 'a' || (elementClicked.textContent === "Siguiente »" || elementClicked.textContent === "« Anterior")) && assistant.isSpeaking()) {
        assistant.shutUp();
    }
}

function someNone(elements){
    let none = false;
    console.log(elements);
    elements.forEach(function (element) {
        if(element.style.display == "none"){
            none = true;
            return none;
        }
    });
    return none;
}


function parentsNode(element) {
    let a = element;
    let els = [];
    while (a) {
        if (a.nodeName != "#document"){
            els.unshift(a);
        }
        a = a.parentNode;
    }
    return els;
}



function walkDOM(body) {
    console.log(body);

    body.forEach(function (node) {
        console.log(node);
        let nodeParentIsNone = someNone(parentsNode(node));

        if(!nodeParentIsNone){
            if (node.nodeName === "A" || node.nodeName === "IMG" || node.nodeName === "BUTTON" || node.nodeName === "INPUT" || node.nodeName === "P" || node.nodeName == "H1" || node.nodeName == "H2" || node.nodeName == "H3"
                || node.nodeName == "H4" || node.nodeName == "H5" || node.nodeName == "H6" || node.nodeName == "TH" || node.nodeName == "TD" || node.nodeName == "STRONG") {
                let text;
                if (node.nodeName === "IMG") {
                    text = node.alt;
                } else if (node.nodeName === "INPUT") {
                    text = node.placeholder;
                } else {
                    text = node.textContent;
                }
                assistant.say(text, {
                    onStart: function () {
                        if (assistant.isSpeaking()) {
                            currentNode = node;
                            if (!previousNodes.includes(currentNode)) {
                                previousNodes.push(currentNode);
                            }
                            node.focus();
                        }
                    }
                });
            } else if (node.nodeName === "IFRAME") {
                let iframeBody = iframeDocument.querySelectorAll('body *');
                walkDOM(iframeBody);
            }
        }


    });


}

function restElements(element, body) {
    let join = false;
    let elements = [];
    body.forEach(function (node) {
        if (node === element) {
            join = true;
        }
        if (join && node !== element) {
            elements.push(node);
        }
    });

    if (!join && oaIframe !== null) {
        body = iframeDocument.querySelectorAll("body *");
        body.forEach(function (node) {
            if (node === element) {
                join = true;
            }
            if (join && node !== element) {
                elements.push(node);
            }


        });
    }

    return elements;
}

document.onkeydown = pulsarTecla;
//window.onclick = clicked;
