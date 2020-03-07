import React, { useEffect } from 'react';
import { clearErrors } from '../actions/errorActions';
import { useDispatch } from 'react-redux';

interface AlertProps {
  errors: string[]
}

const AlertMessage: React.SFC<AlertProps> = ({ errors }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearErrors);
    }
  });

  const errorList = () => {
    return errors.map((err) => <li key={err}>{err}</li>);
  }

  return (
    <div className="error-alert">
      <h3>There was an issue with your request</h3>
      <ul>
        {errorList()}
      </ul>
    </div>
  );
}

export default AlertMessage;
