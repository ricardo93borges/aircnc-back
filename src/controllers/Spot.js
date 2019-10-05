const Spot = require(`../models/Spot`)
const User = require(`../models/User`)

module.exports = {

    async index(req, res) {
        try {
            const { tech } = req.query
            const spots = await Spot.find({ techs: tech })
            return res.status(200).json(spots)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },

    async store(req, res) {
        try {
            const { filename } = req.file
            const { company, techs, price } = req.body
            const { user_id } = req.headers

            const user = await User.findById(user_id)

            if (!user) return res.status(400).json({ error: 'User does not exists' })

            const spot = await Spot.create({
                user: user_id,
                thumbnail: filename,
                company,
                price,
                techs: techs.split(`,`).map(tech => tech.trim())
            })

            return res.status(201).json(spot)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}