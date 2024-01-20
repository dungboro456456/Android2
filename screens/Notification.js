import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { api } from '../data/api'; // Thay đổi đường dẫn tới file chứa biến 'api'
import Notificationitem from './Notificationitem';

const Notification = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://${api[0].ip}:8080/orders`);
        const data = await response.json();
        setOrders(data);
        console.log("data nè"+data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);



  return (
    <ScrollView  >
      <View  style={{marginTop:'15px'}}>
        {orders.map((order) => (
          // Truyền message dựa trên orderStatus
          <Notificationitem
            key={order.orderId}
            order={order}
            message={
              order.orderStatus === 'PENDING'
                ? 'Đặt hàng thành công!'
                : order.orderStatus === 'SUCCESS'
                ? 'Nhận hàng thành công!'
                : 'Trạng thái đơn hàng không xác định!'
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Notification;
