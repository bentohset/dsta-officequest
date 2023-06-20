import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import useAuth from '../hooks/useAuth';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
    const { user } = useAuth()
    return (
        <Stack.Navigator initialRouteName={'BottomTabs'} screenOptions={{headerShown:false}}>
            {user ? (
                <Stack.Group screenOptions={{ headerShown: false, presentation: 'fullScreenModal', animationEnabled: false}}>
                    <Stack.Screen name="BottomTabs" component={BottomTabNavigator}/>
                </Stack.Group>
            ):(
                <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} options={{headerShown: false}}/> 
            )}
        </Stack.Navigator>
    );
}
