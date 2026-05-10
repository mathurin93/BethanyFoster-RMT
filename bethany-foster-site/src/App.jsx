import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, MapPin, Mail, Phone, X } from 'lucide-react';

// --- Custom Icons ---
const ReviewIcon = ({ size = 24, className = '', strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Speech Bubble */}
    <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8.5l-2 3v-3H4a2 2 0 0 1-2-2V5z" />
    {/* Stars */}
    <polygon points="7,6.5 7.4,7.6 8.5,7.6 7.6,8.4 7.9,9.5 7,8.9 6.1,9.5 6.4,8.4 5.5,7.6 6.6,7.6" />
    <polygon points="12,6.5 12.4,7.6 13.5,7.6 12.6,8.4 12.9,9.5 12,8.9 11.1,9.5 11.4,8.4 10.5,7.6 11.6,7.6" />
    <polygon points="17,6.5 17.4,7.6 18.5,7.6 17.6,8.4 17.9,9.5 17,8.9 16.1,9.5 16.4,8.4 15.5,7.6 16.6,7.6" />
    {/* Person */}
    <circle cx="6.5" cy="18.5" r="4" />
    <circle cx="6.5" cy="16.5" r="1.25" />
    <path d="M4 21a2.5 2.5 0 0 1 5 0" />
    {/* Lines */}
    <line x1="12.5" y1="16" x2="21" y2="16" />
    <line x1="12.5" y1="18.5" x2="21" y2="18.5" />
    <line x1="12.5" y1="21" x2="21" y2="21" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = '', strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- Constants & Data ---
const BOOKING_LINK = "https://bethanyfosterrmt.janeapp.com/#staff_member/1";
const LOCATION_LINK = "https://google.com/maps/place//data=!4m3!3m2!1s0x882b9b7fc5f8458b:0xf93f86edecd13ad!12e1?source=g.page.m.kd._&laa=lu-desktop-review-solicitation";
const REVIEW_LINK = "https://g.page/r/Ca0Tzd5u-JMPEAE/review";
const INSTAGRAM_LINK = "https://www.instagram.com/bfoster_rmt/";

// Dynamic Base URL to ensure images load both locally (npm run dev) and on GitHub Pages
const BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '/' : '/BethanyFoster-RMT/';

const SERVICES_SLIDES = [
  {
    title: 'Registered Massage Therapy',
    image: `${BASE}massage-v1.png`
  },
  {
    title: 'Cupping Therapy',
    image: `${BASE}cupping-v1.png`
  },
  {
    title: 'Facial Massage Therapy',
    image: `${BASE}facial-v1.png`
  }
];

const DETAILED_SERVICES = [
  {
    title: "Registered Massage Therapy",
    image: `${BASE}massage.png`,
    description: "Massage therapy is an ancient practice used across cultures for thousands of years. By applying pressure and manipulating the muscles and tissues, massage enhances circulation and promotes natural healing.",
    pricing: [
      "30min- $80.00",
      "45min- $100.00",
      "60min- $120.00",
      "75min- $140.00",
      "90min- $170.00",
      "+ HST",
      "fees above do not include HST"
    ]
  },
  {
    title: "Cupping Therapy",
    image: `${BASE}cupping.jpeg`,
    description: "Cupping therapy is an ancient practice used for thousands of years. By creating a vacuum effect, the cups lift the skin and tissues, enhancing circulation, movement, and promoting deep relief of pain and tension.",
    pricing: [
      "60 minutes",
      "75 minutes",
      "90 minutes",
      "An additional $15 per treatment"
    ]
  },
  {
    title: "Facial Massage Therapy",
    image: `${BASE}facial.png`,
    description: "Facial massage therapy uses gentle pressure that manipulates the facial muscles to enhance circulation, reduce tension, and promote deep relaxation. Great for TMJ and Headaches.",
    pricing: [
      "30 minutes",
      "45 minutes",
      "60 minutes",
      "An additional $10 per treatment"
    ]
  }
];

const REVIEWS = [
  {
    text: "Bethany's expertise and caring nature made my massage experience truly exceptional. I highly recommend her!",
    author: "- Sarah M."
  },
  {
    text: "I have been a client of Bethany for years, and she consistently delivers outstanding massages tailored to my needs.",
    author: "- John D."
  },
  {
    text: "Bethany's professionalism and skillful techniques have been instrumental in alleviating my chronic muscle tension. I am grateful for her expertise.",
    author: "- Emily R."
  }
];

// --- Sub-components ---

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Button = ({ children, onClick, href, className = '' }) => {
  const baseClass = `bg-[#6E97B8] text-white px-8 py-3 hover:bg-opacity-90 transition-colors text-[16px] tracking-wide inline-block text-center cursor-pointer ${className}`;
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>{children}</a>;
  }
  return <button onClick={onClick} className={baseClass}>{children}</button>;
};

