import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 font-sans text-gray-100">
            {/* Main Card */}
            <div className="w-[90%] md:w-[25%] min-w-[320px] overflow-hidden rounded-2xl bg-white/10 shadow-2xl backdrop-blur-lg border border-white/20 animate-fade-in-up">

                {/* Header Section */}
                <div className="relative p-8 text-center border-b border-white/10">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg ring-4 ring-blue-500/30 mb-6 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-white mb-1">{user?.username || 'User'}</h2>
                    <p className="text-sm text-gray-400">Welcome back to your profile</p>
                </div>

                {/* Body Section */}
                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <button className="flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white transition-all hover:bg-gray-700 hover:border-blue-500 hover:shadow-lg group">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span className="font-medium text-gray-200 group-hover:text-white">Edit Profile</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <button className="flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-3 text-white transition-all hover:bg-gray-700 hover:border-blue-500 hover:shadow-lg group">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.795 23.91 23.91 0 01-1.014 5.795m-3.8-11.59a22.905 22.905 0 011.613 4.282c.267.579.977.78 1.527.461l.657-.38c.523-.301.71-.961.463-1.511a24.44 24.44 0 00-.985-2.783m2.486 18.27h-6.818M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-medium text-gray-200 group-hover:text-white">Settings</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white shadow-lg transition-transform hover:bg-blue-500 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
