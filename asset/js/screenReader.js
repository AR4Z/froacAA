let treeSr, treeIsIframe = false,
    flStopSr = false,
    audioSrcsSr = [],
    queueForSpeechSr = [],
    manualModeSr = false,
    cfgVoiceSr = {
        rate: 1,
        pitch: 1,
        volume: 0.5,
    };

let dictLangs = {
    'spanish': [
        "Lector de pantalla encendido",
        "Enlace",
        "Para seguir el link, presione la tecla enter",
        "Botón",
        "Para presionar el botón, presione la tecla espacio",
        "Encabezado nivel",
        "Imagen",
        "Campo de formulario tipo texto",
        "Valor",
        "Vacío",
        "Escriba el valor y presione control + f para seguir en modo automático o control + d para pasar al siguiente elemento",
        "Campo de formulario tipo contraseña",
        "Estado",
        "Lleno",
        "Casilla de verificación",
        "Seleccionada",
        "No seleccionada",
        "No seleccionada. Presione la tecla enter para seleccionar.",
        "Opción única",
        "Para entrar al iframe presionar control + g, presione control + f para seguir en modo automático o control + d para pasar al siguiente elemento.",
    ],
    'english': [
        "Screen reader on",
        "Link",
        "To follow the link, press the enter key",
        "Button",
        "To press the button, press the space key",
        "Header level",
        "Image",
        "Form type text field",
        "Value",
        "Empty",
        "Enter the value and press control + f to continue in automatic mode or control + d to move to the next element",
        "Password type form field",
        "State",
        "Full",
        "Checkbox",
        "Selected",
        "Not selected",
        "Not selected Press the enter key to select.",
        "Single option",
        "To enter iframe press control + g, press control + f to continue in automatic mode or control + d to move to the next element.",
    ],
    'portuguese': [
        "Leitor de tela em",
        "Link",
        "Para seguir o link, pressione a tecla Enter",
        "Botão",
        "Para pressionar o botão, pressione a tecla de espaço",
        "Nível de cabeçalho",
        "Image",
        "Campo de texto do tipo de formulário",
        "Valor",
        "Vazio",
        "Insira o valor e pressione control + f para continuar no modo automático ou control + d para passar para o próximo elemento",
        "Campo de formulário do tipo de senha",
        "Estado",
        "Completo",
        "Caixa de seleção",
        "Seleccionado",
        "Não selecionado",
        "Não selecionado. Pressione a tecla Enter para selecionar.",
        "Opção única",
        "Para inserir iframe pressione Ctrl + g, pressione control + f para continuar no modo automático ou control + d para mover para o próximo elemento.",
    ]
}

let synth = window.speechSynthesis;

const mappings = {
    a: 'link',
    button: 'button',
    h1: 'heading',
    h2: 'heading',
    h3: 'heading',
    h4: 'heading',
    h5: 'heading',
    p: 'paragraph',
    html: 'page',
    img: 'image',
    input: 'input',
    iframe: 'iframe',
};


function dataSr() {
    loadTreeSr(document);
    loadSr();

    hotkeys('ctrl+a,ctrl+d,ctrl+p,ctrl+s,ctrl+f,ctrl+g', function (event, handler) {
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
                sayEventUtter.text = dictLangs[userLang][0];
                sayEventUtter.onend = sr;
                synth.speak(sayEventUtter);
                break;
            case "ctrl+a":
                stopSr();
                break;
            case "ctrl+f":
                changeModeSr();
                break;
            case "ctrl+g":
                if(treeSr.currentNode.tagName == "IFRAME") {
                    loadTreeSr(iframeDocument);
                    sr();
                }
                break;
        }
    });
    hotkeys.filter = function(event){
        return true;
    }
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
        let values = [2, 2, 2, 1, 1];
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

    if (node.tagName == "LABEL") {
        return false;
    }

    if (node.tagName != "INPUT" && node.tagName != "IMG" && node.tagName != "IFRAME" && is_all_ws(node)) {
        console.log("son solo espacios");
        return false;
    }

    if (node.tagName != "INPUT" && node.tagName != "IMG" && node.tagName != "IFRAME" && getTextSr(node) == '') {
        return false;
    }

    return true;
}

function getTextSr(node) {
    // Get the parent element somehow, you can just as well use // .getElementById() or any other DOM method 
    var parentElement = node;
    // Returns the text content as a string 
    return [].reduce.call(parentElement.childNodes, function (a, b) {
        return a + (b.nodeType === 3 ? b.textContent : '');
    }, '').trim();
}

function sr() {
    treeSr.nextNode();

    let element = treeSr.currentNode;
    let role = computeRole(element);

    queueForSpeechSr = [];

    if (announcers[role]) {
        queueForSpeechSr.push(announcers[role](element));
    } else {
        queueForSpeechSr.push(announcers.default(element));
    }

    if ((element.tagName == "INPUT"  || element.tagName == "IFRAME") && !manualModeSr) {
        changeModeSr();
    }

    if(element.tagName != 'A' && isALink(element).isLink) {
        isALink(element).nodeLink.focus();
    } else {
        element.focus();
    }

    createUtterances(queueForSpeechSr);
    setStyle();
    playQueueSr();
}

