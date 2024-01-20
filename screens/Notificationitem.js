import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notificationitem = ({ order, message }) => {
  const orderStatusText =
    order.orderStatus === 'PENDING'
      ? 'đã đặt thành công!'
      : order.orderStatus === 'SUCCESS'
      ? 'đã nhận thành công!'
      : 'trạng thái không xác định';

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.orderId}>Mã đơn hàng: {order.orderId}</Text>
      <Text style={styles.date}>Ngày đặt hàng: {order.date}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Notificationitem;
