import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';

import { Storage } from 'aws-amplify';

import dayjs from 'dayjs';
// var isBefore = require('dayjs/plugin/isSameOrBefore');
// dayjs.extend(isBefore);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("America/Puerto_Rico")

const ImagePath = 'vdsNotes/'

const VDSNoteVideo = ({ fileName }) => {

    const [mediaRef, setMediaRef] = useState("");

    useEffect(() => {
        const mediaUrl = async (fileName) => {
            const url = await Storage.get(ImagePath + fileName, { expires: 60, })
            setMediaRef({ result: url });
        };
        mediaUrl(fileName);
    }, []);

    return ((mediaRef === undefined) ?
        <p>LOADING...</p>
        :
        // <Box
        //     sx={{
        //         // aspectRatio: '16/9',
        //         width: '100%',
        //         height: '100%',
        //     }}
        // >
            <ReactPlayer
                url={mediaRef.result}
                controls
                height='100%'
                width='auto'
                // light={true}
            // playing
            />
        // </Box>
    )
}

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

            {/* <VDSNoteVideo note={notes[0]} /> */}

            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Box sx={{ m: 1, fontWeight: 'bold', flex: 1, align: 'center', textAlign: 'center' }}>
                    <p>Note</p>
                </Box>

                <Box sx={{ m: 1, fontWeight: 'bold', flex: 2, align: 'center', textAlign: 'center' }}>
                    <p>Media</p>
                </Box>
            </Box>

            <Box
                sx={{
                    m: 1,
                    display: "flex",
                    flexDirection: "column",
                    // flexGrow: 1,
                    overflow: "hidden",
                    overflowY: "scroll",
                }}
            >
                {
                    notes.map((note, idx) => {
                        return (

                            <Box
                                key={idx}
                                // onClick={(event) => { rowClick(event, note) }}
                                sx={{
                                    m: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    height: '30%',
                                    // alignContent: 'center'
                                    // overflow: "hidden",
                                    // overflowY: "scroll",
                                }}
                            >
                                <Box
                                    onClick={(event) => { rowClick(event, note) }}
                                    sx={{ m: 1, flex: 1, align: 'center', textAlign: 'center', }}
                                >
                                    <p>{note.name}</p>
                                </Box>


                                <Box sx={{ m: 1, flex: 2, 
                                    width: '100%', height: '100%',
                                    align: 'center', textAlign: 'center', }}>
                                    <VDSNoteVideo fileName={note.fileName} />
                                </Box>
                            </Box>
                        )
                    })
                }

                {loadMoreButton()}
            </Box>
        </Box>
    )

}



