import React, { useEffect, useState } from "react";
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { List } from "react-native-paper";
import jwt_decode from "jwt-decode";
import Loading from "../load/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserOrderAsync } from "../../services/UserService";
import { ScrollView } from "react-native-gesture-handler";

export default function OrderScreen({ navigation }) {
	const [isLoading, setIsLoading] = useState(true);
	const [myOrder, setMyOrder] = useState([]);

	useEffect(() => {
		async function _getUserOrder() {
			await AsyncStorage.getItem("@userToken").then((res) => {
				UserOrderAsync(res).then((userOrder) => {
					// console.log(userOrder);
					setMyOrder(userOrder.data);
				});
				setIsLoading(false);
			});
		}
		_getUserOrder();
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				<FlatList
					showsVerticalScrollIndicator={false}
					// tyle={styles.list}
					// horizontal={true}
					// contentContainerStyle={styles.listContainer}
					numColumns={1}
					data={myOrder}
					renderItem={({ item }) => (
						<Order item={item} navigation={navigation} />
					)}
				/>
			</ScrollView>
		</View>
	);
}

function Order({ item, navigation }) {
	function getStatus() {
		let res = item.status;
		switch (res) {
			case 0:
				return <Text>Waiting for confirm</Text>;
			case 1:
				return <Text>Shipping</Text>;
			case 2:
				return <Text>Success</Text>;
			case 3:
				return <Text>Cancel</Text>;
			default:
				return <Text>Pending</Text>;
		}
	}

	function getIcon() {
		let res = item.status;
		switch (res) {
			case 0:
				return <List.Icon icon="new-box" />;
			case 1:
				return <List.Icon icon="truck-check" />;
			case 2:
				return <List.Icon icon="check-circle" />;
			case 3:
				return <List.Icon icon="cancel" />;
			default:
				return <List.Icon icon="pause-circle" />;
		}
	}

	function getOrderCode(itemId) {
		return itemId.slice(17, 23);
	}

	return (
		<>
			<List.Item
				title={<Text>Code: {getOrderCode(item._id)}</Text>}
				description={getStatus}
				onPress={() =>
					navigation.navigate("OrderDetailScreen", {
						order: item,
					})
				}
				right={getIcon}
				// right={() => <List.Icon icon="delete" color="#f11" />}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
	image: {
		justifyContent: "center",
		alignItems: "center",
		height: 200,
		width: 200,
		marginBottom: 20,
	},
	footerButton: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 90,
	},
	list: {
		paddingHorizontal: 1,
		backgroundColor: "#E6E6E6",
	},
	listContainer: {
		alignItems: "center",
	},
});
