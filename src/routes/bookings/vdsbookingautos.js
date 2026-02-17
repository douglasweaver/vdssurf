import React from 'react';
import Box from '@mui/material/Box';

import VDSCheckboxList from '../../components/vdscheckboxlist';

import {
    VDSJeepIcon,
    VDSScionIcon,
    VDSFordIcon,
    VDSVolvoIcon
} from '../../svg/svgicon';

const autosTitle = 'Autos'
const autoOptions = [
    { value: 'JEEP', label: 'Jeep', icon: <VDSJeepIcon />, active: true },
    { value: 'SCION', label: 'Scion', icon: <VDSScionIcon />, active: true },
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
        <Box
            display='flex'
            flexDirection='row'
            // justifyContent='space-between'
            alignItems='center'
            width='100%'
            sx={{
                // border: "1px solid green",
            }}
        >
            {autoOptions.filter((auto) => { return autos.includes(auto.value) })
                .map((auto, index) => (
                    <Box key={index} flexGrow={1}>
                        {auto.icon}
                    </Box>
                )
                )}
        </Box>
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

