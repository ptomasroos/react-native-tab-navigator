'use strict';

import React, {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import Layout from './Layout';
import { BlurView } from 'react-native-blur';

export default class TabBar extends React.Component {
  static propTypes = {
    ...View.propTypes,
    shadowStyle: View.propTypes.style,
  }

  render() {
    if (this.props.translucent) {
      return (
        <BlurView {...this.props} style={[styles.container, this.props.style]} blurType="light">
          {this.props.children}
          <View style={[styles.shadow, this.props.shadowStyle]} />
        </BlurView>
      );
    } else {
      return (
        <View {...this.props} style={[styles.container, {backgroundColor: '#F8F8F8'}, this.props.style]}>
          {this.props.children}
          <View style={[styles.shadow, this.props.shadowStyle]} />
        </View>
      );
    }
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(248,248,248,0.8)',
    flexDirection: 'row',
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
