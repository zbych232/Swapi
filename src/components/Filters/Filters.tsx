import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Filters = ({ films, handleFilterChange, rerenderTrigger }) => {
  const [filmsList, setFilmsList] = useState(films);

  const handleFilmChange = (event, newValue) => {
    handleFilterChange(newValue);
  };
  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={films}
        getOptionLabel={option => option.title}
        filterSelectedOptions
        onChange={handleFilmChange}
        renderInput={params => (
          <TextField {...params} label="Choose films" placeholder="Films" />
        )}
        key={rerenderTrigger}
      />
    </Stack>
  );
};
export default Filters;
