import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import { useSpring, animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { Modal, Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Rating from '@mui/material/Rating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledBox = styled(Box)`
  position: 'relative';
  top: '50%';
  left: '50%';
  transform: 'translate(-50%, -50%)';
  width: 400px;
  background-color: #fff;
  box-shadow: 24;
  padding: 16px;
`;

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

const ReviewsModal = ({ open, handleClose, productId }) => {
  const productDetails = useSelector((state) => state.products.productDetails);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            <h3>{productDetails?.title}</h3>
            {productDetails?.images && productDetails.images.length > 0 && (
              <img
                src={productDetails.images[0]}
                alt="Product"
                style={{ height: '100px', width: '130px', margin: '10px 100px' }}
              />
            )}
          </Typography>
          <h4>Customer's Review:</h4>
          {productDetails?.reviews && productDetails.reviews.length > 0 ? (
            productDetails.reviews.map((review, index) => (
              <Box key={index} my={2}>
                <Typography variant="body1">
                  <AccountCircleIcon style={{ color: '#8d948e' }} /> {review.reviewerName}
                </Typography>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body1" sx={{ fontWeight: '650' }}>{review.comment}</Typography>
                <Typography variant="body1" sx={{ fontSize: '13px' }}>Reviewed on {formatDate(review.date)}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No reviews available.</Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

ReviewsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default ReviewsModal;

