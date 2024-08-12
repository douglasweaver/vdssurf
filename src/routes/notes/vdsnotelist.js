import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

import { getUrl } from 'aws-amplify/storage';

const ImagePath = 'vdsNotes/'

const VDSNoteVideo = ({ fileName }) => {

    const [mediaRef, setMediaRef] = useState("");

    useEffect(() => {
        const mediaUrl = async (fileName) => {
            const url = await getUrl({
                key: (ImagePath + fileName), 
                options: {
                    accessLevel: 'guest' , // can be 'private', 'protected', or 'guest' but defaults to `guest`
                    // validateObjectExistence: false,  // defaults to false
                    expiresIn: 20 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                    // useAccelerateEndpoint: true; // Whether to use accelerate endpoint.
                  },
                })
            setMediaRef({ result: url.url });
        };
        mediaUrl(fileName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                mb: 1,
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
                    mb: 1,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Box sx={{ m: 1, fontWeight: 'bold', flex: 1, align: 'center', textAlign: 'center' }}>
                    <p>Note</p>
                </Box>

                <Box sx={{ m: 1, fontWeight: 'bold', flex: 1, align: 'center', textAlign: 'center' }}>
                    <p>Comments</p>
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
                    height: "100%",
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
                                    height: '45%',
                                    // alignContent: 'center'
                                    // overflow: "hidden",
                                    // overflowY: "scroll",
                                }}
                            >
                                <Box
                                    onClick={(event) => { rowClick(event, note) }}
                                    sx={{
                                        m: 1, flex: 2,
                                        align: 'center', textAlign: 'center',
                                        // overflowY: "scroll",
                                    }}
                                >
                                    <p>{note.name}</p>
                                </Box>

                                <Box
                                    // onClick={(event) => { rowClick(event, note) }}
                                    sx={{ m: 1, flex: 6, 
                                        align: 'center', textAlign: 'center',
                                        overflowY: "scroll",
                                    }}
                                >
                                    <p>{note.comments}</p>
                                </Box>

                                <Box sx={{
                                    m: 1, flex: 6,
                                    width: '100%', height: '100%',
                                    align: 'center', textAlign: 'center',
                                }}>
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



