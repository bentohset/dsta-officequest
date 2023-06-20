const User = require('../models/Users');
const Quest = require('../models/Quests');
const asyncHandler = require('express-async-handler');

const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error('user Not Found');
    }
    res.status(200).json(user);
};

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error('User Not Found');
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
};

const getUserPoints = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const userPoints = await User.findById(req.params.id).select('points');
        res.status(200).json(userPoints);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const updateUsername = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const { username } = req.body;
        if (!username) {
            res.status(401).json({ message: 'No username given!' });
            return;
        }
        user.username = username;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ messsage: error });
    }
};

const getQuests = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const quests = await Quest.find();
        const questsWithCompleted = quests.map((quest) => {
            const completed = quest.completedUsers.includes(req.params.id);
            return { ...quest.toObject(), completed };
        });
        res.status(200).json(questsWithCompleted);
    } catch (error) {
        res.status(500).json({ messasge: error });
    }
};

const completeQuest = async (req, res) => {
    try {
        const { userId, questId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const quest = await Quest.findById(questId);
        if (!quest) {
            res.status(401).json({ message: 'Quest not found!' });
            return;
        }
        if (quest.completedUsers.includes(userId)) {
            res.status(405).json({ message: 'Quest already comepleted' });
            return;
        }
        if (!quest.completedUsers.includes(userId)) {
            quest.completedUsers.push(userId);
        }
        //add the quest points to user points
        user.points += quest.points;
        await quest.save();
        await user.save();
        res.status(200).json(quest);
    } catch (error) {
        res.status(500).json({ messasge: error });
    }
};

const getUserPals = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const userPals = await User.findById(req.params.id).select('palsCount');
        res.status(200).json(userPals);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const completeQuiz = async (req, res) => {
    const { userId, points } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).end('User not found');
        }
        const quest = await Quest.findOne({ type: 'quiz' });
        if (!quest) {
            return res.status(404).end('No Quiz');
        }
        if (!quest.completedUsers.includes(userId)) {
            quest.completedUsers.push(userId);
        }
        user.points += quest.points;
        await quest.save();
        await user.save();
        return res.status(200).json(quest);
    } catch (error) {
        console.log(error);
    }
};

const getPrizeClaimed = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const prizeClaimedArray = await User.findById(req.params.id).select(
            'prizeClaimed'
        );
        res.status(200).json(prizeClaimedArray);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const claimPrize = async (req, res) => {
    try {
        const { level } = req.body;
        if (level > 10 || level < 1) {
            res.status(405).json({ message: 'Level out of index!' });
            return;
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const prizeClaimedArray = user.prizeClaimed;
        if (prizeClaimedArray[level - 1] === 1) {
            res.status(404).json({ message: 'Prize already claimed' });
            return;
        }
        prizeClaimedArray[level - 1] = 1;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    getUserPoints,
    updateUsername,
    getQuests,
    completeQuest,
    getUserPals,
    completeQuiz,
    claimPrize,
    getPrizeClaimed,
};
