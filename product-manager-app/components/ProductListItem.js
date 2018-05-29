import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Alert
} from "react-native";

import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

class ProductListItem extends React.PureComponent {

  navigateHandler = () => {
    const { id, navigation, type } = this.props;
    let URL;
    switch (type) {
      case 'search':
        URL = 'SearchProductDetail';
        break;
      case 'admin':
        URL = 'AdminDetail';
        break;
      default:
        URL = 'Detail';
    }
    navigation.navigate(URL, { id });
  }

  render() {
    const {
      id,
      image,
      title,
      price,
      rating,
      wish,
      onWishTapped,
      onDeleteTapped,
      config,
      index,
    } = this.props;
    const { enableDelete, enableWish } = config;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.navigateHandler}
      >
        <View style={styles.container}>
          <Image
            source={image ? { uri: image } : require("../assets/barcode.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={styles.infoContainer}>
              <Text
                style={[styles.title, { flexShrink: 1, overflow: "hidden" }]}
              >
                {title}
              </Text>

              {enableWish && <Ionicons
                name={wish ? "md-heart" : "md-heart-outline"}
                size={32}
                color="#00ff80"
                style={{ marginRight: 10 }}
                hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
                onPress={() => onWishTapped(id)}
              />}
              {enableDelete && <MaterialIcons
                name={"delete"}
                size={32}
                color="red"
                style={{ marginRight: 10 }}
                hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
                onPress={() => onDeleteTapped(id, index)}
              />}
            </View>
            <View style={styles.rating}>
              <Text style={{ color: "#fff", marginRight: 4 }}>{rating || "NA"}</Text>
              <Ionicons name="md-star" size={12} color="#fff" />
            </View>
            <View style={styles.price}>
              <FontAwesome name="rupee" size={16} color="#000" />
              <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
                {price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
    marginRight: 15,
    marginLeft: 15,
    height: 150
  },
  image: {
    width: 120,
    height: 120
  },
  title: {
    color: "black",
    marginRight: 8,
    marginLeft: 8,
    fontSize: 12
  },
  infoContainer: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: 'space-between'
  },
  rating: {
    borderRadius: 5,
    backgroundColor: "#0040ff",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: 10
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: 10
  }
});
export default ProductListItem;