import React, { useState, useEffect } from 'react';
import {
  Menu, MapPin, Phone, Clock, Instagram, Facebook,
  ChevronRight, Star, ShoppingBag, Utensils, Flame,
  Leaf, Coffee, X, ExternalLink, Heart
} from 'lucide-react';

// --- Assets & Data ---

const CATEGORIES = [
  { id: 'all', label: 'Tout', icon: <Utensils size={18} /> },
  { id: 'plats', label: 'Plats Indiens', icon: <Flame size={18} /> },
  { id: 'tacos', label: 'French Tacos', icon: <Star size={18} /> },
  { id: 'burgers', label: 'Burgers', icon: <ShoppingBag size={18} /> },
  { id: 'healthy', label: 'Healthy & Pasta', icon: <Leaf size={18} /> },
];

const MENU_ITEMS = [
  // Plats
  {
    id: 1,
    name: "Butter Chicken",
    category: "plats",
    price: "8.50€",
    description: "Poulet mariné, sauce crémeuse au beurre et épices douces. Servi avec Riz, Pâtes, Frites ou Salade.",
    popular: true,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Poulet Curry",
    category: "plats",
    price: "8.50€",
    description: "Poulet tendre mijoté dans une sauce curry parfumée.",
    popular: false,
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Assiette Kebab",
    category: "plats",
    price: "8.50€",
    description: "Viande de kebab grillée à la broche, servie avec accompagnement au choix.",
    popular: false,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800"
  },
  // Tacos
  {
    id: 4,
    name: "Tacos Double",
    category: "tacos",
    price: "7.50€",
    description: "2 Viandes au choix + Sauce fromagère maison. (Kebab, Poulet, Merguez, Viande Hachée, Cordon Bleu, Tenders)",
    popular: true,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Tacos Triple",
    category: "tacos",
    price: "8.50€",
    description: "Pour les grandes faims : 3 Viandes au choix + Sauce fromagère onctueuse.",
    popular: false,
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&q=80&w=800"
  },
  // Burgers
  {
    id: 6,
    name: "Burger Vaav",
    category: "burgers",
    price: "9.50€",
    description: "Le monstre : 2 Steaks hachés frais, Oeuf, Cheddar fondants, Crudités.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Mega Burger",
    category: "burgers",
    price: "8.50€",
    description: "Steak haché, Rosti de pomme de terre croustillant, Oeuf.",
    popular: false,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800"
  },
  // Healthy/Pasta
  {
    id: 8,
    name: "Poke Bowl Saumon",
    category: "healthy",
    price: "8.50€",
    description: "Saumon frais, Riz vinaigré, Avocat, Mangue, Edamame.",
    popular: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    name: "Pâtes Carbonara",
    category: "healthy",
    price: "7.50€",
    description: "Crème fraîche, Lardons fumés, Parmesan, Jaune d'œuf.",
    popular: false,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800"
  },
];

