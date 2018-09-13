importScripts('mespeak.js');

function speakNow(texts, cfgVoiceNarrator){
    //console.log()
    let audioSources = [];
    
    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        audioSources.push("data:audio/wav;base64," + meSpeak.speak(text, cfgVoiceNarrator));
    }
    
    return audioSources;
}

self.onmessage = function(event) {
    self.postMessage(speakNow(event.data['texts'], event.data['cfgVoiceNarrator']));
}