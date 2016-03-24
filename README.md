# TabNavigator [![Slack](http://slack.exponentjs.com/badge.svg)](http://slack.exponentjs.com)
A tab bar that switches between scenes, written in JS for cross-platform support. It works on iOS and Android.

This component is compatible with React Native 0.16 and newer.

The look and feel is slightly different than the native navigator but it is better in some ways. Also it is pure JavaScript.

The API of this component may change in the future to be more like Navigator's, which works great once there is better support for nested Navigators in React Native.

Install
-------

Make sure that you are in your React Native project directory and run:

```npm install react-native-tab-navigator --save```

## Usage

Import TabNavigator as a JavaScript module:

```js
import TabNavigator from 'react-native-tab-navigator';
```

This is an example of how to use the component and some of the commonly used props that it supports:

```js
<TabNavigator>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'home'}
    title="Home"
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    selectedTabStyle={{backgroundColor: '...'}}
    badgeText="1"
    onPress={() => this.setState({ selectedTab: 'home' })}>
    {homeView}
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'profile'}
    title="Profile"
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    selectedTabStyle={{backgroundColor: '...'}}
    renderBadge={() => <CustomBadgeView />}
    onPress={() => this.setState({ selectedTab: 'profile' })}>
    {profileView}
  </TabNavigator.Item>
</TabNavigator>
```

See TabNavigatorItem's supported props for more info.

## Hiding the Tab Bar

### Hiding on iOS

You can hide the tab bar by using styles. For example:

```js
let tabBarHeight = 0;
<TabNavigator
  tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
  sceneStyle={{ paddingBottom: tabBarHeight }}
/>
```

### Hiding on Android

Since overflow hidden is not supported on Android, you can hide the tab bar by moving it off the screen. For example:

```js
if (hidden) {
    var tabBarStyle = {position: 'absolute', top: Dimensions.get('window').height};
    var sceneStyle = {paddingBottom: 0};
} else {
    let tabBarHeight = 50;
    var tabBarStyle = {height: tabBarHeight};
    var sceneStyle = {paddingBottom: tabBarHeight};
}

<TabNavigator
    tabBarStyle={tabBarStyle}
    sceneStyle={sceneStyle}
/>
```
