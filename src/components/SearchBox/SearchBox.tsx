import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function Searchbox({
  handleSearchboxChange,
  handleSearchboxClear,
  searchBoxValue,
}) {
  useEffect(() => {
    searchBoxValue === '' && setValue('');
  }, [searchBoxValue]);
  const [value, setValue] = useState('');

  const onValueChange = event => {
    setValue(event.target.value);
    handleSearchboxChange(event.target.value);
  };

  const onClearClick = () => {
    setValue('');
    handleSearchboxClear();
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by ship name"
        inputProps={{ 'aria-label': 'search by ship name' }}
        value={value}
        onChange={onValueChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={onClearClick}
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}
