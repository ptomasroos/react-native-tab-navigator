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
    tabBarContainerStyle: View.propTypes.style,
    shadowStyle: View.propTypes.style,
  };

  render() {
    const tabStyle = StyleSheet.flatten([
      styles.tabsContainer, this.props.style
      this.props.scrollEnabled ? styles.tabsScrollViewContainer : null,
    ]);
    const { flex, flexDirection, justifyContent, alignSelf, alignItems, ...scrollStyle } = tabStyle;

    return (
      <Animated.View {...this.props} style={[styles.container, this.props.tabBarContainerStyle]}>
        { this.props.scrollEnabled ?
          <ScrollView
            style={scrollStyle}
            contentContainerStyle={{
              flex,
              flexDirection,
              justifyContent,
              alignSelf,
              alignItems,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            { this.props.children }
          </ScrollView>
          :
          <View style={tabStyle}>
            { this.props.children }
          </View>
        }
        <View style={[styles.shadow, this.props.shadowStyle]} />
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    height: Layout.tabBarHeight,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabsContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabsScrollViewContainer: {
    alignSelf: 'flex-start',
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
