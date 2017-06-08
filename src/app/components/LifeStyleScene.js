import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import AntroText from './AntroText';
import { COLORS } from '../constants';

const propTypes = {
  navigator: PropTypes.object.isRequired,
  textArray: PropTypes.array.isRequired
};

class LifeStyleScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('LifeStyle scene rendered');
    console.log('LifeStyle scene array: ' + this.props.textArray);
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
          <View style={{flex: 1, backgroundColor: COLORS.heartRed}}>
            {this.props.textArray.map((value, index) => {
              console.log(`Value in array: ${value}`);
              return (
                <AntroText 
                  style={{height: 20, fontSize: 20}}
                  key={index}>
                  {value}
                </AntroText>
                );
            })}
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
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