/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Calendar, Users, UserCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to EventMaster</h1>
      <p className="text-xl mb-12 max-w-2xl text-center">
        Streamline your event management process with our all-in-one solution. Schedule, organize, and manage your clients with ease.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Calendar size={48} />}
          title="Easy Scheduling"
          description="Manage your events effortlessly with our intuitive calendar interface."
        />
        <FeatureCard
          icon={<Users size={48} />}
          title="Client Management"
          description="Keep track of all your clients and their information in one place."
        />
        <FeatureCard
          icon={<UserCircle size={48} />}
          title="User Profiles"
          description="Customize your profile and manage your account settings with ease."
        />
      </div>
      <div className="space-x-4">
        <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
          Get Started
        </Link>
        <Link to="/login" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
          Login
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default LandingPage;