import React from 'react'
import { Ionicons } from "react-native-vector-icons";

const NavigationIcon = ({ route, isFocused }) => {
    const size = 25
    const nonColor = '#999'
    const focusColor = '#000'
    if (route === "Home") {
        return (
            <Ionicons name={"home-outline"} size={size} color={isFocused ? focusColor : nonColor}/>
        )
    } else if (route === "Quests") {
        return (
            <Ionicons name={"rocket-outline"} size={size} color={isFocused ? focusColor : nonColor}/>
        )
    } else if (route === "Pals") {
        return (
            <Ionicons name={"people-outline"} size={size} color={isFocused ? focusColor : nonColor}/>
        )
    } else if (route === "Leaderboards") {
        return (
            <Ionicons name={"stats-chart-outline"} size={size} color={isFocused ? focusColor : nonColor}/>
        )
    }
    return (
        <></>
    )
}

export default NavigationIcon