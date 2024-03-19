import { Router } from "express";
import User from "../database/model/user.js";
import EshopError from "../error/error.js";
import Logger from "../logs/logger.js";
import authService from "../service/auth_service.js";
import isAdmin from "../middleware/is_admin.js";
import { isUser } from "../middleware/is_user.js";
import isAdminOrUser from "../middleware/is_admin_or_user.js";
import { validateUser, createUser } from "../service/user_service.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation/index.js";

const router = Router();

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (!allUsers.length)
      throw new EshopError("No users found in database", 404);
    Logger.info("retrieved users");
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body);
    Logger.verbose("created new user");
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});
router.post(
  "/register-employee",
  isAdmin,
  validateRegistration,
  async (req, res, next) => {
    try {
      const saved = await createUser(req.body);
      Logger.verbose("created new employee user");
      res.status(201).json({ message: "Saved", user: saved });
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userTodelete = await User.findOne({ _id: id });
    if (!userTodelete)
      throw new EshopError("User to be deleted not found", 404);
    const deletion = await User.deleteOne({ _id: id });
    if (deletion.acknowledged) {
      Logger.verbose("deleted the user");
      return res.json(userTodelete);
    } else {
      throw new EshopError("Failed to delete user", 500);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
  req.body.password = await authService.hashPassword(req.body.password);

  const savedUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!savedUser) throw new EshopError("The user to be updated not found", 404);
  Logger.info("updated user");
  res.json(savedUser);
});

router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();
    if (!user) throw new EshopError("Requested user not found", 404);
    const { password, ...rest } = user;
    Logger.info("retrieved user");
    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const jwt = await validateUser(email, password);
    res.json(jwt);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const updateIsAdmin = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isAdmin: isAdmin } },
      { new: true }
    );
    if (!updateIsAdmin)
      throw new EshopError("User to be updated not found", 404);
    if (isAdmin) {
      Logger.info("changed to admin");
    } else if (!isAdmin) {
      Logger.info("changed to non-admin");
    }
    res.json(updateIsAdmin);
  } catch (e) {
    next(e);
  }
});

export { router as usersRouter };
