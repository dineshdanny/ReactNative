import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductList from '../components/ProductList';
import * as productActionCreators from "../actionCreators/product";
let URI = "http://172.16.109.17:4000";
class ProductListWithFlatList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._getProducts();
  }

  onWishTapped = id => {
    const { actions } = this.props;
    actions.addToWishList(id);
  };

  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
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
              config={{enableWish: true}}
              navigation={this.props.navigation}
              onRefresh={this._onRefresh}
              products={this.props.products}
              onWishTapped={this.onWishTapped}
              getMore={this._getMore}
              isRefreshing={this.props.isRefreshing}
            />
          )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductListWithFlatList
);
