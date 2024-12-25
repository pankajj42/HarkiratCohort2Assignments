const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const inp = require("../middleware/inputValidation");
const { Admin, User, Course } = require("../db");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const router = Router();

// Admin Routes
router.post("/signup", inp.verifyCredentials, async (req, res) => {
	// Implement admin signup logic
	const user = await Admin.findOne({ username: req.credentials.username });
	if (user) {
		res.status(401).json({
			message: "Admin already exists with this username",
		});
	} else {
		await Admin.create(req.credentials);
		res.json({ message: "Admin Created Successfully" });
	}
});

router.post("/signin", inp.verifyCredentials, async (req, res) => {
	// Implement admin signup logic
	const user = await Admin.findOne(req.credentials);
	if (user) {
		const obj = { username: user.username };
		const token = jwt.sign(obj, JWT_SECRET_KEY);
		res.json({ token });
	} else {
		res.status(411).json({ message: "Inavlid Username or Password" });
	}
});

router.use(inp.verifyAuthKey);
router.use(adminMiddleware);

router.post("/courses", inp.verifyCourseDetails, async (req, res) => {
	// Implement course creation logic
	const maxIdCourse = await Course.find({}).sort({ id: -1 }).limit(1);
	let id = 1;
	if (maxIdCourse[0]) id += maxIdCourse[0].id;
	const newCourse = await Course.create({ id, ...req.course });

	res.json({
		message: "Course created successfully",
		courseId: newCourse.id,
	});
});

router.get("/courses", async (req, res) => {
	// Implement fetching all courses logic
	const response = await Course.find({}, "-_id -__v");
	res.json({
		courses: response,
	});
});

module.exports = router;
