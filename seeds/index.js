const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("WE ARE CONNECTED!!");
});

const pickFromArraySample = (array) =>
	array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "60456c912ae2180701272d33",
			geometry: { type: "Point", coordinates: [-114.3346, 48.4108] },
			location: `${cities[random].city}, ${cities[random].state}`,
			title: `${pickFromArraySample(descriptors)} ${pickFromArraySample(
				places
			)}`,
			images: [
				{
					url:
						"https://res.cloudinary.com/dsdpbowkr/image/upload/v1615303988/YelpCamp/zxxsiqmygrwndsiiwsed.jpg",
					filename: "YelpCamp/zxxsiqmygrwndsiiwsed",
				},
			],
			description:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed magnam est nulla delectus natus fugit nesciunt voluptatum doloribus consequuntur assumenda ipsam qui obcaecati aliquam aspernatur, illum, praesentium laudantium accusamus dolorum quas iste, sequi quod. Possimus dolores dolor vero numquam laborum.",
			price: price,
		});
		await camp.save();
	}
};

seedDb().then(() => {
	mongoose.connection.close();
});
