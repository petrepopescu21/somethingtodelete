const express = require("express")
const app = express()
const testmod = require("./testcode");

app.get("/", (req, res) => {
	res.send("Yup");
});

app.get("/test", (req, res) => {
	testmod.test()
		.then((data) => {
			console.log(data);
			res.status(200).send(data);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
})


app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 3000!'))