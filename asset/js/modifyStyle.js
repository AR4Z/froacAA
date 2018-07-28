$(document).ready(function () {

    if (session_user && needPrefAdaptInterfaz) {
        localStorage['cursor_size_id'] = preferencesAdaptainterfaz['cursor_size_id'];
        localStorage['color_cursor'] = preferencesAdaptainterfaz['color_cursor'];
        localStorage['trail_cursor_size_id'] = preferencesAdaptainterfaz['trail_cursor_size_id'];
        localStorage['trail_cursor_color'] = preferencesAdaptainterfaz['trail_cursor_color'];
        localStorage['invert_color_general'] = preferencesAdaptainterfaz['invert_color_general'];
        localStorage['invert_color_image'] = preferencesAdaptainterfaz['invert_color_image'];
        localStorage['contrast_colors_id'] = preferencesAdaptainterfaz['contrast_colors_id'];
        localStorage['font_size'] = preferencesAdaptainterfaz['font_size'];
        localStorage['font_type_id'] = preferencesAdaptainterfaz['font_type_id'];
        localStorage['size_line_spacing'] = preferencesAdaptainterfaz['size_line_spacing'];
        localStorage['cursor_url'] = preferencesAdaptainterfaz['cursor_url'];
    }

    $(function () {
        $('#cp1, #cp2, #cp3, #cp4, #cp5, #cp6').colorpicker();
    });
    $('#inputFontSize').val(localStorage['font_size'] || 12).change();

    $('#inputInterlineSize').val(localStorage['size_line_spacing'] || 1.5).change();

    $("input[name='radioOptionscontrast'][value=" + (localStorage['contrast_colors_id'] || '1') + "]").prop('checked', true).change();

    $("input[name='type-font'][value=" + (localStorage['font_type_id'] || '1') + "]").prop('checked', true).change();

    $("input[name='radioOptionsSizeCursorTrails'][value=" + (localStorage['trail_cursor_size_id'] || '1') + "]").prop('checked', true).change();
    $("input[name='radioOptionsSizeCursor'][value=" + (localStorage['cursor_size_id'] || '1') + "]").prop('checked', true).change();
    if (localStorage['invert_color_image'] == 't') {
        localStorage['invert_color_image'] = 'true';
    } else if (localStorage['invert_color_image'] == 'f') {
        localStorage['invert_color_image'] = 'false';
    }

    if (localStorage['invert_color_general'] == 't') {
        localStorage['invert_color_general'] = 'true';
    } else if (localStorage['invert_color_general'] == 'f') {
        localStorage['invert_color_general'] = 'false';
    }

    console.log("contrast image", localStorage['invert_color_image']);
    $('.colorpicker').ready(function () {
        $("input[name='invertImages']").prop('checked', localStorage['invert_color_image'] == "true").change();
        $("input[name='invertGeneral']").prop('checked', localStorage['invert_color_general'] == "true").change();
    });

    animate();
});


$("input[name='invertImages']").change(function () {
    if ($(this).prop("checked")) {
        $('img:not(.no-invert-color)').css('filter', 'invert(1)');
        $('i:not(.no-invert-color)').css('filter', 'invert(1)');
        if (session_user && needPrefAdaptInterfaz && (localStorage['invert_color_image'] != "true") && !($(this).data('default'))) {
            updateValuesInterfazInSession(['invert_color_image'], ["true"]);
        }
        localStorage['invert_color_image'] = "true";
    } else {
        $('i:not(.no-invert-color)').css('filter', 'invert(0)');
        $('img:not(.no-invert-color)').css('filter', 'invert(0)');
        if (session_user && needPrefAdaptInterfaz && (localStorage['invert_color_image'] != "false") && !($(this).data('default'))) {
            updateValuesInterfazInSession(['invert_color_image'], ["false"]);
        }
        localStorage['invert_color_image'] = "false";
    }
    $(this).data('default', false);
});
$("input[name='invertGeneral']").change(function () {
    if ($(this).prop("checked")) {
        $('body').css('filter', 'invert(1)');
        $('.colorpicker').addClass('no-invert-color');
        $('.no-invert-color').css('filter', 'invert(1)');
        $('i.no-invert-color').css('filter', 'invert(0)');
        if (session_user && needPrefAdaptInterfaz && (localStorage['invert_color_general'] != "true") && !($(this).data('default'))) {
            updateValuesInterfazInSession(['invert_color_general'], ["true"]);
        }
        localStorage['invert_color_general'] = "true";
    } else {
        $('body').css('filter', 'invert(0)');
        $('.no-invert-color').css('filter', 'invert(0)');
        if (session_user && needPrefAdaptInterfaz && (localStorage['invert_color_general'] != "false") && !($(this).data('default'))) {
            updateValuesInterfazInSession(['invert_color_general'], ["false"]);
        }
        localStorage['invert_color_general'] = "false";
    }
    $(this).data('default', false);
});


