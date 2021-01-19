// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MaterialCommunityIcons } from "react-native-vector-icons";
// import FAIcon from "react-native-vector-icons/FontAwesome";
// import FAIcon5 from "react-native-vector-icons/FontAwesome5";
// //screen import
// import BookListScreen from "./book/BookListScreen";
// import BookDetailScreen from "./book/BookDetailScreen";
// import OrderScreen from "./cart/OrderScreen";
// import ProfileScreen from "./user/ProfileScreen";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import CartScreen from "./cart/CartScreen";
// import SignInScreen from "./user/SignInScreen";
// import SignUpScreen from "./user/SignUpScreen";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// console.disableYellowBox = true;

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// //Component StartUp----------------------------------- Parent Navigator

// export default function Home({ navigation }) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={({ navigation }) => ({
//             title: "U T E S t o r e",
//             headerRight: () => (
//               <View style={styles.headerIcon}>
//                 {/* <TouchableOpacity
//                   style={styles.shoppingCart}
//                   onPress={() => alert("ahahhaha")}
//                 >
//                   <ADIcon name="search1" size={27} color="#000" />
//                 </TouchableOpacity> */}
//                 <TouchableOpacity
//                   style={styles.shoppingCart}
//                   onPress={() => navigation.navigate("CartScreen")}
//                 >
//                   <FAIcon name="shopping-cart" size={27} color="#000" />
//                 </TouchableOpacity>
//                 <>
//                   <TouchableOpacity
//                     style={styles.shoppingCart}
//                     onPress={() =>
//                       navigation.navigate("SignInScreen", {
//                         setUsToken,
//                       })
//                     }
//                   >
//                     <MaterialCommunityIcons
//                       name="login"
//                       size={27}
//                       color="#000"
//                     />
//                   </TouchableOpacity>
//                 </>
//               </View>
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="BookDetailScreen"
//           component={BookDetailScreen}
//           options={({ navigation }) => ({
//             title: "Book Detail ",
//             headerTitleAlign: "center",
//             headerRight: () => (
//               <View style={styles.headerIcon}>
//                 <TouchableOpacity
//                   style={styles.shoppingCart}
//                   onPress={() => navigation.navigate("CartScreen")}
//                 >
//                   <FAIcon name="shopping-cart" size={27} color="#000" />
//                 </TouchableOpacity>
//               </View>
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="CartScreen"
//           component={CartScreen}
//           options={({ navigation }) => ({
//             title: "Your Cart",
//             headerTitleAlign: "center",
//           })}
//         />
//         <Stack.Screen name="SignInScreen" component={SignInScreen} />
//         <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
//         <Stack.Screen name="OrderScreen" component={OrderScreen} />
//         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // Component HomeScreen------------------------------- Child navigator
// function HomeScreen() {
//   return (
//     <>
//       <Tab.Navigator
//         initialRouteName="BookList"
//         tabBarOptions={{
//           activeTintColor: "#e91e63",
//         }}
//       >
//         <Tab.Screen
//           name="BookListScreen"
//           component={BookListScreen}
//           options={{
//             tabBarLabel: "Home",
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="OrderScreen"
//           component={OrderScreen}
//           options={{
//             tabBarLabel: "Orders",
//             tabBarIcon: ({ color, size }) => (
//               <FAIcon5 name="shipping-fast" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarLabel: "Info",
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="account"
//                 color={color}
//                 size={size}
//               />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }

// //----------------------------------------------------

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#DCDCDC",
//   },
//   inputContainer: {
//     borderBottomColor: "#F5FCFF",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 30,
//     borderBottomWidth: 1,
//     width: 250,
//     height: 45,
//     marginBottom: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   inputGender: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   inputs: {
//     height: 45,
//     marginLeft: 16,
//     borderBottomColor: "#FFFFFF",
//     flex: 1,
//   },
//   inputIcon: {
//     width: 30,
//     height: 30,
//     marginLeft: 15,
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     height: 45,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//   },
//   loginButton: {
//     backgroundColor: "#1cd428",
//   },
//   loginText: {
//     color: "white",
//   },
//   shoppingCart: {
//     marginRight: 15,
//   },
//   headerIcon: {
//     flexDirection: "row",
//   },
// });
