const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const Customer = require("./models/Customer");
const {register} = require("./controllers/customerControllers")
const {salonRegister,getSalonList} = require("./controllers/salonControllers")
const {serviceRegister} = require ("./controllers/serviceControllers")
const {addQueue,removeQueue,getSalonQueue} = require("./controllers/queueControllers")
const cors = require("cors");



dotenv.config(); 


const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json());

// routes/auth.routes.js
router.post("/register", registerCustomer);
router.post("/register/salon", registerSalon);
router.post("/login", login);

// routes/customer.routes.js
router.get("/salons", listSalons);
router.get("/salons/:salonId", getSalon);
router.get("/salons/:salonId/services", listSalonServices);
router.post("/salons/:salonId/queue", joinQueue);
router.get("/me/booking", getMyBooking);
router.post("/me/booking/skip", skipMyTurn);
router.delete("/me/booking", cancelMyBooking);

// routes/owner.routes.js
router.get("/profile", getOwnerProfile);
router.patch("/salon", updateSalonStatus);
router.get("/queue", getOwnerQueue);
router.post("/queue", addWalkIn);
router.patch("/queue/:entryId/start", startEntry);
router.patch("/queue/:entryId/complete", completeEntry);
router.delete("/queue/:entryId", removeEntry);
router.get("/services", listOwnerServices);
router.post("/services", createService);
router.patch("/services/:serviceId", updateService);
router.delete("/services/:serviceId", deleteService);

// app.js (order matters)
app.get("/health", (req, res) => res.send("Queue Management API is running."));
app.use("/api/auth", authRoutes);
app.use("/api/owner", requireAuth, requireOwner, ownerRoutes);   // one line protects every owner route
app.use("/api", requireAuth, customerRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB didn't connect");
  });
