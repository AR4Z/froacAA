importScripts('mespeak.js');

function speakNow(txt, cfgVoiceNarrator){
    return meSpeak.speak(txt, cfgVoiceNarrator);
}

function setSrcPlayer(base64_src){
    cfgReproductor.src[0] = "data:audio/wav;base64," + base64_src;
}

self.onmessage = function(event) {
    self.postMessage(speakNow(event.data['txt'], event.data['cfgVoiceNarrator']));
}