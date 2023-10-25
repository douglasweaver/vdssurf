import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function VDSSelect({
    label,
    id,
    name,
    value,
    setFieldValue,
    error,
    helperText,
    selectOptions,
}) {

    return (
        <FormControl
            // fullWidth
            margin='dense'
            error={Boolean(error)} 
            sx={{
                mt: 2,
            }}
        >
            {(label !== undefined && <InputLabel id="select-label">{label}</InputLabel>
)}
            <Select
                labelId={(label !== undefined ? "select-label" : undefined)}
                id={id}
                value={value}
                label={label}
                onChange={(e) => {setFieldValue(name, e.target.value, true)}}
                autoWidth
            >
                {selectOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))};
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
