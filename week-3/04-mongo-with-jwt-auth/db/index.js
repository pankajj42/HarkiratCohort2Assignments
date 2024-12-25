const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
	"mongodb+srv://pankajjangid42:PkYNbYg4Y8GQDFuc@clusterdemo.7i9a2.mongodb.net/w4JWT_Auth"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
	// Schema definition here
	username: String,
	password: String,
});

const UserSchema = new mongoose.Schema({
	// Schema definition here
	username: String,
	password: String,
	purchasedCourses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

const CourseSchema = new mongoose.Schema({
	// Schema definition here
	title: String,
	description: String,
	price: Number,
	imageLink: String,
	id: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
	Admin,
	User,
	Course,
};
