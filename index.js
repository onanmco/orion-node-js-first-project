const express = require("express");
const app = express();
const yup = require("yup");


const schema = yup.object({
    title: yup.string().required(),
    author: yup.string().required(),
    post_body: yup.string().required()
});

app.use(express.json());

app.post("/hello", (req, res) => {
    const { name } = req.body;
    res.send(`Hello ${name}`);
});

app.post("/posts", (req, res) => {
    const body = req.body;

    try {
        schema.validateSync(body, { abortEarly: false })
    } catch(err) {
        res.status(400).json({
            timestamp: Math.floor(Date.now() / 1000),
            message: "Bad Request",
            details: err.errors
        });
    }

    res.status(200).send();
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});