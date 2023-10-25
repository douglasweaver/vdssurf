import React from 'react';

import VDSSelect from '../../components/vdsselect';
import {
    VDSThinkingIcon,
    VDSPrettySureIcon,
    VDSConfirmedIcon
} from '../../svg/svgicon';

const commitmentLabel = 'Commitment'
const commitmentOptions = [
    { value: 'THINKINGABOUTIT', label: 'Thinking About It', short: 'Thinking', icon: <VDSThinkingIcon />, color: '#ff8a80' },
    { value: 'PRETTYSURE', label: 'Pretty Sure', short: 'Likely', icon: <VDSPrettySureIcon />, color: '#eeff41' },
    { value: 'CONFIRMED', label: 'Confirmed', short: 'Confirmed', icon: <VDSConfirmedIcon />, color: '#76ff03' },
]

export const commitmentDefault = commitmentOptions[0].value;

export function vdsCommitmentLabel(commitment) {
    return commitmentOptions.find(co => co.value === commitment).label;
}

export function vdsCommitmentShort(commitment) {
    return commitmentOptions.find(co => co.value === commitment).short;
}

export function vdsCommitmentColor(commitment) {
    return commitmentOptions.find(co => co.value === commitment).color;
}

export function VDSCommitmentIcon({
    commitment
}) {

    return (
        commitmentOptions.find(cmt => cmt.value === commitment).icon
    )
}

export function VDSBookingCommitment({
    id,
    name,
    value,
    setFieldValue,
    error,
    helperText,
}) {

    return (
        <VDSSelect
            label={commitmentLabel}
            id={id}
            name={name}
            value={value}
            setFieldValue={setFieldValue}
            error={error}
            helperText={helperText}
            selectOptions={commitmentOptions}
        />
    );
};

