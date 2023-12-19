import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import VDSErrorBoundary from '../components/vdserrorboundary';

import {
    gql,
    useMutation,
} from '@apollo/client';
import {
    deleteVDSNote,
    createVDSNote,
    updateVDSNote
} from '../graphql/mutations';
import { listVDSNotes } from '../graphql/queries';

import usePaginatedItems from './usePaginatedItems';
import VDSNotesList from './notes/vdsnotelist';
import { VDSNoteForm } from './notes/vdsnoteform';

function newNote() {
    let newNote = {
        name: '',
        fileName: ''
    };
    return newNote;
}

export const vdsNotesTypePolicies =
{
    listVDSNotes: {
        keyArgs: false,
        merge(existing, incoming, { readField }) {
            if (existing === undefined) return incoming
            const items = (existing ? existing.items : []).concat(incoming.items)
            return {
                ...existing,
                items: items,
                nextToken: incoming.nextToken,
            };
        },
        // read(existing) {
        //     if (existing) {
        //         return {
        //             nextToken: existing.nextToken,
        //             items: existing.items,
        //             // items: Object.values(existing.items),
        //         };
        //     }
        // },
    },
}


export function VDSNotes() {

    const [currentNote, setCurrentNote] = useState(newNote());
    const [noteDialogOpen, setNoteDialogOpen] = useState(false);

    const [deleteNote] = useMutation(gql(deleteVDSNote), {
        update(cache, { data: { deleteVDSNote } }) {
            cache.modify({
                fields: {
                    listVDSNotes(previous) {
                        let final = previous.items.filter((e) => (
                            cache.data.data[e.__ref].id !== deleteVDSNote.id
                        ));
                        return {
                            ...previous,
                            items: final,
                        }
                    }
                }
            })
        }
    })

    const [addNote] = useMutation(gql(createVDSNote), {

        update(cache, { data: { createVDSNote } }) {
            cache.modify({
                fields: {
                    listVDSNotes(previous) {
                        const newNoteRef = cache.writeFragment({
                            data: createVDSNote,
                            fragment: gql`
                                    fragment NewNote on VDSNote {
                                        id
                                        name
                                        fileName
                                    }
                                    `
                        });

                        let existingNotes = previous.items
                        let start = existingNotes.findIndex((e) => {
                            return cache.data.data[e.__ref].checkOut > createVDSNote.checkOut
                        });
                        start = start < 0 ? existingNotes.length : start
                        let final = {
                            ...previous,
                            items: existingNotes.toSpliced(start, 0, newNoteRef)
                        }
                        return final
                    }
                }
            })
        }
    });

    const [updateNote] = useMutation(gql(updateVDSNote));

    const handleCreateNote = (note) => {
        setNoteDialogOpen(false);
        if ('id' in note) {
            updateNote({ variables: { input: note } });
        } else {
            addNote({ variables: { input: note } });
        }
    }

    const handleNoteDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setNoteDialogOpen(false);
        }
    }

    const handleNoteDialogOpen = () => {
        setNoteDialogOpen(true);
    }

    const handleDeleteNote = (id) => {
        deleteNote({ variables: { input: { id: id } } });
        handleNoteDialogClose();
    }


    // const deleteAllNotes = () => {

    //     importCSVNotes().forEach(item => addNote({ variables: { input: item } }));

    //     console.log("Delete all Notes")
    //     console.log(Notes)

    //     Notes.forEach(bk => {
    //         console.log(bk.id)
    //         deleteNote({ variables: { input: { id: bk.id } } });
    //         // addNote({ variables: { input: bk } });
    //     });

    // }

    const editNote = (note) => {

        // testNotes().forEach(bk => {
        //     addNote({ variables: { input: bk } });
        // });

        if (note) {
            setCurrentNote(note);
            handleNoteDialogOpen();
        }
    }

    const noteDialog = (() => {
        return < Dialog open={noteDialogOpen} onClose={handleNoteDialogClose}>
            <DialogTitle>Vista Del Surf ✌🏄</DialogTitle>
            <DialogContent>
                <VDSErrorBoundary>
                    <VDSNoteForm
                        note={currentNote}
                        handleCreateNote={handleCreateNote}
                        handleDeleteNote={handleDeleteNote}
                        handleNoteDialogClose={handleNoteDialogClose}
                    >
                    </VDSNoteForm>
                </VDSErrorBoundary>
            </DialogContent>
        </Dialog>
    })

    const {
        items: notes,
        loadMoreButton,
        // resetQuery,
        errorDiv } = usePaginatedItems({
            gqlQuery: gql(listVDSNotes),
            queryName: "listVDSNotes",
            queryVariables: {
                limit: 10,
            }
        })

    return (

        <Box
            sx={{
                mt: 2,
                mb: 0,
                display: "flex",
                flexDirection: "column",
                width: '100%',
                height: '100%',
                overflow: "hidden",
                // overflowY: "scroll",
                // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
        >

            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                width='100%'
                sx={{
                    // border: "1px solid green",
                }}
            >
                <Box>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', }}>Notes</Typography>
                </Box>

                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Box>
                        <Tooltip title="Add to Line-Up">
                            <IconButton
                                aria-label='account'
                                variant='contained'
                                onClick={() => editNote(newNote())}
                                float='right'
                                height='40px'
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>


            </Box>

            {noteDialog()}

            {errorDiv()}

            <VDSNotesList
                notes={notes}
                editNote={editNote}
                loadMoreButton={loadMoreButton}
            />
        </Box >
    )
};
