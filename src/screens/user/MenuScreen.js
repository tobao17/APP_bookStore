import React, { useState, useContext } from "react";
import { Alert } from "react-native";

import { List, Divider } from "react-native-paper";
import AppContext from "../../context/AppContext";

export default function MenuScreen({ navigation }) {
  const checkIsLogin = useContext(AppContext);

  function screenNavigate(condition, screenName) {
    if (condition) {
      navigation.navigate(screenName);
    } else {
      Alert.alert("Notice!", "You need to login to see that");
    }
  }
  return (
    <>
      <List.Item
        title="Your Profile"
        description="Setting your information"
        left={(props) => <List.Icon {...props} icon="account" />}
        onPress={() => {
          screenNavigate(checkIsLogin.isLogin, "ProfileScreen");
        }}
      />
      <Divider />
      <List.Item
        title="Your Order"
        description="Follow your order"
        left={(props) => <List.Icon {...props} icon="truck" />}
        onPress={() => {
          screenNavigate(checkIsLogin.isLogin, "OrderScreen");
        }}
      />
      <Divider />
      <List.Item
        title="Your Checkout"
        description="Checkout your item"
        left={(props) => <List.Icon {...props} icon="cash" />}
        onPress={() => {
          screenNavigate(checkIsLogin.isLogin, "CheckoutScreen");
        }}
      />
    </>
  );
}
