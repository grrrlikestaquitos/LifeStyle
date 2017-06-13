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
  textArray: PropTypes.array.isRequired
};

const ELEMENTS_PER_VIEW = 5;

class LifeStyleScene extends Component {
  constructor(props) {
    super(props);

    this.componentArray = [];

    this.createTextArray();
    this.linearAnimation();
  }

  createTextArray() {
    const array = this.props.textArray.slice();

    while (array.length > 0) {
      console.log('is this function running?');
      var sp = array.splice(0, ELEMENTS_PER_VIEW);   
      
      const object = sp.map((value, index) => {
                      return ({
                        text: value,
                        animation: new Animated.Value(0)
                      });
                    });

      this.componentArray.push(object);
    }
  }

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

  centerDropAnimation() {
    //Animation description:
    //Begin animating the view component that is in the middle, then
    //animate the view components on the top and bottom in parallel
    //We only want the for-loop to iterate half the length of the componentArray
  }

  zigzagAnimation() {
    //Animation description:
    //From the top most view create a zig zag animation from left,
    //then adjacent view create a zig zag animation from right, and so on
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
                      <AntroText style={{fontSize: 18, justifyContent: 'center', textAlign: 'center'}}>{value.text}</AntroText>
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