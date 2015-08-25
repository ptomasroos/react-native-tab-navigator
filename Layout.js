'use strict';

import React from 'react-native';
let {
  PixelRatio
} = React;

export default {
  pixel: 1 / PixelRatio.get(),
};
