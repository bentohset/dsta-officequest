import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LongButton from '../../components/LongButton';
import LongInput from '../../components/LongInput';
import BackButton from '../../components/BackButton';

// eslint-disable-next-line no-unused-vars
export default function RegistrationScreen({ navigation }) {
    const { signupUser } = useAuth();
    const [loginDetails, setLoginDetails] = useState({email: null, username: null, password: null, confirmPassword: null})
    const [error, setError] = useState('')

    async function register() {
        try{
        
            if(loginDetails.password != loginDetails.confirmPassword) {
                alert("Passwords do not match");
                throw new Error("Passwords do not match");
                
            } 
            const resp = await signupUser(loginDetails);
            if (resp) {
                setError(resp)
                console.log(error)
            }
        } catch (error) {
            console.log(error);

        }
    }
  

    return (
        <View style={styles.page}>
            <View style={styles.pageLogin}>
                <View style={styles.topBar}>
                    <BackButton/>
                </View>
                <View style={styles.headerBar}>
                    <View style={{paddingHorizontal: 7}}>
                        <Text style={styles.bigText}>Sign</Text>
                    </View>
                    <View style={{padding: 7}}>
                        <Text style={styles.bigText}>Up</Text>
                    </View>
                </View>
                <View style={{height: '70%', width:'100%', justifyContent:'flex-start' ,alignItems:'center', paddingTop:0}}>
                    <LongInput label="Email" placeholder="example@mail.com" value={loginDetails.email} onChangeText={(email) => setLoginDetails({...loginDetails, email: email})} />
                    <LongInput label="Username" placeholder="johndoe" value={loginDetails.username} onChangeText={(username) => setLoginDetails({...loginDetails, username: username})} />
                    <LongInput label="Password" placeholder="......."  value={loginDetails.password} onChangeText={(password) => setLoginDetails({...loginDetails, password: password})} password={true}/>
                    <LongInput label="Confirm Password" placeholder="......."  value={loginDetails.confirmPassword} onChangeText={(confirmPassword) => setLoginDetails({...loginDetails, confirmPassword: confirmPassword})} password={true}/>
                
                </View>

                <View style={{height: '10%', width: '100%', justifyContent:'center', alignItems: 'center'}}>
                    <LongButton text="Register" onPress={() => register()}/>
                </View>
            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    page: {
        height: "100%",
        width: "100%",
        minWidth: 330,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
    },
    pageLogin: {
        height: "90%",
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
    },
    topBar: {
        height: "10%",
        width:"90%",
        alignItems: "center",
        flexDirection: "row",
        
    },
    headerBar: {
        height: "10%",
        width:'80%',
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },

    bigText: {
        fontSize: 35,
        fontWeight: 900,
        fontFamily: "Arial",
    },

});