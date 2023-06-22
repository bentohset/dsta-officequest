import Constants from 'expo-constants';

const { manifest } = Constants;

const uri = `http://10.50.192.241:3001`;

export const validatePassword = async (questId, password, userId) => {
    console.log(questId)
    try {
        const url = `${uri}/quests/pw/validate`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questId: questId,
                password: password,
                userId: userId
            })
        })

        if (response.status === 401) {
            return {error: true, message: "Invalid Password"}
        }
        if (response.status === 404) {
            return {error: true, message: "Quest does not exist"}
        }
        if (response.status === 402) {
            return {error: true, message: "Password expired"}
        }
        if (response.status === 500) {
            return {error: true, message: "Server is down"}
        }
        if (response.status === 200) {
            return {error: false, message: "Success"}
        }

    } catch (error) {
        console.log(error)
    }
}