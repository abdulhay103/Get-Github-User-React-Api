import React from 'react';

const Alert = ({ alertProps }) => {
  console.log(alertProps);

  return (
    alertProps !== null && (
      <div className={`alert alert-${alertProps.type}`}>
        <i className='fas fa-info-circle' /> {alertProps.msg}
      </div>
    )
  );
};

export default Alert;
