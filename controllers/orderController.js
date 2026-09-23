import orderModel from "../models/orderModel.js";

// CREATE ORDER CONROLLER
export const createOrderController = async (req, res) => {
  try {
    const { buyer, products, amount, name, phone, address } = req.body;

    if (!buyer || !products || !amount || !address) {
      return res
        .status(400)
        .send({ success: false, message: "Required Fields Missing" });
    }
    const order = await orderModel.create({
      buyer,
      products,
      amount,
      name,
      phone,
      address,
      paymentMethod: "COD",
      paymentStatus: "Pending",
    });
    return res
      .status(201)
      .send({ success: true, message: "Order Created Successfully", order });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error While Creating Order" });
  }
};

// CONFIRM ORDER
export const confirmOrderController = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "COD Confirmed" },
      { new: true }
    );

    return res
      .status(201)
      .send({ success: true, message: "COD Confirmed", order });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Erro While Updating Payment Status" });
  }
};

// GET MY ORDERS
export const getMyOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ $or: [{ buyer: req.user._id }, { user: req.user._id }] })
      .populate({ path: "products.product", select: "name price slug image" })
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(401).send({
        success: false,
        message: "Orders Not Found",
      });
    }

    return res
      .status(201)
      .send({ success: true, message: "Orders Fetched Successfully", orders });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting My Orders",
      error,
    });
  }
};

// GET ORDER BY ID CONTROLLER

export const getOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const order = await orderModel
      .findById(id)
      .populate({ path: "products.product", select: "name price slug image" });

    if (!order) {
      return res.status(500).send({
        success: false,
        message: "Order not found",
      });
    }

    // Security: allow only owner (buyer/user) or admin (if you check admin elsewhere)
    if (
      order.buyer?.toString() !== userId?.toString() &&
      order.user.toString() !== userId.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return res
      .status(200)
      .send({ success: true, message: "Order fetched successfully", order });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch order",
      error,
    });
  }
};
