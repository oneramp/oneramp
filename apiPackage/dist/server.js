"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewareHandlers/errorHandler");
const offrampRoute_1 = __importDefault(require("./routes/offrampRoute"));
const routes_1 = __importDefault(require("./routes/routes"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
(0, connectDB_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("this is the home page, Welcome");
});
//implementation of routing
app.use("/api", offrampRoute_1.default);
app.use("/api", routes_1.default);
app.use(errorHandler_1.errorHandler);
app.use(errorHandler_1.notFound);
const PORT = 4000;
// testa();
// test();
app.listen(PORT, () => console.log(`app is running in development mode on port 4000`));
