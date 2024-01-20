// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm dòng này
import {api} from '../data/api';


const Login = () => {
  const [mobileId, setMobileId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${api[0].ip}:8080/login/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileId: mobileId,
          password: password,
        }),
      });

      if (response.status === 202) {
        // Lưu token vào AsyncStorage
        const responseData = await response.json();
        await AsyncStorage.setItem('accessToken', responseData.token);
        console.log("*************************************************************************************************** :"+responseData.token)
        console.log(`http://${api[0].ip}:8080/login/customer`);
        alert('Đăng nhập thành công!');
        navigation.navigate('home');
      } else {
        const responseData = await response.json();
        alert(`Đăng nhập thất bại: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện yêu cầu đăng nhập:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('register');
  };

  const handleForgotPassword = () => {
    // Xử lý sự kiện khi người dùng click vào nút "Forgot Password?"
    // Ví dụ: navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TOM</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="mobileId..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setMobileId(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3036', // Background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'red', // Logo color
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#041e45', // Input background color
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#fff', // Input text color
  },
  forgot: {
    color: '#fff', // Forgot password text color
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'red', // Login button color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff', // Login button text color
  },
  signupText: {
    color: '#2ecc71', // Signup text color
    marginTop: 20,
  },
});


export default Login;
