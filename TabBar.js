'use strict';

import React from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import Layout from './Layout';

export default class TabBar extends React.Component {
  static propTypes = {
    ...Animated.View.propTypes,
    shadowStyle: View.propTypes.style,
    tabBarClass: React.PropTypes.any,
  };

  render() {
    const TabBarClass = this.props.tabBarClass || View;
    return (
      <Animated.View {...this.props} style={[styles.container, this.props.style]}>
        <TabBarClass style={styles.innerContainer}>
          {this.props.children}
          <View key="tabbar_shadow" style={[styles.shadow, this.props.shadowStyle]} />
        </TabBarClass>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-around',
    height: Layout.tabBarHeight,
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
