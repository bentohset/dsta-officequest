import React, { useEffect, useState } from "react";
import { Alert, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import BottomNavigator from '../../components/BottomNavigation';
//import { getLeaderboard } from "../../api/leaderboard";

export default function LeaderboardScreen({ navigation }) {
    const [data, setData] = useState(oldData);

    // Each Individual Level Component
    const Item = ({level, total, name}) => (
        <View style={{width:'100%', height:55,alignItems:'center', flexDirection:'row'}}>
            <View style={{width:'10%', alignItems:'center'}}>
                <Text style={{fontSize:15, fontWeight:600}}>
                    {level}
                </Text>
            </View>
            
            <View style={{ width: '95%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ borderRadius: 12, height: '80%', width: '90%', backgroundColor: '#e6e4e1', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, flexDirection: 'row', paddingLeft: 10}}>
                    <Text style={{fontSize:17, fontWeight:400}}>
                        {name}
                    </Text>
                    <Text style={{fontSize:17, fontWeight:400}}>
                        {total}
                    </Text>
                </View>
            </View>
        </View>
    );    

    // Rendering the list of levels
    const renderItem = ({item}) => {
        return (
            <Item
                level={item.level} //user's ranking on the leaderboard
                total={item.total} //user's total points
                name={item.name} //user's name
            />
        )
    }

    // Rendering the page
    return (
        
        <View style={styles.page}>
            <View style={styles.pageHome}>
                <View style={{width:'100%', flexGrow:1, backgroundColor:'#D9D9D9', alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:'100%', height:'100%', position:'absolute', justifyContent:'space-evenly'}}>
                        <View style={{height:'95%', justifyContent:'center', alignItems:'center', paddingTop: 25}}>
                            <View style={[styles.defaultCard, {width:'90%', backgroundColor:'#FBE6B8'}]}>
                                <View style={{height:60, width:'85%',justifyContent:'center'}}>
                                    <Text style={{fontSize:30, fontWeight:700, color:"#A27A4E"}}>
                                        Leaderboard
                                    </Text>
                                </View>
                                <View style={{flexGrow:1, width:'100%', alignItems:'center'}}>
                                    <View style={{height:'96%', width:'90%', position:'absolute', borderRadius:15, justifyContent:'center', alignItems:'center', backgroundColor:"white"}}>
                                        <View style={{height:'90%', width:'90%'}}>
                                            <FlatList
                                                style={{ height: 0, width: '100%' }}
                                                keyExtractor={item => item.level}
                                                data={data}
                                                renderItem={renderItem}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                        <View style={{paddingVertical:8}}>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottomNavigation}>
                {/* <BottomNavigator navigation={navigation} /> */}
            </View>
        </View>


    );
}


const oldData = [
    {
        level: 1,
        total: 300,
        name: 'Ben Toh',
    },
    {
        level: 2,
        total: 300,
        name: 'Cleon Liew',
    },
    {
        level: 3,
        total: 500,
        name: 'Ge Wei',
    },
    {
        level: 4,
        total: 500,
        name: 'Jiun Yuan',
    },
    {
        level: 5,
        total: 700,
        name: 'JY',
    },
    {
        level: 6,
        total: 700,
        name: 'Sriram',
    },
    {
        level: 7,
        total: 1000,
        name: 'Senthilkumar',
    },
    {
        level: 8,
        total: 1000,
        name: 'Stella Tan',
    },
    {
        level: 9,
        total: 1200,
        name: 'Joe Mama',
    },
    {
        level: 10,
        total: 1400,
        name: 'Hugh Janus',
    },
    {
        level: 11,
        total: 1700,
        name: 'Steven Lim',
    },
    {
        level: 12,
        total: 1900,
        name: 'dogsloop',
    },
];
    

const styles = StyleSheet.create({
    page: {
        height: "100%",
        width: "100%",
        minWidth: 330,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
    },
    pageHome: {
        width: "100%",
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
    },
    bottomNavigation: {
        width: '100%',
        height: 90

    },
    topTab: {
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
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