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
          title: 'Tamaño de fuente',
          description: `
            <p class="description">Cambia el tamaño de la fuente escribiendo un número entre 9 y 36.</p>
            <br/>
            ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-interline-size',
        popover: {
          title: 'Tamaño de interlineado',
          description: `
            <p class="description">Cambia el espacio entre una línea y otra con un numero entre 1 y 2. </p>
            <br/>
            ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-contrast-colors',
        popover: {
          title: 'Contraste',
          description: `
              <p class="description">Cambia los colores para una mejor visibilidad del contenido.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-font-type',
        popover: {
          title: 'Tipo de fuente',
          description: `
              <p class="description">Puede cambiar el tipo de fuente con el cual se muestra el cotenido.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-config-cursor',
        popover: {
          title: 'Configuración del cursor',
          description: `
              <p class="description">Cambiar el tamaño del cursor y añadir un rastro que le permita ubicar rápidamente a este.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-config-colors',
        popover: {
          title: 'Configuración de colores',
          description: `
              <p class="description">Cambiar el contraste de las imagenes y elementos del contenido.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-narrator-speed',
        popover: {
          title: 'Velocidad de lectura',
          description: `
              <p class="description">Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-pitch',
        popover: {
          title: 'Tono de voz',
          description: `
              <p class="description">Elige entre estas opciones para que la voz sea mucho más amigable.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-volume',
        popover: {
          title: 'Volumen de voz',
          description: `
              <p class="description">Cambie el volumen de voz.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-voice-gender',
        popover: {
          title: 'Genero de voz',
          description: `
          <p class="description">Cambie el genero de  la voz.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-link',
        popover: {
          title: 'Comportamiento con enlaces',
          description: `
          <p class="description">Puede configurar cual va a ser el comportamiento a la hora de leer un enlace.
              Reproducir un sonido especial, un efecto de voz o no leerlo.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-narrator-highlight',
        popover: {
          title: 'Resaltado de texto',
          description: `
          <p class="description">Que porción del texto va a ser resaltada cuando se lee un elemento. 
              Una palabra, línea, oración o parrafo.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-narrator-read-mode',
        popover: {
          title: 'Lectura',
          description: `
          <p class="description">Que porción del texto va a ser leida. Una palabra, línea, oración o parrafo.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'top'
        }
      },
      {
        element: '#card-screen-reader-speed',
        popover: {
          title: 'Velocidad de lectura',
          description: `
          <p class="description">Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-pitch',
        popover: {
          title: 'Tono de voz',
          description: `
          <p class="description">Elige entre estas opciones para que la voz sea mucho más amigable.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-volume',
        popover: {
          title: 'Volumen de voz',
          description: `
          <p class="description">Cambie el volumen de voz.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-voice-gender',
        popover: {
          title: 'Genero de voz',
          description: `
          <p class="description">Cambie el genero de  la voz.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-screen-reader-link',
        popover: {
          title: 'Comportamiento con enlaces',
          description: `
          <p class="description">Puede configurar cual va a ser el comportamiento a la hora de leer un enlace. 
              Reproducir un sonido especial, un efecto de voz o no leerlo.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-lsc-translator-speed',
        popover: {
          title: 'Velocidad de señas',
          description: `
          <p class="description">Cambie la velocidad con la cual se traduce el mensaje al lenguaje de señas. 
              10, 20, 30 o 40 son los valores válidos.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-lsc-translator-model',
        popover: {
          title: 'Modelo',
          description: `
          <p class="description">Elija quien hará la traducción del mensaje, un avatar o un humano.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-strategy-nav',
        popover: {
          title: 'Estrategia de nevagación',
          description: `
          <p class="description">Cambie el orden en el cual se enfocan los elementos.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-structural-nav-show-toc',
        popover: {
          title: 'Modelo',
          description: `
          <p class="description">Elija si quiere ver o no la tabla de contenidos del sitio. 
              La tabla de contenidos le permite ver una lista de los encabezados de la página y 
              acceder a ellos rápidamente.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-size',
        popover: {
          title: 'Tamaño del teclado',
          description: `
          <p class="description">Cambie el tamaño del teclado virtual.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-key-sound',
        popover: {
          title: 'Sonido del teclado',
          description: `
          <p class="description">Puede reproducir o no un sonido al presionar una tecla del teclado virtual.</p>
              <br/>
              ${ this.buttons }
            `,
          position: 'bottom'
        }
      },
      {
        element: '#card-virtual-keyboard-use',
        popover: {
          title: 'Usar teclado',
          description: `
          <p class="description">Puede activar o desactivar el uso del teclado virtual.</p>
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
