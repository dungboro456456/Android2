import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";
const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("home")}
      >
        <AntDesign
          style={[styles.icon, route.name === "home" && styles.active]}
          name="home"
        />
        <Text style={[styles.iconText, route.name === "home" && styles.active]}>
          HOME
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("notifications")}
      >
        <AntDesign
          style={[styles.icon, route.name === "notifications" && styles.active]}
          name="bells"
        />
        <Text
          style={[
            styles.iconText,
            route.name === "notifications" && styles.active,
          ]}
        >
          NOTIFICATIONS
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("cart")}
      >
        <AntDesign
          style={[styles.icon, route.name === "cart" && styles.active]}
          name="shoppingcart"
        />
        <Text style={[styles.iconText, route.name === "cart" && styles.active]}>
          CART
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => {
          navigation.navigate("login");
        }}
        accessibilityRole="button"
      >
        <AntDesign style={styles.icon} name="login" />
        <Text
          style={styles.iconText}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("account")}
      >
        <AntDesign
          style={[styles.icon, route.name === "account" && styles.active]}
          name="user"
        />
        <Text
          style={[styles.iconText, route.name === "account" && styles.active]}
        >
          ACCOUNT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 9, // Giảm khoảng trắng giữa các icon
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 30,
    color: "#000000",
  },
  iconText: {
    color: "#000000",
    fontSize: 10,
    textTransform: 'uppercase',
  },
  active: {
    color: "blue",
  },
});

export default Footer;
