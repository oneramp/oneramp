"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offramp_1 = require("../controllers/offramp");
const router = (0, express_1.Router)();
router.post('/offramp', offramp_1.offRampCreated);
router.get('/offramp', offramp_1.getTransactions);
router.get('/', (req, res) => {
    res.send('seen you too');
});
exports.default = router;
