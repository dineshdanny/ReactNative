import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Picker, Alert, Text, Platform, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as addProductActionCreators from "../actionCreators/addProduct"

class AddProduct extends Component {
  static navigationOptions = {
    title: "Add",
    headerStyle: {
      backgroundColor: "#00ff80"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleError: null,
      category: 'Mobiles',
      additionalInfo: '',
      categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
      price: ''
    }
  }

  componentDidUpdate(prevprops) {
    const { isProductAdded } = this.props;
    if (prevprops.isProductAdded !== isProductAdded && isProductAdded) {
      this.setState({ title: '', additionalInfo: '', category: 'Mobiles', price: '' });
      Alert.alert('Success', 'Product Saved Successfully');
    }
  }

  handleSubmit = () => {
    let {
      title,
      category,
      additionalInfo,
      price
    } = this.state;
    const { actions } = this.props;
    if (!title) {
      this.setState({ titleError: 'Title is required' })
      return;
    }
    actions.addProduct({ title, category, additionalInfo, price });
  }

  renderCategories = () => {
    return this.state.categories.map(c => <Picker.Item key={c} label={c} value={c} />)
  }

  renderAddForm = () => (<View>
    <TextInput
      style={styles.control}
      onChangeText={(title) => {
        this.setState({ title, titleError: null })
        if (title.length == 0) {
          this.setState({ titleError: 'Title is required' })
        }
      }}
      value={this.state.title}
      placeholder="Product Name"
      placeholderTextColor="grey"
    />
    {this.state.titleError && <Text style={{ color: 'red' }}>Title is required</Text>}
    <TextInput
      numberOfLines={5}
      onChangeText={(additionalInfo) => this.setState({ additionalInfo })}
      multiline={true}
      value={this.state.additionalInfo}
      placeholder="Additional Info"
      placeholderTextColor="grey"
      style={styles.additionalInfo}
    />
    <TextInput
      style={styles.control}
      onChangeText={(price) => this.setState({ price })}
      value={this.state.price}
      placeholder="Product Price"
      placeholderTextColor="grey"
      keyboardType="number-pad"
    />
    <Picker
      selectedValue={this.state.category}
      onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
      {this.renderCategories()}
    </Picker>
    <Button
      title="Add"
      onPress={this.handleSubmit}
    />
  </View>);

  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator size="large" color="#00ff80" /> : this.renderAddForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    backgroundColor: '#ffffff',
  },
  control: {
    ...Platform.select({
      android: {
        height: 40
      },
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        marginTop: 20,
        marginBottom: 20
      }
    })
  },
  additionalInfo: {
    ...Platform.select({
      ios: {
        height: 80
      }
    })
  }
});

function mapStateToProps(state) {
  return {
    isProductAdded: state.addProductState.isProductAdded,
    isLoading: state.addProductState.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(addProductActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AddProduct
);
