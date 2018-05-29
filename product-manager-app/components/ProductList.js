import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View,
  Text,
} from "react-native";

let URI = "http://172.16.109.17:4000";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = ({ index, item }) => {
    const { onWishTapped } = this.props;
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        index={index}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
        wish={item.wish || false}
        onWishTapped={onWishTapped}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _renderRefreshControl() {
    const { isRefreshing } = this.props;
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={isRefreshing}
        tintColor={"#00ff80"}
        title={"Refreshing..."}
        titleColor={"#00ff80"}
      />
    );
  }

  /*  flat list supporting methods - END */

  render() {
    const { onRefresh, getMore, products, isLoading } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
            products.length > 0 ? <FlatList
              data={products}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              onEndReachedThreshold={0.5}
              onEndReached={getMore}
              refreshControl={onRefresh ? this._renderRefreshControl() : null}
            /> : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Results</Text>
              </View>
          )}
      </View>
    );
  }
}
