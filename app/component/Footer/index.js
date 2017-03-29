import React from 'react';
import classNames from 'classnames';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../providers/TodoProvider';

function pluralize(count, word) {
  return count === 1 ? word : `${word}s`;
}

export default function Footer(props) {

  const activeTodoWord = pluralize(props.count, 'item');
  let clearButton = null;

  if (props.completedCount > 0) {
    clearButton = (
      <button
        className="clear-completed"
        onClick={props.onClearCompleted}
      >
        Clear completed
      </button>
    );
  }

  const nowShowing = props.nowShowing;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <button
            onClick={() => props.handleClick(ALL_TODOS)}
            className={classNames({ selected: nowShowing === ALL_TODOS })}
          >
            All
          </button>
        </li>
        {' '}
        <li>
          <button
            onClick={() => props.handleClick(ACTIVE_TODOS)}
            className={classNames({ selected: nowShowing === ACTIVE_TODOS })}
          >
            Active
          </button>
        </li>
        {' '}
        <li>
          <button
            onClick={() => props.handleClick(COMPLETED_TODOS)}
            className={classNames({ selected: nowShowing === COMPLETED_TODOS })}
          >
            Completed
          </button>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}

Footer.propTypes = {
  count: React.PropTypes.number,
  completedCount: React.PropTypes.number,
  nowShowing: React.PropTypes.string,
  onClearCompleted: React.PropTypes.func,
  handleClick: React.PropTypes.func,
};
