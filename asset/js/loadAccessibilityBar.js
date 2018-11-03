$(document).ready(function () {
  if (idView == 'lo_view') {
    $("#oa").on('load', function () {
      nodeIframe = document.getElementsByTagName('IFRAME')[0];
      languages = {
        english: "Inglés",
        spanish: "Español",
        portuguese: "Portugués"
      }
      
      iframeDocument = nodeIframe.contentDocument || nodeIframe.contentWindow.document;
      // si el idioma elegido por el usuario es igual al idioma del learning object
      // entonces mostramos el objeto original. En otro caso traducimos el objeto.
      if (userLang == loLang) {
        try {
          iframeDocument.getElementById(":2.container").contentWindow.document.getElementById(":2.restore").click();
        } catch(e){
          console.log(e)
        }
      } else {
        try {
          nodeIframe.contentWindow.translate(languages[userLang])
        } catch {
          nodeIframe.contentWindow.translate(languages[userLang].toLowerCase())
        }
        
      }

      if (needNarrator || !session_user) {
        dataNarrator();
      }

      if (needSr || !session_user) {
        dataSr();
      }

      if (needPrefAdaptInterfaz || !session_user) {
        dataInterfaz();
      }

      if (needLSCTranslator || !session_user) {
        dataLSCTranslator();
      }

      if (needStructuralNavigation || !session_user) {
        dataStructuralNavigation()
      }

      if (needKeyboard || !session_user) {
        dataKeyboard();
      }
    });
  } else {
    if (needNarrator || !session_user) {
      dataNarrator();
    }

    if (needSr || !session_user) {
      dataSr();
    }

    if (needPrefAdaptInterfaz || !session_user) {
      dataInterfaz();
    }
    if (needLSCTranslator || !session_user) {
      dataLSCTranslator();
    }

    if (needStructuralNavigation || !session_user) {
      dataStructuralNavigation();
    }

    if (needKeyboard || !session_user) {
      dataKeyboard();
    }
  }
});