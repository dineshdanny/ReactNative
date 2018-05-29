import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as storeActionCreator from "../actionCreators/store";

class StoreMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getStores();
  }

  renderMapView = () => {
    const { stores } = this.props;
    console.log(stores);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: stores[0].latitude,
          longitude: stores[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {stores.map(s => (<MapView.Marker
          coordinate={{
            latitude: s.latitude,
            longitude: s.longitude
          }}
          title={s.title}
          key={s.id}
        />
        ))}
      </MapView>
    );
  }
  render() {
    const { isLoading, stores } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : stores.length > 0 && this.renderMapView()
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    stores: state.storeState.stores,
    isLoading: state.storeState.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storeActionCreator, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  StoreMap
);
