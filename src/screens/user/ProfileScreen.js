import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  TextInput,
} from "react-native-paper";
import jwt_decode from "jwt-decode";
import { UserInfoAsync } from "../../services/UserService";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loading from "../load/Loading";

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function _getUserProfile() {
      await AsyncStorage.getItem("@userToken").then((res) => {
        // console.log(res);
        let tokenDecode = jwt_decode(res);
        let user = tokenDecode.user;
        if (user.id != null) {
          UserInfoAsync(user.id).then((userInfo) => {
            setProfile(userInfo);
          });
          setIsLoading(false);
        }
      });
    }
    _getUserProfile();
  }, []);

  function getAvt() {
    return profile.avatar !== null ? (
      <Avatar.Image source={{ uri: profile.avatar }} size={80} />
    ) : (
      <Avatar.Image source={require("../../assets/avt.png")} size={80} />
    );
  }

  function ViewProfile() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            {getAvt()}
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {profile.username}
              </Title>
              <Caption style={styles.caption}>@{profile.username}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {profile.address}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {profile.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {profile.email}
            </Text>
          </View>
        </View>

        <View style={styles.footerBtn}>
          <TouchableOpacity
            style={styles.editBtn2}
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <Text style={styles.footerText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  // ------

  return <>{isLoading ? <Loading /> : <ViewProfile />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  footerBtn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 35,
    marginTop: 20,
    marginRight: 20,
  },
  footerText: {
    fontWeight: "bold",
    color: "#fff",
  },
  editBtn1: {
    width: "30%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#0072B5",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn2: {
    width: "30%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#00A170",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  containerx: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
