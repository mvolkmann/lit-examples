import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import {repeat} from 'lit/directives/repeat.js';
import {when} from 'lit/directives/when.js';

@customElement('directives-demo')
export class DirectivesDemo extends LitElement {
  @property({type: Boolean}) timeOnly;

  // @property({type: Number}) count = 0;

  static fruits = [
    {id: 7, name: 'apple', color: 'red'},
    {id: 3, name: 'banana', color: 'yellow'},
    {id: 2, name: 'blueberry', color: 'blue'},
    {id: 9, name: 'orange', color: 'orange'}
  ];

  // The `when` directive is useful when content must be computed
  // based on a condition. It takes a condition and two functions,
  // one to compute the true content and one to compute the false content.
  // In the case below, we could just do this:
  // const content = this.happy ? '😊' : '😢';

  // The `choose` function is similar to the `when` function,
  // but bases the content on a non-Boolean value.
  // It is similar to a switch statement in JavaScript.
  // Each case computes the content to use with a function.

  // The `repeat` directive is similar to the `map` function,
  // but it takes an iterable (typically an Array),
  // a function to compute a "key" value,
  // and a function to compute content.
  // The key value is used to optimize DOM updates.
  // It is not passed to the content function.
  // If only one function is passed, this behaves the same as `map`.

  // There is always the option to use JavaScript to compute content
  // instead of using Lit directives.

  getDate() {
    return new Date().toLocaleString();
  }

  getTime() {
    return new Date().toLocaleTimeString();
  }

  override render() {
    return html`
      <section>
        <div>${when(this.timeOnly, this.getTime, this.getDate)}</div>

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
      </section>
    `;
  }
}
