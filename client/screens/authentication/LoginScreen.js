import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LongButton from '../../components/LongButton';
import LongInput from '../../components/LongInput';
import BackButton from '../../components/BackButton';


// eslint-disable-next-line no-unused-vars
export default function LoginScreen({ navigation }) {
    const { loginUser } = useAuth();
    const [loginDetails, setLoginDetails] = useState({email: null, password: null})
    const [error, setError] = useState('')

    async function handleLogin() {
        try {
            const resp = await loginUser(loginDetails);
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
                        <Text style={styles.bigText}>Log</Text>
                    </View>
                    <View style={{padding: 7}}>
                        <Text style={styles.bigText}>In</Text>
                    </View>
                </View>
                <View style={{height: '70%', width:'100%', alignItems:'center', justifyContent:'flex-start', paddingTop: 0}}>
                    <LongInput label="Email" placeholder="example@mail.com" value={loginDetails.email} onChangeText={(email) => setLoginDetails({...loginDetails, email: email})} />
                    <LongInput label="Password" placeholder="......."  value={loginDetails.password}  onChangeText={(password) => setLoginDetails({...loginDetails, password: password})} password={true} />
                
                </View>

                <View style={{height: '10%', width: '100%', justifyContent:'center', alignItems: 'center'}}>
                    <LongButton text="Login" onPress={() => handleLogin()}/>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        height: "100%",
        width: "100%",
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
        width:'90%',
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',

    },

    bigText: {
        fontSize: 35,
        fontWeight: "900",
        fontFamily: "Arial",
    },
});