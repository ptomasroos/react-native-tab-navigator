'use strict';

import React, {
  Animated,
  Platform,
  StyleSheet,
  View,
  PropTypes,
  ScrollView,
} from 'react-native';

import Layout from './Layout';

export default class TabBar extends React.Component {
  static propTypes = {
    ...Animated.View.propTypes,
    scrollEnabled: PropTypes.bool,
    shadowStyle: View.propTypes.style,
  };

  render() {
    return (
      <Animated.View {...this.props} style={[styles.container, this.props.style]}>
        { this.props.scrollEnabled ?
          <ScrollView
            style={styles.scrollviewContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            { this.props.children }
          </ScrollView>
          :
          { this.props.children }
        }
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
    height: Layout.tabBarHeight,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  scrollviewContainer: {
    flex: 1,
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
