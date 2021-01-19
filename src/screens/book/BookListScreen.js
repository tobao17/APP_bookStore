import * as React from "react";
import {
	View,
	FlatList,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
//API
import { GetBookAsync, BooksByCateAsync } from "../../services/BookService";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../load/Loading";
import io from "socket.io-client/dist/socket.io";

const ENDPOINT = "https://apirealtimeute.herokuapp.com";

let socket;
// CONSTANTS

export default function BookListScreen({ navigation }) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [title, setTitle] = React.useState("Tiểu sử-hồi ký");
	const [valueId, setValueId] = React.useState("5f789d427c17be338c676ef8");
	const [books, setBooks] = React.useState([]);
	//

	const [realtime, setreatime] = React.useState([""]);

	const [newBooks, setNewBooks] = React.useState([]);

	React.useEffect(() => {
		socket = io(ENDPOINT);
		socket.on("server send", (data) => {
			console.log(data);
			setreatime(data);
		});
		const getBookLists = async () => {
			GetBookAsync().then((res) => {
				setNewBooks(res.newBook);
				setIsLoading(false);
			});
		};

		getBookLists();
	}, [realtime, newBooks]);

	React.useEffect(() => {
		const _getBook = async () => {
			await BooksByCateAsync(valueId).then((res) => {
				res.data !== null ? setBooks(res.data) : setBooks([]);
				// setIsLoading(false);
			});
		};

		_getBook();
	}, [realtime, books]);

	return (
		<>
			{isLoading ? (
				<>
					<Loading />
				</>
			) : (
				<ScrollView
					style={{ flexDirection: "column" }}
					showsVerticalScrollIndicator={false}
				>
					{/* new */}
					<View
						style={{
							flexDirection: "row",
							width: "100%",
							alignItems: "center",
							marginLeft: 15,
							marginTop: 10,
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								fontWeight: "bold",
								fontSize: 18,
								color: "#4f4a4a",
							}}
						>
							New Book
						</Text>
						<View
							style={{
								width: 5,
								height: 5,
								borderRadius: 5,
								marginHorizontal: 5,
								backgroundColor: "#f11",
							}}
						></View>
					</View>
					<FlatList
						showsHorizontalScrollIndicator={false}
						tyle={styles.list}
						contentContainerStyle={styles.listContainer}
						horizontal={true}
						numColumns={1}
						data={newBooks}
						renderItem={({ item }) => (
							<Book item={item} navigation={navigation} />
						)}
					/>
					{/* tieu su */}
					<View
						style={{
							flexDirection: "row",
							width: "100%",
							alignItems: "center",
							marginLeft: 15,
							marginTop: 10,
						}}
					>
						<View style={{ width: "30%", flexDirection: "row" }}>
							<Text
								style={{
									fontFamily: "Bold",
									fontWeight: "bold",
									fontSize: 18,
									color: "#4f4a4a",
								}}
							>
								{title}
							</Text>
						</View>
						<View style={{ width: "20%" }}>
							<DropDownPicker
								items={[
									{
										value: "5f789d047c17be338c676ef5",
										label: "Văn học",
									},
									{
										value: "5f789d147c17be338c676ef6",
										label: "Sách thiếu nhi",
									},
									{
										value: "5f789d1d7c17be338c676ef7",
										label: "Kinh tế",
									},
									{
										value: "5f789d427c17be338c676ef8",
										label: "Tiểu sử-hồi ký",
									},
									{
										value: "5f789d757c17be338c676ef9",
										label: "Tâm lý",
									},
									// {
									//   value: "5f789d7d7c17be338c676efa",
									//   label: "Ngoại ngữ",
									// },
								]}
								defaultValue={valueId}
								containerStyle={{
									marginLeft: 100,
									height: 30,
									width: 120,
								}}
								style={{ backgroundColor: "#fafafa" }}
								itemStyle={{ justifyContent: "flex-start" }}
								dropDownStyle={{ backgroundColor: "#fafafa" }}
								onChangeItem={(item) => {
									setValueId(item.value);
									setTitle(item.label);
								}}
							/>
						</View>
					</View>
					<FlatList
						showsHorizontalScrollIndicator={false}
						tyle={styles.list}
						contentContainerStyle={styles.listContainer}
						horizontal={true}
						numColumns={1}
						data={books}
						renderItem={({ item }) => (
							<Book item={item} navigation={navigation} />
						)}
					/>
				</ScrollView>
			)}
		</>
	);
}

function Book({ item, navigation }) {
	return (
		<>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("BookDetailScreen", {
						book: item,
					});
				}}
				style={{
					marginTop: 15,
					backgroundColor: "#FFF",
					height: 260,
					width: 175,
					elevation: 2,
					borderRadius: 8,
					padding: 15,
					marginRight: 8,
					marginLeft: 2,
					marginBottom: 5,
				}}
			>
				<Image
					source={{ uri: item.images }}
					style={{
						marginLeft: 12,
						width: 120,
						height: 170,
						borderRadius: 8,
					}}
				/>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 10,
					}}
				>
					<Text
						style={{
							fontFamily: "Bold",
							fontWeight: "bold",
							color: "#4f4a4a",
							fontSize: 12,
						}}
					>
						{item.title}
					</Text>
				</View>
				<Text
					style={{
						fontSize: 9,
						color: "#4f4a4a",
						fontFamily: "Regular",
					}}
				>
					{item.author}
				</Text>

				<View
					style={{
						flexDirection: "row",
						marginTop: 5,
						alignItems: "center",
						width: "100%",
					}}
				>
					<View
						style={{
							width: "80%",
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "bold",
							}}
						>
							{item.price} $
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	list: {
		paddingHorizontal: 1,
		backgroundColor: "#E6E6E6",
	},
	listContainer: {
		alignItems: "center",
	},
	/******** card **************/
	card: {
		shadowColor: "#00000021",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.3,
		shadowRadius: 7.49,
		elevation: 3,
		borderRadius: 8,
		marginVertical: 5,
		backgroundColor: "white",
		flexBasis: "40%",
		marginHorizontal: 5,
	},
	cardFooter: {
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderTopLeftRadius: 1,
		borderTopRightRadius: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	cardContent: {
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	cardHeader: {
		paddingTop: 8,
		paddingBottom: 16,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 12,
		borderBottomLeftRadius: 1,
		borderBottomRightRadius: 1,
	},
	bookImage: {
		marginTop: 15,
		height: 140,
		width: 120,
		alignSelf: "center",
		borderColor: "#DCDCDC",
		borderWidth: 3,
	},
	name: {
		fontSize: 10,
		flex: 1,
		alignSelf: "center",
		color: "#008080",
		fontWeight: "bold",
	},
	position: {
		fontSize: 14,
		flex: 1,
		alignSelf: "center",
		color: "#696969",
	},
	followButton: {
		marginTop: 10,
		height: 35,
		width: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		backgroundColor: "#00BFFF",
	},
	followButtonText: {
		color: "#FFFFFF",
		fontSize: 15,
	},
	icon: {
		height: 20,
		width: 20,
	},
	tinyLogo: {
		width: 120,
		height: 160,
	},
});
