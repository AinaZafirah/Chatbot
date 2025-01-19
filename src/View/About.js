import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import about from '../assets/aboutPic.jpg'
import img1 from '../assets/intuitive.jpg'
import img2 from '../assets/sensory.jpg'
import img3 from '../assets/sequentialpic.jpg'
import img4 from '../assets/verbalpic.jpg'
import img5 from '../assets/visualpic.jpg'
import { Card, CardContent,Grid } from '@mui/material';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


const style = [
    {
        img: img1,
        title: "Sensory (SEN)",
        desc: "concrete, practical, oriented towards facts and procedures",
    },
    {
        img: img2,
        title: "Intuitive (INT)",
        desc: " conceptual, innovative, oriented towards facts and meaning",
    },
    {
        img: img3,
        title: "Visual (VIS)",
        desc: "prefer visual representations of presented material e.g. pictures, diagrams, flow charts",
    },
    {
        img: img4,
        title: "Verbal (VRB)",
        desc: "prefer written and spoken explanations",
    },
    {
        img: img5,
        title: "Active (ACT)",
        desc: "learn by trying things out, working with others",
    },
    {
        img: img1,
        title: "Reflective (REF)",
        desc: " learn by thinking things through, working alone",
    },
    {
        img: img2,
        title: "Sequential (SEQ)",
        desc: "linear, orderly, learn in small incremental steps",
    },
    {
        img: img3,
        title: " Global (GLO)",
        desc: "holistic, systems thinkers, learn in large leaps",
    },
];

export default function About() {
 
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: '65px',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        p: 2,
                    }}
                >
                    <img
                        src={about}
                        alt="About"
                        style={{ width: '536px', height: 'auto' }}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        p: 2
                    }}
                >
                    <Typography variant="h4" sx={{ fontFamily: 'Calistoga' }}>
                        Welcome to our AI Chatbot for Personalized Learning,
                    </Typography>
                    <Typography variant="h7" sx={{ fontFamily: 'Calistoga' }}>
                        an innovative tool designed to transform the educational experience for primary school educators and their students. Our system leverages the Felder-Silverman Learning Style Model to provide customized learning materials that cater to the unique needs of each student, ensuring a more engaging and effective learning process.
                    </Typography>


                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
                
            >
               <Grid container spacing={3}>
                {style.map((item, index) => (
                <Grid item xs={12} sm={6} md={3}>
                    <Card key={index} sx={{ mx:'10px', mb:'10px' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.img}
                                alt={item.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.desc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                 </Grid>
                ))}
                </Grid>
            </Box>


        </>

    );
}