import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import from @mui/material/styles
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
  color: 'white',
  padding: theme.spacing(4), // Use theme.spacing for consistent spacing
  textAlign: 'center',
  boxShadow: theme.shadows ? theme.shadows[3] : '0px 3px 6px rgba(0, 0, 0, 0.1)', // Provide a fallback for theme.shadows
}));

function CardProduct() {
  const [totalProduct, setTotalProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/v1/products/get/counts');
        const data = await response.json();
        setTotalProduct(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, []);

  //console.log("Total Product:", totalProduct);

  return (
    <GradientCard>
      <Link style={{color:'#fff'}} to={`/product/product-list`}><Typography variant="h4" style={{color:'#fff'}}>Total Product <ArrowForwardIcon color="white"/></Typography></Link>
      <Typography variant="h4" style={{color:'#fff'}}>
        <LocalMallOutlinedIcon style={{ fontSize: 35, backgroundColor: 'grey', borderRadius: '50%', padding: '8px', color:'#fff' }} /> {/* Corrected padding and borderRadius */}
        {totalProduct ? totalProduct.productCount : 'Loading'}  
      </Typography>
    </GradientCard>
  );
}

export default CardProduct;