function computeAccessibleName(element) {
    let content = '';

    if (element.getAttribute('aria-label')) {
        return element.getAttribute('aria-label');
    } else if(element.getAttribute("title")) {
        return element.getAttribute("title");
    } else if (element.getAttribute('alt')) {
        return element.getAttribute('alt');
    } else if (element.getAttribute('aria-labelledby') || findLabelForControl(element, document)) {
        return getTextSr(findLabelForControl(element, document));
    }

    content = getTextSr(element);
    return content;
}


const announcers = {
    link(element) {
        return `${dictLangs[userLang][1]}, ${ computeAccessibleName( element ) }. ${ dictLangs[userLang][2] }.`;
    },

    button(element) {
        return `${ dictLangs[userLang[3]] }, ${ computeAccessibleName( element ) }. ${ dictLangs[userLang[4]] }.`;
    },

    heading(element) {
        const level = element.getAttribute('aria-level') || element.tagName[1];

        return `${ dictLangs[userLang][5] } ${ level }, ${ computeAccessibleName( element ) }`;
    },

    paragraph(element) {
        return element.textContent;
    },

    image(element) {
        return `${ dictLangs[userLang][6] }, ${ computeAccessibleName( element ) }`;
    },

    input(element) {
        if (element.type == "text") {
            return `${ dictLangs[userLang][7] }: ${computeAccessibleName(element)}. ${ dictLangs[userLang][8] }: ${element.value ? element.value :  dictLangs[userLang][9]}. ${dictLangs[userLang][10]}.`;
        } else if (element.type == "password") {
            return `${ dictLangs[userLang][11] }: ${computeAccessibleName(element)}. ${ dictLangs[userLang][12] }: ${element.value ? dictLangs[userLang][13] : dictLangs[userLang][9]}. ${dictLangs[userLang][10]}.`;
        } else if (element.type == "checkbox") {
            return `${dictLangs[userLang][14]}: ${computeAccessibleName(element)}. ${ dictLangs[userLang][12] }: ${element.checked ? dictLangs[userLang][15] : dictLangs[userLang][16]}`;
        } else if(element.type == "radio") {
            return `${dictLangs[userLang[18]]}: ${computeAccessibleName(element)}. ${ dictLangs[userLang][12] }: ${element.checked ? dictLangs[userLang][15]: dictLangs[userLang][17]} `;
        }
    },

    iframe(element) {
        return `Iframe, ${ computeAccessibleName(element)}. ${ dictLangs[userLang][19] }`;
    },

    default (element) {
        return `${ element.tagName }: ${ computeAccessibleName( element ) }`;
    }
};

function findLabelForControl(el, doc) {
    let idVal = el.id;
    let labels = doc.getElementsByTagName('label');

    
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == idVal && idVal != ''){
            return labels[i];
        }
    }
    
}

function computeRole(element) {
    const name = element.tagName.toLowerCase();

    if (element.getAttribute('role') && name != 'a') {
        return element.getAttribute('role');
    } else if(isALink(element).isLink){
        return mappings['a'];
    }

    return mappings[name] || 'default';
}

function createUtterances(text) {
    for (let index = 0; index < text.length; index++) {
        const element = text[index];
        audioSrcsSr[index] = new SpeechSynthesisUtterance(element);
        audioSrcsSr[index].onstart = clearQueueSr;
        
        if(!manualModeSr) {
            audioSrcsSr[index].onend = nextElementSr;
        }
        
        
        audioSrcsSr[index].pitch = cfgVoiceSr.pitch;
        audioSrcsSr[index].volume = cfgVoiceSr.volume;
        audioSrcsSr[index].rate = cfgVoiceSr.rate;
        
        if(userLang == "english") {
            audioSrcsSr[index].lang = "en-GB";
            audioSrcsSr[index].voice = synth.getVoices()[57];
        } else if(userLang == "portuguese") {
            console.log("postugures")
            audioSrcsSr[index].lang = "pt-BR";
            audioSrcsSr[index].voice = synth.getVoices()[46];
        } else {
            audioSrcsSr[index].lang = "es-419";
            audioSrcsSr[index].voice = synth.getVoices()[65];
        }
        
    }
}

function nextElementSr() {
    if (flStopSr) {
        flStopSr = false;
        return;
    } else if(manualModeSr) {
        console.log("next element srr")
        return;
    }

    if (audioSrcsSr.length >= 1) {
        console.log("OTRO!!");
        playQueueSr();
    } else {
        if (treeSr.nextNode()) {
            treeSr.previousNode();
            removeStyleSr();
            sr();
        } else {
            return;
        }
    }
}

function changeModeSr() {
    if(manualModeSr){
        manualModeSr = false;
        nextSr();
    } else {
        manualModeSr = true;
    }
}

function nextSr() {
    audioSrcsSr = [];
    removeStyleSr();

    if (synth.speaking) {
        synth.cancel();
    }

    sr();
}

function prevSr() {
    audioSrcsSr = [];
    removeStyleSr();
    treeSr.previousNode();
    treeSr.previousNode();
    
    if (synth.speaking) {
        synth.cancel();
    }

    sr();
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

function removeStyleSr() {
    const node = treeSr.currentNode;

    node.style.outline = '';
}

function stopSr() {
    if (synth.speaking) {
        removeStyleSr();
        loadTreeSr(document);
        flStopSr = true;
        synth.cancel();
    }
}

function isALink(node) {
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
