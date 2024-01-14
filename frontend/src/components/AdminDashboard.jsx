import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import {getLoans} from '../redux/loanAction';
import {approveLoan} from '../redux/userActions';
import Moment from 'react-moment';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const {loans} = useSelector(state => state.loan);
    const {user} = useSelector(state => state.user);
    const token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(getLoans(token));
    }, [dispatch]);

    const handleApproveLoan = (id) => {
        dispatch(approveLoan(id, token));
    }

    return (
        <>
            <h1 className='font-bold text-xl my-10 text-center'>Admin Dashboard</h1>
            <div className="flex justify-center">

            <Table striped>
            <thead>
                <tr>
                    <th>Date Applied</th>
                    <th>Name</th>
                    <th>Term</th>
                    <th>Loan Status</th>
                    <th></th>
                    <th>Loan Amount</th>
                    <th>Loan Balance</th>
                    <th>Weekly Payment</th>
                </tr>
            </thead>
            <tbody>
            {loans.loans?.map(
            ({
              _id,
              
              loan_balance,

              status,
              loan_amount,
              loan_term,
              date_applied,
              weekly_payment,
            }) => (
              <tr key={_id}>
                <td className='px-2'>
                  <Moment format="YYYY-MM-DD HH:mm">{date_applied}</Moment>
                </td>
                <td>{user.userName}</td>
                <td className='px-2'>{loan_term} weeks</td>
                <td className='px-2'>{status ? "APPROVED" : "PENDING"}</td>
                <td className='px-2'>
                  {status === "PENDING" && (
                    <button className="text-white bg-slate-500 my-1" onClick={() => handleApproveLoan(_id)}>
                      APPROVE
                    </button>
                  )}
                </td>
                <td className='px-2'>
                  ${" "}
                  {loan_amount?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className='px-2'>
                  ${" "}
                  {loan_balance?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  ${" "}
                  {weekly_payment?.toLocaleString("en-US", {
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
    <div className='text-center mt-5'>
      <Link to="/" className="text-white px-2 py-1 rounded-lg bg-slate-500 ">
        Back
      </Link>
    </div>
        </>
    )
}

export default AdminDashboard;