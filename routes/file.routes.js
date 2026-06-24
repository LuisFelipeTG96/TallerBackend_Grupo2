import _express from "express";
import * as cfile from "../controllers/file.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = _express.Router();

router.post('/upload', authMiddleware.authMiddleware(), cfile.upload);
router.post('/uploadmem', authMiddleware.authMiddleware(), cfile.uploadmem);

export default router;
