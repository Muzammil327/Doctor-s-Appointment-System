import mongoose, { Document, Schema } from 'mongoose';

interface IDoctor extends Document {
  title: string;
  content: string;
}

const DoctorSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const DoctorModel = mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default DoctorModel;
