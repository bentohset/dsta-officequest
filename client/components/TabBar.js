import {View, Pressable, Dimensions, StyleSheet} from 'react-native'
import React from 'react'
import NavigationIcon from './NavigationIcon';

const {width} = Dimensions.get('window')


const TabBar = ({ state, descriptors, navigation}) => {
    return (
        <View style={styles.mainContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label = 
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name
                
                const isFocused = state.index === index;
                
                const onPress =() => {
                    console.log('test')
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                };

                return (
                    <View key={index} style={styles.mainItemContainer}>
                        <Pressable
                            onPress={onPress}
                            style = {{backgroundColor: isFocused?"#D9D9D9": "#FFF", borderRadius: 21, }}
                        >
                            <View style={{ justifyContent: 'center', alignItems:'center', flex:1, padding:15 }}>
                                <NavigationIcon isFocused={isFocused} route={label}/>
                            </View>
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}
{/* <View key={index} style={styles.mainItemContainer}>
                        <Pressable
                            onPress={onPress}
                            style = {{backgroundColor: isFocused?"#030D16": "#182028", borderRadius: 20, }}
                        >
                            <View style={{ justifyContent: 'center', alignItems:'center', flex:1, padding:15 }}>
                                <NavigationIcon isFocused={isFocused} route={label}/>
                            </View>
                        </Pressable>
                    </View> */}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 25,
        backgroundColor: "#FFF",
        borderRadius: 30,
        marginHorizontal: width*0.1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 10,
        borderRadius: 1, 
        borderColor: "#D9D9D9"
    }, 
})

// const styles = StyleSheet.create({
//     mainContainer: {
//         flexDirection: 'row',
//         position: 'absolute',
//         bottom: 25,
//         backgroundColor: "#3F4A5A",
//         borderRadius: 25,
//         marginHorizontal: width*0.1,
//         shadowColor: '#000',
//         shadowOffset: { width: 1, height: 3 },
//         shadowOpacity: 0.5,
//         shadowRadius: 2,
//         elevation: 2,
//     },
//     mainItemContainer: {
//         flex: 1,
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         marginVertical: 10,
//         borderRadius: 1, 
//         borderColor: "#333B42"
//     }, 
// })
export default TabBar