/**
 * Created by magir on 4/03/2016.
 */

$().ready(function(){

    //Modifica el estilo de las tablas agregadas
    //modifyTables();

    //Modifica el estilo de los encabezados de los formularios
    //modifyContentHeader();

    //Modifica el estilo de los contenedores de los campos de los formularios
    //modifyFieldForm();

    //Modifica el estilo de los campos de los formularios
    //modifyFields();

    //modifyButtonForm();

    animate();
    //loadInterfacePersonalization();

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

                changeFontSize('input#fontSize');
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
    localStorage['fontSize'] = $(selector).val();
    $('html').css('font-size', $(selector).val() + 'px');
}

function changeMousePointer(sizeCursor, colorCursor){
    let sizeOptionsCursor = {
        'normalCursor': 0,
        'cursorSize16': 16,
        'cursorSize32': 32,
        'cursorSize40': 48
    }
    let sizeInt = sizeOptionsCursor[sizeCursor];
    if(sizeInt){
        $('body').awesomeCursor('mouse-pointer', {
            size: sizeInt,
            color: colorCursor
        });
    } else {
        $('body').css('cursor', '');
    }
    localStorage['sizeCursor'] = sizeCursor;
    localStorage['colorCursor'] = colorCursor || localStorage['colorCursor'];
}

function highContrast(optionContrast, selector){
    /*
    selector = (typeof selector == 'undefined') ? 'select#contrastNav' : selector ;

    var selectors = [];

    selectors.push($('*'));

    var activeHC;

    $(selector).change(function(){

        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();

        if(!activeHC){
            activeHC = valueSelected;
        }

        $.each(selectors, function(){

            this.removeClass(activeHC);
            this.addClass(valueSelected);
        });

        activeHC = valueSelected;

        if(selector === 'select#contrastNav'){
            $('select#contrast').val(valueSelected);
        }else if(selector === 'select#contrast'){
            $('select#contrastNav').val(valueSelected);
        }
    });*/

    let classNameContrastOptions = {
        'white-black': 'fl-theme-wb',
        'black-white':'fl-theme-bw',
        'yellow-black':'fl-theme-yb',
        'black-yellow':'fl-theme-by',
        'gray': 'fl-theme-lgdg'
    }
    let classNameContrast = classNameContrastOptions[optionContrast];

    if(optionContrast === 'normalContrast'){
        $('body').removeAttr('class');
        $('.colorpicker').removeClass('no-high-contrast');
        $('.colorpicker-saturation').removeClass('no-high-contrast');
        $('.colorpicker-saturation').children().addClass('no-high-contrast');
        $('.colorpicker-saturation').children().children().addClass('no-high-contrast');
        $('.colorpicker-guide').removeClass('no-high-contrast');
        $('.colorpicker-hue').removeClass('no-high-contrast');
        $('.colorpicker-alpha').removeClass('no-high-contrast');
        $('.colorpicker-color').children().removeClass('no-high-contrast');
    } else {
        $('body').removeAttr('class');
        $('body').addClass(classNameContrast);
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
    localStorage['contrast'] = optionContrast;
}

function changeFontFamily(fontName, selector){
    /*
    selector = (typeof selector == 'undefined') ? 'select#fontNav' : selector ;

    var selectors = [];

    selectors.push($('body'));

    $(selector).change(function(){

        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();

        //console.log(valueSelected);

        $.each(selectors, function(){
            this.css('font-family', valueSelected);
        });

        if(selector === 'select#fontNav'){
            $('select#font').val(valueSelected);
        }else if(selector === 'select#font'){
            $('select#fontNav').val(valueSelected);
        }
    });*/

    let fontsURL = {
        'open-sans':'https://fonts.googleapis.com/css?family=Open+Sans',
        'serif':'https://fonts.googleapis.com/css?family=PT+Serif',
        'cantarell':'https://fonts.googleapis.com/css?family=Cantarell',
        'source-code-pro': 'https://fonts.googleapis.com/css?family=Source+Code+Pro'
    }
    let fontsName = {
        'open-sans':"'Open Sans', sans-serif",
        'serif':"'PT Serif', serif",
        'cantarell':"'Cantarell', sans-serif",
        'source-code-pro': "'Source Code Pro', monospace"
    }
    console.log(fontName);
    $('#font').attr('href', fontsURL[fontName]);
    console.log(fontsName[fontName]);
    $('body').css('font-family', fontsName[fontName]);
    console.log($('body').css('font-family'));
    localStorage['font-family'] = fontName;
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
    localStorage['interlineSize'] = $(selector).val();
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

function createTrail(optionLenTrails, colorTrails, invertColorsGeneral){
    let lenTrail = {
        "sizeCursorTrails0": 0,
        "sizeCursorTrails12": 12,
        "sizeCursorTrails24": 24
    }
    let lenInt = lenTrail[optionLenTrails];
    if(lenInt){
        if(optionLenTrails != localStorage['sizeCursorTrails'] || (dots.length != lenInt)){
            $('.trail').remove();
            dots = [];
            for (var i = 0; i < lenInt; i++) {
              var d = new Dot();
              dots.push(d);
            }
        }
        if(invertColorsGeneral == "true"){
            $('.trail').css('background', colorTrails);
            $('.trail').css('filter', 'invert(1)');
        } else {
            $('.trail').css('background', colorTrails);
        }

    } else {
        $('.trail').remove();
    }
    localStorage['sizeCursorTrails'] = optionLenTrails;
    localStorage['colorCursorTrails'] = colorTrails || localStorage['colorCursorTrails'];
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
