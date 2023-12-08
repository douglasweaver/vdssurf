import React from 'react';
import { ReactComponent as PalmTreeIcon } from './palm-tree-svgrepo-com.svg';
import { ReactComponent as StepsIcon } from './stairs-svgrepo-com.svg';
import { ReactComponent as SandyIcon } from './sand-bucket-svgrepo-com.svg';
import { ReactComponent as JeepIcon } from './jeep-svgrepo-com.svg';
import { ReactComponent as FordIcon } from './pickup-truck-svgrepo-com.svg';
// import { ReactComponent as VolvoIcon } from './volvo-logo-svgrepo-com.svg';
import { ReactComponent as VolvoIcon } from './volvo.svg';
import { ReactComponent as ConfirmedIcon } from './confirmed-svgrepo-com.svg';
import { ReactComponent as ThinkingIcon } from './thinking-svgrepo-com.svg';
import { ReactComponent as PrettySureIcon } from './prettysure-svgrepo-com.svg';
import { ReactComponent as HistoryLogManuscriptIcon } from './history-log-manuscript-svgrepo-com.svg';

// import StairsIcon from '@mui/icons-material/Stairs';

export const VDSJeepIcon = () => (VDSWrapIcon({SvgIcon: JeepIcon}));
export const VDSFordIcon = () => (VDSWrapIcon({SvgIcon: FordIcon}));
export const VDSVolvoIcon = () => (VDSWrapIcon({SvgIcon: VolvoIcon}));

export const VDSStepsIcon = () => (VDSWrapIcon({SvgIcon: StepsIcon}));
export const VDSSandyIcon = () => (VDSWrapIcon({SvgIcon: SandyIcon}));
export const VDSTresPalmasIcon = () => (VDSWrapIcon({SvgIcon: PalmTreeIcon}));

export const VDSConfirmedIcon = () => (VDSWrapIcon({SvgIcon: ConfirmedIcon}));
export const VDSThinkingIcon = () => (VDSWrapIcon({SvgIcon: ThinkingIcon}));
export const VDSPrettySureIcon = () => (VDSWrapIcon({SvgIcon: PrettySureIcon}));

export const VDSHistoryLogManuscriptIcon = () => (VDSWrapIcon({SvgIcon: HistoryLogManuscriptIcon}));

export function VDSWrapIcon({
    SvgIcon,
    height = '24px',
    color,
    styles,
    circleHighlight // color to highlight with in circle
}) {
    var customStyles = {
        borderRadius: '50%',
        padding: '2px',
        transition: 'all 0.5s',
        ...styles
    }
    if (!!circleHighlight) {
        customStyles = {
            ...customStyles,
            background: circleHighlight,
        }
    }
    return (
        <SvgIcon
            height={height}
            color={color}
            style={customStyles}
        />
    )
}

