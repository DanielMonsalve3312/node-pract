const express = require('express');
const crypto = require("node:crypto");
const cors = require("cors");

const users = require('./data.json');
const { validateUserSchema, validatePartialUserSchema } = require('./schema');

const PORT = process.env.PORT ?? 3000;

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors((origin, callback) => {
    const ACCEPTED = ['http://localchost:3000']

    if (ACCEPTED.includes(origin) || origin) {
        return callback(null, true)
    } 

    return callback(new Error("Allow CORS"))
}));

app.get("/users", (req, res) => {
    const {gender} = req.query;
    if (gender) {
        filterUsers = users.filter(user => user?.gender === gender);
        res.send(filterUsers)
    } else {
        res.send(users)
    }
});

app.get("/users/:id", (req, res) => {
    const currentUser = users?.find(user => user?.id === Number(req.params.id));

    if (currentUser) {
        res.send(currentUser)
    } else {
        res.status(404).send({message: "The user that you intent search don't exist"});
    }
});

app.post("/users", (req, res) => {
    const validationResult = validateUserSchema(req.body);

    if (validationResult.error) {
        res.status(400).json({ error: JSON.parse(validationResult.error.message) })
    }

    const newUser = {
        ...validationResult.data,
        id: crypto.randomUUID(),
    }

    res.status(201).json(newUser);
});

app.patch('/users/:id', (req, res) => {
    const itemIdx = users.findIndex(user => user.id === Number(req.params.id))

    if (itemIdx < 0) {
        return res.status(404).json({message: "404 not found"})
    }

    const user = users[itemIdx];
    const information = validatePartialUserSchema(req.body);

    if (information.error) {
        return res.status(400).json({message: JSON.parse(information?.error?.message)})
    }

    const updatedUser = {
        ...user,
        ...information.data,
    }

    res.status(201).json(updatedUser);
});

app.listen(PORT, () => {
    console.log("http://localhost:3000")
})