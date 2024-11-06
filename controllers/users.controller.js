const express = require('express');
const router = express.Router();
//const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const Users = require('../models/users.model');
const { default_type } = require('mime');

exports.getAll = async (req, res) => {

      try {
        res.json(await Users.find());
      }
      catch(err) {
        res.status(500).json({ message: err });
      };
  };