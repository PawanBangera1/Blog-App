const Blog = require('../models/blog');

async function handleCreateBlog(req, res) {
    const { title, content } = req.body;
    const coverImageURL = req.file ? `/uploads/${req.file.filename}` : '';
    
    try {
        const newBlog = new Blog({
            title,
            content,
            coverImageURL,
            createdBy: req.user.id
        });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ message: 'Server error while creating blog' });
    }
}

async function handleGetBlogs(req, res) {
    try {
        const blogs = await Blog.find().populate('createdBy', 'name email');
        res.status(200).json({ blogs });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ message: 'Server error while fetching blogs' });
    }
}

async function handleGetBlogById(req, res) {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id).populate('createdBy', 'name email');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ blog });
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({ message: 'Server error while fetching blog' });
    }
}

async function handleUpdateBlog(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const coverImageURL = req.file ? `/uploads/${req.file.filename}` : '';
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this blog' });
        }
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        if (coverImageURL) {
            blog.coverImageURL = coverImageURL;
        }
        await blog.save();
        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ message: 'Server error while updating blog' });
    }
}

async function handleDeleteBlog(req, res) {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this blog' });
        }
        await blog.remove();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ message: 'Server error while deleting blog' });
    }
}

module.exports = {
    handleCreateBlog,
    handleGetBlogs,
    handleGetBlogById,
    handleUpdateBlog,
    handleDeleteBlog
};