
import { View, ViewPropTypes as RNViewPropTypes ,Animated} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

export const  AnimatedViewPropTypes = Animated.View.propTypes;
 
export default ViewPropTypes;
