import {html, LitElement} from 'lit';
import {customElement, queryAssignedElements} from 'lit/decorators.js';

@customElement('slots-demo')
export class SlotsDemo extends LitElement {
  @queryAssignedElements({
    // selector: 'li'
    slot: 'breakfast'
  })
  breakfastElements!: HTMLElement[];
  @queryAssignedElements()
  defaultElements!: HTMLElement[];

  override connectedCallback(): void {
    super.connectedCallback();
    console.log('slots-demo.ts : this.defaultElements =', this.defaultElements);
    console.log(
      'slots-demo.ts : this.breakfastElements =',
      this.breakfastElements
    );
    for (const el of this.breakfastElements) {
      el.style.color = 'red';
    }
  }

  render() {
    return html`
      <div>
        <h2><slot></slot></h2>
        <h3>Breakfast</h3>
        <slot name="breakfast">No breakfast options</slot>
        <h3>Lunch</h3>
        <slot name="lunch">No lunch options</slot>
        <h3>Dinner</h3>
        <slot name="dinner">No dinner options</slot>
      </div>
    `;
  }
}
