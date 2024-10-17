"use client";
import { Box, TextField, Container, Paper, Typography, CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const CreateMeme = ({ searchParams }: { searchParams: { id: string; url: string; box: string } }) => {
    const [meme, setMeme] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const boxCount = parseInt(searchParams.box, 10) || 2;

    const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const texts = inputRefs.current.map((ref) => ref?.value || "");

        try {
            const data = await fetch(
                `https://api.imgflip.com/caption_image?template_id=${searchParams.id
                }&username=farhan12w&password=farhan0318&boxes[0][text]=${texts[0]
                }&boxes[1][text]=${texts[1]}&boxes[2][text]=${texts[2] || ""}
                &boxes[3][text]=${texts[3] || ""}&boxes[4][text]=${texts[4] || ""}`,
                { method: "POST" }
            );
            const response = await data.json();
            setMeme(response.data.url);
        } catch (error) {
            console.error('Error creating meme:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: '10px' }}>
                <Typography sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} variant="h4" gutterBottom>
                    Create Your Meme
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 1, sm: 5 }
                }}>
                    <Box>
                        <Image src={searchParams.url} width={300} height={300} alt="Meme Template" style={{ borderRadius: 10, margin: 'auto', border: 2 }} />
                    </Box>
                    <form onSubmit={createMeme}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3 }}>
                            {Array.from({ length: boxCount }, (_, index) => (
                                <TextField
                                    required
                                    key={index}
                                    label={`Text Box ${index + 1}`}
                                    variant="outlined"
                                    type="text"
                                    placeholder={`Enter text for box ${index + 1}`}
                                    inputRef={(el) => {
                                        if (el) inputRefs.current[index] = el;
                                    }}
                                />
                            ))}
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
                        <a
                            href={meme}
                            download="meme.jpg"
                            className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 inline-block"
                        >
                            Download Meme
                        </a>
                    </Box>

                ) : null}
            </Paper>
        </Container>
    );
};

export default CreateMeme;
