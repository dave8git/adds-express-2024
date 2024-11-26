const express = require('express');
const router = express.Router();
//const db = require('./../db');
const getImageFileType = require('../config/getImageFileType');
const ObjectId = require('mongodb').ObjectId;
const Posts = require('../models/posts.model');
const { default_type } = require('mime');

exports.getAll = async (req, res) => {

    try {
        const posts = await Posts.find().populate('author', 'login avatar');
        //res.json(await Posts.find());
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ message: err });
    };
};

exports.getById = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id).populate('author', 'login avatar');
        if (!post) return res.status(404).json({ message: 'Ad not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postAd = async (req, res) => {
    try {
        const { title, content, date, price, location, seller, author } = req.body; // Include author in destructuring
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            const newPost = new Posts({
                title,
                content,
                date: date || new Date().toISOString(), // Add a default date if not provided
                image: req.file.filename,
                price,
                location,
                seller,
                author // Save the author reference
            });
            await newPost.save();
            res.status(201).json(newPost);
        } else {
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.putAd = async (req, res) => {
    try {
        const { title, content, price, location, seller, author } = req.body; // Include author in destructuring
        const updateFields = { title, content, price, location, seller, author };

        if (req.file) {
            updateFields.image = req.file.filename;
        }

        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Ad not found' });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Ad not found ' });
        res.json({ message: 'Ad deleted', post: deletedPost });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.searchPhrase = async (req, res) => {
    try {
        const searchPhrase = req.query.q; // Use query string parameter `q`
        if (!searchPhrase) {
            return res.status(400).json({ message: 'Search phrase is required' });
        }

        console.log('Search query received:', searchPhrase);

        const posts = await Posts.find({
            $or: [
                { title: { $regex: searchPhrase, $options: 'i' } },
                { content: { $regex: searchPhrase, $options: 'i' } },
            ],
        });

        if (posts.length === 0) {
            console.log('No posts found for query:', searchPhrase);
            return res.status(404).json({ message: 'No matching posts found' });
        }

        console.log('Posts found:', posts.length);
        res.json(posts);
    } catch (err) {
        console.error('Error in searchPhrase handler:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
