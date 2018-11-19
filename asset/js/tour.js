class Tour {
  constructor() {
    this.driver = new Driver({
      onNext: (elm) => {
        this.driver.preventMove()

        if(elm.node.id == 'card-config-colors') {
          $('#narrator-tab').tab('show')
          $('#narrator-tab').on('shown.bs.tab', (e) => {
            this.driver.start(6)
          })
        } else if(elm.node.id == 'card-narrator-read-mode') {
          $('#screen-reader-tab').tab('show')
          $('#screen-reader-tab').on('shown.bs.tab', (e) => {
            this.driver.start(13)
          })
        } else if(elm.node.id == 'card-screen-reader-link'){
          $('#LSC-translator-tab').tab('show')
          $('#LSC-translator-tab').on('shown.bs.tab', (e) => {
            this.driver.start(18)
          })
        } else if(elm.node.id == 'card-lsc-translator-model'){
          $('#structural-navigation-tab').tab('show')
          $('#structural-navigation-tab').on('shown.bs.tab', (e) => {
            this.driver.start(20)
          })
        } else if(elm.node.id == 'card-structural-nav-show-toc') {
          $('#keyboard-tab').tab('show')
          $('#keyboard-tab').on('shown.bs.tab', (e) => {
            this.driver.start(22)
          })

        } else {
          this.driver.moveNext()
        }
      }
    })
    this.buttons = `
    <button class="btn btn-outline-success btn-lg" type="submit"> 
    <i class="fas fa-sign-language"></i>
    Interpretar</button>
    <button class="btn btn-outline-success btn-lg" type="submit">
    <i class="fas fa-headphones"></i>
    Escuchar</button>
    `
    this.driver.defineSteps([
        {
          element: '#card-font-size',
          popover: {
            title: 'Tamaño de fuente',
            description:`
            Cambia el tamaño de la fuente escribiendo un número entre 9 y 36.
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
            Cambia el espacio entre una línea y otra con un numero entre 1 y 2.
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
              Cambia los colores para una mejor visibilidad del contenido.
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
              Puede cambiar el tipo de fuente con el cual se muestra el cotenido.
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
              Cambiar el tamaño del cursor y añadir un rastro que le permita ubicar rápidamente a este.
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
              Cambiar el contraste de las imagenes y elementos del contenido.
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
              Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.
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
              Elige entre estas opciones para que la voz sea mucho más amigable.
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
              Cambie el volumen de voz.
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
              Cambie el genero de  la voz.
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
              Puede configurar cual va a ser el comportamiento a la hora de leer un enlace.
              Reproducir un sonido especial, un efecto de voz o no leerlo.
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
              Que porción del texto va a ser resaltada cuando se lee un elemento. 
              Una palabra, línea, oración o parrafo.
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
              Que porción del texto va a ser leida. Una palabra, línea, oración o parrafo.
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
              Elige entre estas opciones la velocidad con la cual se leeran los objetos de aprendizaje.
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
              Elige entre estas opciones para que la voz sea mucho más amigable.
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
              Cambie el volumen de voz.
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
              Cambie el genero de  la voz.
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
              Puede configurar cual va a ser el comportamiento a la hora de leer un enlace. 
              Reproducir un sonido especial, un efecto de voz o no leerlo.
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
              Cambie la velocidad con la cual se traduce el mensaje al lenguaje de señas. 
              10, 20, 30 o 40 son los valores válidos.
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
              Elija quien hará la traducción del mensaje, un avatar o un humano.
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
              Cambie el orden en el cual se enfocan los elementos.
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
              Elija si quiere ver o no la tabla de contenidos del sitio. 
              La tabla de contenidos le permite ver una lista de los encabezados de la página y 
              acceder a ellos rápidamente.
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
              Cambie el tamaño del teclado virtual.
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
              Puede reproducir o no un sonido al presionar una tecla del teclado virtual.
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
              Puede activar o desactivar el uso del teclado virtual.
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
      let activeStep = this.driver.getHighlightedElement()
      txt = activeStep.description
    }

    accessibilityBar.lscTranslator.translate(txt)
  }

  start() {
    this.driver.start()
  }
}
