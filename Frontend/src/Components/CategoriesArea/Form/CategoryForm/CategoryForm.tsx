import { Add, ArrowBackIosNew, EditSharp } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { notify } from "../../../../Utils/Notify";
import "./CategoryForm.css";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
interface CategoryFormProps {
  onSubmit: (category: CategoryModel) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<CategoryModel>;
  mode: "add" | "edit";
  nameInput: React.ReactNode;
  descriptionInput: React.ReactNode;
  imageInput: React.ReactNode;
}
export default function CategoryForm({
  onSubmit,
  handleSubmit,
  mode,
  nameInput,
  descriptionInput,
  imageInput,
}: CategoryFormProps) {
  const navigate = useNavigate();
  async function handleFormSubmit(category: CategoryModel) {
    try {
      await onSubmit(category);
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <div className="category-form">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Button onClick={() => navigate("/categories")}>
            <ArrowBackIosNew />
          </Button>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "ActiveBorder" }}>
              {mode === "add" ? <Add /> : <EditSharp />}
            </Avatar>
            <Typography component="h1" variant="h5">
              {mode === "add" ? "Add Category" : "Update Category"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ mt: 1 }}
            >
              {nameInput}
              {descriptionInput}
              {imageInput}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {mode === "add" ? "Add" : "Update"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
