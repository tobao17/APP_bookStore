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

import * as ImagePicker from "expo-image-picker";

import Loading from "../load/Loading";

export default function EditProfileScreen({ navigation }) {
  const [imageObj, setImageObj] = useState({});
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState("");

  //edit
  const [id, setId] = useState("");
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  useEffect(() => {
    async function _getUserProfile() {
      await AsyncStorage.getItem("@userToken").then((res) => {
        setToken(res);
        let tokenDecode = jwt_decode(res);
        let user = tokenDecode.user;
        if (user.id != null) {
          setId(user.id);
          UserInfoAsync(user.id).then((userInfo) => {
            setProfile(userInfo);
            setImage(userInfo.avatar);
            setEditName(userInfo.username);
            setEditPhone(userInfo.phone);
            setEditAddress(userInfo.address);
          });
        }

        setIsLoading(false);
      });
    }
    _getUserProfile();
  }, []);

  // ---------
  async function takeAndUploadPhotoAsync() {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (result.cancelled) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    setImage(localUri);
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    setImageObj({ uri: localUri, name: filename, type });
  }

  //---- edit user -----
  const editUserInfor = async () => {
    setIsLoading(true);
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    // formData.append("id", id);
    formData.append("username", editName);
    formData.append("phone", editPhone);
    formData.append("address", editAddress);
    formData.append("images", imageObj);

    // console.log(formData);

    const response = await fetch(
      "https://utebookstore.herokuapp.com/user/edituser",
      {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": token,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json === "update success") {
          setIsLoading(false);
          navigation.navigate("HomeScreen");
        } else {
          setIsLoading(false);
          alert("Something wrong");
        }
      })
      .catch((err) => console.log(err));
    // .then((res) => res.status)
    // .then((status) => {
    //   if (status === 201) {
    //     setIsLoading(false);
    //     navigation.navigate("ProfileScreen");
    //   } else {
    //     setIsLoading(false);
    //     console.log(status);
    //     alert("Something Wrong");
    //   }
    // });

    return response;
  };
  // ------

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.inputText}>
            <TextInput
              mode="outlined"
              left={<TextInput.Icon name="account" />}
              label="Name"
              value={editName}
              onChangeText={(text) => setEditName(text)}
            />
            <TextInput
              mode="outlined"
              left={<TextInput.Icon name="phone" />}
              label="Phone"
              value={editPhone}
              onChangeText={(text) => setEditPhone(text)}
            />
            <TextInput
              mode="outlined"
              left={<TextInput.Icon name="map" />}
              label="Address"
              value={editAddress}
              onChangeText={(text) => setEditAddress(text)}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              marginLeft: 20,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 150,
                height: 35,
                marginTop: 10,
                borderRadius: 2,
                backgroundColor: "#00A170",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => takeAndUploadPhotoAsync()}
            >
              <Text style={{ fontWeight: "100", color: "#ffd" }}>
                CHOOSE YOUR AVATAR
              </Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 5,
                  borderRadius: 2,
                }}
              />
            )}
          </View>

          <View style={styles.footerBtn}>
            <TouchableOpacity
              style={styles.editBtn1}
              onPress={() => editUserInfor()}
            >
              <Text style={styles.footerText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
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
