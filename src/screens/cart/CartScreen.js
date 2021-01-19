import React, { useEffect, useState, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "react-native-vector-icons";
import AppContext from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../load/Loading";

export default function CartScreen({ navigation }) {
	const [isLoading, setIsLoading] = useState(false);
	const addToCartContext = useContext(AppContext);
	//handle cart item
	const [key, setKey] = useState(0);
	function refresh() {
		isSelectAll();
		setKey((preKey) => preKey + 1);
		addToCartContext.addItemToCart();
	}
	const [selectAll, setSelectAll] = useState(false);
	const cartItemsIsLoading = false;
	const [cartItems, setCartItems] = useState([]);
	const [token, setToken] = useState("");
	/**
	 * get item from asyncstorage
	 */
	useEffect(() => {
		async function getCartData() {
			const cartValues = await AsyncStorage.getItem("@cartList");
			const res = cartValues != null ? JSON.parse(cartValues) : [];
			setCartItems(res);
		}

		function getUserToken() {
			const getToken = AsyncStorage.getItem("@userToken");
			const token = getToken != null ? getToken : "";
			setToken(token);
		}

		function isSelectAll() {
			let cartLength = cartItems.length;
			let count = 0;
			if (cartLength == 0) {
				setSelectAll(false);
			} else {
				cartItems.forEach((item) => {
					if (item.checked == 1) count = count + 1;
				});

				if (count == cartLength) setSelectAll(true);
				else {
					setSelectAll(false);
				}
			}
		}

		getCartData();
		getUserToken();

		isSelectAll();
	}, []);

	//function handle item
	/** tinh total bill */
	function subtotalPrice() {
		return cartItems.reduce(
			(sum, item) => sum + (item.checked == 1 ? item.salePrice : 0),
			0
		);
	}

	/**tang giam so luong item */
	// function quantityHandler(action, index) {
	//   const newItems = cartItems[index];
	//   let currentQty = newItems.qty;

	//   if (action == "more") {
	//     newItems.qty = currentQty + 1;
	//   } else if (action == "less") {
	//     newItems.qty = currentQty > 1 ? currentQty - 1 : 1;
	//   }
	//   cartItems[index] = newItems;
	//   AsyncStorage.setItem("@cartList", JSON.stringify(cartItems));
	//   refresh();
	// }

	/** chon item vao bill */
	function selectHandler(index, value) {
		const newItems = cartItems[index];
		newItems.checked = value == 1 ? 0 : 1; // set the new value

		cartItems[index] = newItems;
		AsyncStorage.setItem("@cartList", JSON.stringify(cartItems));
		refresh();
	}

	/** chon tat ca item trong cart */
	function selectHandlerAll(value) {
		const newCartItems = cartItems; // clone the array
		newCartItems.map((item, index) => {
			newCartItems[index]["checked"] = value == true ? 0 : 1; // set the new value
		});

		setSelectAll(!value);
	}

	function isSelectAll() {
		let cartLength = cartItems.length;
		let count = 0;
		if (cartLength == 0) {
			setSelectAll(false);
		} else {
			cartItems.forEach((item) => {
				if (item.checked == 1) count = count + 1;
			});

			if (count == cartLength) setSelectAll(true);
			else {
				setSelectAll(false);
			}
		}
	}

	/** xoa item trong cart */
	function deleteHandler(index) {
		Alert.alert(
			"Are you sure you want to delete this item from your cart?",
			"",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => {
						let updatedCart = cartItems; /* Clone it first */
						updatedCart.splice(index, 1);
						AsyncStorage.setItem(
							"@cartList",
							JSON.stringify(updatedCart)
						);
						refresh();
					},
				},
			],
			{ cancelable: false }
		);
	}
	// !end
	// checkout item
	function checkout() {
		if (token._W !== null) {
			let checkoutItem = [];
			for (let value of cartItems) {
				if (value.checked == 1) {
					let obj = {
						book: value.itemId,
						amount: value.qty,
					};
					checkoutItem.push(obj);
				}
			}
			if (checkoutItem.length === 0) {
				Alert.alert("Notice!", "Select at least one item");
			}
			if (checkoutItem.length > 0) {
				setIsLoading(true);
				// console.log(token._W);
				fetch("https://utebookstore.herokuapp.com/cart/addfromlg", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token._W,
					},
					body: '{"product": ' + JSON.stringify(checkoutItem) + "}",
				})
					.then((response) => response.status)
					.then((status) => {
						console.log(status);
						if (status === 200) {
							//xu li cart
							let cloneArr = [];
							cartItems.forEach((item) => {
								if (item.checked == 0) {
									cloneArr.push(item);
								}
							});

							setCartItems(cloneArr);
							AsyncStorage.setItem(
								"@cartList",
								JSON.stringify(cloneArr)
							);

							setIsLoading(false);
							refresh();

							navigation.navigate("CheckoutScreen");
						}
						if (status !== 200) {
							setIsLoading(false);
							alert("Something went wrong");
						}
					});
			}
		}
		if (token._W === null) {
			Alert.alert("Notice!", "You need to login to do that");
		}
	}
	// !end checkout item

	return (
		<>
			{isLoading ? (
				<>
					<Loading />
				</>
			) : (
				<View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
					<View
						style={{
							flexDirection: "row",
							backgroundColor: "#fff",
							marginBottom: 10,
						}}
					></View>

					{cartItemsIsLoading ? (
						<View style={[styles.centerElement, { height: 300 }]}>
							<ActivityIndicator size="large" color="#ef5739" />
						</View>
					) : (
						<ScrollView>
							{cartItems &&
								cartItems.map((item, i) => (
									<View
										key={i}
										style={{
											flexDirection: "row",
											backgroundColor: "#fff",
											marginBottom: 2,
											height: 120,
										}}
									>
										<View
											style={[styles.centerElement, { width: 60 }]}
										>
											<TouchableOpacity
												style={[
													styles.centerElement,
													{ width: 32, height: 32 },
												]}
												onPress={() =>
													selectHandler(i, item.checked)
												}
											>
												<Ionicons
													name={
														item.checked == 1
															? "ios-checkmark-circle"
															: "ios-checkmark-circle-outline"
													}
													size={25}
													color={
														item.checked == 1
															? "#0faf9a"
															: "#aaaaaa"
													}
												/>
											</TouchableOpacity>
										</View>
										<View
											style={{
												flexDirection: "row",
												flexGrow: 1,
												flexShrink: 1,
												alignSelf: "center",
											}}
										>
											<TouchableOpacity
												onPress={() => {
													/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
												}}
												style={{ paddingRight: 10 }}
											>
												<Image
													source={{ uri: item.thumbnailImage }}
													style={[
														styles.centerElement,
														{
															height: 70,
															width: 50,
															backgroundColor: "#eeeeee",
														},
													]}
												/>
											</TouchableOpacity>
											<View
												style={{
													flexGrow: 1,
													flexShrink: 1,
													alignSelf: "center",
												}}
											>
												<Text
													numberOfLines={1}
													style={{ fontSize: 15 }}
												>
													{item.name}
												</Text>

												<Text
													numberOfLines={1}
													style={{
														color: "#333333",
														marginBottom: 10,
													}}
												>
													${item.salePrice}
												</Text>
												<View style={{ flexDirection: "row" }}>
													{/* <TouchableOpacity
                        onPress={() => quantityHandler("less", i)}
                        style={{ borderWidth: 1, borderColor: "#cccccc" }}
                      >
                        <MaterialIcons
                          name="remove"
                          size={22}
                          color="#cccccc"
                        />
                      </TouchableOpacity> */}
													<Text
														style={{
															// borderTopWidth: 1,
															borderBottomWidth: 1,
															borderColor: "#cccccc",
															paddingHorizontal: 7,
															paddingTop: 3,
															color: "##000",
															fontSize: 13,
														}}
													>
														Amount: {item.qty}
													</Text>
													{/* <TouchableOpacity
                        onPress={() => quantityHandler("more", i)}
                        style={{ borderWidth: 1, borderColor: "#cccccc" }}
                      >
                        <MaterialIcons name="add" size={22} color="#cccccc" />
                      </TouchableOpacity> */}
												</View>
											</View>
										</View>
										<View
											style={[styles.centerElement, { width: 60 }]}
										>
											<TouchableOpacity
												style={[
													styles.centerElement,
													{ width: 32, height: 32 },
												]}
												onPress={() => deleteHandler(i)}
											>
												<Ionicons
													name="md-trash"
													size={25}
													color="#ee4d2d"
												/>
											</TouchableOpacity>
										</View>
									</View>
								))}
						</ScrollView>
					)}

					{!cartItemsIsLoading && (
						<View
							style={{
								backgroundColor: "#fff",
								borderTopWidth: 2,
								borderColor: "#f6f6f6",
								paddingVertical: 5,
							}}
						>
							<View style={{ flexDirection: "row" }}>
								<View style={[styles.centerElement, { width: 60 }]}>
									<TouchableOpacity
										style={[
											styles.centerElement,
											{ width: 32, height: 32 },
										]}
										onPress={() => selectHandlerAll(selectAll)}
									>
										<Ionicons
											name={
												selectAll == true
													? "ios-checkmark-circle"
													: "ios-checkmark-circle-outline"
											}
											size={25}
											color={
												selectAll == true ? "#0faf9a" : "#aaaaaa"
											}
										/>
									</TouchableOpacity>
								</View>
								<View
									style={{
										flexDirection: "row",
										flexGrow: 1,
										flexShrink: 1,
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Text>Select All</Text>
									<View
										style={{
											flexDirection: "row",
											paddingRight: 20,
											alignItems: "center",
										}}
									>
										<Text style={{ color: "#8f8f8f" }}>Total: </Text>
										<Text>${subtotalPrice()}</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
									height: 32,
									paddingRight: 20,
									alignItems: "center",
								}}
							>
								<TouchableOpacity
									style={[
										styles.centerElement,
										{
											backgroundColor: "#0faf9a",
											width: 100,
											height: 35,
											borderRadius: 5,
										},
									]}
									onPress={() => checkout()}
								>
									<Text style={{ color: "#ffffff" }}>Checkout</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	centerElement: { justifyContent: "center", alignItems: "center" },
});
