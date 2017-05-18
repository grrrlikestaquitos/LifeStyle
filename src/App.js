import React, { Component, PropTypes } from 'react';
import {
    View,
    Dimensions,
    NativeModules
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import welcome from './welcome';
import home from './home';
import app from './app';

const { Welcome } = welcome;
const { Home } = home;
const { COLORS, AnimatedHearts, actions } = app;

const { width, height } = Dimensions.get('window');

const propTypes = {
    actions: PropTypes.object.isRequired
};

const ROUTE_STACK = [
    { position: 'left', scene: Welcome },
    { position: 'right', scene: Home }
];

const INIT_ROUTE_INDEX = 0;

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { actions } = this.props;
        const { BeaconManager } = NativeModules;

        setInterval( () =>
            BeaconManager.getBeaconList((error, events) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(events);
                }
            }),
            10000
        );
    }

    render() {
        return(
            <View style={{ flex: 1, marginTop: 20 }}>
                <AnimatedHearts />
                <Navigator
                    ref={(navigator) => { this.navigator = navigator; }}
                    configureScene={() => ({...Navigator.SceneConfigs.HorizontalSwipeJump})}
                    initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                    initialRouteStack={ROUTE_STACK}
                    renderScene={(route, navigator) => {
                        if (route.position === 'right') {
                            return (<Home/>);
                        }
                        return(<Welcome navigator={navigator}/> );
                    }}/>
            </View>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        Object.assign({}, actions),
        dispatch
    )
});

App.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(App);