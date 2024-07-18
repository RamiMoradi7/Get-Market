import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useTitle from "../../../Hooks/UseTitle";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Register.css";
import FirstNameInput from "../Inputs/FirstNameInput/FirstNameInput";
import LastNameInput from "../Inputs/LastNameInput/LastNameInput";
import { UserModel } from "../../../Models/UserModel";
import EmailInput from "../Inputs/EmailInput/EmailInput";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput";

function Register() {
  useTitle("Register");
  const defaultTheme = createTheme();
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function registerUser(user: UserModel) {
    try {
      await authService.register(user);
      notify.success(`Welcome ${user.firstName} ${user.lastName}`);
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="auth-form">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", backgroundColor: "#333" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(registerUser)}
              sx={{ mt: 3 }}
              className="register-form"
            >
              <Grid container spacing={2}>
                <FirstNameInput register={register} />
                <LastNameInput register={register} />
                <EmailInput register={register} />
                <PasswordInput register={register} />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="register-button"
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink className="login-nav-link" to={"/login"}>
                    Already have an account? Log-in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
