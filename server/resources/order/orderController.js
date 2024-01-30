// Import
const { OrderModel } = require("./orderModel");
const { ProductModel } = require("../product/productModel");

// Get all orders based on user permissions
const getAllOrders = async (req, res) => {
  // Determine the query based on user role (admin or customer)
  const query = req.session.isAdmin ? {} : { customerId: req.session._id };

  // Fetch orders from the database, populating related fields
  const orders = await OrderModel.find(query)
    .populate("customerId")
    .populate("orderItems.product");
  res.status(200).json(orders);
};

// Get a specific order
const getOrder = async (req, res) => {
  // Fetch the order by ID, populating related fields
  const order = await OrderModel.findById(req.params.id)
    .populate("customerId")
    .populate("orderItems.product")
    .populate("shippingMethod");
  // Check user permissions for accessing the order
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

// Add a new order
const addOrder = async (req, res) => {
  try {
    // Decrease the in-stock quantity of ordered products
    for (const orderItem of req.body.orderItems) {
      let product = await ProductModel.findById(orderItem.product);

      if (product) {
        product.inStock -= orderItem.quantity;
        orderItem.price = product.price * orderItem.quantity;
        await product.save();
      }
    }

    // Create a new order instance
    const order = new OrderModel({
      ...req.body,
      customerId: req.session._id,
      orderNumber: Math.floor(Math.random() * 1000000),
    });

    // Save the order to the database
    await order.save();
    console.log("Order created successfully");
    return { status: 201, order, orderNumber: order.orderNumber };
  } catch (err) {
    console.error("Error adding order:", err);
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  addOrder,
};
