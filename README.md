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
    badgeText="1"
    onPress={() => this.setState({ selectedTab: 'home' })}>
    {homeView}
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'profile'}
    title="Profile"
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    renderBadge={() => <CustomBadgeView />}
    onPress={() => this.setState({ selectedTab: 'profile' })}>
    {profileView}
  </TabNavigator.Item>
</TabNavigator>
```

See TabNavigatorItem's supported props for more info.

### Hiding the Tab Bar

You can hide the tab bar by using styles. For example:
```js
let tabBarHeight = 0;
<TabNavigator
  tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
  sceneStyle={{ paddingBottom: tabBarHeight }}
/>
```
### Floating Scene
`floatingScene` prop allows you to inject an additional scene
that renders on top of all other scenes and is always visible across different selected tabs/scene. A practical example could be the mini music player in Apple Music app,
that  appears behind the tabs navigator and  is always visible across the different scenes.

```js
  var floatComp = (props) => {
    return (<View><Text>This will be on top of other scenes</Text></View>)
  }

  <TabNavigator
    floatingScene={floatComp()}
  >
```