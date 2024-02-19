import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {Task} from '@lit/task';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function getTodo(id: number): Promise<Todo> {
  const url = 'https://jsonplaceholder.typicode.com/todos/' + id;
  const res = await fetch(url);
  const todo = await res.json();
  return todo;
}

@customElement('task-demo')
export class TaskDemo extends LitElement {
  @state() todoId = 1;

  task = new Task(this, {
    task: getTodo,
    args: () => [this.todoId]
  });

  changeTodoId(e: Event) {
    const input = e.target as HTMLInputElement;
    this.todoId = Number(input.value);
    this.task.run();
  }

  override render() {
    const taskDisplay = this.task.render({
      complete: todo => html`
        <h2>${todo.title}</h2>
        <div>${todo.completed ? 'complete' : 'pending'}</div>
      `,
      error: error => html`<div>Error: ${error}</div>`,
      pending: () => html`<div>Loading Todo ...</div>`
    });

    return html`
      ${taskDisplay}
      <input
        type="number"
        size="2"
        @input=${this.changeTodoId}
        .value=${this.todoId}
      />
    `;
  }

  static styles = css`
    :host {
      border: 1px dashed red;
      padding: 1rem;
    }

    h2 {
      margin: 0;
    }
  `;
}
