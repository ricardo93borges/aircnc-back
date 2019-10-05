const User = require(`../models/User`)

module.exports = {
    async store(req, res) {
        try {
            const { email } = req.body

            let user = await User.findOne({ email })

            if (!user) {
                user = await User.create({ email })
            }

            return res.status(201).json(user)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}