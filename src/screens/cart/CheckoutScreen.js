import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Headline, Button, Divider } from "react-native-paper";
import jwt_decode from "jwt-decode";
import { UserInfoAsync } from "../../services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import io from "socket.io-client/dist/socket.io";

import Loading from "../load/Loading";

const ENDPOINT = "https://apirealtimeute.herokuapp.com";
let socket;

export default function CheckoutScreen({ navigation }) {
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState({});
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [note, setNote] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const [token, setToken] = useState("");
	const shipFee = 20;

	useEffect(() => {
		socket = io(ENDPOINT);
		async function _getUserProfile() {
			await AsyncStorage.getItem("@userToken").then((res) => {
				let tokenDecode = jwt_decode(res);
				let user = tokenDecode.user;
				if (user.id != null) {
					UserInfoAsync(user.id).then((userInfo) => {
						setProfile(userInfo);
						let cartLists = [];
						cartLists = userInfo.cart;
						let total = cartLists.reduce(
							(sum, item) => sum + item.book.price * item.amount,
							0
						);
						setTotalPrice(total);
						setAddress(userInfo.address);
						setPhone(userInfo.phone);
						setNote(userInfo.note);
					});
				}
			});
		}

		function _getUserToken() {
			const getToken = AsyncStorage.getItem("@userToken");
			const token = getToken != null ? getToken : "";
			setToken(token);
		}

		_getUserProfile();
		_getUserToken();
	}, []);

	async function checkoutOrder() {
		setIsLoading(true);
		let productList = [];
		profile.cart.forEach((element) => {
			let value = {
				book: element.book._id,
				quantity: element.amount,
				totalPrice: element.amount * element.book.price,
			};
			productList.push(value);
		});
		let checkoutObj = {
			products: productList,
			user: profile._id,
			address: address,
			phone: phone,
			note: note,
			totalPrice: totalPrice + shipFee,
		};

		console.log(JSON.stringify(checkoutObj));
		if (token._W == null) {
			Alert.alert("Notice!", "Something went wrong");
		} else {
			await fetch("https://utebookstore.herokuapp.com/order/add", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-access-token": token._W,
				},
				body: JSON.stringify({
					products: productList,
					user: profile._id,
					address: address,
					phone: phone,
					note: note,
					totalPrice: totalPrice + shipFee,
				}),
			})
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					if (json.msg === "add order success!") {
						socket.emit("usersendOrder:", {
							username: profile.username,
							id: json.data._id,
						});
						setIsLoading(false);
						Alert.alert(
							"Success",
							"Your order have been created",
							[
								{
									text: "OK",
									onPress: () => navigation.navigate("HomeScreen"),
								},
							],
							{ cancelable: false }
						);
					} else {
						setIsLoading(false);
						alert("Something went wrong");
					}
				});
		}
	}
	return (
		<>
			{isLoading ? (
				<>
					<Loading />
				</>
			) : (
				<View style={styles.container}>
					<View style={styles.inputText}>
						<TextInput
							mode="outlined"
							left={<TextInput.Icon name="phone" />}
							label="Phone"
							value={phone}
							onChangeText={(text) => setPhone(text)}
						/>
						<TextInput
							mode="outlined"
							left={<TextInput.Icon name="map" />}
							label="Address"
							value={address}
							onChangeText={(text) => setAddress(text)}
						/>
						<TextInput
							mode="outlined"
							left={<TextInput.Icon name="note" />}
							label="Note"
							value={note}
							onChangeText={(text) => setNote(text)}
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
							data={profile.cart}
							renderItem={({ item, index }) => (
								<Item
									item={item}
									index={profile.cart.indexOf(item) + 1}
								/>
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
						<Button
							mode="contained"
							color="#05B411"
							onPress={() => checkoutOrder()}
						>
							Submit
						</Button>
					</View>
				</View>
			)}
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
					style={{
						width: "40%",
						height: 40,
						fontSize: 15,
						fontWeight: "bold",
					}}
				>
					{index}. {item.book.title}
				</Text>
				<Text style={{ width: "20%", height: 40, marginLeft: 20 }}>
					x{item.amount}
				</Text>

				<Text style={{ width: "40%", height: 40, marginLeft: 0 }}>
					{item.amount * item.book.price} $
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
