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
    TextInput
 } from "react-native";
 import Ionicons from '@expo/vector-icons/Ionicons';
 import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 import moment from 'moment';

const ShrimpPrice = ({navigation}) => {
    const getDataFromApiAsync = async () => {
        try{
            let response = await fetch(`https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region%2Ccreator&search=${search}`
            );
            let json = await response.json();
            setData(json.data);
        } catch (error) {
            console.error(error)
        }
    };
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('')
    const [size, setSize] = useState(100)
    useEffect(() => {
        getDataFromApiAsync()
    },[search])

    const renderItem = ({item}) => {
        return(
            <View style={styles.containerItem}>

                <View style={styles.containerImg}>
                    <View style={styles.wrapperAva}><Image
                        source={{uri: `https://app.jala.tech/storage/${item.creator.avatar}`}}
                        style={styles.img}
                    /></View>
                    <View style={styles.wrapperName}>
                    <Text style = {styles.txtInfo1}>Supplier</Text>
                        <Text style = {styles.txtCreatorName}>{item.creator.name}</Text></View>
                        {item.creator.email_verified == true ?  <View style={styles.wrapperVerif}>
                        <View style={styles.wrapperIcon}>
                            <Ionicons name="md-star" size={12} style={styles.iconFill2} />
                        </View>
                        <Text style={styles.txtVerif}> Terverifikasi</Text>
                    </View> :  <View style={styles.wrapperUnverif}>
                        <Text style={styles.txtVerif}>  Belum terverifikasi</Text>
                    </View> }
                </View>

                <View style = {styles.containerBody}>
                    <Text style = {styles.txtDate}>{moment(new Date(item.date)).format('D MMMM YYYY')}{}</Text>
                    <Text style = {styles.txtRegionName}>{item.region.full_name}</Text>
                    <Text style = {styles.txtRegion}>{item.region.name_translated}</Text>
                    <Text style = {styles.txtDate}>Size {size}</Text>
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
            <Text style = {styles.txtTitle}>Harga Terbaru</Text>       
            <FlatList
                data = {data}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id}
            />
            <View style={styles.containerFooter}>
                <TouchableOpacity 
                onPress={() => setModalVisible(true)} style={styles.wrapperFooter1}>
                <MaterialCommunityIcons name="scale" size={20} style={styles.iconFill} />
                    <View>
                        <Text style={styles.txtSize}>Size</Text>
                        <Text style={styles.txtSizeValue}>{size}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.wrapperFooter2}>
                <Ionicons name="location-sharp" size={25} style={styles.iconFill} />
                <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                defaultValue={search}
                onChangeText={newText => setSearch(newText)}
                onClear={newText => setSearch('')}
                placeholder="Indonesia"
                placeholderTextColor="#fff"
                style={styles.txtbtn2}
                />
                </View>
            </View>
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
    txtTitle: {
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
    containerFooter: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperFooter1: {
        width: '30%',
        height: 40,
        paddingLeft: 20,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: '#00326b',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    wrapperFooter2: {
        width: '60%',
        height: 40,
        paddingLeft: 20,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#1B77DF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    wrapperAva: {
        width: '15%',
        height: 50,
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
        height: 20,
        borderRadius: 25,
        backgroundColor:'#ffe6b8',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperUnverif: {
        width: '26%',
        height: 20,
        borderRadius: 25,
        backgroundColor:'#b3b3b3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperIcon: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#f6a104'
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
        borderRadius: 20,
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
        fontSize: 10,
        marginLeft: 10,
        color: '#0192d5',
    },
    txtRegionName: {
        fontSize: 10,
        marginLeft: 10
    },
    txtRegion: {
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 24,
        marginLeft: 10
    },
    txtPrice: {
        fontSize: 22,
        fontWeight: "900",
        lineHeight: 28,
        marginLeft: 10,
    },
    txtInfo1: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
    },
    txtSize: {
        color: '#fff',
        fontSize: 10
    },
    txtSizeValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    iconFill: {
        paddingRight: 10,
        color: '#fff',
    },
    iconFill2: {
        color: '#fff',
    }
})

export default ShrimpPrice;