import Constants from 'expo-constants';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;
// do this to tunnel physical device to localhost server

/*
Get leaderboard
@return: { data: Array of User objects with _id, username and points fields in order of descending points, 
    error: boolean, message: string } 
*/
export const getLeaderboard = async () => {
    try {
        const url = `${uri}/leaderboard`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status === 200) {
            const data = await response.json();
            return { error: false, message: 'Success', data };
        }
    } catch (error) {
        console.log(error);
    }
};
