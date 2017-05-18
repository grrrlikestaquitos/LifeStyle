import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    StyleSheet,
    Dimensions, Animated
} from 'react-native';
import APP from '../app';

const { COLORS, AntroText } = APP;
const { width } = Dimensions.get('window');

const propTypes = {
    app: PropTypes.object.isRequired
};

class Home extends Component {
    constructor() {
        super();

        this.state = {
            fadeAnim1: new Animated.Value(0),
            fadeAnim2: new Animated.Value(0),
            fadeAnim3: new Animated.Value(0)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.app.loggedIn !== this.props.app.loggedIn) {
            setTimeout( () =>
                Animated.timing(
                    this.state.fadeAnim1,
                    {
                        toValue: 1
                    }
                ).start(),
                700
            );
            setTimeout( () =>
                Animated.timing(
                    this.state.fadeAnim2,
                    {
                        toValue: 1
                    }
                ).start(),
                1700
            );
            setTimeout( () =>
                Animated.timing(
                    this.state.fadeAnim3,
                    {
                        toValue: 1
                    }
                ).start(),
                2500
            );
        }
    }
    
    render() {
        console.log('Home renders');
        return(
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginTop: 80, justifyContent: 'center' }}>
                    <Animated.View style={{opacity: this.state.fadeAnim1, right: -15}}>
                        <AntroText style={[styles.text, {width: ((width/2)-10)}]}>You are beautiful,</AntroText>
                    </Animated.View>
                    <Animated.View style={{opacity: this.state.fadeAnim2}}>
                        <AntroText style={[styles.text, {width: ((width/2)-10)}]}>you are wonderful</AntroText>
                    </Animated.View>
                </View>
                <Animated.View style={{opacity: this.state.fadeAnim3}}>
                        <AntroText style={styles.text}>you are extravagant.</AntroText>
                </Animated.View>
                
            </View>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
});

Home.propTypes = propTypes;

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 3
    }
});