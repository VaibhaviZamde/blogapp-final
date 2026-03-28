import express from 'express';

// controllers
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';
import { loginUser, signupUser, logoutUser } from '../controller/user-controller.js';

// utils
import upload from '../utils/upload.js';

// ✅ CREATE ROUTER FIRST
const router = express.Router();


// ================= USER ROUTES =================
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);


// ================= TOKEN =================
router.post('/token', createNewToken);


// ================= POSTS =================
router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);


// ================= FILE UPLOAD =================
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);


// ================= COMMENTS =================
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);


// export
export default router;