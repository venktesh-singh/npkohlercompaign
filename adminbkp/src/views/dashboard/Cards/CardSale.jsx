import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import from @mui/material/styles
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
  padding: theme.spacing(4), // Use theme.spacing for consistent spacing
  textAlign: 'center',
  boxShadow: theme.shadows ? theme.shadows[3] : '0px 3px 6px rgba(0, 0, 0, 0.1)', // Provide a fallback for theme.shadows
}));

function CardSale() {
  const [sale, setSale] = useState(null); // Initialize with null or appropriate initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/orders/get/totalsales');
        const data = await response.json();
        setSale(data);
      } catch (error) {
        console.error('Error fetching total sales:', error.message);
      }
    };
    fetchData();
  }, []);

  //console.log("Product sale:", sale?.totalSales); // Use optional chaining to avoid errors

  return (
    <GradientCard>
      <Link style={{color:'#fff'}} to={`/order/list`}><Typography variant="h4" style={{color:'#fff'}}>Product Sale <ArrowForwardIcon color="white"/></Typography></Link>
      <Typography variant="h4" style={{color:'#fff'}}>
        <CurrencyRupeeIcon style={{ fontSize: 35, backgroundColor: 'grey', borderRadius: '50%', padding: '8px' }} /> {/* Adjusted padding and borderRadius */}
        {sale ? sale.totalSales : 'Loading...'}
      </Typography>
    </GradientCard>
  );
}

export default CardSale;
