const zod = require("zod");

const credentialsSchema = zod.object({
	username: zod.string(),
	password: zod
		.string()
		.min(6, { message: "Password must be atleast 6 characters long" }),
});

const courseSchema = zod.object({
	title: zod.string(),
	description: zod.string(),
	price: zod.number().positive().safe(),
	imageLink: zod.string().url(),
});

const authKeySchema = zod.string("Invalid AuthKey").startsWith("Bearer ", {
	message: "Bearer prefix missing in Authorization token",
});

const courseIdSchema = zod.coerce.number().int().positive().safe();

function verifyCredentials(req, res, next) {
	const credentials = credentialsSchema.safeParse({
		username: req.body.username,
		password: req.body.password,
	});
	if (credentials.success) {
		req.credentials = credentials.data;
		next();
	} else {
		res.status(403).json({ message: credentials.error.message });
	}
}

function verifyCourseDetails(req, res, next) {
	const course = courseSchema.safeParse({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		imageLink: req.body.imageLink,
	});
	if (course.success) {
		req.course = course.data;
		next();
	} else {
		res.status(403).json({ message: course.error.message });
	}
}

function verifyAuthKey(req, res, next) {
	const authKey = authKeySchema.safeParse(req.headers.authorization);
	if (authKey.success) {
		req.token = authKey.data.slice(7);
		next();
	} else {
		res.status(403).json({ message: authKey.error.message });
	}
}

function verifyCourseId(req, res, next) {
	const courseId = courseIdSchema.safeParse(req.params.courseId);
	if (courseId.success) {
		req.courseId = courseId.data;
		next();
	} else {
		res.status(403).json({ message: courseId.error.message });
	}
}

module.exports = {
	verifyCredentials,
	verifyCourseDetails,
	verifyAuthKey,
	verifyCourseId,
};
