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
    app: PropTypes.object.isRequired,
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

        this.checkNativeArray = this.checkNativeArray.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        console.log('Beacon List was updated: '+nextProps.app.beaconList);
    }

    checkNativeArray(event) {
        const { actions, app } = this.props;
        const { beaconList } = app;
        console.log('Check native array method: '+event);
        console.log('Props array: '+beaconList);

        if ((event.length > 0) && (beaconList.length > 0)) {
            if (event.length > beaconList.length) {
                //A new beacon(s) was introduced - scenario
                //if nativeEvent has more than beaconList
                const difference = (event.length-beaconList.length);
                console.log('Event array has '+(difference)+' more element(s) than beacon List');
                for (i = beaconList.length; i < event.length; i++) {
                    console.log('Index of: '+i);
                    actions.addNewBeacon(event[i]);
                }
            } else if (event.length < beaconList.length) {
                //An existing beacon has been removed
            }
            // for (i = 0; i < event.length; i++) {
            //     for (x = 0; x < beaconList.length; x++) {
            //         if (event[i] === beaconList[x]) {
            //             //this check if items in both arrays are the same, if so, do nothing
            //             console.log(`${event[i]} and ${beaconList[x]} are a match!`)
            //         } else if (event[i] !== beaconList[x]) {
            //             //event array is not in beaconList array
            //             //therefore array would have to append the new value
            //             console.log(event[i]+' is not in beaconList array');
            //         }
            //     }
            // }
        } else {
            //First time sighted a beacon
            for (i = 0; i < event.length; i++) {
                console.log(`Added beacon ${event[i]} into the beaconList array`);
                actions.addNewBeacon(event[i]);
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
                    if (event.length > 0) {
                        this.checkNativeArray(event);
                    }
                }
            }),
            10000
        );
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        console.log('App is being rendered, contents in beaconList: ' + this.props.app.beaconList);
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