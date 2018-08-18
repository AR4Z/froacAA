$(document).ready(function(){
    if (idView == 'lo_view') {
        $("iframe").on('load', function () {
            nodeIframe = document.getElementsByTagName('IFRAME')[0];
            iframeDocument = nodeIframe.contentDocument || nodeIframe.contentWindow.document;
            dataNarrator();
            dataInterfaz();
        });
    } else {
        dataNarrator();
        dataInterfaz();   
    }
});