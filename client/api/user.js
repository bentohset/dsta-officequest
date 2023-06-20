import Constants from 'expo-constants';

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;
// do this to tunnel physical device to localhost server

/*
Returns the points of a user 
@Params: userId: string
@return: { data: number(points), message: string, error: boolean}
*/
export const getUserPoints = async (userId) => {
    try {
        const url = `${uri}/users/${userId}/points`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 400) {
            return { error: true, message: 'User does not exist' };
        }
        if (response.status === 200) {
            const data = await response.json();
            //console.log(data)
            return { data: data.points, error: false, message: 'Success' };
        }
    } catch (error) {
        console.log(error);
    }
};

/*
Changes the username of the user
@Params: userId: string, username: string
@return: { data: User object, message: string, error: boolean}
*/
export const changeUsername = async (userId, username) => {
    try {
        const url = `${uri}/users/${userId}/update-username`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            }),
        });
        if (response.status === 400) {
            return { error: true, message: 'User does not exist' };
        }
        if (response.status === 401) {
            return { error: true, message: 'No username given' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status === 200) {
            const data = await response.json();
            //console.log(data)
            return { data: data, error: false, message: 'Success' };
        }
    } catch (error) {
        console.log(error);
    }
};

/*
Returns the quests of a user
@Params: userId: string
@return: { data: Array of Quest Objects + "completed" boonlean field appended to each quest object. Use .completed to check for completion status,
error: boolean, message: string }
*/
export const getUserQuests = async (userId) => {
    try {
        const url = `${uri}/users/${userId}/quests`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 400) {
            return { error: true, message: 'User does not exist' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        const data = await response.json();
        //console.log(data)
        return { data: data, error: false, message: 'Success' };
    } catch (error) {
        console.log(error);
    }
};

/*
@Params: userId: string, questId: string
@return: { data: updated quest object, message: string, error: boolean }
*/
export const completeQuest = async (userId, questId) => {
    try {
        const url = `${uri}/users/${userId}/quests/${questId}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 400) {
            return { error: true, message: 'User not found' };
        }
        if (response.status === 401) {
            return { error: true, message: 'Quest not found' };
        }
        if (response.status === 405) {
            return { error: true, message: 'Quest already completed' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status == 200) {
            const data = await response.json();
            return { error: false, message: 'Success', data: data };
        }
        //console.log(data)
    } catch (error) {
        console.log(error);
    }
};

/*
Returns the points of a user
@Params: userId: string
@return: { data: palsCount: array, message: string, error: boolean }
*/
export const getUserPals = async (userId) => {
    try {
        const url = `${uri}/users/${userId}/pals`;
        const response = await fetch(url, {
            method: 'GET',
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
        if (response.status == 200) {
            const data = await response.json();
            return { error: false, message: 'Success', data: data.palsCount };
        }
    } catch (error) {
        console.log(error);
    }
};

export const completeQuiz = async (userId, points) => {
    try {
        const url = `${uri}/users/completequiz`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                points: points,
            }),
        });

        if (response.status === 400) {
            return { error: true, message: 'User not found' };
        }
        if (response.status === 404) {
            return { error: true, message: 'No Quiz' };
        }
        if (response.status === 200) {
            const data = await response.json();
            return { error: false, message: 'Success', data };
        }
    } catch (error) {
        console.log(error);
    }
};

/*
Get the prizeClaimed Array
@Param: userId
@Return An object with 3 fields { data: array, error: boolean, message: string }
*/
export const getPrizeClaimed = async (userId) => {
    try {
        const url = `${uri}/users/${userId}/prize-claimed`;
        const response = await fetch(url, {
            method: 'GET',
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
            //console.log(data.prizeClaimed);
            return {
                error: false,
                message: 'Success',
                data: data.prizeClaimed,
            };
        }
    } catch (error) {
        console.log(error);
    }
};

/*
Sets the prize in prizeClaimed Array to 1
@Param: userId, level number (1-indexed)
@Returns:{ data: User Object, error: boolean, message: string }
*/
export const claimPrize = async (userId, level) => {
    try {
        const url = `${uri}/users/${userId}/claim-prize`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level: level,
            }),
        });
        if (response.status === 400) {
            return { error: true, message: 'User not found' };
        }
        if (response.status === 404) {
            return { error: true, message: 'Prize is already claimed' };
        }
        if (response.status === 405) {
            return { error: true, message: 'Level out of index' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status === 200) {
            const data = await response.json();
            //console.log(data);
            return {
                error: false,
                message: 'Success',
                data: data,
            };
        }
    } catch (error) {
        console.log(error);
    }
};
