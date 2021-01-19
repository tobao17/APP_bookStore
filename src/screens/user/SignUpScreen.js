import * as React from "react";
import {
  AsyncStorage,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Modal,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../load/Loading";

export default function SignUpScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formValidate, setFormValidate] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [validatePassword, setValidatePassword] = React.useState("");

  const validateEmail = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const validateForm = () => {
    if (
      username.length > 1 &&
      email.length > 1 &&
      validateEmail(email) === true &&
      password.length > 4
    ) {
      validatePasswordMatch();
    } else {
      setFormValidate(false);
    }
  };
  const validatePasswordMatch = () => {
    setFormValidate(true ? password === validatePassword : false);
  };

  React.useEffect(() => {
    validateForm();
  });

  function signUp() {
    setIsLoading(true);
    fetch("https://utebookstore.herokuapp.com/user/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wrongLoginCount: 0,
        status: 1,
        wallet: 0,
        username: username,
        password: password,
        email: email,
        phone: phone,
        address: address,
        __v: 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        if (json != "create success") {
          alert(json);
        } else {
          Alert.alert(
            "Success!",
            "Login now",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("SignInScreen"),
              },
              {
                text: "Cancel",
                onPress: () => navigation.navigate("HomeScreen"),
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView>
            <Text style={styles.textfooter}>Username</Text>
            <View style={styles.action}>
              <Feather name="user" size={25} />
              <TextInput
                style={styles.inputs}
                placeholder="Username..."
                placeholderTextColor="#2c3e50"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <Text style={styles.textfooter}>Email</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons name="email-outline" size={25} />
              <TextInput
                keyboardType="email-address"
                style={styles.inputs}
                placeholder="Email..."
                placeholderTextColor="#2c3e50"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <Text style={styles.textfooter}>Phone</Text>
            <View style={styles.action}>
              <Feather name="phone" size={25} />
              <TextInput
                style={styles.inputs}
                placeholder="Phone..."
                placeholderTextColor="#2c3e50"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <Text style={styles.textfooter}>Address</Text>
            <View style={styles.action}>
              <Feather name="map" size={25} />
              <TextInput
                style={styles.inputs}
                placeholder="Address..."
                placeholderTextColor="#2c3e50"
                value={address}
                onChangeText={setAddress}
              />
            </View>
            <Text style={styles.textfooter}>Password</Text>
            <View style={styles.action}>
              <Feather name="lock" size={25} />
              <TextInput
                style={styles.inputs}
                placeholder="Password..."
                placeholderTextColor="#2c3e50"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <Text style={styles.textfooter}>Confirm password</Text>
            <View style={styles.action}>
              <Feather name="lock" size={25} />
              <TextInput
                style={styles.inputs}
                placeholder="Confirm password..."
                placeholderTextColor="#2c3e50"
                value={validatePassword}
                onChangeText={setValidatePassword}
                secureTextEntry
              />
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.signUp}
                onPress={() => {
                  if (formValidate) {
                    signUp();
                  } else {
                    Alert.alert("Alert", "Check information again");
                  }
                }}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  header: {
    justifyContent: "flex-end",
    flex: 1,
  },
  content: {
    flex: 3,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#f2f2f2",
  },
  textfooter: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  term: {
    marginTop: 5,
    fontSize: 15,
  },
  inputs: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
  },
  signUp: {
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: "#009900",
  },
  signUpText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 1,
  },
  radioBtn: {
    paddingLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "#3498db",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalmainText: {
    marginBottom: 10,
    fontSize: 25,
    color: "#3498db",
    fontWeight: "bold",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "bold",
  },
});
