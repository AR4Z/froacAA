$(document).ready(function(){
    if (idView == 'lo_view') {
        $("iframe").on('load', function () {
            nodeIframe = document.getElementsByTagName('IFRAME')[0];
            iframeDocument = nodeIframe.contentDocument || nodeIframe.contentWindow.document;
            if(needNarrator || !session_user){
                dataNarrator();
            }
    
            if(needSr || !session_user){
                dataSr();
            }
    
            if(needPrefAdaptInterfaz || !session_user) {
                dataInterfaz();
            }
            if(needLSCTranslator || !session_user){
                dataLSCTranslator();
            }
        });
    } else {
        if(needNarrator || !session_user){
            dataNarrator();
        }

        if(needSr || !session_user){
            dataSr();
        }

        if(needPrefAdaptInterfaz || !session_user) {
            dataInterfaz();
        }
        if(needLSCTranslator || !session_user){
            dataLSCTranslator();
        }
    }
});