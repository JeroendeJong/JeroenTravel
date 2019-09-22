import React from 'react';

const Icon = (props: any) => {
  return (
    <svg className={`${props.className} icon`} width="0" height="0">
      <use xlinkHref={`#${props.id}`}/>
    </svg>
  );
}

Icon.defaultProps = {
  className: '',
  id: ''
}

export default Icon;

