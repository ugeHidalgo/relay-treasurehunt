import Relay from 'react-relay';

export default class extends Relay.Route {
  static path ='/';
  static queries = {
    query : () => Relay.QL`
      query {
        store
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
