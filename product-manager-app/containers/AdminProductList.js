import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  Vibration,
  View
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductList from '../components/ProductList';
import * as productActionCreators from "../actionCreators/product";

const DURATION = 1000;
class AdminProductList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._getProducts();
  }

  componentDidUpdate(prevprops) {
    const { isDeleted } = this.props;
    if (prevprops.isDeleted !== isDeleted && isDeleted) {
      Alert.alert('Success', 'Product Deleted Successfully');
      Vibration.vibrate(DURATION);
    }
  }

  onDeleteTapped = (id, index) => {
    const { actions } = this.props;
    Alert.alert(
      'Delete',
      'Are you sure to delete?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => actions.deleteProduct(id, index) },
      ],
      { cancelable: false }
    );
  };

  _getProducts = (page = 1, limit = 8) => {
    const { actions } = this.props;
    actions.getProducts(page, limit);
  };

  _getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
  };

  _onRefresh = () => {
    this._getProducts();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
            <ProductList
              config={{ enableDelete: true }}
              navigation={this.props.navigation}
              onRefresh={this._onRefresh}
              products={this.props.products}
              onDeleteTapped={this.onDeleteTapped}
              getMore={this._getMore}
              isRefreshing={this.props.isRefreshing}
              type="admin"
            />
          )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { products, isLoading, isRefreshing, page, limit, isDeleted } = state.productState;
  return {
    products,
    isLoading,
    isRefreshing,
    page,
    limit,
    isDeleted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AdminProductList
);
