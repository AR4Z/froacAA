class Tour {
  constructor() {
    this.synth = window.speechSynthesis
    this.voices = this.synth.getVoices()
    this.lastStepTour = 0

    this.carouselControlsElm = document.getElementById('controlsAccessibilityTools');
    this.carouselControls = new Carousel(this.carouselControlsElm, {
      interval: false,
      pause: false,
      keyboard: false
    })

    this.controlsModal = document.getElementById('controlsModal')
    this.controlsModalInit = new Modal(this.controlsModal)

    this.messages = {
      spanish: {
        done: 'Terminar',
        close: 'Cerrar',
        next: 'Siguiente',
        previous: 'Anterior',
        welcome: {
          title: '¡Bienvenido a FROAC!',
          description: 'Contamos con herramientas de accesibilidad para ayudarte a navegar en nuestro sitio. En esta guia aprenderas a usarlas para que puedas sacar el mayor provecho.'
        },
        screenReaderControls: {
          title: 'Atajos lector de pantalla',
          description: 'Ctrl + s Encender lector de pantalla. Ctrl + d Leer el siguiente elemento. Ctrl + p Devolver al elemento anterior. Ctrl + f Cambia el modo de automático a manual o manual a automático. Ctrl + a Apaga el lector de pantalla.'
        },
        narratorControls: {
          title: 'Atajos narrador',
          description: 'Ctrl + e Enciende el narrador'
        },
        voiceCommands: {
          title: 'Comandos de voz',
          description: 'Ir a *nombre enlace* Hace click en el enlace. Enfocar campo *nombre campo* Enfoca el campo para escribir. Enviar formulario Envia el formulario que se este enfocando. Escribir *contenido* Escribe en el campo que se este enfocando.'
        },
        lscTranslator: {
          title: 'Traductor a señas',
          description: 'Para usar el traductor basta con seleccionar el texto que quiera ser traducido.'
        },
        magnifier: {
          title: 'Uso de magnificador',
          description: 'Manteniendo oprimida la tecla Ctrl dar clic en cualquier parte de la página donde quiera usar el magnificador. Para desactivar el efecto del magnificador mantenga oprimida la tecla Ctrl y haga clic.'
        },
        'card-font-size': {
          title: 'Tamaño de fuente',
          description: 'Cambia el tamaño de la fuente escribiendo un número entre 9 y 36.'
        },
        'card-interline-size': {
          title: 'Tamaño de interlineado',
          description: 'Cambia el espacio entre una línea y otra con un numero entre 1 y 2.'
        },
        'card-contrast-colors': {
          title: 'Contraste',
          description: 'Cambia los colores para una mejor visibilidad del contenido.'
        },
        'card-font-type': {
          title: 'Tipo de fuente',
          description: 'Puede cambiar el tipo de fuente con el cual se muestra el cotenido.'
        },
        'card-config-cursor': {
          title: 'Configuración del cursor',
          description: 'Cambiar el tamaño del cursor y añadir un rastro que le permita ubicar rápidamente a este.'
        },
        'card-narrator-speed': {
          title: 'Velocidad de lectura',
          description: 'Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.'
        },
        'card-narrator-pitch': {
          title: 'Tono de voz',
          description: 'Elige entre estas opciones para que la voz sea mucho más amigable.'
        },
        'card-narrator-volume': {
          title: 'Volumen de voz',
          description: 'Cambie el volumen de voz'
        },
        'card-narrator-voice-gender': {
          title: 'Genero de voz',
          description: 'Cambie el genero de  la voz.'
        },
        'card-narrator-link': {
          title: 'Enlaces',
          description: 'Puede configurar cual va a ser el comportamiento a la hora de leer un enlace. Reproducir un sonido especial, un efecto de voz o no leerlo.'
        },
        'card-narrator-highlight': {
          title: 'Resaltado de texto',
          description: 'Que porción del texto va a ser resaltada cuando se lee un elemento. Una palabra, línea, oración o parrafo.'
        },
        'card-narrator-read-mode': {
          title: 'Lectura',
          description: 'Que porción del texto va a ser leida. Una palabra, línea, oración o parrafo.'
        },
        'card-screen-reader-speed': {
          title: 'Velocidad de lectura',
          description: 'Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.'
        },
        'card-screen-reader-pitch': {
          title: 'Tono de voz',
          description: 'Elige entre estas opciones para que la voz sea mucho más amigable.'
        },
        'card-screen-reader-volume': {
          title: 'Volumen de voz',
          description: 'Cambie el volumen de voz'
        },
        'card-screen-reader-voice-gender': {
          title: 'Genero de voz',
          description: 'Cambie el genero de  la voz.'
        },
        'card-screen-reader-link': {
          title: 'Enlaces',
          description: 'Puede configurar cual va a ser el comportamiento a la hora de leer un enlace. Reproducir un sonido especial, un efecto de voz o no leerlo.'
        },
        'card-lsc-translator-speed': {
          title: 'Velocidad de señas',
          description: 'Cambie la velocidad con la cual se traduce el mensaje al lenguaje de señas. 10, 20, 30 o 40 son los valores válidos.'
        },
        'card-lsc-translator-model': {
          title: 'Tipo de intérprete',
          description: 'Elija quien hará la traducción del mensaje, un avatar o un humano.'
        },
        'card-show-lsc-translator': {
          title: 'Traductor LSC',
          description: 'Elija si desea ver o no el traductor a lenguaje de señas.'
        },
        'card-structural-nav-strategy-nav': {
          title: 'Estrategia de navagación',
          description: 'Cambie el orden en el cual se enfocan los elementos.'
        },
        'card-structural-nav-show-toc': {
          title: 'Ver tabla de cotenido',
          description: 'Elija si quiere ver o no la tabla de contenidos del sitio. La tabla de contenidos le permite ver una lista de los encabezados de la página y acceder a ellos rápidamente.'
        },
        'card-virtual-keyboard-size': {
          title: 'Tamaño del teclado',
          description: 'Cambie el tamaño del teclado virtual.'
        },
        'card-virtual-keyboard-key-sound': {
          title: 'Sonido del teclado',
          description: 'Puede reproducir o no un sonido al presionar una tecla del teclado virtual.'
        },
        'card-virtual-keyboard-use': {
          title: 'Usar teclado',
          description: 'Puede activar o desactivar el uso del teclado virtual.'
        }
      },
      portuguese: {
        done: 'Terminar',
        close: 'Fechar',
        next: 'Próximo',
        previous: 'Anterior',
        welcome: {
          title: '¡Bem vindo ao FROAC!',
          description: 'Temos ferramentas de acessibilidade para ajudá-lo a navegar em nosso site. Neste guia, você aprenderá a usá-las para aproveitar ao máximo.'
        },
        screenReaderControls: {
          title: 'Atalhos do Leitor de Tela',
          description: 'Ctrl + s Liga o leitor de tela. Ctrl + d Lê o próximo elemento. Ctrl + p Volta para o elemento anterior. Ctrl + f Altera o modo de automático para manual ou manual para automático. Ctrl + a Desativa o leitor de tela.'
        },
        narratorControls: {
          title: 'Atalhos do narrador',
          description: 'Ctrl + e Liga o narrador'
        },
        voiceCommands: {
          title: 'Comandos de voz',
          description: 'Ir para *link do nome* Clique no link. Campo de foco *nome do campo* Foque o campo para escrever. Enviar formulário Envie o formulário que você está focando. Escreva *conteúdo* Escreva no campo que você está focando.'
        },
        lscTranslator: {
          title: 'Tradutor para assinar',
          description: 'Para usar o tradutor, basta selecionar o texto que você deseja traduzir.'
        },
        magnifier: {
          title: 'Utilização da lupa',
          description: 'Mantenha pressionada a tecla Ctrl e clique em qualquer lugar da página onde você deseja usar a lupa. Para desactivar o efeito de lupa, mantenha premida a tecla Ctrl e clique.'
        },
        'card-font-size': {
          title: 'Tamanho da fonte',
          description: 'Altere o tamanho da fonte digitando um número entre 9 e 36.'
        },
        'card-interline-size': {
          title: 'Tamanho do espaçamento de linha',
          description: 'Altere o espaço entre uma linha e outra com um número entre 1 e 2.'
        },
        'card-contrast-colors': {
          title: 'Contraste',
          description: 'Altere as cores para melhor visibilidade do conteúdo.'
        },
        'card-font-type': {
          title: 'Tipo de fonte',
          description: 'Você pode alterar o tipo de fonte com o qual o cotenid é exibido.'
        },
        'card-config-cursor': {
          title: 'Configurações do cursor',
          description: 'Altere o tamanho do cursor e adicione uma trilha que permita localizá-lo rapidamente.'
        },
        'card-narrator-speed': {
          title: 'Velocidade de leitura',
          description: 'Escolha entre essas opções a velocidade com que os objetos de aprendizagem serão lidos.'
        },
        'card-narrator-pitch': {
          title: 'Tom de voz',
          description: 'Escolha entre essas opções para que a voz seja muito mais amigável.'
        },
        'card-narrator-volume': {
          title: 'Volume de voz',
          description: 'Alterar o volume da voz'
        },
        'card-narrator-voice-gender': {
          title: 'Gênero de voz',
          description: 'Altere o gênero da voz.'
        },
        'card-narrator-link': {
          title: 'Links',
          description: 'Você pode configurar qual será o comportamento ao ler um link. Tocar um som especial, um efeito de voz ou não lê-lo.'
        },
        'card-narrator-highlight': {
          title: 'Realçar texto',
          description: 'Qual parte do texto será destacada quando um elemento for lido. Uma palavra, linha, frase ou parágrafo.'
        },
        'card-narrator-read-mode': {
          title: 'Leitura',
          description: 'Qual parte do texto será lida. Uma palavra, linha, frase ou parágrafo.'
        },
        'card-screen-reader-speed': {
          title: 'Velocidade de leitura',
          description: 'Escolha entre essas opções a velocidade com que os objetos de aprendizagem serão lidos.'
        },
        'card-screen-reader-pitch': {
          title: 'Tom de voz',
          description: 'Escolha entre essas opções para que a voz seja muito mais amigável.'
        },
        'card-screen-reader-volume': {
          title: 'Volume de voz',
          description: 'Alterar o volume da voz'
        },
        'card-screen-reader-voice-gender': {
          title: 'Gênero de voz',
          description: 'Altere o gênero da voz.'
        },
        'card-screen-reader-link': {
          title: 'Links',
          description: 'Você pode configurar qual será o comportamento ao ler um link. Tocar um som especial, um efeito de voz ou não lê-lo.'
        },
        'card-structural-nav-strategy-nav': {
          title: 'Estratégia de navegação',
          description: 'Altere a ordem na qual os elementos estão focalizados.'
        },
        'card-structural-nav-show-toc': {
          title: 'Veja o índice',
          description: 'Escolha se deseja ou não ver o índice do site. O índice permite que você veja uma lista dos cabeçalhos da página e acesse-os rapidamente.'
        },
        'card-virtual-keyboard-size': {
          title: 'Tamanho do teclado',
          description: 'Altere o tamanho do teclado virtual.'
        },
        'card-virtual-keyboard-key-sound': {
          title: 'Som do teclado',
          description: 'Você pode tocar um som ou não pressionando uma tecla no teclado virtual.'
        },
        'card-virtual-keyboard-use': {
          title: 'Use o teclado',
          description: 'Você pode ativar ou desativar o uso do teclado virtual.'
        }
      },
      english: {
        done: 'Done',
        close: 'Close',
        next: 'Next',
        previous: 'Previous',
        welcome: {
          title: '¡Welcome to FROAC!',
          description: 'We have accessibility tools to help you navigate our site. In this guide you will learn to use them so that you can get the most out of them.'
        },
        screenReaderControls: {
          title: 'Screen reader shortcuts',
          description: 'Ctrl + s Turn on screen reader. Ctrl + d Read the next element. Ctrl + p Return to the previous element. Ctrl + f Changes the mode from automatic to manual or manual to automatic. Ctrl + a Turn off the screen reader.'
        },
        narratorControls: {
          title: 'Narrator Shortcuts',
          description: 'Ctrl + e Turn on the narrator'
        },
        voiceCommands: {
          title: 'Voice commands',
          description: 'Go to *name link* Click on the link. Focus field *field name* Focus the field to write. Send form Send the form that you are focusing. Write *content* Write in the field you are focusing on.'
        },
        lscTranslator: {
          title: 'Translator to sign',
          description: 'To use the translator, just select the text that you want to be translated.'
        },
        magnifier: {
          title: 'Use of magnifier',
          description: 'Hold down the Ctrl key and click anywhere on the page where you want to use the magnifier. To deactivate the magnifier effect hold down the Ctrl key and click.'
        },
        'card-font-size': {
          title: 'Font size',
          description: 'Change the font size by typing a number between 9 and 36.'
        },
        'card-interline-size': {
          title: 'Line spacing size',
          description: 'Change the space between one line and another with a number between 1 and 2.'
        },
        'card-contrast-colors': {
          title: 'Contrast',
          description: 'Change the colors for better visibility of the content.'
        },
        'card-font-type': {
          title: 'Font type',
          description: 'You can change the font type with which the cotenid is displayed.'
        },
        'card-config-cursor': {
          title: 'Cursor settings',
          description: 'Change the size of the cursor and add a trail that allows you to quickly locate it.'
        },
        'card-narrator-speed': {
          title: 'Reading speed',
          description: 'Choose among these options the speed with which the learning objects will be read.'
        },
        'card-narrator-pitch': {
          title: 'Voice tone',
          description: 'Choose between these options so that the voice is much friendlier.'
        },
        'card-narrator-volume': {
          title: 'Voice volume',
          description: 'Change the voice volume'
        },
        'card-narrator-voice-gender': {
          title: 'Gender of voice',
          description: 'Change the gender of the voice.'
        },
        'card-narrator-link': {
          title: 'Links',
          description: 'You can configure what the behavior will be when reading a link. Play a special sound, a voice effect or not read it.'
        },
        'card-narrator-highlight': {
          title: 'Highlight text',
          description: 'What portion of the text will be highlighted when an element is read. A word, line, sentence or paragraph.'
        },
        'card-narrator-read-mode': {
          title: 'Reading',
          description: 'What portion of the text will be read. A word, line, sentence or paragraph.'
        },
        'card-screen-reader-speed': {
          title: 'Reading speed',
          description: 'Choose among these options the speed with which the learning objects will be read.'
        },
        'card-screen-reader-pitch': {
          title: 'Voice tone',
          description: 'Choose between these options so that the voice is much friendlier.'
        },
        'card-screen-reader-volume': {
          title: 'Voice volume',
          description: 'Change the voice volume'
        },
        'card-screen-reader-voice-gender': {
          title: 'Gender of voice',
          description: 'Change the gender of the voice.'
        },
        'card-screen-reader-link': {
          title: 'Links',
          description: 'You can configure what the behavior will be when reading a link. Play a special sound, a voice effect or not read it.'
        },
        'card-lsc-translator-speed': {
          title: 'Signal speed',
          description: 'Change the speed with which the message is translated into sign language. 10, 20, 30 or 40 are the valid values.'
        },
        'card-lsc-translator-model': {
          title: 'Model',
          description: 'Choose who will do the translation of the message, an avatar or a human.'
        },
        'card-structural-nav-strategy-nav': {
          title: 'Navigation strategy',
          description: 'Change the order in which the elements are focused.'
        },
        'card-structural-nav-show-toc': {
          title: 'See table of contents',
          description: 'Choose whether or not you want to see the table of contents of the site. The table of contents allows you to see a list of the headers of the page and access them quickly.'
        },
        'card-virtual-keyboard-size': {
          title: 'Keyboard size',
          description: 'Change the size of the virtual keyboard.'
        },
        'card-virtual-keyboard-key-sound': {
          title: 'Keyboard sound',
          description: 'You can play a sound or not by pressing a key on the virtual keyboard.'
        },
        'card-virtual-keyboard-use': {
          title: 'Use keyboard',
          description: 'You can activate or deactivate the use of the virtual keyboard.'
        }
      }
    }
    this.driver = new Driver({
      doneBtnText: this.messages[userLang].done, // Text on the final button
      closeBtnText: this.messages[userLang].close, // Text on the close button for this step
      nextBtnText: this.messages[userLang].next, // Next button text for this step
      prevBtnText: this.messages[userLang].previous,
      allowClose: false,
      onHighlighted: (elm) => {
        if (this.synth.speaking) {
          this.synth.cancel()
        }

        this.speech()
      },
      onReset: () => {
        if (this.synth.speaking) {
          this.synth.cancel()
        }

        if (window.accessibilityBar.lscTranslator &&
          window.accessibilityBar.lscTranslator.isTranslating) {
          window.accessibilityBar.lscTranslator.stop()
        }

        window.accessibilityBar.collapseInstance.hide()
        let handlerControlsModal = () => {
          this.speech('controls')

          hotkeys('enter,left,right', (event, handler) => {
            switch (handler.key) {
              case 'left':
                {
                  this.prevControlsSlide()
                  break
                }
              case 'right':
                {
                  this.nextControlsSlide()
                  break
                }
              case 'enter':
                {
                  if (this.carouselControls.getActiveIndex() == 2) {
                    this.controlsModalInit.hide()
                  }
                  break
                }
            }
          })

          this.controlsModal.removeEventListener('shown.bs.modal', handlerControlsModal)
        }

        let handlerSlides = () => {
          if (window.accessibilityBar.lscTranslator &&
            window.accessibilityBar.lscTranslator.isTranslating) {
            window.accessibilityBar.lscTranslator.stop()
          }

          if (this.synth.speaking) {
            this.synth.cancel()
          }

          if (this.carouselControls.getActiveIndex() == 3) {
            document.getElementById('finishButtonControls').style.display = ''
            document.getElementById('nextButtonControls').style.display = 'none'
          } else {
            document.getElementById('nextButtonControls').style.display = ''
            document.getElementById('finishButtonControls').style.display = 'none'
          }

          this.speech('controls')
        }

        let handlerControlsModalHide = () => {
          hotkeys.unbind('left')
          hotkeys.unbind('right')
          hotkeys.unbind('enter')

          if (window.accessibilityBar.lscTranslator &&
            window.accessibilityBar.lscTranslator.isTranslating) {
            window.accessibilityBar.lscTranslator.stop()
          }

          if (this.synth.speaking) {
            this.synth.cancel()
          }

          this.controlsModal.removeEventListener('hidden.bs.modal', handlerControlsModalHide)
          this.carouselControlsElm.removeEventListener('slid.bs.carousel', handlerSlides)
        }

        this.controlsModal.addEventListener('shown.bs.modal', handlerControlsModal)
        this.carouselControlsElm.addEventListener('slid.bs.carousel', handlerSlides)
        this.controlsModal.addEventListener('hidden.bs.modal', handlerControlsModalHide)

        this.controlsModalInit.show()
      },
      onNext: (elm) => {
        this.driver.preventMove()

        if (window.accessibilityBar.lscTranslator &&
          window.accessibilityBar.lscTranslator.isTranslating) {
          window.accessibilityBar.lscTranslator.stop()
        }

        if (elm.node.id == 'card-config-cursor') {
          let handler = (e) => {
            this.driver.start(5)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.narrator.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.narrator.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.narrator.show()
        } else if (elm.node.id == 'card-font-type') {
          let handler = (e) => {
            this.driver.start(4)
            window.accessibilityBar.carouselCustomInterfazElm.removeEventListener('slid.bs.carousel', handler)
          }

          window.accessibilityBar.carouselCustomInterfazElm.addEventListener('slid.bs.carousel', handler)
          window.accessibilityBar.carouselCustomInterfaz.slideTo(1)
        } else if (elm.node.id == 'card-narrator-link') {
          let handler = (e) => {
            this.driver.start(10)
            window.accessibilityBar.carouselNarratorElm.removeEventListener('slid.bs.carousel', handler)
          }

          window.accessibilityBar.carouselNarratorElm.addEventListener('slid.bs.carousel', handler)
          window.accessibilityBar.carouselNarrator.slideTo(1)
        } else if (elm.node.id == 'card-narrator-read-mode') {
          let handler = (e) => {
            this.driver.start(12)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.screenReader.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.screenReader.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.screenReader.show()
        } else if (elm.node.id == 'card-screen-reader-link') {
          if (userLang == 'spanish') {
            let handler = (e) => {
              this.driver.start(17)
              this.lastStepTour = this.driver.currentStep
              window.accessibilityBar.tabs.lscTranslator.removeEventListener('shown.bs.tab', handler)
            }

            window.accessibilityBar.tabs.lscTranslator.addEventListener('shown.bs.tab', handler)
            window.accessibilityBar.tabsCollection.lscTranslator.show()
          } else {
            let handler = (e) => {
              this.driver.start(17)
              this.lastStepTour = this.driver.currentStep
              accessibilityBar.tabs.structuralNav.removeEventListener('shown.bs.tab', handler)
            }

            window.accessibilityBar.tabs.structuralNav.addEventListener('shown.bs.tab', handler)
            window.accessibilityBar.tabsCollection.structuralNav.show()
          }
        } else if (elm.node.id == 'card-show-lsc-translator') {
          let handler = (e) => {
            this.driver.start(20)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.structuralNav.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.structuralNav.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.structuralNav.show()
        } else if (elm.node.id == 'card-structural-nav-show-toc') {
          let handler = (e) => {
            if (userLang == 'spanish') {
              this.driver.start(22)
            } else {
              this.driver.start(20)
            }

            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.virtualKeyboard.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.virtualKeyboard.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.virtualKeyboard.show()
        } else {
          this.driver.moveNext()
          this.lastStepTour = this.driver.currentStep
        }
      },
      onPrevious: (elm) => {
        this.driver.preventMove()

        if (elm.node.id == 'card-narrator-speed') {
          let handler = (e) => {
            this.driver.start(4)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.interfaz.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.interfaz.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.interfaz.show()
        } else if (elm.node.id == 'card-config-cursor') {
          let handler = (e) => {
            this.driver.start(3)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.carouselCustomInterfazElm.removeEventListener('slid.bs.carousel', handler)
          }

          window.accessibilityBar.carouselCustomInterfazElm.addEventListener('slid.bs.carousel', handler)
          window.accessibilityBar.carouselCustomInterfaz.slideTo(0)
        } else if (elm.node.id == 'card-narrator-highlight') {
          let handler = (e) => {
            this.driver.start(9)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.carouselNarratorElm.removeEventListener('slid.bs.carousel', handler)
          }

          window.accessibilityBar.carouselNarratorElm.addEventListener('slid.bs.carousel', handler)
          window.accessibilityBar.carouselNarrator.slideTo(0)
        } else if (elm.node.id == 'card-screen-reader-speed') {
          let handler = (e) => {
            this.driver.start(11)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.narrator.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.narrator.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.narrator.show()
        } else if (elm.node.id == 'card-lsc-translator-speed') {
          let handler = (e) => {
            this.driver.start(16)
            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.screenReader.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.screenReader.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.screenReader.show()
        } else if (elm.node.id == 'card-structural-nav-strategy-nav') {
          if (userLang == 'spanish') {
            let handler = (e) => {
              this.driver.start(19)
              this.lastStepTour = this.driver.currentStep
              window.accessibilityBar.tabs.lscTranslator.removeEventListener('shown.bs.tab', handler)
            }

            window.accessibilityBar.tabs.lscTranslator.addEventListener('shown.bs.tab', handler)
            window.accessibilityBar.tabsCollection.lscTranslator.show()
          } else {
            let handler = (e) => {
              this.driver.start(16)
              this.lastStepTour = this.driver.currentStep
              window.accessibilityBar.tabs.screenReader.removeEventListener('shown.bs.tab', handler)
            }

            window.accessibilityBar.tabs.screenReader.addEventListener('shown.bs.tab', handler)
            window.accessibilityBar.tabsCollection.screenReader.show()
          }
        } else if (elm.node.id == 'card-virtual-keyboard-size') {
          let handler = (e) => {
            if (userLang == 'spanish') {
              this.driver.start(21)
            } else {
              this.driver.start(19)
            }

            this.lastStepTour = this.driver.currentStep
            window.accessibilityBar.tabs.structuralNav.removeEventListener('shown.bs.tab', handler)
          }

          window.accessibilityBar.tabs.structuralNav.addEventListener('shown.bs.tab', handler)
          window.accessibilityBar.tabsCollection.structuralNav.show()
        } else {
          this.driver.movePrevious()
          this.lastStepTour = this.driver.currentStep
        }
      },
    })

    this.buttons = `${userLang == 'spanish' ? `
    <button onclick="tour.interprete()" class="btn btn-outline-success btn-lg" type="submit"> 
      <i class="fas fa-sign-language"></i>
      Interpretar
    </button>`: ''}
    <button onclick="tour.speech()" class="btn btn-outline-success btn-lg" type="submit">
      <i class="fas fa-headphones"></i>
      Escuchar
    </button>`

    if (userLang == 'spanish') {
      this.driver.defineSteps([{
        element: '#card-font-size',
        popover: {
          title: `${this.messages[userLang]['card-font-size'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-font-size'].description}
            </p>
            <br/>
            ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-interline-size',
        popover: {
          title: `${this.messages[userLang]['card-interline-size'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-interline-size'].description}
            </p>
            <br/>
            ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-contrast-colors',
        popover: {
          title: `${this.messages[userLang]['card-contrast-colors'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-contrast-colors'].description}  
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-font-type',
        popover: {
          title: `${this.messages[userLang]['card-font-type'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-font-type'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-config-cursor',
        popover: {
          title: `${this.messages[userLang]['card-config-cursor'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-config-cursor'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-speed',
        popover: {
          title: `${this.messages[userLang]['card-narrator-speed'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-narrator-speed'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-pitch',
        popover: {
          title: `${this.messages[userLang]['card-narrator-pitch'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-narrator-pitch'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-volume',
        popover: {
          title: `${this.messages[userLang]['card-narrator-volume'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-narrator-volume'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-voice-gender',
        popover: {
          title: `${this.messages[userLang]['card-narrator-voice-gender'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-narrator-voice-gender'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-link',
        popover: {
          title: `${this.messages[userLang]['card-narrator-link'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-narrator-link'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-highlight',
        popover: {
          title: `${this.messages[userLang]['card-narrator-highlight'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-narrator-highlight'].description}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-read-mode',
        popover: {
          title: `${this.messages[userLang]['card-narrator-read-mode'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-read-mode'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-speed',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-speed'].title}`,
          description: `
            <p class="description">
            ${ this.messages[userLang]['card-screen-reader-speed'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-pitch',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-pitch'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-screen-reader-pitch'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-volume',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-volume'].title}`,
          description: `
              <p class="description">
                ${ this.messages[userLang]['card-screen-reader-volume'].title}
              </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-voice-gender',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-voice-gender'].title}`,
          description: `
            <p class="description">
            ${ this.messages[userLang]['card-screen-reader-voice-gender'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-link',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-link'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-screen-reader-link'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-lsc-translator-speed',
        popover: {
          title: `${this.messages[userLang]['card-lsc-translator-speed'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-lsc-translator-speed'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-lsc-translator-model',
        popover: {
          title: `${this.messages[userLang]['card-lsc-translator-model'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-lsc-translator-model'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-show-lsc-translator',
        popover: {
          title: `${this.messages[userLang]['card-show-lsc-translator'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-show-lsc-translator'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-strategy-nav',
        popover: {
          title: `${this.messages[userLang]['card-structural-nav-strategy-nav'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-structural-nav-strategy-nav'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-show-toc',
        popover: {
          title: `${this.messages[userLang]['card-structural-nav-show-toc'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-structural-nav-show-toc'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-size',
        popover: {
          title: `${this.messages[userLang]['card-virtual-keyboard-size'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-virtual-keyboard-size'].description}
            </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-key-sound',
        popover: {
          title: `${this.messages[userLang]['card-virtual-keyboard-key-sound'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-virtual-keyboard-key-sound'].description}
          </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-use',
        popover: {
          title: `${this.messages[userLang]['card-virtual-keyboard-use'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-virtual-keyboard-use'].description}
          </p>
              <br/>
              ${ this.buttons}
            `,
          position: 'bottom'
        }
      },
      ])
    } else {
      this.driver.defineSteps([{
        element: '#card-font-size',
        popover: {
          title: `${this.messages[userLang]['card-font-size'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-font-size'].description}
          </p>
          <br/>
          ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-interline-size',
        popover: {
          title: `${this.messages[userLang]['card-interline-size'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-interline-size'].description}
          </p>
          <br/>
          ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-contrast-colors',
        popover: {
          title: `${this.messages[userLang]['card-contrast-colors'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-contrast-colors'].description}  
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-font-type',
        popover: {
          title: `${this.messages[userLang]['card-font-type'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-font-type'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-config-cursor',
        popover: {
          title: `${this.messages[userLang]['card-config-cursor'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-config-cursor'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-speed',
        popover: {
          title: `${this.messages[userLang]['card-narrator-speed'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-speed'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-pitch',
        popover: {
          title: `${this.messages[userLang]['card-narrator-pitch'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-pitch'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-volume',
        popover: {
          title: `${this.messages[userLang]['card-narrator-volume'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-volume'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-voice-gender',
        popover: {
          title: `${this.messages[userLang]['card-narrator-voice-gender'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-voice-gender'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-link',
        popover: {
          title: `${this.messages[userLang]['card-narrator-link'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-link'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-highlight',
        popover: {
          title: `${this.messages[userLang]['card-narrator-highlight'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-narrator-highlight'].description}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-read-mode',
        popover: {
          title: `${this.messages[userLang]['card-narrator-read-mode'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-narrator-read-mode'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-speed',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-speed'].title}`,
          description: `
          <p class="description">
          ${ this.messages[userLang]['card-screen-reader-speed'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-pitch',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-pitch'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-screen-reader-pitch'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-volume',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-volume'].title}`,
          description: `
            <p class="description">
              ${ this.messages[userLang]['card-screen-reader-volume'].title}
            </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-voice-gender',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-voice-gender'].title}`,
          description: `
          <p class="description">
          ${ this.messages[userLang]['card-screen-reader-voice-gender'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-link',
        popover: {
          title: `${this.messages[userLang]['card-screen-reader-link'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-screen-reader-link'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-strategy-nav',
        popover: {
          title: `${this.messages[userLang]['card-structural-nav-strategy-nav'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-structural-nav-strategy-nav'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-show-toc',
        popover: {
          title: `${this.messages[userLang]['card-structural-nav-show-toc'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-structural-nav-show-toc'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-size',
        popover: {
          title: `${this.messages[userLang]['card-virtual-keyboard-size'].title}`,
          description: `
          <p class="description">
            ${ this.messages[userLang]['card-virtual-keyboard-size'].description}
          </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-key-sound',
        popover: {
          title: `${this.messages[userLang]['card-virtual-keyboard-key-sound'].title}`,
          description: `
        <p class="description">
          ${ this.messages[userLang]['card-virtual-keyboard-key-sound'].description}
        </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-use',
        popover: {
          title: `${this.messages[userLang]['card-virtual-keyboard-use'].title}`,
          description: `
        <p class="description">
          ${ this.messages[userLang]['card-virtual-keyboard-use'].description}
        </p>
            <br/>
            ${ this.buttons}
          `,
          position: 'bottom'
        }
      },
      ])
    }
  }

  interprete(name) {
    let text = ''

    if (window.accessibilityBar.lscTranslator &&
      window.accessibilityBar.lscTranslator.isTranslating) {
      accessibilityBar.lscTranslator.stop()
    }

    if (!name) {
      const activeElement = this.driver.getHighlightedElement()
      text = `${this.messages[userLang][activeElement.node.id].title}. ${this.messages[userLang][activeElement.node.id].description}`
    } else if (name == 'controls') {
      const carouselActiveIndex = this.carouselControls.getActiveIndex()

      switch (carouselActiveIndex) {
        case 0:
          {
            text = `${this.messages[userLang]['screenReaderControls'].title}. ${this.messages[userLang]['screenReaderControls'].description}`
            break
          }
        case 1:
          {
            text = `${this.messages[userLang]['narratorControls'].title}. ${this.messages[userLang]['narratorControls'].description}`
            break
          }
        case 2:
          {
            text = `${this.messages[userLang]['voiceCommands'].title}. ${this.messages[userLang]['voiceCommands'].description}`
            break
          }
        case 3:
          {
            text = `${this.messages[userLang]['magnifier'].title}. ${this.messages[userLang]['magnifier'].description}`
          }
      }
    } else {
      text = `${this.messages[userLang][name].title}. ${this.messages[userLang][name].description}`
    }

    if (window.accessibilityBar.lscTranslator.minimized) {
      window.accessibilityBar.lscTranslator.maximize()
    }
    window.accessibilityBar.lscTranslator.containerIris.style.zIndex = 5000000000

    window.accessibilityBar.lscTranslator.onEnd = () => {
      window.accessibilityBar.lscTranslator.containerIris.style.zIndex = 1001
    }

    window.accessibilityBar.lscTranslator.translate(text)
  }

  speech(name) {
    let text = ''

    if (this.synth.speaking) {
      this.synth.cancel()
    }

    if (!name) {
      const activeElement = this.driver.getHighlightedElement()
      text = `${this.messages[userLang][activeElement.node.id].title}. ${this.messages[userLang][activeElement.node.id].description}`
    } else if (name == 'controls') {
      const carouselActiveIndex = this.carouselControls.getActiveIndex()

      switch (carouselActiveIndex) {
        case 0:
          {
            text = `${this.messages[userLang]['screenReaderControls'].title}. ${this.messages[userLang]['screenReaderControls'].description}`
            break
          }
        case 1:
          {
            text = `${this.messages[userLang]['narratorControls'].title}. ${this.messages[userLang]['narratorControls'].description}`
            break
          }
        case 2:
          {
            text = `${this.messages[userLang]['voiceCommands'].title}. ${this.messages[userLang]['voiceCommands'].description}`
            break
          }
        case 3:
            {
              text = `${this.messages[userLang]['magnifier'].title}. ${this.messages[userLang]['magnifier'].description}`
            }
      }
    } else {
      text = `${this.messages[userLang][name].title}. ${this.messages[userLang][name].description}`
    }

    let utter = new SpeechSynthesisUtterance(text)

    if (userLang == 'english') {
      utter.lang = 'en-GB'
      utter.voice = this.voices[57]
    } else if (userLang == 'portuguese') {
      utter.lang = 'pt-BR'
      utter.voice = this.voices[46]
    } else {
      utter.lang = 'es-419'
      utter.voice = this.voices[65]
    }

    this.synth.speak(utter)
  }

  start() {
    this.driver.start()
  }

  prevControlsSlide() {
    if (this.carouselControls.getActiveIndex() == 0) {
      this.controlsModalInit.hide()

      let handler = (e) => {
        this.driver.start(this.lastStepTour)
        window.accessibilityBar.collapse.removeEventListener('shown.bs.collapse', handler)
      }

      window.accessibilityBar.collapse.addEventListener('shown.bs.collapse', handler)
      window.accessibilityBar.collapseInstance.show()
    } else {
      this.carouselControls.slideTo(this.carouselControls.getActiveIndex() - 1)
    }
  }

  nextControlsSlide() {
    if (this.carouselControls.getActiveIndex() < 3) {
      this.carouselControls.slideTo(this.carouselControls.getActiveIndex() + 1)
    }
  }

  takeMeToSignUp() {
    localStorage.setItem('redirectFromTour', true)
    window.location.href = `${window.base_url}usuario/registro`
  }
  finish() {
    this.driver.reset()
  }
}
