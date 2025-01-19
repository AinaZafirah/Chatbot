// BlogWidget.js
import React from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import img1 from '../assets/34371991_v228-wit-02a-job58.jpg'
import img2 from '../assets/6-Effective-Visual-Learner-Strategies-.jpeg'
import img3 from '../assets/i83770283.jpg.webp'


const blogPosts = [
    {
        title: "Understanding Personalized Learning",
        date: "10 June 2024",
        snippet: "Personalized learning tailors education to meet the different needs of students...",
        link: "https://www.understood.org/en/articles/personalized-learning-what-you-need-to-know",
        img: img3
    },
    {
        title: "5 Tips for Visual Learners",
        date: "1 June 2024",
        snippet: "Visual learners benefit greatly from diagrams, charts, and videos. Here are 6 tips to help visual learners...",
        link: "https://alexandertutoring.com/math-physics-resources/study-tips/6-effective-visual-learner-strategies/",
        img: img2
    },
    {
        title: "How to Create Effective Lesson Plans",
        date: "25 May 2024",
        snippet: "Effective lesson plans are crucial for a successful classroom. Learn the key components of a great lesson plan...",
        link: "https://educationadvanced.com/resources/blog/how-to-develop-an-effective-lesson-plan-everything-you-should-know/",
        img: img1
    },
];

export default function Blog() {
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: '#216C94',
                    padding: 2,
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h5" component="h2" sx={{ color: '#fff', fontFamily: 'Calistoga', mx: '60px' }}>
                    Blog
                </Typography>
            </Box>

           
           <Grid container spacing={2} mt={2}>
            {blogPosts.map((post, index) => (
                <Grid item xs={12} sm={8} md={4}>
                <Card key={index}  
                    sx={{
                        
                        textDecoration: 'none',
                         borderRadius: '10px',
                         mx:'10px',
                         mb:'10px'
                    }}
                     component="a"
                href={post.link}
                            target="_blank"
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={post.img}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontFamily: 'Calistoga' }}>
                                {post.title}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'Calistoga', color: '#757575' }}>
                                {/* {post.date} */}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'Calistoga' }}>
                                {post.snippet}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Box>
    );
}
