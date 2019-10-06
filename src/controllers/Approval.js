const Booking = require(`../models/Booking`)

module.exports = {

    async store(req, res) {
        try {
            const { booking_id } = req.params

            const booking = await Booking.findById(booking_id).populate('spot')

            if (!booking) return res.status(400).json({ error: 'Booking does not exists' })

            booking.approved = true
            await booking.save()

            const bookingUserSocket = req.connectedUsers[booking.user]
            if (bookingUserSocket) {
                req.io.to(bookingUserSocket).emit('booking_response', booking)
            }

            return res.status(200).json(booking)

        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}