const SectionTitle = ({ children, className = '' }) => (
  <h2 className={`font-serif text-[44px] md:text-[52px] font-bold text-[#414141] mb-12 text-center ${className}`}>
    {children}
  </h2>
);

const ContactSection = () => (
  <section className="bg-[#D0D0D0] py-24 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto bg-white relative z-10 p-0 shadow-sm">
          <Reveal className="bg-[#EAEAEA] p-12 text-center">
              <h2 className="font-serif text-4xl mb-0 text-[#0A0A0A] font-bold">I'll Get Back to You<br/>Shortly</h2>
          </Reveal>
          <div className="p-12 px-8 md:px-24 text-center">
              <Reveal delay={100}>
                  <p className="text-[16px] leading-[1.6] text-[#414141] mb-12">
                      Reach out to schedule a session and take the first step towards enhancing your well-being.
                  </p>
              </Reveal>
              <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
                  <Reveal delay={200} className="grid md:grid-cols-2 gap-8">
                      <div>
                          <input type="text" placeholder="First Name *" className="w-full pb-2 border-b border-[#6E97B8] focus:outline-none focus:border-black text-[16px] text-[#414141] placeholder-[#6E97B8] bg-transparent transition-colors" />
                      </div>
                      <div>
                          <input type="text" placeholder="Last Name *" className="w-full pb-2 border-b border-[#6E97B8] focus:outline-none focus:border-black text-[16px] text-[#414141] placeholder-[#6E97B8] bg-transparent transition-colors" />
                      </div>
                  </Reveal>
                  <Reveal delay={300}>
                      <input type="email" placeholder="Email *" className="w-full pb-2 border-b border-[#6E97B8] focus:outline-none focus:border-black text-[16px] text-[#414141] placeholder-[#6E97B8] bg-transparent transition-colors" />
                  </Reveal>
                  <Reveal delay={400}>
                      <input type="text" placeholder="Message" className="w-full pb-2 border-b border-[#6E97B8] focus:outline-none focus:border-black text-[16px] text-[#414141] placeholder-[#6E97B8] bg-transparent transition-colors mt-8" />
                  </Reveal>
                  <Reveal delay={500} className="pt-8 flex justify-center">
                      <Button>Get in Touch</Button>
                  </Reveal>
                  <Reveal delay={600}>
                      <p className="text-center text-[16px] leading-[1.6] mt-8 text-[#414141]">Thank You for Reaching Out!</p>
                  </Reveal>
              </form>
          </div>
      </div>
  </section>
);

// --- Page Components ---

