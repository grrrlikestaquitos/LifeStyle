import React, { Component, PropTypes } from 'react';
import {
    ListView,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
    View
} from 'react-native';
import APP from '../../app';

const { COLORS, BEACON_LOC_ID, AntroText } = APP;
const { width } = Dimensions.get('window');

const propTypes = {
    navigator: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
}

const arr = [0, 1, 2];

class NeighbouringList extends Component {
    constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);

    this.animatedValue = [];
    arr.forEach((index) => {
      this.animatedValue[index] = new Animated.Value(0);
    });


    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  pressRow(rowID, rowData) {
    //this.props.navigator.push();
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    console.log(`New row created ${rowData}`);
    const beaconID = rowData.beacon;
    const place = rowData.location;
    const icon = rowData.icon;

    if (this.props.app.beaconList.includes(beaconID)) {
      console.log('This function works as expected!');

      return ( 
        <TouchableHighlight
          onPress={() => {
            this.pressRow(rowID, rowData);
            highlightRow(sectionID, rowID);
          }}
          underlayColor={COLORS.transparent}
        >
          <View style={{height: 45, width: width-120, marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Image style={{height: 40, width: 40, marginRight: 35}} source={icon} resizeMode="contain"/>
            <AntroText style={{fontSize: 22}}>{place}</AntroText>
          </View>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (this.props.app.beaconList.length > 1) {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{
            height: adjacentRowHighlighted ? 1 : 1,
            backgroundColor: adjacentRowHighlighted ? '#CCC' : '#CCC'
          }}
        />
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    var areSame = (this.props.app.beaconList.length == nextProps.app.beaconList.length) && this.props.app.beaconList.every((element, index) => {
      return element === nextProps.app.beaconList[index]; 
    });
    if (areSame) {
     return false;
    } else {
      return true;
    }
  }

  initAnimation() {
    if(this.props.app.loggedIn === true) {
        const animations = arr.map((item) => {
            return Animated.timing(
                this.animatedValue[item],
                {
                    toValue: 1,
                    duration: 500,
                }
            ).start();
        });
    }
  }

  render() {
    console.log('Listview did render?');
    this.initAnimation();
    const dataSource = this.dataSource.cloneWithRows(BEACON_LOC_ID);
    return (
      <Animated.View style={{opacity: this.animatedValue[0], marginTop: 60}}>
        <ListView
          contentContainerStyle={{alignItems: 'center'}}
          dataSource={dataSource}
          stickyHeaderIndices={[0]}
          renderHeader={() => <AntroText style={styles.header}>Locations you are nearby</AntroText>}
          enableEmptySections={true}
          removeClippedSubviews={false}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          bounces={false}
        />
      </Animated.View>
    );
  }
}

export default NeighbouringList;

const styles = StyleSheet.create({
  header: {
    height: 60,
  }
});