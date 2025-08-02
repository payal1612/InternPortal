import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Award, Crown, TrendingUp, Heart, Star } from 'lucide-react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchLeaderboard();
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/1');
      setUser(response.data);
    } catch (error) {
      setUser({
        id: '1',
        name: localStorage.getItem('userName') || 'Payal Sharma',
        email: localStorage.getItem('userEmail') || 'payal@example.com'
      });
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to dummy data
      setLeaderboard([
        { id: '1', name: 'Priya Sharma', donationsRaised: 12500, rank: 1 },
        { id: '2', name: 'Anita Patel', donationsRaised: 9800, rank: 2 },
        { id: '3', name: 'Kavya Singh', donationsRaised: 8200, rank: 3 },
        { id: '4', name: 'Meera Gupta', donationsRaised: 7500, rank: 4 },
        { id: '5', name: 'Payal Sharma', donationsRaised: 5000, rank: 5 },
        { id: '6', name: 'Riya Jain', donationsRaised: 4800, rank: 6 },
        { id: '7', name: 'Sneha Reddy', donationsRaised: 4200, rank: 7 },
        { id: '8', name: 'Pooja Agarwal', donationsRaised: 3900, rank: 8 },
        { id: '9', name: 'Nisha Kumar', donationsRaised: 3400, rank: 9 },
        { id: '10', name: 'Divya Mehta', donationsRaised: 2800, rank: 10 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onLogout={handleLogout} />
      <Header user={user} />

      <main className="ml-64 pt-16 p-8">
        {/* Title Section */}
        <div className="mb-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-4xl font-bold mb-2 flex items-center">
            <Trophy className="w-10 h-10 mr-3 text-yellow-300" />
            Top Fundraisers
          </h2>
          <p className="text-purple-100 text-lg">See how you stack up against other amazing interns making a difference</p>
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="text-purple-100">Empowering Communities</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-purple-100">Creating Change</span>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="flex justify-center items-end space-x-4 mb-8">
            {leaderboard.slice(0, 3).map((entry, index) => {
              const positions = [1, 0, 2]; // Center, Left, Right
              const heights = ['h-32', 'h-40', 'h-24'];
              const actualIndex = positions[index];
              const actualEntry = leaderboard[actualIndex];
              
              return (
                <div key={actualEntry.id} className="text-center">
                  <div className={`${getRankBadgeColor(actualEntry.rank)} ${heights[actualIndex]} w-24 rounded-t-2xl flex flex-col justify-end p-4 shadow-lg transform hover:scale-105 transition-all duration-300`}>
                    <div className="text-white">
                      <div className="mb-2">
                        {getRankIcon(actualEntry.rank)}
                      </div>
                      <div className="text-lg font-bold">#{actualEntry.rank}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <span className="text-xl font-bold text-gray-600">
                        {actualEntry.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{actualEntry.name}</h3>
                    <p className="text-green-600 font-bold">₹{actualEntry.donationsRaised.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Full Rankings
            </h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`p-6 hover:bg-gray-50 transition-all duration-200 group ${
                  entry.name === (localStorage.getItem('userName') || 'Payal Sharma') ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform duration-200">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <span className="text-lg font-bold text-gray-600">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{entry.name}</h4>
                      {entry.name === (localStorage.getItem('userName') || 'Payal Sharma') && (
                        <span className="text-xs text-blue-600 font-medium">That's you!</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">
                      ₹{entry.donationsRaised.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {index === 0 ? 'Leading' : `₹${(leaderboard[0].donationsRaised - entry.donationsRaised).toLocaleString()} behind`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-red-300" />
              Keep Making a Difference!
            </h3>
            <p className="text-pink-100 text-lg">
              Every contribution empowers women and creates lasting change. Share your referral code and inspire others to join our mission!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;