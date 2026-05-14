import './RotuloFila.js';

class RotuloUCR extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;600&display=swap');

        /* ─── CSS Custom Properties con fallbacks ─── */
        :host {
          display: block;
          width: var(--rotulo-width, 360px);

          --_bg:             var(--rotulo-bg,             #0d2a5c);
          --_radius:         var(--rotulo-radius,         14px);
          --_header-color:   var(--rotulo-header-color,   #3ec1d3);
          --_footer-bg:      var(--rotulo-footer-bg,      #f2f4f8);
          --_footer-color:   var(--rotulo-footer-color,   #0d2a5c);
          --_font-titulo:    var(--rotulo-font-titulo,    'Fredoka', sans-serif);
          --_font-cuerpo:    var(--rotulo-font-cuerpo,    'Poppins', sans-serif);
        }

        .rotulo {
          background: var(--_bg);
          border-radius: var(--_radius);
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0,0,0,0.35);
          animation: slideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ─── Encabezado (part="encabezado") ─── */
        .encabezado {
          padding: 20px 22px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }

        /* Slot: sede-nombre → reemplaza "Sede de Guanacaste" */
        .encabezado ::slotted([slot="sede-nombre"]),
        .nombre-default {
          color: var(--_header-color);
          font-family: var(--_font-titulo);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }

        /* Slot: sede-subtitulo → reemplaza "Dirección de instalaciones" */
        .encabezado ::slotted([slot="sede-subtitulo"]),
        .subtitulo-default {
          color: rgba(255,255,255,0.5);
          font-family: var(--_font-cuerpo);
          font-size: 0.7rem;
          display: block;
        }

        /* ─── Lista de filas (slot sin nombre = default) ─── */
        .filas {
          /* Las rotulo-fila se proyectan aquí */
        }

        /* ─── Footer (part="footer") ─── */
        .footer {
          background: var(--_footer-bg);
          color: var(--_footer-color);
          text-align: center;
          padding: 22px 0 18px;
          border-top-left-radius:  60% 30px;
          border-top-right-radius: 60% 30px;
        }

        /* Slot: logo → reemplaza "UCR" + subtexto universidad */
        .footer ::slotted([slot="logo"]) {
          display: block;
        }

        .logo-default {
          font-family: var(--_font-titulo);
          font-size: 1.6rem;
          letter-spacing: 0.08em;
          color: var(--_footer-color);
        }

        .logo-sub {
          display: block;
          font-family: var(--_font-cuerpo);
          font-size: 0.65rem;
          color: var(--_footer-color);
          opacity: 0.55;
          margin-top: 2px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      </style>

      <div class="rotulo" part="rotulo">

        <!-- Encabezado -->
        <div class="encabezado" part="encabezado">
          <slot name="sede-nombre">
            <span class="nombre-default">Sede de Guanacaste</span>
          </slot>
          <slot name="sede-subtitulo">
            <span class="subtitulo-default">Dirección de instalaciones</span>
          </slot>
        </div>

        <!-- Slot default: aquí van los <rotulo-fila> -->
        <div class="filas" part="filas">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div class="footer" part="footer">
          <slot name="logo">
            <span class="logo-default">UCR</span>
            <small class="logo-sub">Universidad de Costa Rica</small>
          </slot>
        </div>

      </div>
    `;
  }
}

customElements.define('rotulo-ucr', RotuloUCR);