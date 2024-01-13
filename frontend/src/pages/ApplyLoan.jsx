import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLoan } from "../redux/loanAction";

const ApplyLoan = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [loanStatus, setLoanStatus] = useState("PENDING");

  const { user } = useSelector((state) => state.user);

  const [loanData, setLoanData] = useState({
    loan_amount: "",
    loan_term: "",
    status: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const {loan_amount, loan_term, status } = loanData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: parseFloat(value) || 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLoan = {
      user,
      loan_amount,
      loan_term,
    };

    if (user.role === "admin") {
      newLoan.status = loanStatus;
    }

    dispatch(createLoan(newLoan));
    toggle();
  };

  return (
    <>
      <h1 className="mt-40 mb-5 text-center font-bold text-xl">Apply for loan</h1>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                <div className='flex flex-col items-start my-1'>
                <label htmlFor="loan_amount">Loan Amount</label>
                <input type="text"
                placeholder='Amount'
                name='loan_amount'
                id='loan_amount'
                onChange={handleChange}
                value={loan_amount}
                required
                className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                </div>
                <div className='flex flex-col items-start my-1'>
                <label htmlFor="loan_term">Loan Term(in weeks)</label>
                <input type="number"
                placeholder='Enter loan term'
                name='loan_term'
                id='loan_term'
                onChange={handleChange}
                value={loan_term}
                required
                className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                </div>
                {user.role === "admin" && (
                  <div className='flex flex-col items-start my-1'>
                    <label htmlFor="status">Status</label>
                    <select
                      name="status"
                      id="status"
                      onChange={(e) => setLoanStatus(e.target.value)}
                      value={loanStatus}
                      className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md'
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                )}
                <button type='submit' className='border-none mt-2 text-white py-2 px-5 bg-slate-600 font-bold cursor-pointer'>
                    Apply
                </button>
            </form>
            <Modal isOpen={modal} toggle={toggle} className="flex flex-col items-center mt-10 mx-auto fixed inset-x-0 top-0 z-50 overflow-hidden px-2 sm:px-0">
              <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <ModalHeader toggle={toggle} className="font-semibold text-lg">Application Submitted</ModalHeader>
                  <ModalBody className="pb-4">
                      Your loan application was successfully submitted and is under review for approval.
                  </ModalBody>
              </div>
              <ModalFooter className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Link to={`/all-loans`}>
                      <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Done
                      </button>
                  </Link>
              </ModalFooter>
            </div>
          </Modal>

    </>
  );
};

export default ApplyLoan;