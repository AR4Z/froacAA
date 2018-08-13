importScripts("workerFakeDOM.js");
importScripts('mespeak.js');

let cfgReproductor = {
    src: [],
    format: ['wav'],
}
//let reproductor = new Howl(cfgReproductor);

// load config files for narrator voice
function loadVoiceNarrator(){
    if(!meSpeak.isConfigLoaded()){
        console.log("swsws");
        meSpeak.loadConfig("http://localhost/froacAA/asset/js/mespeak_config.json");
        meSpeak.loadVoice("http://localhost/froacAA/asset/js/es-la.json");
        console.log(meSpeak.isConfigLoaded())
    }
}

// spaeak function
function speakNow(txt, cfgVoiceNarrator){
    //setSrcPlayer());
    //reproductor.init(cfgReproductor);
    //reproductor.play();
    // speak return wav file encode in base64
    console.log(meSpeak.speak(txt, cfgVoiceNarrator));
}

function setSrcPlayer(base64_src){
    cfgReproductor.src[0] = "data:audio/wav;base64," + base64_src;
}

onmessage = function(event) {
    console.log(event.data['txt']);
    console.log(event.data['cfgVoiceNarrator']);
    //loadVoiceNarrator();
    speakNow(event.data['txt'], event.data['cfgVoiceNarrator'])
}