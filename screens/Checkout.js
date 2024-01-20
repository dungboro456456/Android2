import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout/Layout";
import {api} from '../data/api';
import { useNavigation } from "@react-navigation/native";

const Checkout = ({ route }) => {
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  const { total } = route.params;
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("accessToken");
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.warn("Không tìm thấy accessToken trong AsyncStorage.");
        }
      } catch (error) {
        console.error("Lỗi khi load accessToken từ AsyncStorage:", error);
      }
    };

    loadToken();
  }, []);

  const handleCOD = async () => {
    try {
      const response = await axios.post(
        `http://${api[0].ip}:8080/order/place`,
        {
          cardNumber: {
            cardNumber: "1234567890123456",
            cardValidity: "12/25",
            cardCVV: "6",
          },
          addressType: "house", // Add other necessary data based on your API requirements
        },
        {
          headers: {
            token: token, // Use the retrieved token in the request headers
          },
        }
      );

      alert("Đặt hàng thành công.");
      navigation.navigate('home');
      console.log("API Response:", response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        console.error("Error placing the order:", error);
      }
    }
  };



  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Payment options</Text>
        <Text style={styles.price}>Total Amount: ${total}</Text>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentHeading}>Select your Payment Mode</Text>
          <TouchableOpacity style={styles.paymentBtn} onPress={handleCOD}>
            <Text style={styles.paymentBtnText}>Cash On Delivery</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 20,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "gray",
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
  },
  paymentHeading: {
    color: "gray",
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  paymentBtnText: {
    color: "white",
    textAlign: "center",
  },
});

export default Checkout;
