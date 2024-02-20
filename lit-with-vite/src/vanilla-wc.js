class VanillaWC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const root = this.shadowRoot;

    root.innerHTML = `
      <div>
        <h2>Vanilla Web Component</h2>
        <nav><slot name="nav"></slot></nav>
        <div part="header">header</div>
        <p><slot></slot></p>
      </div>
    `;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host {
        display: inline-block;

        border: 1px solid blue;
        padding: 1rem;
        width: 30%;
      }
      slot[name="nav"]::slotted(*) {
        border-bottom: 1px solid blue;
      }
      /* nav {
        border-bottom: 1px solid blue;
      } */
      ::slotted(p) {
        color: green;
        font-style: italic;
      }
    `);
    // The ::slotted pseudo-element only works
    // in CSS specified inside a shadow DOM.
    // It applies to actual elements in slots, not text nodes.
    root.adoptedStyleSheets = [sheet];
  }
}
customElements.define('vanilla-wc', VanillaWC);
