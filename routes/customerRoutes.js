const router = require("express").Router();
const { getSalonList, getSalon } = require("../controllers/salonControllers");
const { listSalonServices } = require("../controllers/serviceControllers");
const { addQueue, getMyBooking, skipMyTurn, cancelMyBooking } = require("../controllers/queueControllers");

router.get("/salons", getSalonList);
router.get("/salons/:salonId", getSalon);
router.get("/salons/:salonId/services", listSalonServices);
router.post("/salons/:salonId/queue", addQueue);
router.get("/me/booking", getMyBooking);
router.post("/me/booking/skip", skipMyTurn);
router.delete("/me/booking", cancelMyBooking);

module.exports = router;