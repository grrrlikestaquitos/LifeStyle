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

        this.animateImage();
    }

    componentDidMount() {
        //Interval logic for switching image components every 15 seconds
      setInterval( () => {
            if (parseInt(this.state.imageCount) === (this.watercolorImage.length-1)) {
                this.setState({ imageCount: 0 })
            } else {
                this.setState({ imageCount: (parseInt(this.state.imageCount) + 1) })
            }
        }, 15000
      );
    }

    animateImage() {
        //Animated Sequence
        Animated.sequence([
            Animated.timing(
                this.viewAnimation,
                {
                    toValue: .35,
                    duration: 10000
                }
            ),
            Animated.timing(
                this.viewAnimation,
                {
                    toValue: 0,
                    duration: 5000
                }
            )
        ]).start(event => {
            if (event.finished) {
                this.animateImage();
            }
        });
    }

    render() {
        console.log('SplashScreen was rendered');
        return (
            <Animated.View style={{opacity: this.viewAnimation}}>
                {this.watercolorImage[this.state.imageCount]}
            </Animated.View>
        );
    }
}

export default SplashScreen;