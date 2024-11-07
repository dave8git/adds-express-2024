const express = require('express');
const router = express.Router();
//const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const Posts = require('../models/posts.model');
const { default_type } = require('mime');

exports.getAll = async (req, res) => {

      try {
        res.json(await Posts.find());
      }
      catch(err) {
        res.status(500).json({ message: err });
      };
  };

exports.getById = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) return res.status(404).json({ message: 'Ad not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.postAd = async (req, res ) => {
    try {
        const { title, content, date, image, price, location, seller } = req.body; 
        const newPost = new Posts({ title, content, date, image, price, location, seller })
        await newPost.save(); 
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

exports.putAd = async (req, res) => {
    try {
        const updatedPost = await PostsControllers.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Ad not found' });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteAd = async ( req, res ) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id); 
        if (!deletedPost) return res.status(404).json({ message: 'Ad not found '});
        res.json({ message: 'Ad deleted', post: deletedPost });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.searchPhrase = async ( req, res ) => {
    try {
        const searchPhrase = req.params.searchPhrase;
        const posts = await Posts.find({
            $or: [
                { title: { $regex: searchPhrase, $options: 'i' }},
                { content: { $regex: searchPhrase, $options: 'i' }}
            ]
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
