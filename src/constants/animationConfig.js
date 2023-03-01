import { Easing } from "react-native";

const config = {
    animation: 'spring',
    config: {
        stiffness: 500,
        damping: 60,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    }
};
  
const closeConfig = {
    animation: 'timing',
    config: {
        duration: 200,
        easing: Easing.linear,
    }
};

export {config, closeConfig};