const mongoose = require('mongoose');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Loan = require('../models/loan');
const ErrorHandler = require('../util/errorhandler');
const Schema = mongoose.Schema;

// Create a new loan
exports.createLoan = catchAsyncErrors(async (req, res, next) => {
    const { loan_amount, loan_term } = req.body;
    const weekly_payment = loan_amount / (loan_term * 1000);
    const user = req.user;

    const loans = await Loan.create({
        user: user._id,
        loan_amount,
        loan_term,
        weekly_payment,
        loan_balance: loan_amount,
        status: "PENDING",
    });

    res.status(201).json({
        success: true,
        loans,
    });
});

// Get all loans

exports.getAllLoans = catchAsyncErrors(async (req, res, next) => {
    const loan = await Loan.findById( req.params.id );

    res.status(200).json({
        loan,
    });
});

// Get loan details
exports.getLoanDetails = catchAsyncErrors(async(req, res, next) => {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
        return next(new ErrorHandler('Loan is not found', 404));
    }

    res.status(200).json({
        loan,
    });
})

// Approve loan
exports.approveLoan = catchAsyncErrors(async (req, res, next) => {
    const loanId = await Loan.findById( req.params.id );

    const loan = await Loan.findByIdAndUpdate(
        loanId, {
            status: "APPROVED"
        },
        { new : true}
    )
    if (!loan) {
        return next(new ErrorHandler('Loan is not found', 404));
    }


    res.status(200).json({
        loan,
    });
});


// Update loan 
exports.updateLoan = catchAsyncErrors(async (req, res, next) => {
    const _id = req.params.id;
    const amount_paid = Number(req.body.amount_paid);

    const loan = await Loan.findByIdAndUpdate(
        {_id},
        {$inc: { loan_balance: -amount_paid}},
        { new: true}
    )

    if (!loan) {
        return next(new ErrorHandler('Loan is not found', 404));
    }

    // payment history
    const historyDate = {
        loan: loan._id,
        amount_paid,
        remaining_balance: loan.loan_balance,
    }

    const payment = await Repayment.create(historyDate);

    // check if all repayments are paid
    const allRepaymentsPaid = await Repayment.find({
        loan: loan._id,
        status: 'PAID',
    }).countDocuments() === loan.loan_term;

    if(allRepaymentsPaid){
        loan.status = 'PAID';
        await loan.save();
    }

    res.status(200).json({
        payment,
        loan,
    });
});

// get payment history
exports.getPaymentHistory = catchAsyncErrors(async (req, res, next) => {
    const payments = await Loan.find({loan: req.params.id})
    .populate("loan").sort({ date_paid: 1});

    res.status(200).json({
        payments,
    });

});