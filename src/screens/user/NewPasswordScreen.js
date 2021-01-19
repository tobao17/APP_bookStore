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

export default function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  function changePassword() {
    if (password !== confirmPassword || password.length < 8) {
      Alert.alert("Notice", "Check your password again");
    }
    if (password === confirmPassword && password.length >= 8) {
      Alert.alert(password);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Headline>Enter your new password</Headline>
        </View>
        <View style={styles.inputText}>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon name="lock" />}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.inputText}>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon name="lock" />}
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.footer}>
          <Button
            mode="contained"
            color="#05B417"
            onPress={() => changePassword()}
          >
            Change
          </Button>
        </View>
      </View>
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
