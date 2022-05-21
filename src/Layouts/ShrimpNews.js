import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Share,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import {API_TOKEN, API_URL} from "@env"

const ShrimpNews = ({ navigation }) => {
  const getDataFromApiAsync = async () => {
    try {
      let response = await fetch(
        `${API_URL}api/posts?per_page=15&page=1&with=creator`,
        {
          headers: {
            Authorization:
              `${API_TOKEN}`,
          },
        }
      );
      let json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    getDataFromApiAsync();
  }, []);

  const onShare = async (item) => {
    try {
      const result = await Share.share({
        message: `Bagikan berita terbaru mengenai ${item.title} `,
        url: `${API_URL}posts/${item.id}`,
        message: `Bagikan berita terbaru mengenai ${item.title} `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.containerItem}
        onPress={() => navigation.navigate("Berita", { id: item.id })}
      >
        <View style={styles.containerImg}>
          <Image
            source={{ uri: `${API_URL}storage/${item.image}` }}
            style={styles.img}
          />
        </View>
        <View style={styles.containerBody}>
          <Text style={styles.txtTitle}>{item.title}</Text>
          <Text style={styles.txtDesc}>{item.excerpt}</Text>
          <View style={styles.wrapperBodyFooter}>
            <Text style={styles.txtDesc}>
              {moment(item.created_at).format("D MMMM YYYY")}
            </Text>
            <TouchableOpacity onPress={() => onShare(item)}>
              <Ionicons
                name="md-share-social"
                size={25}
                style={styles.iconFill}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtHeader}>Kabar Terbaru</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtHeader: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: "700",
    alignSelf: "center",
    padding: 10,
    color: "#004492",
  },
  containerItem: {
    flex: 1,
    borderWidth: 0.5,
    margin: 10,
    borderRadius: 10,
  },
  img: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerImg: {
    height: 150,
    width: "100%",
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerBody: {
    flex: 1,
    margin: 10,
    marginTop: -15,
  },
  wrapperBodyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtTitle: {
    fontSize: 14,
    margin: 10,
    fontWeight: "bold",
  },
  txtDesc: {
    fontSize: 12,
    margin: 10,
  },
  iconFill: {
    color: "#545454",
  },
});

export default ShrimpNews;
