import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  View
} from 'react-native';
import AntroText from './AntroText';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

const propTypes = {
  navigator: PropTypes.object.isRequired,
  textObject: PropTypes.object.isRequired
};

const ELEMENTS_PER_VIEW = 5;

class LifeStyleScene extends Component {
  constructor(props) {
    super(props);

    this.componentArray = [];

    this.createTextArray();
    this.randomAnimation();
  }

  createTextArray() {
    const array = this.props.textObject.text.slice();

    while (array.length > 0) {
      var sp = array.splice(0, ELEMENTS_PER_VIEW);   
      
      const object = sp.map((value, index) => {
                      return ({
                        text: value,
                        fontSize: 18,
                        color: COLORS.gray,
                        animation: new Animated.Value(0)
                      });
                    });

      this.componentArray.push(object);
    }
  }

  randomAnimation() {
    const x = Math.floor(Math.random() * 3);
    console.log('random number '+x);
    switch (x) {
      case 0:
        this.linearAnimation();
        break;
    
      case 1:
        this.closeInFromSidesAnimation();
        break;
      
      case 2:
        this.zigzagAnimation();
        break;

      default:
        break;
    }
  }

  //** Animations Functions **//
  linearAnimation() {
    //Animation description: A linear animation starting from the top to the bottom
    for (var i = 0; i < this.componentArray.length; i++) {
      const viewObject = this.componentArray[i];

      for (var x = 0; x < viewObject.length; x++) {
        const textObject = viewObject[x];

        Animated.timing(textObject.animation, { toValue: 1, duration: 2500, delay: 140*i }).start();
      }
    }
  }

  zigzagAnimation() {
    //Animation description:
    //From the top most view create a zig zag animation from left,
    //then adjacent view create a zig zag animation from right, and so on
    const animations = [];

    for (var i = 0; i < this.componentArray.length; i++) {
      const viewObject = this.componentArray[i];

      if (i%2) { //if i is odd
        for (var x = 0; x < viewObject.length; x++) {
          const textObject = viewObject[x];

          animations.push(Animated.timing(textObject.animation, { toValue: 1, duration: 400 }));
        }
      } else { //even
        for (var z = viewObject.length-1; z > -1; z--) {
          const textObject = viewObject[z];

          animations.push(Animated.timing(textObject.animation, { toValue: 1, duration: 400 }));
        }
      }
    }

    Animated.stagger(75, animations).start();
  }

  closeInFromSidesAnimation() {

    const leftAnimation = [];
    const rightAnimation = [];

    for (var i = 0; i < this.componentArray.length; i++) {
      const viewObject = this.componentArray[i];

      if (i%2) { //if i is odd
        for (var x = 0; x < viewObject.length; x++) {
          const textObject = viewObject[x];

          rightAnimation.push(Animated.timing(textObject.animation, { toValue: 1, duration: 400 }));
        }
      } else { //even
        for (var z = viewObject.length-1; z > -1; z--) {
          const textObject = viewObject[z];

          leftAnimation.push(Animated.timing(textObject.animation, { toValue: 1, duration: 400 }));
        }
      }
    }

    Animated.stagger(240, leftAnimation).start();
    Animated.stagger(240 , rightAnimation).start();
  }

  centerDropAnimation() {
    //Animation description:
    //Begin animating the view component that is in the middle, thenanimate the view components top 
    //and bottom in parallel we only want the for-loop to iterate half the length of the componentArray
  }


  render() {
    console.log('LifeStyle scene rendered');
    return(
      <View style={styles.container}>
          <TouchableHighlight
            style={styles.iconCont}
            underlayColor={COLORS.transparent}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              style={styles.icon}
              source={require('../../../images/icons/back.png')}
              resizeMode="contain"
            />
          </TouchableHighlight>
          {this.componentArray.map((value, index) => {
            return (
              <View style={{height: 35, width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} key={index}>
                {this.componentArray[index].map((value, index) => {
                  return (
                    <Animated.View style={{opacity: value.animation}} key={index}>
                      <AntroText style={{fontSize: value.fontSize, color: value.color, justifyContent: 'center', textAlign: 'center'}}>{value.text}</AntroText>
                    </Animated.View>
                    );
                })}
              </View>
            );
          })}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  iconCont: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 999
  },
  icon: {
    width: 35,
    height: 35
  }
});

LifeStyleScene.propTypes = propTypes;

export default LifeStyleScene;