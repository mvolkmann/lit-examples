import {html, LitElement} from 'lit';
import type {PropertyValueMap} from 'lit';
import {customElement, queryAssignedElements} from 'lit/decorators.js';

@customElement('slots-demo')
export class SlotsDemo extends LitElement {
  // To get an array of HTMLElement objects rather than Node objects,
  // use @queryAssignedElements.
  // Use @queryAssignedNodes when you also
  // want to capture Node objects like Text.
  @queryAssignedElements({
    // selector: 'li'
    slot: 'breakfast'
  })
  breakfastElements!: HTMLElement[];

  @queryAssignedElements()
  defaultElements!: HTMLElement[];

  override firstUpdated(changedProperties: PropertyValueMap<any>): void {
    super.firstUpdated(changedProperties);
    for (const el of this.defaultElements) {
      el.style.color = 'red';
    }
    for (const el of this.breakfastElements) {
      el.style.color = 'green';
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
