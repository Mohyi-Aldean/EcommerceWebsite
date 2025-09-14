import React from "react";
import { useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { CardContent, CircularProgress } from "@mui/material";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";

export default function Categories() {
  const [categories, setCategorie] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await AxiosInstance.get(`/Customer/Categories`);
      //console.log(response);
      setCategorie(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading)
    return (
      <p>
        {" "}
        <CircularProgress /> Loading...
      </p>
    );

  return (
    <Box py={3}>
      <Typography variant="h2" component="h2">
        Categories
      </Typography>
      <Grid container spacing={1.5} mt={5}>
        {categories.map((category) => (
          <Grid key={category.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ boxShadow: 5, borderRadius: 5, p: 1 }}>
              <CardContent>
                <Typography align="center" variant="h6" component="h3" mt={1}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
