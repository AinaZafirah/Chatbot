import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import backgroundImage from "../Components/chatbot-background.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { db, auth, provider } from "../Components/firebase-config.js";
import {
  getDocs,
  setDoc,
  collection,
  where,
  query,
  doc,
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const dbref = collection(db, "Auth");
const cookies = new Cookies();

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Login() {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [isAuth, setIsAuth] = React.useState(cookies.get("auth-token"));

 
  const [success, setSuccess] = React.useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const emailMatch = query(dbref, where("Email", "==", inputs.email));
    const emailSnapshot = await getDocs(emailMatch);
    const emailArray = emailSnapshot.docs.map((doc) => doc.data());
    const passwordMatch = query(
      dbref,
      where("Password", "==", inputs.password)
    );
    const passwordSnapshot = await getDocs(passwordMatch);
    const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());

    if (emailArray.length > 0 && passwordArray.length > 0) {
      setSuccess("Login successful.");
      cookies.set("auth-token", inputs.email);
      navigate("/Dashboard");
    } else {
      setSuccess("Wrong email or password.");
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setSuccess(null);

    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.email);
      setIsAuth(true);
      await setDoc(doc(db, "Auth", result.user.uid), {
        Name: result.user.displayName,
        Username: result.user.displayName,
        Email: result.user.email,
        UID: result.user.uid,
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (!isAuth) {
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#53A2BE",
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
              sx={{ padding: "20px", margin: "10px", fontFamily: "Calistoga" }}
            >
              Welcome Back!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="email" sx={{ fontFamily: "Calistoga" }}>
                  Email
                </FormLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder=""
                  required
                  onChange={handleChange}
                  sx={{ backgroundColor: "white", width: "100%" }}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="password" sx={{ fontFamily: "Calistoga" }}>
                  Password
                </FormLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder=""
                  required
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
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
            <Box
              sx={{
                display: "flex",
                width: "100%",
                padding: "10px",
                justifyContent: "center",
              }}
            >
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
                onClick={googleLogin}
              >
                Sign in with Google
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <FormControlLabel
                control={<Checkbox name="saveInfo" />}
                label="Remember me"
              />
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
              onClick={handleLogin}
            >
              Login
            </Button>

            {success && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error" size="small">
                  {success}
                </Alert>
              </Stack>
            )}
            <Grid item xs>
              <Typography sx={{ fontFamily: "Calistoga" }}>
                <Link to="/PasswordReset">Forgot Password?</Link>
              </Typography>
            </Grid>
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

  return <Navigate to={"/Dashboard"} />;
}
