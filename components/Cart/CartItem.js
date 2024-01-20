import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CartItem = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.manufacturer }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}> {item?.productName}</Text>
        <Text style={styles.name}> Price: {item?.price} $</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={onDecrement}>
          {/* <Text style={styles.btnQtyText}>-</Text> */}
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={onIncrement}>
          {/* <Text style={styles.btnQtyText}>+</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 2,  // Độ rộng của border
    borderColor: "lightgray",  // Màu sắc của border
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  name: {
    fontSize: 12,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
  },
});

export default CartItem;
