import { provider, reducer } from '@reworkjs/reworkjs/decorators';

export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

function createUuid() {
  /* jshint bitwise:false */
  let i;
  let random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)) // eslint-disable-line
      .toString(16);
  }

  return uuid;
}

@provider('TodoProvider')
export default class TodoProvider {

  static todos = [];

  // TODO: Clear
  static nowShowing = ALL_TODOS;
  static editing = null;
  static newTodo = '';

  @reducer
  static add(title) {
    const todo = {
      id: createUuid(),
      title,
      completed: false,
    };

    this.todos.push(todo);
  }

  @reducer
  static showing(nowShowing) {
    this.nowShowing = nowShowing;
  }

  @reducer
  static edit(candidate) {
    if (!candidate.title) {
      this.todos = this.todos.filter(todo => {
        return candidate.id !== todo.id;
      });
    } else {
      this.todos = this.todos.map(todo => {
        return todo.id !== candidate.id ?
          todo :
          candidate;
      });
    }
  }

  @reducer
  static toggleAll() {
    this.todos = this.todos.map(todo => {
      todo.completed = true;
      return todo;
    });
  }

  @reducer
  static clearCompleted() {
    this.todos = this.todos.filter(todo => {
      return !todo.completed;
    });
  }
}
