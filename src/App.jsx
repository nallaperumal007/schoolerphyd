import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  Briefcase, 
  FileText, 
  Globe, 
  Award, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  Users, 
  UserCheck, 
  Shield, 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  Lock, 
  TrendingUp,
  Clock,
  ArrowUpRight,
  ChevronDown,
  Activity,
  Check,
  HelpCircle,
  Play,
  Terminal,
  Zap,
  CheckCircle,
  Database,
  EyeOff,
  FileMinus,
  ShieldAlert,
  ShieldCheck,
  Layers
} from 'lucide-react';

// Theme Presets for Dynamic Styling
const THEMES = [
  { name: 'Nebula', color1: '#6366f1', color2: '#d946ef', label: 'Indigo / Magenta' },
  { name: 'Aurora', color1: '#10b981', color2: '#06b6d4', label: 'Emerald / Teal' },
  { name: 'Sunset', color1: '#f43f5e', color2: '#fb923c', label: 'Rose / Amber' },
  { name: 'Quantum', color1: '#3b82f6', color2: '#6366f1', label: 'Blue / Indigo' }
];

// Custom Hook: Intersection Observer for Scroll Reveals
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (options.triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else {
        if (!options.triggerOnce) {
          setIsIntersecting(false);
        }
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}

// Wrapper Component for Scroll Animations
function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, inView] = useIntersectionObserver({ triggerOnce: true, threshold: 0.05 });
  
  const getDirectionClass = () => {
    switch(direction) {
      case 'up': return 'reveal-up';
      case 'down': return 'reveal-down';
      case 'left': return 'reveal-left';
      case 'right': return 'reveal-right';
      case 'fade': return 'reveal-fade';
      default: return 'reveal-up';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} reveal-base ${getDirectionClass()} ${inView ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeLink, setActiveLink] = useState('features');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Theme customizer state
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);

  // Role dashboard selection state
  const [activeRole, setActiveRole] = useState('student');

  // AI Sandbox simulation state
  const [aiPrompt, setAiPrompt] = useState('Suggest a 6-month roadmap for Full-Stack Web Development.');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiModule, setAiModule] = useState('advisor'); // advisor, scheduler, doubt, resume
  const typingTimerRef = useRef(null);

  // Email newsletter signup
  const [email, setEmail] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  // FAQ Accordion index
  const [activeFaq, setActiveFaq] = useState(null);

  // Stats Counters
  const [studentsCount, setStudentsCount] = useState(0);
  const [placementsCount, setPlacementsCount] = useState(0);
  const [recruitersCount, setRecruitersCount] = useState(0);

  // Hero Parallax Tilt state
  const [tilt, setTilt] = useState({ x: -4, y: 4 });

  // Update theme variables dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-1', currentTheme.color1);
    document.documentElement.style.setProperty('--accent-2', currentTheme.color2);
  }, [currentTheme]);

  // Scroll event monitors
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats count up animation
  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      setStudentsCount(Math.min(Math.floor((10000 / steps) * currentStep), 10000));
      setPlacementsCount(Math.min(Math.floor((500 / steps) * currentStep), 500));
      setRecruitersCount(Math.min(Math.floor((200 / steps) * currentStep), 200));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Character typing simulation
  const typeText = (text) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setAiResponse('');
    
    let i = 0;
    typingTimerRef.current = setInterval(() => {
      setAiResponse((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(typingTimerRef.current);
      }
    }, 10);
  };

  // Predefined prompt responses
  const triggerAiResponse = (moduleType) => {
    setIsAiLoading(true);
    setAiModule(moduleType);
    
    let prompt = '';
    let responseText = '';
    
    switch (moduleType) {
      case 'advisor':
        prompt = 'Suggest a 6-month roadmap for Full-Stack Web Development.';
        responseText = `🤖 Opulent AI Advisor:
• Months 1-2: HTML5, CSS3, ES6 JavaScript, and responsive design systems.
• Month 3: React.js components, state managers (Zustand/Redux), context APIs.
• Month 4: Node.js, Express routing, REST APIs, and MongoDB schema designs.
• Month 5: Full-stack application deployment, Jest testing, and Git operations.
• Month 6: Portfolio optimization, ATS Resume builder alignment, and interview routing.

Recommended Module: Complete MERN Stack Track.`;
        break;
      case 'scheduler':
        prompt = 'Reschedule my mock interview to resolve calendar conflict.';
        responseText = `📅 Opulent AI Scheduler:
• Alert: Conflict detected between "Mock Interview #2" and "LMS System Architecture Live Lecture" on Friday at 2:00 PM.
• Action: Shifted Mock Interview #2 to Monday, June 15th at 4:30 PM (your optimal availability window).
• Sync Status: System updated. Google Calendar invite re-sent to candidate & recruiter.`;
        break;
      case 'doubt':
        prompt = 'Explain the difference between useEffect dependency array items in React.';
        responseText = `💬 Opulent AI Doubt Assistant:
In React's useEffect hook:
1. [] (Empty array): Runs once after the initial render (component mount).
2. [prop, state] (With dependencies): Runs on mount and whenever those dependencies update.
3. No dependency array: Executes after every single render of the component.

Tip: Always declare variables used inside useEffect that change over time to avoid stale closures.`;
        break;
      case 'resume':
        prompt = 'Optimize my resume summary for a Backend Engineer position.';
        responseText = `📄 Opulent AI Resume Optimizer (Score: 95/100):
"Results-driven Software Engineer with 2+ years of experience designing and deploying scalable Web APIs. Proven track record in optimizing backend query latency by 40% and containerizing microservices using Docker/Kubernetes. Highly proficient in Node.js, Python, and PostgreSQL architecture."

Keywords injected: Microservices, API Latency, Scalability, Docker, Kubernetes.`;
        break;
      default:
        break;
    }

    setAiPrompt(prompt);
    
    setTimeout(() => {
      setIsAiLoading(false);
      typeText(responseText);
    }, 600);
  };

  useEffect(() => {
    triggerAiResponse('advisor');
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  // 3D Parallax Tilt effects
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;
    
    setTilt({
      x: normalizedX * 8,
      y: -normalizedY * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: -4, y: 4 });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setEmailSubscribed(false);
      }, 4000);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen position-relative overflow-hidden">
      {/* Floating backdrop drifts for animations */}
      <div className="drift-glow-container">
        <div className="drift-glow-1"></div>
        <div className="drift-glow-2"></div>
        <div className="drift-glow-3"></div>
      </div>

      {/* Dynamic Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Background grid */}
      <div className="bg-grid"></div>

      {/* 1. NAVBAR */}
      <nav className={`navbar navbar-expand-lg glass-navbar sticky-top py-3.5 ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#hero">
            <span className="bg-light border border-secondary-subtle d-flex align-items-center justify-content-center me-2.5" style={{ width: '42px', height: '42px', borderRadius: '12px', boxShadow: 'var(--shadow-glow)' }}>
              <i className="bi bi-rocket-takeoff-fill text-gradient" style={{ fontSize: '1.35rem' }}></i>
            </span>
            <div>
              <span className="fw-extrabold fs-4 text-gradient">CareerOS</span>
              <span className="d-block text-muted text-uppercase fw-bold" style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}>Opulent Vidya</span>
            </div>
          </a>
          
          <button className="navbar-toggler border-0 shadow-none text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-3 ${activeLink === 'features' ? 'text-primary' : 'text-secondary'}`} href="#features" onClick={() => setActiveLink('features')}>Features</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-3 ${activeLink === 'problem' ? 'text-primary' : 'text-secondary'}`} href="#problem" onClick={() => setActiveLink('problem')}>Why Us</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-3 ${activeLink === 'dashboards' ? 'text-primary' : 'text-secondary'}`} href="#dashboards" onClick={() => setActiveLink('dashboards')}>Dashboards</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-3 ${activeLink === 'ai' ? 'text-primary' : 'text-secondary'}`} href="#ai" onClick={() => setActiveLink('ai')}>AI Center</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-3 ${activeLink === 'how-it-works' ? 'text-primary' : 'text-secondary'}`} href="#how-it-works" onClick={() => setActiveLink('how-it-works')}>Timeline</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-3 ${activeLink === 'faq' ? 'text-primary' : 'text-secondary'}`} href="#faq" onClick={() => setActiveLink('faq')}>FAQ</a>
              </li>
            </ul>
            
            {/* Real-time Theme selector */}
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 border-end border-secondary-subtle pe-3 me-2">
                <span className="text-muted fs-8 fw-bold text-uppercase d-none d-xl-inline">Theme:</span>
                <div className="d-flex gap-1.5">
                  {THEMES.map((t) => (
                    <span 
                      key={t.name}
                      onClick={() => setCurrentTheme(t)}
                      className={`accent-dot ${currentTheme.name === t.name ? 'active' : ''}`}
                      style={{ background: `linear-gradient(135deg, ${t.color1}, ${t.color2})` }}
                      title={t.label}
                    ></span>
                  ))}
                </div>
              </div>

              <a href="#cta" className="btn btn-secondary-outline border-0 py-2 px-3.5 d-none d-sm-inline-block">Book Demo</a>
              <a href="#cta" className="btn btn-primary-gradient py-2 px-4.5">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="hero" className="position-relative overflow-hidden section-padding pt-5">
        <div className="container position-relative z-2">
          <div className="row align-items-center gy-5">
            
            {/* Text column */}
            <div className="col-lg-6 text-start">
              <ScrollReveal direction="up">
                <div className="d-inline-flex align-items-center mb-3">
                  <span className="pulse-badge">
                    <span className="pulse-dot"></span>
                    ✨ Introducing Opulent Vidya CareerOS v2.0 AI
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h1 className="display-4 fw-extrabold lh-sm mb-3.5 glow-text" style={{ fontSize: '3.65rem' }}>
                  One Platform.<br />
                  <span className="text-gradient">Complete Career Journey.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <p className="lead text-secondary mb-4.5 fs-5" style={{ maxWidth: '550px' }}>
                  A unified SaaS infrastructure integrating LMS, verified project builders, automated internships, ATS resume generators, and recruitment pipelines in a single unified dashboard.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <a href="#cta" className="btn btn-primary-gradient px-4.5 py-3 fs-6 d-inline-flex align-items-center gap-2">
                    <span>Start Learning</span>
                    <ArrowRight size={18} />
                  </a>
                  <a href="#cta" className="btn btn-secondary-outline px-4.5 py-3 fs-6">
                    Book Private Demo
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <div className="row g-4 pt-4 border-top border-secondary-subtle border-opacity-30">
                  <div className="col-auto">
                    <div className="d-flex align-items-center gap-2">
                      <span className="bg-success bg-opacity-10 text-success p-1 rounded-circle d-flex" style={{ border: '1px solid rgba(20, 184, 166, 0.2)' }}><Check size={14} /></span>
                      <span className="text-secondary fw-bold fs-7">No platform hopping</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex align-items-center gap-2">
                      <span className="bg-success bg-opacity-10 text-success p-1 rounded-circle d-flex" style={{ border: '1px solid rgba(20, 184, 166, 0.2)' }}><Check size={14} /></span>
                      <span className="text-secondary fw-bold fs-7">Live AI-guided tracks</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex align-items-center gap-2">
                      <span className="bg-success bg-opacity-10 text-success p-1 rounded-circle d-flex" style={{ border: '1px solid rgba(20, 184, 166, 0.2)' }}><Check size={14} /></span>
                      <span className="text-secondary fw-bold fs-7">Direct hiring pipelines</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* 3D tilt interactive preview */}
            <div className="col-lg-6">
              <ScrollReveal direction="fade" delay={200}>
                <div 
                  className="position-relative py-4 hero-parallax-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ 
                    transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="mock-dashboard-wrapper">
                    <div className="mock-dashboard-body p-3.5 text-start position-relative">
                      
                      <div className="d-flex align-items-center justify-content-between pb-3 border-bottom border-secondary-subtle border-opacity-30 mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <span className="bg-danger rounded-circle d-inline-block" style={{ width: '9px', height: '9px' }}></span>
                          <span className="bg-warning rounded-circle d-inline-block" style={{ width: '9px', height: '9px' }}></span>
                          <span className="bg-success rounded-circle d-inline-block" style={{ width: '9px', height: '9px' }}></span>
                          <span className="text-muted fw-bold ms-2 fs-8" style={{ letterSpacing: '0.05em' }}>STUDENT_PORTAL_SECURE</span>
                        </div>
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 py-1.5 px-3 rounded-pill d-flex align-items-center gap-1.5 fs-8">
                          <span className="pulse-dot"></span>
                          AI Tracker Active
                        </span>
                      </div>

                      <div className="row g-3">
                        {/* Profile Block */}
                        <div className="col-md-7">
                          <div className="p-3 border border-secondary-subtle border-opacity-30 rounded-3 bg-white bg-opacity-80 h-100">
                            <div className="d-flex align-items-center gap-3 mb-3">
                              <div className="bg-secondary bg-opacity-10 border border-secondary-subtle border-opacity-30 text-dark rounded-circle d-flex align-items-center justify-content-center fw-extrabold fs-6" style={{ width: '45px', height: '45px', boxShadow: 'var(--shadow-glow)' }}>
                                SV
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold text-dark fs-6">Siddharth Varma</h6>
                                <span className="text-muted fs-8">MERN Stack Cohort #4</span>
                              </div>
                            </div>
                            
                            {/* SVG Coding hours line chart */}
                            <div className="mb-3">
                              <div className="d-flex justify-content-between text-muted fs-8 mb-1">
                                <span>Weekly Activity (Coding Hours)</span>
                                <span className="fw-bold text-gradient-teal">34.5 hrs</span>
                              </div>
                              <div className="bg-light border border-secondary-subtle border-opacity-20 rounded p-2" style={{ height: '70px' }}>
                                <svg viewBox="0 0 100 30" width="100%" height="100%" preserveAspectRatio="none">
                                  <path 
                                    d="M0,25 Q15,10 30,22 T60,5 T90,15 T100,8" 
                                    fill="none" 
                                    stroke="url(#chartGradHero)" 
                                    strokeWidth="2.5" 
                                    className="svg-chart-path"
                                  />
                                  <defs>
                                    <linearGradient id="chartGradHero" x1="0" y1="0" x2="1" y2="0">
                                      <stop offset="0%" stopColor="var(--accent-1)" />
                                      <stop offset="100%" stopColor="var(--accent-2)" />
                                    </linearGradient>
                                  </defs>
                                  <line x1="0" y1="28" x2="100" y2="28" stroke="#e2e8f0" strokeWidth="1" />
                                </svg>
                              </div>
                            </div>

                            <div className="mb-2 text-start">
                              <div className="d-flex justify-content-between text-muted fs-8 mb-1">
                                <span>Course syllabus completion</span>
                                <span className="fw-bold text-gradient">88%</span>
                              </div>
                              <div className="progress" style={{ height: '5px', backgroundColor: '#e2e8f0' }}>
                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '88%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Resume Block */}
                        <div className="col-md-5">
                          <div className="p-3 border border-secondary-subtle border-opacity-30 rounded-3 bg-white bg-opacity-80 text-start h-100 d-flex flex-column justify-content-between">
                            <div>
                              <span className="text-muted fs-8 fw-extrabold d-block mb-1 text-uppercase">ATS Resume Score</span>
                              <div className="d-flex align-items-baseline gap-2 mb-2">
                                <span className="fs-3 fw-extrabold text-gradient-teal">94/100</span>
                                <span className="badge bg-success bg-opacity-10 text-success fs-8 border border-success border-opacity-20">Top 2%</span>
                              </div>
                            </div>
                            <div className="border-top border-secondary-subtle border-opacity-35 pt-2">
                              <span className="text-muted fs-8 d-block text-uppercase mb-1.5">Verified Badges</span>
                              <div className="d-flex flex-wrap gap-1">
                                <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary-subtle fs-9">React</span>
                                <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary-subtle fs-9">Node</span>
                                <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary-subtle fs-9">SQL</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Recruiter Pipelines */}
                        <div className="col-12 text-start">
                          <div className="p-3 border border-secondary-subtle border-opacity-30 rounded-3 bg-white bg-opacity-80">
                            <div className="d-flex justify-content-between align-items-center mb-2.5 pb-2 border-bottom border-secondary-subtle">
                              <h6 className="mb-0 fw-bold fs-7 text-dark">Active Recruiter Invites</h6>
                              <span className="badge bg-danger bg-opacity-10 text-danger fs-8 border border-danger border-opacity-20">2 Live</span>
                            </div>
                            
                            <div className="d-flex align-items-center justify-content-between mb-2 fs-7">
                              <div className="d-flex align-items-center gap-2">
                                <span className="bg-primary bg-opacity-10 text-primary border border-primary border-opacity-30 rounded-circle d-flex" style={{ width: '22px', height: '22px', alignItems: 'center', justifycontent: 'center' }}><i className="bi bi-google fs-8"></i></span>
                                <div>
                                  <span className="fw-bold d-block text-dark">Google Cloud India</span>
                                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>Backend Engineer Intern</span>
                                </div>
                              </div>
                              <span className="badge bg-success bg-opacity-10 text-success fs-8 border border-success border-opacity-20">Interview Stage</span>
                            </div>
                            
                            <div className="d-flex align-items-center justify-content-between fs-7">
                              <div className="d-flex align-items-center gap-2">
                                <span className="bg-secondary bg-opacity-10 text-dark border border-secondary-subtle rounded-circle d-flex" style={{ width: '22px', height: '22px', alignItems: 'center', justifycontent: 'center' }}><i className="bi bi-stripe fs-8"></i></span>
                                <div>
                                  <span className="fw-bold d-block text-dark">Stripe Tech</span>
                                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>Front End Engineer</span>
                                </div>
                              </div>
                              <span className="badge bg-primary bg-opacity-10 text-primary fs-8 border border-primary border-opacity-20">Shortlisted</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div 
                    className="position-absolute bg-white rounded-3 p-3 shadow-lg border border-secondary-subtle d-flex align-items-center gap-2.5" 
                    style={{ 
                      top: '-15px', 
                      left: '-25px', 
                      zIndex: '3', 
                      maxWidth: '180px', 
                      transform: 'translateZ(30px)',
                      animation: 'float 5s ease-in-out infinite'
                    }}
                  >
                    <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle d-flex" style={{ border: '1px solid rgba(20, 184, 166, 0.2)' }}><CheckSquare size={16} /></div>
                    <div className="text-start">
                      <span className="text-muted fs-8 d-block">Assignments</span>
                      <span className="fw-extrabold fs-7 text-dark">100% Passed</span>
                    </div>
                  </div>

                  <div 
                    className="position-absolute bg-white rounded-3 p-3 shadow-lg border border-secondary-subtle d-flex align-items-center gap-2.5" 
                    style={{ 
                      bottom: '-15px', 
                      right: '-15px', 
                      zIndex: '3', 
                      maxWidth: '220px', 
                      transform: 'translateZ(40px)',
                      animation: 'float-slow 8s ease-in-out infinite' 
                    }}
                  >
                    <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle d-flex" style={{ border: '1px solid rgba(234, 179, 8, 0.2)' }}><Globe size={16} /></div>
                    <div className="text-start">
                      <span className="text-muted fs-8 d-block">Global Pathway</span>
                      <span className="fw-extrabold fs-7 text-dark">US MS Offer Secured 🇺🇸</span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TRUST SECTION */}
      <section className="bg-white border-top border-bottom border-secondary-subtle border-opacity-20 py-5">
        <div className="container">
          <ScrollReveal direction="fade">
            <h6 className="text-center text-uppercase fw-extrabold text-muted mb-4 fs-8" style={{ letterSpacing: '0.18em' }}>
              Trusted by 10,000+ Students, Trainers & Recruiters Globally
            </h6>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={100}>
            <div className="row row-cols-2 row-cols-md-4 g-4 align-items-center justify-content-center text-center pb-4">
              <div className="col">
                <div className="trust-logo">
                  <i className="bi bi-microsoft me-2.5 fs-5"></i> Microsoft
                </div>
              </div>
              <div className="col">
                <div className="trust-logo">
                  <i className="bi bi-amazon me-2.5 fs-5"></i> Amazon
                </div>
              </div>
              <div className="col">
                <div className="trust-logo">
                  <i className="bi bi-google me-2.5 fs-5"></i> Google Cloud
                </div>
              </div>
              <div className="col">
                <div className="trust-logo">
                  <i className="bi bi-stripe me-2.5 fs-5"></i> Stripe
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Counts */}
          <ScrollReveal direction="up" delay={200}>
            <div className="row g-4 mt-3 text-center justify-content-center border-top border-secondary border-opacity-25 pt-4">
              <div className="col-md-3">
                <div className="p-2">
                  <h2 className="display-6 fw-extrabold text-gradient mb-1">
                    {studentsCount.toLocaleString()}+
                  </h2>
                  <span className="text-secondary fw-bold fs-7">Active Students</span>
                </div>
              </div>
              <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center">
                <div className="vr h-75 bg-secondary bg-opacity-20 mx-auto" style={{ width: '1px' }}></div>
              </div>
              <div className="col-md-3">
                <div className="p-2">
                  <h2 className="display-6 fw-extrabold text-gradient mb-1">
                    {placementsCount}+
                  </h2>
                  <span className="text-secondary fw-bold fs-7">High-Tier Placements</span>
                </div>
              </div>
              <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center">
                <div className="vr h-75 bg-secondary bg-opacity-20 mx-auto" style={{ width: '1px' }}></div>
              </div>
              <div className="col-md-3">
                <div className="p-2">
                  <h2 className="display-6 fw-extrabold text-gradient mb-1">
                    {recruitersCount}+
                  </h2>
                  <span className="text-secondary fw-bold fs-7">Verified Hiring Partners</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. PROBLEM → SOLUTION SECTION */}
      <section id="problem" className="section-padding position-relative overflow-hidden">
        <div className="glow-blob glow-blue" style={{ top: '20%', left: '5%', opacity: 0.15 }}></div>
        <div className="glow-blob glow-purple" style={{ bottom: '20%', right: '5%', opacity: 0.15 }}></div>
        
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">Product Rationale</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">Re-engineering Career Logistics</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                Why does conventional edtech result in high dropouts and poor hiring efficiency? Because tools are scattered. CareerOS unites them.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-4 align-items-stretch">
            {/* Problems */}
            <div className="col-lg-6">
              <ScrollReveal direction="left" delay={150} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between" style={{ border: '1px solid rgba(244, 63, 94, 0.12)', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(244, 63, 94, 0.01) 100%)' }}>
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
                      <span className="bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center" style={{ width: '46px', height: '46px', borderRadius: '12px' }}>
                        <ShieldAlert size={22} />
                      </span>
                      <div>
                        <h4 className="mb-0 fw-extrabold text-danger" style={{ fontSize: '1.25rem' }}>The Fragmented Setup</h4>
                        <span className="text-muted fs-8">Conventional Scattered EdTech</span>
                      </div>
                    </div>
                    
                    <div className="problem-card-dark d-flex gap-3 align-items-start">
                      <div className="text-danger mt-1">
                        <Layers size={18} />
                      </div>
                      <div>
                        <h5 className="fw-extrabold text-dark fs-7 mb-1">6+ Disconnected Platforms</h5>
                        <p className="text-secondary fs-8 mb-0">
                          Students learn on Canvas/Moodle, write code locally, compile portfolios on GitHub, construct resumes on Canva, and submit logs via email forms.
                        </p>
                      </div>
                    </div>

                    <div className="problem-card-dark d-flex gap-3 align-items-start">
                      <div className="text-danger mt-1">
                        <EyeOff size={18} />
                      </div>
                      <div>
                        <h5 className="fw-extrabold text-dark fs-7 mb-1">Zero Predictive Visibility</h5>
                        <p className="text-secondary fs-8 mb-0">
                          Placement officers cannot trace student study records in real-time. Learning bottlenecks remain completely hidden until graduation limits are passed.
                        </p>
                      </div>
                    </div>

                    <div className="problem-card-dark mb-0 d-flex gap-3 align-items-start">
                      <div className="text-danger mt-1">
                        <FileMinus size={18} />
                      </div>
                      <div>
                        <h5 className="fw-extrabold text-dark fs-7 mb-1">Static PDF Hiring Loop</h5>
                        <p className="text-secondary fs-8 mb-0">
                          Recruiters scan unverified PDF resume summaries. Auditing actual coding qualities or repository contributions requires expensive manual testing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-top border-secondary-subtle">
                    <span className="text-danger fw-bold fs-8 d-flex align-items-center gap-2">
                      <span className="pulse-dot bg-danger" style={{ animationName: 'none', width: '6px', height: '6px' }}></span>
                      Decreases placements conversion rates.
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Solutions */}
            <div className="col-lg-6">
              <ScrollReveal direction="right" delay={150} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between" style={{ border: '1px solid rgba(20, 184, 166, 0.2)', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(20, 184, 166, 0.01) 100%)' }}>
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
                      <span className="bg-teal bg-opacity-10 text-teal d-flex align-items-center justify-content-center" style={{ width: '46px', height: '46px', borderRadius: '12px', color: 'var(--accent-teal)', backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
                        <ShieldCheck size={22} style={{ color: 'var(--accent-teal)' }} />
                      </span>
                      <div>
                        <h4 className="mb-0 fw-extrabold text-gradient-teal" style={{ fontSize: '1.25rem' }}>The CareerOS Ecosystem</h4>
                        <span className="text-muted fs-8">AI-Powered Student Lifecycle Suite</span>
                      </div>
                    </div>

                    <div className="solution-card-dark d-flex gap-3 align-items-start">
                      <div className="text-teal mt-1" style={{ color: 'var(--accent-teal)' }}>
                        <Zap size={18} />
                      </div>
                      <div>
                        <h5 className="fw-extrabold text-dark fs-7 mb-1">Fully Unified Student Journey</h5>
                        <p className="text-secondary fs-8 mb-0">
                          Integrates virtual classrooms, coding labs, verified projects, automated internships, and recruiter pipelines in a single React interface.
                        </p>
                      </div>
                    </div>

                    <div className="solution-card-dark d-flex gap-3 align-items-start">
                      <div className="text-teal mt-1" style={{ color: 'var(--accent-teal)' }}>
                        <Cpu size={18} />
                      </div>
                      <div>
                        <h5 className="fw-extrabold text-dark fs-7 mb-1">Adaptive AI Performance Audits</h5>
                        <p className="text-secondary fs-8 mb-0">
                          Algorithms monitor course study times, code commits, and project scores, dynamically suggesting correct assignments to secure placement.
                        </p>
                      </div>
                    </div>

                    <div className="solution-card-dark mb-0 d-flex gap-3 align-items-start">
                      <div className="text-teal mt-1" style={{ color: 'var(--accent-teal)' }}>
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <h5 className="fw-extrabold text-dark fs-7 mb-1">Verified Recruiter Search Portal</h5>
                        <p className="text-secondary fs-8 mb-0">
                          Hiring managers filter profiles using verified student project histories. Schedule interviews instantly using verified student credentials.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-top border-secondary-subtle">
                    <span className="text-gradient-teal fw-bold fs-8 d-flex align-items-center gap-2">
                      <CheckCircle2 size={14} style={{ color: 'var(--accent-teal)' }} />
                      Improves hiring speeds by over 240%.
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES */}
      <section id="features" className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">System Architecture</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">Complete Student Lifecycle Suite</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                Opulent Vidya CareerOS includes every module required to support, assess, and place candidates.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-6 col-lg-4">
              <ScrollReveal direction="up" delay={100} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <BookOpen size={22} />
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 fs-9 py-1 px-2.5 rounded-3">Smart LMS</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">Smart LMS</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Stream virtual lectures, review course catalogs, track learning hours, and compile in-browser exercise tasks.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Integrated video player
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Multi-track course catalog
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> In-browser coding shell
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Explore LMS modules</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature 2 */}
            <div className="col-md-6 col-lg-4">
              <ScrollReveal direction="up" delay={150} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <CheckSquare size={22} />
                      </div>
                      <span className="badge bg-purple bg-opacity-10 text-purple border border-purple border-opacity-10 fs-9 py-1 px-2.5 rounded-3">Assessments</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">Assignment Tracker</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Automated code execution tests, immediate assignment scores, deadlines warnings, and progress metrics.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-purple" /> Autograding test suites
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-purple" /> Plagiarism detection checks
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-purple" /> Instant performance charts
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Review test grading</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature 3 */}
            <div className="col-md-6 col-lg-4">
              <ScrollReveal direction="up" delay={200} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <Briefcase size={22} />
                      </div>
                      <span className="badge bg-teal bg-opacity-10 text-teal border border-teal border-opacity-10 fs-9 py-1 px-2.5 rounded-3" style={{ color: 'var(--accent-teal)', backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>GitHub Sync</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">Project Portfolio</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Pull commits from GitHub repositories, showcase live project links, log peer reviews, and compile verified profiles.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-teal)' }} /> Automatic GitHub fetch loops
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-teal)' }} /> Live deployment links
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-teal)' }} /> peer assessment reviews
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Sync GitHub profiles</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature 4 */}
            <div className="col-md-6 col-lg-4">
              <ScrollReveal direction="up" delay={250} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <UserCheck size={22} />
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 fs-9 py-1 px-2.5 rounded-3">Workflows</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">Internship System</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Monitor student internship tasks, compile mentor feedback ratings, document logbooks, and track graduation credits.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Corporate task manager
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Mentor review feedback loops
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Logbook attendance checks
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Internship workflow tool</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature 5 */}
            <div className="col-md-6 col-lg-4">
              <ScrollReveal direction="up" delay={300} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <FileText size={22} />
                      </div>
                      <span className="badge bg-purple bg-opacity-10 text-purple border border-purple border-opacity-10 fs-9 py-1 px-2.5 rounded-3">AI Engine</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">AI Resume Builder</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Compile ATS-friendly resume versions, scan description keywords, optimize LinkedIn profiles, and draft cover letters.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-purple" /> ATS keywords scanner
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-purple" /> Multi-layout design generator
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-purple" /> AI Cover letter writer
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Launch builder engine</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature 6 */}
            <div className="col-md-6 col-lg-4">
              <ScrollReveal direction="up" delay={350} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <Globe size={22} />
                      </div>
                      <span className="badge bg-teal bg-opacity-10 text-teal border border-teal border-opacity-10 fs-9 py-1 px-2.5 rounded-3" style={{ color: 'var(--accent-teal)', backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>Global Pathways</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">Study Abroad Module</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Browse global partner universities, log visa checklists, track scholarship applications, and prepare IELTS files.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-teal)' }} /> Partner university indexes
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-teal)' }} /> Document storage visa vault
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-teal)' }} /> Scholarship timeline logs
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Verify global universities</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Feature 7 */}
            <div className="col-md-6 col-lg-4 mx-auto">
              <ScrollReveal direction="up" delay={400} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3.5">
                      <div className="feature-icon-wrapper-premium mb-0">
                        <Award size={22} />
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 fs-9 py-1 px-2.5 rounded-3">Hiring Hub</span>
                    </div>
                    <h4 className="fw-extrabold mb-2.5 fs-5 text-dark">Placement System</h4>
                    <p className="text-secondary fs-8 mb-4">
                      Connect directly to recruiter search parameters, apply via referral loops, and schedule online tests.
                    </p>
                    <ul className="list-unstyled fs-8 text-secondary mb-4">
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Recruiter search catalogs
                      </li>
                      <li className="mb-2 d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Referral shortlisting routes
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-primary" /> Integrated coding interviews
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center text-primary fw-bold fs-8 mt-auto pt-3 border-top border-secondary-subtle border-opacity-30" style={{ cursor: 'pointer' }}>
                    <span>Access recruiter filters</span>
                    <ChevronRight size={14} className="ms-1" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (FLOW SECTION WITH PARTICLE ANIMATION) */}
      <section id="how-it-works" className="section-padding bg-light position-relative overflow-hidden">
        <div className="container position-relative z-2">
          
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">Integrated Workflow</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">Structured Career Trajectory</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                Opulent Vidya CareerOS controls every stage of the student pathway, ensuring placement outcomes.
              </p>
            </ScrollReveal>
          </div>

          {/* Connected Flow Diagram SVG (Desktop view) */}
          <div className="d-none d-lg-block position-relative my-5" style={{ height: '180px' }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 120" fill="none">
              {/* Connector lines with running particle effect */}
              <path d="M 50 60 L 950 60" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
              <path 
                d="M 50 60 L 950 60" 
                stroke="url(#flowLineGrad)" 
                strokeWidth="2.5" 
                className="svg-particle-flow"
              />
              
              <defs>
                <linearGradient id="flowLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-1)" />
                  <stop offset="50%" stopColor="var(--accent-teal)" />
                  <stop offset="100%" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>

              {/* Glowing circles */}
              <circle cx="100" cy="60" r="14" fill="var(--accent-1)" stroke="var(--accent-1)" strokeWidth="3" />
              <circle cx="300" cy="60" r="14" fill="var(--accent-1)" stroke="var(--accent-1)" strokeWidth="3" />
              <circle cx="500" cy="60" r="14" fill="var(--accent-teal)" stroke="var(--accent-teal)" strokeWidth="3" />
              <circle cx="700" cy="60" r="14" fill="var(--accent-2)" stroke="var(--accent-2)" strokeWidth="3" />
              <circle cx="900" cy="60" r="14" fill="var(--accent-2)" stroke="var(--accent-2)" strokeWidth="3" />
              
              {/* Numbers */}
              <text x="100" y="64" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
              <text x="300" y="64" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
              <text x="500" y="64" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
              <text x="700" y="64" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
              <text x="900" y="64" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>

              {/* Node labels */}
              <text x="100" y="98" fill="var(--text-dark)" fontSize="12" fontWeight="bold" textAnchor="middle">Enrollment</text>
              <text x="300" y="98" fill="var(--text-dark)" fontSize="12" fontWeight="bold" textAnchor="middle">Smart LMS</text>
              <text x="500" y="98" fill="var(--text-dark)" fontSize="12" fontWeight="bold" textAnchor="middle">GitHub Projects</text>
              <text x="700" y="98" fill="var(--text-dark)" fontSize="12" fontWeight="bold" textAnchor="middle">AI Resume</text>
              <text x="900" y="98" fill="var(--text-dark)" fontSize="12" fontWeight="bold" textAnchor="middle">Placement</text>
            </svg>
          </div>

          <div className="row g-4 row-cols-1 row-cols-md-3 row-cols-lg-5 justify-content-center d-lg-none">
            <div className="col">
              <div className="timeline-card-dark">
                <div className="flow-step-number">01</div>
                <h6 className="fw-extrabold text-dark mt-2">Enrollment</h6>
                <p className="text-secondary fs-8 mb-0">Custom study targets and academic pathways.</p>
              </div>
            </div>
            <div className="col">
              <div className="timeline-card-dark">
                <div className="flow-step-number">02</div>
                <h6 className="fw-extrabold text-dark mt-2">Smart LMS</h6>
                <p className="text-secondary fs-8 mb-0">Virtual lectures, code playgrounds, automatic checks.</p>
              </div>
            </div>
            <div className="col">
              <div className="timeline-card-dark">
                <div className="flow-step-number">03</div>
                <h6 className="fw-extrabold text-dark mt-2">GitHub Projects</h6>
                <p className="text-secondary fs-8 mb-0">Showcasing verified coding contributions to recruiters.</p>
              </div>
            </div>
            <div className="col">
              <div className="timeline-card-dark">
                <div className="flow-step-number">04</div>
                <h6 className="fw-extrabold text-dark mt-2">AI Resume</h6>
                <p className="text-secondary fs-8 mb-0">Optimizing resume summaries and skills keywords.</p>
              </div>
            </div>
            <div className="col">
              <div className="timeline-card-dark">
                <div className="flow-step-number">05</div>
                <h6 className="fw-extrabold text-dark mt-2">Placement</h6>
                <p className="text-secondary fs-8 mb-0">Routing verified portfolios to corporate search feeds.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. ROLE-BASED DASHBOARD SECTION (DYNAMIC PREVIEW PANEL) */}
      <section id="dashboards" className="section-padding bg-light">
        <div className="container">
          
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">Multi-Tenant Interfaces</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">Tailored Panels for All Participants</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                Opulent Vidya CareerOS configures personalized interfaces, access logs, and metrics for each system role.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-4 align-items-center">
            {/* Roles selector buttons */}
            <div className="col-lg-4">
              <ScrollReveal direction="left" delay={100}>
                <div className="pe-0 pe-lg-2">
                  <button 
                    onClick={() => setActiveRole('student')}
                    className={`role-tab-btn-dark ${activeRole === 'student' ? 'active' : ''}`}
                  >
                    <span className="bg-secondary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex border border-secondary-subtle"><GraduationCap size={20} /></span>
                    <div>
                      <span className="d-block fw-bold fs-6">👨🎓 Student Dashboard</span>
                      <span className="text-muted fs-8 fw-normal">Progress & hiring preparation</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveRole('trainer')}
                    className={`role-tab-btn-dark ${activeRole === 'trainer' ? 'active' : ''}`}
                  >
                    <span className="bg-secondary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex border border-secondary-subtle"><Users size={20} /></span>
                    <div>
                      <span className="d-block fw-bold fs-6">👨🏫 Trainer Panel</span>
                      <span className="text-muted fs-8 fw-normal">Attendance logs & grades auditing</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveRole('recruiter')}
                    className={`role-tab-btn-dark ${activeRole === 'recruiter' ? 'active' : ''}`}
                  >
                    <span className="bg-secondary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex border border-secondary-subtle"><Briefcase size={20} /></span>
                    <div>
                      <span className="d-block fw-bold fs-6">🧑💼 Recruiter Portal</span>
                      <span className="text-muted fs-8 fw-normal">Candidate search filters</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveRole('parent')}
                    className={`role-tab-btn-dark ${activeRole === 'parent' ? 'active' : ''}`}
                  >
                    <span className="bg-secondary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex border border-secondary-subtle"><UserCheck size={20} /></span>
                    <div>
                      <span className="d-block fw-bold fs-6">👨👩👧 Parent View</span>
                      <span className="text-muted fs-8 fw-normal">Grade cards & invoices</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveRole('study')}
                    className={`role-tab-btn-dark ${activeRole === 'study' ? 'active' : ''}`}
                  >
                    <span className="bg-secondary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex border border-secondary-subtle"><Globe size={20} /></span>
                    <div>
                      <span className="d-block fw-bold fs-6">🎓 Study Abroad Advisor</span>
                      <span className="text-muted fs-8 fw-normal">Visa tracking & university programs</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveRole('admin')}
                    className={`role-tab-btn-dark ${activeRole === 'admin' ? 'active' : ''}`}
                  >
                    <span className="bg-secondary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex border border-secondary-subtle"><Shield size={20} /></span>
                    <div>
                      <span className="d-block fw-bold fs-6">🛠️ Admin Panel</span>
                      <span className="text-muted fs-8 fw-normal">Cohort setups & global stats</span>
                    </div>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Dashboard Mockup Display */}
            <div className="col-lg-8">
              <ScrollReveal direction="right" delay={200}>
                <div className="mock-dashboard-wrapper">
                  <div className="mock-dashboard-body">
                    
                    {/* Header bar */}
                    <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary-subtle bg-light">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-secondary bg-opacity-10 text-dark text-uppercase fs-8 px-2 py-1.5 rounded-2 border border-secondary-subtle">
                          {activeRole === 'study' ? 'study_abroad' : activeRole} Portal
                        </span>
                        <span className="text-muted fs-8 d-flex align-items-center gap-1.5"><Lock size={12} /> SSL Secured</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                        <span className="text-muted fs-8">System Sync: Live</span>
                      </div>
                    </div>

                    {/* Main content body based on role */}
                    <div className="p-4 text-start">
                      
                      {activeRole === 'student' && (
                        <div>
                          <div className="row g-3 mb-4">
                            <div className="col-md-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1.5 text-uppercase fw-bold">Active Syllabus Topic</span>
                                <h6 className="fw-extrabold mb-1 text-dark">Advanced React Hooks & Context API</h6>
                                <span className="text-primary fs-8 fw-bold d-flex align-items-center gap-1.5"><Clock size={12} /> Ends in 40 mins</span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1.5 text-uppercase fw-bold">Next Homework Assignment</span>
                                <h6 className="fw-extrabold mb-1 text-dark">PostgreSQL DB Optimization Tasks</h6>
                                <span className="text-danger fs-8 fw-bold d-flex align-items-center gap-1.5"><i className="bi bi-exclamation-triangle-fill"></i> Due in 12 hours</span>
                              </div>
                            </div>
                          </div>
                          
                          <h6 className="fw-extrabold mb-3 text-dark fs-7">Live Progress & Preparation Index</h6>
                          <div className="p-3.5 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90 mb-3">
                            <div className="d-flex justify-content-between text-muted fs-8 mb-2">
                              <span>Verified Projects Completed</span>
                              <span className="fw-extrabold text-success">4 / 5 Github Verified</span>
                            </div>
                            <div className="progress mb-4" style={{ height: '8px', backgroundColor: '#e2e8f0' }}>
                              <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                            </div>
                            
                            <div className="row g-3">
                              <div className="col-6 col-sm-3">
                                <span className="text-muted fs-8 d-block text-uppercase mb-1">Resume Score</span>
                                <span className="fw-extrabold text-dark fs-5">94 / 100</span>
                              </div>
                              <div className="col-6 col-sm-3">
                                <span className="text-muted fs-8 d-block text-uppercase mb-1">Mock test status</span>
                                <span className="fw-extrabold text-dark fs-5">85% Passed</span>
                              </div>
                              <div className="col-6 col-sm-3">
                                <span className="text-muted fs-8 d-block text-uppercase mb-1">Mentor Rating</span>
                                <span className="fw-extrabold text-dark fs-5">4.8 / 5.0</span>
                              </div>
                              <div className="col-6 col-sm-3">
                                <span className="text-muted fs-8 d-block text-uppercase mb-1">Interview Invites</span>
                                <span className="fw-extrabold text-primary fs-5">3 Active</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeRole === 'trainer' && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-extrabold mb-0 text-dark">Cohort Overview: Full-Stack Web Dev (Cohort B)</h6>
                            <span className="badge bg-primary bg-opacity-10 text-primary fs-8 border border-primary border-opacity-20">Total: 48 Registered</span>
                          </div>
                          
                          <div className="row g-3 mb-4 text-center">
                            <div className="col-md-4">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Syllabus Attendance</span>
                                <h4 className="fw-extrabold mb-0 text-success">94.2%</h4>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Avg GitHub Commits</span>
                                <h4 className="fw-extrabold mb-0 text-primary">4.1 / wk</h4>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Tasks Pending Grading</span>
                                <h4 className="fw-extrabold mb-0 text-warning">14 Tasks</h4>
                              </div>
                            </div>
                          </div>
                          
                          <h6 className="fw-extrabold mb-3 text-dark">Priority Action Alerts</h6>
                          <div className="p-3 border border-danger border-opacity-20 rounded-3 bg-danger bg-opacity-10 text-danger-emphasis fs-7 mb-2 d-flex justify-content-between align-items-center">
                            <span className="d-flex align-items-center gap-2">
                              <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                              <span className="text-dark"><strong>Aaryan Sen</strong> has not submitted Portfolio Project #3 (Due 2d ago)</span>
                            </span>
                            <button onClick={() => alert('Pinged Aaryan Sen regarding Portfolio Project #3')} className="btn btn-sm btn-danger py-1 px-2.5 fs-8">Ping Student</button>
                          </div>
                        </div>
                      )}

                      {activeRole === 'recruiter' && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3.5">
                            <h6 className="fw-extrabold mb-0 text-dark">Search Qualified Student Database</h6>
                            <span className="text-muted fs-8 fw-semibold">Filtered by Verified Projects</span>
                          </div>
                          
                          <div className="input-group mb-3.5 shadow-sm rounded-3">
                            <span className="input-group-text bg-white border-secondary-subtle text-muted border-end-0"><Search size={18} /></span>
                            <input type="text" className="form-control bg-white border-secondary-subtle text-dark border-start-0 py-2.5 fs-7" placeholder="e.g. 'React', 'Node.js', ATS Score > 90..." defaultValue="React, PostgreSQL, ATS Score > 90" />
                            <button className="btn btn-primary-gradient px-4.5 py-2.5 fs-7">Search</button>
                          </div>

                          {/* Matching circles */}
                          <div className="row g-3 mb-3">
                            <div className="col-md-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90 d-flex align-items-center justify-content-between">
                                <div>
                                  <span className="text-muted fs-8 d-block text-uppercase mb-0.5">Top Matched Candidate</span>
                                  <span className="fw-extrabold text-dark d-block">Sneha Reddy</span>
                                  <span className="text-muted fs-8">95% Match Score</span>
                                </div>
                                <svg width="45" height="45" viewBox="0 0 36 36">
                                  <path stroke="#e2e8f0" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path stroke="var(--accent-1)" strokeWidth="3.5" strokeDasharray="95, 100" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <text x="18" y="21.5" className="fw-extrabold" fill="var(--text-dark)" fontSize="10" textAnchor="middle">95</text>
                                </svg>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90 d-flex align-items-center justify-content-between">
                                <div>
                                  <span className="text-muted fs-8 d-block text-uppercase mb-0.5">Recommended Candidate</span>
                                  <span className="fw-extrabold text-dark d-block">Vikas Khanna</span>
                                  <span className="text-muted fs-8">91% Match Score</span>
                                </div>
                                <svg width="45" height="45" viewBox="0 0 36 36">
                                  <path stroke="#e2e8f0" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path stroke="var(--accent-2)" strokeWidth="3.5" strokeDasharray="91, 100" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <text x="18" y="21.5" className="fw-extrabold" fill="var(--text-dark)" fontSize="10" textAnchor="middle">91</text>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeRole === 'parent' && (
                        <div>
                          <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="bg-secondary bg-opacity-10 text-dark rounded-circle d-flex align-items-center justify-content-center fw-extrabold fs-6" style={{ width: '46px', height: '46px', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.15)' }}>KV</div>
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">Ward Name: Kabir Varma</h6>
                              <span className="text-muted fs-8">MERN Cohort B — Student ID: #KV901</span>
                            </div>
                          </div>
                          
                          <div className="row g-3 mb-4 text-start">
                            <div className="col-sm-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1.5 text-uppercase fw-bold">Weekly Attendance Rate</span>
                                <span className="fw-extrabold text-success fs-5">98% (Exceeds Target)</span>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1.5 text-uppercase fw-bold">Latest Exam Grade</span>
                                <span className="fw-extrabold text-primary fs-5">A+ (Advanced APIs)</span>
                              </div>
                            </div>
                          </div>
                          
                          <h6 className="fw-extrabold mb-3 text-dark">Installment Receipts</h6>
                          <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90 d-flex justify-content-between align-items-center">
                            <div>
                              <span className="fw-extrabold fs-7 d-block text-dark">Term Installment #2</span>
                              <span className="text-muted fs-8">Paid on June 01, 2026</span>
                            </div>
                            <span className="badge bg-success bg-opacity-10 text-success py-2 px-3 fs-8 rounded-pill d-flex align-items-center gap-1.5 border border-success border-opacity-20">Paid <i className="bi bi-check-circle"></i></span>
                          </div>
                        </div>
                      )}

                      {activeRole === 'study' && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-extrabold mb-0 text-dark">Global Studies Pathway Integration</h6>
                            <span className="badge bg-warning bg-opacity-10 text-warning fs-8 border border-warning border-opacity-20">4 Partner Institutions</span>
                          </div>
                          
                          <div className="row g-3 mb-4">
                            <div className="col-md-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 border border-primary border-opacity-20">GERMANY</span>
                                <h6 className="fw-extrabold text-dark">TU Munich (TUM)</h6>
                                <p className="text-muted fs-8 mb-2">Target Program: MS Informatics (Winter Intake)</p>
                                <span className="text-success fs-8 fw-semibold"><i className="bi bi-check-circle-fill me-1"></i> Application Verified</span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="badge bg-purple bg-opacity-10 text-purple mb-2 border border-purple border-opacity-20">UNITED STATES</span>
                                <h6 className="fw-extrabold text-dark">Northeastern University</h6>
                                <p className="text-muted fs-8 mb-2">Target Program: MS Computer Science (Fall Intake)</p>
                                <span className="text-warning fs-8 fw-semibold"><Clock size={12} className="me-1" /> Document Auditing Stage</span>
                              </div>
                            </div>
                          </div>
                          
                          <h6 className="fw-extrabold mb-3 text-dark">Required Documents Progress</h6>
                          <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90 d-flex justify-content-between fs-8 text-muted">
                            <div>
                              <span className="d-block">IELTS Target</span>
                              <span className="fw-bold text-dark">7.5 Band (Verified)</span>
                            </div>
                            <div>
                              <span className="d-block">WES Credentials</span>
                              <span className="fw-bold text-success">Submitted</span>
                            </div>
                            <div>
                              <span className="d-block">Visa Interview</span>
                              <span className="fw-bold text-primary">Scheduled July 10</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeRole === 'admin' && (
                        <div>
                          <h6 className="fw-extrabold mb-4 text-dark">Global Administration Panel</h6>
                          
                          <div className="row g-3 mb-4 text-center">
                            <div className="col-6 col-md-3">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Cohorts Active</span>
                                <span className="fw-extrabold text-dark fs-4">24 Cohorts</span>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Academic Staff</span>
                                <span className="fw-extrabold text-dark fs-4">18 Trainers</span>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">System Uptime</span>
                                <span className="fw-extrabold text-success fs-4">99.98%</span>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="p-3 border border-secondary-subtle border-opacity-20 rounded-3 bg-white bg-opacity-90">
                                <span className="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">API Requests</span>
                                <span className="fw-extrabold text-primary fs-4">42K / hr</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="card border-0 p-3 bg-light text-dark rounded-3 border border-secondary-subtle shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="text-success fs-8 fw-bold d-flex align-items-center gap-1.5"><Activity size={14} /> System Activity Logs</span>
                              <span className="badge bg-secondary fs-9">Real-Time</span>
                            </div>
                            <pre className="mb-0 fs-8 text-secondary overflow-hidden" style={{ maxHeight: '70px', fontFamily: 'monospace' }}>
                              [14:32:01] AUTH: Student KV901 token refresh success<br />
                              [14:32:05] INTEGRATION: Automated Github pull for SV998 - OK<br />
                              [14:32:11] AI: Injected ATS suggestions for 14 candidates
                            </pre>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* 8. AI CENTER */}
      <section id="ai" className="section-padding bg-gradient-ai text-dark position-relative overflow-hidden">
        <div className="glow-blob glow-blue"></div>
        <div className="glow-blob glow-purple"></div>

        <div className="container position-relative z-2">
          <div className="row align-items-center gy-5">
            
            <div className="col-lg-5 text-start">
              <ScrollReveal direction="left">
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 mb-2 fs-7 px-3 py-1.5 rounded-3 d-inline-flex align-items-center gap-1.5" style={{ color: 'var(--accent-teal)' }}>
                  <Sparkles size={14} style={{ color: 'var(--accent-teal)' }} /> AI Engine Core
                </span>
                <h2 className="display-5 fw-extrabold mb-3 text-dark">Continuous Intelligence</h2>
                <p className="text-secondary mb-4 fs-6">
                  Experience how our algorithms support students 24/7. Click a tool below to run our AI sandbox simulator.
                </p>
              </ScrollReveal>

              <div className="row g-3">
                <div className="col-sm-6">
                  <ScrollReveal direction="up" delay={100}>
                    <div 
                      onClick={() => triggerAiResponse('advisor')}
                      className={`ai-interactive-panel h-100 ${aiModule === 'advisor' ? 'active' : ''}`}
                    >
                      <div className="text-purple mb-2"><Cpu size={24} style={{ color: 'var(--accent-2)' }} /></div>
                      <h5 className="fw-bold fs-7 mb-1 text-dark">AI Career Advisor</h5>
                      <span className="text-secondary fs-9">Suggested roadmaps & tracks</span>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="col-sm-6">
                  <ScrollReveal direction="up" delay={150}>
                    <div 
                      onClick={() => triggerAiResponse('scheduler')}
                      className={`ai-interactive-panel h-100 ${aiModule === 'scheduler' ? 'active' : ''}`}
                    >
                      <div className="text-purple mb-2"><Calendar size={24} style={{ color: 'var(--accent-teal)' }} /></div>
                      <h5 className="fw-bold fs-7 mb-1 text-dark">AI Scheduler</h5>
                      <span className="text-secondary fs-9">Automated timetable updates</span>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="col-sm-6">
                  <ScrollReveal direction="up" delay={200}>
                    <div 
                      onClick={() => triggerAiResponse('doubt')}
                      className={`ai-interactive-panel h-100 ${aiModule === 'doubt' ? 'active' : ''}`}
                    >
                      <div className="text-purple mb-2"><MessageSquare size={24} style={{ color: 'var(--accent-1)' }} /></div>
                      <h5 className="fw-bold fs-7 mb-1 text-dark">AI Doubt Assistant</h5>
                      <span className="text-secondary fs-9">24/7 technical answers</span>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="col-sm-6">
                  <ScrollReveal direction="up" delay={250}>
                    <div 
                      onClick={() => triggerAiResponse('resume')}
                      className={`ai-interactive-panel h-100 ${aiModule === 'resume' ? 'active' : ''}`}
                    >
                      <div className="text-purple mb-2"><FileText size={24} style={{ color: 'var(--accent-2)' }} /></div>
                      <h5 className="fw-bold fs-7 mb-1 text-dark">AI Resume Optimizer</h5>
                      <span className="text-secondary fs-9">Instant ATS suggestions</span>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {/* AI Output screen */}
            <div className="col-lg-7">
              <ScrollReveal direction="right" delay={150}>
                <div className="card bg-white border-secondary-subtle border-opacity-30 rounded-4 shadow-lg p-4 text-start">
                  
                  <div className="d-flex align-items-center justify-content-between pb-3 border-bottom border-secondary-subtle border-opacity-20 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="bg-secondary bg-opacity-10 border border-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
                        <i className="bi bi-cpu text-gradient fs-6"></i>
                      </span>
                      <span className="fw-bold text-dark fs-7">Interactive AI Sandbox</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle fs-8">Model: CareerOS-GPT-v4</span>
                    </div>
                  </div>

                  {/* Input display */}
                  <div className="mb-4">
                    <label className="text-secondary fs-8 fw-semibold mb-1.5 uppercase d-block">Prompt request</label>
                    <div className="p-3 rounded-3 bg-secondary bg-opacity-10 border border-secondary-subtle fs-7 text-secondary">
                      {aiPrompt}
                    </div>
                  </div>

                  {/* Sandbox answer text */}
                  <div>
                    <label className="text-secondary fs-8 fw-semibold mb-1.5 uppercase d-block">AI response output</label>
                    <div className="p-3.5 rounded-3 bg-light border border-secondary-subtle text-dark fs-7 min-h-150 position-relative" style={{ minHeight: '220px', fontFamily: 'monospace' }}>
                      {isAiLoading ? (
                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                          <div className="mb-2">
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                          </div>
                          <span className="d-block text-muted fs-8">Compiling parameters...</span>
                        </div>
                      ) : (
                        <span style={{ whiteSpace: 'pre-line' }}>{aiResponse}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-end d-flex align-items-center justify-content-between">
                    <span className="text-muted fs-9 d-flex align-items-center gap-1.5"><HelpCircle size={12} /> Click a different card to see other outputs.</span>
                    <span className="text-muted fs-9">Token Sync: OK</span>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 9. DASHBOARD PREVIEW */}
      <section className="section-padding bg-light">
        <div className="container">
          
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">System Tour</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">Enterprise Dashboards Showcase</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                A peek inside the operational analytics panels used by university management and student career officers.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6">
              <ScrollReveal direction="up" delay={100} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary-subtle">
                      <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-2">
                        <TrendingUp size={16} className="text-primary" /> Placements Rate
                      </h6>
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 fs-8">Monthly</span>
                    </div>
                    <h3 className="fw-extrabold text-dark mb-1">91.4%</h3>
                    <span className="text-success fs-8 fw-bold d-block mb-3.5">
                      <i className="bi bi-arrow-up-right me-1"></i> +8.2% vs last semester
                    </span>
                  </div>
                  <div className="p-3 border border-secondary-subtle border-opacity-20 bg-white bg-opacity-90 rounded-3">
                    <div className="d-flex justify-content-between fs-8 text-muted mb-2">
                      <span>Highest Package Offered</span>
                      <span className="fw-bold text-dark">42.5 LPA</span>
                    </div>
                    <div className="d-flex justify-content-between fs-8 text-muted">
                      <span>Average Cohort Package</span>
                      <span className="fw-bold text-dark">8.7 LPA</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6">
              <ScrollReveal direction="up" delay={200} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary-subtle">
                      <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-2">
                        <Users size={16} className="text-primary" /> Active Cohorts
                      </h6>
                      <span className="badge bg-purple bg-opacity-10 text-purple border border-purple border-opacity-20 fs-8">14 Cohorts</span>
                    </div>
                    <h3 className="fw-extrabold text-dark mb-1">1,240</h3>
                    <span className="text-muted fs-8 d-block mb-3.5">Total registered active learners</span>
                  </div>
                  <div className="p-3 border border-secondary-subtle border-opacity-20 bg-white bg-opacity-90 rounded-3">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between fs-8 text-muted mb-1">
                        <span>Software Engineering</span>
                        <span className="fw-bold text-dark">620</span>
                      </div>
                      <div className="progress" style={{ height: '4px', backgroundColor: '#e2e8f0' }}>
                        <div className="progress-bar bg-primary" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between fs-8 text-muted mb-1">
                        <span>Design & Product</span>
                        <span className="fw-bold text-dark">440</span>
                      </div>
                      <div className="progress" style={{ height: '4px', backgroundColor: '#e2e8f0' }}>
                        <div className="progress-bar bg-purple" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-12">
              <ScrollReveal direction="up" delay={300} className="h-100">
                <div className="feature-card-premium text-start d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary-subtle">
                      <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-2">
                        <Award size={16} className="text-primary" /> Recruiter Pipeline
                      </h6>
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 fs-8">Weekly</span>
                    </div>
                    <h3 className="fw-extrabold text-dark mb-1">28</h3>
                    <span className="text-muted fs-8 d-block mb-3.5">Recruiters scheduling interviews this week</span>
                  </div>
                  <div className="p-3 border border-secondary-subtle border-opacity-20 bg-white bg-opacity-90 rounded-3">
                    <div className="d-flex align-items-center gap-2.5 mb-2 pb-2 border-bottom border-secondary-subtle">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fs-8 fw-bold" style={{ width: '24px', height: '24px' }}>AZ</div>
                      <span className="fs-8 text-muted">Amazon India — <strong>14 shortcut invites</strong></span>
                    </div>
                    <div className="d-flex align-items-center gap-2.5">
                      <div className="bg-light text-dark border border-secondary-subtle rounded-circle d-flex align-items-center justify-content-center fs-8 fw-bold" style={{ width: '24px', height: '24px' }}>MS</div>
                      <span className="fs-8 text-muted">Microsoft — <strong>8 shortlist placements</strong></span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section id="testimonials" className="section-padding bg-white">
        <div className="container">
          
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">Ecosystem Outcomes</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">What Our Users Experience</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                Read reviews from students, corporate recruiters, and university coordinators using Opulent Vidya CareerOS.
              </p>
            </ScrollReveal>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6">
              <ScrollReveal direction="up" delay={100} className="h-100">
                <div className="testimonial-card-dark text-start h-100 d-flex flex-column justify-content-between">
                  <div>
                    <span className="testimonial-quote-icon">“</span>
                    <div className="text-warning mb-3">
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                    </div>
                    <p className="text-secondary fs-7 mb-4">
                      "Using the AI Resume builder and synced portfolio pipelines, I secured a backend engineering internship at Microsoft within 3 months. Having study logs, class recordings, and my resume compiler in one app was incredibly convenient."
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-wrapper">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Student" />
                    </div>
                    <div>
                      <h6 className="fw-extrabold mb-0 fs-6 text-dark">Divya Nair</h6>
                      <span className="text-muted fs-8">Student placed at Microsoft</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6">
              <ScrollReveal direction="up" delay={200} className="h-100">
                <div className="testimonial-card-dark text-start h-100 d-flex flex-column justify-content-between">
                  <div>
                    <span className="testimonial-quote-icon">“</span>
                    <div className="text-warning mb-3">
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                    </div>
                    <p className="text-secondary fs-7 mb-4">
                      "Finding top-tier candidates usually takes weeks of reading PDFs. With the CareerOS Recruiter dashboard, we search by verified projects and filter for ready-to-join coders immediately. Hire conversion rates increased by 4x."
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-wrapper">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Recruiter" />
                    </div>
                    <div>
                      <h6 className="fw-extrabold mb-0 fs-6 text-dark">Rohan Malhotra</h6>
                      <span className="text-muted fs-8">Hiring Lead at Google Cloud</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-12">
              <ScrollReveal direction="up" delay={300} className="h-100">
                <div className="testimonial-card-dark text-start h-100 d-flex flex-column justify-content-between">
                  <div>
                    <span className="testimonial-quote-icon">“</span>
                    <div className="text-warning mb-3">
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                      <Star size={16} fill="currentColor" className="me-1" />
                    </div>
                    <p className="text-secondary fs-7 mb-4">
                      "We migrated our college student management to CareerOS. The platform provides full visibility over cohort assignments, grades, visa applications, and student placement ready states in real-time."
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-wrapper">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="Trainer" />
                    </div>
                    <div>
                      <h6 className="fw-extrabold mb-0 fs-6 text-dark">Dr. Amit Varma</h6>
                      <span className="text-muted fs-8">Dean, Career Pathways Academy</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="section-padding bg-light">
        <div className="container">
          
          <div className="text-center mb-5 pb-3">
            <ScrollReveal direction="up">
              <span className="role-badge mb-2 d-inline-block">Common Inquiries</span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h2 className="display-5 fw-extrabold text-gradient mb-3">Frequently Asked Questions</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="lead text-secondary mx-auto" style={{ maxWidth: '680px' }}>
                Have questions about integrations, setup timescales, or student tracking capabilities? Browse our answers below.
              </p>
            </ScrollReveal>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 text-start">
              <ScrollReveal direction="up" delay={150}>
                
                <div className={`faq-item-dark ${activeFaq === 0 ? 'active' : ''}`}>
                  <div className="faq-header" onClick={() => toggleFaq(0)}>
                    <h5>How does CareerOS verify student project portfolios?</h5>
                    <ChevronDown size={18} className="faq-icon" />
                  </div>
                  <div className="faq-body">
                    CareerOS links directly to the student's GitHub account. It fetches repository logs, commits histories, and pull requests. AI algorithms inspect code configurations and compare functions against plagiarism benchmarks, generating a verified project badge for the recruiter database.
                  </div>
                </div>

                <div className={`faq-item-dark ${activeFaq === 1 ? 'active' : ''}`}>
                  <div className="faq-header" onClick={() => toggleFaq(1)}>
                    <h5>Can we sync CareerOS with our current Canvas or Moodle LMS?</h5>
                    <ChevronDown size={18} className="faq-icon" />
                  </div>
                  <div className="faq-body">
                    Yes. CareerOS features LTI integration standards. This allows seamless synchronization of grades, cohort calendars, and attendance statistics from systems like Moodle, Canvas, or Blackboard.
                  </div>
                </div>

                <div className={`faq-item-dark ${activeFaq === 2 ? 'active' : ''}`}>
                  <div className="faq-header" onClick={() => toggleFaq(2)}>
                    <h5>How does the Study Abroad module assist with visas?</h5>
                    <ChevronDown size={18} className="faq-icon" />
                  </div>
                  <div className="faq-body">
                    The Study Abroad dashboard holds program catalog workflows for over 400 universities. It automatically generates check-lists for passport and funding records, tracks recommendation letters, and provides mock visa appointment questions.
                  </div>
                </div>

                <div className={`faq-item-dark ${activeFaq === 3 ? 'active' : ''}`}>
                  <div className="faq-header" onClick={() => toggleFaq(3)}>
                    <h5>What pricing tiers are available for universities?</h5>
                    <ChevronDown size={18} className="faq-icon" />
                  </div>
                  <div className="faq-body">
                    We offer customized institutional SaaS agreements based on cohort sizes. Basic setups cover the core LMS, assignments tracker, and verified portfolio systems. Enterprise plans add the automated recruiter pipeline, AI resume optimizer, and study abroad pathways.
                  </div>
                </div>

              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* 11. CALL TO ACTION */}
      <section id="cta" className="section-padding bg-light">
        <div className="container">
          <ScrollReveal direction="fade">
            <div 
              className="card border-0 rounded-5 p-5 position-relative overflow-hidden text-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(217, 70, 239, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.12) !important'
              }}
            >
              <div className="glow-blob glow-blue" style={{ top: '-10%', left: '-10%', width: '250px', height: '250px' }}></div>
              <div className="glow-blob glow-purple" style={{ bottom: '-10%', right: '-10%', width: '250px', height: '250px' }}></div>

              <div className="position-relative z-2 py-4">
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 fw-extrabold mb-3 text-uppercase fs-8 py-1.5 px-3 rounded-5">
                  Secure Access
                </span>
                <h2 className="display-4 fw-extrabold mb-3 text-dark">Start Your Career Journey Today</h2>
                <p className="lead text-secondary mx-auto mb-5" style={{ maxWidth: '620px', fontSize: '1.1rem' }}>
                  Join over 10,000+ students, 200+ recruiters, and leading academic institutions. Get started now to transform your learning into high-tier placements.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button 
                    onClick={() => alert('Welcome to Opulent Vidya CareerOS! Initializing onboarding...')}
                    className="btn btn-primary-gradient px-4.5 py-3 rounded-pill d-inline-flex align-items-center gap-2"
                  >
                    <span>Join as Student</span>
                    <ArrowUpRight size={18} />
                  </button>
                  <button 
                    onClick={() => alert('Booking coordinator contacted.')}
                    className="btn btn-secondary-outline fw-bold px-4.5 py-3 rounded-pill"
                  >
                    Book institutional Demo
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-light text-dark pt-5 pb-4 border-top border-secondary-subtle">
        <div className="container">
          <div className="row g-4 text-start mb-5">
            {/* Col 1 */}
            <div className="col-lg-4 col-md-6">
              <a className="navbar-brand d-inline-flex align-items-center mb-3 text-dark" href="#hero">
                <span className="bg-secondary bg-opacity-10 text-primary border border-secondary-subtle d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px', borderRadius: '8px' }}>
                  <i className="bi bi-rocket-takeoff-fill text-gradient" style={{ fontSize: '1rem' }}></i>
                </span>
                <span className="fw-extrabold fs-5 text-gradient">CareerOS</span>
              </a>
              <p className="text-secondary fs-7 mb-4" style={{ maxWidth: '300px' }}>
                Opulent Vidya CareerOS is the premium student lifecycle infrastructure driving next-gen placement rate optimization.
              </p>
              <div className="d-flex gap-3 fs-5">
                <a href="#" className="text-secondary hover-text-primary"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-secondary hover-text-primary"><i className="bi bi-github"></i></a>
                <a href="#" className="text-secondary hover-text-primary"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-secondary hover-text-primary"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="fw-bold mb-3 fs-7 text-uppercase text-muted">Platform</h6>
              <ul className="list-unstyled fs-7">
                <li className="mb-2.5"><a href="#features" className="text-secondary text-decoration-none hover-text-primary">Smart LMS</a></li>
                <li className="mb-2.5"><a href="#features" className="text-secondary text-decoration-none hover-text-primary">GitHub Portfolios</a></li>
                <li className="mb-2.5"><a href="#features" className="text-secondary text-decoration-none hover-text-primary">ATS Resumes</a></li>
                <li className="mb-2.5"><a href="#dashboards" className="text-secondary text-decoration-none hover-text-primary">Partner Portals</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="fw-bold mb-3 fs-7 text-uppercase text-muted">Company</h6>
              <ul className="list-unstyled fs-7">
                <li className="mb-2.5"><a href="#" className="text-secondary text-decoration-none hover-text-primary">About Us</a></li>
                <li className="mb-2.5"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Careers</a></li>
                <li className="mb-2.5"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Partner Program</a></li>
                <li className="mb-2.5"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Contact Sales</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="col-lg-4 col-md-6">
              <h6 className="fw-bold mb-3 fs-7 text-uppercase text-muted">Newsletter SignUp</h6>
              <p className="text-secondary fs-7 mb-3">
                Subscribe to get latest updates about tech placements and career advice.
              </p>
              
              <form onSubmit={handleSubscribe} className="input-group mb-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control bg-white border-secondary-subtle text-dark fs-7 py-2.5" 
                  placeholder="Enter your email" 
                  required 
                />
                <button type="submit" className="btn btn-primary-gradient px-3 fs-7">
                  Subscribe
                </button>
              </form>
              
              {emailSubscribed && (
                <span className="text-success fs-8 fw-semibold d-block mt-2">
                  ✓ Successfully subscribed! Check your inbox.
                </span>
              )}
            </div>
          </div>

          <div className="border-top border-secondary-subtle pt-4 text-center">
            <span className="text-secondary fs-8">
              &copy; {new Date().getFullYear()} Opulent Vidya CareerOS. All Rights Reserved. Made with ❤️ in React & Bootstrap.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
