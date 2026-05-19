import mongoose, { Schema, models, model } from "mongoose";

const ParticipantSchema = new Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },

  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
  },

  seed: Number,
  eliminated: { type: Boolean, default: false },
});

export default models.Participant ||
  model("Participant", ParticipantSchema);