import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Navigation, 
  Shield, 
  Clock, 
  CreditCard, 
  User, 
  ChevronRight, 
  Menu, 
  X, 
  Layers, 
  Database as DbIcon, 
  Server, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  LogOut,
  History,
  LayoutDashboard,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Global Constants ---
declare const APP_VERSION: string;

// --- Types ---
interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'passenger' | 'driver';
}

interface Ride {
  id: number;
  pickup_location: string;
  dropoff_location: string;
  status: string;
  fare: number;
  created_at: string;
  driver_name?: string;
}

// --- Components ---

const VersionBanner = () => (
  <div className="bg-zinc-900 text-white py-1.5 px-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 border-b border-white/5 sticky top-0 z-[60]">
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
      <span className="text-zinc-400">System Status:</span>
      <span className="text-emerald-400">Operational</span>
    </div>
    <div className="w-px h-3 bg-zinc-700 mx-2"></div>
    <div className="flex items-center gap-2">
      <Info className="w-3 h-3 text-zinc-500" />
      <span>RideFlow v{APP_VERSION}</span>
    </div>
  </div>
);

const Navbar = ({ user, onLogout, onNavigate }: { user: UserData | null, onLogout: () => void, onNavigate: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-zinc-100 sticky top-[33px] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-zinc-900 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Car className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-zinc-900 leading-none">RideFlow</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">v{APP_VERSION}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('architecture')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Architecture</button>
            {user ? (
              <>
                <button onClick={() => onNavigate('dashboard')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Dashboard</button>
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-zinc-900">{user.name}</span>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">{user.role}</span>
                  </div>
                  <button onClick={onLogout} className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={() => onNavigate('login')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Login</button>
                <button onClick={() => onNavigate('register')} className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all">Get Started</button>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <div className="relative overflow-hidden bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-7xl">
            Ride Booking <span className="text-zinc-400">Redefined.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            A professional system architecture for the next generation of urban mobility. Real-time tracking, secure payments, and seamless driver integration.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button 
              onClick={onGetStarted}
              className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 transition-all"
            >
              Book a Ride
            </button>
            <button className="text-sm font-semibold leading-6 text-zinc-900 flex items-center gap-1">
              Learn more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
    </div>
  </div>
);

const ArchitectureSection = () => (
  <div className="bg-zinc-50 py-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">System Architecture</h2>
        <p className="mt-4 text-lg text-zinc-600">Deep dive into the RideFlow technical stack and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Smartphone, title: 'UI Layer', desc: 'React-based web app and Flutter mobile apps for passengers and drivers.', color: 'bg-blue-50 text-blue-600' },
          { icon: Server, title: 'API Gateway', desc: 'Express.js server handling routing, load balancing, and authentication.', color: 'bg-purple-50 text-purple-600' },
          { icon: Layers, title: 'Processing Layer', desc: 'Microservices for ride matching, real-time tracking, and fare calculation.', color: 'bg-emerald-50 text-emerald-600' },
          { icon: DbIcon, title: 'Data Layer', desc: 'SQLite for transactional data and Redis for real-time location caching.', color: 'bg-orange-50 text-orange-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-zinc-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-8">Technical Documentation</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">01</div>
              <div>
                <h4 className="font-bold mb-1">Real-time Tracking</h4>
                <p className="text-zinc-400 text-sm">Uses WebSockets for bidirectional communication between drivers and passengers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">02</div>
              <div>
                <h4 className="font-bold mb-1">Security & Auth</h4>
                <p className="text-zinc-400 text-sm">JWT-based authentication with role-based access control (RBAC) for API endpoints.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">03</div>
              <div>
                <h4 className="font-bold mb-1">Scalability</h4>
                <p className="text-zinc-400 text-sm">Containerized with Docker and orchestrated via Kubernetes for elastic scaling.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-l border-zinc-700 grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border-r border-b border-zinc-700"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AuthForm = ({ type, onSuccess }: { type: 'login' | 'register', onSuccess: (user: UserData) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'passenger' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">I am a</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="passenger">Passenger</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Email Address</label>
          <input 
            required
            type="email" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Password</label>
          <input 
            required
            type="password" 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </div>
        {error && <div className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl"><AlertCircle className="w-4 h-4" /> {error}</div>}
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

const PassengerDashboard = ({ user }: { user: UserData }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [rides, setRides] = useState<Ride[]>([]);
  const [booking, setBooking] = useState(false);

  const fetchRides = async () => {
    const res = await fetch(`/api/rides/user/${user.id}`);
    const data = await res.json();
    setRides(data);
  };

  useEffect(() => { fetchRides(); }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBooking(true);
    try {
      const res = await fetch('/api/rides/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passenger_id: user.id,
          pickup,
          dropoff,
          fare: Math.floor(Math.random() * 50) + 10
        })
      });
      if (res.ok) {
        setPickup('');
        setDropoff('');
        fetchRides();
      }
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl sticky top-24">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Navigation className="w-6 h-6" /> Book a Ride</h2>
          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  required
                  type="text" 
                  placeholder="Where from?"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Dropoff Location</label>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  required
                  type="text" 
                  placeholder="Where to?"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                  value={dropoff}
                  onChange={e => setDropoff(e.target.value)}
                />
              </div>
            </div>
            <button 
              disabled={booking}
              className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              {booking ? 'Searching...' : 'Request Ride'}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><History className="w-6 h-6" /> Ride History</h2>
        <div className="space-y-4">
          {rides.length === 0 ? (
            <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-3xl p-12 text-center">
              <Car className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">No rides yet. Start your first journey!</p>
            </div>
          ) : (
            rides.map(ride => (
              <div key={ride.id} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-100 p-3 rounded-2xl">
                    <Car className="w-6 h-6 text-zinc-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                      <span>{ride.pickup_location}</span>
                      <ChevronRight className="w-3 h-3 text-zinc-300" />
                      <span>{ride.dropoff_location}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-zinc-400 font-medium">{new Date(ride.created_at).toLocaleDateString()}</span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        ride.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {ride.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-900">${ride.fare}</div>
                  {ride.driver_name && <div className="text-[10px] text-zinc-400 uppercase font-bold">Driver: {ride.driver_name}</div>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const DriverDashboard = ({ user }: { user: UserData }) => {
  const [pendingRides, setPendingRides] = useState<Ride[]>([]);
  const [myRides, setMyRides] = useState<Ride[]>([]);

  const fetchData = async () => {
    const [pendingRes, myRes] = await Promise.all([
      fetch('/api/rides/pending'),
      fetch(`/api/rides/user/${user.id}`)
    ]);
    setPendingRides(await pendingRes.json());
    setMyRides(await myRes.json());
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (rideId: number) => {
    await fetch('/api/rides/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ride_id: rideId, driver_id: user.id })
    });
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-600"><Navigation className="w-6 h-6" /> Available Requests</h2>
        <div className="space-y-4">
          {pendingRides.length === 0 ? (
            <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-3xl p-12 text-center">
              <Clock className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">Waiting for new requests...</p>
            </div>
          ) : (
            pendingRides.map(ride => (
              <div key={ride.id} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">New Request</div>
                    <div className="text-lg font-bold text-zinc-900">${ride.fare}</div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                    <Car className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-zinc-600">{ride.pickup_location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
                    <span className="text-sm font-medium text-zinc-600">{ride.dropoff_location}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleAccept(ride.id)}
                  className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all"
                >
                  Accept Ride
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard className="w-6 h-6" /> My Completed Rides</h2>
        <div className="space-y-4">
          {myRides.map(ride => (
            <div key={ride.id} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-zinc-100 p-3 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900">{ride.pickup_location} → {ride.dropoff_location}</div>
                  <div className="text-xs text-zinc-400 font-medium">{new Date(ride.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="text-lg font-bold text-zinc-900">${ride.fare}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const saved = localStorage.getItem('rideflow_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuthSuccess = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('rideflow_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rideflow_user');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Hero onGetStarted={() => setCurrentPage(user ? 'dashboard' : 'register')} />;
      case 'architecture': return <ArchitectureSection />;
      case 'login': return <div className="py-24"><AuthForm type="login" onSuccess={handleAuthSuccess} /></div>;
      case 'register': return <div className="py-24"><AuthForm type="register" onSuccess={handleAuthSuccess} /></div>;
      case 'dashboard': 
        if (!user) return <Hero onGetStarted={() => setCurrentPage('register')} />;
        return user.role === 'passenger' ? <PassengerDashboard user={user} /> : <DriverDashboard user={user} />;
      default: return <Hero onGetStarted={() => setCurrentPage('register')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <VersionBanner />
      <Navbar user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-zinc-50 border-t border-zinc-100 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 p-1.5 rounded-md">
              <Car className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900">RideFlow</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500 font-medium">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Contact Support</a>
          </div>
          <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
            © 2026 RideFlow Systems Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
