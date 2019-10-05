const Spot = require(`../models/Spot`)

module.exports = {

    async show(req, res) {
        try {
            const { user_id } = req.headers
            const spots = await Spot.find({ user: user_id })
            return res.status(200).json(spots)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}