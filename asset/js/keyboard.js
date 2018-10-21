$(':input').keyboard({
    language : 'es',
    layout: 'qwerty',
    usePreview: false,
    customLayout : { 'normal': ['{cancel}'] },
    autoAccept : true,
    tabNavigation : true,
    css : {
        // input & preview
        input          : 'ui-widget-content ui-corner-all',
        // keyboard container
        container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
        // keyboard container extra class (same as container, but separate)
        popup: '',
        // default state
        buttonDefault  : 'ui-state-default ui-corner-all',
        // hovered button
        buttonHover    : 'ui-state-hover',
        // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
        buttonAction   : 'ui-state-active',
        // used when disabling the decimal button {dec}
        buttonDisabled : 'ui-state-disabled',
        // empty button class name {empty}
        buttonEmpty    : 'ui-keyboard-empty'
    },
    
    position : {
        // optional - null (attach to input/textarea) or a jQuery object
        // (attach elsewhere)
        of : null,
        my : 'center top',
        at : 'center top',
        // used when "usePreview" is false
        // (centers keyboard at bottom of the input/textarea)
        at2: 'center bottom'
    },
    
    visible: function () {
        $('.ui-keyboard-button').on('click', function() {
            $('.ui-keyboard-input-current').trigger('keyup');
            let keySound = document.getElementById('key-sound')
            
            if(keySound.played.length === 1) {
                keySound.pause();
                keySound.currentTime = 0;
            }
            keySound.play()
        });
    }
})

function changeKeySize(idSize) {
    if(idSize == 1) {
        $('.ui-keyboard span').css('font-size', '1.1em')
        $('.ui-keyboard-button').css('height', '2em');
        $('.ui-keyboard-button').css('width', '2em');
    } else if(idSize == 2) {
        $('.ui-keyboard span').css('font-size', '1.2em')
        $('.ui-keyboard-button').css('height', '3em');
        $('.ui-keyboard-button').css('width', '3em');
    } else if(idSize == 3){
        $('.ui-keyboard span').css('font-size', '1.3em')
        $('.ui-keyboard-button').css('height', '4em');
        $('.ui-keyboard-button').css('width', '4em');
    }
}