"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const pdf_1 = __importDefault(require("./apis/pdf"));
exports.app = (0, express_1.default)();
const PORT = 8080;
// Middleware
exports.app.use(express_1.default.json());
// Import API Routes
exports.app.use("/", pdf_1.default);
// Error Handling Middleware
exports.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
// Start the server
exports.app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
