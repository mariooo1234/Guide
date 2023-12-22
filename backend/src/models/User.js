import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: false },
	patronymic: { type: String, required: false },
	age: { type: Number, required: false },
	address: { type: String, required: false },
	post: { type: String, required: false },
});
export default mongoose.model('User', UserModel);