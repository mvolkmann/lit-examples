import {html, LitElement} from 'lit';
import {consume, provide} from '@lit/context';
import {customElement} from 'lit/decorators.js';
import {dogContext, type Dog} from './dog-context.js';

@customElement('my-top')
export class MyTop extends LitElement {
  // This places a Dog object into the dogContext.
  @provide({context: dogContext})
  dog: Dog = {name: 'Comet', breed: 'Whippet'};

  changeDog() {
    this.dog = {name: 'Snoopy', breed: 'Beagle'};
  }

  override render() {
    return html`
      <div>
        <h1>Top</h1>
        <button @click=${this.changeDog}>Change Dog</button>
        <my-middle></my-middle>
      </div>
    `;
  }
}

@customElement('my-middle')
export class MyMiddle extends LitElement {
  override render() {
    return html`
      <div>
        <h2>Middle</h2>
        <my-bottom></my-bottom>
      </div>
    `;
  }
}

@customElement('my-bottom')
export class MyBottom extends LitElement {
  // This gets a Dog object from the dogContext.
  // Without the subscribe option, the dog property won't be updated
  // when the dog object held by the context changes.
  @consume({context: dogContext, subscribe: true}) dog?: Dog;

  override render() {
    const text = this.dog
      ? `${this.dog.name} is a ${this.dog.breed}.`
      : 'No dog found';
    return html`
      <div>
        <h3>Bottom</h3>
        <div>${text}</div>
      </div>
    `;
  }
}
