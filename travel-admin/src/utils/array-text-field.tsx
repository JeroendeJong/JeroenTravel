import React from 'react';

const ArrayTextField = ({ source, record = {} }: any) => {
  const text = record[source].toString().replace(/,/gi, '');
  return <span>{text}</span>;
}

export default ArrayTextField;