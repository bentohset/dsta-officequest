import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { sendPal } from '../../api/pals';
import { getUserPals } from '../../api/user';
import ViewPalModal from '../../components/ViewPalModal';
import ViewPrizeModal from '../../components/ViewPrizeModal';
import useAuth from '../../hooks/useAuth';


export default function PalsScreen({ navigation }) {
    const [showPrizeModal, setShowPrizeModal] = useState(false)
    const [showPalModal, setShowPalModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const username = useRef('')
    //const [highlightedPal, setHighlightedPal] = useState([])
    const highlightedPal = useRef([])
    //const [selectPal, setSelectPal] = useState('')
    const selectPal = useRef('')
    const isFocused = useIsFocused()
    const { user } = useAuth()
    const [pals, setPals] = useState([])
    //const [commonPals, setCommonPals] = useState([])
    const commonPals = useRef([])
    //const [rarePals, setRarePals] = useState([])
    const rarePals = useRef([])
    //const [superRarePals, setSuperRarePals] = useState([])
    const superRarePals = useRef([])
    const [allPals, setAllPals]= useState([
        {key: 0, name:'Cheeseburger', description:'You are what you eat', total:0, image:require('../../assets/cheeseburger.png'), lockedImage:require('../../assets/cheeseburger_black.png')},
        {key: 1, name:'Coffee', description:'Drink me!', total:0, image:require('../../assets/coffee.png'), lockedImage:require('../../assets/coffee_black.png')},
        {key: 2, name:'Ice cream', description:'Cold Cold Cold', total:0, image:require('../../assets/ice_cream.png'), lockedImage:require('../../assets/ice_cream_black.png')},
        {key: 3, name:'Microwave', description:'I cook food!', total:0, image:require('../../assets/microwave.png'), lockedImage:require('../../assets/microwave_black.png')},
        {key: 4, name:'Onigiri', description:'What did the rice ball say to the seaweed? Im onigiri-nally yours!', total:0, image:require('../../assets/onigiri.png'), lockedImage:require('../../assets/onigiri_black.png')},
        {key: 5, name:'Salmon', description:'Salmon-nella...', total:0, image:require('../../assets/salmon_maki.png'), lockedImage:require('../../assets/salmon_maki_black.png')},
        {key: 6, name:'Soda', description:'Coke? Or Pepsi...', total:0, image:require('../../assets/soda.png'), lockedImage:require('../../assets/soda_black.png')},
        {key: 7, name:'Vending machine', description:'Doraemon!', total:0, image:require('../../assets/vending_machine.png'), lockedImage:require('../../assets/vending_machine_black.png')},
        {key: 8, name:'Toaster', description:'Better then microwave', total:0, image:require('../../assets/toaster.png'), lockedImage:require('../../assets/toaster_black.png')},
        {key: 9, name:'Hotdog', description:'Hot dawgg!', total:0, image:require('../../assets/hotdog.png'), lockedImage:require('../../assets/hotdog_black.png')},
    ])

    useEffect(() => {
        console.log('reloaded')
        if (isFocused) {
            fetchData()
        }

        if (refresh) {
            setRefresh(false)
            fetchData()
        }
    }, [isFocused, refresh])


    async function fetchData() {
        
        try {
            const fullData = await getUserPals(user._id)
            const data = fullData.data
            var updated = ([])
            for (var i = 0; i < data.length; i++) {
                const objectIndex = allPals.findIndex(pal => pal.key === i);
                const updatedPals = [...allPals];
                const total = data[i]
                updatedPals[objectIndex].total = total;
                updated = updatedPals
            }

            commonPals.current = (updated.slice(0,5))
            rarePals.current = (updated.slice(5,8))
            superRarePals.current = (updated.slice(8,10))
            setAllPals(updated);

        } catch (error) {
            console.log(error)
        }
    
        var palsAvailable=[]
        for(var i = 0; i < allPals.length; i++){
            if (allPals[i].total > 0) {
                palsAvailable.push({key:i, value:allPals[i].name})
            }
        }
        setPals(palsAvailable)
    }


    function handleClaimPrize () {
        for(var i = 0; i < allPals.length; i++) {
            if (allPals[i].total == 0) {
                Alert.alert("Collect all Pantry Pals to claim!")
                return
            }
        }
        Alert.alert('Claimed!')
    }

    async function handleSendPal () {
        const nameToFind = selectPal.current;
        const palNumber = allPals.findIndex(pal => pal.name === nameToFind);  
        const sendTo = username.current.toString()
        console.log(sendTo)
        try {
            const response = await sendPal (user._id, sendTo, palNumber)
            console.log(palNumber)
            if (response.error === true) {
                // setError(response.message)
                Alert.alert(response.message)
            }
            else {
                Alert.alert('Pal Sent Successfully!')
                setRefresh(true)
            }
        } catch (error) {
            Alert.alert('Error. Please try again.')
        }
    }

    const togglePrizeModal = () => {
        setShowPrizeModal(!showPrizeModal)
    }
    const togglePalModal = () => {
        setShowPalModal(!showPalModal)
    }

    const Item = ({name, total, image, lockedImage, onPress}) => (
        <View style={{width:80, height:70,alignItems:'center', flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
            <View style={{flexDirection:'row-reverse'}}>
                <TouchableOpacity onPress={onPress} style={{width:60, height:60, borderRadius:30, alignItems:'center', justifyContent:'center'}}>
                    {total == 0 ? (
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Image 
                                style={{width: 45, height: 45}}
                                source={lockedImage}
                                resizeMode={'contain'}
                                opacity={0.3}
                            />
                            <Text style={{position:'absolute', opacity:0.5, paddingTop:5}}>
                                ?
                            </Text>
                        </View>
                    ):(
                        <Image 
                            style={{width: 45, height: 45}}
                            source={image}
                            resizeMode={'contain'}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={{width:16, height:16, borderRadius:8, backgroundColor:'#A7A7A7', position:'absolute', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10}}>
                        {total}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    const renderItem = ({item}) => {
        function handleHighlightPal () {
            highlightedPal.current = (item)
            togglePalModal()
        }
        return (
            <Item 
                total={item.total}
                image={item.image}
                lockedImage={item.lockedImage}
                onPress={()=>handleHighlightPal()}
            />
        )
    }

    return (
        <View style={styles.background}>
            <ImageBackground source={require('../../assets/bb.jpg')} style={styles.backgroundImage}/>
            <View style={styles.page}>
                <View style={styles.pageHome}>

                    <View style={styles.topTab}>
                    </View>

                    <View style={{width:'100%', flexGrow:1, alignItems:'center', justifyContent:'center'}}>
                        <View style={{width:'100%', height:'100%', position:'absolute'}}>
                            <View style={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
                                <View style={[styles.defaultCard, {position:'absolute', width:'90%', height:'100%',backgroundColor:'white'}]}>
                                    <View style={{height:80, width:'85%',justifyContent:'space-between', alignItems:'flex-end', flexDirection:'row', paddingBottom:20}}>
                                        <Text style={{fontSize:30, fontWeight:700}}>
                                            PantryPals
                                        </Text>
                                        <TouchableOpacity onPress={togglePrizeModal} style={{height:30, width:60, backgroundColor:'#E0E0E0', borderRadius:9, justifyContent:'center', alignItems:'center'}}>
                                            <Text>
                                                Prize
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexGrow:1, width:'100%', alignItems:'center'}}>
                                        <View style={{height:'100%', width:'90%', position:'absolute', justifyContent:'flex-start', alignItems:'center'}}>
                                            <View style={{height:'65%', width:'100%'}}>
                                                <ScrollView style={{position:'absolute', height:'100%', width:'100%',}}>
                                                    <View style={{alignItems:'center'}}>
                                                        <View style={{width:'95%'}}>
                                                            <Text style={{fontWeight:600, fontSize:16}}>
                                                                Common
                                                            </Text>
                                                            <View style={{height:90, width:'100%'}}>
                                                                {<FlatList
                                                                    horizontal
                                                                    style={{height:0, width:'100%'}}
                                                                    showsHorizontalScrollIndicator={false}
                                                                    data={commonPals.current}
                                                                    renderItem={renderItem}
                                                                    maxToRenderPerBatch={3}
                                                                />}
                                                            </View>
                                                        </View>
                                                        <View style={{width:'95%'}}>
                                                            <Text style={{fontWeight:600, fontSize:16}}>
                                                                Rare
                                                            </Text>
                                                            <View style={{height:90, width:'100%'}}>
                                                                <FlatList
                                                                    horizontal
                                                                    style={{height:0, width:'100%'}}
                                                                    showsHorizontalScrollIndicator={false}
                                                                    data={rarePals.current}
                                                                    renderItem={renderItem}
                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={{width:'95%'}}>
                                                            <Text style={{fontWeight:600, fontSize:16}}>
                                                            Super Rare
                                                            </Text>
                                                            <View style={{height:90, width:'100%'}}>
                                                                <FlatList
                                                                    horizontal
                                                                    style={{height:0, width:'100%'}}
                                                                    showsHorizontalScrollIndicator={false}
                                                                    data={superRarePals.current}
                                                                    renderItem={renderItem}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            <View style={{width:'90%', height:'30%', justifyContent:'space-around'}}>
                                                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                                    <View style={{width:'55%'}}>
                                                        <Text style={{paddingLeft:5, fontWeight:600}}>
                                                    Send Pals to:
                                                        </Text>
                                                        <TextInput style={styles.textInput}
                                                            placeholder="username" 
                                                            onChangeText={(val) => (username.current = (val))} 
                                                            autoCapitalize="none" 
                                                            autoCorrect={false} 
                                                        />
                                                    </View>
                                                    <View style={{width:'40%'}}>
                                                        <Text style={{paddingLeft:5, fontWeight:600}}>
                                                            Select Pal:
                                                        </Text>
                                                        <View style={{height:45}}>
                                                            <SelectList
                                                                dropdownStyles={styles.dropdownStyles}
                                                                dropdownItemStyles={styles.dropdownItemStyles}
                                                                dropdownTextStyles={styles.dropdownTextStyles}
                                                                boxStyles={styles.boxStyles}
                                                                inputStyles={styles.inputStyles}  
                                                                setSelected={(val) => (selectPal.current = (val))} 
                                                                data={pals} 
                                                                save="value"
                                                                placeholder='Select'
                                                                showsVerticalScrollIndicator = {false}
                                                                search = {false}
                                                            />  
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={()=>handleSendPal()} style={{ height:45, width:'100%', borderRadius:12, backgroundColor:'#AF9D5A', justifyContent:'center', alignItems:'center', zIndex:-1}}>
                                                    <Text style={{fontSize:16, fontWeight:600, color:'white'}}>
                                                    Send
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{height:75, paddingVertical:15, justifyContent:'center', alignItems:'center', zIndex:-1}}>
                                <TouchableOpacity activeOpacity={0.9} onPress={()=>handleClaimPrize()} style={{zIndex:-999999, height:'100%', width:'70%', borderRadius:18, backgroundColor:'white', justifyContent:'center', alignItems:'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 1, elevation: 1,}}>
                                    <Text style={{fontSize:16, fontWeight:600, color:'#AF9D5A'}}>
                                        Redeem Prize
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.bottomNavigation}>
                    {/* <BottomNavigator navigation={navigation} /> */}
                </View>
            </View>
            <ViewPrizeModal visible={showPrizeModal} closeModal={togglePrizeModal} prizeName={"2 x MBS Hotel Stay"}/>
            <ViewPalModal visible={showPalModal} closeModal={togglePalModal} highlightedPal={highlightedPal.current}/>
        </View>
    );
}




const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    page: {
        height: "100%",
        width: "100%",
        minWidth: 330,
        // backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageHome: {
        width: "100%",
        flexGrow: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
    },
    bottomNavigation: {
        width:'100%',
        height: 100

    },
    topTab: {
        // backgroundColor:'#D9D9D9',
        flexDirection:'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width:'100%',
        height:60
    },
    defaultCard:{
        height:'100%',
        backgroundColor:'#333A45',
        borderRadius:30,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,

        justifyContent:'center',
        alignItems:'center'
    },
    textInput: {
        height: 45,
        color: "#6A6A6A",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        borderColor: "#DADADA",
    },
    dropdownStyles: {
        position:"absolute",
        width:"100%",
        top:35,
        zIndex:99,
        maxHeight:150,
        backgroundColor:"white",
        borderColor:"#DADADA"

    },
    dropdownItemStyles: {
        height:35,
    },
    dropdownTextStyles: {
        color: "#6A6A6A",
    },
    boxStyles: {
        borderColor:"#DADADA",
        paddingHorizontal:10
    },
    inputStyles: {
        color: "#6A6A6A",
    },
})