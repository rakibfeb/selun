const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema(
  {
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // optional for walk-ins
    walkInName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true }, // optional for walk-ins

    services: [
      {
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        name: { type: String, required: true },
        durationMin: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    queueStatus: {
      type: String,
      enum: ["waiting", "in-progress", "completed", "cancelled", "skipped"],
      default: "waiting",
    },

    sortKey: { type: Number, required: true }, // from the salon's atomic counter
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: "Barber" },

    joinedAt: { type: Date, default: Date.now },
    startedAt: Date,
    finishedAt: Date,
  },
  { timestamps: true },
);

// fast ordered queue reads per salon
QueueSchema.index({ salonId: 1, queueStatus: 1, sortKey: 1 });

// one active spot per customer, across all salons
QueueSchema.index(
  { customerId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      queueStatus: { $in: ["waiting", "in-progress"] },
    },
  },
);

module.exports = mongoose.model("Queue", QueueSchema);
