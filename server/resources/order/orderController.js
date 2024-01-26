const { OrderModel } = require("./orderModel");
const { ProductModel } = require("../product/productModel");

const getAllOrders = async (req, res) => {
  const query = req.session.isAdmin ? {} : { customerId: req.session._id };
  const orders = await OrderModel.find(query).populate("customerId");
  res.status(200).json(orders);
};

const getOrder = async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
    .populate("customerId")
    .populate("orderItems.product")
    .populate("shippingMethod");
  if (
    !req.session.isAdmin &&
    req.session._id.toString() !== order.customerId._id.toString()
  ) {
    return res
      .status(403)
      .json("You don not have permissions to perform this request");
  }
  res.status(200).json(order);
};

const addOrder = async (req, res) => {
  try {
    // Minska lagersaldot på beställda produkter
    for (const orderItem of req.body.orderItems) {
      let product = await ProductModel.findById(orderItem.product);

      if (product) {
        product.inStock -= orderItem.quantity;
        orderItem.price = product.price * orderItem.quantity;
        await product.save();
      }
    }

    const order = new OrderModel({
      ...req.body,
      //kan behöva använda req.session.email istället för req.session._id
      customerId: req.session._id,
      orderNumber: Math.floor(Math.random() * 1000000),
    });

    await order.save();
    // res.status(201).json(order);
    console.log("Order created successfully");
    // Return order och orderNumber
    return { status: 201, order, orderNumber: order.orderNumber };
  } catch (err) {
    console.error("Error adding order:", err);
    // res.status(500).json({ error: "Failed to add order." });
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  addOrder,
};
