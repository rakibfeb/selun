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

    // services: [
    //   {
    //     serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    //     serviceName: { type: String, required: true },
    //     durationMin: { type: Number, required: true },
    //     servicePrice: { type: Number, required: true },
    //   },
    // ],

    queueStatus: {
      type: String,
      enum: ["waiting", "in-progress", "completed", "cancelled", "skipped"],
      default: "waiting",
    },

    sortKey: { type: Number, required: true}, // from the salon's atomatic count
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: "Barber" },

    joinedAt: { type: Date, default: Date.now },
    startedAt: Date,
    finishedAt: Date,
  },
  { timestamps: true },
);

// fast ordered queue reads per salon
// QueueSchema.index({ salonId: 1, queueStatus: 1, sortKey: 1 });

// sortKey must be unique within a salon (not across salons)
QueueSchema.index({ salonId: 1, sortKey: 1 }, { unique: true });

// one active spot per customer, across all salons
QueueSchema.index(
  { customerId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      customerId: { $exists: true },
      queueStatus: { $in: ["waiting", "in-progress"] },
    },
  },
);

module.exports = mongoose.model("Queue", QueueSchema);
