import React, { useEffect, useState } from "react";
import AppContext from "./src/context/AppContext";
import { View, Text, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import FAIcon5 from "react-native-vector-icons/FontAwesome5";
import ADIcon from "react-native-vector-icons/AntDesign";
import IconBadge from "react-native-icon-badge";
//screen import
import BookListScreen from "./src/screens/book/BookListScreen";
import BookDetailScreen from "./src/screens/book/BookDetailScreen";
import OrderScreen from "./src/screens/cart/OrderScreen";
import ProfileScreen from "./src/screens/user/ProfileScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import CartScreen from "./src/screens/cart/CartScreen";
import SignInScreen from "./src/screens/user/SignInScreen";
import SignUpScreen from "./src/screens/user/SignUpScreen";
import BookSearchScreen from "./src/screens/book/BookSearchScreen";
import MenuScreen from "./src/screens/user/MenuScreen";
import EditProfileScreen from "./src/screens/user/EditProfileScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgotPasswordScreen from "./src/screens/user/ForgotPasswordScreen";
import NewPasswordScreen from "./src/screens/user/NewPasswordScreen";
import CheckoutScreen from "./src/screens/cart/CheckoutScreen";
import OrderDetailScreen from "./src/screens/cart/OrderDetailScreen";

console.disableYellowBox = true;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//---------------------------------------------------------

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  async function getCartData() {
    const cartValues = await AsyncStorage.getItem("@cartList");
    const res = cartValues != null ? JSON.parse(cartValues) : [];
    setCartQty(res.length);
  }

  getCartData();

  const userSignIn = () => {
    setIsLogin(true);
  };

  const signOut = () => {
    setIsLogin(false);
    AsyncStorage.clear();
  };

  const addItemToCart = () => {
    setIsAddToCart(!isAddToCart);
  };

  const loginSetting = {
    isLogin: isLogin,
    setIsLogin,
    userSignIn,
    signOut,
    isAddToCart: isAddToCart,
    addItemToCart,
  };

  return (
    <AppContext.Provider value={loginSetting}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "U T E S t o r e",
              headerRight: () => (
                <View style={styles.headerIcon}>
                  <TouchableOpacity
                    style={styles.shoppingCart}
                    onPress={() => navigation.navigate("CartScreen")}
                  >
                    <IconBadge
                      MainElement={
                        <View style={{ width: 32, height: 32 }}>
                          <FAIcon name="shopping-cart" size={27} color="#000" />
                        </View>
                      }
                      BadgeElement={
                        <Text style={{ color: "#FFFFFF" }}>{cartQty}</Text>
                      }
                      IconBadgeStyle={{
                        marginRight: 2,
                        width: 20,
                        height: 20,
                        backgroundColor: "#F11",
                      }}
                      Hidden={cartQty == 0}
                    />
                  </TouchableOpacity>
                  <>
                    {!isLogin ? (
                      <>
                        <TouchableOpacity
                          style={styles.shoppingCart}
                          onPress={() => navigation.navigate("SignInScreen")}
                        >
                          <ADIcon name="login" size={27} color="#000" />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity //logout
                          style={styles.shoppingCart}
                          onPress={signOut}
                        >
                          <ADIcon name="logout" size={27} color="#000" />
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="BookDetailScreen"
            component={BookDetailScreen}
            options={({ navigation }) => ({
              title: "Book Detail ",
              headerTitleAlign: "center",
              headerRight: () => (
                <View style={styles.headerIcon}>
                  <TouchableOpacity
                    style={styles.shoppingCart}
                    onPress={() => navigation.navigate("CartScreen")}
                  >
                    <IconBadge
                      MainElement={
                        <View style={{ width: 32, height: 32 }}>
                          <FAIcon name="shopping-cart" size={27} color="#000" />
                        </View>
                      }
                      BadgeElement={
                        <Text style={{ color: "#FFFFFF" }}>{cartQty}</Text>
                      }
                      IconBadgeStyle={{
                        marginRight: 2,
                        width: 20,
                        height: 20,
                        backgroundColor: "#F11",
                      }}
                      Hidden={cartQty == 0}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={({ navigation }) => ({
              title: "Your Cart",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={({ navigation }) => ({
              title: "Login",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={({ navigation }) => ({
              title: "Sign Up",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="OrderScreen"
            component={OrderScreen}
            options={({ navigation }) => ({
              title: "Your Order",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={({ navigation }) => ({
              title: "My Profile",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={() => ({
              title: "Reset Password",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPasswordScreen}
            options={() => ({
              title: "Change Password",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={() => ({
              title: "Checkout",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={({ navigation }) => ({
              title: "Edit Profile",
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
            options={({ navigation }) => ({
              title: "Order Detail",
              headerTitleAlign: "center",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

// Component HomeScreen------------------------------- Child navigator
function HomeScreen() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="BookList"
        tabBarOptions={{
          activeTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="BookListScreen"
          component={BookListScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={BookSearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <FAIcon5 name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="menu" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

//----------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputGender: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#1cd428",
  },
  loginText: {
    color: "white",
  },
  shoppingCart: {
    marginRight: 15,
  },
  headerIcon: {
    flexDirection: "row",
  },
});
