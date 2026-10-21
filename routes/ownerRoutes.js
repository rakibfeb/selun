const router = require("express").Router();
const { getOwnerProfile, updateSalonStatus } = require("../controllers/salonControllers");
const { listOwnerServices, createService, updateService, deleteService } = require("../controllers/serviceControllers");
const { getOwnerQueue, addWalkIn, startEntry, completeEntry, removeEntry } = require("../controllers/queueControllers");

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

module.exports = router;