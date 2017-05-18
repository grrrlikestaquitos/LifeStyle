import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    TouchableHighlight
} from 'react-native';
import APP from '../app';

const { COLORS, AntroText, actions } = APP;

const propTypes = {
    navigator: PropTypes.object.isRequired,
    homeRoute: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

class Welcome extends Component {
    constructor(props) {
        super(props);

    }

    shouldComponentUpdate() {
        return false
    }

    onPress() {
        if (this.props.app.loggedIn === false) {
            this.props.actions.login();
        }
        this.props.navigator.jumpForward();
    }

    render() {
        console.log('Welcome rendered');
        return(
            <TouchableHighlight 
                style={{flex: 1}}
                onPress={() => this.onPress()}
                underlayColor={COLORS.transparent}>
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'center'}}>
                        <AntroText style={{marginTop: 70, fontSize: 36}}>Happy Birthday!!</AntroText>
                        <AntroText style={{marginTop: 65, fontSize: 30, marginHorizontal: 35, textAlign: 'center'}}>
                            There are two great days in a person's life - the day we are born and the day we discover why.
                        </AntroText>
                    </View>
                    <AntroText style={{position: 'absolute', left: 0, right: 0, bottom: 20, fontSize: 20, alignSelf: 'center', textAlign: 'center'}}>Press Anywhere To Continue</AntroText>
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