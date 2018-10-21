function dataKeyboard() {
    loadKeyboard();
}

$("input[name='keyboard-size']").change(function () {
    let keyboardSizeId = $("input[name='keyboard-size']:checked").val();
    setKeyboardSize(keyboardSizeId, $(this).data('default'));
});

$("input[name='play_key_sound']").change(function () {
    if ($(this).prop("checked")) {
        if (session_user && needKeyboard && (localStorage['play_key_sound'] != "true") && !($(this).data('default'))) {
            updateValuesSnInSession(['play_key_sound'], ["true"]);
        }
        localStorage['play_key_sound'] = "true";
    } else {
        if (session_user && needKeyboard && (localStorage['showTOC'] != "false") && !($(this).data('default'))) {
            updateValuesSnInSession(['play_key_sound'], ["false"]);
        }
        localStorage['play_key_sound'] = "false";
    }
    $(this).data('default', false);
});


function loadKeyboard() {
    $("input[name='keyboard-size'][value=" + (localStorage['keyboard_size_id'] || '2') + "]").prop('checked', true).change();
    if (localStorage['play_key_sound'] == 't') {
        localStorage['play_key_sound'] = 'true';
    } else if (localStorage['play_key_sound'] == 'f') {
        localStorage['play_key_sound'] = 'false';
    }
    $("input[name='play_key_sound']").prop('checked', localStorage['play_key_sound'] == "true").change();

    $(':input[type=text], :input[type=password]').keyboard({
        language: 'es',
        layout: 'qwerty',
        usePreview: false,
        customLayout: {
            'normal': ['{cancel}']
        },
        autoAccept: true,
        tabNavigation: true,
        css: {
            // input & preview
            input: 'ui-widget-content ui-corner-all',
            // keyboard container
            container: 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
            // keyboard container extra class (same as container, but separate)
            popup: '',
            // default state
            buttonDefault: 'ui-state-default ui-corner-all',
            // hovered button
            buttonHover: 'ui-state-hover',
            // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
            buttonAction: 'ui-state-active',
            // used when disabling the decimal button {dec}
            buttonDisabled: 'ui-state-disabled',
            // empty button class name {empty}
            buttonEmpty: 'ui-keyboard-empty'
        },

        position: {
            // optional - null (attach to input/textarea) or a jQuery object
            // (attach elsewhere)
            of: null,
            my: 'center top',
            at: 'center top',
            // used when "usePreview" is false
            // (centers keyboard at bottom of the input/textarea)
            at2: 'center bottom'
        },
        beforeVisible: function () {
            $("input[name='keyboard-size']").change()
        },
        visible: function () {
            $('.ui-keyboard-button').on('click', function () {
                if(localStorage['play_key_sound'] == "true") {
                    playKeySound();
                }
                $('.ui-keyboard-input-current').trigger('keyup');

            });

        }
    })
}

function playKeySound() {
    let keySound = document.getElementById('key-sound')

    if (keySound.played.length === 1) {
        keySound.pause();
        keySound.currentTime = 0;
    }
    keySound.play()
}

function updateValuesKeyboardInSession(names_preferences_kb, values) {
    $.ajax({
        url: base_url + "usuario/update_preferences_keyboardSession",
        type: "POST",
        dataType: "json",
        data: {
            "username": session_user['username'],
            "names_preferences_kb": names_preferences_kb,
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

function setDefaultValuesKb() {
    // el data-default sirve para realizar solo una peticion cuando se actualicen todos los valores
    $("input[name='keyboard-size']").data('default', true);
    $("input[name='keyboard-size'][value=" + ('2') + "]").prop('checked', true).change();
    $("input[name='play_key_sound']").data('default', true);
    $("input[name='play_key_sound']").prop('checked', true).change();

    if (session_user) {
        let names_preferences_kb = ['keyboard_size_id', 'play_key_sound'];
        let values = [2, true];
        updateValuesKeyboardInSession(names_preferences_kb, values);
    }
}

function setKeyboardSize(sizeId, setDefault) {
    if ((sizeId != localStorage['keyboard_size_id']) && needKeyboard && !setDefault) {
        updateValuesKeyboardInSession(['keyboard_size_id'], [sizeId]);
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("input[name='keyboard-size']").data('default', false);

    localStorage['keyboard_size_id'] = sizeId;
    changeKeySize(sizeId)
}


function changeKeySize(idSize) {
    $('.ui-keyboard').removeClass('small');
    $('.ui-keyboard-button').removeClass('small');
    $('.ui-keyboard-actionkey').removeClass('small');
    $('.ui-keyboard').removeClass('large');
    $('.ui-keyboard-button').removeClass('large');
    $('.ui-keyboard-actionkey').removeClass('large');
    if (idSize == 1) {
        $('.ui-keyboard').addClass('small');
        $('.ui-keyboard-button').addClass('small');
        $('.ui-keyboard-actionkey').addClass('small');
    } else if (idSize == 3) {
        $('.ui-keyboard').addClass('large');
        $('.ui-keyboard-button').addClass('large');
        $('.ui-keyboard-actionkey').addClass('large');
    }
}