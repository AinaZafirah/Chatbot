import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AllNotes from "./Notes/pages/AllNotes/AllNotes";
import { AuthContext } from "../context/authContext.js";
import Cookies from "universal-cookie";
import Blog from "./Blog";
import { db } from "../Components/firebase-config.js";
import { collection } from "firebase/firestore";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuizIcon from '@mui/icons-material/Quiz';


const dbref = collection(db, "Auth");

export default function Dashboard() {
  
  const { currentUser } = useContext(AuthContext);


  return (
    <>
      <Box
        id="hero"
        sx={{
          backgroundColor: "#53A2BE",
          display: "flex",
          p: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            p: 2,
            mx: "60px",
            
          }}
        >
          <Avatar alt="Profile Picture" src="/path/to/profile-picture.jpg" />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Calistoga",
              color: "white",
              marginLeft: "16px",
            }}
          >
            {currentUser.displayName}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#53A2BE",

          display: "flex",
          flexDirection: "column",
          flex: 1,

          paddingTop: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            p: 2,
            mx: "90px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Calistoga",
              color: "white",
            }}
          >
            Make the Learning Fun with Edusys
          </Typography>
        </Box>
       <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Column for xs (mobile), row for md (desktop)
        alignItems: "center",
        justifyContent: "flex-start", // Center items horizontally
        gap: 2, // Gap between the two buttons
        mx: "90px",
        mt: 2, // Margin top for spacing
        mb:'40px'
      }}
    >
      {/* Button 1: New Chat */}
      <Box>
        <Link to="/Chats" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<SmartToyIcon sx={{ fontSize: "large" }} />}
            sx={{
              height: "63px",
              width: "243px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "23px",
            }}
          >
            New Chat
          </Button>
        </Link>
      </Box>

      <Box>
        <Link to="/analytics" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<AnalyticsIcon sx={{ fontSize: "large" }} />}
            sx={{
              height: "63px",
              width: "243px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "23px",
            }}
          >
            Analytics
          </Button>
        </Link>
      </Box>
        <Box>
        <Link to="https://learningstyles.webtools.ncsu.edu" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<QuizIcon sx={{ fontSize: "large" }} />}
            sx={{
              height: "63px",
              width: "243px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "23px",
            }}
          >
            Learning Test
          </Button>
        </Link>
      </Box>
    </Box>

        <Box
        sx={{mb: '40px'}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#216C94",
              padding: 2,
              borderRadius: "10px",
              mx: "90px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: "#fff", fontFamily: "Calistoga", mx: "60px" }}
            >
              Note List
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              p: 2,
              mx: "90px",
              backgroundColor: "#176087",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <AllNotes />
            </Box>
          </Box>

           <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              p: 2,
              mx: "90px",
              backgroundColor: "#176087",
              borderRadius: "10px",
              mt: '40px'
            }}
          >
          <Blog/>
          </Box>
        </Box>
      </Box>
    </>
  );
}
