import { LockOutlined } from "@mui/icons-material";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useTitle from "../../../Hooks/UseTitle";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import EmailInput from "../Inputs/EmailInput/EmailInput";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput";

function Login() {
  useTitle("Login");
  const defaultTheme = createTheme();
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function login(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      const firstName = appStore.getState().user.firstName;
      notify.success(`Welcome back ${firstName} 😊`);
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
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(login)}
              sx={{ mt: 3 }}
              className="register-form"
            >
              <Grid container spacing={2}>
                <EmailInput register={register} />
                <PasswordInput register={register} />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="register-button"
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink className="login-nav-link" to={"/login"}>
                    Don't have an account? Register.
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

export default Login;
