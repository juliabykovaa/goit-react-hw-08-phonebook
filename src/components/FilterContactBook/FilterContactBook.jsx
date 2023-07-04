import { React } from 'react';
import PropTypes from 'prop-types';

import { Input } from './FilterContactBook.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'store/contactSlice';

function Filter() {
   const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

    const changeFilter = e => {
      dispatch(setFilter(e.currentTarget.value));
    };
  
  return (
    <label>
      <Input type="text" placeholder="Search" value={filter} onChange={changeFilter} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
};

export default Filter