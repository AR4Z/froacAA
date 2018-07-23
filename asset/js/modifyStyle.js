$().ready(function(){
    if(session_user){
        /*localStorage['cursor_size_id'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['cursor_size_id']?>"
        localStorage['color_cursor'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['color_cursor']?>"
        localStorage['trail_cursor_size_id'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['trail_cursor_size_id']?>"
        localStorage['trail_cursor_color'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['trail_cursor_color']?>"
        localStorage['invert_color_general'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['invert_color_general']?>"
        localStorage['invert_color_image'] = "<?php echo $this->session->userdata('preferencesAdaptainterfaz')['invert_color_image']?>"
        localStorage['contrast_colors_id'] = <?php $this->session->userdata('preferencesAdaptainterfaz')['contrast_colors_id']?>
        localStorage['font_size'] = <?php $this->session->userdata('preferencesAdaptainterfaz')['font_size']?>
        localStorage['font_type_id'] = <?php $this->session->userdata('preferencesAdaptainterfaz')['font_type_id']?>
        localStorage['size_line_spacing'] = <?php $this->session->userdata('preferencesAdaptainterfaz')['size_line_spacing']?>

localStorage['invert_color_image'],
localStorage['contrast_colors_id'],
localStorage['font_size'],
localStorage['font_type_id'],
localStorage['size_line_spacing'] );*/
console.log("swsws");
    } else {
        console.log("nada");
    }
/*
    $(function() {
        $('#cp1, #cp2').colorpicker();
    });
    $('#inputFontSize').val(localStorage['font_size'] || 12).change();
    //changeFontSize('#inputFontSize');

    $('#inputInterlineSize').val(localStorage['size_line_spacing'] || 1.5).change();
    //changeInterlineSpace('#inputInterlineSize');

    $("input[value=" + (localStorage['contrast_colors_id'] || 'normalContrast') + "]").prop('checked', true).change();
    //highContrast($("input[name='radioOptionscontrast']:checked").val());

    $("select[name='type-font']").val(localStorage['font_type_id'] || 'open-sans').change();
    //changeFontFamily($("select[name='type-font']").val());
*/
    //changeMousePointer($("input[name='radioOptionsSizeCursor']:checked").val(), (localStorage['color_cursor'] || 'red'));
    /*if($("input[name='radioOptionsSizeCursor']:checked").val() != 'normalCursor'){
        $('#div-color-cursor').show();
        $("input[name='colorMousePointer']").val(localStorage['color_cursor'] || 'red');
        $("input[name='colorMousePointer']").change();
    }*/
/*
    $("input[value=" + (localStorage['trail_cursor_size_id'] || 'sizeCursorTrails0') + "]").prop('checked', true).change();
    //createTrail($("input[name='radioOptionsSizeCursorTrails']:checked").val(), (localStorage['trail_cursor_color'] || $("input[name='trail_cursor_color']").val()));
    /*if($("input[name='radioOptionsSizeCursorTrails']:checked").val() != 'sizeCursorTrails0'){
        $('#div-color-cursor-trails').show();
        $("input[name='trail_cursor_color']").val(localStorage['trail_cursor_color'] || 'red');
        $("input[name='trail_cursor_color']").change();
    }*//*
    $('.colorpicker').ready(function(){
        $("input[name='invertImages']").prop('checked', localStorage['invert_color_image'] === "true").change();
        $("input[name='invertGeneral']").prop('checked', localStorage['invert_color_general'] === "true").change();
    });*/
    //Modifica el estilo de las tablas agregadas
    //modifyTables();

    //Modifica el estilo de los encabezados de los formularios
    //modifyContentHeader();

    //Modifica el estilo de los contenedores de los campos de los formularios
    //modifyFieldForm();

    //Modifica el estilo de los campos de los formularios
    //modifyFields();

    //modifyButtonForm();
/*
    animate();
    //loadInterfacePersonalization();
*/
});

$('#fontAwesomess').ready(function(){
    $("input[value=" + (localStorage['cursor_size_id'] || 'normalCursor') + "]").prop('checked', true).change();
});

