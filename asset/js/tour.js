class Tour {
  constructor() {
    this.driver = new Driver({
      onNext: (elm) => {
        this.driver.preventMove()

        if (elm.node.id == 'card-config-colors') {
          $('#narrator-tab').tab('show')
          $('#narrator-tab').on('shown.bs.tab', (e) => {
            this.driver.start(6)
            $('#narrator-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-narrator-read-mode') {
          $('#screen-reader-tab').tab('show')
          $('#screen-reader-tab').on('shown.bs.tab', (e) => {
            this.driver.start(13)
            $('#screen-reader-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-screen-reader-link') {
          $('#LSC-translator-tab').tab('show')
          $('#LSC-translator-tab').on('shown.bs.tab', (e) => {
            this.driver.start(18)
            $('#LSC-translator-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-lsc-translator-model') {
          $('#structural-navigation-tab').tab('show')
          $('#structural-navigation-tab').on('shown.bs.tab', (e) => {
            this.driver.start(20)
            $('#structural-navigation-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-structural-nav-show-toc') {
          $('#keyboard-tab').tab('show')
          $('#keyboard-tab').on('shown.bs.tab', (e) => {
            this.driver.start(22)
            $('#keyboard-tab').off('shown.bs.tab')
          })

        } else {
          this.driver.moveNext()
        }
      },
      onPrevious: (elm) => {
        this.driver.preventMove()

        if (elm.node.id == 'card-narrator-speed') {
          $('#interfaz-tab').tab('show')
          $('#interfaz-tab').on('shown.bs.tab', (e) => {
            this.driver.start(5)
            $('#interfaz-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-screen-reader-speed') {
          $('#narrator-tab').tab('show')
          $('#narrator-tab').on('shown.bs.tab', (e) => {
            this.driver.start(12)
            $('#narrator-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-lsc-translator-speed') {
          $('#screen-reader-tab').tab('show')
          $('#screen-reader-tab').on('shown.bs.tab', (e) => {
            this.driver.start(17)
            $('#screen-reader-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-structural-nav-strategy-nav') {
          $('#LSC-translator-tab').tab('show')
          $('#LSC-translator-tab').on('shown.bs.tab', (e) => {
            this.driver.start(19)
            $('#LSC-translator-tab').off('shown.bs.tab')
          })
        } else if (elm.node.id == 'card-virtual-keyboard-size') {
          $('#structural-navigation-tab').tab('show')
          $('#structural-navigation-tab').on('shown.bs.tab', (e) => {
            this.driver.start(21)
            $('#structural-navigation-tab').off('shown.bs.tab')
          })
        } else {
          this.driver.movePrevious()
        }
      }
    })
    this.messages = {
      spanish: {
        welcome: {
          title: '¡Bienvenido a FROAC!',
          description: 'Contamos con herramientas de accesibilidad para ayudarte a navegar en nuestro sitio. En esta guia aprenderas a usarlas para que puedas sacar el mayor provecho.'
        },
        fontSize: {
          title: 'Tamaño de fuente',
          description: 'Cambia el tamaño de la fuente escribiendo un número entre 9 y 36.'
        },
        interlineSize: {
          title: 'Tamaño de interlineado',
          description: 'Cambia el espacio entre una línea y otra con un numero entre 1 y 2.'
        },
        contrastColors: {
          title: 'Contraste',
          description: 'Cambia los colores para una mejor visibilidad del contenido.'
        },
        fontType: {
          title: 'Tipo de fuente',
          description: 'Puede cambiar el tipo de fuente con el cual se muestra el cotenido.'
        },
        configCursor: {
          title: 'Configuración del cursor',
          description: 'Cambiar el tamaño del cursor y añadir un rastro que le permita ubicar rápidamente a este.'
        },
        configColors: {
          title: 'Configuración de colores',
          description: 'Cambiar el contraste de las imagenes y elementos del contenido.'
        },
        narratorSpeed: {
          title: 'Velocidad de lectura',
          description: 'Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.'
        },
        narratorPitch: {
          title: 'Tono de voz',
          description: 'Elige entre estas opciones para que la voz sea mucho más amigable.'
        },
        narratorVolume: {
          title: 'Volumen de voz',
          description: 'Cambie el volumen de voz'
        },
        narratorVoiceGender: {
          title: 'Genero de voz',
          description: 'Cambie el genero de  la voz.'
        },
        narratorLink : {
          title: 'Enlaces',
          description: 'Puede configurar cual va a ser el comportamiento a la hora de leer un enlace. Reproducir un sonido especial, un efecto de voz o no leerlo.'
        },
        narratorHighlight: {
          title: 'Resaltado de texto',
          description: 'Que porción del texto va a ser resaltada cuando se lee un elemento. Una palabra, línea, oración o parrafo.'
        },
        narratorReadUnit: {
          title: 'Lectura',
          description: 'Que porción del texto va a ser leida. Una palabra, línea, oración o parrafo.'
        },
        screenReaderSpeed: {
          title: 'Velocidad de lectura',
          description: 'Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.'
        },
        screenReaderPitch: {
          title: 'Tono de voz',
          description: 'Elige entre estas opciones para que la voz sea mucho más amigable.'
        },
        screenReaderVolume: {
          title: 'Volumen de voz',
          description: 'Cambie el volumen de voz'
        },
        screenReaderVoiceGender: {
          title: 'Genero de voz',
          description: 'Cambie el genero de  la voz.'
        },
        screenReaderLink : {
          title: 'Enlaces',
          description: 'Puede configurar cual va a ser el comportamiento a la hora de leer un enlace. Reproducir un sonido especial, un efecto de voz o no leerlo.'
        },
        lscTranslatorSpeed: {
          title: 'Velocidad de señas',
          description: 'Cambie la velocidad con la cual se traduce el mensaje al lenguaje de señas. 10, 20, 30 o 40 son los valores válidos.'
        },
        lscTranslatorModel: {
          title: 'Modelo',
          description: 'Elija quien hará la traducción del mensaje, un avatar o un humano.'
        },
        structuralNavStrategyNav: {
          title: 'Estrategia de navagación',
          description: 'Cambie el orden en el cual se enfocan los elementos.'
        },
        structuralNavShowToc: {
          title: 'Ver tabla de cotenido',
          description: 'Elija si quiere ver o no la tabla de contenidos del sitio. La tabla de contenidos le permite ver una lista de los encabezados de la página y acceder a ellos rápidamente.'
        },
        virtualKeyboardSize: {
          title: 'Tamaño del teclado',
          description: 'Cambie el tamaño del teclado virtual.'
        },
        virtualKeyboardSound: {
          title: 'Sonido del teclado',
          description: 'Puede reproducir o no un sonido al presionar una tecla del teclado virtual.'
        },
        virtualKeyboardUse: {
          title: 'Usar teclado',
          description: 'Puede activar o desactivar el uso del teclado virtual.'
        }
      },
      portuguese: {
        welcome: {
          title: '¡Bem vindo ao FROAC!',
          description: 'Temos ferramentas de acessibilidade para ajudá-lo a navegar em nosso site. Neste guia, você aprenderá a usá-las para aproveitar ao máximo.'
        },
        fontSize: {
          title: 'Tamanho da fonte',
          description: 'Altere o tamanho da fonte digitando um número entre 9 e 36.'
        },
        interlineSize: {
          title: 'Tamanho do espaçamento de linha',
          description: 'Altere o espaço entre uma linha e outra com um número entre 1 e 2.'
        },
        contrastColors: {
          title: 'Contraste',
          description: 'Altere as cores para melhor visibilidade do conteúdo.'
        },
        fontType: {
          title: 'Tipo de fonte',
          description: 'Você pode alterar o tipo de fonte com o qual o cotenid é exibido.'
        },
        configCursor: {
          title: 'Configurações do cursor',
          description: 'Altere o tamanho do cursor e adicione uma trilha que permita localizá-lo rapidamente.'
        },
        configColors: {
          title: 'Configuração de cores',
          description: 'Altere o contraste das imagens e dos elementos de conteúdo.'
        },
        narratorSpeed: {
          title: 'Velocidade de leitura',
          description: 'Escolha entre essas opções a velocidade com que os objetos de aprendizagem serão lidos.'
        },
        narratorPitch: {
          title: 'Tom de voz',
          description: 'Escolha entre essas opções para que a voz seja muito mais amigável.'
        },
        narratorVolume: {
          title: 'Volume de voz',
          description: 'Alterar o volume da voz'
        },
        narratorVoiceGender: {
          title: 'Gênero de voz',
          description: 'Altere o gênero da voz.'
        },
        narratorLink : {
          title: 'Links',
          description: 'Você pode configurar qual será o comportamento ao ler um link. Tocar um som especial, um efeito de voz ou não lê-lo.'
        },
        narratorHighlight: {
          title: 'Realçar texto',
          description: 'Qual parte do texto será destacada quando um elemento for lido. Uma palavra, linha, frase ou parágrafo.'
        },
        narratorReadUnit: {
          title: 'Leitura',
          description: 'Qual parte do texto será lida. Uma palavra, linha, frase ou parágrafo.'
        },
        screenReaderSpeed: {
          title: 'Velocidade de leitura',
          description: 'Escolha entre essas opções a velocidade com que os objetos de aprendizagem serão lidos.'
        },
        screenReaderPitch: {
          title: 'Tom de voz',
          description: 'Escolha entre essas opções para que a voz seja muito mais amigável.'
        },
        screenReaderVolume: {
          title: 'Volume de voz',
          description: 'Alterar o volume da voz'
        },
        screenReaderVoiceGender: {
          title: 'Gênero de voz',
          description: 'Altere o gênero da voz.'
        },
        screenReaderLink : {
          title: 'Links',
          description: 'Você pode configurar qual será o comportamento ao ler um link. Tocar um som especial, um efeito de voz ou não lê-lo.'
        },
        structuralNavStrategyNav: {
          title: 'Estratégia de navegação',
          description: 'Altere a ordem na qual os elementos estão focalizados.'
        },
        structuralNavShowToc: {
          title: 'Veja o índice',
          description: 'Escolha se deseja ou não ver o índice do site. O índice permite que você veja uma lista dos cabeçalhos da página e acesse-os rapidamente.'
        },
        virtualKeyboardSize: {
          title: 'Tamanho do teclado',
          description: 'Altere o tamanho do teclado virtual.'
        },
        virtualKeyboardSound: {
          title: 'Som do teclado',
          description: 'Você pode tocar um som ou não pressionando uma tecla no teclado virtual.'
        },
        virtualKeyboardUse: {
          title: 'Use o teclado',
          description: 'Você pode ativar ou desativar o uso do teclado virtual.'
        }
      },
      english: {
        welcome: {
          title: '¡Welcome to FROAC!',
          description: 'We have accessibility tools to help you navigate our site. In this guide you will learn to use them so that you can get the most out of them.'
        },
        fontSize: {
          title: 'Font size',
          description: 'Change the font size by typing a number between 9 and 36.'
        },
        interlineSize: {
          title: 'Line spacing size',
          description: 'Change the space between one line and another with a number between 1 and 2.'
        },
        contrastColors: {
          title: 'Contrast',
          description: 'Change the colors for better visibility of the content.'
        },
        fontType: {
          title: 'Font type',
          description: 'You can change the font type with which the cotenid is displayed.'
        },
        configCursor: {
          title: 'Cursor settings',
          description: 'Change the size of the cursor and add a trail that allows you to quickly locate it.'
        },
        configColors: {
          title: 'Configuration of colors',
          description: 'Change the contrast of the images and content elements.'
        },
        narratorSpeed: {
          title: 'Reading speed',
          description: 'Choose among these options the speed with which the learning objects will be read.'
        },
        narratorPitch: {
          title: 'Voice tone',
          description: 'Choose between these options so that the voice is much friendlier.'
        },
        narratorVolume: {
          title: 'Voice volume',
          description: 'Change the voice volume'
        },
        narratorVoiceGender: {
          title: 'Gender of voice',
          description: 'Change the gender of the voice.'
        },
        narratorLink : {
          title: 'Links',
          description: 'You can configure what the behavior will be when reading a link. Play a special sound, a voice effect or not read it.'
        },
        narratorHighlight: {
          title: 'Highlight text',
          description: 'What portion of the text will be highlighted when an element is read. A word, line, sentence or paragraph.'
        },
        narratorReadUnit: {
          title: 'Reading',
          description: 'What portion of the text will be read. A word, line, sentence or paragraph.'
        },
        screenReaderSpeed: {
          title: 'Reading speed',
          description: 'Choose among these options the speed with which the learning objects will be read.'
        },
        screenReaderPitch: {
          title: 'Voice tone',
          description: 'Choose between these options so that the voice is much friendlier.'
        },
        screenReaderVolume: {
          title: 'Voice volume',
          description: 'Change the voice volume'
        },
        screenReaderVoiceGender: {
          title: 'Gender of voice',
          description: 'Change the gender of the voice.'
        },
        screenReaderLink : {
          title: 'Links',
          description: 'You can configure what the behavior will be when reading a link. Play a special sound, a voice effect or not read it.'
        },
        lscTranslatorSpeed: {
          title: 'Signal speed',
          description: 'Change the speed with which the message is translated into sign language. 10, 20, 30 or 40 are the valid values.'
        },
        lscTranslatorModel: {
          title: 'Model',
          description: 'Choose who will do the translation of the message, an avatar or a human.'
        },
        structuralNavStrategyNav: {
          title: 'Navigation strategy',
          description: 'Change the order in which the elements are focused.'
        },
        structuralNavShowToc: {
          title: 'See table of contents',
          description: 'Choose whether or not you want to see the table of contents of the site. The table of contents allows you to see a list of the headers of the page and access them quickly.'
        },
        virtualKeyboardSize: {
          title: 'Keyboard size',
          description: 'Change the size of the virtual keyboard.'
        },
        virtualKeyboardSound: {
          title: 'Keyboard sound',
          description: 'You can play a sound or not by pressing a key on the virtual keyboard.'
        },
        virtualKeyboardUse: {
          title: 'Use keyboard',
          description: 'You can activate or deactivate the use of the virtual keyboard.'
        }
      }
    }
    this.buttons = `
    <button onclick="tour.interprete()" class="btn btn-outline-success btn-lg" type="submit"> 
    <i class="fas fa-sign-language"></i>
    Interpretar</button>
    <button class="btn btn-outline-success btn-lg" type="submit">
    <i class="fas fa-headphones"></i>
    Escuchar</button>
    `
    this.driver.defineSteps([{
        element: '#card-font-size',
        popover: {
          title: `${ this.messages[userLang].fontSize.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].fontSize.description }
            </p>
            <br/>
            ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-interline-size',
        popover: {
          title: `${ this.messages[userLang].interlineSize.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].interlineSize.description }
            </p>
            <br/>
            ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-contrast-colors',
        popover: {
          title: `${ this.messages[userLang].contrastColors.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].contrastColors.description }  
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-font-type',
        popover: {
          title: `${ this.messages[userLang].fontType.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].fontType.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-config-cursor',
        popover: {
          title: `${ this.messages[userLang].configCursor.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].con }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-config-colors',
        popover: {
          title: `${ this.messages[userLang].contrastColors.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].contrastColors.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-narrator-speed',
        popover: {
          title: `${ this.messages[userLang].narratorSpeed.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].narratorSpeed.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-pitch',
        popover: {
          title: `${ this.messages[userLang].narratorPitch.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].narratorPitch.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-volume',
        popover: {
          title: `${ this.messages[userLang].narratorVolume.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].narratorVolume.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-voice-gender',
        popover: {
          title: `${ this.messages[userLang].narratorVoiceGender.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].narratorVoiceGender.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-link',
        popover: {
          title: `${ this.messages[userLang].narratorLink.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].narratorLink.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-highlight',
        popover: {
          title: `${ this.messages[userLang].narratorHighlight.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].narratorHighlight.description }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-narrator-read-mode',
        popover: {
          title: `${ this.messages[userLang].narratorReadUnit.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].narratorReadUnit.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-screen-reader-speed',
        popover: {
          title: `${ this.messages[userLang].screenReaderSpeed.title }`,
          description: `
            <p class="description">
            ${ this.messages[userLang].screenReaderSpeed.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-pitch',
        popover: {
          title: `${ this.messages[userLang].screenReaderPitch.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].screenReaderPitch.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-volume',
        popover: {
          title: `${ this.messages[userLang].screenReaderVolume.title }`,
          description: `
              <p class="description">
                ${ this.messages[userLang].screenReaderVolume.title }
              </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-voice-gender',
        popover: {
          title: `${ this.messages[userLang].screenReaderVoiceGender.title }`,
          description: `
            <p class="description">
            ${ this.messages[userLang].screenReaderVoiceGender.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-link',
        popover: {
          title: `${ this.messages[userLang].screenReaderLink.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].screenReaderLink.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-lsc-translator-speed',
        popover: {
          title: `${ this.messages[userLang].lscTranslatorSpeed.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].lscTranslatorSpeed.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-lsc-translator-model',
        popover: {
          title: `${ this.messages[userLang].lscTranslatorModel.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].lscTranslatorModel.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-strategy-nav',
        popover: {
          title: `${ this.messages[userLang].structuralNavStrategyNav.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].structuralNavStrategyNav.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-show-toc',
        popover: {
          title: `${ this.messages[userLang].structuralNavShowToc.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].structuralNavShowToc.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-size',
        popover: {
          title: `${ this.messages[userLang].virtualKeyboardSize.title }`,
          description: `
            <p class="description">
              ${ this.messages[userLang].virtualKeyboardSize.description }
            </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-key-sound',
        popover: {
          title: `${ this.messages[userLang].virtualKeyboardSound.title }`,
          description: `
          <p class="description">
            ${ this.messages[userLang].virtualKeyboardSound.description }
          </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-use',
        popover: {
          title: `${ this.messages[userLang].virtualKeyboardUse.title }`,
          description: `
          <p class="description">
            ${ this.messages[userLang].virtualKeyboardUse.description }
          </p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
    ])

    this.modalOpen = document.getElementById('modalTour')
  }

  interprete(txt) {
    if(!txt) {
      const activeElement = this.driver.getHighlightedElement()
      const titleNode = activeElement.popover.titleNode
      const descriptionNode = activeElement.popover.descriptionNode
      txt = `${ titleNode.textContent }. ${ descriptionNode.querySelector('.description').textContent } 
      Click en anterior para volver.
      Click en siguiente para continuar.
      Click en cerrar para salir.`
    }

    if(accessibilityBar.lscTranslator.minimized) {
      accessibilityBar.lscTranslator.maximize()
    }
    
    accessibilityBar.lscTranslator.containerIris.style.zIndex = 5000000000

    accessibilityBar.lscTranslator.onEnd = () => {
      accessibilityBar.lscTranslator.containerIris.style.zIndex = 1001
    }

    accessibilityBar.lscTranslator.translate(txt)
  }

  speech(text) {
  
  }

  start() {
    this.driver.start()
  }
}
