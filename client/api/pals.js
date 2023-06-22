import Constants from 'expo-constants';

const { manifest } = Constants;

const uri = `http://10.50.192.241:3001`;
// do this to tunnel physical device to localhost server

/*
Generates a Pal randomly and returns the index of the generated pal
@Params: userId: string
@Return: { data: palNumber: number, message: string, error: boolean }
*/
export const generatePal = async (userId) => {
    try {
        const url = `${uri}/pals/${userId}/generate-pal`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 400) {
            return { error: true, message: 'User not found' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status === 200) {
            const data = await response.json();
            //console.log(data);
            return { error: false, message: 'Success', data };
        }
    } catch (error) {
        console.log(error);
    }
};

/*
Sends a pal to another user
palNumber is the number of the corresponding index in user palsCount array 
username is the username of the receiver
@Params: userId: string, username: string, palNumber: number
@Return: { data:user object of sender, message: string, error: boolean }
*/
export const sendPal = async (userId, username, palNumber) => {
    try {
        const url = `${uri}/pals/${userId}/send-pal`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                palNumber: palNumber,
            }),
        });
        if (response.status === 404) {
            return { error: true, message: 'Pal out of index' };
        }
        if (response.status === 405) {
            return { error: true, message: 'User does not have pal to send' };
        }
        if (response.status === 406) {
            return { error: true, message: 'Cannot send to youself' };
        }
        if (response.status === 400) {
            return { error: true, message: 'User not found' };
        }
        if (response.status === 401) {
            return { error: true, message: 'Friend not found' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status === 200) {
            const data = await response.json();
            //console.log(data);
            return { error: false, message: 'Success', data };
        }
    } catch (error) {
        console.log(error);
    }
};