$("input[name='invertImages']").change(function(){
    if ($(this).prop("checked")) {
        $('img:not(.no-invert-color)').css('filter', 'invert(1)');
        $('i:not(.no-invert-color)').css('filter', 'invert(1)');
        localStorage['invert_color_image'] = true;
    } else {
        $('i:not(.no-invert-color)').css('filter', 'invert(0)');
        $('img:not(.no-invert-color)').css('filter', 'invert(0)');
        localStorage['invert_color_image'] = false;
    }
});
$("input[name='invertGeneral']").change(function(){
    if ($(this).prop("checked")) {
        $('body').css('filter', 'invert(1)');
        $('.colorpicker').addClass('no-invert-color');
        $('.no-invert-color').css('filter', 'invert(1)');
        $('i.no-invert-color').css('filter', 'invert(0)');
        localStorage['invert_color_general'] = true;
    } else {
        $('body').css('filter', 'invert(0)');
        $('.no-invert-color').css('filter', 'invert(0)');
        localStorage['invert_color_general'] = false;
    }
});


$("input[name='trail_cursor_color']").change(function(){
    let optionSizeTrail = $("input[name='radioOptionsSizeCursorTrails']:checked").val();
    createTrail(optionSizeTrail, $(this).val(), localStorage['invert_color_general']);
});

$("input[name='radioOptionsSizeCursorTrails']").change(function(){
    let optionSize = $("input[name='radioOptionsSizeCursorTrails']:checked").val();
    if(optionSize != 'sizeCursorTrails0'){
        $('#div-color-cursor-trails').show();
        //createTrail(optionSize, localStorage['trail_cursor_color'] || $("input[name='trail_cursor_color']").val(), localStorage['invert_color_general']);
        $("input[name='trail_cursor_color']").val(localStorage['trail_cursor_color'] || $("input[name='trail_cursor_color']").val()).change();
    } else {
        $('#div-color-cursor-trails').hide();
        createTrail(0);
    }
});

$("input[name='colorMousePointer']").change(function() {
    let optionSize = $("input[name='radioOptionsSizeCursor']:checked").val();
    let color = $(this).val();
    changeMousePointer(optionSize, color);
})

$("input[name='radioOptionsSizeCursor']").change(function() {
    let optionSize = $("input[name='radioOptionsSizeCursor']:checked").val();
    console.log(localStorage['color_cursor']);

    if (optionSize != '1') {
        $('#div-color-cursor').show();
        //changeMousePointer(optionSize, localStorage['color_cursor'] || $("input[name='colorMousePointer']").val());
        $("input[name='colorMousePointer']").val(localStorage['color_cursor'] || $("input[name='colorMousePointer']").val()).change();
    } else {
        $('#div-color-cursor').hide();
        changeMousePointer(optionSize);
    }
});

$("select[name='type-font']").change(function() {
    changeFontFamily($(this).val());
});

$("input[name='radioOptionscontrast']").change(function() {

    let optionCheckedContrast = $("input[name='radioOptionscontrast']:checked").val();
    console.log(optionCheckedContrast);
    highContrast(optionCheckedContrast);
});

