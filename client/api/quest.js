import Constants from 'expo-constants';

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;
// do this to tunnel physical device to localhost server

/*
Creates Quest
@Params: title, description, type, points, startDate (not required), endDate(not required)
@return: { data: Quest object, message: string, error: boolean }
*/
export const createQuest = async (
    title,
    description,
    type,
    points,
    startDate,
    endDate
) => {
    try {
        const url = `${uri}/quests`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                type: type,
                points: points,
                startDate: startDate,
                endDate: endDate,
            }),
        });
        if (response.status === 400) {
            return {
                error: true,
                message: 'Please provide a title/ desc/ type/ points',
            };
        }
        if (response.status === 401) {
            return { error: true, message: 'Type must be qr/quiz/daily' };
        }
        if (response.status === 500) {
            return { error: true, message: 'Server is down' };
        }
        if (response.status === 200) {
            const data = await response.json();
            //console.log(data)
            return { error: false, message: 'Success', data };
        }
    } catch (error) {
        console.log(error);
    }
};

/*
Get all quests
@return: { data: Array of Quest objects, message: string, error: boolean }
*/
export const getQuests = async () => {
    try {
        const url = `${uri}/quests`;
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
            //console.log(data)
            return { error: false, message: 'Success', data };
        }
    } catch (error) {
        console.log(error);
    }
};

export const resetQuests = async (userId) => {
    try {
        const url = `${uri}/quests/resetquests`;
        console.log(userId);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};
