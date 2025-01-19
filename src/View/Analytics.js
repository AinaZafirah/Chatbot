import React, { useState } from "react";

import { RadarChart } from "./RadarChart";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { RadarData, RadarOptions } from "./RadarConfig";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Analytics() {

   const [selectedStudent, setSelectedStudent] = useState([]);

  const [filteredData, setFilteredData] = useState(RadarData.datasets);

  // // Function to handle student filter change
  // const handleStudentChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedStudent(selectedValue);
    
  //   if (selectedValue === "all") {
  //     setFilteredData(RadarData.datasets);
  //   } else {
  //     const filtered = RadarData.datasets.filter(dataset =>
  //       dataset.label.toLowerCase().includes(selectedValue.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   }
  // };

  // const studentNames = RadarData.datasets.map(dataset => {
  //   const studentName = dataset.label.split(":")[1].trim();
  //   return { label: studentName, value: studentName };
  // });

  return (
    <>
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
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between", // Adjusted to space-between
            backgroundColor: "#216C94",
            padding: 2,
            borderRadius: "10px",
            mx: "90px",
            mb: '40px',
            px: 4, // Added padding for space
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "#fff", fontFamily: "Calistoga" }}
          >
            Analytics
          </Typography>

          {/* Dashboard Button */}
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<DashboardIcon sx={{ fontSize: "large" }} />}
              sx={{
                ml: 2, // Adjusted margin-left for spacing
                backgroundColor: "#FFD500",
                "&:hover": {
                  backgroundColor: "#FFD500",
                },
                fontFamily: "Calistoga",
                borderRadius: "30px",
                fontSize: "18px",
              }}
            >
              Dashboard
            </Button>
          </Link>
    
        </Box>

       <Box
        sx={{mb: '40px'}}>

      <Grid container  mt={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Card sx={{ mx: "90px", mb: '20px' }}>
          <CardContent sx={{alignItems: "center", justifyContent: "flex-end",}}>
            <Typography variant="h6" sx={{ fontFamily: 'Calistoga', color: '#53A2BE'  }} gutterBottom>Total Students</Typography>
            <Typography variant="h4" sx={{ fontFamily: 'Calistoga',  }} >290</Typography>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <Card sx={{ mx: "90px", mb: '20px' }}>
          <CardContent sx={{alignItems: "center", justifyContent: "flex-end",}}>
            <Typography variant="h6" sx={{ fontFamily: 'Calistoga', color: '#53A2BE' }} gutterBottom>Total Class</Typography>
            <Typography variant="h4" sx={{ fontFamily: 'Calistoga',  }} >10</Typography>
          </CardContent>
        </Card>
        </Grid>
      </Grid>

        

        <Box  
        sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              p: 2,
              mx: "90px",
              backgroundColor: "#efeff0",
              borderRadius: "10px",
            }}>

  
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
            <RadarChart data={filteredData} options={RadarOptions} key={selectedStudent}/>
            
            </Box>
          
        </Box>
        </Box>
      </Box>
    </>
  );
}