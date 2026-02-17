import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { uploadData } from 'aws-amplify/storage';

export function VDSNoteForm({
    note,
    handleCreateNote,
    handleDeleteNote,
    handleNoteDialogClose,
}) {

    const [noteData, setNoteData] = useState(note)
    const [mediaFile, setMediaFile] = useState()

    const chooseFilePressed = (e) => {
        setMediaFile(e.target.files[0])
        setNoteData({ ...noteData, fileName: e.target.files[0].name })
    }

    const handleDelete = () => {
        handleDeleteNote(noteData.id);
    }

    const ImagePath = 'vdsNotes/'

    const uploadMedia = async () => {
        // eslint-disable-next-line no-unused-vars
        // const { result } = await uploadData({
        await uploadData({
                key: ImagePath + mediaFile.name,
        data: mediaFile,
        // options: {
        //   accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
        //   onProgress // Optional progress callback.
        // }
      })
    // const uploadMedia = async () => {
    //     const { key } = await put(
    //         ImagePath + mediaFile.name,
    //         mediaFile,
    //         { contentType: mediaFile.type })
        handleCreateNote(noteData)
    }

    return (

        <Box
            sx={{
                m: 2,
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-between",
            }}
        >

            <Box
                sx={{
                    width: '100%',
                    m: 2,
                    display: "flex",
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Name"
                    value={noteData.name}
                    onChange={e => setNoteData({ ...noteData, name: e.target.value })}
                />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    m: 2,
                    display: "flex",
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Comments"
                    value={noteData.comments}
                    onChange={e => setNoteData({ ...noteData, comments: e.target.value })}
                />
            </Box>
            <Box
                sx={{
                    m: 2,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input type='file'
                    accept='video/mov'
                    onChange={chooseFilePressed} />
            </Box>

            <Box
                sx={{
                    m: 2,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    variant="contained"
                    onClick={uploadMedia}
                >
                    Upload
                </Button>

                <Button
                    variant="contained"
                    onClick={handleNoteDialogClose}
                >
                    Cancel
                </Button>

                {('id' in noteData) &&
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </Button>
                }
            </Box>
        </Box>
    );
};

