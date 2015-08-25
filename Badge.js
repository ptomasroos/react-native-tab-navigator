'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
} = React;

let autobind = require('autobind-decorator');

let Layout = require('./Layout');

class Badge extends React.Component {
  static propTypes = Text.propTypes;

  state = {
    computedSize: null,
  };

  render() {
    let { computedSize } = this.state;
    let style = {};
    if (!computedSize) {
      style.opacity = 0;
    } else {
      style.width = Math.max(computedSize.height, computedSize.width);
    }

    return (
      <Text
        {...this.props}
        numberOfLines={1}
        onLayout={this._handleLayout}
        style={[styles.container, this.props.style, style]}>
        {this.props.children}
      </Text>
    );
  }

  @autobind
  _handleLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { computedSize } = this.state;
    if (computedSize && computedSize.height === height &&
      computedSize.width === width) {
      return;
    }

    this.setState({
      computedSize: { width, height },
    });

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }
}

let styles = StyleSheet.create({
  container: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'rgb(0, 122, 255)',
    lineHeight: 15,
    textAlign: 'center',
    borderWidth: 1 + Layout.pixel,
    borderColor: '#fefefe',
    borderRadius: 17 / 2,
    overflow: 'hidden',
  },
});

module.exports = Badge;
