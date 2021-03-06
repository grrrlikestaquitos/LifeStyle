import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    StyleSheet,
    Dimensions, 
    Animated
} from 'react-native';
import NeighbouringList from './components/NeighbouringList';
import APP from '../app';

const { COLORS, BEACON_LOC_ID, AntroText, actions } = APP;
const { width } = Dimensions.get('window');

const propTypes = {
    app: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};


const arr = [0];

class Home extends Component {
    constructor(props) {
        super(props);

        this.animatedValue = [];
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0);
        });
    }

    initAnimation() {
        if(this.props.app.loggedIn === true) {
            const animations = arr.map((item) => {
                return Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 1,
                        duration: 3200,
                        delay: 400
                    }
                )
            });
            Animated.stagger(20, animations).start();
        }
    }
    
    render() {
        console.log('Home renders');
        this.initAnimation();
        return(
            <View style={styles.container}>
                <NeighbouringList
                    navigator={this.props.navigator}
                    route={this.props.route}
                    app={this.props.app}
                    actions={this.props.actions}/>
                <Animated.View style={{opacity: this.animatedValue[0], position: 'absolute', bottom: 25, right: 15, left: 15 }}>
                    <AntroText style={styles.text2}>Using Sensoro beacons, LifeStyle will deliver a personalized message for you based on your current location.</AntroText>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

Home.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 3
    },
    text2: {
        fontSize: 15,
        textAlign: 'center'
    }
});