const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    referralCode: "alex2025",
    donationsRaised: 2450,
    rank: 1,
    achievements: ["First Donation", "Top Fundraiser", "Team Player"]
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@example.com",
    referralCode: "sarah2025",
    donationsRaised: 1890,
    rank: 2,
    achievements: ["First Donation", "Social Media Star"]
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike@example.com",
    referralCode: "mike2025",
    donationsRaised: 1650,
    rank: 3,
    achievements: ["First Donation", "Consistent Contributor"]
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    referralCode: "emma2025",
    donationsRaised: 1420,
    rank: 4,
    achievements: ["First Donation", "Community Builder"]
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    referralCode: "david2025",
    donationsRaised: 1200,
    rank: 5,
    achievements: ["First Donation"]
  }
];

// Routes
app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.get('/api/leaderboard', (req, res) => {
  const sortedUsers = users.sort((a, b) => b.donationsRaised - a.donationsRaised);
  res.json(sortedUsers);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple dummy authentication
  const user = users.find(u => u.email === email);
  
  if (user) {
    res.json({ 
      success: true, 
      user: user,
      token: 'dummy-jwt-token'
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
    donationsRaised: 0,
    rank: users.length + 1,
    achievements: []
  };
  
  users.push(newUser);
  
  res.json({ 
    success: true, 
    user: newUser,
    token: 'dummy-jwt-token'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});