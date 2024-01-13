const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    loan_balance: {
        type: Number,
        required: true,
    },
    loan_term: {
        type: Number,
        required: true,
    },
    loan_amount: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    date_applied:{
        type: Date,
        required: true,
        default: Date.now,
    },
    weekly_payment: {
        type: Number,
    }
});

module.exports = mongoose.model('Loan', loanSchema);