import { Add, ArrowBackIosNew, EditSharp } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { ProductModel } from "../../../../Models/ProductModel";
import { notify } from "../../../../Utils/Notify";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
interface ProductFormProps {
  onSubmit: (product: ProductModel) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<ProductModel>;
  mode: "add" | "edit";
  nameInput: React.ReactNode;
  descriptionInput: React.ReactNode;
  categoryInput: React.ReactNode;
  priceInput: React.ReactNode;
  stockInput: React.ReactNode;
  quantityInput: React.ReactNode;
  imageInput: React.ReactNode;
}
export default function ProductForm({
  onSubmit,
  handleSubmit,
  mode,
  nameInput,
  descriptionInput,
  categoryInput,
  priceInput,
  stockInput,
  quantityInput,
  imageInput,
}: ProductFormProps) {
  const navigate = useNavigate();
  async function handleFormSubmit(product: ProductModel) {
    try {
      await onSubmit(product);
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <div className="product-form">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Button onClick={() => navigate("/products")}>
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
              {mode === "add" ? "Add" : "Update"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ mt: 1 }}
            >
              {categoryInput}
              <br></br>
              {nameInput}
              {descriptionInput}
              {priceInput}
              {stockInput}
              {quantityInput}
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
