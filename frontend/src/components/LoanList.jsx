import React, {useEffect} from 'react';
import { Row, Col, Card, CardBody, Table } from "reactstrap";
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
            <h1 className="my-5 font-bold text-xl text-center">Loan Details</h1>
            <Card className=" mb-5">
        <CardBody className="text-center">
          <Row>
            <Col md="4">
              <h3>{loans?.loans?.length}</h3>
              <div className='font-semibold'>Total Loans</div>
            </Col>
            <Col md="4">
              <h3>
                $
                {loans &&
                  loans.loans
                    ?.reduce((sum, i) => (sum += i.loan_balance), 0)
                    .toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
              </h3>
              <div className='font-semibold mb-2'>Total Balance</div>
            </Col>
            <Col md="4">
              <Link
                to="/loan"
                size="lg"
                color="secondary"
                className="my-2 bg-slate-500 text-white py-2 px-3 rounded-lg btn-success btn-lg"
              >
                Add new Loan
              </Link>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div className='ml-32 mb-10'>
      <Table striped>
        <thead>
          <tr className=''>
            <th className='px-5'>Date Applied</th>
            <th className='px-5'>Full Name</th>
            <th className='px-5'>Term</th>
            <th className='px-5'>Loan Status</th>
            <th className='px-5'>Loan Amount</th>
            <th className='px-5'>Loan Balance</th>
            <th className='px-5'>Weekly Payment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loans.loans?.map(
            ({
              _id,
              name,
              loan_balance,
              loan_type,
              status,
              loan_amount,
              loan_term,
              date_applied,
              weekly_payment,
            }) => (
              <tr key={_id}>
                <td>
                  <Moment format="YYYY-MM-DD HH:mm">{date_applied}</Moment>
                </td>
                <td>{user.name}</td>
                <td>{loan_term} months</td>
                <td>{status}</td>
                <td>
                  ${" "}
                  {loan_amount?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
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
                <td>
                  <Link to={`/repay/${_id}`} className="btn btn-success btn-sm">
                    Repay
                  </Link>
                </td>
              </tr>
            )
            )}
        </tbody>
      </Table>
    </div>
      <Link to="/" className="bg-slate-500 rounded-lg py-2 px-3 ml-20 ">
        Back
      </Link>
        </>
    );
}

export default LoanList;