$("input[name='colorCursorTrails']").change(function () {
    let optionSizeTrail = $("input[name='radioOptionsSizeCursorTrails']:checked").val();
    createTrail(optionSizeTrail, $(this).val(), localStorage['invert_color_general'], $(this).data('default'));
});

$("input[name='radioOptionsSizeCursorTrails']").change(function () {
    let optionSize = $("input[name='radioOptionsSizeCursorTrails']:checked").val();
    console.log(optionSize);
    if (optionSize != '1') {
        console.log("crear")
        $('#div-color-cursor-trails').show();
        //createTrail(optionSize, localStorage['trail_cursor_color'] || $("input[name='trail_cursor_color']").val(), localStorage['invert_color_general']);
        $("input[name='colorCursorTrails']").val(localStorage['trail_cursor_color'] || $("input[name='colorCursorTrails']").val()).change();
    } else {
        $('#div-color-cursor-trails').hide();
        createTrail('1', localStorage['color_cursor'] || $("input[name='colorCursorTrails']").val(), $(this).data('default'));
    }
});

$("input[name='colorMousePointer']").change(function () {
    let optionSize = $("input[name='radioOptionsSizeCursor']:checked").val();
    let color = $(this).val();
    changeMousePointer(optionSize, color, $(this).data('default'));
})

$("input[name='radioOptionsSizeCursor']").change(function () {
    let optionSize = $("input[name='radioOptionsSizeCursor']:checked").val();
    console.log(localStorage['color_cursor']);

    if (optionSize != '1') {
        $('#div-color-cursor').show();
        //changeMousePointer(optionSize, localStorage['color_cursor'] || $("input[name='colorMousePointer']").val());
        $("input[name='colorMousePointer']").val(localStorage['color_cursor'] || $("input[name='colorMousePointer']").val()).change();
    } else {
        $('#div-color-cursor').hide();
        changeMousePointer(optionSize, localStorage['color_cursor'] || $("input[name='colorMousePointer']").val(), $(this).data('default'));
    }
});

$("input[name='type-font']").change(function () {
    changeFontFamily($("input[name='type-font']:checked").val(), $(this).data('default'));
});

$("input[name='radioOptionscontrast']").change(function () {
    let optionCheckedContrast = $("input[name='radioOptionscontrast']:checked").val();
    console.log(optionCheckedContrast);

    if(optionCheckedContrast != '7'){
        $('#div-color-foreground').hide();
        $('#div-color-background').hide();
        $('#div-color-link').hide();
        $('#div-color-highlight').hide();
    } else {
        $('#div-color-foreground').show();
        $('#div-color-background').show();
        $('#div-color-link').show();
        $('#div-color-highlight').show();
    }
    highContrast(optionCheckedContrast, $(this).data('default'));
});

function setDefaultValuesInterfaz() {
    $('#inputFontSize').data('default', true);
    $('#inputFontSize').val(12).change();
    $('#inputInterlineSize').data('default', true);
    $('#inputInterlineSize').val(1.5).change();
    $("input[name='radioOptionscontrast']").data('default', true);
    $("input[name='radioOptionscontrast'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='type-font']").data('default', true);
    $("input[name='type-font'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='radioOptionsSizeCursorTrails']").data('default', true);
    $("input[name='radioOptionsSizeCursorTrails'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='radioOptionsSizeCursor']").data('default', true);
    $("input[name='radioOptionsSizeCursor'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='invertImages']").data('default', true);
    $("input[name='invertImages']").prop('checked', false).change();
    $("input[name='invertGeneral']").data('default', true);
    $("input[name='invertGeneral']").prop('checked', false).change();

    if (session_user) {
        let names_interfaz_preference = ['cursor_size_id', 'color_cursor',
            'trail_cursor_size_id', 'trail_cursor_color', 'invert_color_general',
            'invert_color_image', 'contrast_colors_id', 'font_size', 'font_type_id', 'size_line_spacing', 'cursor_url'
        ]
        let values = [1, "rgb(255, 18, 18)", 1, "rgb(255, 18, 18)", false, false, 1, 12, 1, 1.5, ''];
        updateValuesInterfazInSession(names_interfaz_preference, values);
    }
}


