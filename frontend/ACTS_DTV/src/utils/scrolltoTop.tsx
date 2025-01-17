import { Button } from '@mui/material';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        borderRadius: '50%',
        minWidth: '50px',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      ↑
    </Button>
  );
};

export default ScrollToTopButton;
