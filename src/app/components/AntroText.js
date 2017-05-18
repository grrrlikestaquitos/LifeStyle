import React, { Component, PropTypes } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';

import { COLORS } from '../constants';

const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.any
}

class AntroText extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Text style={[styles.text, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

AntroText.propTypes = propTypes;

export default AntroText;

const styles = StyleSheet.create({
    text: {
        color: COLORS.black,
        fontSize: 22,
        fontFamily: 'AntroVectra'
    }
});