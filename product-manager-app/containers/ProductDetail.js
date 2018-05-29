import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productDetailsActionCreators from "../actionCreators/productDetails";


let URI = "http://172.16.109.17:4000";

class ProductDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Product Detail for ${navigation.state.params.id}`
  });

  componentDidMount() {
    const { actions } = this.props;
    let { id } = this.props.navigation.state.params;
    actions.getProductDetails(id);
  }

  renderProduct() {
    const { navigation, productDetails } = this.props;
    const { image, id, title, additionalInfo } = productDetails;
    return (<View>
      <Image
        source={image ? { uri: `${URI}/images/${image}` } : require("../assets/barcode.png")}
        style={{ height: 200, marginTop: 20 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>{id} - {title}</Text>
      <Text style={[styles.title, { fontSize: 16 }]}>
        {additionalInfo && `(${additionalInfo})`}
      </Text>
    </View>)
  }

  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
            this.renderProduct()
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    padding: 10
  },
  title: {
    fontSize: 24,
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    productDetails: state.detailsState.productDetails,
    isLoading: state.detailsState.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productDetailsActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductDetail
);
