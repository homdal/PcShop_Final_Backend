import { Router } from "express";
import EshopError from "../error/error.js";
import Logger from "../logs/logger.js";
import Order from "../database/model/order.js";
import isEmployee from "../middleware/is_employee.js";
import { addOrder } from "../service/order_service.js";
import { validateOrder } from "../middleware/validation/index.js";
import { validateToken } from "../middleware/validate_token.js";
import { checkForUserId } from "../middleware/validate_token.js";
const router = Router();

router.get("/", isEmployee, async (req, res, next) => {
  try {
    const allOrders = await Order.find();
    if (!allOrders.length)
      throw new EshopError("No orders found in database", 404);
    res.json(allOrders);
  } catch (e) {
    next(e);
  }
});

router.get("/my-orders", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new EshopError("must be logged in", 401);
    const myOrders = await Order.find({ userId });
    if (!myOrders.length) {
      throw new EshopError("Orders not found", 404);
    }
    res.json(myOrders);
  } catch (e) {
    next(e);
  }
});

router.get("/:orderNum", async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderNum: req.params.orderNum });
    if (!order) throw new EshopError("Order not found", 404);
    res.json(order);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateOrder, checkForUserId, async (req, res, next) => {
  try {
    console.log(req.userId);
    const id = req.userId;
    const savedOrder = await addOrder(req.body, id);
    Logger.verbose("added a new order");
    res.json({ order: savedOrder });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", isEmployee, async (req, res, next) => {
  try {
    const { status } = req.body;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const order = await Order.findOne({ _id: req.params.id });
      if (!order) throw new EshopError("order not found", 404);
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: status } },
        { new: true }
      );
      res.json({ order: updatedOrder });
    }
  } catch (e) {
    next(e);
  }
});

export { router as orderRouter };
