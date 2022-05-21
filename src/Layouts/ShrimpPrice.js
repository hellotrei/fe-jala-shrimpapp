import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Pressable,
    Modal,
 } from "react-native";

const ShrimpPrice = ({navigation}) => {
    const getDataFromApiAsync = async () => {
        try{
            let response = await fetch('https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region%2Ccreator&region_id=nh'
            );
            let json = await response.json();
            setData(json.data);
        } catch (error) {
            console.error(error)
        }
    };
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState([]);
    const [size, setSize] = useState(100)
    useEffect(() => {
        getDataFromApiAsync()
    },[])

    const renderItem = ({item}) => {
        return(
            <View style={styles.containerItem}>

                <View style={styles.containerImg}>
                    <View style={styles.wrapperAva}><Image
                        source={{uri: `https://app.jala.tech/storage/${item.creator.avatar}`}}
                        style={styles.img}
                    /></View>
                    <View style={styles.wrapperName}><Text style = {styles.txtCreatorName}>{item.creator.name}</Text></View>
                    <View style={styles.wrapperVerif}>
                        <View style={styles.wrapperIcon}></View>{item.creator.email_verified == true ? <Text style={styles.txtVerif}> Terverifikasi</Text> : <Text style={styles.txtVerif}> Unverifikasi</Text>}</View>
                </View>

                <View style = {styles.containerBody}>
                    <Text style = {styles.txtDate}>{item.date}</Text>
                    <Text style = {styles.txtRegionName}>{item.region.full_name}</Text>
                    <Text style = {styles.txtRegion}>{item.region.name_translated}</Text>
                    <Text style = {styles.txtDate}>size {size}</Text>
                    <Text style = {styles.txtPrice}>IDR {sizeFilter(size, item)}</Text>
                </View>
                <View style = {styles.containerBtn}>
                    <TouchableOpacity 
                        style = {styles.btn}
                        onPress={()=> navigation.navigate('DetailScreen', {data:item})}
                    >
                    <Text style = {styles.txtBtn}>Lihat Detail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const sizeFilter = (size, item) => {
        let dataSend = ''
            const arrayItem = Object.values(item)
            const arrayKey = Object.keys(item)
            
            for(let i = 3; i <=21; i++){
                if(arrayKey[i] === `size_${size}`){
                    dataSend = arrayItem[i]
                }
            }
        return dataSend
    }

    const sizeList = () => {
        const data = []
        for(let i = 20; i<= 200; i++){
        for(let j =2; j<=20; j++){
        if(i/10 === j){
            data.push({"id" : i})
            }
        }
        }
        return data
    }
   
    
    return(
        <SafeAreaView style = {styles.container}>     
            <Text style = {styles.judul}>Harga Terbaru</Text>       
            <FlatList
                data = {data}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id}
            />
            <TouchableOpacity 
                onPress={() => setModalVisible(true)}
                style = {styles.btn1}>
                <Text style = {styles.txtbtn1}>Size</Text>
                <Text style = {styles.txtbtn1}>{size}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => setModalVisible1(true)}
            style = {styles.btn2}>
                <Text style = {styles.txtbtn2}>Indonesia</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <ScrollView style={styles.modalView}>
                        <View style={styles.modalView1}>
                            <Text style={styles.modalText}>Size</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Tutup</Text>
                        </Pressable>
                        </View>
                        {sizeList() && sizeList().map((item) => (

                        <Pressable key={item.id}
                               style={styles.modalText}
                                onPress={() => {
                                    setSize(item.id)
                                    setModalVisible(false)}}>
                                <Text style={styles.textStyle}>{item.id}</Text>
                        </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    containerModal: {
        top: 80,
        backgroundColor: "white",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        shadowColor: "#000",
        opacity: 100,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      btnClose:{
          left: 270
      },
      wrapperModal1: {
        flexDirection: 'row',
        backgroundColor: "white",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        shadowColor: "#000",
        opacity: 100,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    txtModal: {
        margin: 10
    },
    txtClose:{
        marginTop: 10,
        color: "#1B77DF",
    },
    judul: {
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.5,
        fontWeight: "700",
        alignSelf: "center",
        padding: 10,
        color:"#004492",
    },
    containerItem: {
        flex: 1,
        margin: 10,
        borderWidth: 0.5,
        borderRadius: 5,
    },
    containerImg: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        // width: 50,
        // height: 50,
        // borderRadius: 50,
    },
    wrapperAva: {
        width: '15%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperName: {
        width: '60%',
        height: 50,
        borderRadius: 25,
    },
    wrapperVerif: {
        width: '25%',
        height: 25,
        borderRadius: 25,
        backgroundColor:'orange',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperIcon: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'yellow'
    },
    txtVerif: {
        fontSize: 10,
    },
    txtCreatorName: {
        fontWeight: '400',
        fontSize: 17,
        margin: 10
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 40,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'black'
    },
    containerBody:{
        flex: 1,
        margin: 10,
    },
    containerBtn:{
        flex: 1,
   
        width: 128,
        height: 40,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: "center",
        marginLeft: 180,
        marginTop: -40
    },
    btn:{
        width: 128,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#1B77DF',
        marginBottom: 17
    },
    btn1: {
        position: 'absolute',
        width: 136,
        height: 50,
        borderTopLeftRadius: 60,
        borderBottomLeftRadius: 60,
        bottom: 8,
        left: 12,
        right: 20,
        elevation: 0,
        backgroundColor: '#004492',
    },
    btn2: {
        position: 'absolute',
        width: 215,
        height: 50,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
        bottom: 8,
        right: 12,
        elevation: 0,
        backgroundColor: '#1B77DF',
    },
    txtBtn1: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.5,
        alignSelf: "center",
        color: 'white'
    },
    txtBtn2: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.5,
        alignSelf: "center",
        color: 'white',
        top: 10,
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
    txtDate: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        marginLeft: 10
    },
    txtRegionName: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        marginLeft: 10
    },
    txtRegion: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        marginLeft: 10
    },
    txtPrice: {
        fontSize: 22,
        fontWeight: "900",
        lineHeight: 28,
        marginLeft: 10,
    },
})

export default ShrimpPrice;