const Home = ({ navigateTo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SERVICES_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SERVICES_SLIDES.length) % SERVICES_SLIDES.length);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full max-w-[1400px] mx-auto overflow-hidden bg-[#FFFFFF]">
        <img 
          src={`${BASE}home-page-v4.png`} 
          alt="Massage table setup" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Crisp Hero Overlay: Updated to #D0D0D0 at 20% opacity */}
        <div className="absolute inset-0 bg-[#D0D0D0]/20 pointer-events-none"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Reveal><h1 className="font-serif text-5xl md:text-[64px] font-bold text-[#6E97B8] mb-4">Relax, Restore, Renew</h1></Reveal>
          <Reveal delay={200}><p className="text-[#6E97B8] tracking-[0.2em] text-[16px] uppercase mb-8 font-bold">Bethany Foster RMT</p></Reveal>
          <Reveal delay={400}><Button href={BOOKING_LINK} className="hidden md:inline-block">Book Online</Button></Reveal>
        </div>
      </section>

      {/* Intro Section - Restructured for perfect mobile stacking */}
      <section className="w-full bg-[#EAEAEA] pt-12 md:pt-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-end">
          <Reveal className="w-full aspect-[3/4] overflow-hidden bg-gray-200">
            <img 
              src={`${BASE}bethany-profile-v6.png`} 
              alt="Bethany Foster" 
              className="w-full h-full object-cover object-top"
            />
          </Reveal>
          <div className="w-full pb-12 md:pb-24">
            <Reveal delay={100}><h2 className="font-serif text-4xl md:text-[44px] font-medium mb-8 text-[#414141]">Bethany Foster,<br/>Registered Massage<br/>Therapist</h2></Reveal>
            <div className="space-y-6 font-sans text-[#414141] text-[16px] leading-[1.6] mb-10">
              <Reveal delay={200}><p>Welcome to my website!</p></Reveal>
              <Reveal delay={300}><p>I am a passionate and dedicated Registered Massage Therapist (RMT) committed to helping you achieve relaxation, pain relief, and overall well-being through the art of massage therapy.</p></Reveal>
            </div>
            <Reveal delay={400} className="flex flex-col md:flex-row gap-4 w-full">
              <Button onClick={() => navigateTo('about')} className="w-full md:w-auto">Learn More</Button>
              <Button href={BOOKING_LINK} className="w-full md:w-auto">Book An Appointment</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="bg-[#D0D0D0] py-24 text-center overflow-hidden">
        <Reveal><SectionTitle className="text-[#0A0A0A]">Services</SectionTitle></Reveal>
        
        <Reveal delay={200} className="relative mx-auto w-full md:max-w-[1100px] px-4 mt-12 flex flex-col md:block">
          
          <button onClick={prevSlide} className="hidden md:block absolute left-0 md:left-4 top-1/2 -translate-y-1/2 text-[#6E97B8] hover:text-[#0A0A0A] transition-colors z-20">
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          
          {/* Image - takes up right side */}
          <div className="relative md:w-[80%] md:ml-auto aspect-[4/3] md:aspect-[16/9] overflow-hidden shadow-md group bg-[#EAEAEA]">
            <img 
              src={SERVICES_SLIDES[currentSlide].image} 
              alt={SERVICES_SLIDES[currentSlide].title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Overlapping Info Box - shifted to barely overlap on the left */}
          <div className="relative z-10 bg-[#EAEAEA]/95 p-8 md:p-12 text-center backdrop-blur-sm shadow-md mx-4 md:mx-0 -mt-16 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-12 lg:left-24 md:w-[45%] lg:w-[40%] flex items-center justify-between md:justify-center">
            <button onClick={prevSlide} className="md:hidden text-[#6E97B8] hover:text-[#0A0A0A] transition-colors z-10"><ChevronLeft size={36} strokeWidth={1} /></button>
            <div className="flex flex-col items-center w-full px-2">
                <h3 className="font-serif text-[28px] md:text-[36px] lg:text-[40px] font-normal text-[#6E97B8] mb-8 leading-snug">{SERVICES_SLIDES[currentSlide].title}</h3>
                <Button onClick={() => navigateTo('services')}>Learn More</Button>
            </div>
            <button onClick={nextSlide} className="md:hidden text-[#6E97B8] hover:text-[#0A0A0A] transition-colors z-10"><ChevronRight size={36} strokeWidth={1} /></button>
          </div>

          <button onClick={nextSlide} className="hidden md:block absolute right-0 md:right-4 top-1/2 -translate-y-1/2 text-[#6E97B8] hover:text-[#0A0A0A] transition-colors z-20">
            <ChevronRight size={48} strokeWidth={1} />
          </button>

        </Reveal>
      </section>

      {/* Reviews */}
      <section className="bg-[#FFFFFF] py-24 overflow-hidden">
        <Reveal><SectionTitle>Reviews</SectionTitle></Reveal>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-6 mt-16">
          {REVIEWS.map((review, idx) => (
            <Reveal key={idx} delay={idx * 200} className="flex flex-col h-full bg-transparent p-4">
              <span className="text-5xl font-serif text-[#0A0A0A] leading-none mb-4">❞</span>
              <p className="font-sans text-[16px] leading-[1.6] text-[#414141] flex-grow">
                {review.text}
              </p>
              <p className="font-sans text-[16px] leading-[1.6] font-bold text-[#414141] mt-6 mt-auto">
                {review.author}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Form Area */}
      <ContactSection />
    </div>
  );
};

const About = ({ navigateTo }) => (
  <div className="animate-fadeIn pb-32 overflow-hidden bg-[#D0D0D0]">
    {/* Title */}
    <div className="py-20 text-center">
      <Reveal><h1 className="font-serif text-5xl md:text-[64px] font-bold text-[#6E97B8]">Get to Know Me</h1></Reveal>
    </div>

    {/* Bio Section - Styled to match screenshot overlaps */}
    <div className="max-w-5xl mx-auto px-6 relative mb-32">
      <div className="flex flex-col md:flex-row items-center justify-center">
          <Reveal className="w-full md:w-[50%] z-0">
               <img 
                  src={`${BASE}about-page-image-v2.jpg`} 
                  alt="Bethany Foster" 
                  className="w-full aspect-[2/3] object-cover object-top shadow-md"
                />
          </Reveal>
          <Reveal delay={300} className="w-full md:w-[50%] bg-[#EAEAEA] p-10 md:p-14 z-10 -mt-12 md:-ml-[8%] md:mt-[15%] shadow-lg">
              <div className="font-sans text-[16px] leading-[1.6] text-[#414141] space-y-6">
                  <p>Hello, I'm Bethany! Welcome to my practice.</p>
                  <p>I am a firm believer that massage therapy is a vital component in maintaining both physical and emotional balance for optimal health. Over the years, I have dedicated myself to the art of holistic healing and therapeutic massage, ensuring that every treatment is thoughtfully tailored to the unique needs of my clients.</p>
                  <p>Outside of the clinic, I am a proud wife and a busy mother to four wonderful children—three girls and one boy. When I'm not in the treatment room, you can usually find me singing, exercising, and enjoying quality time raising my family.</p>
              </div>
          </Reveal>
      </div>
    </div>

    {/* Therapeutic Approach Title */}
    <div className="pt-12 pb-20 text-center">
      <Reveal><h2 className="font-serif text-4xl md:text-[52px] font-bold text-[#0A0A0A]">My Therapeutic<br/>Approach</h2></Reveal>
    </div>

    {/* Approach Section - Styled to match screenshot overlaps */}
    <div className="max-w-5xl mx-auto px-6 pb-24 relative mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <Reveal className="w-full md:w-[50%] z-0 md:mt-[15%] order-first md:order-last">
               <img 
                  src={`${BASE}massage.png`} 
                  alt="Spa Setting" 
                  className="w-full aspect-[3/4] object-cover shadow-md"
                />
          </Reveal>
          <Reveal delay={300} className="w-full md:w-[50%] bg-[#EAEAEA] p-10 md:p-14 z-10 -mt-12 md:-mr-[8%] md:mt-0 shadow-lg relative order-last md:order-first">
              <div className="font-sans text-[16px] leading-[1.6] text-[#414141] space-y-6">
                  <p>My treatment style is rehabilitative, therapeutic massage with experience in deep tissue, sports massage, trigger point therapy, myofascial release, prenatal massage, chronic tension headaches, facial massage, lymphatic drainage, and other musculoskeletal traumas. I graduated from the Humber College Massage Therapy program in 2015 and practiced at a busy multidisciplinary clinic for many years.</p>
                  <p>In my practice, I blend various massage techniques to create a customized treatment plan that addresses your specific needs. Whether you're seeking relief from muscle tension, injury recovery, or simply want to relax and rejuvenate, I tailor each session to promote your overall well-being.</p>
              </div>
          </Reveal>
        </div>
    </div>

    <Reveal className="text-center pb-12 mt-12">
        <Button onClick={() => navigateTo('services')}>
            Explore Services
        </Button>
    </Reveal>
  </div>
);

const Services = () => (
  <div className="animate-fadeIn pb-24 overflow-hidden bg-[#D0D0D0]">
    {/* Hero-like Top Section - Container background #D0D0D0 */}
    <div className="bg-[#D0D0D0] pt-32 pb-16 px-6 text-center text-[#414141]">
      <Reveal><h1 className="font-serif text-5xl md:text-[64px] font-bold text-[#6E97B8] mb-8 drop-shadow-sm">Therapeutic Approach</h1></Reveal>
      <Reveal delay={200}>
          <p className="max-w-3xl mx-auto font-sans text-[16px] leading-[1.6] text-[#414141] mb-12">
            Looking for a massage therapist who specializes in rehabilitative and therapeutic massage? Look no further! My treatment experience includes sports massage, trigger point therapy, myofascial release, prenatal massage, treatment for chronic tension headaches, facial massage, lymphatic drainage, cupping therapy, and more. I am here to help, book your appointment, and lets start your journey to wellness together!
          </p>
      </Reveal>
      <Reveal delay={400}><Button href={BOOKING_LINK}>Learn More</Button></Reveal>
    </div>

    {/* Services List Area */}
    <div className="bg-[#D0D0D0] py-16 md:py-24 text-center px-4">
      <Reveal><h2 className="font-serif text-5xl md:text-[52px] font-bold text-[#6E97B8] mb-8">Services</h2></Reveal>
      <Reveal delay={200}>
          <p className="font-serif text-xl text-[#0A0A0A] max-w-2xl mx-auto mb-24 leading-relaxed">
            Please Note: Fees for RMT service have been updated as of November 13th, 2025<br/>
            Thank you for your continued support!
          </p>
      </Reveal>

      {/* Single Column Stacked Layout */}
      <div className="max-w-6xl mx-auto flex flex-col gap-24 px-2 md:px-6">
         {DETAILED_SERVICES.map((srv, i) => (
            <Reveal key={i} delay={200} className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
                {/* Image top left (full image, no strict crop) */}
                <div className="w-full md:w-1/2">
                    <img src={srv.image} alt={srv.title} className="w-full h-auto object-contain" />
                </div>
                {/* Text right, pricing bottom */}
                <div className="w-full md:w-1/2 py-2 flex flex-col justify-center items-center text-center">
                    <h3 className="font-serif text-[28px] md:text-[32px] font-normal mb-8 text-[#1a1a1a]">{srv.title}</h3>
                    <p className="font-serif text-[18px] md:text-[20px] leading-[1.8] text-[#6E97B8] mb-12 max-w-md">
                        {srv.description}
                    </p>
                    <div className="font-serif text-[18px] md:text-[20px] leading-[1.8] text-[#1a1a1a] space-y-2 mb-12">
                        {srv.pricing.map((line, idx) => (
                            <p key={idx}>{line}</p>
                        ))}
                    </div>
                    <div className="mt-auto">
                        <Button href={BOOKING_LINK}>Book Online</Button>
                    </div>
                </div>
            </Reveal>
         ))}
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="animate-fadeIn pt-8 pb-12 min-h-[70vh] bg-[#FFFFFF]">
    <ContactSection />
  </div>
);

// --- Main Application Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Questrial&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen antialiased bg-[#FFFFFF] font-sans text-[#414141] flex flex-col relative" style={{ fontFamily: "'Questrial', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Questrial', sans-serif; }
      `}} />

      {/* Header */}
      <header className="bg-[#FFFFFF] py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-sm border-b border-gray-100">
        
        {/* Logo Area */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigateTo('home')}
        >
          <img 
            src={`${BASE}bethany-logo-v2.jpg`} 
            alt="Bethany Foster Logo" 
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-[#6E97B8] leading-tight">Bethany Foster</span>
            <span className="text-[10px] font-bold tracking-wider text-[#414141] uppercase">Registered Massage Therapist</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <nav className="flex gap-8 text-[18px] font-normal tracking-widest text-[#6E97B8] uppercase font-sans">
            <button onClick={() => navigateTo('home')} className={`hover:text-[#0A0A0A] transition-colors ${currentPage === 'home' ? 'text-[#0A0A0A]' : ''}`}>Home</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-[#0A0A0A] transition-colors ${currentPage === 'about' ? 'text-[#0A0A0A]' : ''}`}>About</button>
            <button onClick={() => navigateTo('services')} className={`hover:text-[#0A0A0A] transition-colors ${currentPage === 'services' ? 'text-[#0A0A0A]' : ''}`}>Services</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-[#0A0A0A] transition-colors ${currentPage === 'contact' ? 'text-[#0A0A0A]' : ''}`}>Contact</button>
          </nav>
          <Button href={BOOKING_LINK} className="py-2 px-6 text-[14px]">Book Online</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#414141] z-[70] p-1" onClick={() => setIsMenuOpen(true)}>
           <div className="space-y-1.5">
             <div className="w-7 h-[2px] bg-[#0A0A0A]"></div>
             <div className="w-7 h-[2px] bg-[#0A0A0A]"></div>
             <div className="w-7 h-[2px] bg-[#0A0A0A]"></div>
           </div>
        </button>
      </header>

      {/* Global Book Online Button for Mobile - Only visible under header */}
      <div className="md:hidden w-full bg-[#FFFFFF] px-6 py-4 border-b border-gray-100 flex justify-center">
         <Button href={BOOKING_LINK} className="w-auto px-12 py-3 shadow-sm">Book Online</Button>
      </div>

      {/* Full-Screen Mobile Overlay Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#EAEAEA] z-[100] flex flex-col items-center justify-center animate-fadeIn">
          <button className="absolute top-6 right-6 text-[#0A0A0A] p-2" onClick={() => setIsMenuOpen(false)}>
            <X size={40} strokeWidth={1.5} />
          </button>
          <nav className="flex flex-col gap-10 text-[24px] font-sans font-bold tracking-[0.1em] text-[#6E97B8] uppercase">
            <button onClick={() => navigateTo('home')} className={`transition-colors ${currentPage === 'home' ? 'text-[#0A0A0A]' : ''}`}>Home</button>
            <button onClick={() => navigateTo('about')} className={`transition-colors ${currentPage === 'about' ? 'text-[#0A0A0A]' : ''}`}>About</button>
            <button onClick={() => navigateTo('services')} className={`transition-colors ${currentPage === 'services' ? 'text-[#0A0A0A]' : ''}`}>Services</button>
            <button onClick={() => navigateTo('contact')} className={`transition-colors ${currentPage === 'contact' ? 'text-[#0A0A0A]' : ''}`}>Contact</button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home navigateTo={navigateTo} />}
        {currentPage === 'about' && <About navigateTo={navigateTo} />}
        {currentPage === 'services' && <Services navigateTo={navigateTo} />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] pt-16 pb-8 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
                <span className="font-serif text-[#6E97B8] text-xl font-bold">Bethany Foster</span>
                <div className="flex items-center gap-4 text-[16px] leading-[1.6] tracking-wide text-[#414141]">
                    <span>519- 822- 7075</span>
                    <span className="text-gray-300">|</span>
                    <span>bethanyfosterrmt@gmail.com</span>
                </div>
            </div>
            
            {/* Increased gap between icons and bumped size significantly to 44. Thinner strokeWidth for lighter appearance. */}
            <div className="flex items-center gap-10 text-[#0A0A0A] mb-2">
                <a href={REVIEW_LINK} target="_blank" rel="noopener noreferrer" aria-label="Google Review">
                    <ReviewIcon size={44} strokeWidth={1} className="cursor-pointer hover:text-[#6E97B8] transition-colors" />
                </a>
                <a href={LOCATION_LINK} target="_blank" rel="noopener noreferrer" aria-label="Location">
                    <MapPin size={44} strokeWidth={1} className="cursor-pointer hover:text-[#6E97B8] transition-colors" />
                </a>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon size={44} strokeWidth={1} className="cursor-pointer hover:text-[#6E97B8] transition-colors" />
                </a>
            </div>

            <div className="text-[14px] font-bold text-[#414141]">
                © 2035 by Bethany Foster.
            </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 bg-[#6E97B8] text-white p-4 rounded-md shadow-lg hover:bg-opacity-90 transition-all z-50">
        <MessageSquare size={24} fill="currentColor" />
      </button>

    </div>
  );
}