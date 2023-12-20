import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function VDSCheckboxList({
    label,
    name,
    checkOptions,
    value,
    setFieldValue,
    error,
    helperText,
}) {
    const [checked, setChecked] = React.useState(value);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setFieldValue(name, newChecked, true);
        setChecked(newChecked);
    };

    return (
        <FormControl
            fullWidth
            margin='dense'
            error={Boolean(error)}
            sx={{
                mt: 1,
            }}
            variant="outlined"
        >

            <FormGroup row
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput": {notched : true},
                    display: "flex",
                    border: "1px solid",
                    px: 1,
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >

{/* Place Label in box and make it "shrink" to be consistent with 
text input fields  */}
                <InputLabel 
                    shrink
                    sx={{
                        backgroundColor: "white",
                    }}
                >
                    {label}
                </InputLabel>


                {checkOptions.map((item) => {
                    return (
                        <FormControlLabel
                            key={item.value}
                            control={
                                <Checkbox
                                    checked={checked.indexOf(item.value) !== -1}
                                    onChange={handleToggle(item.value)}
                                    name={item.value}
                                />
                            }
                            label={item.label}
                        />
                    );
                })}
            </FormGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}
