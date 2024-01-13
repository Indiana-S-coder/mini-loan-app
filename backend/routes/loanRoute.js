const express = require('express');
const router = express.Router();
const { 
    createLoan,
    getAllLoans,
    getLoanDetails,
    updateLoan,
    getPaymentHistory,
    approveLoan 
} = require('../controller/LoanController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/AuthMiddleware');

router.post('/new/loan', isAuthenticatedUser, createLoan);
router.get('/loans', isAuthenticatedUser, getAllLoans);
router.get('/loan/:id', isAuthenticatedUser, getLoanDetails);
router.put('/loan/:id', isAuthenticatedUser, updateLoan);
router.get('/history/:id', isAuthenticatedUser, getPaymentHistory);

// only admin can approve loan
router.put('.loan/approve/:id', isAuthenticatedUser, authorizeRoles('admin'), approveLoan);

module.exports = router;