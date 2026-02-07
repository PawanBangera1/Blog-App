const router = require('express').Router();
const upload = require('../config/multer');

import {
    handleCreateBlog,
    handleGetAllBlogs,
    handleGetBlogById,
    handleUpdateBlog,
    handleDeleteBlog
} from '../controllers/blog';

router.post('/', upload.single('coverImage'), handleCreateBlog);
router.get('/', handleGetAllBlogs);
router.get('/:id', handleGetBlogById);
router.put('/:id', upload.single('coverImage'), handleUpdateBlog);
router.delete('/:id', handleDeleteBlog);

module.exports = router;