import React from 'react';
import Grid from '@mui/material/Grid';

import VDSCheckboxList from '../../components/vdscheckboxlist';

import {
    VDSJeepIcon,
    VDSFordIcon,
    VDSVolvoIcon
} from '../../svg/svgicon';

const autosTitle = 'Autos'
const autoOptions = [
    { value: 'JEEP', label: 'Jeep', icon: <VDSJeepIcon />, active: true },
    { value: 'FORD', label: 'Ford', icon: <VDSFordIcon />, active: true },
    { value: 'VOLVO', label: 'Volvo', icon: <VDSVolvoIcon />, active: false }
]
export function autosString(autos) {
    let text = '';
    for (let i = 0; i < autos.length; i++) {
        text += (i ? ' ' : '') + autoOptions.find(ao => ao.value === autos[i]).label
    }
    return text;
}

export function VDSLabelToAuto(label) {
    return (
        autoOptions.find(aut => aut.label === label).value
    )
}


export function VDSAutoIcon({
    auto
}) {
    return (
        autoOptions.find(aut => aut.value === auto).icon
    )
}

export function VDSAutosIcons({
    autos
}) {
    return (
        <Grid
            container
            display='flex'
            direction="row"
            alignItems="center"
            justifyContent='center'
        >
            {autoOptions.map((auto, index) => (
                <Grid
                    item
                    key={index}
                    display='flex'
                    alignItems="center"
                    justifyContent='center'
                >
                    {autos.includes(auto.value) && auto.icon}
                </Grid>
            ))}
        </Grid>
    );
}


export function VDSBookingAutos({
    name,
    value,
    setFieldValue,
    error,
    helperText,
}) {

    return (
        <VDSCheckboxList
            label={autosTitle}
            name={name}
            checkOptions={autoOptions.filter((auto, index) => (auto.active))}
            value={value}
            setFieldValue={setFieldValue}
            error={error}
            helperText={helperText}
        />
    );
};

