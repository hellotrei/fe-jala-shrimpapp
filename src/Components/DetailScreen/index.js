import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import {API_URL} from "@env";

const DetailScreen = ({ route }) => {
  const number = route.params.data.contact;
  const dataPrice = route.params.data;
  const dataSize = (route) => {
    let dataSend = [];
    const arrayItem = Object.values(route);
    for (let i = 3; i <= 21; i++) {
      dataSend.push(arrayItem[i]);
    }
    return dataSend;
  };

  const sizeList = () => {
    const data = [];
    for (let i = 20; i <= 200; i++) {
      for (let j = 2; j <= 20; j++) {
        if (i / 10 === j) {
          data.push({ id: i });
        }
      }
    }
    return data;
  };

  const format = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const ShrimpPrice = ({ route }) => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <View>
            {sizeList() &&
              sizeList().map((route) => (
                <Text style={styles.txtSubtitle} key={route.id}>
                  Size {route.id}
                </Text>
              ))}
          </View>
          <View style={{ marginLeft: 20 }}>
            {dataSize(route) &&
              dataSize(route).map((route) => (
                <Text style={styles.txtSubtitle}>
                  Rp {route === null ? "0" : format(route)}
                </Text>
              ))}
          </View>
        </View>
      </>
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Bagikan profil supplier ${route.params.data.creator.name} `,
        url: `${API_URL}shrimp_prices/${route.params.data.creator.id}`,
        message: `Bagikan profil ${route.params.data.creator.name} `,
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHeader}>
        <View>
          <Text style={styles.txtTitle}>
            {route.params.data.region.province_name}
          </Text>
          <Text style={styles.txtSubtitle}>
            {route.params.data.region.regency_name}
          </Text>
        </View>
        <TouchableOpacity onPress={onShare}>
          <Ionicons name="md-share-social" size={25} style={styles.iconFill} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBody}>
        <Text>
          {moment(new Date(route.params.data.date)).format("D MMMM YYYY")}
          {}
        </Text>
        <View style={styles.containerImg}>
          <View style={styles.wrapperAva}>
            <Image
              source={{
                uri: `${API_URL}storage/${route.params.data.creator.avatar}`,
              }}
              style={styles.img}
            />
          </View>
          <View style={styles.wrapperName}>
            <Text style={styles.txtInfo1}>Supplier</Text>
            <Text style={styles.txtCreatorName}>
              {route.params.data.creator.name}
            </Text>
          </View>
          {route.params.data.creator.email_verified == true ? (
            <View style={styles.wrapperVerif}>
              <View style={styles.wrapperIcon}>
                <Ionicons name="md-star" size={12} style={styles.iconFill2} />
              </View>
              <Text style={styles.txtVerif}> Terverifikasi</Text>
            </View>
          ) : (
            <View style={styles.wrapperUnverif}>
              <Text style={styles.txtVerif}> Belum terverifikasi</Text>
            </View>
          )}
        </View>

        <Text style={styles.txtInfo1}>Kontak</Text>
        <View style={styles.wrapperContact}>
          <Text style={styles.txtCreatorName}>
            {route.params.data.creator.phone}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${number}`);
            }}
            style={styles.btn}
          >
            <Text style={styles.txtBtn}>Hubungi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={styles.txtCreatorName}>Daftar Harga</Text>
          <ShrimpPrice route={dataPrice} />
        </View>
        <Text style={styles.txtCreatorName}>Catatan</Text>
        <Text>{route.params.data.remark}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    borderWidth: 0.5,
    height: 72,
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
  },
  wrapperAva: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperName: {
    width: "60%",
    height: 50,
    borderRadius: 25,
  },
  wrapperVerif: {
    width: "25%",
    height: 20,
    borderRadius: 25,
    backgroundColor: "#ffe6b8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperUnverif: {
    width: "26%",
    height: 20,
    borderRadius: 25,
    backgroundColor: "#b3b3b3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperIcon: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#f6a104",
  },
  txtVerif: {
    fontSize: 10,
  },
  containerImg: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerBody: {
    flex: 1,
    padding: 12,
    borderWidth: 0.5,
  },
  wrapperContact: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    width: 90,
    height: 32,
    borderRadius: 5,
    backgroundColor: "#1B77DF",
  },
  txtInfo1: {
    color: "#969696",
    fontSize: 12,
  },
  txtCreatorName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  txtBtn: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    letterSpacing: 0.5,
    margin: 6,
    alignSelf: "center",
  },
  txtSupplierName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  txtTitle: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 20,
    alignItems: "center",
  },
  txtSubtitle: {
    fontSize: 12,
    lineHeight: 20,
    alignItems: "center",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  wrapperContent: {
    marginVertical: 10,
  },
  iconFill: {
    color: "#1B77DF",
  },
  iconFill2: {
    color: "#fff",
  },
});

export default DetailScreen;
