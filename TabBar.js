'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
} = React;

let Layout = require('./Layout');

class TabBar extends React.Component {
  static propTypes = View.propTypes;

  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        {this.props.children}
        <View style={styles.shadow} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 49,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: Layout.pixel,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -Layout.pixel,
  },
});

module.exports = TabBar;
