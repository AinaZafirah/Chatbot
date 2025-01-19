import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import img from "../assets/landing-pic.png";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#53A2BE",
          p: "88px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 2,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "Calistoga", color: "white" }}
          >
            Personalized
          </Typography>
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "Calistoga", color: "white" }}
          >
            Teaching Method with
          </Typography>
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "Calistoga", color: "white" }}
          >
            Our AI Chatbot
          </Typography>
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              sx={{
                mt: 2,
                mb: 2,
                height: "63px",
                width: "243px",
                backgroundColor: "#FFD500",
                "&:hover": {
                  backgroundColor: "#FFD500",
                },
                fontFamily: "Calistoga",
                borderRadius: "30px",
              }}
            >
              Let's Get Started
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 2,
          }}
        >
          <img
            src={img}
            alt="AI Chatbot"
            style={{ width: "536px", height: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
}
