import React, { PropTypes } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { COLORS } from '../constants';

const propTypes = {
  navigator: PropTypes.object.isRequired,
  children: PropTypes.any
};

const LifeStyleScene = props => (
  <View style={styles.container}>
      <TouchableHighlight
        style={styles.iconCont}
        underlayColor={COLORS.transparent}
        onPress={() => props.navigator.pop()}
      >
        <Image
          style={styles.icon}
          source={require('../../../images/icons/back.png')}
          resizeMode="contain"
        />
      </TouchableHighlight>
      <TouchableWithoutFeedback>
        <View>
          {props.children}
        </View>
      </TouchableWithoutFeedback>
  </View>
);


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