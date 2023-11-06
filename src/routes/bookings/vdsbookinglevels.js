import React from 'react';
import Grid from '@mui/material/Grid';

import VDSCheckboxList from '../../components/vdscheckboxlist';
import {
    VDSStepsIcon,
    VDSSandyIcon,
    VDSTresPalmasIcon
} from '../../svg/svgicon';


const levelsTitle = 'Levels'
const levelOptions = [
    { value: 'STEPS', label: 'Steps', icon: <VDSStepsIcon/> },
    { value: 'SANDY', label: 'Sandy', icon: <VDSSandyIcon/> },
    { value: 'TRESPALMAS', label: 'Tres Palmas', icon: <VDSTresPalmasIcon/>},
]

export function levelsString(levels) {
    let text = '';
    for (let i = 0; i < levels.length; i++) {
        text += (i ? ' ' : '') + levelOptions.find(lo => lo.value === levels[i]).label
    }
    return text;
}

export function VDSLabelToLevel(label) {
    return (
        levelOptions.find(lvl => lvl.label === label).value
    )
}


export function VDSLevelIcon({
    level
}) {
    return (
        levelOptions.find(lvl => lvl.value === level).icon
    )
}

export function VDSLevelsIcons({
    levels
}) {
    return (

        <Grid
            container
            display='flex'
            direction="row"
            alignItems="center"
            justifyContent='center'
        >
            {levelOptions.map((level, index) => (
                <Grid
                    item
                    key={index}
                    display='flex'
                    alignItems="center"
                    justifyContent='center'
                    >
                    {levels.includes(level.value) && level.icon}
                </Grid>
            ))}
        </Grid>
    );

}

export function VDSBookingLevels({
    name,
    value,
    setFieldValue,
    error,
    helperText,
}) {

    return (
        <VDSCheckboxList
            label={levelsTitle}
            name={name}
            checkOptions={levelOptions}
            value={value}
            setFieldValue={setFieldValue}
            error={error}
            helperText={helperText}
        />
    );
};

