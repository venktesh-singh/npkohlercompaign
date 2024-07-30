import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import from @mui/material/styles
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BASE_URL } from '../../../config/apiurl';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
  color: 'white',
  padding: theme.spacing(4), // Use theme.spacing for consistent spacing
  textAlign: 'center',
  boxShadow: theme.shadows ? theme.shadows[3] : '0px 3px 6px rgba(0, 0, 0, 0.1)', // Provide a fallback for theme.shadows
}));

function CardTotalUser() {
  const [user, setUsers] = useState(null); // Initialize with null or appropriate initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/get/counts`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching total sales:', error.message);
      }
    };
    fetchData();
  }, []);

  console.log("User sale:", user); // Use optional chaining to avoid errors

  return (
    <GradientCard>
      <Link style={{color:'#fff'}} to={`/user/list`}><Typography variant="h4" style={{color:'#fff'}}>Total User <ArrowForwardIcon color="white"/></Typography></Link>
      <Typography variant="h4" style={{color:'#fff'}}>
        <AccountCircleIcon style={{ fontSize: 35, backgroundColor: 'grey', borderRadius: '50%', padding: '8px' }} /> {/* Adjusted padding and borderRadius */}
        {user?.userCount}
      </Typography>
    </GradientCard>
  );
}

export default CardTotalUser;
