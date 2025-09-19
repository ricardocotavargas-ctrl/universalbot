import { Skeleton, Box, Grid } from '@mui/material';

export const DashboardSkeleton = () => (
  <Box>
    <Skeleton variant="text" height={60} width="30%" sx={{ mb: 2 }} />
    <Grid container spacing={3}>
      {[1, 2, 3, 4].map(item => (
        <Grid item xs={12} sm={6} md={3} key={item}>
          <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
        </Grid>
      ))}
    </Grid>
  </Box>
);