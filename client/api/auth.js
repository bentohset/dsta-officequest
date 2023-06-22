import Constants from "expo-constants";

const { manifest } = Constants;


const uri = `http://10.50.192.241:3001`;
// do this to tunnel physical device to localhost server

export const signIn = async (email, password) => {
    try {
        const url = `${uri}/auth/signin`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        if (response.status === 401) {
            return {error: true, message: "Invalid Password"}
        } 
        if (response.status === 404) {
            return {error: true, message: "User does not exist"}
        } 
        if (response.status === 500) {
            return {error: true, message: "Servers are down. Please try again"}
        }
        const data = await response.json()
        // console.log(data)
        
        return {data: data.user, token: data.token, message: "Success"}
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (email, username, password) => {
    try {
        const url = `${uri}/auth/signup`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            }),
        })
        
        if (response.status === 401) {
            return {message: "Username already exists"}
        } 
        if (response.status === 402) {
            return {message: "Email already exists"}
        } 
        if (response.status === 500) {
            return {message: "Servers are down. Please try again"}
        } 
        const data = await response.json()
        
        return {data: data.user, token: data.token, message: "Success"}
    } catch (error) {
        console.log(error)
    }
}
