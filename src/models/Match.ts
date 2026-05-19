import mongoose, { Schema } from "mongoose";

const MatchSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
  },

  round: Number,

  player1: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    default: null,
  },

  player2: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    default: null,
  },

  winner: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    default: null,
  },

  status: {
    type: String,
    default: "pending",
  },

  /* 🔥 IMPORTANTE */
  nextMatchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    default: null,
  },

  nextMatchSlot: {
    type: Number, // 1 o 2
    default: null,
  },
});

export const Match =
  mongoose.models.Match || mongoose.model("Match", MatchSchema);