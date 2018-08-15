'use strict';

import React from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import SafeArea from 'react-native-safe-area';

import ViewPropTypes from './config/ViewPropTypes';
import Layout from './Layout';

export default class TabBar extends React.Component {
  static propTypes = {
    ...Animated.View.propTypes,
    shadowStyle: ViewPropTypes.style,
  };

  constructor(props) {
    super(props)
    const self = this
    this.state = { safeBottom: 0 }
    SafeArea.getSafeAreaInsetsForRootView().then((res) => {
      self.setState({ safeBottom: res.safeAreaInsets.bottom})
    })
  }

  render() {
    const safeStyle = {
      height: Layout.tabBarHeight + this.state.safeBottom,
      paddingBottom: this.state.safeBottom,
    }
    return (
      <Animated.View {...this.props} style={[styles.container, safeStyle, this.props.style]}>
        {this.props.children}
        <View style={[styles.shadow, this.props.shadowStyle]} />
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    top: Platform.OS === 'android' ? 0 : -Layout.pixel,
  },
});
