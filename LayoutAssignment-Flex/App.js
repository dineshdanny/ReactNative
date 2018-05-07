import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
            <View style={[styles.bigBox,{backgroundColor: 'red'}]}>
            </View>
            <View style={[{backgroundColor: 'green',height:125}]}>
            </View>
        </View>
        <View style={styles.view2}>
          <View style={styles.smallBox}>
          </View>
          <View style={styles.smallBox}>
          </View>
          <View style={styles.smallBox}>
          </View>
          <View style={styles.smallBox}>
          </View>          
          <View style={styles.smallBox}>
          </View>
		  <View style={styles.smallBox}>
          </View>
		  <View style={styles.smallBox}>
          </View>
		  <View style={styles.smallBox}>
          </View>
		  <View style={styles.smallBox}>
          </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view1: {
    alignItems:"stretch"
  },
  view2: {
    flex: 1,
    flexDirection:"row",
    flexWrap:"wrap"
  },
  smallBox:{
    backgroundColor: 'blue',
    height:100,
    width:100,
    flexGrow:1,
    margin:2
  },
  bigBox:{
    height:125
  }
});
