export class VanillaWC extends HTMLElement {
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
      /* This targets the shadow host. */
      :host {
        display: inline-block;

        border: 1px solid blue;
        padding: 1rem;
        width: 30%;
      }

      /* This targets any top-level child placed in the slot named "nav". */
      slot[name="nav"]::slotted(*) {
        border-bottom: 1px solid blue;
      }

      /* This could be used in place of the previous rule.
      nav {
        border-bottom: 1px solid blue;
      } */

      /* This targets any top-level p elements placed in any slot.
         ::slotted only supports single-element selectors. */
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
