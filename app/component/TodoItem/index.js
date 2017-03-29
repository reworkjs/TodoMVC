import React from 'react';
import classNames from 'classnames';
import { bind } from 'decko';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class TodoItem extends React.Component {

  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      title: props.todo.title,
    };
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.input.focus();
    }
  }

  @bind
  handleSubmit() {
    const val = this.state.title.trim();
    const todo = this.props.todo;
    todo.title = val;
    this.props.onChange(todo);
    this.setState({ editing: false });
  }

  @bind
  handleEdit() {
    this.setState({ editing: true });
  }

  @bind
  handleDestroy() {
    const todo = this.props.todo;
    todo.title = '';
    this.props.onChange(todo);
  }

  @bind
  handleToggle() {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
    this.props.onChange(todo);
  }

  @bind
  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ title: this.props.todo.title });
      // this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  @bind
  handleChange(event) {
    if (this.state.editing) {
      this.setState({ title: event.target.value });
    }
  }

  @bind
  bindInput(event) {
    this.input = event;
  }

  render() {
    return (
      <li
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.state.editing,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.handleToggle}
          />
          <label htmlFor="complete" onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          id="complete"
          ref={this.bindInput}
          className="edit"
          value={this.state.title}
          onBlur={event => this.handleSubmit(event)}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }

}
