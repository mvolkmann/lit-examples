import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Data binding in Lit is not two-way like in wrec.
 * A Lit component cannot simply pass one of its properties to
 * a child Lit component and have the child can update the property.
 * The child must emit a custom event that
 * the parent listens for so it can update its own state.
 */
@customElement("binding-demo")
export class BindingDemo extends LitElement {
  @property({ type: String }) color = "";
  @property({ type: String }) name = "";
  @property({ type: String }) options = "";
  @property({ type: Number }) score = 5;
  @property({ type: String }) story = "";

  static styles = css`
    :host {
      font-family: sans-serif;
    }

    label {
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <div id="input-demo">
        <label>Name:</label>
        <input value=${this.name} @input=${this.handleNameChange} />
        <p>Hello, <span>${this.name}</span>!</p>
      </div>
      <div style="display: flex">
        <label for="color">Color:</label>
        <radio-group
          name="color1"
          options=${this.options}
          value=${this.color}
          @change=${this.handleColorChange}
        ></radio-group>
      </div>
      <div>
        <label>Color:</label>
        <select-list
          name="color2"
          options=${this.options}
          value=${this.color}
          @change=${this.handleColorChange}
        ></select-list>
      </div>
      <p id="selected-color">
        You selected the color <span>${this.color}</span>.
      </p>
      <div id="textarea-demo">
        <label>Story:</label>
        <textarea>${this.story}</textarea>
        <p>Your story is <span>${this.story}</span>.</p>
      </div>
      <number-input
        label="Favorite Number:"
        value=${this.score}
        @change=${this.handleScoreChange}
      ></number-input>
      <number-slider
        label="Slider:"
        value=${this.score}
        @change=${this.handleScoreChange}
      ></number-slider>
      <p id="score-p">Your score is <span>${this.score}</span>.</p>
    `;
  }

  handleColorChange(event) {
    this.color = event.detail;
  }

  handleNameChange(event) {
    this.name = event.target.value;
  }

  handleScoreChange(event) {
    this.score = event.detail;
  }

  /*
  formResetCallback() {
    this.color = "red";
    this.name = "";
    this.score = 0;
    this.story = "";
  }
  */
}
