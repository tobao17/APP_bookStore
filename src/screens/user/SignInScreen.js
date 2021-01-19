import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../context/AppContext";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";

import Loading from "../load/Loading";

import * as Google from "expo-google-app-auth";

export default function SignInScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const signInContext = useContext(AppContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  function signIn() {
    setIsLoading(true);
    fetch("https://utebookstore.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg != null) {
          setIsLoading(false);
          alert(json.msg);
        } else {
          AsyncStorage.setItem("@username", json.username);
          AsyncStorage.setItem("@userToken", json.accessToken);
          signInContext.userSignIn();
          setIsLoading(false);
          navigation.navigate("HomeScreen");
        }

        return json;
      });
  }

  //google
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "46698234435-2cjnkk9oqnvslr8dshm71jcvahlogqia.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async function signInWithGoogle() {
    setIsLoading(true);
    let res = await signInWithGoogleAsync();
    fetch("https://utebookstore.herokuapp.com/user/signingg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: res.idToken,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msd != null) {
          alert(json.msd);
        } else {
          AsyncStorage.setItem("@username", json.username);
          AsyncStorage.setItem("@userToken", json.accessToken);
          signInContext.userSignIn();
          setIsLoading(false);
          navigation.navigate("HomeScreen");
        }

        return json;
      });
  }

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.textfooter}>Username</Text>
          <View style={styles.action}>
            <FAIcon name="user" size={25} />
            <TextInput
              style={styles.inputs}
              placeholder="Username..."
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <Text style={[styles.textfooter, { marginTop: 20 }]}>Password</Text>
          <View style={styles.action}>
            <FAIcon name="lock" size={25} />
            <TextInput
              style={styles.inputs}
              placeholder="Password..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={() => signIn()}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: "center", marginBottom: 20 }}
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text style={{ color: "#1a75ff", fontSize: 16 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View style={styles.socialBtn}>
            {/* <FacebookSocialButton /> */}
            <GoogleSocialButton onPress={() => signInWithGoogle()} />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontSize: 15 }}
              onPress={() => {
                navigation.navigate("SignUpScreen");
              }}
            >
              Create new account?
              <Text style={{ color: "#1a75ff" }}> Sign up</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 30,
    marginRight: 20,
  },
  header: {
    flex: 5,
    justifyContent: "center",
  },
  footer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f2f2f2",
  },
  inputs: {
    flex: 1,
    paddingLeft: 10,
  },
  textfooter: {
    fontSize: 18,
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
  },
  button: {
    alignItems: "center",
    marginTop: 35,
    marginBottom: 10,
  },
  signIn: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#1a75ff",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "bold",
  },
  socialBtn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
