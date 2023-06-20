const User = require('../models/Users');
const asyncHandler = require('express-async-handler');

const generatePal = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const randomNumber = Math.random();
        let chosenPal;
        if (randomNumber < 0.15) {
            chosenPal = 0;
        } else if (randomNumber < 0.3) {
            chosenPal = 1;
        } else if (randomNumber < 0.45) {
            chosenPal = 2;
        } else if (randomNumber < 0.6) {
            chosenPal = 3;
        } else if (randomNumber < 0.75) {
            chosenPal = 4;
        } else if (randomNumber < 0.82) {
            chosenPal = 5;
        } else if (randomNumber < 0.89) {
            chosenPal = 6;
        } else if (randomNumber < 0.96) {
            chosenPal = 7;
        } else if (randomNumber < 0.98) {
            chosenPal = 8;
        } else {
            chosenPal = 9;
        }
        user.palsCount[chosenPal] += 1;
        await user.save();
        res.status(200).json(chosenPal);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const sendPal = async (req, res) => {
    try {
        const { username, palNumber } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }
        const receiverArray = await User.find({ username: username });
        const receiver = receiverArray[0];
        if (!receiver) {
            res.status(401).json({ message: 'Friend not found!' });
            return;
        }
        if (palNumber > 9) {
            res.status(404).json({ message: 'Pal out of index!' });
            return;
        }
        if (user.palsCount[palNumber] < 1) {
            res.status(405).json({
                message: 'User does not have pal to send!',
            });
            return;
        }
        if (user.username === username) {
            res.status(406).json({
                message: 'Cannot send to yourself!',
            });
            return;
        }
        user.palsCount[palNumber] -= 1;
        receiver.palsCount[palNumber] += 1;
        updatedUser = await user.save();
        await receiver.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = { generatePal, sendPal };
