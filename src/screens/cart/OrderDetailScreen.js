import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Headline, Button, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function OrderDetailScreen({ route, navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState("");
  const shipFee = 20;
  const [order, setOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [products, setProducts] = useState("");

  useEffect(() => {
    function _getUserToken() {
      const getToken = AsyncStorage.getItem("@userToken");
      const token = getToken != null ? getToken : "";
      setToken(token);
    }
    _getUserToken();
  }, []);

  useEffect(() => {
    let { order } = route.params;
    // console.log(order);
    setOrder(order);
    // setProducts(order.products);

    let cartLists = [];
    cartLists = order.products;
    let total = cartLists.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);

    setIsLoading(false);
  }, [order]);

  function orderCancel() {
    navigation.navigate("HomeScreen");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputText}>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon name="phone" />}
            label="Phone"
            value={order.phone}
            disabled={true}
          />
          <TextInput
            mode="outlined"
            left={<TextInput.Icon name="map" />}
            label="Address"
            value={order.address}
            disabled={true}
          />
          <TextInput
            mode="outlined"
            left={<TextInput.Icon name="note" />}
            label="Note"
            value={order.note}
            disabled={true}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text
            style={{ width: "40%", fontSize: 15, fontWeight: "bold" }}
          ></Text>
          <Text
            style={{
              width: "20%",
              height: 40,
              marginLeft: 20,
              fontWeight: "bold",
            }}
          >
            Số lượng
          </Text>

          <Text
            style={{
              width: "40%",
              height: 40,
              marginLeft: 0,
              fontWeight: "bold",
            }}
          >
            Thành tiền
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <FlatList
            horizontal={false}
            numColumns={1}
            data={order.products}
            renderItem={({ item, index }) => (
              <Item item={item} index={order.products.indexOf(item) + 1} />
            )}
          />
        </ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 40,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              width: "40%",
              height: 20,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Tổng đơn hàng
          </Text>
          <Text
            style={{
              width: "20%",
              height: 20,
              marginLeft: 20,
            }}
          >
            {" "}
            + {shipFee} $
          </Text>

          <View style={styles.pricebool}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#ffd",
              }}
            >
              {totalPrice + shipFee} $
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button mode="contained" color="#F11" onPress={() => orderCancel()}>
            CANCEL
          </Button>
        </View>
      </View>
    </>
  );
}

function Item({ item, index }) {
  return (
    <View
      style={{
        flexDirection: "column",
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{ width: "40%", height: 40, fontSize: 15, fontWeight: "bold" }}
        >
          {index}. {item.book.title}
        </Text>
        <Text style={{ width: "20%", height: 40, marginLeft: 20 }}>
          x{item.quantity}
        </Text>

        <Text style={{ width: "40%", height: 40, marginLeft: 0 }}>
          {item.totalPrice} $
        </Text>
      </View>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    marginLeft: 20,
    justifyContent: "center",
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  cartItem: {
    flexDirection: "row",
  },
  scrollItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 5,
    width: "65%",
  },
  pricebool: {
    backgroundColor: "#131",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    width: "20%",
    height: 20,
  },
});
