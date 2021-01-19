import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Searchbar, Divider, Card } from "react-native-paper";

//API
import { SearchBooksAsync } from "../../services/BookService";
//SCREEN
import Loading from "../load/Loading";

// CONSTANTS

export default function BookSearchScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [bookSearchLists, setBookSearchLists] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const _searchBook = async () => {
    await SearchBooksAsync("").then((res) => {
      setBookSearchLists(res);
      setIsLoading(false);
    });
  };
  const searchCondition = () => {
    if (!isSearch) {
      _searchBook();
    }
  };
  const onChangeSearch = async (query) => {
    setIsSearch(true);
    setSearchQuery(query);
    await SearchBooksAsync(query).then((res) => setBookSearchLists(res));
  };

  searchCondition();

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={1}
          data={bookSearchLists}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} />
          )}
        />
      )}
    </>
  );
}

function Item({ item, navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookDetailScreen", {
            book: item,
          })
        }
      >
        <Card.Title
          title={item.title}
          subtitle={item.author}
          left={() => (
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.images,
              }}
            />
          )}
          right={() => (
            <View style={styles.pricebool}>
              <Text style={styles.price}>{item.price} $</Text>
            </View>
          )}
        />
      </TouchableOpacity>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  tinyLogo: {
    width: 40,
    height: 50,
    borderRadius: 5,
  },
  logo: {
    width: 66,
    height: 58,
  },
  pricebool: {
    backgroundColor: "#131",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
    borderRadius: 3,
  },
  price: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
    marginLeft: 3,
    marginRight: 3,
  },
});
