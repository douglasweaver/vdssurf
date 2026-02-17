import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { styled } from '@mui/material/styles';

import { getUrl } from 'aws-amplify/storage';

const ImagePath = 'vdsNotes/'
const VDSNoteComment = ({ comment, fileName }) => {
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const fetchFileUrl = async () => {
            const url = await getUrl({
                key: ImagePath + fileName,
                options: {
                    accessLevel: 'guest',
                    expiresIn: 3600
                },
            });
            setFileUrl(url.url.toString());
        };
        if (fileName) fetchFileUrl();
    }, [fileName]);

    const isPdf = fileName && fileName.toLowerCase().endsWith('.pdf');

    const openInViewer = () => {
        if (fileUrl) {
            if (isPdf) {
                const viewerUrl = 'https://docs.google.com/gview?url=' + encodeURIComponent(fileUrl) + '&embedded=false';
                window.open(viewerUrl, '_blank', 'noopener,noreferrer');
            } else {
                const videoHtml = `<html><head><title>${fileName}</title><style>body{margin:0;background:#000;display:flex;justify-content:center;align-items:center;height:100vh;}</style></head><body><video src="${fileUrl}" controls autoplay style="max-width:100%;max-height:100vh;"></video></body></html>`;
                const blob = new Blob([videoHtml], { type: 'text/html' });
                window.open(URL.createObjectURL(blob), '_blank');
            }
        }
    };

    return (
        <Link
            component="button"
            variant="body1"
            onClick={openInViewer}
            sx={{ cursor: 'pointer' }}
        >
            {comment}
        </Link>
    );
}

const VDSNoteVideo = ({ fileName }) => {

    const [mediaRef, setMediaRef] = useState("");

    useEffect(() => {
        const mediaUrl = async (fileName) => {
            const url = await getUrl({
                key: (ImagePath + fileName), 
                options: {
                    accessLevel: 'guest' , // can be 'private', 'protected', or 'guest' but defaults to `guest`
                    // validateObjectExistence: false,  // defaults to false
                    expiresIn: 3600 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
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
        />
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

                {/* <Box sx={{ m: 1, fontWeight: 'bold', flex: 2, align: 'center', textAlign: 'center' }}>
                    <p>Media</p>
                </Box> */}
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
                                    <VDSNoteComment comment={note.comments} fileName={note.fileName} />
                                </Box>

                                {/* <Box sx={{
                                    m: 1, flex: 6,
                                    width: '100%', height: '100%',
                                    align: 'center', textAlign: 'center',
                                }}>
                                    <VDSNoteVideo fileName={note.fileName} />
                                </Box> */}
                            </Box>
                        )
                    })
                }

                {loadMoreButton()}
            </Box>
        </Box>
    )

}



