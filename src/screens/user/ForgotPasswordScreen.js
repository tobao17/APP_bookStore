import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { TextInput, Headline, Button } from "react-native-paper";
import { ForgotPasswordAsync } from "../../services/UserService";
import Loading from "../load/Loading";

export default function ForgotPasswordScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  async function sendMail() {
    setIsLoading(true);
    await ForgotPasswordAsync(email).then((res) => {
      setIsLoading(false);
      if (res == 200) {
        Alert.alert(
          "Notice!",
          "Check your email to reset password",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomeScreen"),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Notice!",
          "invalid email",
          [
            {
              text: "OK",
            },
          ],
          { cancelable: false }
        );
      }
    });
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Headline>Forgot your password?</Headline>
            <Text>Enter your email to reset password</Text>
          </View>
          <View style={styles.inputText}>
            <TextInput
              mode="outlined"
              left={<TextInput.Icon name="email" />}
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.footer}>
            <Button mode="contained" color="#05B417" onPress={() => sendMail()}>
              Send
            </Button>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputText: {
    marginTop: 20,
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
    marginTop: 20,
  },
});
