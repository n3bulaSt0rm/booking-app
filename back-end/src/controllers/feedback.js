const Feedback = require('../adapter/repositories/mongo/models/feedback');
const Place = require('../adapter/repositories/mongo/models/place')

class FeedbackController {
    //[POST] /place/:id/feedback
    async addFeedback(req, res) {
        const { id } = req.params;      // id place
        try {
            const {comment, rate, date } = req.body;
            const feedback = await Feedback.create({
                comment,
                rate,
                date,
                user: req.user.id, 
            });
            const place = await Place.findByIdAndUpdate(
                id, // ID của Place
                { $push: { feedbacks: feedback._id } }, 
                { new: true } 
            );
            if (!place) {
                return res.status(400).json({ message: 'không có place với id này' });
            }
            res.json(feedback);
        } catch (err) {
            res.status(500).json({ message: 'Có lỗi xảy ra khi tạo feedback', error: err.message });
        }
    }


    //[Get] /place/:id/feedback
    async getFeedbacks(req, res) {
        const { id } = req.params;      //id place
        try {
            const place = await Place.findById(id).populate({
                path: 'feedbacks', 
                populate: {
                    path: 'user', 
                    select: 'firstName lastName email' // truong muon lay
                }
            });
            if (!place) {
                return res.status(400).json({ message: 'Place không tồn tại' });
            }
            if (!Array.isArray(place.feedbacks) || place.feedbacks.length === 0) {
                return res.json([]); 
            }
            res.json(place.feedbacks);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi truy xuất feedback', error });
        }
    }

    //[DELETE] /place/:id/feedback/:id_feedback
    async deleteFeedback(req, res) {
        const { id, id_feedback } = req.params;
        try{
            const place = await Place.findByIdAndUpdate(
                id,
                { $pull: { feedbacks: id_feedback } }, 
                { new: true }
            );
            if (!place) {
                return res.status(400).json({ message: 'không tìm thấy place' });
            }
            const feedback = await Feedback.delete({ _id: id_feedback });
            if (feedback.deletedCount === 0) {
                return res.status(400).json({ message: 'không tìm thấy feedback' });
            }
    
            res.json({ message: 'Feedback đã được xóa thành công' });
        }catch (error) {
            res.status(500).json({ message: 'Lỗi khi truy xuất feedback', error });
        }
    }
    
}

module.exports = new FeedbackController();
