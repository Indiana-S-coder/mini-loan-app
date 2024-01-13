import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createLoan } from "../redux/loanAction";

const Loan = () => {
    const dispatch = useDispatch();
    const {modal, setModal} = useState(false);
    const { user } = useSelector((state) => state.user);
    const {loanStatus, setLoanStatus} = useState("PENDING");

    const {loan, setLoan} = useState({
        loan_amount: "",
        loan_term: "",
        status: ""
    });

    const toggle = () => {
        setModal(!modal);
    };

    const { loan_amount, loan_term, status} = loan;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoan({ ...loan, [name]: parseFloat(value) || 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLoan = {
            user,
            loan_amount,
            loan_term,
        };

        if(user.role === "admin"){
            newLoan.status = loanStatus;
        }

        dispatch(createLoan(loan));
        toggle();
    };

    return (
        <>
            <h1 className="mb-5 text-center">Apply for loan</h1>
                <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-start my-1'>
                        <label htmlFor="loanAmount">Loan Amount</label>
                        <input type="text"
                        placeholder='Enter loan amount'
                        name='loanAmount'
                        id='loanAmount'
                        onChange={handleChange}
                        value={loan_amount}
                        required
                        className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                    </div>
                    <div className='flex flex-col items-start my-1'>
                        <label htmlFor="loanTerm">Loan Term(in weeks)</label>
                        <input type="week"
                        placeholder='select loan term'
                        name='loanTerm'
                        id='loanTerm'
                        onChange={handleChange}
                        value={loan_term}
                        required
                        className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                    </div>

                    <button type='submit' className='border-none mt-2 text-white py-2 px-5 bg-slate-600 font-bold cursor-pointer'>
                        Apply
                    </button>
                    
                </form>
        </>
    )

}
export default Loan;