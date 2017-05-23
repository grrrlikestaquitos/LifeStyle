import React, { Component } from 'react';
import {
    Image,
    View,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import { SPLASH_IMAGES } from '../constants';

const { width, height } = Dimensions.get('window');

class SplashScreen extends Component {
    constructor() {
        super();

        this.viewAnimation = new Animated.Value(0);
        this.watercolorImage = [];
        SPLASH_IMAGES.forEach((imageSource, index, array) => {
            this.watercolorImage[index] = <Image style={{width: width, height: height-50, position: 'absolute', top: 0}} source={imageSource} resizeMode='contain'/>
        });

        this.state = {
            imageCount: 0
        };
    }

    componentDidMount() {
      setInterval( () => {
            if (parseInt(this.state.imageCount) === (this.watercolorImage.length-1)) {
                this.setState({ imageCount: 0 })
            } else {
                this.setState({ imageCount: (parseInt(this.state.imageCount) + 1) })
            }
        }, 15000
      );

    }

    render() {
        console.log('SplashScreen was rendered');
        const opacity = this.viewAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.35, 0]
        });
        return (
            <Animated.View>
                {this.watercolorImage[this.state.imageCount]}
            </Animated.View>
        );
    }
}

export default SplashScreen;