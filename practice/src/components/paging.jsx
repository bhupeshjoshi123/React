import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


const Paging = props =>{
    const {itemsCount , pageSize , currentPage ,onPagechange } = props;
    
    const pagesCount = (itemsCount / pageSize);
    
    const pages = _.range(1,pagesCount+1);
         return (
                <nav aria-label = "page navigation example">
                <ul className = "pagination">
                 {pages.map(page =>
                    <li key = {page} className = {page === currentPage ?'page-item active' : 'page-item'}>
                        <a onClick = {(()=>onPagechange(page))}className = "page-link"  href="#">{page}
                        </a>
                        </li>)}   
                </ul>
                </nav>
        );
};
Paging.prototype ={
    itemsCount:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    onPagechange:PropTypes.func.isRequired
};

 
export default Paging;

