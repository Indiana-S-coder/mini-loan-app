import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoans } from '../redux/loanAction';

const LoanList = () => {
    const dispatch = useDispatch();
    const { loans } = useSelector((state) => state.loan);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getLoans());
    }, [dispatch]);

    return (
        <>
            <h1 className="mb-5 text-center">Loan Details</h1>
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th className="p-2">Loan Amount</th>
                        <th className="p-2">Loan Term</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan._id}>
                            <td className="p-2">{loan.loan_amount}</td>
                            <td className="p-2">{loan.loan_term}</td>
                            <td className="p-2">{loan.status}</td>
                            <td className="p-2">
                                <Link
                                    to={`/loan/${loan._id}`}
                                    className="px-2 py-1 bg-blue-500 rounded-md text-white"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default LoanList;