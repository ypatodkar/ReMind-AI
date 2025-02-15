import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

const UserDataDisplay = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      // Build the file path relative to this file's location.
      const filePath = path.join(__dirname, '../resources/userData.json');
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf8');
        setUserData(JSON.parse(rawData));
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }, []);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>User Selections</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export default UserDataDisplay;
