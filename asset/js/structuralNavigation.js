let treeSn;
function dataStructuralNavigation() {
    if (session_user && needStructuralNavigation) {
        console.log("swswswswswsw");
        localStorage['nav_strategy_id'] = preferencesStructuralNav['nav_strategy_id'];
        localStorage['showTOC'] = preferencesStructuralNav['showtoc'];
        console.log(localStorage['showTOC']);
        console.log(localStorage['nav_strategy_id']);
    }
    
    loadStructuralNavigation();

    if(!localStorage["isMinimizedToc"] || (localStorage["isMinimizedToc"] == "true")) {
        minimizeToc();
    } else {
        maximizeToc();
    }

    if(idView == 'lo_view') {
        htmlTableOfContents(iframeDocument);
    } else {
        htmlTableOfContents();
    }

    
}

$("input[name='showTOC']").change(function () {
    if ($(this).prop("checked")) {
        if (session_user && needStructuralNavigation && (localStorage['showTOC'] != "true") && !($(this).data('default'))) {
            updateValuesSnInSession(['showtoc'], ["true"]);
        }
        localStorage['showTOC'] = "true";
        document.getElementById("container-toc").style.display = "";
    } else {
        if (session_user && needStructuralNavigation  && (localStorage['showTOC'] != "false") && !($(this).data('default'))) {
            updateValuesSnInSession(['showtoc'], ["false"]);
        }
        localStorage['showTOC'] = "false";
        document.getElementById("container-toc").style.display = "none";
    }
    $(this).data('default', false);
});

$("input[name='navigation-strategy']").change(function () {
    let navigationStrategyId = $("input[name='navigation-strategy']:checked").val();
    setNavigationStrategy(navigationStrategyId, $(this).data('default'));
});

function loadStructuralNavigation() {
    $("input[name='navigation-strategy'][value=" + (localStorage['nav_strategy_id'] || '1') + "]").prop('checked', true).change();
    if (localStorage['showTOC'] == 't') {
        localStorage['showTOC'] = 'true';
    } else if (localStorage['showTOC'] == 'f') {
        localStorage['showTOC'] = 'false';
    }
    $("input[name='showTOC']").prop('checked', localStorage['showTOC'] == "true").change();
}

