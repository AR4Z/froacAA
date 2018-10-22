$(document).ready(function () {
    $('.btn-number').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        let input = $("input[name='" + fieldName + "']");
        let currentVal = parseFloat(input.val());
        let step = parseFloat(input.attr('step'));
        let dataDecimals = parseFloat(input.attr('data-decimals')) || 0;
        let newValue = 0;
        let decimals = 10;

        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                input.data('tipo', type);
                if (currentVal > input.attr('min')) {
                    newValue = currentVal - step;
                    decimals *= dataDecimals;
                    
                    if (dataDecimals) {
                        input.val(Math.round(newValue * decimals) / decimals).change();
                    } else {
                        input.val(newValue).change();
                    }
                }
                if (parseFloat(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }


            } else if (type == 'plus') {
                input.data('tipo', type);
                if (currentVal < input.attr('max')) {
                    newValue = currentVal + step;
                    decimals *= dataDecimals;
                    
                    if (dataDecimals) {
                        input.val(Math.round(newValue * decimals) / decimals).change();
                    } else {
                        input.val(newValue).change();
                    }
                }
                if (parseFloat(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function () {
        if ($(this).attr('data-decimals') != 0) {
            $(this).val(Math.round($(this).val() *
                (10 * $(this).attr('data-decimals'))) / (10 * $(this).attr('data-decimals')));
        } else if ($(this).attr('data-decimals') == 0) {
            $(this).val(parseInt($(this).val()));
        }
        
        minValue = parseFloat($(this).attr('min'));
        maxValue = parseFloat($(this).attr('max'));
        valueCurrent = parseFloat($(this).val());
        name = $(this).attr('name');

        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
        } else {
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
        } else {
            $(this).val($(this).data('oldValue'));
        }

        if ($(this).attr('id') == 'inputInterlineSize') {
            changeInterlineSpace('#inputInterlineSize', $(this).data('default'));
        } else if ($(this).attr('id') == 'inputFontSize') {
            changeFontSize('#inputFontSize', $(this).data('default'));
        } else if ($(this).attr('id') == 'input-speed-speech-narrator') {
            console.log("cambiando");
            setSpeechSpeedNarrator($(this).val());
        } else if($(this).attr('id') == 'input-pitch-narrator'){
            setPitchNarrator($(this).val(), $(this).data('default'));
        } else if($(this).attr('id') == 'input-speed-LSC-translator'){
            setSignSpeedLSCTranslator($(this).val(), $(this).data('default'));
        }
    });
    $(".input-number").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $("#toggle-btn").on("click", function (e) {
        e.preventDefault(), $(this).toggleClass("active"), $(".side-navbar").toggleClass("shrinked"), $(".content-inner").toggleClass("active"), $(document).trigger("sidebarChanged"), $(window).outerWidth() > 1183 && ($("#toggle-btn").hasClass("active") ? ($(".navbar-header .brand-small").hide(), $(".navbar-header .brand-big").show()) : ($(".navbar-header .brand-small").show(), $(".navbar-header .brand-big").hide())), $(window).outerWidth() < 1183 && $(".navbar-header .brand-small").show()
    })
    var t = $(".content-inner");

    function n() {
        var e = $(".main-footer").outerHeight();
        t.css("padding-bottom", e + "px")
    }
    $(document).on("sidebarChanged", function () {
        n()
    }), $(window).on("resize", function () {
        n()
    }), $(".external").on("click", function (e) {
        e.preventDefault(), window.open($(this).attr("href"));
    });

    if (!session_user || needPrefAdaptInterfaz) {
        $('#interfaz').addClass('show active');
        $('#interfaz-tab').addClass('active');
        $('#interfaz-tab').attr('aria-selected', true);
    } else if (needNarrator) {
        $('#narrator').addClass('show active');
        $('#narrator-tab').addClass('active');
        $('#narrator-tab').attr('aria-selected', true);
    } else if (needSr) {
        $('#screen-reader').addClass('show active');
        $('#screen-reader-tab').addClass('active');
        $('#screen-reader-tab').attr('aria-selected', true);
    } else if (needLSCTranslator) {
        $('#LSC-translator').addClass('show active');
        $('#LSC-translator-tab').addClass('active');
        $('#LSC-translator-tab').attr('aria-selected', true);
    } else if (needKeyboard) {
        $('#keyboard-cf').addClass('show active');
        $('#keyboard-tab').addClass('active');
        $('#keyboard-tab').attr('aria-selected', true);
    }

    if ($('ul#accessibilityTab li').length == 2) {
        $('#reset-all').hide();
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

});

// Resetea todos los valores de la barra de accesibilidad por default
function setDefaultAllValues() {
    if (needPrefAdaptInterfaz || !session_user) {
        setDefaultValuesInterfaz();
    }
    
    if (needNarrator || !session_user) {
        setDefaultValuesNarrator();
    }
    
    if (needSr || !session_user) {
        setDefaultValuesSr();
    }

    if (needLSCTranslator || !session_user) {
        setDefaultValuesLSCTranslator();
    }


}
