const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });

    res.status(200).send(tracks);
});

router.post('/tracks', async (req, res)=> {
    const { name, locations } = req.body;

    if (!name || !locations) res.status(422).send({ error: "Name and locations must be provided" });

    const track = new Track({ name, locations, userId: req.user._id });

    try {
        await track.save();
        res.status(201).send(track)
    } catch(err) {
        res.status(422).send({error: err.message})
    };
});

module.exports = router;