function updateValuesSnInSession(names_preferences_sn, values) {
    $.ajax({
        url: base_url + "usuario/update_preferences_snSession",
        type: "POST",
        dataType: "json",
        data: {
            "username": session_user['username'],
            "names_preferences_sn": names_preferences_sn,
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

function setDefaultValuesSn() {
    // el data-default sirve para realizar solo una peticion cuando se actualicen todos los valores
    $("input[name='navigation-strategy']").data('default', true);
    $("input[name='navigation-strategy'][value=" + ('1') + "]").prop('checked', true).change();
    $("input[name='showTOC']").data('default', true);
    $("input[name='showTOC']").prop('checked', true).change();

    if (session_user) {
        let names_preferences_sn = ['nav_strategy_id', 'showtoc'];
        let values = [1, true];
        updateValuesSnInSession(names_preferences_sn, values);
    }
}


function setNavigationStrategy(strategyId, setDefault) {
    let strategies = {
        '1': 'df',
        '2': 'bf'
    }
    let validStrategy = strategies[strategyId];

    if ((strategyId != localStorage['nav_strategy_id']) && needStructuralNavigation && !setDefault) {
        updateValuesSnInSession(['nav_strategy_id'], [parseInt(strategyId)]);
    }

    if(validStrategy == 'df') {
        loadTreeSn(document);
        dfsFocus();
    } else {
        bfsFocus(document.getElementsByTagName('body')[0], [], 1);
    }

    /* to not make many requests when the default values 
    are set a parameter is sent then in the others it is false */
    $("input[name='navigation-strategy']").data('default', false);

    localStorage['nav_strategy_id'] = strategyId;
}

function htmlTableOfContents (customDoc) {
    console.log(customDoc)
    let documentRef = customDoc || document;
    console.log(documentRef)
    let toc = document.getElementById('container-body-toc');
    let headings = [].slice.call(documentRef.body.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    console.log(headings)
    let ul = documentRef.createElement('ul')
    headings.forEach(function (heading, index) {
        let anchor = documentRef.createElement('a');
        anchor.setAttribute('name', 'toc' + index);
        anchor.setAttribute('id', 'toc' + index);
        
        

        let link = documentRef.createElement('a');
        link.textContent = heading.textContent;
        
        if(customDoc) {
            link.setAttribute('onclick', 'scrollInsideIframe("toc' + index + '")')
        } else {
            link.setAttribute('href', '#toc' + index);
        }

        let li = documentRef.createElement('li');
        
        li.appendChild(link);
        ul.appendChild(li);
        heading.parentNode.insertBefore(anchor, heading);
    });
    toc.appendChild(ul)
}


function isValidNodeSn(node) {
    let validTagNames = {
        "A": true,
        "INPUT": true,
        "SELECT": true,
        "TEXTAREA": true,
        "BUTTON": true,
    }
    if(!node) {
        return false;
    }

    if ($(node).is(':hidden') && !$(node).is(':visible')) {
        console.log("invisible");
        return false;
    }

    if(!validTagNames[node.tagName]) {
        return false;
    }

    return true;
}

function minimizeToc() {
    $('#container-body-toc').slideUp('fast', function() {
        $("#container-toc").css('height', '49px');
        $("#container-toc").css('padding-top', '9px');
        $("#minimize-toc").hide();
        $("#maximize-toc").show();
     });

     document.getElementById("container-toc").style.top = (localStorage["tocTopPos"] || "calc(100% - 49px)");
     document.getElementById("container-toc").style.left = (localStorage["tocLeftPos"] || "calc(100% - 340px)");
     
     localStorage['isMinimizedToc'] = true;
     isMinimizedToc = true;
}

function scrollInsideIframe(id) {
    let posElement = iframeDocument.getElementById(id).offsetTop
    $(iframeDocument).contents().scrollTop(posElement)
}

function maximizeToc() {
    let maxVWheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if((maxVWheight - parseInt($('#container-toc').css('top'), 10)) < 475) {
        $("#container-toc").css('top', '155px');
    }

    $("#minimize-toc").show();
    $("#maximize-toc").hide();
    $("#container-toc").css('height', '475px');
    $("#container-toc").css('padding-top', '10px');
    $('#container-body-toc').slideDown('fast');


    localStorage['isMinimizedToc'] = false;
    isMinimizedToc = false;
}

$( ".container-toc" ).draggable({
    containment: "parent", 
    scroll: false,
    create: function() {
        document.getElementById("container-toc").style.top = (localStorage["tocTopPos"] || "calc(100% - 49px)");
        document.getElementById("container-toc").style.left = (localStorage["tocLeftPos"] || "0px");
    },
    stop: function( event, ui ) {
        localStorage['tocTopPos'] = $(this).css('top');
        localStorage['tocLeftPos'] = $(this).css('left'); 
    },
});

function loadTreeSn(doc) {
    let filter = {
        acceptNode: function (n) {
            if (isValidNodeSn(n)) {
                return NodeFilter.FILTER_ACCEPT;
            } else {
                return NodeFilter.FILTER_SKIP;
            }
        }
    }
    try {
        treeSn = doc.createTreeWalker(doc.getElementsByTagName('body')[0], NodeFilter.SHOW_ELEMENT, filter, false);
    } catch {
        console.log("temporal");
    }
}

function dfsFocus() {
    while(treeSn.nextNode() || treeSn.nextSibling()) {
        treeSn.currentNode.tabIndex = ''
    }
}


function bfsFocus(currentElement, queue = [], tabindex) {
    if(isValidNodeSn(currentElement)) {
        currentElement.tabIndex = tabindex;
        tabindex += 1;
    }

    queue = queue.concat([].slice.apply(currentElement.childNodes));
    let nextElement = queue.shift();
    
    if(!!nextElement) {
        console.log(tabindex);
        return bfsFocus(nextElement, queue, tabindex);
    }
}
