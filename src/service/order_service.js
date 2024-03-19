import Order from "../database/model/order.js";

const addOrder = async (data, userId) => {
  const order = new Order(data);
  if (userId) {
    order.userId = userId;
  }
  while (true) {
    const random = Math.floor(Math.random() * 10000);
    const check = await Order.findOne({ orderNum: random });
    if (!check) {
      order.orderNum = random;
      break;
    }
  }
  order.status = "pending";
  return order.save();
};

export { addOrder };
