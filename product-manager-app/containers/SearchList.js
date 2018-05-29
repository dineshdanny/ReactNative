import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Ionicons } from "@expo/vector-icons"
import ProductList from '../components/ProductList';
import * as searchProductsActionCreator from "../actionCreators/search";
let URI = "http://172.16.109.17:4000";
class SearchList extends Component {
  static navigationOptions = {
    title: `Search`,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  searchHandler = (text) => {
    const { searchProducts, resetProducts } = this.props.actions;
    this.setState({ searchText: text }, () => {
      const { searchText } = this.state;
      searchProducts(searchText, 1, this.props.limit);
    });

  }

  onWishTapped = id => {
    const { actions } = this.props;
    actions.addSearchProductToWishList(id);
  };

  _getMore = () => {
    const { actions, page, limit } = this.props;
    const { searchText } = this.state;
    const pageNo = page + 1;
    actions.searchProducts(searchText, pageNo, limit);
  };

  render() {
    const { products, navigation, isLoading } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000" />
          <TextInput
            style={styles.searchBar}
            value={this.state.searchText}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.searchHandler(text)}
            placeholder='Search' />
        </View>
        <View style={{ flex: 1 }}>
          <ProductList
            config={{ enableWish: true }}
            navigation={navigation}
            isLoading={isLoading}
            products={products}
            onWishTapped={this.onWishTapped}
            getMore={this._getMore}
            type="search"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchSection: {
    position: 'relative',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'grey',
  },
  searchIcon: {
    position: 'absolute',
    top: 13,
    left: 13,
    padding: 10,
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    margin: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 40,
    paddingBottom: 10,
    borderRadius: 40,
    backgroundColor: '#fff',
    color: '#424242',
  },
  noResults: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function mapStateToProps(state) {
  return {
    products: state.searchState.products,
    isLoading: state.searchState.isLoading,
    isRefreshing: state.searchState.isRefreshing,
    page: state.searchState.page,
    limit: state.searchState.limit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchProductsActionCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchList
);
