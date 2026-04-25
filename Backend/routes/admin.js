const express = require("express");
const pool = require("../db/pool");
const result = require("../utils/result");
const{checkAuthorization} = require("../utils/auth");

const router = express.Router();

router.get