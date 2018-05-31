import React from 'react';
import {Input} from 'antd';
import './index.less';

const {Search} =Input;
const SearchBtn=({...searchProps})=>{
  const {btn}=searchProps;
  return(
    <Search
      {...searchProps}
      enterButton
    />
  )
};

export default SearchBtn;
