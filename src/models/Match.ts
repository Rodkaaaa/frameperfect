import mongoose, { Schema, models, model } from "mongoose";

const MatchSchema = new Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
  },

  player1: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },

  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },

  round: Number,
  pool: String,

  score1: Number,
  score2: Number,

  status: {
    type: String,
    enum: ["pending", "playing", "finished"],
    default: "pending",
  },
});

export default models.Match || model("Match", MatchSchema);
