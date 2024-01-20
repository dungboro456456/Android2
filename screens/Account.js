import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../data/api";
import axios from "axios";

const ProfileCard = () => {
  const profileData = {
    firstName: "Dung",
    lastName: "Nguyen",
    mobileNo: "0866519547",
    emailId: "dungboro456456@gmail.com",
    password: "Dungboro1",
    createdOn: "2024-01-14T21:24:39",
    creditCard: {
      cardNumber: "1234567890123456",
      cardValidity: "12/25",
      cardCVV: "123",
    },
    address: {
      house: {
        addressId: 7,
        streetNo: "Đường 16a",
        buildingName: "Cà phê Nguyễn Lam",
        locality: "Quận 9",
        city: "Thành phố Hồ Chí Minh",
        state: "Việt Nam",
        pincode: "700000",
      },
    },
  };
  const navigation = useNavigation();
  const [token, setAccessToken] = useState("");

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
          console.log("Token loaded successfully:", token);
        } else {
          console.warn("Không tìm thấy accessToken trong AsyncStorage.");
        }
      } catch (error) {
        console.error("Lỗi khi load accessToken từ AsyncStorage:", error);
      }
    };

    loadAccessToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://${api[0].ip}:8080/logout/customer`,
        {
          token: token,
        }
      );

      if (response.status === 202) {
        // await AsyncStorage.removeItem("accessToken");
        // setAccessToken("");
        // const token = await AsyncStorage.getItem("accessToken");
        // if (token === null || token === undefined) {
        //   console.log(" không còn")
        // } else {
        //   console.log("còn")
        // }
        // alert("Đăng xuất thành công");
        navigation.navigate("home");
        alert("Bạn đã đăng xuất thành công")
      } else {
        // Handle logout failure
        const errorData = await response.json();
        console.error("Logout failed:", errorData);
        // You can customize the error handling based on your server response
        // For now, just showing an alert with the error message
        alert(`Đăng xuất thất bại: ${errorData.message}`);
      }
    } catch (error) {
      setAccessToken("");
      if (token == "") {
        alert(`Bạn chưa đăng nhập mà '--.- `);
      } else {
        console.error("Error during logout:", error.message);
        alert("Đã xảy ra lỗi khi đăng xuất ", error.message);
        console.log("***********************************************" + token);
      }
    }
  };

  const goToOrderScreen = () => {
    // Navigate to the "Order" screen
    navigation.navigate("Orders");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {/* Avatar */}
          {/* You can use an appropriate component or image for the avatar */}
          <Image
            source={require("../assets/logo.jpg")}
            style={styles.avatar}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin cá nhân</Text>
            <Text style={styles.profileInfo}>
              Tên: {profileData.firstName} {profileData.lastName}
            </Text>
            <Text style={styles.profileInfo}>
              Số điện thoại: {profileData.mobileNo}
            </Text>
            <Text style={styles.profileInfo}>Email: {profileData.emailId}</Text>
            <Text style={styles.profileInfo}>
              Ngày tạo: {profileData.createdOn}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Địa chỉ</Text>
            <Text style={styles.profileInfo}>
              Địa chỉ: {profileData.address.house.buildingName},{" "}
              {profileData.address.house.streetNo},{" "}
              {profileData.address.house.locality},{" "}
              {profileData.address.house.city},{" "}
              {profileData.address.house.state},{" "}
              {profileData.address.house.pincode}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Credit Card</Text>
            <Text style={styles.profileInfo}>
              Số thẻ: {profileData.creditCard.cardNumber}
            </Text>
            <Text style={styles.profileInfo}>
              Ngày hết hạn: {profileData.creditCard.cardValidity}
            </Text>
            <Text style={styles.profileInfo}>
              CVV: {profileData.creditCard.cardCVV}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Token :{token}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonorder} onPress={goToOrderScreen}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonlogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  avatar: {
    width: 210,
    height: 250,
    borderRadius: 75,
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonorder: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust the width based on your preference
  },
  buttonlogout: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust the width based on your preference
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileCard;
