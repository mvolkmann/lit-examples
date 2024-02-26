import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {join} from 'lit/directives/join.js';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import {repeat} from 'lit/directives/repeat.js';
import {styleMap} from 'lit/directives/style-map.js';
import {when} from 'lit/directives/when.js';

@customElement('directives-demo')
export class DirectivesDemo extends LitElement {
  @property() color?: string;
  @property() fruit!: string;
  @property({type: Boolean}) timeOnly = false;

  static fruits = [
    {id: 7, name: 'apple', color: 'red'},
    {id: 3, name: 'banana', color: 'yellow'},
    {id: 2, name: 'blueberry', color: 'blue'},
    {id: 9, name: 'orange', color: 'orange'}
  ];

  static fruitMap = {
    apple: 'red',
    banana: 'yellow',
    blueberry: 'blue',
    orange: 'orange'
  };

  getDate() {
    return new Date().toLocaleString();
  }

  getTime() {
    return new Date().toLocaleTimeString();
  }

  override render() {
    const to = this.timeOnly;
    const classes = {c1: to, c2: to, c3: to};
    const styles = {
      color: to ? 'purple' : 'blue',
      fontSize: to ? '2rem' : '1rem',
      fontWeight: to ? 'bold' : 'normal'
    };

    return html`
      <section>
        <div class=${classMap(classes)} style=${styleMap(styles)}>
          My favorite fruit color is
          ${choose(
            this.fruit,
            [
              // These functions can return an `html` tagged template literal.
              ['apple', () => 'red'],
              ['banana', () => 'yellow'],
              ['blueberry', () => 'blue'],
              ['orange', () => 'orange']
            ],
            () => `invalid fruit ${this.fruit}`
          )}.
        </div>

        <ul>
          ${map(
            DirectivesDemo.fruits,
            (fruit, index) => html`
              <li style="color: ${fruit.color}">${index + 1}: ${fruit.name}</li>
            `
          )}
        </ul>

        <ul>
          ${repeat(
            DirectivesDemo.fruits,
            fruit => fruit.id,
            (fruit, index) => html`
              <li style="color: ${fruit.color}">${index + 1}: ${fruit.name}</li>
            `
          )}
        </ul>

        <!-- This renders 10, 20, 30. -->
        ${repeat(range(3), number => html`<div>${(number + 1) * 10}</div>`)}

        <!-- The style attribute is only set if
             a value for this.color was supplied. -->
        <div style="color: ${ifDefined(this.color)}">
          ${when(this.timeOnly, this.getTime, this.getDate)}
        </div>

        <div
          style="border: 1px solid gray; display: inline-block; padding: 1rem"
        >
          ${join(
            map(
              DirectivesDemo.fruits,
              fruit => html`<div>${fruit.name}</span>`
            ),
            html`<hr />`
          )}
        </div>
      </section>
    `;
  }
}
