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
      try {
        const res = await fetch(URL_PREFIX + id);
        if (res.ok) {
          resolve(await res.json());
        } else {
          reject(`bad status ${res.status}`);
        }
      } catch (error) {
        reject(error);
      }
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
    // What this renders is based on the whether the task
    // is pending, complete, or has experienced an error.
    const taskDisplay = this.task.render({
      pending: () => html`<img alt="spinner" src="/spinner.gif" />`,
      complete: todo => html`
        <h2>${todo.title}</h2>
        <div>status: ${todo.completed ? 'complete' : 'pending'}</div>
      `,
      error: error => html`<div class="error">${error}</div>`
    });

    return html`
      <label>
        Todo ID
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
      border: 1px solid gray;
      padding: 1rem;
      width: 20rem;
    }

    .error {
      color: red;
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
