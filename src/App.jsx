import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wind, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Send,
  Calendar,
  Camera,
  Globe,
  ChevronDown,
  Star
} from 'lucide-react';

// --- Data ---
// Using highly reliable Unsplash IDs

const INDIAN_CITIES = [
  { title: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800', category: 'Metropolis', location: 'Maharashtra' },
  { title: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800', category: 'Capital', location: 'Delhi' },
  { title: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800', category: 'Tech Hub', location: 'Karnataka' },
  { title: 'Hyderabad', image: 'https://images.unsplash.com/photo-1605218427368-35b81a3dd31c?auto=format&fit=crop&q=80&w=800', category: 'Heritage', location: 'Telangana' },
  { title: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1588096344391-713935dbce8e?auto=format&fit=crop&q=80&w=800', category: 'Culture', location: 'Gujarat' },
  { title: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-bea952d0d531?auto=format&fit=crop&q=80&w=800', category: 'Coastal', location: 'Tamil Nadu' },
  { title: 'Kolkata', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=800', category: 'Cultural', location: 'West Bengal' },
  { title: 'Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800', category: 'Royal', location: 'Rajasthan' },
  { title: 'Udaipur', image: 'https://images.unsplash.com/photo-1622308647423-451d0201ea69?auto=format&fit=crop&q=80&w=800', category: 'Romance', location: 'Rajasthan' },
  { title: 'Varanasi', image: 'https://images.unsplash.com/photo-1561361513-35e022cdd5c8?auto=format&fit=crop&q=80&w=800', category: 'Spiritual', location: 'Uttar Pradesh' },
  { title: 'Agra', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800', category: 'History', location: 'Uttar Pradesh' },
  { title: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800', category: 'Beaches', location: 'Goa' },
  { title: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', category: 'Nature', location: 'Kerala' },
  { title: 'Manali', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800', category: 'Mountains', location: 'Himachal Pradesh' },
  { title: 'Rishikesh', image: 'https://images.unsplash.com/photo-1504705759706-c5ee7158f8bb?auto=format&fit=crop&q=80&w=800', category: 'Yoga', location: 'Uttarakhand' },
  { title: 'Ladakh', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800', category: 'Adventure', location: 'Ladakh' }
];

const INDIAN_LANDMARKS = [
  {
    id: 'l1',
    title: "Taj Mahal",
    location: "Agra, India",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1564507592333-c60657ece523?auto=format&fit=crop&q=80&w=1200",
    excerpt: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.",
    myth: "Legends say Shah Jahan planned to build a black marble mausoleum across the Yamuna River, mirroring the white Taj Mahal, connected by a bridge."
  },
  {
    id: 'l2',
    title: "Hawa Mahal",
    location: "Jaipur, India",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200",
    excerpt: "The 'Palace of Winds', a five-story pyramidal shaped monument with 953 small windows called Jharokhas.",
    myth: "It was built specifically to allow royal ladies to watch street festivals without being seen by the public, like a stone veil."
  },
  {
    id: 'l3',
    title: "Qutub Minar",
    location: "New Delhi, India",
    category: "History",
    image: "https://images.unsplash.com/photo-1545231027-637d2f6210f8?auto=format&fit=crop&q=80&w=1200",
    excerpt: "The tallest brick minaret in the world, an architectural masterpiece of the Delhi Sultanate.",
    myth: "The Iron Pillar in the complex has not rusted in over 1,600 years, a metallurgical mystery that scientists still debate."
  },
  {
    id: 'l4',
    title: "Sun Temple",
    location: "Konark, India",
    category: "Spiritual",
    image: "https://images.unsplash.com/photo-1626083063531-15e7a96a0668?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Designed as a massive chariot for the Sun God Surya, with 24 wheels and pulled by seven horses.",
    myth: "Sailors once called it the 'Black Pagoda' because its magnetic tower supposedly lured ships to shore and caused shipwrecks."
  }
];

const SEVEN_WONDERS = [
  {
    id: 'w1',
    title: "The Great Wall",
    location: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A series of fortifications that were built across the historical northern borders of ancient Chinese states.",
    myth: "Contrary to popular belief, it is not visible from the moon with the naked eye, but its dragon-like spirit is said to protect the land."
  },
  {
    id: 'w2',
    title: "Petra",
    location: "Jordan",
    image: "https://images.unsplash.com/photo-1579606038896-72aa46d497c3?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Famous for its rock-cut architecture and water conduit system. The Rose City.",
    myth: "Bedouins believed the urn atop the Monastery contained gold, leading them to shoot at it, leaving bullet marks visible today."
  },
  {
    id: 'w3',
    title: "Colosseum",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200",
    excerpt: "The largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world.",
    myth: "It is said that on certain nights, the ghostly roars of lions and the clash of gladiator swords can still be heard echoing in the arena."
  },
  {
    id: 'w4',
    title: "Chichen Itza",
    location: "Mexico",
    image: "https://images.unsplash.com/photo-1518638151313-982d91839954?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A complex of Mayan ruins on Mexico's Yucatán Peninsula. A massive step pyramid, known as El Castillo.",
    myth: "During the equinoxes, the play of light and shadow creates the appearance of a serpent descending the pyramid's steps."
  },
  {
    id: 'w5',
    title: "Machu Picchu",
    location: "Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A 15th-century Inca citadel, located in the Eastern Cordillera of southern Peru on a 2,430-metre mountain ridge.",
    myth: "It is often called the 'Lost City of the Incas' because the Spanish conquistadors never found it, preserving its sacred energy."
  },
  {
    id: 'w6',
    title: "Christ the Redeemer",
    location: "Brazil",
    image: "https://images.unsplash.com/photo-1596395819057-d3752bc95438?auto=format&fit=crop&q=80&w=1200",
    excerpt: "An Art Deco statue of Jesus Christ in Rio de Janeiro, created by French sculptor Paul Landowski.",
    myth: "Despite being struck by lightning multiple times, the statue stands unharmed, leading locals to believe it is divinely protected."
  },
  {
    id: 'w8',
    title: "Empire State Building",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?auto=format&fit=crop&q=80&w=1200",
    excerpt: "An iconic Art Deco skyscraper in Midtown Manhattan, New York City.",
    myth: "It is said if you drop a penny from the top, it would create a crater in the pavement below. (Debunked, but legendary)."
  },
];

const JOURNAL_ENTRIES = [
  {
    id: 1,
    title: "Weightless in Wadi Rum",
    category: "Adventure",
    readTime: "8 min",
    excerpt: "Experiencing the Martian landscapes of Jordan through a luxury lens.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    myth: "Locals invite you to listen to the singing sands—a phenomenon where the dunes hum a low-frequency tune, said to be the voices of ancient djinn."
  },
  {
    id: 2,
    title: "The Floating Palaces of Udaipur",
    category: "Luxury",
    readTime: "12 min",
    excerpt: "Exploring Rajasthan's royal heritage in the heart of the City of Lakes.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800",
    myth: "Beneath Lake Pichola, it is whispered that a sunken palace of mirror and glass reflects the true future of whoever dares to dive."
  },
  {
    id: 3,
    title: "Arctic Silence: Svalbard",
    category: "Expedition",
    readTime: "15 min",
    excerpt: "A journey to the edge of the world where gravity feels like a memory.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
    myth: "The Northern Lights are not just light; they are the spirits of the Valkyries leading fallen warriors to the great hall of Valhalla."
  }
];

// --- Components ---

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-300" onClick={onClose} />
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors">
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2070" 
        alt="Space Background" 
        className="w-full h-full object-cover opacity-60 scale-105 animate-float-slow"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202]" />
    </div>
    
    <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
        <Sparkles size={14} className="text-blue-400" />
        <span className="text-xs uppercase tracking-[0.3em] font-bold">Beyond Boundaries</span>
      </div>
      <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
        ANTI-GRAVITY
      </h1>
      <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-12">
        Experience travel that defies expectations. Curated journeys for the modern explorer.
      </p>
      
      <button onClick={() => document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })} className="animate-bounce p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
        <ChevronDown size={32} className="text-white/40" />
      </button>
    </div>
  </section>
);

const CityCard = ({ city, onClick }) => (
  <div onClick={onClick} className="group relative p-6 h-48 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
    {/* Background Image */}
    <img 
        src={city.image} 
        alt={city.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 group-hover:from-black/10 group-hover:via-black/10 transition-all" />
    
    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="flex justify-between items-end">
            <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 block">{city.category}</span>
                <span className="text-2xl font-light tracking-wide text-white group-hover:text-blue-200 transition-colors">{city.title}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 transition-all transform translate-y-4 group-hover:translate-y-0">
                <ArrowRight size={16} className="text-white" />
            </div>
        </div>
    </div>
  </div>
);

const ContentCard = ({ item, onClick, aspect = "aspect-[4/3]" }) => (
    <div onClick={() => onClick(item)} className="group cursor-pointer">
        <div className={`relative w-full ${aspect} rounded-[2rem] overflow-hidden mb-6`}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <ArrowRight size={16} />
            </div>
        </div>
        <div className="px-2">
            <h4 className="text-2xl font-light mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h4>
            <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
                <MapPin size={12} />
                <span>{item.location || item.category}</span>
            </div>
        </div>
    </div>
);

const JournalCard = ({ post, onClick }) => (
  <div onClick={() => onClick(post)} className="group flex flex-col md:flex-row gap-8 items-center mb-16 cursor-pointer">
    <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-[3rem] overflow-hidden">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      <div className="absolute bottom-6 right-6 w-14 h-14 bg-[#1a1a1a] rounded-[1.5rem] flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:scale-110 transition-all">
        <BookOpen className="text-white/80" size={20} />
      </div>
    </div>
    <div className="w-full md:w-1/2 px-4">
      <div className="flex items-center gap-3 mb-4 text-xs tracking-[0.2em] font-bold text-blue-400 uppercase">
        <span>{post.category}</span>
        <span className="w-1 h-1 rounded-full bg-blue-500" />
        <span className="text-white/40">{post.readTime}</span>
      </div>
      <h3 className="text-4xl md:text-5xl font-light mb-6 tracking-tight leading-[1.1] group-hover:text-blue-200 transition-colors">{post.title}</h3>
      <p className="text-white/40 font-light leading-relaxed text-lg mb-8 max-w-md">{post.excerpt}</p>
      
      <div className="flex gap-6">
        <span className="flex items-center gap-2 text-xs tracking-widest text-white/30 uppercase group-hover:text-white transition-colors">
          <Camera size={14} /> View Itinerary
        </span>
        <span className="flex items-center gap-2 text-blue-400 text-xs tracking-widest uppercase font-bold group-hover:text-blue-300 transition-colors">
          <Sparkles size={14} /> Unlock Mythos
        </span>
      </div>
    </div>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal States
  const [selectedItem, setSelectedItem] = useState(null); // The item object to display
  const [aiSection, setAiSection] = useState(null); // 'myth' or 'itinerary' state within modal
  const [relatedWonders, setRelatedWonders] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBlog = (item) => {
    setSelectedItem(item);
    setAiSection(null); // Reset internal modal state
     // Simulate fetching related wonders
     setRelatedWonders(SEVEN_WONDERS.sort(() => 0.5 - Math.random()).slice(0, 3));
  };

  const filteredCities = useMemo(() => {
    if (!searchQuery) return INDIAN_CITIES;
    return INDIAN_CITIES.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[180px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[180px] animate-float-slow" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      {/* --- Full Screen Blog Modal --- */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && (
            <>
                {/* Image Side (Desktop) / Top (Mobile) */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img 
                        src={selectedItem.image || "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200"} 
                        alt={selectedItem.title || "Image"} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold">
                            {selectedItem.category || "Journal"}
                        </span>
                        {selectedItem.location && (
                            <span className="text-white/40 text-xs tracking-widest uppercase flex items-center gap-1">
                                <MapPin size={12} /> {selectedItem.location}
                            </span>
                        )}
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight leading-none text-white">
                        {selectedItem.title}
                    </h2>
                    
                    <div className="prose prose-invert prose-lg mb-12 text-white/70 font-light leading-relaxed">
                        <p>{selectedItem.excerpt || `Welcome to ${selectedItem.title}. Currently, this is a simulated entry for demonstration purposes. In a real application, this space would be filled with rich, detailed content about the destination's history, culture, and hidden gems.`}</p>
                        <p>Explore the local legends, discover the best culinary experiences, and immerse yourself in the unique atmosphere that makes this place truly special.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => setAiSection(aiSection === 'myth' ? null : 'myth')}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="text-blue-400" size={20} />
                                    <h4 className="font-bold tracking-widest uppercase text-sm">Unlock Mythos</h4>
                                </div>
                                <ChevronDown className={`transform transition-transform ${aiSection === 'myth' ? 'rotate-180' : ''}`} />
                            </div>
                            {aiSection === 'myth' && (
                                <p className="mt-4 text-blue-200 italic border-l-2 border-blue-500 pl-4 animate-in fade-in slide-in-from-top-2">
                                    "{selectedItem.myth || "Legends say that beneath the foundations lies a secret chamber that opens only to those who know the true name of the wind."}"
                                </p>
                            )}
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors cursor-pointer" onClick={() => setAiSection(aiSection === 'itinerary' ? null : 'itinerary')}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-purple-400" size={20} />
                                    <h4 className="font-bold tracking-widest uppercase text-sm">3-Day Itinerary</h4>
                                </div>
                                <ChevronDown className={`transform transition-transform ${aiSection === 'itinerary' ? 'rotate-180' : ''}`} />
                            </div>
                            {aiSection === 'itinerary' && (
                                <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex gap-4">
                                        <span className="text-purple-400 font-bold font-mono">01</span>
                                        <p className="text-sm text-white/80">Sunrise arrival. Private breakfast overlooking the skyline. Evening culture walk.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-purple-400 font-bold font-mono">02</span>
                                        <p className="text-sm text-white/80">Heritage tour including hidden gems not on the map. Culinary journey for dinner.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-purple-400 font-bold font-mono">03</span>
                                        <p className="text-sm text-white/80">Leisure morning. Spa session. Departure with a custom souvenir.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Wonders Section inside Modal */}
                    <div className="mt-12">
                        <h3 className="text-xl font-light mb-6 tracking-tight text-white/80">Also Explore</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {relatedWonders.map(wonder => (
                                <div key={wonder.id} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={() => setSelectedItem(wonder)}>
                                    <img src={wonder.image} alt={wonder.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                    <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold text-white tracking-wider">{wonder.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-xs tracking-widest uppercase text-white/30">
                        <span>Anti-Gravity Intelligence</span>
                        <span>Ver 2.5</span>
                    </div>
                </div>
            </>
        )}
      </Modal>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
              <Wind size={20} />
            </div>
            <span className="font-bold tracking-wider text-sm">ANTI-GRAVITY</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-sm">
            {['Destinations', 'Landmarks', 'Wonders', 'Journal'].map((item) => (
              <button 
                key={item} 
                onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                className="text-xs uppercase tracking-widest hover:text-white transition-colors text-white/50"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Search size={18} />
            </button>
          </div>
        </div>
      </nav>

      <HeroSection />

      <main className="relative z-10 pt-20 px-6 pb-20 max-w-7xl mx-auto space-y-40">
        
        {/* City Section */}
        <section id="destinations">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-white/30" />
            <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-bold">Indian Directory</span>
          </div>
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl md:text-6xl font-light tracking-tighter">Urban Constellations</h2>
            
            <div className="relative w-64 md:w-96">
                <input 
                type="text" 
                placeholder="Find a city..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2 pl-2 pr-8 text-lg text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-all"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredCities.map(city => (
              <CityCard key={city.title} city={city} onClick={() => handleOpenBlog(city)} />
            ))}
          </div>
        </section>
        
        {/* Indian Landmarks */}
        <section id="landmarks">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-orange-500" />
                <span className="text-xs uppercase tracking-[0.4em] text-orange-400 font-bold">Heritage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tighter">Chronicles of India</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {INDIAN_LANDMARKS.map(item => (
                    <ContentCard key={item.id} item={item} aspect="aspect-[3/4]" onClick={handleOpenBlog} />
                ))}
            </div>
        </section>

        {/* Seven Wonders */}
        <section id="wonders">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-purple-500" />
                <span className="text-xs uppercase tracking-[0.4em] text-purple-400 font-bold">Global Archive</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tighter">The Seven Wonders</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SEVEN_WONDERS.map(item => (
                    <ContentCard key={item.id} item={item} aspect="aspect-square" onClick={handleOpenBlog} />
                ))}
            </div>
        </section>

        {/* Journal Section */}
        <section id="journal">
          <div className="flex items-center gap-4 mb-20">
            <div className="h-[1px] w-12 bg-blue-500" />
            <span className="text-xs uppercase tracking-[0.4em] text-blue-400 font-bold">The Dispatch</span>
          </div>
          
          <h2 className="text-7xl font-light mb-24 tracking-tighter">Journal Entries</h2>

          <div className="space-y-20">
            {JOURNAL_ENTRIES.map(post => (
              <JournalCard 
                key={post.id} 
                post={post} 
                onClick={handleOpenBlog}
            />
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-20 px-6 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
            <div>
                <h4 className="text-2xl font-light tracking-tight mb-4">ANTI-GRAVITY</h4>
                <p className="text-white/40 max-w-xs">Curating the world's most ethereal experiences for the discerning traveler.</p>
            </div>
            <div>
                <h5 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/60">Newsletter</h5>
                <div className="flex gap-4">
                    <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white" />
                    <button className="bg-blue-600 px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-500 transition-colors">JOIN</button>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
