const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    serviceName: { type: String, required: true, trim: true },
    servicePrice: { type: Number, required: true, min: 0 },
    durationMin: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// fast lookup of a salon's services, and no duplicate names within a salon
serviceSchema.index({ salonId: 1, serviceName: 1 }, { unique: true });

module.exports = mongoose.model("Service", serviceSchema);
