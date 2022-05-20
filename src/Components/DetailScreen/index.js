import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
 } from "react-native";

const DetailScreen =  ({route}) => {
    const number = (route.params.data.contact)
    return(
        <ScrollView style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.txtTitleBold}>{route.params.data.region.province_name}</Text>
                <Text>{route.params.data.region.regency_name}</Text>
            </View>
            <View style={styles.containerBody}>
                <Text>{route.params.data.date}</Text>
                <View style={styles.containerImg}>
                    <Image
                    source={{uri: `https://app.jala.tech/storage/${route.params.data.creator.avatar}`}}
                    style={styles.img}
                    />
                <Text style={styles.txtSupplierName}>{route.params.data.creator.name}</Text>
                </View>
                
                <Text style={styles.fontThird}>Kontak</Text>
                <View style={styles.containerHarga}>
                    <Text style={styles.txtTitleBold}>{route.params.data.creator.phone}</Text>
                    <TouchableOpacity 
                        onPress={() => {Linking.openURL(`tel:${number}`)}}
                        style = {styles.btn}>
                            <Text style = 
                            {styles.txtBtn}>Hubungi</Text>
                    </TouchableOpacity>
                </View>
                    <Text style={styles.txtTitleBold}>Daftar Harga</Text>
                    <Text style={styles.fontSecond}>Size 20 {route.params.data.size_20}</Text>
                    <Text style={styles.fontSecond}>Size 30 {route.params.data.size_30}</Text>
                    <Text style={styles.fontSecond}>Size 40 {route.params.data.size_40}</Text>
                    <Text style={styles.fontSecond}>Size 50 {route.params.data.size_50}</Text>
                    <Text style={styles.fontSecond}>Size 60 {route.params.data.size_60}</Text>
                    <Text style={styles.fontSecond}>Size 70 {route.params.data.size_70}</Text>
                    <Text style={styles.fontSecond}>Size 80 {route.params.data.size_80}</Text>
                    <Text style={styles.fontSecond}>Size 90 {route.params.data.size_90}</Text>
                    <Text style={styles.fontSecond}>Size 100 {route.params.data.size_100}</Text>
                    <Text style={styles.fontSecond}>Size 110 {route.params.data.size_110}</Text>
                    <Text style={styles.fontSecond}>Size 120 {route.params.data.size_120}</Text>
                    <Text style={styles.fontSecond}>Size 130 {route.params.data.size_130}</Text>
                    <Text style={styles.fontSecond}>Size 140 {route.params.data.size_140}</Text>
                    <Text style={styles.fontSecond}>Size 150 {route.params.data.size_150}</Text>
                    <Text style={styles.fontSecond}>Size 160 {route.params.data.size_160}</Text>
                    <Text style={styles.fontSecond}>Size 170 {route.params.data.size_170}</Text>
                    <Text style={styles.fontSecond}>Size 180 {route.params.data.size_180}</Text>
                    <Text style={styles.fontSecond}>Size 190 {route.params.data.size_190}</Text>
                    <Text style={styles.fontSecond}>Size 200 {route.params.data.size_200}</Text>   
                <Text style={styles.txtTitleBold}>Catatan</Text>
                <Text>{route.params.data.remark}</Text>
            </View>   
        </ScrollView>
    )
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
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 12
    },
    containerImg: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
    },
    containerBody: {
        flex: 1,
        padding: 12,
        borderWidth: 0.5,
    },
    containerHarga: {
        flex: 1,
        flexDirection: 'row'
    },
    btn: {
        width: 90,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#1B77DF',
        marginLeft: 130
    },
    txtBtn:{
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20,
        letterSpacing: 0.5,
        margin: 6,
        alignSelf: "center"
    },
    txtSupplierName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0.5,
    },
    txtTitleBold: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0.5,
    },
    fontSecond: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20,
        alignItems: "center",
    },
    fontThird: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 100,
        resizeMode: 'contain',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10
    },
})

export default DetailScreen;