import React, { Component } from 'react';
import {
    Image,
    View,
    Animated,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SPLASH_IMAGES = [
    require('../../../images/splashscreen/watercolorbird.png'),
    require('../../../images/splashscreen/watercolorbundleflowers.png'),
    require('../../../images/splashscreen/watercolorflower.jpeg'),
    require('../../../images/splashscreen/watercolorheart.png'),
    require('../../../images/splashscreen/watercolorhummingbird.png'),
    require('../../../images/splashscreen/watercolorlandscape.jpeg'),
    require('../../../images/splashscreen/watercolorraindrops.jpg'),
    require('../../../images/splashscreen/watercolorrose.png'),
    require('../../../images/splashscreen/watercolorsplash.png'),
    require('../../../images/splashscreen/watercolorsplash1.jpg'),
    require('../../../images/splashscreen/watercolorflower2.jpeg'),
    require('../../../images/splashscreen/watercolorleaf.jpeg'),
    require('../../../images/splashscreen/watercolororangebird.jpeg'),
    require('../../../images/splashscreen/watercolorfox.jpeg'),
    require('../../../images/splashscreen/watercolorseattle.jpeg')
];

class SplashScreen extends Component {
    constructor() {
        super();

        this.watercolorImage = [];
        SPLASH_IMAGES.forEach((imageSource, index, array) => {
            this.watercolorImage[index] = <Image
                                        style={{opacity: 0.35, width: width, height: height-50, position: 'absolute', top: 0}}
                                        source={imageSource}
                                        resizeMode='contain'/>
        });
        this.state = {
            imageCount: 0
        };
    }

    componentDidMount() {
      setInterval( () => {
            if (parseInt(this.state.imageCount) === (this.watercolorImage.length-1)) {
                this.setState({
                    imageCount: 0
                })
            } else {

                this.setState({
                    imageCount: (parseInt(this.state.imageCount) + 1)
                })
            }
        }, 15000
      )
    }

    render() {
        console.log('SplashScreen was rendered');
        console.log('Length of waterColor array: '+this.watercolorImage.length);
        return (
            this.watercolorImage[this.state.imageCount]
        );
    }
}

export default SplashScreen;