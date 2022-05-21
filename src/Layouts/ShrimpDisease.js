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

const ShrimpDisease = () => {
  const getDataFromApiAsync = async () => {
    try {
      let response = await fetch(
        "https://app.jala.tech/api/diseases?per_page=15&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcwY2UyYjZjNzEzNjkyZmVjNDEwMTJjODYwMjRhMzM4M2ZiOGZjNDI0NDU3NzFmMjMwNjIyMDFkOTJlNDZlYzIxNjYwNTk3ZjdlY2I4YzU4In0.eyJhdWQiOiIxIiwianRpIjoiNzBjZTJiNmM3MTM2OTJmZWM0MTAxMmM4NjAyNGEzMzgzZmI4ZmM0MjQ0NTc3MWYyMzA2MjIwMWQ5MmU0NmVjMjE2NjA1OTdmN2VjYjhjNTgiLCJpYXQiOjE2MzU5OTYyNzEsIm5iZiI6MTYzNTk5NjI3MSwiZXhwIjoxNjY3NTMyMjcxLCJzdWIiOiI3NyIsInNjb3BlcyI6W119.F1bxyaeDygJb66xI3gDYBWmoN_JObb4jItMEtGzDFuW2w9dlA_zglk0CbqZ-keBO3a3w75Ui3t5XoE5I2lV3PP0BMZC7fFgx00sicEVrzNFlt2oUzj5n3RgpGFnclJHmnX-ObSBk-1efciBdB0PcrSMjQp4HrhQXVkzN-Xd4debnzohNOX8nhqdf3GLOoQm8Fak6nSGWy0-vsY9J4mLjzNcPtkBA5lfPk9Z_TCzNUSy1iOyE8sZHcYQSGfehcXISOL1Oev_djgyVzzbZ45jW1GDujO4d94xqY2EdDDpPuKd2bMnA9FOgfoRrxvIJ8u1AFvr6A_QBzH1kwJfWems2_jlpF91C2ZYm1LQhf4DAMoaNZhd1SDYJheh_Nx8mgeYgBgqcWv2tD-1u0-ghyTfN950NelZ_IdUxDJ_Z9riLjDrDJ96WEJNp7pxHJfc34IM5Ok4Im1ewZr8VIIGoXY5u01in_af2JWpKfeODACPO7I2xheMX6c7NInDArMBByB31CUi_NvhJtDoYAZLCeNBWsAG3AGNapl5gue2EdYj263QrfadWtDp5scGaW1f1sINLo9e_HZceLplR336MABHy9wwkK2VW0zgmG11boF3RMZkPTvRe8BSXrqzoz1Ud30NI8JUZjJ-GatDlAHSvBYYqpEe1Wn8v-YwXZsduZF-JNl0",
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
        message: `Bagikan profil gejala penyakit ${item.full_name} `,
        url: `https://app.jala.tech/diseases/${item.id}`,
        message: `Bagikan gejala ${item.full_name} `,
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
      <View style={styles.containerItem}>
        <View style={styles.containerImg}>
          <Image
            source={{ uri: `https://app.jala.tech/storage/${item.image}` }}
            style={styles.img}
          />
        </View>
        <View style={styles.containerBody}>
          <Text style={styles.txtTitle}>
            {item.full_name}({item.short_name})
          </Text>
          <Text style={styles.txtDesc}>{item.meta_description}</Text>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtHeader}>Penyakit Udang</Text>
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

export default ShrimpDisease;
