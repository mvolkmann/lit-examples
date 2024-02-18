import {css, html, LitElement, type PropertyValueMap} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';

@customElement('greet-message')
export class GreetMessage extends LitElement {
  @state() newName = '';

  @property({
    // This can validate proposed property value changes.
    hasChanged(newVal: string, oldVal: string) {
      console.log('hasChanged for name: changing from', oldVal, 'to', newVal);
      // Only allow the change if the length is more than 1.
      const valid = newVal.length > 1;
      return valid;
    }
  })
  name = '';

  // This is set based on the presence of the "shout" attribute.
  @property({type: Boolean}) shout = false;

  // This gets a reference to the DOM element with id "nameInput".
  @query('#nameInput') nameInput!: HTMLInputElement;

  override attributeChangedCallback(
    name: string,
    old: string,
    value: string
  ): void {
    super.attributeChangedCallback(name, old, value);
    console.log(
      'attributeChangedCallback:',
      name,
      'changing from',
      old,
      'to',
      value
    );
  }
  override connectedCallback(): void {
    super.connectedCallback();
    console.log('connectedCallback entered');
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    console.log('disconnectedCallback entered');
  }

  override render() {
    if (!this.name) throw new Error('name is a required attribute');

    let message = `Hello, ${this.name}!`;
    if (this.shout) message = message.toUpperCase();

    // The dot before `disabled` below creates a one-way property binding.
    return html`
      <div>${message}</div>
      <form
        @submit=${(e: SubmitEvent) => {
          e.preventDefault();
          this.name = this.newName;
          this.newName = ''; // clears the input
        }}
      >
        <input
          id="nameInput"
          type="text"
          size="20"
          required
          .value=${this.newName}
          @input=${() => (this.newName = this.nameInput.value)}
        />
        <button .disabled=${this.newName.length <= 1}>Update</button>
      </form>
    `;
  }

  // This is called before `willUpdate`.
  override shouldUpdate(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('shouldUpdate: changedProperties =', changedProperties);
    return true;
  }

  // This is called before `update`.
  override willUpdate(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('willUpdate : changedProperties =', changedProperties);
  }

  // This is rarely implemented.  The super method calls `render`.
  override update(changedProperties: PropertyValueMap<any>) {
    super.update(changedProperties); // must call this
    console.log('update: changedProperties =', changedProperties);
  }

  // This is called after the first call to `update`.
  override firstUpdated(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('firstUpdated: changedProperties =', changedProperties);
  }

  // This is called after every call to `update`.
  override updated(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('updated: changedProperties =', changedProperties);
  }

  static styles = css`
    :host {
      color: purple;
      font-size: 2rem;
      font-weight: bold;
    }
  `;
}
