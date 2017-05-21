import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    StyleSheet,
    Dimensions, Animated
} from 'react-native';
import APP from '../app';

const { COLORS, BEACON_LOC_ID, AntroText } = APP;
const { width } = Dimensions.get('window');

const propTypes = {
    app: PropTypes.object.isRequired
};


const arr = [0, 1, 2, 3];

class Home extends Component {
    constructor() {
        super();

        this.animatedValue = [];
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0);
        });
    }

    renderIntroduction() {
        if ((this.animatedValue.length > 1) && (this.props.app.loggedIn === true)) {
            const animations = arr.map((item) => {
                return Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 1,
                        duration: 1500 * item
                    }
                )
            });

            Animated.stagger(35, animations).start();

            return (
                <View>
                    <View style={{flexDirection: 'row', marginTop: 80, justifyContent: 'center' }}>
                        <Animated.View style={{opacity: this.animatedValue[0], right: -15}}>
                            <AntroText style={[styles.text, {width: ((width/2)-10)}]}>You are beautiful,</AntroText>
                        </Animated.View>
                        <Animated.View style={{opacity: this.animatedValue[1]}}>
                            <AntroText style={[styles.text, {width: ((width/2)-10)}]}>you are wonderful</AntroText>
                        </Animated.View>
                    </View>
                    <Animated.View style={{opacity: this.animatedValue[2]}}>
                        <AntroText style={styles.text}>you are extravagant;</AntroText>
                    </Animated.View>
                    <Animated.View style={{opacity: this.animatedValue[3]}}>
                        <AntroText style={styles.text}>you are love.</AntroText>
                    </Animated.View>
                </View>
            );
        }
    }
    
    render() {
        console.log('Home renders');
        return(
            <View style={styles.container}>
                {this.renderIntroduction()}
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