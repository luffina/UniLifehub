// StudyBuddy.js

import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #1a237e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BuddyList = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const BuddyItem = styled.div`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
`;

function StudyBuddy() {
  const [buddies, setBuddies] = useState([]);
  const [error, setError] = useState('');

  // Fetch buddies using the logged-in user's data
  const handleFindBuddy = async () => {
    try {
      // Fetch the logged-in user's profile data from localStorage
      const profileData = JSON.parse(localStorage.getItem('profileCreationFormData'));

      const response = await fetch('http://localhost:5000/api/studybuddy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData), // Send the profile data to the backend
      });

      if (!response.ok) {
        setError('Failed to fetch buddies. Please try again later.');
        return;
      }

      const recommendedBuddies = await response.json();
      setBuddies(recommendedBuddies);  // Update the state with the recommended buddies
    } catch (error) {
      setError('Failed to fetch buddies. Please try again later.');
      console.error('Error fetching buddies:', error);
    }
  };

  return (
    <Container>
      <h1>Find Study Buddy</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleFindBuddy}>Find Buddy</Button>

      <BuddyList>
        {buddies.map((buddy, index) => (
          <BuddyItem key={index}>
            <h3>{buddy}</h3>
          </BuddyItem>
        ))}
      </BuddyList>
    </Container>
  );
}

export default StudyBuddy;