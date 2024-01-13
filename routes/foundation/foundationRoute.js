import {
  index,
  find,
  edit,
  update,
} from "../../controllers/foundation/foundationController.js";
import { upload } from "../../middlewares/index.js";
import { Router } from "express";

const router = Router();

router.get("/", index);
router.get("/edit", edit);
router.post(
  "/edit",
  upload.fields([
    { name: "newAvatar", maxCount: 1 },
    { name: "newCoverProfileImage", maxCount: 1 },
  ]),
  update
);
router.get("/:id", find);

export default router;
