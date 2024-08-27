const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	task: {
		type: [
			{
				name: String,
				video: {
					type: String,
					default:
						'https://res.cloudinary.com/drzygk5rc/video/upload/v1724618302/LizMotors/agaujdstweqwnapurx9o.mp4',
				},
				time: Number,
				completed: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
					default: '',
				},
			},
			{
				name: String,
				video: {
					type: String,
					default:
						'https://res.cloudinary.com/drzygk5rc/video/upload/v1724618302/LizMotors/dyfs8uuwijhpwhqlguqt.mp4',
				},
				time: Number,
				completed: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
					default: '',
				},
			},
			{
				name: String,
				video: {
					type: String,
					default:
						'https://res.cloudinary.com/drzygk5rc/video/upload/v1724618299/LizMotors/glfh4hh7dq3dvsmyej7f.mp4',
				},
				time: Number,
				completed: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
					default: '',
				},
			},
		],
		default: [
			{
				name: 'Module 1: Safety with mask',
				video: 'https://res.cloudinary.com/drzygk5rc/video/upload/v1724618302/LizMotors/agaujdstweqwnapurx9o.mp4',
				time: 8,
				completed: false,
				description:
					'Wearing a mask reduces the spread of airborne illnesses by blocking respiratory droplets, protecting both you and those around you.\n Along with mask usage, regular handwashing and a healthy lifestyle further strengthen your defenses against infections. Together, these practices help keep you and your community safe.',
			},
			{
				name: 'Module 2: Stethoscope for Doctors',
				video: 'https://res.cloudinary.com/drzygk5rc/video/upload/v1724618302/LizMotors/dyfs8uuwijhpwhqlguqt.mp4',
				time: 16,
				completed: false,
				description:
					'Using a stethoscope is crucial for accurate diagnosis, as it allows healthcare professionals to listen to internal body sounds like heartbeats and lung activity. This helps in detecting abnormalities and assessing the overall health of patients.\n Regular cleaning of the stethoscope is essential to prevent cross-contamination and maintain hygiene. By ensuring the device is free of pathogens, healthcare providers can avoid spreading infections and uphold a sterile environment during patient examinations.',
			},
			{
				name: 'Module 3: Requirements of Gloves',
				video: 'https://res.cloudinary.com/drzygk5rc/video/upload/v1724618299/LizMotors/glfh4hh7dq3dvsmyej7f.mp4',
				time: 12,
				completed: false,
				description:
					'Wearing gloves in an operating theater is essential for maintaining a sterile environment and preventing the transfer of harmful bacteria and viruses. Gloves create a barrier between medical staff and patients, reducing the risk of infection and ensuring a safer surgical procedure.\n Additionally, gloves help protect medical professionals from exposure to potentially infectious materials, minimizing the risk of contamination and maintaining hygiene standards in critical situations.',
			},
		],
	},
})

module.exports = mongoose.model('Task', TaskSchema)
