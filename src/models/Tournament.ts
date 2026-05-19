import mongoose, { Schema, models, model } from "mongoose";

const TournamentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    game: {
      type: String,
      required: true,
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],

    maxPlayers: {
      type: Number,
      default: 8,
    },

    status: {
      type: String,
      enum: ["draft", "open", "running", "finished"],
      default: "draft",
    },

    startDate: Date,
  },
  { timestamps: true },
);

export const Tournament =
  models.Tournament || model("Tournament", TournamentSchema);
