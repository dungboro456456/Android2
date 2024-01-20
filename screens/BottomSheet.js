// BottomSheet.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import OrderItem from './OrderItem';
import { Box } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


const windowHeight = Dimensions.get('window').height;

const BottomSheet = ({ isVisible, onClose, paymentresponse }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      style={styles.modal}
    >
      <View style={styles.content}>
      <Icon name="check-circle" size={300} color="#4F8EF7" />
      <Text >Cảm ơn bạn đã nhận hàng và thanh toán thành công</Text>
        
        {/* <Text>This is the bottom sheet content</Text> */}
        {/* <Box
          bg="gray.100"
          p={4}
          mb={4}
          borderRadius={8}
          borderWidth={1.5}
          borderColor="gray.300"
        >
          <Text fontSize="xl" fontWeight="bold">
            Shipping Address
          </Text>
          <Text>{`Họ tên: ${paymentresponse.address.buildingName}`}</Text>
          <Text>{`Đường: ${paymentresponse.address.streetNo}`}</Text>
          <Text>{`Tên nhà: ${paymentresponse.address.buildingName}`}</Text>
          <Text>{`Quận: ${paymentresponse.address.locality}`}</Text>
          <Text>{`Thành phố: ${paymentresponse.address.city}`}</Text>
          <Text>{`Nước: ${paymentresponse.address.state}`}</Text>
          <Text>{`Post code: ${paymentresponse.address.pincode}`}</Text>
        </Box>

        <Box
          bg="gray.100"
          p={4}
          mb={4}
          borderRadius={8}
          borderWidth={1.5}
          borderColor="gray.300"
        >
          <Text fontSize="xl" fontWeight="bold">
            Order Details
          </Text>
          <Text>{`Order ID: ${paymentresponse.orderId}`}</Text>
          <Text>{`Date: ${paymentresponse.date}`}</Text>
          <Text>{`Status: ${paymentresponse.orderStatus}`}</Text>
          <Text>{`Total Amount: ${paymentresponse.total}`}</Text>
        </Box> */}

<TouchableOpacity onPress={onClose}>
      <Icon style={styles.close} name="close" size={300} color="#4F8EF7" />

        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    height: (2 / 3) * windowHeight - 100,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 380,
  },
  close: {
    position: 'absolute',
    top: 50,
    right: -190,
    top:-400,
    fontSize: 20,
    color: 'red',
  },
});

export default BottomSheet;
