import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {Task} from '@lit/task';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const URL_PREFIX = 'https://jsonplaceholder.typicode.com/todos/';

async function getTodo(id: number): Promise<Todo> {
  // Simulate a long-running query.
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const res = await fetch(URL_PREFIX + id);
      resolve(await res.json());
    }, 1000);
  });
}

@customElement('task-demo')
export class TaskDemo extends LitElement {
  @state() todoId = 1;

  // The task runs when the component is created,
  // and again any time one of its arguments changes.
  task = new Task(this, {
    task: getTodo,
    args: () => [this.todoId]
  });

  changeTodoId(e: Event) {
    const input = e.target as HTMLInputElement;
    this.todoId = Number(input.value);
  }

  override render() {
    const taskDisplay = this.task.render({
      pending: () => html`<img alt="spinner" src="/spinner.gif" />`,
      complete: todo => html`
        <h2>${todo.title}</h2>
        <div>${todo.completed ? 'complete' : 'pending'}</div>
      `,
      error: error => html`<div>Error: ${error}</div>`
    });

    return html`
      <label
        >Todo Id
        <input
          type="number"
          @input=${this.changeTodoId}
          .value=${this.todoId}
        />
      </label>
      ${taskDisplay}
    `;
  }

  static styles = css`
    :host {
      border: 1px dashed red;
      padding: 1rem;
      width: 20rem;
    }

    h2 {
      margin: 0;
    }

    img[alt='spinner'] {
      display: block;
      height: 2rem;
    }

    input {
      width: 2rem;
    }
  `;
}
