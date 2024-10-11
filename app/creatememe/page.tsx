"use client";

import { Box, TextField, Container, Paper, Typography, CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const CreateMeme = ({ searchParams }: { searchParams: { id: string; url: string } }) => {
    const [meme, setMeme] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // useRef to get input data
    const text1Value = useRef<HTMLInputElement>(null);
    const text2Value = useRef<HTMLInputElement>(null);

    const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text1Value.current?.value === '' || text2Value.current?.value === '') {
            alert('please fill all inputs')
            return
        }
        setLoading(true);  // Start loading

        try {
            const data = await fetch(
                `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=mabdullah6600&password=asdfgfdsa123&text0=${text1Value.current?.value}&text1=${text2Value.current?.value}`,
                {
                    method: 'POST',//HTTP request ka method specify karna ka lia
                }
            );
            const response = await data.json();
            setMeme(response.data.url);
        } catch (error) {
            console.error('Error creating meme:', error);
            alert('something is wrong')
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <Container maxWidth="sm" sx={{
            marginTop: 4,
        }}>
            <Paper elevation={3} sx={{
                padding: 4,
                textAlign: 'center',
                marginBottom: '10px'
            }}>
                <Typography sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                }}
                    variant="h4"
                    gutterBottom >{/* // for bottem margin */}
                    Create Your Meme
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 1, sm: 5 }
                }}>
                    <Box sx={{}}>
                        <Image src={searchParams.url} width={300} height={300} alt="Meme Template" style={{ borderRadius: 10, margin: 'auto', border: 2 }} />
                    </Box>
                    <form onSubmit={createMeme}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3 }}>
                            <TextField
                                required
                                id="text1Value"
                                label="First Text"
                                variant="outlined"
                                type="text"
                                placeholder="Enter First text"
                                inputRef={text1Value}
                            />
                            <TextField
                                required
                                id="text2Value"
                                label="Second Text"
                                variant="outlined"
                                type="text"
                                placeholder="Enter Second text"
                                inputRef={text2Value}
                            />
                        </Box>
                        <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: 1 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Generate Meme
                            </Button>
                        </Stack>
                    </form>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : meme ? (
                    <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Your Meme:
                        </Typography>
                        <Image src={meme} width={300} height={300} alt="Generated Meme" style={{ borderRadius: 10 }} />
                    </Box>
                ) : null}
            </Paper>
        </Container>
    );
};

export default CreateMeme;

