// import React, { useContext } from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Animated,
//   Alert,
// } from "react-native";
// import { FONTS, COLORS, SIZES } from "../../constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AppContext from "../../context/AppContext";

// export default function BookDetailScreen({ route, navigation }) {
//   const addToCartContext = useContext(AppContext);

//   const addToCart = async (book) => {
//     try {
//       const cartList = await AsyncStorage.getItem("@cartList");
//       let res = cartList != null ? JSON.parse(cartList) : [];
//       const itemCopy = res.find((item) => item.itemId === book._id);
//       if (itemCopy) {
//         itemCopy.qty += 1;
//       } else {
//         let item = {
//           itemId: book._id,
//           name: book.title,
//           thumbnailImage: book.images,
//           color: "",
//           qty: 1,
//           salePrice: book.price,
//           checked: 1,
//         };
//         res.push(item);
//       }

//       AsyncStorage.setItem("@cartList", JSON.stringify(res));
//       addToCartContext.addItemToCart();
//       Alert.alert("Success!", "Add " + book.title + " to your cart");
//     } catch (e) {}
//   };

//   const [book, setBook] = React.useState(null);
//   const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
//   const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(
//     0
//   );

//   const indicator = new Animated.Value(0);

//   React.useEffect(() => {
//     let { book } = route.params;
//     setBook(book);
//   }, [book]);

//   function renderBookInfoSection() {
//     return (
//       <View style={{ flex: 1, flexDirection: "row" }}>
//         <ImageBackground
//           source={{ uri: book.images }}
//           resizeMode="contain"
//           style={{
//             position: "absolute",
//             top: 0,
//             right: 0,
//             bottom: 65,
//             left: 0,
//           }}
//         />

//         {/* Book Name and Author */}
//         <View
//           style={{
//             flex: 1.8,
//             top: 230,
//             right: 0,
//             bottom: 0,
//             left: 20,
//           }}
//         >
//           <Text
//             style={{
//               ...FONTS.h2,
//               color: COLORS.white,
//               justifyContent: "flex-end",
//               alignItems: "flex-end",
//             }}
//           >
//             {book.title}
//           </Text>
//           <Text
//             style={{
//               ...FONTS.body4,
//               color: COLORS.white,
//               justifyContent: "flex-end",
//               alignItems: "flex-end",
//             }}
//           >
//             {book.author}
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   function renderBookDescription() {
//     const indicatorSize =
//       scrollViewWholeHeight > scrollViewVisibleHeight
//         ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
//           scrollViewWholeHeight
//         : scrollViewVisibleHeight;

//     const difference =
//       scrollViewVisibleHeight > indicatorSize
//         ? scrollViewVisibleHeight - indicatorSize
//         : 1;

//     return (
//       <View style={{ flex: 1, flexDirection: "row", padding: SIZES.padding }}>
//         {/* Custom Scrollbar */}
//         <View
//           style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}
//         >
//           <Animated.View
//             style={{
//               width: 4,
//               height: indicatorSize,
//               backgroundColor: COLORS.lightGray4,
//               transform: [
//                 {
//                   translateY: Animated.multiply(
//                     indicator,
//                     scrollViewVisibleHeight / scrollViewWholeHeight
//                   ).interpolate({
//                     inputRange: [0, difference],
//                     outputRange: [0, difference],
//                     extrapolate: "clamp",
//                   }),
//                 },
//               ],
//             }}
//           />
//         </View>

//         {/* Description */}
//         <ScrollView
//           contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
//           showsVerticalScrollIndicator={false}
//           scrollEventThrottle={16}
//           onContentSizeChange={(width, height) => {
//             setScrollViewWholeHeight(height);
//           }}
//           onLayout={({
//             nativeEvent: {
//               layout: { x, y, width, height },
//             },
//           }) => {
//             setScrollViewVisibleHeight(height);
//           }}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: indicator } } }],
//             { useNativeDriver: false }
//           )}
//         >
//           <Text
//             style={{
//               ...FONTS.h2,
//               color: COLORS.white,
//               marginBottom: SIZES.padding,
//             }}
//           >
//             Description
//           </Text>
//           <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>
//             {book.description}
//           </Text>
//         </ScrollView>
//       </View>
//     );
//   }

//   function renderBottomButton() {
//     return (
//       <View style={{ flex: 1, flexDirection: "row" }}>
//         {/* Price */}
//         <View
//           style={{
//             width: 60,
//             backgroundColor: COLORS.secondary,
//             marginLeft: SIZES.padding,
//             marginVertical: SIZES.base,
//             borderRadius: SIZES.radius,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text style={{ color: COLORS.white }}>{book.price} $</Text>
//         </View>

//         {/* Add to cart */}
//         <TouchableOpacity
//           style={{
//             flex: 1,
//             backgroundColor: COLORS.primary,
//             marginHorizontal: SIZES.base,
//             marginVertical: SIZES.base,
//             borderRadius: SIZES.radius,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onPress={() => addToCart(book)}
//         >
//           <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add to cart</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (book) {
//     return (
//       <View style={{ flex: 1, backgroundColor: COLORS.black }}>
//         {/* Book Cover Section */}
//         <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>

//         {/* Description */}
//         <View style={{ flex: 2 }}>{renderBookDescription()}</View>

//         {/* Buttons */}
//         <View style={{ height: 70, marginBottom: 10 }}>
//           {renderBottomButton()}
//         </View>
//       </View>
//     );
//   } else {
//     return <></>;
//   }
// }

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Title, Divider } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Loading from "../load/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../context/AppContext";

