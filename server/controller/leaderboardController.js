const User = require('../models/Users');
const asyncHandler = require('express-async-handler');

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find(
            {},
            { username: 1, points: 1 }
        ).sort({
            points: -1,
        });
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = { getLeaderboard };
