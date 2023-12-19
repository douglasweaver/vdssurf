import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Storage } from 'aws-amplify';

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
        const { key } = await Storage.put(
            ImagePath + mediaFile.name,
            mediaFile,
            { contentType: mediaFile.type })
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
                component="span"
                sx={{
                    display: "flex",
                    border: "1px solid",
                    padding: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <input type='file'
                    accept='video/mov'
                    onChange={chooseFilePressed} />

                <Button
                    variant="contained"
                    onClick={uploadMedia}
                    float="LEFT"
                >
                    Upload
                </Button>

                <Button
                    variant="contained"
                    onClick={handleNoteDialogClose}
                    float="center"
                >
                    Cancel
                </Button>

                {('id' in noteData) &&
                    <Button
                        variant="contained"
                        onClick={() => handleDelete()}
                        float="right"
                    >
                        Delete
                    </Button>
                }
            </Box>
        </Box>
    );
};

