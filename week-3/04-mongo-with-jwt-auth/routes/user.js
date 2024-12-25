const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const inp = require("../middleware/inputValidation");
const { Admin, User, Course } = require("../db");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const router = Router();

// User Routes
router.post("/signup", inp.verifyCredentials, async (req, res) => {
	// Implement user signup logic
	const user = await User.findOne({ username: req.credentials.username });
	if (user) {
		res.status(401).json({
			message: "User already exists with this username",
		});
	} else {
		await User.create(req.credentials);
		res.json({ message: "User Created Successfully" });
	}
});

router.post("/signin", inp.verifyCredentials, async (req, res) => {
	// Implement user signin logic
	const user = await User.findOne(req.credentials);
	if (user) {
		const obj = { username: user.username };
		const token = jwt.sign(obj, JWT_SECRET_KEY);
		res.json({ token });
	} else {
		res.status(411).json({ message: "Inavlid Username or Password" });
	}
});

router.use(inp.verifyAuthKey);
router.use(userMiddleware);

router.get("/courses", async (req, res) => {
	// Implement listing all courses logic
	const response = await Course.find({}, "-_id -__v");
	res.json({
		courses: response,
	});
});

router.post("/courses/:courseId", inp.verifyCourseId, async (req, res) => {
	// Implement course purchase logic
	const course = await Course.findOne({ id: req.courseId });
	if (course) {
		await User.updateOne(
			{
				username: req.username,
			},
			{
				$push: {
					purchasedCourses: course._id,
				},
			}
		);
		res.json({
			message: "Purchase complete!",
		});
	} else {
		res.status(411).json({
			message: `Course with id ${req.courseId} does not exist`,
		});
	}
});

router.get("/purchasedCourses", async (req, res) => {
	// Implement fetching purchased courses logic
	const user = await User.findOne({
		username: req.username,
	});
	const courses = await Course.find(
		{
			_id: {
				$in: user.purchasedCourses,
			},
		},
		"-_id -__v"
	);
	res.json({
		courses: courses,
	});
});

module.exports = router;
