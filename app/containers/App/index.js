import React from 'react';
import Helmet from 'react-helmet';

export default function App(props) {
  return (
    <section className="todoapp">
      <Helmet
        title="Welcome"
        link={[
          { href: '/public/todomvc/base.css', rel: 'stylesheet' },
          { href: '/public/todomvc/index.css', rel: 'stylesheet' },
        ]}
        titleTemplate={'%s | TodoMVC'}
      />

      {props.children}
    </section>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
