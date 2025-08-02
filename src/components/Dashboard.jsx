import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Copy, 
  DollarSign, 
  Award, 
  TrendingUp, 
  Gift, 
  CheckCircle,
  Calendar,
  Heart,
  Users,
  Target,
  Star,
  Crown,
  Zap,
  Coffee,
  BookOpen,
  Briefcase,
  Lock
} from 'lucide-react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchUserData();
    fetchRewards();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/1');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to dummy data
      setUser({
        id: '1',
        name: localStorage.getItem('userName') || 'Payal Sharma',
        email: localStorage.getItem('userEmail') || 'payal@example.com',
        referralCode: 'payal2025',
        donationsRaised: 5000,
        joinDate: '2025-01-01'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/rewards');
      setRewards(response.data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      // Fallback to dummy data
      setRewards([
        { id: '1', title: 'First Impact', description: 'Raise your first ₹1,000', requiredAmount: 1000, unlocked: true, icon: 'heart', type: 'badge' },
        { id: '2', title: 'Rising Star', description: 'Raise ₹2,500', requiredAmount: 2500, unlocked: true, icon: 'star', type: 'badge' },
        { id: '3', title: 'Champion', description: 'Raise ₹5,000', requiredAmount: 5000, unlocked: true, icon: 'crown', type: 'badge' },
        { id: '4', title: 'Legend', description: 'Raise ₹10,000', requiredAmount: 10000, unlocked: false, icon: 'zap', type: 'badge' },
        { id: '5', title: 'Coffee Voucher', description: 'Unlock at ₹2,000', requiredAmount: 2000, unlocked: true, icon: 'coffee', type: 'voucher' },
        { id: '6', title: 'Book Coupon', description: 'Unlock at ₹3,500', requiredAmount: 3500, unlocked: true, icon: 'book', type: 'coupon' },
        { id: '7', title: 'Internship Certificate', description: 'Complete 3 months', requiredAmount: 0, unlocked: false, icon: 'briefcase', type: 'certificate' },
        { id: '8', title: 'Mentorship Session', description: 'Unlock at ₹7,500', requiredAmount: 7500, unlocked: false, icon: 'users', type: 'voucher' }
      ]);
    }
  };

  const handleCopyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const getRewardIcon = (iconName) => {
    const icons = {
      heart: Heart,
      star: Star,
      crown: Crown,
      zap: Zap,
      coffee: Coffee,
      book: BookOpen,
      briefcase: Briefcase,
      users: Users
    };
    return icons[iconName] || Gift;
  };

  const getRewardTypeColor = (type) => {
    const colors = {
      badge: 'from-blue-500 to-blue-600',
      voucher: 'from-green-500 to-green-600',
      coupon: 'from-purple-500 to-purple-600',
      certificate: 'from-orange-500 to-orange-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
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
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-blue-100 text-lg">Ready to make a difference today? Here's your impact dashboard</p>
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="text-blue-100">Empowering Women</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-blue-100">Creating Impact</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Raised Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-3xl font-bold text-green-600">₹{user?.donationsRaised?.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-6 h-6 text-green-600 group-hover:rotate-12 transition-transform duration-200" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Referral Code</p>
                <p className="text-2xl font-bold text-blue-600">{user?.referralCode}</p>
              </div>
              <button
                onClick={handleCopyReferralCode}
                className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-all duration-200 group-hover:scale-110"
              >
                <Copy className="w-6 h-6 text-blue-600 group-hover:rotate-12 transition-transform duration-200" />
              </button>
            </div>
            <div className="mt-4">
              {copied ? (
                <span className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Copied to clipboard!
                </span>
              ) : (
                <span className="text-sm text-gray-500">Click to copy</span>
              )}
            </div>
          </div>

          {/* Member Since Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Date(user?.joinDate || '').toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Calendar className="w-6 h-6 text-purple-600 group-hover:rotate-12 transition-transform duration-200" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Active for {Math.floor((Date.now() - new Date(user?.joinDate || '').getTime()) / (1000 * 60 * 60 * 24))} days
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Gift className="w-6 h-6 mr-2 text-yellow-500" />
              Rewards & Unlockables
            </h3>
            <div className="text-sm text-gray-600">
              {rewards.filter(r => r.unlocked).length} of {rewards.length} unlocked
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => {
              const IconComponent = getRewardIcon(reward.icon);
              return (
                <div
                  key={reward.id}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    reward.unlocked
                      ? 'border-green-200 bg-green-50/50 hover:shadow-lg hover:scale-105 cursor-pointer'
                      : 'border-gray-200 bg-gray-50/50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-r ${getRewardTypeColor(reward.type)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{reward.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="text-xs font-semibold">
                      <span className={`px-2 py-1 rounded-full bg-green-100 text-green-700`}>
                        {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)}
                      </span>
                    </div>
                    {reward.unlocked && (
                      <div className="mt-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto animate-pulse" />
                      </div>
                    )}
                  </div>

                  {!reward.unlocked && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <span className="text-sm font-semibold text-gray-700">Locked</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress to Next Reward */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Next Milestone</span>
              <span className="text-sm text-blue-600">
                ₹{user?.donationsRaised} / ₹10,000
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 shadow-lg"
                style={{ width: `${Math.min((user?.donationsRaised || 0) / 10000 * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3 font-medium">
              ₹{(10000 - (user?.donationsRaised || 0)).toLocaleString()} more to unlock "Legend" status and exclusive rewards!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
