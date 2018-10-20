let treeSn;
function dataStructuralNavigation() {
    loadTreeSn(document);
    if(!localStorage["isMinimizedToc"] || (localStorage["isMinimizedToc"] == "true")) {
        minimizeToc();
        document.getElementById("container-toc").style.display = "";
    } else {
        document.getElementById("container-toc").style.display = "";
        maximizeToc();
    }
    if(idView == 'lo_view') {
        htmlTableOfContents(iframeDocument)
    } else {
        htmlTableOfContents()
    }

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


function isValidNodeSn(node) {
    if ($(node).is(':hidden') && !$(node).is(':visible')) {
        console.log("invisible");
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
        document.getElementById("container-toc").style.left = (localStorage["tocLeftPos"] || "calc(100% - 340px)");
    },
    stop: function( event, ui ) {
        localStorage['tocTopPos'] = $(this).css('top');
        localStorage['tocLeftPos'] = $(this).css('left'); 
    },
});

