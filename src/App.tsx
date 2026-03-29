import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Users, 
  PawPrint, 
  Stethoscope, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  AlertTriangle, 
  ArrowLeft, 
  HeartPulse,
  Camera,
  Send,
  Info,
  ExternalLink,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SHELTERS, Shelter, Review, HazardReport } from './data';

type Page = 'home' | 'detail' | 'hazard' | 'mental-health';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 3958.8; // miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [sortByNearest, setSortByNearest] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('stormsafe_reviews');
    return saved ? JSON.parse(saved) : [];
  });
  const [hazardReports, setHazardReports] = useState<HazardReport[]>(() => {
    const saved = localStorage.getItem('stormsafe_hazards');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('stormsafe_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('stormsafe_hazards', JSON.stringify(hazardReports));
  }, [hazardReports]);

  const selectedShelter = useMemo(() => 
    SHELTERS.find(s => s.id === selectedShelterId), 
    [selectedShelterId]
  );

  const filteredShelters = useMemo(() => {
    const filtered = SHELTERS
      .filter(s => {
        const matchesSearch = s.name.toLowerCase().startsWith(searchQuery.toLowerCase());
        
        if (selectedFilters.includes('all') || selectedFilters.length === 0) {
          return matchesSearch;
        }

        const matchesFilter = selectedFilters.some(filter => {
          if (filter === 'general') return !s.acceptsPets && !s.isSpecialNeeds;
          if (filter === 'pets') return s.acceptsPets;
          if (filter === 'special') return s.isSpecialNeeds;
          return false;
        });

        return matchesSearch && matchesFilter;
      });

    if (sortByNearest && userLocation) {
      return [...filtered].sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedFilters, sortByNearest, userLocation]);

  const handleSelectShelter = (id: string) => {
    setSelectedShelterId(id);
    setCurrentPage('detail');
  };

  const handleAddReview = (text: string) => {
    if (!selectedShelterId || !text.trim()) return;
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      shelterId: selectedShelterId,
      text,
      date: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
  };

  const handleAddHazard = (summary: string, image: string) => {
    if (!selectedShelterId || !summary.trim()) return;
    const newReport: HazardReport = {
      id: Math.random().toString(36).substr(2, 9),
      shelterId: selectedShelterId,
      summary,
      image,
      date: new Date().toISOString(),
    };
    setHazardReports([newReport, ...hazardReports]);
    setCurrentPage('detail');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            sortByNearest={sortByNearest}
            setSortByNearest={setSortByNearest}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            shelters={filteredShelters}
            onSelect={handleSelectShelter}
            onOpenMentalHealth={() => setCurrentPage('mental-health')}
          />
        )}
        {currentPage === 'detail' && selectedShelter && (
          <DetailPage 
            shelter={selectedShelter}
            reviews={reviews.filter(r => r.shelterId === selectedShelter.id)}
            onBack={() => setCurrentPage('home')}
            onAddReview={handleAddReview}
            onGoToHazard={() => setCurrentPage('hazard')}
          />
        )}
        {currentPage === 'hazard' && selectedShelter && (
          <HazardPage 
            shelter={selectedShelter}
            reports={hazardReports.filter(r => r.shelterId === selectedShelter.id)}
            onBack={() => setCurrentPage('detail')}
            onSubmit={handleAddHazard}
          />
        )}
        {currentPage === 'mental-health' && (
          <MentalHealthPage onBack={() => setCurrentPage('home')} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function HomePage({ 
  searchQuery, 
  setSearchQuery, 
  selectedFilters, 
  setSelectedFilters, 
  sortByNearest, 
  setSortByNearest,
  userLocation,
  setUserLocation,
  shelters, 
  onSelect, 
  onOpenMentalHealth 
}: any) {
  const filters = [
    { id: 'all', label: 'All Shelters', icon: MapPin },
    { id: 'general', label: 'General', icon: Users },
    { id: 'pets', label: 'Pet-Friendly', icon: PawPrint },
    { id: 'special', label: 'Special Needs', icon: Stethoscope },
  ];

  const toggleFilter = (id: string) => {
    if (id === 'all') {
      setSelectedFilters(['all']);
      return;
    }

    let next = selectedFilters.filter(f => f !== 'all');
    if (next.includes(id)) {
      next = next.filter(f => f !== id);
    } else {
      next = [...next, id];
    }

    if (next.length === 0) {
      setSelectedFilters(['all']);
    } else {
      setSelectedFilters(next);
    }
  };

  const handleToggleNearest = () => {
    if (!sortByNearest) {
      if (!userLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setSortByNearest(true);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Please enable location services to use this filter.");
          }
        );
      } else {
        setSortByNearest(true);
      }
    } else {
      setSortByNearest(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 py-8 pb-32"
    >
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">StormSafe</h1>
        <p className="text-slate-500 text-lg">Find secure hurricane shelters in your area.</p>
      </header>

      <div className="sticky top-4 z-20 space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search shelters by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={handleToggleNearest}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all border ${
              sortByNearest 
                ? 'bg-green-600 border-green-600 text-white shadow-md shadow-green-100' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-green-200 hover:bg-green-50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Nearest
          </button>
          <div className="w-px h-8 bg-slate-200 self-center mx-1 flex-shrink-0" />
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = selectedFilters.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggleFilter(f.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all border ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {shelters.map((shelter: Shelter) => (
          <motion.button
            key={shelter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(shelter.id)}
            className="flex flex-col text-left bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <img 
              src={`https://picsum.photos/seed/${shelter.imageSeed}/600/300`} 
              alt={shelter.name}
              className="w-full h-32 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg line-clamp-1">{shelter.name}</h3>
                {sortByNearest && userLocation && (
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md ml-2 flex-shrink-0">
                    {calculateDistance(userLocation.lat, userLocation.lng, shelter.lat, shelter.lng).toFixed(1)} mi
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                  <Users className="w-3 h-3 mr-1" /> {shelter.capacity}
                </span>
                {shelter.acceptsPets && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md">
                    <PawPrint className="w-3 h-3 mr-1" /> Pets
                  </span>
                )}
                {shelter.isSpecialNeeds && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">
                    <Stethoscope className="w-3 h-3 mr-1" /> Special Needs
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {shelters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No shelters found matching "{searchQuery}"</p>
        </div>
      )}

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <button 
          onClick={onOpenMentalHealth}
          className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 transition-all"
        >
          <HeartPulse className="w-5 h-5" />
          Mental Health Aid
        </button>
      </div>
    </motion.div>
  );
}

function DetailPage({ shelter, reviews, onBack, onAddReview, onGoToHazard }: any) {
  const [reviewText, setReviewText] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    onAddReview(reviewText);
    setReviewText('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Search
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-8">
        <img 
          src={`https://picsum.photos/seed/${shelter.imageSeed}/1200/600`} 
          alt={shelter.name}
          className="w-full h-64 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">{shelter.name}</h1>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${shelter.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {shelter.isOpen ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {shelter.isOpen ? 'OPEN' : 'CLOSED'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Capacity</p>
              <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" /> {shelter.capacity}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pets Allowed</p>
              <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {shelter.acceptsPets ? (
                  <><CheckCircle2 className="w-5 h-5 text-green-500" /> Yes</>
                ) : (
                  <><XCircle className="w-5 h-5 text-red-500" /> No</>
                )}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Special Needs</p>
              <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {shelter.isSpecialNeeds ? (
                  <><CheckCircle2 className="w-5 h-5 text-purple-500" /> Yes</>
                ) : (
                  <><XCircle className="w-5 h-5 text-slate-300" /> No</>
                )}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" /> Reviews
            </h2>

            <form onSubmit={handleSubmitReview} className="flex gap-3 mb-8">
              <button 
                type="button"
                onClick={onGoToHazard}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-amber-100 text-amber-600 rounded-xl hover:bg-amber-200 transition-colors"
                title="Report Structural Hazard"
              >
                <AlertTriangle className="w-6 h-6" />
              </button>
              <div className="flex-grow relative">
                <input 
                  type="text"
                  placeholder="Write a review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button 
                type="submit"
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-slate-400 italic text-center py-4">No reviews yet. Be the first to share your experience.</p>
              ) : (
                reviews.map((review: Review) => (
                  <div key={review.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-800 mb-2">{review.text}</p>
                    <p className="text-slate-400 text-xs">{new Date(review.date).toLocaleDateString()} at {new Date(review.date).toLocaleTimeString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HazardPage({ shelter, reports, onBack, onSubmit }: any) {
  const [summary, setSummary] = useState('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure you have granted permission.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim() || !capturedImage) return;
    onSubmit(summary, capturedImage);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Shelter
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Report Structural Hazard</h1>
            <p className="text-slate-500">Help others by reporting safety issues at {shelter.name}.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Photo of Hazard</label>
            
            {!capturedImage && !isCameraActive && (
              <button 
                type="button"
                onClick={startCamera}
                className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-400"
              >
                <Camera className="w-12 h-12 mb-2" />
                <span className="font-medium">Tap to Open Camera</span>
              </button>
            )}

            {isCameraActive && (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-slate-200 shadow-lg flex items-center justify-center"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full" />
                </button>
              </div>
            )}

            {capturedImage && (
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img src={capturedImage} alt="Captured hazard" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => { setCapturedImage(null); startCamera(); }}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Hazard Summary</label>
            <textarea 
              placeholder="Describe the structural hazard (e.g., cracked wall, leaking roof, blocked exit)..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={!summary.trim() || !capturedImage}
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-2xl shadow-lg shadow-amber-100 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Submit Hazard Report
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" /> Previous Reports
        </h2>
        
        {reports.length === 0 ? (
          <p className="text-slate-400 italic text-center py-8 bg-white border border-slate-200 rounded-3xl">No structural hazards reported for this shelter yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((report: HazardReport) => (
              <div key={report.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <img src={report.image} alt="Hazard" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-slate-800 font-medium mb-2">{report.summary}</p>
                  <p className="text-slate-400 text-xs">{new Date(report.date).toLocaleDateString()} at {new Date(report.date).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MentalHealthPage({ onBack }: any) {
  const resources = [
    {
      title: "Project COPE Crisis Counseling",
      desc: "Crisis counseling program offered by DISC Village. Offers free crisis counseling for all ages, counselors who reach out to people wherever they are, and ways to cope with disasters like hurricanes.",
      link: "https://discvillage.org/spotlight-on-project-cope-crisis-counseling-after-disasters/",
      phone: "888-850-SWFL"
    },
    {
      title: "SAMSHA Disaster Distress Hotline",
      desc: "Provides 24/7, 365-day-a-year crisis counseling and support to people experiencing emotional distress related to natural or human-caused disasters.",
      link: "https://www.samhsa.gov/find-help/disaster-distress-helpline",
      phone: "1-800-985-5990"
    },
    {
      title: "2-1-1 Community Resources",
      desc: "Free and confidential information and referral to Community Resources. Call 211 to be linked to your community provider.",
      phone: "211"
    },
    {
      title: "National Suicide Prevention Lifeline",
      desc: "Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
      link: "https://988lifeline.org/",
      phone: "988"
    },
    {
      title: "American Red Cross Virtual Family Assistance Center",
      desc: "Support for those who have lost loved ones during a disaster.",
      link: "https://www.redcross.org/virtual-family-assistance-center.html",
      phone: "1-833-492-0094"
    },
    {
      title: "National Human Trafficking Hotline",
      desc: "Confidential support and information for victims and survivors of human trafficking.",
      link: "https://humantraffickinghotline.org/",
      phone: "1-888-373-7888"
    },
    {
      title: "Florida Abuse Hotline",
      desc: "Report child abuse, neglect, or abandonment, or abuse of a vulnerable adult.",
      link: "https://www.myflfamilies.com/service-programs/abuse-hotline/",
      phone: "1-800-962-2873"
    },
    {
      title: "National Domestic Violence Hotline",
      desc: "24/7 support for anyone experiencing domestic violence, seeking resources or information, or questioning unhealthy aspects of their relationship.",
      link: "https://www.thehotline.org/",
      phone: "1-800-799-7233"
    },
    {
      title: "National Sexual Assault Helpline",
      desc: "Confidential support from trained staff who can help you with the next steps of your recovery.",
      link: "https://www.rainn.org/",
      phone: "1-800-656-HOPE"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Mental Health Aid</h1>
        <p className="text-slate-500">Resources and support lines available to help you through this disaster.</p>
      </header>

      <div className="space-y-6">
        {resources.map((res, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{res.title}</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">{res.desc}</p>
            <div className="flex flex-wrap gap-3">
              {res.phone && (
                <a 
                  href={`tel:${res.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Phone className="w-4 h-4" /> {res.phone}
                </a>
              )}
              {res.link && (
                <a 
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-white text-center">
        <HeartPulse className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-2">You are not alone.</h2>
        <p className="opacity-90">Help is available 24/7. Please reach out if you need support.</p>
      </div>
    </motion.div>
  );
}
