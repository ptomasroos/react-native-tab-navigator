'use strict';

import React, {
  PropTypes,
} from 'react';

export default class StaticContainer extends React.Component {
  static propTypes = {
    shouldUpdate: PropTypes.bool,
    allowRefresh: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps: Object): boolean {
    return !!nextProps.shouldUpdate && !!nextProps.allowRefresh;
  }

  render() {
    let { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
