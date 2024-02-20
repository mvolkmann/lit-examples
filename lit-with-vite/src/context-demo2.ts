import {html, LitElement} from 'lit';
import {consume, createContext, provide} from '@lit/context';
import {customElement} from 'lit/decorators.js';

type Data = {count: number};
export const dataContext = createContext<Data>('data');

@customElement('my-parent')
export class MyParent extends LitElement {
  @provide({context: dataContext}) data: Data = {count: 0};

  increment() {
    // this.data.count++; // doesn't work; must replace context object
    this.data = {count: this.data.count + 1};
  }

  override render() {
    return html`
      <div @increment=${this.increment}>
        <button @click=${this.increment}>Parent Increment</button>
        <my-child></my-child>
        <my-child></my-child>
      </div>
    `;
  }
}

@customElement('my-child')
export class MyChild extends LitElement {
  @consume({context: dataContext, subscribe: true}) data?: Data;

  increment() {
    const {host} = this.shadowRoot;
    host.dispatchEvent(new CustomEvent('increment', {bubbles: true}));
  }

  override render() {
    return html`
      <div>
        <div>count = ${this.data.count}</div>
        <button @click=${this.increment}>Child Increment</button>
      </div>
    `;
  }
}
