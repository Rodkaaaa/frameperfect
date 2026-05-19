import mongoose, { Schema, models, model } from "mongoose";

const PlayerSchema = new Schema(
  {
    gamerTag: {
      type: String,
      required: true,
      unique: true,
    },

    country: String,

    avatar: String,

    elo: {
      type: Number,
      default: 1000,
    },

    wins: {
      type: Number,
      default: 0,
    },

    losses: {
      type: Number,
      default: 0,
    },

    tournamentsPlayed: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["player", "organizer", "admin"],
      default: "player",
    },
  },
  { timestamps: true },
);

export const Player = models.Player || model("Player", PlayerSchema);
