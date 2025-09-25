import { Box, Typography, Skeleton, Stack } from '@mui/material';

interface WidgetContainerProps {
  title: string;
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ title, loading, error, children }) => {
  if (loading) {
    return (
      <Box p={2}>
        <Typography variant="h6">{title}</Typography>
        <Stack spacing={1} mt={1}>
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return <Box p={2}>{children}</Box>;
};

export default WidgetContainer;
