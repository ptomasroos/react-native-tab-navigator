'use strict';

import React, {
  PropTypes,
} from 'react';

export default class StaticContainer extends React.Component {
  static propTypes = {
    shouldUpdate: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps: Object): boolean {
    return !!nextProps.shouldUpdate;
  }

  render() {
    let { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
