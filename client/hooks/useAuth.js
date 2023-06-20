import React, { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signUp } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [jwtToken, setJwtToken] = useState('')

    async function loginUser ({ email, password }) {
        try {
            const resp = await signIn(email, password)
            console.log(resp)

            if (resp.error === true) {
                return resp.message
            } else {
                await AsyncStorage.setItem('user', JSON.stringify(resp.data))
                setJwtToken(resp.token)
                setUser(resp.data)
            }
        } catch (error) {
            console.log(error)
            setUser('')
        }
        
    }

    async function signupUser ({ email, username, password }) {
        try {
            const resp = await signUp(email, username, password)
            console.log(resp)
            if (resp.error === true) {
                return resp.message
            } else {
                await AsyncStorage.setItem('user', JSON.stringify(resp.data))
                setJwtToken(resp.token)
                setUser(resp.data)
            }
        } catch (error) {
            console.log(error)
            setUser('')
            setJwtToken('')
        }
    }

    async function logoutUser () {
        // clear states
        console.log('useauth')
        await AsyncStorage.removeItem('user')
        setUser('')
        setJwtToken('')
        console.log('finished logging out')
    }

    const getAuth = async () => {
        try {
            const user = await AsyncStorage.getItem('user')
            if (user) {
                const userData = JSON.parse(user || {})
                setUser(userData)
            }
        } catch (error) {
            console.log(error)
            setUser('')
            setJwtToken('')
        }
    }
    useEffect(()=> {
        getAuth()
    },[])

    return (
        <AuthContext.Provider value = {{
            loginUser,
            logoutUser,
            signupUser,
            user,
            jwtToken,
        }}>
            {children}
        </AuthContext.Provider>
    )

};

export default function useAuth() {
    return useContext(AuthContext);
}