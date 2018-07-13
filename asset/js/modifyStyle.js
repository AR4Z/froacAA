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

    //changeFontSize();

    animate();
    loadInterfacePersonalization();
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

}


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

    $('html').css('font-size', $(selector).val()+'px');
}

function changeMousePointer(sizePointer){
    let colorPointer = $('#colorMousePointer').val();
    if(sizePointer){
        $('body').awesomeCursor('mouse-pointer', {
            color: colorPointer,
            size: sizePointer
        });
    } else {
        console.log("tumbarlo");
    }

}

function highContrast(theme, selector){
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
    if(theme === 'normal'){
        $('body').removeAttr('class');
    } else if(theme === 'white-black'){
        $('body').attr('class', 'fl-theme-wb');

    } else if(theme === 'black-white'){
        $('body').attr('class', 'fl-theme-bw');

    } else if(theme === 'yellow-black'){
        $('body').attr('class', 'fl-theme-yb');
    } else if(theme === 'black-yellow'){
        $('body').attr('class', 'fl-theme-by');
    } else if(theme === 'gray'){
        $('body').attr('class', 'fl-theme-lgdg');
    }
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
    n.className = "trail no-high-contrast";
    document.body.appendChild(n);
    return n;
  }());
};


Dot.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

function createDots(nDots){
    // Creates the Dot objects, populates the dots array
    dots = [];
    for (var i = 0; i < nDots; i++) {
      var d = new Dot();
      dots.push(d);
    }
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
    console.log("animate");
  draw();
  requestAnimationFrame(animate);
}

// And get it started by calling animate().
