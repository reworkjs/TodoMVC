import React from 'react';
import { container } from '@reworkjs/reworkjs/decorators';
import { bind } from 'decko';
import TodoProvider, { ACTIVE_TODOS, COMPLETED_TODOS } from '../../providers/TodoProvider';
import { TodoList, TodoItem, Footer } from '../../component';

const ENTER_KEY = 13;

@container({
  state: {
    todos: TodoProvider.todos,
    nowShowing: TodoProvider.nowShowing,
  },
  actions: {
    add: TodoProvider.add,
    edit: TodoProvider.edit,
    toggleAll: TodoProvider.toggleAll,
    showing: TodoProvider.showing,
    clearCompleted: TodoProvider.clearCompleted,
  },
})
export default class Todos extends React.Component {

  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    nowShowing: React.PropTypes.string.isRequired,
    add: React.PropTypes.func.isRequired,
    edit: React.PropTypes.func.isRequired,
    toggleAll: React.PropTypes.func.isRequired,
    showing: React.PropTypes.func.isRequired,
    clearCompleted: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      todo: '',
    };
  }

  @bind
  handleChange(event) {
    this.setState({ todo: event.target.value });
  }

  @bind
  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.todo.trim();

    if (val) {
      this.props.add(val);
      this.setState({ todo: '' });
    }
  }

  @bind
  handleEdit(todo) {
    this.props.edit(todo);
  }

  @bind
  handleToggleAll() {
    this.props.toggleAll();
  }

  renderTodos() {
    const shownTodos = this.props.todos.filter(todo => {
      switch (this.props.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    return shownTodos.map(todo => {
      return (<TodoItem
        key={todo.id}
        todo={todo}
        onChange={this.handleEdit}
      />);
    });
  }

  @bind
  handleClearCompleted() {
    this.props.clearCompleted();
  }

  @bind
  handleFilter(filter) {
    this.props.showing(filter);
  }

  render() {
    let main;
    let footer;

    const activeTodoCount = this.props.todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = this.props.todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.props.nowShowing}
          onClearCompleted={this.handleClearCompleted}
          handleClick={this.handleFilter}
        />
      );
    }

    if (this.props.todos) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.handleToggleAll}
            checked={activeTodoCount === 0}
          />

          <TodoList>
            {this.renderTodos()}
          </TodoList>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.todo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}
