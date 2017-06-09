import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    TouchableHighlight,
    Animated
} from 'react-native';
import APP from '../app';

const { COLORS, INSPIRATIONAL_QUOTES, AntroText, actions } = APP;
const { welcome } = INSPIRATIONAL_QUOTES;

const arr = [0, 1, 2];

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.animatedValue = [];
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0);
        });
    }

    shouldComponentUpdate() {
        return false
    }

    onPress() {
        if (this.props.app.loggedIn === false) {
            this.props.actions.login();
        }
        this.props.navigator.push(this.props.route);
    }

    getRandomQuote() {
        const randomnumber = Math.floor(Math.random() * (welcome.length));
        console.log('randomNumber'+randomnumber);
        return (welcome[randomnumber]);
    }

    render() {
        const animations = arr.map((item) => {
            if (item === 2) {
                return Animated.timing(
                        this.animatedValue[item],
                        {
                            toValue: 1,
                            duration: 1000 * item,
                            delay: 2500
                        }
                    )
            }

            return (Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 1,
                        duration: 1300,
                        delay: 700 * item
                    }
                )
            )
        });

        Animated.stagger(20, animations).start();
        console.log('Welcome rendered');
        return(
            <TouchableHighlight 
                style={{flex: 1}}
                onPress={() => this.onPress()}
                underlayColor={COLORS.transparent}>
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'center'}}>
                        <Animated.View style={{opacity: this.animatedValue[0], marginTop: 70}}>
                            <AntroText style={{fontSize: 40}}>LifeStyle</AntroText>
                        </Animated.View>
                        <Animated.View style={{opacity: this.animatedValue[1], marginTop: 65, marginHorizontal: 35}}>
                            <AntroText style={{fontSize: 24, textAlign: 'center'}}>"{this.getRandomQuote()}"</AntroText>
                        </Animated.View>
                    </View>
                    <Animated.View style={{opacity: this.animatedValue[2], position: 'absolute', left: 0, right: 0, bottom: 20}}>
                        <AntroText style={{fontSize: 20, alignSelf: 'center', textAlign: 'center'}}>Press anywhere to continue</AntroText>
                    </Animated.View>
                </View>
            </TouchableHighlight>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, actions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);