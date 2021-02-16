const express = require("express");
const Accounts = require("./accounts-model");

const router = express.Router();

async function checkId(req, res, next) {
    const id = req.params.id;
    const idExists = await Accounts.getById(id);
    if (idExists) {
        next();
    } else {
        res.status(400).json({ message: "id doesnt exist" });
    }
}

function checkPayload(req, res, next) {
    const { name, budget } = req.body;
    if (name && budget) {
        next();
    } else {
        res.status(404).json({ message: "name and budget are required" });
    }
}

router.get("/", async (req, res, next) => {
    try {
        const data = await Accounts.get();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Accounts.getById(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post("/", checkPayload, async (req, res, next) => {
    try {
        const post = req.body;
        const data = await Accounts.create(post);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", checkId, checkPayload, async (req, res, next) => {
    try {
        const post = req.body;
        const id = req.params.id;
        const data = await Accounts.update(id, post);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Accounts.remove(id);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
