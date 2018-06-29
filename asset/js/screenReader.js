let currentNode;
let previousNodes = [];
let assistant;
let iframeDocument;

window.onload = function () {
    assistant = new Artyom();
    assistant.initialize({
        lang: "es-ES",
        debug: true
    });
};


let landmarks = getLandmarks(document.querySelectorAll('body *'));
let oaIframe = document.getElementById("oa");
if (oaIframe !== null) {
    oaIframe.addEventListener("load", function () {
        iframeDocument = oaIframe.contentDocument || oaIframe.contentWindow.document;
        iframeDocument.onkeydown = pulsarTecla;
        iframeDocument.onclick = clicked;
    });
}

function pulsarTecla(e) {
    var e = e || event;
    if (e.ctrlKey && e.keyCode === 32) {
        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }
        previousNodes = [];
        walkDOM(document.querySelectorAll('body *'));
    } else if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();

        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }
        walkDOM(restElements(currentNode, document.querySelectorAll('body *')));

    } else if (e.ctrlKey && e.keyCode === 74) {
        e.preventDefault();
        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }

        let newDOM = restElements(previousNodes[previousNodes.indexOf(currentNode) - 1], document.querySelectorAll('body *'));
        newDOM.unshift(previousNodes[previousNodes.indexOf(currentNode) - 1]);
        walkDOM(newDOM);
    } else if (e.ctrlKey && e.keyCode === 76) {
        e.preventDefault();
        if (assistant.isSpeaking()) {
            assistant.shutUp();
        }
        walkDOM(restElements(landmarks[nextLandmark(whichLandmark(currentNode))], document.querySelectorAll('body *')));
    }
}

function nextLandmark(landmark) {

    let foundLandmark = false;
    for (const [currentLandmark, firstLandmarkNode] of Object.entries(landmarks)) {
        if (foundLandmark) {
            return currentLandmark;
        }
        if (currentLandmark === landmark) {
            foundLandmark = true;
        }
    }
    return null;
}

function whichLandmark(node) {

    let landmark, nodes;
    for (const [currentLandmark, firstLandmarkNode] of Object.entries(landmarks)) {
        nodes = restElements(firstLandmarkNode, document.querySelectorAll('body *'));
        nodes.forEach(function (childNode) {
            if (node === childNode) {
                landmark = currentLandmark;
            }
        });
    }
    console.log(landmark);
    return landmark;
}

function getLandmarks(body) {
    let landmarks = {};
    let landmark;
    body.forEach(function (node) {
        if (node.hasAttribute("role")) {
            landmark = node.getAttribute("role") + " " + node.getAttribute("aria-label");
            if (!(landmark in landmarks)) {
                landmarks[landmark] = node;
            }
        }
    });
    return landmarks;
}


function clicked(e) {
    let elementClicked = e.target;

    if ((elementClicked.localName === 'a' || (elementClicked.textContent === "Siguiente »" || elementClicked.textContent === "« Anterior")) && assistant.isSpeaking()) {
        assistant.shutUp();
    }
}

function someNone(elements){
    let none = false;
    console.log(elements);
    elements.forEach(function (element) {
        if(element.style.display == "none"){
            none = true;
            return none;
        }
    });
    return none;
}


function parentsNode(element) {
    let a = element;
    let els = [];
    while (a) {
        if (a.nodeName != "#document"){
            els.unshift(a);
        }
        a = a.parentNode;
    }
    return els;
}



function walkDOM(body) {
    console.log(body);

    body.forEach(function (node) {
        console.log(node);
        let nodeParentIsNone = someNone(parentsNode(node));

        if(!nodeParentIsNone){
            if (node.nodeName === "A" || node.nodeName === "IMG" || node.nodeName === "BUTTON" || node.nodeName === "INPUT" || node.nodeName === "P" || node.nodeName == "H1" || node.nodeName == "H2" || node.nodeName == "H3"
                || node.nodeName == "H4" || node.nodeName == "H5" || node.nodeName == "H6" || node.nodeName == "TH" || node.nodeName == "TD" || node.nodeName == "STRONG") {
                let text;
                if (node.nodeName === "IMG") {
                    text = node.alt;
                } else if (node.nodeName === "INPUT") {
                    text = node.placeholder;
                } else {
                    text = node.textContent;
                }
                assistant.say(text, {
                    onStart: function () {
                        if (assistant.isSpeaking()) {
                            currentNode = node;
                            if (!previousNodes.includes(currentNode)) {
                                previousNodes.push(currentNode);
                            }
                            node.focus();
                        }
                    }
                });
            } else if (node.nodeName === "IFRAME") {
                let iframeBody = iframeDocument.querySelectorAll('body *');
                walkDOM(iframeBody);
            }
        }


    });


}

function restElements(element, body) {
    let join = false;
    let elements = [];
    body.forEach(function (node) {
        if (node === element) {
            join = true;
        }
        if (join && node !== element) {
            elements.push(node);
        }
    });

    if (!join && oaIframe !== null) {
        body = iframeDocument.querySelectorAll("body *");
        body.forEach(function (node) {
            if (node === element) {
                join = true;
            }
            if (join && node !== element) {
                elements.push(node);
            }


        });
    }

    return elements;
}

document.onkeydown = pulsarTecla;
//window.onclick = clicked;