const REVIEWS = [
  { user: "Sully", rating: 5, text: "Un pur délice ! Des saveurs réconfortantes et des restaurateurs très accueillants !" },
  { user: "Rankeat", rating: 5, text: "Le Butter Chicken est fondant, mariné dans un mélange d'épices douces..." },
  { user: "Local Guide", rating: 4, text: "Excellent rapport qualité prix pour les étudiants." },
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">V</div>
        <span className="text-xl font-bold tracking-tighter text-white">VAAV<span className="text-amber-500">.</span></span>
      </div>

      <div className="hidden md:flex gap-8">
        {['Accueil', 'Menu', 'Avis', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item.toLowerCase())}
            className={`text-sm font-medium transition-colors ${activeTab === item.toLowerCase() ? 'text-amber-500' : 'text-gray-400 hover:text-white'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <a
        href="tel:+33130735518"
        className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center gap-2"
      >
        <Phone size={16} />
        <span>Commander</span>
      </a>
    </div>
  </nav>
);

const Hero = ({ scrollToMenu }) => (
  <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pb-48 md:pb-32">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1920"
        alt="Delicious Food"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </div>

    <div className="relative z-30 text-center px-4 max-w-4xl mx-auto mt-16">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
        <Star size={12} />
        <span>Nouveau à Cergy</span>
        <Star size={12} />
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
        L'Inde rencontre la <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Street Food</span>
      </h1>
      <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Du Butter Chicken crémeux aux Tacos géants.
        Une cuisine fusion audacieuse au cœur de Cergy.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={scrollToMenu}
          className="bg-amber-500 text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
        >
          Voir le Menu <ChevronRight size={20} />
        </button>
        <a
          href="https://maps.app.goo.gl/zxbBkhKQ8qP2FSoK8"
          target="_blank"
          rel="noreferrer"
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
        >
          <MapPin size={20} />
          Y aller
        </a>
      </div>
    </div>
  </div>
);

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre Carte</h2>
          <p className="text-gray-400">Des produits frais, préparés à la commande.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all border ${activeCategory === cat.id
                ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:border-zinc-600 hover:text-white'
                }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-all hover:translate-y-[-4px]">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  {item.popular && (
                    <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Flame size={12} /> Populaire
                    </span>
                  )}
                  <span className="bg-white text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg ml-auto">
                    {item.price}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                <button className="w-full py-2 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-sm">
                  Voir détails <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon: Icon, title, sub, action, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 flex items-start gap-4 hover:bg-zinc-800 transition-all group"
  >
    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-3">{sub}</p>
      <span className="text-amber-500 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
        {action} <ChevronRight size={14} />
      </span>
    </div>
  </a>
);

const Footer = () => (
  <footer className="bg-zinc-950 pt-20 pb-10 border-t border-white/5">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">V</div>
            <span className="text-2xl font-bold tracking-tighter text-white">VAAV<span className="text-amber-500">.</span></span>
          </div>
          <p className="text-gray-400 max-w-sm mb-6">
            Le goût authentique de l'Inde mélangé à la culture street food urbaine.
            Cuisine fraîche, ambiance décontractée.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-black transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Liens Rapides</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Menu</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Commander</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Avis Clients</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Mentions Légales</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Horaires</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex justify-between"><span>Lun - Sam</span> <span className="text-white">11:30 - 22:00</span></li>
            <li className="flex justify-between text-zinc-600"><span>Dimanche</span> <span>Fermé</span></li>
          </ul>
          <div className="mt-6 flex items-center gap-2 text-green-500 text-sm font-bold animate-pulse">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Ouvert maintenant
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
        <p>&copy; 2025 Vaav Restaurant. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('accueil');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        <Hero scrollToMenu={() => scrollToSection('menu')} />

        {/* Quick Info Strip */}
        <div className="relative -mt-20 z-20 px-4 mb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              icon={Clock}
              title="11:30 - 22:00"
              sub="Lundi au Samedi"
              action="Voir horaires"
              link="#"
            />
            <InfoCard
              icon={MapPin}
              title="Cergy, France"
              sub="32bis Rue de l'Abondance"
              action="Itinéraire"
              link="https://maps.app.goo.gl/zxbBkhKQ8qP2FSoK8"
            />
            <InfoCard
              icon={Phone}
              title="01 30 73 55 18"
              sub="Click & Collect"
              action="Appeler"
              link="tel:+33130735518"
            />
          </div>
        </div>

        <MenuSection />

        {/* Reviews Section */}
        <section className="py-20 bg-zinc-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Ce qu'ils en pensent</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-black p-6 rounded-2xl border border-zinc-800 text-left">
                  <div className="flex gap-1 text-amber-500 mb-4">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{review.text}"</p>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">- {review.user}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-white">4.6</span>
              <div className="text-left">
                <div className="flex text-amber-500 text-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-gray-500 text-xs">sur Google Reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/10"></div>
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Prêt à commander ?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Passez nous voir ou commandez maintenant. <br />
              Le meilleur Butter Chicken de Cergy vous attend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ubereats.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#06C167] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#05a357] transition-all"
              >
                Commander sur UberEats
              </a>
              <a
                href="tel:+33130735518"
                className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                <Phone size={20} />
                01 30 73 55 18
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}