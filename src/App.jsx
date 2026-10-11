import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MapPin, Clock, LogOut, User, Navigation, Trash2, Edit } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  return session ? <Dashboard session={session} /> : <LandingPage />;
}

// --- LANDING PAGE & LOGIN ---
function LandingPage() {
  const [driverId, setDriverId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formattedEmail = `${driverId.toLowerCase().replace(/\s+/g, '')}@greensm.local`;
    const { error } = isLoginView 
      ? await supabase.auth.signInWithPassword({ email: formattedEmail, password })
      : await supabase.auth.signUp({ email: formattedEmail, password });
      
    if (error) {
      alert(error.message === 'Invalid login credentials' ? 'ID atau Password salah!' : error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 z-0"></div>
      
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 text-white z-10 relative max-w-7xl mx-auto w-full gap-8 lg:gap-16">
        
        {/* Kolom Kiri: Profil & Ilustrasi */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative mb-6">
            <img 
              src="public/Logo Green SM x Brilliant V2.jpg" 
              alt="Mohammad Brilliant - " 
              className="w-40 h-40 md:w-56 md:h-56 object-contain relative z-10 drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl z-0 scale-125"></div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
              Pengingat Jadwal Booking <span className="text-green-300">Pelanggan Green SM</span>
            </h1>
            <p className="text-base md:text-lg font-medium drop-shadow-md bg-black/10 px-4 py-2 rounded-full inline-block backdrop-blur-sm border border-white/20">
              Develop by Mohammad Brilliant GT-10205
            </p>
          </div>

          <div className="relative w-full max-w-[280px] md:max-w-md hidden md:block">
            <img 
              src="public/mobil taxi gsm.png" 
              alt="Ilustrasi VinFast Green SM" 
              className="w-full h-auto drop-shadow-2xl animate-pulse-slow object-contain"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>

        {/* Kolom Kanan: Form Login */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <form onSubmit={handleAuth} className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-md text-gray-800 border border-white/40">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              {isLoginView ? 'Welcome Back!' : 'Daftar Driver'}
            </h2>
            
            <div className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">ID Driver/No-Lambung</label>
                <input 
                  type="text" 
                  placeholder="Contoh: GT-10205" 
                  className="w-full p-3 md:p-4 text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" 
                  value={driverId} 
                  onChange={(e) => setDriverId(e.target.value)} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="Minimal 6 karakter" 
                  className="w-full p-3 md:p-4 text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength="6"
                />
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transform active:scale-95 md:hover:-translate-y-1 transition-all duration-200 mt-2 text-base md:text-lg">
                {loading ? 'Memproses...' : (isLoginView ? 'Masuk ke Dashboard' : 'Buat Akun')}
              </button>
            </div>

            <p className="mt-6 text-center text-sm font-medium text-gray-600 cursor-pointer hover:text-cyan-600 transition" onClick={() => setIsLoginView(!isLoginView)}>
              {isLoginView ? 'Belum mendaftar? Buat ID baru' : 'Sudah punya ID? Masuk di sini'}
            </p>
          </form>
        </div>
      </main>

      <footer className="bg-gray-900/95 backdrop-blur-md text-white p-6 text-center z-10 relative border-t border-gray-800">
        <p className="mb-4 text-sm md:text-base font-medium text-gray-300">Ingin mencoba atau punya pertanyaan? Hubungi admin:</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <a href="https://wa.me/6280000000000" target="_blank" rel="noreferrer" className="flex items-center text-green-400 hover:text-green-300 transition font-bold bg-green-900/30 px-4 py-2 rounded-full w-full sm:w-auto justify-center">
             WhatsApp
          </a>
          <a href="https://instagram.com/Jaychanadrian" target="_blank" rel="noreferrer" className="flex items-center text-cyan-400 hover:text-cyan-300 transition font-bold bg-cyan-900/30 px-4 py-2 rounded-full w-full sm:w-auto justify-center">
             IG @Jaychanadrian
          </a>
        </div>
      </footer>
    </div>
  );
}

// --- DASHBOARD & KALENDER (DENGAN EDIT & HAPUS & FOTO HEADER) ---
function Dashboard({ session }) {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({ customer: '', pickup: '', destination: '', time: '' });
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    fetchSchedules();
  }, [date]);

  const fetchSchedules = async () => {
    const start = new Date(date); start.setHours(0,0,0,0);
    const end = new Date(date); end.setHours(23,59,59,999);
    
    const { data } = await supabase
      .from('schedules')
      .select('*')
      .gte('schedule_time', start.toISOString())
      .lte('schedule_time', end.toISOString())
      .order('schedule_time', { ascending: true });
    if (data) setSchedules(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const scheduleDate = new Date(date);
    const [hours, minutes] = form.time.split(':');
    scheduleDate.setHours(hours, minutes);

    if (editId) {
      await supabase.from('schedules').update({
        customer_name: form.customer,
        pickup_location: form.pickup, 
        destination: form.destination, 
        schedule_time: scheduleDate.toISOString()
      }).eq('id', editId);
      setEditId(null); 
    } else {
      await supabase.from('schedules').insert([{ 
        driver_id: session.user.id, 
        customer_name: form.customer,
        pickup_location: form.pickup, 
        destination: form.destination, 
        schedule_time: scheduleDate.toISOString() 
      }]);
    }
    
    setForm({ customer: '', pickup: '', destination: '', time: '' });
    fetchSchedules();
  };

  const handleEditClick = (schedule) => {
    const scheduleTime = new Date(schedule.schedule_time);
    const hours = scheduleTime.getHours().toString().padStart(2, '0');
    const minutes = scheduleTime.getMinutes().toString().padStart(2, '0');

    setForm({
      customer: schedule.customer_name,
      pickup: schedule.pickup_location,
      destination: schedule.destination,
      time: `${hours}:${minutes}`
    });
    setEditId(schedule.id);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?");
    if (confirmDelete) {
      await supabase.from('schedules').delete().eq('id', id);
      fetchSchedules();
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ customer: '', pickup: '', destination: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header dengan Gradien & Foto Profil */}
      <header className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 md:p-5 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center">
          <img 
            src="public/Logo Green SM x Brilliant V2.jpg" 
            alt="Profil" 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-sm mr-3 md:mr-4 object-contain bg-white/20"
          />
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wide drop-shadow-sm">Dashboard Pemesanan Pelanggan</h1>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2 rounded-xl transition-all font-semibold">
          <LogOut size={18} /> <span>Keluar</span>
        </button>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row p-4 md:p-8 gap-8 max-w-7xl mx-auto w-full">
        {/* Kolom Kiri: Kalender */}
        <div className="lg:w-5/12 flex flex-col">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-extrabold mb-6 text-gray-800">Pilih Tanggal</h2>
            <div className="calendar-container">
              <Calendar 
                onChange={setDate} 
                value={date} 
                className="w-full border-none font-medium text-lg rounded-xl shadow-inner bg-gray-50 p-4" 
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form & List */}
        <div className="lg:w-7/12 flex flex-col gap-8">
          <form onSubmit={handleFormSubmit} className={`bg-white p-8 rounded-3xl shadow-xl border relative overflow-hidden transition-all ${editId ? 'border-yellow-400' : 'border-gray-100'}`}>
            <div className={`absolute top-0 left-0 w-full h-2 ${editId ? 'bg-yellow-400' : 'bg-gradient-to-r from-teal-400 to-cyan-500'}`}></div>
            <h2 className="text-2xl font-extrabold mb-2 text-gray-800">
              {editId ? 'Edit Jadwal Perjalanan' : 'Tambah Jadwal Baru'}
            </h2>
            <p className="text-cyan-600 mb-6 font-bold bg-cyan-50 inline-block px-3 py-1 rounded-lg">
              {date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="space-y-4">
              <input type="text" placeholder="Nama Pelanggan" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition" value={form.customer} onChange={(e) => setForm({...form, customer: e.target.value})} required />
              <input type="text" placeholder="Lokasi Penjemputan" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition" value={form.pickup} onChange={(e) => setForm({...form, pickup: e.target.value})} required />
              <input type="text" placeholder="Lokasi Tujuan" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition" value={form.destination} onChange={(e) => setForm({...form, destination: e.target.value})} required />
              
              <input 
                type="time" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition font-medium cursor-pointer" 
                value={form.time} 
                onChange={(e) => setForm({...form, time: e.target.value})} 
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                required 
              />
              
              <div className="flex gap-3 mt-2">
                <button type="submit" className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all ${editId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'}`}>
                  {editId ? 'Update Jadwal' : 'Simpan Jadwal'}
                </button>
                
                {editId && (
                  <button type="button" onClick={cancelEdit} className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl shadow transition-all">
                    Batal
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* List Jadwal */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex-grow">
            <h2 className="text-2xl font-extrabold mb-6 text-gray-800 flex items-center">
              Daftar Perjalanan
              <span className="ml-3 text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">{schedules.length} Jadwal</span>
            </h2>
            
            <div className="space-y-4">
              {schedules.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">Belum ada jadwal di tanggal ini.</p>
                </div>
              ) : (
                schedules.map(s => (
                  <div key={s.id} className="group bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-teal-400 to-cyan-500"></div>
                    
                    <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center text-gray-800 font-extrabold text-xl pr-4">
                        <div className="bg-cyan-100 p-2 rounded-lg mr-3">
                          <User size={20} className="text-cyan-600" />
                        </div>
                        {s.customer_name}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditClick(s)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Edit Jadwal">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDeleteClick(s.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition" title="Hapus Jadwal">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pl-2">
                      <div className="flex items-start text-gray-700">
                        <MapPin size={18} className="mr-3 text-teal-500 mt-0.5 flex-shrink-0" /> 
                        <div>
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Penjemputan</span>
                          <span className="font-medium">{s.pickup_location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start text-gray-700">
                        <Navigation size={18} className="mr-3 text-blue-500 mt-0.5 flex-shrink-0" /> 
                        <div>
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tujuan</span>
                          <span className="font-medium">{s.destination}</span>
                        </div>
                      </div>

                      <div className="flex items-start text-gray-700">
                        <Clock size={18} className="mr-3 text-orange-500 mt-0.5 flex-shrink-0" /> 
                        <div>
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Jam Booking</span>
                          <span className="font-bold text-lg text-gray-800">
                            {new Date(s.schedule_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}