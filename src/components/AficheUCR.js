const DEFAULT_QR_DATA = 'https://www.ucr.ac.cr';

class AficheUCR extends HTMLElement {
  static get observedAttributes() {
    return ['qr-data'];
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
    const qrData = this.getAttribute('qr-data') ?? DEFAULT_QR_DATA;
    const qrSrc  = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(qrData)}`;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;600&display=swap');

        /* ─── CSS Custom Properties con fallbacks ─── */
        :host {
          display: block;
          width: var(--afiche-width, 400px);

          --_bg:          var(--afiche-bg,          #e5b85c);
          --_accent:      var(--afiche-accent,       #7a3eb1);
          --_tag-azul:    var(--afiche-tag-azul,     #3ec1d3);
          --_base-color:  var(--afiche-base-color,   #0d2a5c);
          --_font-titulo: var(--afiche-font-titulo,  'Fredoka', sans-serif);
          --_font-cuerpo: var(--afiche-font-cuerpo,  'Poppins', sans-serif);
        }

        /* ─── Poster wrapper ─── */
        .poster {
          width: 100%;
          min-height: 680px;
          background: var(--_bg);
          padding: 30px 28px 200px;
          position: relative;
          text-align: center;
          overflow: hidden;
          border-radius: var(--afiche-radius, 6px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.25);
          animation: aparecer 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes aparecer {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Título con signos ─── */
        .titulo {
          margin-top: 16px;
          line-height: 1.6;
        }

        .signo {
          font-size: 48px;
          color: var(--_accent);
          display: inline-block;
          font-family: var(--_font-titulo);
          cursor: pointer;
          animation: bounce 2.2s ease-in-out infinite;
          transition: color 0.2s, transform 0.2s;
        }
        .signo:hover        { color: #ff4081; transform: scale(1.4) !important; }
        .signo-left         { animation-delay: 0s; }
        .signo-right        { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-9px); }
        }

        /* ─── Slot: título principal (boxes) ─── */
        .titulo-slot {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 4px 3px;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
        }

        /* ─── Mensaje ─── */
        .mensaje {
          margin-top: 50px;
          padding: 0 10px;
        }

        /* Slot: subtítulo / párrafo */
        .mensaje ::slotted(p) {
          font-family: var(--_font-cuerpo);
          font-size: 1rem;
          color: rgba(0,0,0,0.55);
          letter-spacing: 0.04em;
        }

        /* Slot: heading principal */
        .mensaje ::slotted(h2) {
          font-family: var(--_font-titulo);
          font-size: 2rem;
          color: var(--_accent);
          margin-top: 6px;
          text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
        }

        /* ─── QR ─── */
        .qr-bloque {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .qr-bloque p {
          font-family: var(--_font-cuerpo);
          font-size: 0.82rem;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          line-height: 1.5;
        }

        .qr-bloque img {
          border-radius: 8px;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* ─── Base decorativa ─── */
        .deco-base {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%;
          height: 190px;
          background: var(--_base-color);
          border-top-left-radius:  55% 50px;
          border-top-right-radius: 55% 50px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 30px;
          padding-bottom: 14px;
        }

        /* ─── CSS Parts expuestas ─── */
        /* Disponibles para estilar desde fuera con ::part() */

        /* part="poster"  → el contenedor completo del afiche     */
        .poster          { /* part declarado en el HTML interno */ }

        /* part="qr-img"  → la imagen del QR                     */
        .qr-bloque img   { /* ídem */ }

        /* part="base"    → la franja azul inferior               */
        .deco-base       { /* ídem */ }

        /* part="label"   → el label UCR al pie                   */
        .ucr-label {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          font-family: var(--_font-titulo);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
        }

        /* ─── Boxes del título (light DOM sloteado) ─── */
        ::slotted(.box) {
          display: inline-block;
          padding: 11px 18px;
          font-family: var(--_font-titulo);
          font-weight: 700;
          font-size: 1.15rem;
          box-shadow: 3px 5px 0 rgba(0,0,0,0.22);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        ::slotted(.box:hover) {
          box-shadow: 5px 8px 0 rgba(0,0,0,0.3);
        }

        /* ─── Gatos emoji ─── */
        .gato-emoji {
          font-size: 90px;
          line-height: 1;
          cursor: pointer;
          transition: transform 0.3s;
          animation: gatoFlot 3s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
        }
        .gato-emoji:nth-child(2) { animation-delay: 0.8s; }
        .gato-emoji:hover        { transform: scale(1.15) rotate(-5deg); }

        @keyframes gatoFlot {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
      </style>

      <div class="poster" part="poster">

        <!-- Slot: boxes del título (span.box con clases azul/blanco/morado) -->
        <div class="titulo">
          <span class="signo signo-left">¡</span>
          <span class="titulo-slot">
            <slot name="titulo">
              <!-- Contenido por defecto si no se provee slot -->
              <span class="box azul"   style="background:#3ec1d3;color:white;transform:rotate(-4deg)">LA SEDE</span>
              <span class="box blanco" style="background:white;color:black;transform:rotate(6deg) translateY(12px)">TE</span>
              <span class="box morado" style="background:#7a3eb1;color:white;transform:rotate(-2deg) translateY(5px)">ACOMPAÑA</span>
            </slot>
          </span>
          <span class="signo signo-right">!</span>
        </div>

        <!-- Slot: mensaje principal (p + h2) -->
        <div class="mensaje">
          <slot name="mensaje">
            <p>El respeto no se negocia</p>
            <h2>¡Pará ya de acosar!</h2>
          </slot>
        </div>

        <!-- Slot: texto del QR -->
        <div class="qr-bloque">
          <slot name="qr-texto">
            <p>Si necesitas ayuda,<br>escanea este QR.</p>
          </slot>
          <img part="qr-img" src="${qrSrc}" alt="QR de ayuda" width="110" height="110">
        </div>

        <!-- Slot: emojis/íconos de la base -->
        <div class="deco-base" part="base">
          <slot name="iconos">
            <span class="gato-emoji">🐱</span>
            <span class="gato-emoji">😺</span>
          </slot>
        </div>

        <span class="ucr-label" part="label">
          <slot name="label">UCR · Sede de Guanacaste</slot>
        </span>

      </div>
    `;
  }
}

customElements.define('afiche-ucr', AficheUCR);