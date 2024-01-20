import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartItem from "../components/Cart/CartItem";
import Layout from "../components/Layout/Layout";
import PriceTable from "../components/Cart/PriceTable";
import { useNavigation } from "@react-navigation/native";
import {api} from '../data/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
          console.warn("Không tìm thấy accessToken trong AsyncStorage.");
          return;
        }

        const response = await axios.get(`http://${api[0].ip}:8080/cart`, {
          headers: {
            token: token,
          },
        });

        setCartItems(response.data.cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin giỏ hàng:", error);
      }
    };

    fetchCartData();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.cartProduct.price * item.cartItemQuantity,
      0
    );
  };

  const handleClearCart = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log(token)
      if (!token) {
        console.warn("Không tìm thấy accessToken trong AsyncStorage.");
        return;
      }
      const response = await axios.delete(`http://${api[0].ip}:8080/cart/clear`, {
        headers: {
          token: token
        },
      });
      if (response.status==202) {
        Alert.alert("Xóa giỏ hàng thành công");
        navigation.navigate("home")
      } else {
        Alert.alert("Có lỗi khi xóa giỏ hàng, cỏ thể giỏ hàng đang trống");
      }
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  };

  return (
    <Layout>
      <Text style={styles.heading}>
        {cartItems?.length > 0
          ? `You Have ${cartItems?.length} Item Left In Your Cart`
          : "OOPS Your Cart Is EMPTY !"}
      </Text>
      {cartItems?.length > 0 && (
        <>
          <ScrollView>
            {cartItems?.map((item) => (
              <CartItem
                item={item.cartProduct}
                quantity={item.cartItemQuantity}
                key={item.cartItemId}
              />
            ))}
          </ScrollView>

          <View>
            {/* Display subtotal */}
            <PriceTable title={"Total Price"} price={calculateTotalPrice()} />
            {/* Display tax (calculated dynamically as 10% of the total price) */}
            <PriceTable title={"Tax"} price={calculateTotalPrice() * 0.1} />
            {/* Display fixed shipping cost */}
            <PriceTable title={"Shipping"} price={2} />
            {/* Display grand total (subtotal + tax + shipping) */}
            <PriceTable
              title={"Grand Total"}
              price={
                calculateTotalPrice() +
                calculateTotalPrice() * 0.1 +
                10
              }
            />
      <TouchableOpacity
        style={styles.btnCheckout}
        onPress={() => navigation.navigate("checkout", { total: calculateTotalPrice() })}
      >
        <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
      </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.btnClearCart}
              onPress={handleClearCart}
            >
              <Text style={styles.btnClearCartText}>CLEAR CART</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#031f11",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckoutText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  btnClearCart: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#7d7c61",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnClearCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Cart;
