import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function newNote() {
    let newNote = {
        name: '',
        description: ''
    };
    return newNote;
}

function vdsNoteToFormInitialValues(
    note,
) {
    // strip out __typename so mutation add will work
    const nt = ('id' in note) ? { id: note.id } : {};
    Object.assign(nt,
        {
            name: note.name || '',
            description: note.description || '',
        });
    return nt;
}

function vdsFormValuesToNote(
    values,
) {
    const nt = {...values};
    return nt;
}

const validationSchema = yup.object({
    name: yup
        .string('Enter guests')
        .min(2, "Minimum character is 2")
        .max(50, "Maximum character is 50.")
        .required("Name is required"),
});

export function VDSNoteForm({
    note,
    handleCreateNote,
    handleDeleteNote,
    handleNoteDialogClose,
}) {

    const createNotePressed = (values) => {
        handleCreateNote(vdsFormValuesToNote(values));
    }

    const handleDelete = (values) => {
        handleDeleteNote(values.id);
    }

    return (


        <Box
            sx={{
                display: "flex",
                pt: 1,
                alignItems: "left",
            }}
        >

            <Formik
                initialValues={vdsNoteToFormInitialValues(note)}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    createNotePressed(values);
                }}
            >
                {({ values, handleChange, setFieldValue, touched, errors }) => (

                    <Form>
                        <TextField
                            variant="outlined"
                            autoFocus
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />

                        <TextField
                            variant="outlined"
                            multiline
                            fullWidth
                            // rows={10}
                            maxRows={10}
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            value={values.description}
                            onChange={handleChange}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />


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

                            <Button
                                type="submit"
                                variant="contained"
                                float="left"
                            >
                                Save
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleNoteDialogClose}
                                float="center"
                            >
                                Cancel
                            </Button>

                            {('id' in values) &&
                                <Button
                                    variant="contained"
                                    onClick={() => handleDelete(values)}
                                    float="right"
                                >
                                    Delete
                                </Button>
                            }
                        </Box>

                    </Form>
                )}
            </Formik>
        </Box>
    );
};

