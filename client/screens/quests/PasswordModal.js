import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import LongButton from '../../components/LongButton'
import ExitButton from '../../components/ExitButton'
import LongInput from '../../components/LongInput'
import { validatePassword } from '../../api/passwordgen'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { completeQuest } from '../../api/user'

const PasswordModal = ({ route }) => {
    const { id, points } = route.params
    const { user } = useAuth()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigation = useNavigation()

    const alert = (points) => 
        Alert.alert('Success!', `${points} rewarded`, [
            {
                text: 'Close',
                onPress: () => navigation.goBack(),
                style: 'cancel'
            }
        ]);

    const handleSubmit = async () => {
        console.log("submit")
        if (!password) {
            return setError("Field is empty")
        }
        try {
            const response = await validatePassword(id, password, user._id)
            if (response.error === true) {
                setError(response.message)
            }
            else {
                const resp = await completeQuest(user._id, id)
                if (resp.error === true) {
                    setError(resp.message)
                } else {
                    setError(null)
                    alert(points)
                }
            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return (
        <View style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{ width:'90%', height:'90%'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 30, fontWeight: 700}}>Input Password</Text>
                    <ExitButton/>
                </View>

                <View style={{ justifyContent:'center', alignItems:'center', marginTop: 20, marginBottom:10 }}>
                    <LongInput label="Password" value={password} onChangeText={(ans)=>setPassword(ans)}/>
                </View>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'gray'}}>Scan the QR Code to get your unique one-time password!</Text>
                </View>
                {error && 
                <View style={{ justifyContent:'center', alignItems:'center', color:'red'}}>
                    <Text style={{color:'red'}}>Error: {error}</Text>
                </View>
                }
                <LongButton text="Validate" onPress={()=>handleSubmit()}/>
                
            </View>
            
        </View>
    )
}

export default PasswordModal