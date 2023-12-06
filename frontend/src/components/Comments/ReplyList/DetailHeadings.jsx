import React from 'react';

const DetailHeadings = ({ text }) => {
  return <div className="darker bg-primary text-white d-flex flex-start justify-content-start col-lg-12 mt-5 p-2 pt-3 ps-3">
    <h2>{text}</h2>
    </div>;
};

export default DetailHeadings;