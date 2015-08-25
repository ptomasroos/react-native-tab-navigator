/**
 * @providesModule TabNavigatorItem
 */
'use strict';

let React = require('react-native');
let {
  PropTypes,
} = React;

class TabNavigatorItem extends React.Component {
  static propTypes = {
    renderIcon: PropTypes.func.isRequired,
    renderSelectedIcon: PropTypes.func,
    badgeText: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    renderBadge: PropTypes.func,
    title: PropTypes.string,
    selected: PropTypes.bool,
    onPress: PropTypes.func,
  };

  render() {
    let child = React.Children.only(this.props.children);
    return React.cloneElement(child, {
      style: [child.props.style, this.props.style],
    });
  }
}

module.exports = TabNavigatorItem;
