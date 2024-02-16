import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

function handleClick() {
  alert('in handleClick function');
}

@customElement('alert-on-click')
export class AlertOnClick extends LitElement {
  handleClick() {
    alert('in handleClick method');
  }

  render() {
    return html`
      <button @click=${this.handleClick}>Click Me</button>
      <button @click=${handleClick}>Click Me</button>
    `;
  }

  static styles = css`
    :host {
      border: 1px dashed red;
      padding: 1rem;
    }

    button {
      border-radius: 0.5rem;
      border: 3px solid cornflowerblue;
      padding: 0.5rem;
      background-color: lemonchiffon;
      cursor: pointer;
    }
    button:hover {
      background-color: orange;
    }
  `;
}

// TODO: What does this add?
declare global {
  interface HTMLElementTagNameMap {
    'alert-on-click': AlertOnClick;
  }
}
