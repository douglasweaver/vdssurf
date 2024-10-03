import React from 'react';

import VDSSelect from '../../components/vdsselect';
import {
    VDSThinkingIcon,
    VDSPrettySureIcon,
    VDSConfirmedIcon
} from '../../svg/svgicon';

// const stoplightGreen = '#57E964'
const stopLightRed = '#cc3232'
const stopLightYellow = '#ffffc5'
const ecru = '#e0cd95'
// const stopLightYellow = '#f7B500'



const ownerLabel = 'Owner'
const ownerOptions = [
    { value: '051f94b0-110f-408a-8d55-69741037fb38', label: 'dondeerew@gmail.com', short: 'Don', icon: <VDSThinkingIcon />, color: stopLightYellow },
    { value: '2884605f-79ad-4c32-bc74-2e15b5ce41a6', label: 'douglasweaver@mac.com', short: 'Doug', icon: <VDSPrettySureIcon />, color: ecru },
    { value: '5fdceb3b-5072-48ed-b263-fdbd51e08880', label: 'cooperweaver@mac.com', short: 'Coop', icon: <VDSConfirmedIcon />, color: stopLightRed },
    { value: '55f8060d-1795-4035-ba89-99ad008f5111', label: 'campbellweaver@mac.com', short: 'Cam', icon: <VDSConfirmedIcon />, color: stopLightRed },
    { value: '85dab33e-9625-46ec-9a32-cf0afa4e546e', label: 'weaver.skylar@gmail.com', short: 'Sky', icon: <VDSConfirmedIcon />, color: stopLightRed },
    { value: 'c782ee11-837c-4501-ab42-f14d4fe839b0', label: 'MACCAM813@gmail.com', short: 'Mark', icon: <VDSConfirmedIcon />, color: stopLightRed },
    { value: 'cd9356d6-bc45-4622-b129-ed0396546faf', label: 'carjweaver@gmail.com', short: 'Cart', icon: <VDSConfirmedIcon />, color: stopLightRed },
    { value: 'eb92e8d0-cca7-464a-9db5-4333ba7d588c', label: 'lkjjlj@aol.com', short: 'LON', icon: <VDSConfirmedIcon />, color: stopLightRed },
    { value: '5fa84d9f-1ced-40e9-93bd-e0a8a45ade40', label: 'susancurley@mac.com', short: 'LON', icon: <VDSConfirmedIcon />, color: stopLightRed },
]


export const commitmentDefault = ownerOptions[0].value;


export function VDSLabelToowner(label) {
    return (
        ownerOptions.find(owner => owner.label === label).value
    )
}

export function vdsOwnerLabel(owner) {
    return ownerOptions.find(u => u.value === owner).label;
}

export function vdsOwnerShort(owner) {
    return ownerOptions.find(u => u.value === owner).short;
}

export function vdsOwnerColor(owner) {
    return ownerOptions.find(u => u.value === owner).color;
}

export function VDSOwnerIcon({owner
}) {

    return (
        ownerOptions.find(u => u.value === owner).icon
    )
}

export function VDSBookingOwner({
    id,
    name,
    value,
    setFieldValue,
    error,
    helperText,
}) {

    return (
        <VDSSelect
            label={ownerLabel}
            id={id}
            name={name}
            value={value}
            setFieldValue={setFieldValue}
            error={error}
            helperText={helperText}
            selectOptions={ownerOptions}
        />
    );
};

