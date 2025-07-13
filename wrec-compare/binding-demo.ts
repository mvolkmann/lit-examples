import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("binding-demo")
export class BindingDemo extends LitElement {
  @property({ type: String }) color = "";
  @property({ type: String }) name = "";
  @property({ type: String }) options = "";
  @property({ type: Number }) score = 0;
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
        <input value=${this.name} />
        <p>Hello, <span>${this.name}</span>!</p>
      </div>
      <div style="display: flex">
        <label for="color">Color:</label>
        <radio-group
          name="color1"
          options=${this.options}
          value=${this.color}
        ></radio-group>
      </div>
      <div>
        <label>Color:</label>
        <select-list
          name="color2"
          options=${this.options}
          value=${this.color}
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
      <number-input label="Favorite Number:" value=${this.score}></number-input>
      <number-slider label="Slider:" value=${this.score}></number-slider>
      <p id="score-p">Your score is <span>${this.score}</span>.</p>
    `;
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
