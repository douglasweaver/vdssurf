import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';

import dayjs from 'dayjs';
// var isBefore = require('dayjs/plugin/isSameOrBefore');
// dayjs.extend(isBefore);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("America/Puerto_Rico")


{/* <View style={{flexDirection:'row'}}> 
   <Text style={{flex: 1, flexWrap: 'wrap'}}> You miss fdddddd dddddddd 
     You miss fdd
   </Text>
</View> */}

const VDSTextCell = ({ row, field }) => {

    return (
        <Box ml='15px'
            sx={{
                m: 2, flex:1, flexWrap: 'wrap',
            }}
        >
            {row[field]}
        </Box>
    )
}


const columns = [
    {
        field: "name", headerName: "Note",
        flex: 1,
        sxParams: {align: 'center', textAlign: 'center', },
        renderCell: VDSTextCell,
    },
    {
        field: 'description', headerName: 'Details',
        flex: 2,
        sxParams: {align: 'center', textAlign: 'justify', },
        renderCell: VDSTextCell,
    },
];


export default function VDSNoteList({
    notes,
    editNote,
    loadMoreButton
}) {

    const rowClick = (event, note) => {
        editNote(note);
    };

    return (
        <Box
            sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                overflow: "hidden",
                overflowY: "scroll",
            }}
        >

            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {
                    columns.map((col, idx) => {
                        return (
                            <Box sx={{ fontWeight: 'bold', flex: col.flex, align: 'center', textAlign: 'center' }} key={idx} >
                                <p>{col.headerName} </p>
                            </Box>
                        )
                    })
                }
            </Box>

            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflow: "hidden",
                    overflowY: "scroll",
                }}
            >
                {
                    notes.map((note, idx) => {
                        return (

                            <Box
                                key={idx}
                                onClick={(event) => { rowClick(event, note) }}
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    height: '100%',
                                    // overflow: "hidden",
                                    // overflowY: "scroll",
                                }}
                            >
                                {
                                    columns.map((col, cidx) => {
                                        return (
                                            <Box sx={{flex: col.flex, ...col.sxParams}} key={cidx}>
                                                {col.renderCell({ row: note, field: col.field })}
                                            </Box>
                                        )
                                    })
                                }

                            </Box>
                        )
                    })
                }

                {loadMoreButton()}
            </Box>
        </Box>
    )

}



