'use strict';

import { Set } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';

import Badge from './Badge';
import Layout from './Layout';
import StaticContainer from './StaticContainer';
import Tab from './Tab';
import TabBar from './TabBar';
import TabNavigatorItem from './TabNavigatorItem';
import ViewPropTypes from './config/ViewPropTypes';

export default class TabNavigator extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    sceneStyle: ViewPropTypes.style,
    tabBarStyle: TabBar.propTypes.style,
    tabBarShadowStyle: TabBar.propTypes.shadowStyle,
    hidesTabTouch: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderedSceneKeys: this._updateRenderedSceneKeys(props.children),
    };

    this._renderTab = this._renderTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { renderedSceneKeys } = this.state;
    this.setState({
      renderedSceneKeys: this._updateRenderedSceneKeys(
        nextProps.children,
        renderedSceneKeys,
      ),
    });
  }

  _getSceneKey(item, index): string {
    return `scene-${(item.key !== null) ? item.key : index}`;
  }

  _updateRenderedSceneKeys(children, oldSceneKeys = Set()): Set {
    let newSceneKeys = Set().asMutable();
    React.Children.forEach(children, (item, index) => {
      if (item === null) {
        return;
      }
      let key = this._getSceneKey(item, index);
      if (oldSceneKeys.has(key) || item.props.selected) {
        newSceneKeys.add(key);
      }
    });
    return newSceneKeys.asImmutable();
  }

  render() {
    let { style, children, tabBarStyle, tabBarShadowStyle, sceneStyle, ...props } = this.props;
    let scenes = [];

    React.Children.forEach(children, (item, index) => {
      if (item === null) {
        return;
      }
      let sceneKey = this._getSceneKey(item, index);
      if (!this.state.renderedSceneKeys.has(sceneKey)) {
        return;
      }

      let { selected } = item.props;
      let scene =
        <SceneContainer key={sceneKey} selected={selected} style={sceneStyle}>
          {item}
        </SceneContainer>;

      scenes.push(scene);
    });

    return (
      <View {...props} style={[styles.container, style]}>
        {scenes}
        <TabBar style={tabBarStyle} shadowStyle={tabBarShadowStyle}>
          {React.Children.map(children, this._renderTab)}
        </TabBar>
      </View>
    );
  }

  _renderTab(item) {
    let icon;
    if (item === null) {
      return;
    }
    if (item.props.selected) {
      if (item.props.renderSelectedIcon) {
        icon = item.props.renderSelectedIcon();
      } else if (item.props.renderIcon) {
        let defaultIcon = item.props.renderIcon();
        icon = React.cloneElement(defaultIcon, {
          style: [defaultIcon.props.style, styles.defaultSelectedIcon],
        });
      }
    } else if (item.props.renderIcon) {
      icon = item.props.renderIcon();
    }

    let badge;
    if (item.props.renderBadge) {
      badge = item.props.renderBadge();
    } else if (item.props.badgeText) {
      badge = <Badge>{item.props.badgeText}</Badge>;
    }

    return (
      <Tab
        testID={item.props.testID}
        title={item.props.title}
        allowFontScaling={item.props.allowFontScaling}
        titleStyle={[
          item.props.titleStyle,
          item.props.selected ? [
            styles.defaultSelectedTitle,
            item.props.selectedTitleStyle,
          ] : null,
        ]}
        badge={badge}
        onPress={item.props.onPress}
        hidesTabTouch={this.props.hidesTabTouch}
        style={item.props.tabStyle}>
        {icon}
      </Tab>
    );
  }
}

class SceneContainer extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    selected: PropTypes.bool,
  };

  render() {
    let { selected, ...props } = this.props;
    return (
      <View
        {...props}
        pointerEvents={selected ? 'auto' : 'none'}
        removeClippedSubviews={!selected}
        style={[
          styles.sceneContainer,
          selected ? null : styles.hiddenSceneContainer,
          props.style,
        ]}>
        <StaticContainer shouldUpdate={selected}>
          {this.props.children}
        </StaticContainer>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Layout.tabBarHeight,
  },
  hiddenSceneContainer: {
    overflow: 'hidden',
    opacity: 0,
  },
  defaultSelectedTitle: {
    color: 'rgb(0, 122, 255)',
  },
  defaultSelectedIcon: {
    tintColor: 'rgb(0, 122, 255)',
  },
});

TabNavigator.Item = TabNavigatorItem;
