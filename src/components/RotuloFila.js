class RotuloFila extends HTMLElement {
  static get observedAttributes() {
    return ['destino', 'direccion'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const destino   = this.getAttribute('destino')   ?? 'Destino';
    const direccion = this.getAttribute('direccion') ?? '➜';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        /* ─── CSS Custom Properties con fallbacks ─── */
        :host {
          display: block;

          --_fila-bg:          var(--fila-bg,          transparent);
          --_fila-bg-hover:    var(--fila-bg-hover,    rgba(255,255,255,0.12));
          --_fila-color:       var(--fila-color,       white);
          --_fila-font:        var(--fila-font,        'Poppins', sans-serif);
          --_fila-font-size:   var(--fila-font-size,   1rem);
          --_sep-color:        var(--fila-sep-color,   rgba(255,255,255,0.2));
          --_flecha-size:      var(--fila-flecha-size, 1.2rem);
        }

        .fila {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 22px;
          background: var(--_fila-bg);
          color: var(--_fila-color);
          font-family: var(--_fila-font);
          font-size: var(--_fila-font-size);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.25s, transform 0.25s;
          letter-spacing: 0.02em;
        }

        .fila:hover {
          background: var(--_fila-bg-hover);
          transform: translateX(6px);
        }

        /* ─── Slot: destino ─── */
        ::slotted([slot="destino"]) {
          flex: 1;
        }

        .flecha {
          font-size: var(--_flecha-size);
          transition: transform 0.25s;
          /* part="flecha" para personalizar desde fuera */
        }

        .fila:hover .flecha {
          transform: translateX(8px);
        }

        .separador {
          height: 1px;
          background: var(--_sep-color);
          margin: 0 16px;
        }
      </style>

      <div class="fila" part="fila">
        <!--
          Slot "destino": permite poner HTML rico en lugar de solo texto.
          Si no se usa el slot, cae al atributo destino como texto plano.
        -->
        <slot name="destino">
          <span class="texto">${destino}</span>
        </slot>

        <!--
          Slot "flecha": permite cambiar el ícono de dirección por cualquier
          elemento (SVG, emoji, imagen, etc.)
        -->
        <slot name="flecha">
          <span class="flecha" part="flecha">${direccion}</span>
        </slot>
      </div>

      <div class="separador" part="separador"></div>
    `;
  }
}

customElements.define('rotulo-fila', RotuloFila);