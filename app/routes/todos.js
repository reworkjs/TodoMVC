export default {
  name: 'Todos',
  path: '/',
  getComponent() {
    return import('../containers/Todos');
  },
};
