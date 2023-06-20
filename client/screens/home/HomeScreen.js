import React, { useEffect, useIsFocused, useState } from "react";
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "react-native-vector-icons";
import { generatePal } from '../../api/pals';
import { getUserPoints } from "../../api/user";
import BottomNavigator from '../../components/BottomNavigation';
import RollModal from '../../components/RollModal';
import PrizeModal from '../../components/ViewPrizeModal';
import useAuth from '../../hooks/useAuth';
import CountdownTimer from "./CountdownTimer";

export default function HomeScreen({ navigation }) {
    const { user } = useAuth();
    const [data, setData] = useState(oldData);
    const [showPrizeModal, setShowPrizeModal] = useState(false)
    const [showPalModal, setShowPalModal] = useState(false)
    const [prize, setPrize] = useState(null)
    const [refresh, setRefresh] = useState(false)
    // const isFocused = useIsFocused()


    // Calculating the current level and points for each bar
    // let totalPoints = getUserPoints(user._id);
    let totalPoints = 2650;
    let tempScore = totalPoints;
    let currentLevel = 0;
  
    for (let i = 0; i < data.length; i++) {
        // data[i].isClaimed = mongoDBData.isClaimed;

        if (tempScore >= data[i].total) {
            data[i].current = data[i].total;
            data[i].levelCompleted = true;
            tempScore -= data[i].total;
            currentLevel++;
        } else if (tempScore === 0) {
            data[i].current = 0;
        } else {
            data[i].current = tempScore;
            tempScore = 0;
            currentLevel++;
        }
    }

    {/* In case the on top doesnt work
    function calculateTotalPoints() {
        const newData = data.map(item => {
            if (tempScore >= item.total) {
                currentLevel++;
                tempScore -= item.total;
                return { ...item, current: item.total, levelCompleted: true };
            } else {
                return { ...item, current: tempScore, levelCompleted: false };
            }
        });
        setData(newData);
    }

    useEffect(() => {
        calculateTotalPoints();
    }, []);
    
    OR

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        if (refresh) {
            setRefresh(false)
        }
        
    }, [refresh]);
    */}
    

    const togglePrizeModal = () => {
        setShowPrizeModal(!showPrizeModal)
        setRefresh(true)
    }

    const togglePalModal = () => {
        setShowPalModal(!showPalModal)
        setRefresh(true)
    }

    const claimPrize = async ( userId ) => {
        console.log("claim Prize")
        const res = await generatePal(userId)
        setPrize(res)
        setShowPrizeModal(true)
    }

    const claimPal = async ( userId ) => { 
        console.log("claim Pal")
        const res = await generatePal(userId)
        setPrize(res)
        setShowPalModal(true)
    }


    const updateClaim = (level) => {
        const newData = data.map(item => {
            if (item.level === level) {
                return { ...item, isClaimed: true };
            }
            return item;
        });
        setData(newData);
    }
        

    const handleClaimPrize = (level, levelCompleted, isClaimed, prize) => {
        if (isClaimed == true) {
            Alert.alert("Error", "You have already claimed this prize!");
        } else if (isClaimed == false && levelCompleted == false) {
            Alert.alert("Error", "You cannot redeem this yet!");
        } else {
            if (level == 5 || level == 10) {
                claimPrize(user._id);
            } else {
                claimPal(user._id);
            }
            // isClaimed = true;
            // mongoDBData[level].isClaimed = true;
            // const newData = data.map(item => {
            //     if (item.level === level) {
            //         return { ...item, isClaimed: true };
            //     }
            //     return item;
            // });
            // setData(newData);
            updateClaim(level);
            
        }
    };

    // Each Individual Level Component
    const Item = ({percentageString, level, total, isClaimed, onPress, current}) => {

        // Change Background for button
        let btnBackgroundColor = '#3FFD3B'; // Default: Green
        if (isClaimed) {
            btnBackgroundColor = '#858585'; // Dark Grey
        } else if (!isClaimed && current < total) {
            btnBackgroundColor = '#ECECEC'; // Grey
        }
        

        return (
            <View style={{width:'100%', height:55,alignItems:'center', flexDirection:'row'}}>
                <View style={{width:'10%', alignItems:'center'}}>
                    <Text style={{fontSize:15, fontWeight:600}}>
                        {level}
                    </Text>
                </View>
                <View style={{ width:'65%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <View style={{position:'absolute', width:'80%', flexDirection:'row-reverse', paddingBottom:20}}>
                        <Text style={{fontSize:10}}>
                            {total}
                        </Text>
                    </View>
                    <View style={{backgroundColor:'#ECECEC', width:'95%', height:10, borderRadius:5}}>
                        <View style={{backgroundColor:'#4F60FF', width:percentageString, height:'100%', borderRadius:5, position:'absolute'}}>
                        </View>
                    </View>
                </View>
                <View style={{width:'25%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={onPress} style={{borderRadius:12, height:'80%', width:'90%', backgroundColor:btnBackgroundColor, alignItems:'center', justifyContent:'center'}}>
                        {isClaimed ? (
                            <Text>
                        Claimed
                            </Text>
                        ):(
                            <Text>
                        Claim
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
    

    // Rendering the list of levels
    const renderItem = ({item}) => {

        const percentage = item.current / item.total * 100
        const percentageString = percentage.toString() + '%'

        return (
            <Item
                level={item.level}
                total={item.total}
                current={item.current}
                isClaimed={item.isClaimed}
                percentageString={percentageString}

                onPress={() => 
                    handleClaimPrize(
                        item.level, 
                        item.levelCompleted,
                        item.isClaimed,
                        item.prize)}
            />
        )
    }

    // Rendering the page
    return (
        <View style={styles.background}>
            <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}/>

            <View style={styles.page}>
                <View style={styles.pageHome}>
                
                    <View style={styles.topTab}>

                        <Text style={styles.headerText}>
                        Welcome
                        </Text>

                        <View style={{paddingRight:'7%', paddingBottom:'1%',}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}} style={{width:40, height:40, borderRadius:20, backgroundColor:'#C2C4CA', alignItems:'center', justifyContent:'center'}}>
                                <Ionicons name="person" color="#444" size={30}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width:'100%', flexGrow:1, alignItems:'center', justifyContent:'center'}}>
                        <View style={{width:'100%', height:'100%', position:'absolute', justifyContent:'space-evenly'}}>
                            <View style={{height:'80%', justifyContent:'center', alignItems:'center'}}>
                                <View style={[styles.defaultCard, {width:'90%', backgroundColor:'#FBE6B8'}]}> 
                                    <View style={{height:60, width:'85%',justifyContent:'center'}}>
                                        <Text style={{fontSize:30, fontWeight:700, color:"#A27A4E"}}>
                                        The Breakroom
                                        </Text>
                                    </View>
                                    <View style={{flexGrow:1, width:'100%', alignItems:'center'}}>
                                        <View style={{height:'96%', width:'90%', position:'absolute', borderRadius:15, justifyContent:'center', alignItems:'center', backgroundColor:"#FEF9EC"}}>
                                            <View style={{height:'90%', width:'90%'}}>
                                                <FlatList
                                                    style={{height:0, width:'100%'}}
                                                    data={data}
                                                    renderItem={renderItem}
                                                    keyExtractor={item => item.level}
                                                    showsVerticalScrollIndicator={false}
                                                />
                                            </View>
                                            <View style={{paddingVertical:8}}>
                                                <CountdownTimer />
                                            </View>

                                        </View>
                                    </View>
                                </View>
                               
                            </View>
                            <View style={{height:'12%', justifyContent:'center', alignItems:'center'}}>
                                <View style={[styles.defaultCard, { width:'60%', flexDirection:'row', borderRadius:40, height:"80%"}]}>
                                    <Text style={{fontWeight:500}}>Current Level: </Text>
                                    <Text style={{fontSize:20 , fontWeight:600}}>{currentLevel}</Text>
                                </View>
                               
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.bottomNavigation}>
                    {/* <BottomNavigator navigation={navigation} /> */}
                </View>
                <PrizeModal visible={showPrizeModal} closeModal={togglePrizeModal}/>
                {/* <RollModal visible={showPalModal} closeModal={togglePalModal} prize={prize} prizeType="gacha"/> */}
            </View>
        </View>
        
    );
}


const oldData = [
    {
        level: 1,
        levelCompleted: false,
        total: 300,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 2,
        levelCompleted: false,
        total: 300,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 3,
        levelCompleted: false,
        total: 500,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 4,
        levelCompleted: false,
        total: 500,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 5,
        levelCompleted: false,
        total: 700,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 6,
        levelCompleted: false,
        total: 700,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 7,
        levelCompleted: false,
        total: 1000,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 8,
        levelCompleted: false,
        total: 1000,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 9,
        levelCompleted: false,
        total: 1200,
        current: 0,
        isClaimed: false,
        prize: "Pal",
    },
    {
        level: 10,
        levelCompleted: false,
        total: 1200,
        current: 0,
        isClaimed: false,
        prize: "Voucher",
    },
];
    

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
        // flex: 1,
        height: "100%",
        width: "100%",
        minWidth: 330,

        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
    },
    pageHome: {
        width: "100%",
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: "column",
    },
    bottomNavigation: {
        width:'100%',
        height: 100

    },
    topTab: {
        flexDirection:'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width:'100%',
        height:100,
    },
    defaultCard: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,

        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText:{
        paddingLeft:'7%',
        paddingBottom:'1%',
        fontWeight:800,
        fontSize:30, 
        color:'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
    }

});