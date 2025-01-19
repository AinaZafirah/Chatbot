import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/chatbot-background.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = React.useState(false);

  // Input
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  //   const handleUsername = (event) => {};

  // Input error
  const [passwordError, setPasswordError] = React.useState(false);

  // Form validity
  const [formValid, setFormValid] = React.useState();
  const [success, setSuccess] = React.useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassword = () => {
    if (!password || password.length < 6 || password.length > 20) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleSubmit = () => {
    setSuccess(null);
    if (passwordError || !password) {
      setFormValid(
        "Password is set btw 6 - 20 characters long. Please Re-Enter."
      );
      return;
    }

    setFormValid(null);
    // Proceed to use the information passed
    console.log("Username : " + userName);
    console.log("Password : " + password);

    //Show Successfull Submittion
    setSuccess("Form Submitted Successfully");
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "200px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        md={4}
        elevation={4}
        sx={{
          height: "479px",
          width: "479px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#53A2BE", // Set the background color
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              padding: "20px",
              margin: "10px",
              fontFamily: "Calistoga",
              color: "white",
            }}
          >
            Edusys
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="password" sx={{ fontFamily: "Calistoga" }}>
                Password
              </FormLabel>
              <OutlinedInput
                id="password"
                autoComplete="password"
                placeholder=""
                required
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="password" sx={{ fontFamily: "Calistoga" }}>
                Confirm Password
              </FormLabel>
              <OutlinedInput
                id="Confirmpassword"
                autoComplete="Confirmpassword"
                placeholder=""
                required
                value={password}
                error={passwordError}
                onBlur={handlePassword}
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                sx={{ backgroundColor: "white", width: "100%" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormGrid>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              height: "63px",
              width: "243px",
              backgroundColor: "#176087",
              "&:hover": {
                backgroundColor: "#14506E",
              },
              fontFamily: "Calistoga",
            }}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
          {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )}

          {success && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )}
          <Grid item>
            <Typography sx={{ fontFamily: "Calistoga" }}>
              Don't have an account?
              <Link to="/Register"> Register here</Link>
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