export default function BookDetailScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const addToCartContext = useContext(AppContext);

  const addToCart = async () => {
    try {
      const cartList = await AsyncStorage.getItem("@cartList");
      let res = cartList != null ? JSON.parse(cartList) : [];
      const itemCopy = res.find((item) => item.itemId === book._id);
      if (itemCopy) {
        alert("Item have already added");
      } else {
        let item = {
          itemId: book._id,
          name: book.title,
          thumbnailImage: book.images,
          color: "",
          qty: qty,
          salePrice: book.price * qty,
          checked: 1,
        };
        res.push(item);
      }

      AsyncStorage.setItem("@cartList", JSON.stringify(res));
      addToCartContext.addItemToCart();
    } catch (e) {}
  };

  useEffect(() => {
    let { book } = route.params;
    // console.log(book);
    setBook(book);
    setIsLoading(false);
  }, [book]);

  const [key, setKey] = useState(0);
  function refresh() {
    setKey((preKey) => preKey + 1);
  }

  const [qty, setQty] = useState(1);

  /**tang giam so luong item */
  function quantityHandler(action, index) {
    // const newItems = cartItems[index];
    let currentQty = qty;

    if (action == "more") {
      currentQty = currentQty < book.quantity ? currentQty + 1 : currentQty;
    } else if (action == "less") {
      currentQty = currentQty > 1 ? currentQty - 1 : 1;
    }
    // cartItems[index] = newItems;
    setQty(currentQty);
    // AsyncStorage.setItem("@cartList", JSON.stringify(cartItems));
    refresh();
  }

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              height: "40%",
              alignItems: "center",
              backgroundColor: "#F7CAC9",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: book.images }}
              style={{ width: 140, height: 200 }}
            />
          </View>
          <View
            style={{
              height: "48%",
              backgroundColor: "#fff",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              {/* SECTION title */}
              <Title style={{ fontSize: 22 }}>{book.title}</Title>
              <Text style={{ fontStyle: "italic" }}>{book.author}</Text>
              {/* !SECTION title */}
              <Divider />
              {/* SECTION des */}
              <View
                style={{
                  marginTop: 8,
                  height: "60%",
                  // backgroundColor: "#aaa",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Description
                </Text>
                <ScrollView
                  style={{
                    // backgroundColor: "#cdd6e9",
                    // borderWidth: 0.05,
                    borderRadius: 1,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: 5,
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    {book.description}
                  </Text>
                </ScrollView>
              </View>
              {/* !SECTION des */}
              {/* SECTION quantity */}
              <View
                style={{ flexDirection: "row", marginTop: 13, marginLeft: 0 }}
              >
                <Text style={{ fontWeight: "bold", marginTop: 5 }}>
                  In stock:{" "}
                </Text>
                <Text style={{ marginTop: 0, fontSize: 20 }}>
                  {book.quantity}
                </Text>

                <View style={{ flexDirection: "row", marginLeft: 170 }}>
                  <TouchableOpacity
                    onPress={() => quantityHandler("less", qty)}
                    style={{ borderWidth: 1, borderColor: "#a2a7ad" }}
                  >
                    <MaterialIcons name="remove" size={22} color="#a2a7ad" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: "#a2a7ad",
                      paddingHorizontal: 7,
                      paddingTop: 3,
                      color: "#000",
                      fontSize: 13,
                    }}
                  >
                    {qty}
                  </Text>
                  <TouchableOpacity
                    onPress={() => quantityHandler("more", qty)}
                    style={{ borderWidth: 1, borderColor: "#a2a7ad" }}
                  >
                    <MaterialIcons name="add" size={22} color="#a2a7ad" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: "12%", backgroundColor: "#fff" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#00A170",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 50,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 24, color: "#fff" }}>
                  ${book.price * qty}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginLeft: 80 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FF6F61",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 50,
                    borderRadius: 10,
                  }}
                  onPress={() => addToCart()}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    Add to cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
});
