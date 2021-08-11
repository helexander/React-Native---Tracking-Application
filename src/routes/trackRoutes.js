const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

// To ensure that all the request handlers attached to the router in this file will require the user to be signed in
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });

    res.send(tracks);
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(422).send({ error: 'You must provide a name and locations' });
    }

    try {
        const track = new Track({ userId: req.user._id, name: name, locations: locations });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;