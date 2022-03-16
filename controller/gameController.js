<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
=======
const Game = require("../Models/Game");
>>>>>>> 50fd43af268ba6a3ddf64a4f2f0565badf75d359

//get leaderboard
async function leaderboard(req, res) {
  try {
    const leaderboard = await Game.leaderboard;
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json(err);
  }
}

//games index
async function index(req, res) {
  try {
    const games = await Game.all;
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
}

//create lobby
async function create(req, res) {
  try {
    const lobbyName = req.body.name;
    const hostUsername = req.body.host;
    const options = req.body.options;
    const game = await Game.createGame(lobbyName, hostUsername, options);
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json(err);
  }
}

//join lobby
async function join(req, res) {
  let errorStatus;
  try {
    errorStatus = 404;
    const game = await Game.findById(req.params.id);

    errorStatus = 500;
    await game.joinGame(req.body.username);

    res.status(200).json(game);
  } catch (err) {
    res.status(errorStatus).json(err);
  }
}

//restart game
async function restart(req, res) {
  let errorStatus;
  try {
    errorStatus = 404;
    const game = await Game.findById(req.params.id);

    errorStatus = 500;
    await game.startGame();

    res.status(200).json(game);
  } catch (err) {
    res.status(errorStatus).json(err);
  }
}

async function deleteGame(req, res) {
  let errorStatus;
  try {
    errorStatus = 404;
    const game = await Game.findById(req.params.id);

    errorStatus = 500;
    await game.delete();

    res.status(204).send();
  } catch (err) {
    res.status(errorStatus).json(err);
  }
}

module.exports = {
  leaderboard, index, create, join, restart, deleteGame
};
