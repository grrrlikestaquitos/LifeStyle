import React, { Component, PropTypes } from 'react';
import {
    ListView,
    TouchableHighlight,
    Image,
    View
} from 'react-native';
import APP from '../../app';

const { BEACON_LOC_ID, AntroText } = APP;

const propTypes = {
    navigator: PropTypes.object.isRequired,
    beaconList: PropTypes.array.isRequired
}

class NeighbouringList extends Component {
    constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  pressRow(rowID, rowData) {
    //this.props.navigator.push();
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    const text = rowData.description.length > 60 ?
      rowData.description.substring(0, 60).trim().concat('...') :
      rowData.description;

    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(rowID, rowData);
          highlightRow(sectionID, rowID);
        }}
      >
        <View>
        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (this.props.beaconList > 1) {
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

  render() {
    const dataSource = this.dataSource.cloneWithRows(this.props.beaconList);

    return (
      <ListView
        style={{height: 40, width: 200}}
        dataSource={dataSource}
        stickyHeaderIndices={[0]}
        renderHeader={() => <AntroText>Nearby Locations</AntroText>}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        bounces={false}
      />
    );
  }
}

export default NeighbouringList;