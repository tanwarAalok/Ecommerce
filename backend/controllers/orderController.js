const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//* CREATE NEW ORDER

exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })
});


//* GET SINGLE ORDER

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});



//* GET Logged In User ORDER

exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    });
});



//* GET ALL ORDERs -- ADMIN

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});


//* UPDATE ORDER Status -- ADMIN

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered order", 400));
    }

    order.orderItems.forEach(async (ord) => {
        await updateStock(ord.product, ord.quantity, next);
    });

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered") order.deliveredAt = Date.now();

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Order status updated"
    });
});

async function updateStock(id, quantity, next) {
  const product = await Product.findById(id);
  if (!product) {
      return next(new ErrorHandler("Product not found", 400));
  }
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}


//* Delete order -- ADMIN

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    
    await order.remove();

    res.status(200).json({
        success: true,
        message: "Order deleted"
    });
});