function updateValuesInterfazInSession(names_interfaz_preference, values) {
    console.log("update in session");

    $.ajax({
        url: base_url + "usuario/update_preferences_interfazSession",
        type: "POST",
        dataType: "json",
        data: {
            "username": session_user['username'],
            "names_interfaz_preference": names_interfaz_preference,
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

function changeFontSize(selector, setDefault) {

    selector = (typeof selector == 'undefined') ? 'input#fontSizeNav' : selector;
    if (session_user && needPrefAdaptInterfaz && (localStorage['font_size'] != $(selector).val()) && !setDefault) {
        updateValuesInterfazInSession(['font_size'], [$(selector).val()]);
    }
    $('html').css('font-size', $(selector).val() + 'px');
    $(selector).data('default', false);
    localStorage['font_size'] = $(selector).val();

}

function changeMousePointer(cursor_size_id, color_cursor, setDefault) {
    let sizeOptionsCursor = {
        '1': 0,
        '2': 16,
        '3': 32,
        '4': 48
    }
    let sizeInt = sizeOptionsCursor[cursor_size_id];
    if (sizeInt) {
        if (localStorage['cursor_size_id'] != cursor_size_id || localStorage['color_cursor'] != color_cursor) {
            $('body').awesomeCursor('mouse-pointer', {
                size: sizeInt,
                color: color_cursor
            });
        } else {
            $('body').css('cursor', localStorage['cursor_url']);
        }

    } else {
        $('body').css('cursor', '');
    }

    if (session_user && needPrefAdaptInterfaz && (localStorage['cursor_size_id'] != cursor_size_id || localStorage['color_cursor'] != color_cursor) && !setDefault) {
        updateValuesInterfazInSession(['cursor_size_id', 'color_cursor', 'cursor_url'], [cursor_size_id, color_cursor, $('body').css('cursor')]);
    }
    $("input[name='radioOptionsSizeCursor']").data('default', false);
    localStorage['cursor_size_id'] = cursor_size_id;
    localStorage['color_cursor'] = color_cursor || localStorage['color_cursor'];
    localStorage['cursor_url'] = $('body').css('cursor');
}

function highContrast(optionContrast, setDefault) {
    // clase asociada a valores del contraste
    let classNameContrastOptions = {
        '1': 'default',
        '3': 'fl-theme-wb',
        '2': 'fl-theme-bw',
        '5': 'fl-theme-yb',
        '4': 'fl-theme-by',
        '6': 'fl-theme-lgdg',
        '7': 'customized'
    }
    // obtengo la clase de acuerdo al contraste elegido
    let classNameContrast = classNameContrastOptions[optionContrast];
    console.log(classNameContrast);
    // elimino la clase que tenia el body
    $('body').removeClass(classNameContrastOptions[localStorage['contrast_colors_id']]);

    if (optionContrast === '1') {
        $('.colorpicker').removeClass('no-high-contrast');
        $('.colorpicker-saturation').removeClass('no-high-contrast');
        $('.colorpicker-saturation').children().addClass('no-high-contrast');
        $('.colorpicker-saturation').children().children().addClass('no-high-contrast');
        $('.colorpicker-guide').removeClass('no-high-contrast');
        $('.colorpicker-hue').removeClass('no-high-contrast');
        $('.colorpicker-alpha').removeClass('no-high-contrast');
        $('.colorpicker-color').children().removeClass('no-high-contrast');
        $('html').remove('#customized');

    } else if(optionContrast === '7'){
        $('html').remove('#customized');
        let customStyle =`
            <style id="customized">
                body {
                    color: ${localStorage['foreground_colour']};
                    background-color: ${localStorage['background_colour']}
                }
                a {
                    color: ${localStorage['link_colour']};
                }
                ::selection {
                    background: ${localStorage['highlight_colour']};
                  }
                  
                ::-moz-selection {
                    background: ${localStorage['highlight_colour']};
                }

            </style>
        `
        $('html').append(customStyle);
        
    } else {
        // agrego la clase obtenida al body para cambiar los colores
        $('html').remove('#customized');
        $('body').addClass(classNameContrast);
        // no quiero aplicar el alto contraste al colorpicker
        $('.colopicker').ready(function () {
            $('.colorpicker').addClass('no-high-contrast');
            $('.colorpicker-saturation').addClass('no-high-contrast');
            $('.colorpicker-saturation').children().addClass('no-high-contrast');
            $('.colorpicker-saturation').children().children().addClass('no-high-contrast');
            $('.colorpicker-guide').addClass('no-high-contrast');
            $('.colorpicker-hue').addClass('no-high-contrast');
            $('.colorpicker-alpha').addClass('no-high-contrast');
            $('.colorpicker-color').children().addClass('no-high-contrast');
        });
    }

    if (session_user && needPrefAdaptInterfaz && (localStorage['contrast_colors_id'] != optionContrast) && !setDefault) {
        updateValuesInterfazInSession(['contrast_colors_id'], [optionContrast]);
    }
    $("input[name='radioOptionscontrast']").data('default', false);
    // almaceno el valor elegido de contraste en el localStorage
    localStorage['contrast_colors_id'] = optionContrast;
}

function changeFontFamily(fontID, setDefault) {
    let fontsID = {
        '1': 'open-sans',
        '2': 'serif',
        '3': 'cantarell',
        '4': 'source-code-pro'
    }
    let fontsNameCSS = {
        'open-sans': "'Open Sans', sans-serif",
        'serif': "'PT Serif', serif",
        'cantarell': "'Cantarell', sans-serif",
        'source-code-pro': "'Source Code Pro', monospace"
    }
    let fontName = fontsID[fontID];

    $('body').css('font-family', fontsNameCSS[fontName]);

    if (session_user && needPrefAdaptInterfaz && (localStorage['font_type_id'] != fontID) && !setDefault) {
        updateValuesInterfazInSession(['font_type_id'], [fontID]);
    }
    $("input[name='type-font']").data('default', false);
    localStorage['font_type_id'] = fontID;
}

function changeInterlineSpace(selector, setDefault) {

    selector = (typeof selector == 'undefined') ? '#interlineNav' : selector;
    $('body').css('line-height', $(selector).val());

    if (session_user && needPrefAdaptInterfaz && (localStorage['size_line_spacing'] != $(selector).val()) && !setDefault) {
        updateValuesInterfazInSession(['size_line_spacing'], [$(selector).val()]);
    }
    $(selector).data('default', false);
    localStorage['size_line_spacing'] = $(selector).val();
}


let dots = [],
    mouse = {
        x: 0,
        y: 0
    };


let Dot = function () {
    this.x = 0;
    this.y = 0;
    this.node = (function () {
        let n = document.createElement("div");
        n.className = "trail no-high-contrast no-invert-color";
        document.body.appendChild(n);
        return n;
    }());
};


Dot.prototype.draw = function () {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
};

function createTrail(optionLenTrails, colorTrails, invert_color_general, setDefault) {
    let lenTrail = {
        "1": 0,
        "2": 12,
        "3": 24
    }
    let lenInt = lenTrail[optionLenTrails];
    console.log((lenInt));
    if (lenInt) {
        if (optionLenTrails != localStorage['trail_cursor_size_id'] || (dots.length != lenInt)) {
            $('.trail').remove();
            dots = [];
            for (var i = 0; i < lenInt; i++) {
                var d = new Dot();
                dots.push(d);
            }
        }
        if (invert_color_general == "true") {
            $('.trail').css('background', colorTrails);
            $('.trail').css('filter', 'invert(1)');
        } else {
            $('.trail').css('background', colorTrails);
        }

    } else {
        $('.trail').remove();
    }

    if (session_user && needPrefAdaptInterfaz && (localStorage['trail_cursor_size_id'] != optionLenTrails || localStorage['trail_cursor_color'] != colorTrails) && !setDefault) {
        updateValuesInterfazInSession(['trail_cursor_size_id', 'trail_cursor_color'], [optionLenTrails, colorTrails]);

    }
    localStorage['trail_cursor_size_id'] = optionLenTrails;
    localStorage['trail_cursor_color'] = colorTrails || localStorage['trail_cursor_color'];
}

// This is the screen redraw function
function draw() {
    // Make sure the mouse position is set everytime
    // draw() is called.
    var x = mouse.x,
        y = mouse.y;

    // This loop is where all the 90s magic happens
    dots.forEach(function (dot, index, dots) {
        var nextDot = dots[index + 1] || dots[0];

        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * .6;
        y += (nextDot.y - dot.y) * .6;

    });
}

addEventListener("mousemove", function (event) {
    //event.preventDefault();
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
// everytime the screen repaints via requestAnimationFrame().
function animate() {
    draw();
    requestAnimationFrame(animate);
}

// And get it started by calling animate().