$('.btn-number').click(function(e) {
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
$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
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
        changeInterlineSpace('#inputInterlineSize');
    } else {
        changeFontSize('#inputFontSize');
    }
});
$(".input-number").keydown(function(e) {
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


function modifyTables(){
    var table = $('table');

    //Envuelve las tablas generadas para que estas sean responsivas
    table.wrap('' +
        '<div class="row">' +
            '<div class="col-lg-12">' +
                '<div class="panel panel-default table">' +
                    //Table Head
                    '<div class="panel-body">' +
                        '<div class="dataTable_wrapper table-responsive">' +
                            //Table
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');


    var tableHead = $('div.panel-default.table');

    tableHead.prepend('<div class="panel-heading"></div>');

    //Agrega el estilo definido a todas las tablas generadas
    table.removeClass();
    table.addClass('table table-striped table-bordered table-hover');
}

function modifyContentHeader(){
    var contentHeader = $('div.contentHeader');

    var titleContentHeader = $('div.contentHeader h1');
    var linkContentHeader = $('div.contentHeader a');

    var tableHeader = $('.table div.panel-heading');

    tableHeader.html(titleContentHeader.text() +
        '<a class="pull-right" href="' + linkContentHeader.attr('href') + '">' + linkContentHeader.text() + '</a>');

    contentHeader.wrap('<div class="row"></div>');
    contentHeader.removeClass();
    contentHeader.addClass('col-lg-12');
    titleContentHeader.removeClass();
    titleContentHeader.addClass('page-header');
    linkContentHeader.remove();
}

function modifyFieldForm(){
    var fieldForm = $('div.fieldForm');

    fieldForm.each(function(){
        $(this).removeClass();
        $(this).addClass('form-group');
    });
}

function modifyFields(){

    var labels = $('div.form-group label');

    labels.addClass('control-label col-xs-12 col-sm-4 col-md-4');

    var selectors = [];

    selectors.push($('div.form-group :input'));
    selectors.push($('div.form-group :file'));
    selectors.push($('div.form-group :password'));
    selectors.push($('div.form-group :radio'));
    selectors.push($('div.form-group :checkbox'));

    $.each(selectors, function(){
        this.removeClass();
        this.addClass('form-control');

        this.wrap('<div class="col-xs-12 col-sm-8 col-md-8"></div>');
    });
}

function modifyButtonForm(){
    var buttonForm = $('div.buttonForm');

    buttonForm.addClass('col-sm-4 col-sm-offset-4');
}
/*
function loadInterfacePersonalization(){

    var target = document.querySelector('#tab5');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation.type);
            if($('#tab5').hasClass('active')){
                $('li#accessibilityNav').css('display', 'none');

                changeFontSize('input#font_size');
                changeInterlineSpace('input#interline');

                var contrastOptionSelected = $('select#contrastNav').find("option:selected");
                var contrastValueSelected = contrastOptionSelected.val();
                $('select#contrast').val(contrastValueSelected);
                highContrast('select#contrast');

                var fontOptionSelected = $('select#fontNav').find("option:selected");
                var fontValueSelected = fontOptionSelected.val();
                $('select#font').val(fontValueSelected);
                changeFontFamily('select#font');
            }else{
                $('li#accessibilityNav').css('display', '');
                observer.disconnect();
            }
        });
    });
    if(target){
        observer.observe(target, { attributes: true, childList: true, characterData: true, subtree: true });
    }

}*/


function changeFontSize(selector){

    selector = (typeof selector == 'undefined') ? 'input#fontSizeNav' : selector ;
    /*
    var selectors = [];

    selectors.push($('body'));
    selectors.push($('h1'));
    selectors.push($('h2'));
    selectors.push($('h3'));
    selectors.push($('h4'));
    selectors.push($('h5'));
    selectors.push($('h6'));
    selectors.push($('span'));
    selectors.push($('p'));*/


    /*$(selector).change(function(){
        $.each(selectors, function(){
            var actualSize = this.css('font-size');
            var actualSizeFloat = parseFloat(actualSize);
            console.log(actualSize)
            //var newSize = (actualSizeFloat * $(selector).val())/change;
            //change = $(selector).val();
            if(increment){
                this.css('font-size', actualSizeFloat + 1.6);
            } else if(decrement) {
                this.css('font-size', actualSizeFloat - 1.6);
            }
        });

    });*/
    /*$.each(selectors, function(){
        let name  = this.prop("nodeName") || this.prop('tagName');
        if(name == undefined){
            return;
        }
        console.log(this);
        //console.log(name);
        var actualSize = elementFonts[name.toLowerCase()];
        var actualSizeFloat = parseFloat(actualSize);
        //var newSize = (actualSizeFloat * $(selector).val())/change;
        //change = $(selector).val();

        this.css('font-size', actualSizeFloat + (($(selector).val() - 1) * 10) * 1.6);
        //this.css('font-size', actualSizeFloat - (($(selector).val() - 1) * 10) * 1.6);
    });*/
    localStorage['font_size'] = $(selector).val();
    $('html').css('font-size', $(selector).val() + 'px');
}

function changeMousePointer(cursor_size_id, color_cursor){
    let sizeOptionsCursor = {
        '1': 0,
        '2': 16,
        '3': 32,
        '4': 48
    }
    let sizeInt = sizeOptionsCursor[cursor_size_id];
    if(sizeInt){
        $('body').awesomeCursor('mouse-pointer', {
            size: sizeInt,
            color: color_cursor
        });
    } else {
        $('body').css('cursor', '');
    }
    localStorage['cursor_size_id'] = cursor_size_id;
    localStorage['color_cursor'] = color_cursor || localStorage['color_cursor'];
}

function highContrast(optionContrast){
    // clase asociada a valores del contraste
    let classNameContrastOptions = {
        '1':'default',
        '3': 'fl-theme-wb',
        '2':'fl-theme-bw',
        '5':'fl-theme-yb',
        '4':'fl-theme-by',
        '6': 'fl-theme-lgdg',
        '7': 'customized'
    }
    // obtengo la clase de acuerdo al contraste elegido
    let classNameContrast = classNameContrastOptions[optionContrast];
    console.log(classNameContrast);
    // elimino la clase que tenia el body
    $('body').removeClass(classNameContrastOptions[localStorage['contrast_colors_id']]);

    if(optionContrast === '1'){
        $('.colorpicker').removeClass('no-high-contrast');
        $('.colorpicker-saturation').removeClass('no-high-contrast');
        $('.colorpicker-saturation').children().addClass('no-high-contrast');
        $('.colorpicker-saturation').children().children().addClass('no-high-contrast');
        $('.colorpicker-guide').removeClass('no-high-contrast');
        $('.colorpicker-hue').removeClass('no-high-contrast');
        $('.colorpicker-alpha').removeClass('no-high-contrast');
        $('.colorpicker-color').children().removeClass('no-high-contrast');
    } else {
        // agrego la clase obtenida al body para cambiar los colores
        $('body').addClass(classNameContrast);
        // no quiero aplicar el alto contraste al colorpicker
        $('.colopicker').ready(function(){
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
    // almaceno el valor elegido de contraste en el localStorage
    localStorage['contrast_colors_id'] = optionContrast;
}

function changeFontFamily(fontID){
    let fontsID = {
        '1':'open-sans',
        '2':'serif',
        '3':'cantarell',
        '4':'source-code-pro'
    }
    let fontsURL = {
        'open-sans':'https://fonts.googleapis.com/css?family=Open+Sans',
        'serif':'https://fonts.googleapis.com/css?family=PT+Serif',
        'cantarell':'https://fonts.googleapis.com/css?family=Cantarell',
        'source-code-pro': 'https://fonts.googleapis.com/css?family=Source+Code+Pro'
    }
    let fontsNameCSS = {
        'open-sans':"'Open Sans', sans-serif",
        'serif':"'PT Serif', serif",
        'cantarell':"'Cantarell', sans-serif",
        'source-code-pro': "'Source Code Pro', monospace"
    }
    let fontName = fontsID[fontID]
    $('#font').attr('href', fontsURL[fontName]);
    $('body').css('font-family', fontsNameCSS[fontName]);
    localStorage['font_type_id'] = fontID;
}

function changeInterlineSpace(selector){

    selector = (typeof selector == 'undefined') ? '#interlineNav' : selector ;
    /*
    var selectors = [];

    selectors.push($('body'));
    selectors.push($('header'));
    selectors.push($('nav'));
    selectors.push($('section'));
    selectors.push($('footer'));
    selectors.push($('td'));

    $(selector).val(parseInt($('body').css('line-height')));

    $(selector).change(function(){

        var interline = parseInt($(selector).val());

        $.each(selectors, function(){

            /*var actualInterline = this.css('line-height');
            var actualInterlineFloat = parseFloat(actualInterline);
            var newInterline = actualInterlineFloat + 1;
            this.css('line-height', interline + 'px');

            //console.log(this.selector);
            //console.log(newInterline);
        });
    });*/

    $('body').css('line-height', $(selector).val());
    localStorage['size_line_spacing'] = $(selector).val();
}


let dots = [], mouse = {
                x: 0,
                y: 0
                };


let Dot = function() {
  this.x = 0;
  this.y = 0;
  this.node = (function(){
    let n = document.createElement("div");
    n.className = "trail no-high-contrast no-invert-color";
    document.body.appendChild(n);
    return n;
  }());
};


Dot.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

function createTrail(optionLenTrails, colorTrails, invert_color_general){
    let lenTrail = {
        "sizeCursorTrails0": 0,
        "sizeCursorTrails12": 12,
        "sizeCursorTrails24": 24
    }
    let lenInt = lenTrail[optionLenTrails];
    if(lenInt){
        if(optionLenTrails != localStorage['trail_cursor_size_id'] || (dots.length != lenInt)){
            $('.trail').remove();
            dots = [];
            for (var i = 0; i < lenInt; i++) {
              var d = new Dot();
              dots.push(d);
            }
        }
        if(invert_color_general == "true"){
            $('.trail').css('background', colorTrails);
            $('.trail').css('filter', 'invert(1)');
        } else {
            $('.trail').css('background', colorTrails);
        }

    } else {
        $('.trail').remove();
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
  dots.forEach(function(dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;

  });
}

addEventListener("mousemove", function(event) {
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
