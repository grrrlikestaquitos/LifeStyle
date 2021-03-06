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
const { COLORS, AnimatedHearts, LifeStyleScene, SplashScreen, actions } = app;

const { width, height } = Dimensions.get('window');

const propTypes = {
    app: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

const ROUTE_STACK = [
    { title: 'welcome', index: 0 },
    { title: 'home', index: 1 },
    { title: 'place', index: 2 }
];

const INIT_ROUTE_INDEX = 0;

class App extends Component {
    constructor(props) {
        super(props);

        this.checkNativeArray = this.checkNativeArray.bind(this);

    }

    checkNativeArray(event) {
        const { actions, app } = this.props;
        const { beaconList } = app;
        console.log('Check native array method: ' + event);
        console.log('Props array: ' + beaconList);

        const eventLength = event.length;
        const beaconListLength = beaconList.length;
        
        if (eventLength > 0) {
            if ((eventLength > 0) && (beaconListLength > 0)) {
                if (eventLength > beaconListLength) {
                    //A new beacon(s) was introduced - scenario
                    //if nativeEvent has more than beaconList

                    for (i = 0; i < eventLength; i++) {
                        const beacon = event[i];
                        if (!(beaconList.includes(beacon))) {
                            actions.addNewBeacon(beacon);
                        }
                    }
                    /* Legacy Code - does the same task, but could introduce bugs on some edge cases */
                        /*const difference = (event.length-beaconList.length);
                        console.log('Event array has '+(difference)+' more element(s) than beacon List');
                        for (i = beaconList.length; i < event.length; i++) {
                            actions.addNewBeacon(event[i]);
                    }*/
                } else if (eventLength < beaconListLength) {
                    //An existing beacon has been removed
                    for (i = 0; i < beaconListLength; i++) {
                        const beacon = beaconList[i];
                        if (!(event.includes(beacon))) {
                            actions.removeBeacon(beacon);
                        }
                    }
                }
            } else if (eventLength === beaconListLength) {
                //Run a security check in case beacons were swapped out and replaced within the time frame
                for (i = 0; i < eventLength; i++) {
                    const eventBeacon = event[i];
                    const propsBeacon = beaconList[i];
                    if (!(beaconList.includes(eventBeacon))) {
                        actions.addNewBeacon(eventBeacon);
                    }
                    if (!(event.includes(propsBeacon))) {
                        actions.removeBeacon(propsBeacon);
                    }
                }
            } else {
                //First time sighted a beacon
                for (i = 0; i < eventLength; i++) {
                    actions.addNewBeacon(event[i]);
                }
            }
        } else if (eventLength === 0) {
            //Remove all beacons because the event is empty
            for (i = 0; i < beaconListLength; i++) {
                const beacon = beaconList[i];
                actions.removeBeacon(beacon);
            }
        }
    }

    componentDidMount() {
        const { BeaconManager } = NativeModules;

        setInterval(() =>
            BeaconManager.getBeaconList((error, event) => {
                if (error) {
                    console.error(error);
                } else {
                    this.checkNativeArray(event);
                }
            }),
            7000
        );
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return(
            <View style={{ flex: 1, marginTop: 20 }}>
                <AnimatedHearts />
                <SplashScreen />
                <Navigator
                    ref={(navigator) => { this.navigator = navigator; }}
                    configureScene={() => ({...Navigator.SceneConfigs.HorizontalSwipeJump})}
                    initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                    initialRouteStack={ROUTE_STACK}
                    renderScene={(route, navigator) => {
                        switch (route.index) {
                            case 0:
                                return(<Welcome navigator={navigator}
                                                route={ROUTE_STACK[1]}/>)

                            case 1: 
                                return (<Home navigator={navigator}
                                              route={ROUTE_STACK[2]}/>)

                            case 2:
                                return (<LifeStyleScene navigator={navigator}
                                                        textObject={this.props.app.selectedPlaceObject}/>);
                        
                        }
                        
                    }}/>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    app: state.app
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        Object.assign({}, actions),
        dispatch
    )
});

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);