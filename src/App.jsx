import { useState, useEffect } from 'react';
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
  MapPin,
  Clock,
  ArrowUpRight
} from 'lucide-react';

function App() {
  // Navigation active state
  const [activeLink, setActiveLink] = useState('features');

  // Role-based dashboard selection state
  const [activeRole, setActiveRole] = useState('student');

  // AI Sandbox simulation state
  const [aiPrompt, setAiPrompt] = useState('Suggest a 6-month roadmap for Full-Stack Web Development.');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiModule, setAiModule] = useState('advisor'); // advisor, scheduler, doubt, resume

  // Email newsletter state
  const [email, setEmail] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  // Live stats simulation (counters)
  const [stats, setStats] = useState({ students: 8500, placements: 410, recruiters: 160 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        students: prev.students < 10000 ? prev.students + Math.floor(Math.random() * 10) + 5 : 10000,
        placements: prev.placements < 500 ? prev.placements + (Math.random() > 0.7 ? 1 : 0) : 500,
        recruiters: prev.recruiters < 200 ? prev.recruiters + (Math.random() > 0.85 ? 1 : 0) : 200
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Pre-configured AI Responses based on sandbox triggers
  const triggerAiResponse = (moduleType) => {
    setIsAiLoading(true);
    setAiModule(moduleType);
    
    let prompt = '';
    let responseText = '';
    
    switch (moduleType) {
      case 'advisor':
        prompt = 'Suggest a 6-month roadmap for Full-Stack Web Development.';
        responseText = `🤖 Opulent AI Advisor Suggestion:
• Months 1-2: HTML5, CSS3, ES6 JavaScript, and responsive design systems.
• Month 3: React.js, component lifecycle, state management (Redux/Zustand).
• Month 4: Node.js, Express, RESTful APIs, and MongoDB/PostgreSQL database structures.
• Month 5: Building full-stack projects, testing, Git collaboration.
• Month 6: Capstone Project: Create a SaaS startup app, optimize ATS resume, and start hiring pipelines.

🎯 Recommended Course Module: MERN Advanced Path.`;
        break;
      case 'scheduler':
        prompt = 'Reschedule my mock interview to accommodate class timings.';
        responseText = `📅 Opulent AI Scheduler Action:
• Detected conflict: "Mock Interview #3" conflicts with "Advanced Data Structures & Algorithms Live Lecture" on Thursday at 3:00 PM.
• Action: Rescheduled Mock Interview #3 to Friday, June 12th at 4:30 PM (your optimal learning hour).
• Sync Status: Calendar updated and notification sent to Recruiter (Google Calendar & Outlook).`;
        break;
      case 'doubt':
        prompt = 'Explain the difference between useEffect dependency array items in React.';
        responseText = `💬 Opulent AI Doubt Assistant:
In React's useEffect hook:
1. [] (Empty array): Runs once after the initial render (like componentDidMount).
2. [prop1, state1] (With variables): Runs on mount AND whenever those variables change.
3. No dependency array: Runs after every single render.

💡 Code Tip: Always include variables used inside useEffect that change over time, or else you risk stale closures!`;
        break;
      case 'resume':
        prompt = 'Optimize my resume summary for a Backend Engineer position.';
        responseText = `📄 Opulent AI Resume Optimizer (ATS-Scored: 94/100):
"Results-driven Software Engineer with 2+ years of experience designing and deploying scalable Web APIs. Proven track record in optimizing backend query latency by 40% and containerizing microservices using Docker/Kubernetes. Highly proficient in Node.js, Python, and PostgreSQL architecture."

🔑 Key Keywords Injected: Microservices, API Optimization, Scalability, Docker.`;
        break;
      default:
        break;
    }

    setAiPrompt(prompt);
    
    setTimeout(() => {
      setAiResponse(responseText);
      setIsAiLoading(false);
    }, 850);
  };

  // Run initial AI response once
  useEffect(() => {
    triggerAiResponse('advisor');
  }, []);

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

  return (
    <div className="bg-gradient-soft min-h-screen">
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg glass-navbar sticky-top py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#hero">
            <span className="bg-gradient-soft border d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(99, 102, 241, 0.15)' }}>
              <i className="bi bi-rocket-takeoff-fill text-gradient" style={{ fontSize: '1.25rem' }}></i>
            </span>
            <span className="fw-extrabold fs-4 text-gradient">CareerOS</span>
            <span className="ms-2 badge text-bg-light border text-muted" style={{ fontSize: '0.65rem', verticalAlign: 'middle' }}>v2.0 AI</span>
          </a>
          
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-3">
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-2 px-lg-3 ${activeLink === 'features' ? 'text-primary' : 'text-muted'}`} href="#features" onClick={() => setActiveLink('features')}>Features</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-2 px-lg-3 ${activeLink === 'problem' ? 'text-primary' : 'text-muted'}`} href="#problem" onClick={() => setActiveLink('problem')}>Why Us</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-2 px-lg-3 ${activeLink === 'dashboards' ? 'text-primary' : 'text-muted'}`} href="#dashboards" onClick={() => setActiveLink('dashboards')}>Dashboards</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-2 px-lg-3 ${activeLink === 'ai' ? 'text-primary' : 'text-muted'}`} href="#ai" onClick={() => setActiveLink('ai')}>AI Center</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-2 px-lg-3 ${activeLink === 'how-it-works' ? 'text-primary' : 'text-muted'}`} href="#how-it-works" onClick={() => setActiveLink('how-it-works')}>Timeline</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link fw-semibold px-2 px-lg-3 ${activeLink === 'testimonials' ? 'text-primary' : 'text-muted'}`} href="#testimonials" onClick={() => setActiveLink('testimonials')}>Reviews</a>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <a href="#cta" className="btn btn-secondary-outline border-0 py-2 px-3">Book Demo</a>
              <a href="#cta" className="btn btn-primary-gradient py-2 px-4">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="hero" className="position-relative overflow-hidden section-padding pt-5">
        <div className="container position-relative z-2">
          <div className="row align-items-center gy-5">
            {/* Hero Text */}
            <div className="col-lg-6 text-start">
              <div className="d-inline-flex align-items-center mb-3">
                <span className="pulse-badge">
                  <span className="pulse-dot"></span>
                  The Future of Student Lifecycle Systems
                </span>
              </div>
              <h1 className="display-4 fw-extrabold lh-sm mb-3" style={{ fontSize: '3.5rem' }}>
                One Platform. <br />
                <span className="text-gradient">Complete Career Journey.</span>
              </h1>
              <p className="lead text-muted mb-4 fs-5" style={{ maxWidth: '540px' }}>
                Opulent Vidya CareerOS is the premium, AI-powered system integrating LMS, project-building, portfolios, ATS resume creation, global studies, and placement hiring pipelines in one unified ecosystem.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-5">
                <a href="#cta" className="btn btn-primary-gradient px-4 py-3 fs-6 d-inline-flex align-items-center gap-2">
                  <span>Start Learning</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#cta" className="btn btn-secondary-outline px-4 py-3 fs-6">
                  Book a Demo
                </a>
              </div>

              <div className="row g-4 pt-3 border-top border-light">
                <div className="col-auto">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    <span className="text-muted fw-semibold fs-6">No platform hop</span>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    <span className="text-muted fw-semibold fs-6">AI-optimized outcomes</span>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    <span className="text-muted fw-semibold fs-6">Real recruiter pipeline</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Interactive UI Preview */}
            <div className="col-lg-6 position-relative">
              {/* Blurred background glows */}
              <div className="position-absolute bg-primary rounded-circle filter-blur" style={{ width: '250px', height: '250px', top: '10%', right: '10%', filter: 'blur(100px)', opacity: '0.25', zIndex: '1' }}></div>
              <div className="position-absolute bg-purple rounded-circle filter-blur" style={{ width: '200px', height: '200px', bottom: '10%', left: '10%', filter: 'blur(80px)', opacity: '0.2', zIndex: '1' }}></div>
              
              <div className="position-relative z-2">
                {/* Main Dashboard Panel Mockup */}
                <div className="card border-0 rounded-4 shadow-lg p-3 bg-white" style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}>
                  <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="bg-danger rounded-circle d-inline-block" style={{ width: '10px', height: '10px' }}></span>
                      <span className="bg-warning rounded-circle d-inline-block" style={{ width: '10px', height: '10px' }}></span>
                      <span className="bg-success rounded-circle d-inline-block" style={{ width: '10px', height: '10px' }}></span>
                      <span className="text-muted fw-medium ms-2" style={{ fontSize: '0.75rem' }}>student-dashboard.career-os.com</span>
                    </div>
                    <span className="badge bg-light text-primary border py-1.5 px-2.5 rounded-3 d-flex align-items-center gap-1.5 fs-7">
                      <Sparkles size={12} />
                      AI Live
                    </span>
                  </div>

                  {/* Mock content */}
                  <div className="row g-3">
                    {/* User profile widget */}
                    <div className="col-md-7">
                      <div className="p-3 border rounded-3 bg-light-subtle h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px' }}>SV</div>
                          <div>
                            <h6 className="mb-0 fw-bold">Siddharth Varma</h6>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>B.Tech CSE Student (Cohort 2026)</span>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex justify-content-between text-muted fs-7 mb-1">
                            <span>Portfolio Complete</span>
                            <span className="fw-bold text-primary">85%</span>
                          </div>
                          <div className="progress" style={{ height: '6px' }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between text-muted fs-7">
                          <span>Verified Projects</span>
                          <span className="fw-bold text-dark">4 / 5</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Widget */}
                    <div className="col-md-5">
                      <div className="p-3 border rounded-3 bg-white text-start h-100">
                        <span className="text-muted fs-7 fw-semibold d-block mb-1">ATS Score</span>
                        <div className="d-flex align-items-baseline gap-2 mb-2">
                          <span className="fs-3 fw-bold text-gradient">92/100</span>
                          <span className="badge bg-success-subtle text-success fs-7">Excellent</span>
                        </div>
                        <span className="text-muted fs-7 d-block">Optimized for 14 Backend Roles</span>
                      </div>
                    </div>

                    {/* Live Jobs Panel */}
                    <div className="col-12">
                      <div className="p-3 border rounded-3 bg-light-subtle text-start">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0 fw-bold fs-7">Active Recruiter Viewings</h6>
                          <span className="badge bg-danger-subtle text-danger fs-8">2 Live</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between p-2 border-bottom border-light">
                          <div className="d-flex align-items-center gap-2">
                            <span className="bg-primary-subtle text-primary rounded p-1.5 d-flex"><Briefcase size={14} /></span>
                            <div>
                              <span className="fw-bold fs-7 d-block">Google Cloud India</span>
                              <span className="text-muted fs-8">Backend Engineer Intern</span>
                            </div>
                          </div>
                          <span className="badge bg-success-subtle text-success fs-8">Interview Stage</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between p-2 pt-2.5">
                          <div className="d-flex align-items-center gap-2">
                            <span className="bg-purple-subtle text-purple rounded p-1.5 d-flex"><Briefcase size={14} /></span>
                            <div>
                              <span className="fw-bold fs-7 d-block">Razorpay Tech</span>
                              <span className="text-muted fs-8">Software Engineer - Front End</span>
                            </div>
                          </div>
                          <span className="badge bg-info-subtle text-info fs-8">Shortlisted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Widget 1 */}
                <div className="hero-card-1 position-absolute bg-white rounded-3 p-3 shadow-md border d-flex align-items-center gap-2" style={{ top: '-40px', left: '-30px', zIndex: '3', maxWidth: '200px' }}>
                  <div className="bg-success-subtle text-success p-2 rounded-circle d-flex"><CheckSquare size={16} /></div>
                  <div>
                    <span className="text-muted fs-8 d-block">LMS Modules</span>
                    <span className="fw-bold fs-7">98% Attendance</span>
                  </div>
                </div>

                {/* Floating Widget 2 */}
                <div className="hero-card-2 position-absolute bg-white rounded-3 p-3 shadow-md border d-flex align-items-center gap-2.5" style={{ bottom: '-30px', right: '-15px', zIndex: '3', maxWidth: '210px' }}>
                  <div className="bg-warning-subtle text-warning p-2 rounded-circle d-flex"><Globe size={16} /></div>
                  <div>
                    <span className="text-muted fs-8 d-block">Study Abroad Tracker</span>
                    <span className="fw-bold fs-7">Visa Approved 🇺🇸</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST SECTION */}
      <section className="bg-white border-top border-bottom py-5">
        <div className="container">
          <h6 className="text-center text-uppercase fw-extrabold text-muted mb-4 fs-7" style={{ letterSpacing: '0.15em' }}>
            Trusted by Students, Trainers & Recruiters Globally
          </h6>
          
          <div className="row row-cols-2 row-cols-md-4 g-4 align-items-center justify-content-center text-center">
            <div className="col">
              <div className="trust-logo">
                <i className="bi bi-microsoft me-2"></i> Microsoft
              </div>
            </div>
            <div className="col">
              <div className="trust-logo">
                <i className="bi bi-amazon me-2"></i> Amazon
              </div>
            </div>
            <div className="col">
              <div className="trust-logo">
                <i className="bi bi-google me-2"></i> Google Cloud
              </div>
            </div>
            <div className="col">
              <div className="trust-logo">
                <i className="bi bi-stripe me-2"></i> Stripe
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4 text-center justify-content-center">
            <div className="col-md-3">
              <div className="p-3">
                <h2 className="display-6 fw-bold text-gradient mb-1">
                  {stats.students.toLocaleString()}+
                </h2>
                <span className="text-muted fw-semibold">Active Students</span>
              </div>
            </div>
            <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center">
              <div className="vr h-75 bg-light mx-auto"></div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h2 className="display-6 fw-bold text-gradient mb-1">
                  {stats.placements}+
                </h2>
                <span className="text-muted fw-semibold">High-Tier Placements</span>
              </div>
            </div>
            <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center">
              <div className="vr h-75 bg-light mx-auto"></div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h2 className="display-6 fw-bold text-gradient mb-1">
                  {stats.recruiters}+
                </h2>
                <span className="text-muted fw-semibold">Verified Hiring Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEM → SOLUTION SECTION */}
      <section id="problem" className="section-padding bg-light-subtle">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="role-badge mb-2 d-inline-block">The Paradigm Shift</span>
            <h2 className="display-5 fw-extrabold text-gradient mb-3">Re-engineering Career Preparation</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
              Traditional educational portals force students to jump across 6 separate tools. Opulent Vidya CareerOS unifies this ecosystem.
            </p>
          </div>

          <div className="row g-5 align-items-stretch">
            {/* Problems Left Column */}
            <div className="col-lg-6">
              <div className="card border-0 rounded-4 shadow-sm h-100 p-4 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-2.5 mb-4 text-danger">
                    <i className="bi bi-x-circle-fill fs-4"></i>
                    <h4 className="mb-0 fw-bold">The Fragmented Mess</h4>
                  </div>
                  
                  <div className="problem-card">
                    <h5 className="fw-bold fs-6 mb-2">Multiple Disconnected Systems</h5>
                    <p className="text-muted fs-7 mb-0">
                      Students study on Coursera, track tasks on spreadsheets, build github portfolios separately, write resumes on Canva, and apply via third-party channels with zero synchronization.
                    </p>
                  </div>

                  <div className="problem-card">
                    <h5 className="fw-bold fs-6 mb-2">No Central Career Path Visibility</h5>
                    <p className="text-muted fs-7 mb-0">
                      Trainers and placement cells lack visibility of student progress. Predictive analytics is impossible because datasets reside in distinct silos.
                    </p>
                  </div>

                  <div className="problem-card mb-0">
                    <h5 className="fw-bold fs-6 mb-2">Manual Recruiting Pipeline</h5>
                    <p className="text-muted fs-7 mb-0">
                      Recruiters review static, outdated PDFs. Finding candidates matching exact backend performance markers takes days of manual review.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-top border-light text-start">
                  <span className="text-danger fw-semibold fs-7 d-flex align-items-center gap-2">
                    <i className="bi bi-arrow-right-short fs-5"></i> Results in decreased hireability and resource waste.
                  </span>
                </div>
              </div>
            </div>

            {/* Solutions Right Column */}
            <div className="col-lg-6">
              <div className="card border-0 rounded-4 shadow-sm h-100 p-4 bg-white d-flex flex-column justify-content-between" style={{ border: '2px solid rgba(99, 102, 241, 0.15) !important' }}>
                <div>
                  <div className="d-flex align-items-center gap-2.5 mb-4 text-success">
                    <i className="bi bi-check-circle-fill fs-4 text-gradient"></i>
                    <h4 className="mb-0 fw-bold text-gradient">The CareerOS Solution</h4>
                  </div>

                  <div className="solution-card">
                    <h5 className="fw-bold text-primary fs-6 mb-2">Unified Student Journey Ecosystem</h5>
                    <p className="text-muted fs-7 mb-0">
                      Integrates LMS modules, project tracking repositories, internship reviews, and verified portfolios within a single ecosystem. Everything automatically updates in real-time.
                    </p>
                  </div>

                  <div className="solution-card">
                    <h5 className="fw-bold text-primary fs-6 mb-2">Real-Time AI Progress Analytics</h5>
                    <p className="text-muted fs-7 mb-0">
                      AI continuously checks course engagement, project commits, and test outputs. It suggests dynamic corrective actions before student dropouts happen.
                    </p>
                  </div>

                  <div className="solution-card mb-0">
                    <h5 className="fw-bold text-primary fs-6 mb-2">Interactive, Verified Hiring Portals</h5>
                    <p className="text-muted fs-7 mb-0">
                      Recruiters search profiles utilizing verified performance records. Hire top candidates instantly with interactive dashboards featuring full portfolio analytics.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-top border-light text-start">
                  <span className="text-success fw-semibold fs-7 d-flex align-items-center gap-2">
                    <i className="bi bi-check2-circle fs-5"></i> Boosts placement efficiency by over 240%.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES (GRID STYLE) */}
      <section id="features" className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="role-badge mb-2 d-inline-block">Product Pillars</span>
            <h2 className="display-5 fw-extrabold text-gradient mb-3">Enterprise-Grade Architecture</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
              Explore the individual modules powering student success throughout the lifecycle.
            </p>
          </div>

          <div className="row g-4">
            {/* Feature 1: Smart LMS */}
            <div className="col-md-6 col-lg-4">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <BookOpen size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">Smart LMS</h4>
                <p className="text-muted fs-7 mb-3">
                  Live virtual classrooms, dynamic recordings index, responsive code playgrounds, and interactive progress markers.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>Live & Record modules</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>

            {/* Feature 2: Assignment Tracker */}
            <div className="col-md-6 col-lg-4">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <CheckSquare size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">Assignment Tracker</h4>
                <p className="text-muted fs-7 mb-3">
                  AI-driven homework scoring, auto code execution, prompt notifications, and predictive completion tracking.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>Instant sandbox run</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>

            {/* Feature 3: Project Portfolio */}
            <div className="col-md-6 col-lg-4">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <Briefcase size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">Project Portfolio</h4>
                <p className="text-muted fs-7 mb-3">
                  Sync GitHub projects, show live application links, display peer reviews, and construct a verified codebase profile.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>GitHub Sync ready</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>

            {/* Feature 4: Internship System */}
            <div className="col-md-6 col-lg-4">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <UserCheck size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">Internship Management</h4>
                <p className="text-muted fs-7 mb-3">
                  Track project sprints, log industry mentor feedbacks, verify hour logs, and sync credit allocations seamlessly.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>Mentor signoff module</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>

            {/* Feature 5: AI Resume Builder */}
            <div className="col-md-6 col-lg-4">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <FileText size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">AI Resume Optimizer</h4>
                <p className="text-muted fs-7 mb-3">
                  Build ATS-optimized resumes in real-time, generate custom cover letters, and score LinkedIn profile completeness.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>ATS Analyzer check</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>

            {/* Feature 6: Study Abroad Module */}
            <div className="col-md-6 col-lg-4">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <Globe size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">Study Abroad Pathway</h4>
                <p className="text-muted fs-7 mb-3">
                  University database matching, visa application tracking, scholarship application support, and language test prep.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>Global application sync</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>

            {/* Feature 7: Placement System */}
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="hover-card text-start">
                <div className="feature-icon-wrapper">
                  <Award size={24} />
                </div>
                <h4 className="fw-bold mb-2 fs-5">Placement Pipelines</h4>
                <p className="text-muted fs-7 mb-3">
                  Direct recruiter interview portals, automated referral systems, and hiring manager dashboard profiles.
                </p>
                <div className="d-flex align-items-center text-primary fw-bold fs-8">
                  <span>Recruiter portal access</span>
                  <ChevronRight size={14} className="ms-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (FLOW SECTION) */}
      <section id="how-it-works" className="section-padding bg-light-subtle overflow-hidden">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="role-badge mb-2 d-inline-block">The Journey</span>
            <h2 className="display-5 fw-extrabold text-gradient mb-3">End-to-End Student Lifecycle Flow</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
              Watch a student's structured transformation from a new lead to a successfully placed alumni.
            </p>
          </div>

          <div className="flow-container py-4">
            <div className="flow-line d-none d-lg-block"></div>
            
            <div className="row g-4 row-cols-1 row-cols-md-3 row-cols-lg-5 justify-content-center">
              {/* Step 1 */}
              <div className="col">
                <div className="flow-step-card">
                  <div className="flow-step-number">01</div>
                  <h6 className="fw-bold mt-2">Enrollment</h6>
                  <p className="text-muted fs-8 mb-0">Lead conversion, customized goals, diagnostic tests.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="col">
                <div className="flow-step-card">
                  <div className="flow-step-number">02</div>
                  <h6 className="fw-bold mt-2">Active Learning</h6>
                  <p className="text-muted fs-8 mb-0">Smart LMS, live lectures, auto homework check.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="col">
                <div className="flow-step-card">
                  <div className="flow-step-number">03</div>
                  <h6 className="fw-bold mt-2">Portfolios & Intern</h6>
                  <p className="text-muted fs-8 mb-0">Project showcase, GitHub synchronization, internship credit.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="col">
                <div className="flow-step-card">
                  <div className="flow-step-number">04</div>
                  <h6 className="fw-bold mt-2">AI Optimization</h6>
                  <p className="text-muted fs-8 mb-0">ATS resume tuning, Global Studies match, interview prep.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="col">
                <div className="flow-step-card">
                  <div className="flow-step-number">05</div>
                  <h6 className="fw-bold mt-2">Placement & Alumni</h6>
                  <p className="text-muted fs-8 mb-0">Hiring portal unlock, job match, mentor next cohorts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ROLE-BASED DASHBOARD SECTION (DYNAMIC INTERACTION) */}
      <section id="dashboards" className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="role-badge mb-2 d-inline-block">Multi-Tenant Portals</span>
            <h2 className="display-5 fw-extrabold text-gradient mb-3">Custom Dashboards for Every Role</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
              Opulent Vidya CareerOS configures personalized interfaces, access rules, and metric views for all six main user personas.
            </p>
          </div>

          <div className="row g-4 align-items-center">
            {/* Role List buttons */}
            <div className="col-lg-4">
              <div className="pe-0 pe-lg-3">
                
                <button 
                  onClick={() => setActiveRole('student')}
                  className={`role-tab-btn ${activeRole === 'student' ? 'active' : ''}`}
                >
                  <span className="bg-primary-subtle text-primary p-2 rounded-3 me-3 d-flex"><GraduationCap size={20} /></span>
                  <div>
                    <span className="d-block fw-bold fs-6">👨🎓 Student Dashboard</span>
                    <span className="text-muted fs-8 fw-normal">Progress & interview analytics</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveRole('trainer')}
                  className={`role-tab-btn ${activeRole === 'trainer' ? 'active' : ''}`}
                >
                  <span className="bg-purple-subtle text-purple p-2 rounded-3 me-3 d-flex"><Users size={20} /></span>
                  <div>
                    <span className="d-block fw-bold fs-6">👨🏫 Trainer Panel</span>
                    <span className="text-muted fs-8 fw-normal">Attendance logs & grades</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveRole('recruiter')}
                  className={`role-tab-btn ${activeRole === 'recruiter' ? 'active' : ''}`}
                >
                  <span className="bg-success-subtle text-success p-2 rounded-3 me-3 d-flex"><Briefcase size={20} /></span>
                  <div>
                    <span className="d-block fw-bold fs-6">🧑💼 Recruiter Portal</span>
                    <span className="text-muted fs-8 fw-normal">Candidate filters & job pipelines</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveRole('parent')}
                  className={`role-tab-btn ${activeRole === 'parent' ? 'active' : ''}`}
                >
                  <span className="bg-info-subtle text-info p-2 rounded-3 me-3 d-flex"><UserCheck size={20} /></span>
                  <div>
                    <span className="d-block fw-bold fs-6">👨👩👧 Parent View</span>
                    <span className="text-muted fs-8 fw-normal">Grade cards & fee invoices</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveRole('study')}
                  className={`role-tab-btn ${activeRole === 'study' ? 'active' : ''}`}
                >
                  <span className="bg-warning-subtle text-warning p-2 rounded-3 me-3 d-flex"><Globe size={20} /></span>
                  <div>
                    <span className="d-block fw-bold fs-6">🎓 Study Abroad Advisor</span>
                    <span className="text-muted fs-8 fw-normal">Visa workflows & university database</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveRole('admin')}
                  className={`role-tab-btn ${activeRole === 'admin' ? 'active' : ''}`}
                >
                  <span className="bg-danger-subtle text-danger p-2 rounded-3 me-3 d-flex"><Shield size={20} /></span>
                  <div>
                    <span className="d-block fw-bold fs-6">🛠️ Admin Panel</span>
                    <span className="text-muted fs-8 fw-normal">Global settings & cohort builder</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Dynamic Dashboard Mockup display */}
            <div className="col-lg-8">
              <div className="mock-dashboard">
                {/* Header bar */}
                <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge text-bg-dark text-uppercase fs-8 px-2 py-1">
                      {activeRole === 'study' ? 'study_abroad' : activeRole} Portal
                    </span>
                    <span className="text-muted fs-7">Secure SSL Connection</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                    <span className="text-muted fs-8">System Sync: Live</span>
                  </div>
                </div>

                {/* Main Body depending on active role */}
                <div className="p-4 text-start">
                  
                  {activeRole === 'student' && (
                    <div>
                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">CURRENT CLASS MODULE</span>
                            <h6 className="fw-bold mb-1">Advanced React Hooks & Context API</h6>
                            <span className="text-primary fs-8 fw-semibold"><i className="bi bi-clock me-1"></i> Ends in 40 mins</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">UPCOMING ASSIGNMENT</span>
                            <h6 className="fw-bold mb-1">Full-Stack Database Optimization</h6>
                            <span className="text-danger fs-8 fw-semibold"><i className="bi bi-exclamation-triangle me-1"></i> Due in 12 hours</span>
                          </div>
                        </div>
                      </div>
                      <h6 className="fw-bold mb-3">Placement Preparation Status</h6>
                      <div className="p-3 border rounded-3 bg-white mb-3">
                        <div className="d-flex justify-content-between text-muted fs-7 mb-2">
                          <span>Portfolio Verifications completed</span>
                          <span className="fw-bold text-success">4 / 5 Projects verified</span>
                        </div>
                        <div className="progress mb-3" style={{ height: '8px' }}>
                          <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                        </div>
                        <div className="row g-3">
                          <div className="col-6 col-sm-3">
                            <span className="text-muted fs-8 d-block">Resume Score</span>
                            <span className="fw-bold text-dark fs-5">88/100</span>
                          </div>
                          <div className="col-6 col-sm-3">
                            <span className="text-muted fs-8 d-block">Mock Tests</span>
                            <span className="fw-bold text-dark fs-5">Passed (85%)</span>
                          </div>
                          <div className="col-6 col-sm-3">
                            <span className="text-muted fs-8 d-block">Mentors Rating</span>
                            <span className="fw-bold text-dark fs-5">4.8 / 5.0</span>
                          </div>
                          <div className="col-6 col-sm-3">
                            <span className="text-muted fs-8 d-block">Interview Invites</span>
                            <span className="fw-bold text-primary fs-5">3 Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeRole === 'trainer' && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="fw-bold mb-0">Cohort Overview: MERN Developers (Cohort A)</h6>
                        <span className="badge bg-primary fs-8">Total: 48 Students</span>
                      </div>
                      <div className="row g-3 mb-3 text-center">
                        <div className="col-md-4">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">COHORT ATTENDANCE</span>
                            <h4 className="fw-bold mb-0 text-success">94.2%</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">AVG PROJECTS SUBMITTED</span>
                            <h4 className="fw-bold mb-0 text-primary">4.1 / 5</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">PENDING GRADING</span>
                            <h4 className="fw-bold mb-0 text-warning">14 Tasks</h4>
                          </div>
                        </div>
                      </div>
                      <h6 className="fw-bold mb-3">Flagged Students (Low Activity alert)</h6>
                      <div className="p-2.5 border rounded-3 bg-danger-subtle text-danger-emphasis fs-7 mb-2 d-flex justify-content-between align-items-center">
                        <span>⚠️ <strong>Aaryan Sen</strong> has not submitted Assignment #4 (Due 2 days ago)</span>
                        <a href="#cta" className="btn btn-sm btn-danger py-1 fs-8">Ping Student</a>
                      </div>
                    </div>
                  )}

                  {activeRole === 'recruiter' && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="fw-bold mb-0">Smart Candidate Database Search</h6>
                        <span className="text-muted fs-8">Updated 5m ago</span>
                      </div>
                      <div className="input-group mb-3 shadow-sm rounded-3">
                        <span className="input-group-text bg-white border-end-0 text-muted"><Search size={18} /></span>
                        <input type="text" className="form-control border-start-0 py-2.5 fs-7" placeholder="Search skills: 'React', 'Node.js', ATS Score > 85, verified project links..." defaultValue="React, Node.js, postgresql" />
                        <button className="btn btn-primary-gradient px-3 py-2.5 fs-7">Search</button>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover border align-middle fs-7 mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Candidate</th>
                              <th>ATS Score</th>
                              <th>Verified Projects</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="fw-bold">Sneha Reddy</td>
                              <td><span className="badge bg-success-subtle text-success">95</span></td>
                              <td>5 Github Verified</td>
                              <td><span className="badge text-bg-warning">Invited</span></td>
                              <td><button className="btn btn-sm btn-outline-primary py-1 fs-8">View File</button></td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Vikas Khanna</td>
                              <td><span className="badge bg-success-subtle text-success">91</span></td>
                              <td>4 Github Verified</td>
                              <td><span className="badge text-bg-success">Shortlisted</span></td>
                              <td><button className="btn btn-sm btn-outline-primary py-1 fs-8">View File</button></td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Diya Mehta</td>
                              <td><span className="badge bg-success-subtle text-success">88</span></td>
                              <td>5 Github Verified</td>
                              <td><span className="badge text-bg-light">Reviewing</span></td>
                              <td><button className="btn btn-sm btn-outline-primary py-1 fs-8">View File</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeRole === 'parent' && (
                    <div>
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '45px', height: '45px' }}>KV</div>
                        <div>
                          <h6 className="mb-0 fw-bold">Ward Name: Kabir Varma</h6>
                          <span className="text-muted fs-8">MERN Cohort B — Student ID: #SV998</span>
                        </div>
                      </div>
                      <div className="row g-3 mb-4 text-start">
                        <div className="col-sm-6">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">TOTAL ATTENDANCE</span>
                            <span className="fw-bold text-dark fs-5">98% (Exceeded Target)</span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">LATEST TEST GRADE</span>
                            <span className="fw-bold text-success fs-5">A+ (Advanced APIs)</span>
                          </div>
                        </div>
                      </div>
                      <h6 className="fw-bold mb-3">Fee Payment & Invoices</h6>
                      <div className="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-bold fs-7 d-block">Cohort Installment #2</span>
                          <span className="text-muted fs-8">Due date: June 20, 2026</span>
                        </div>
                        <span className="badge text-bg-success py-2 px-3 fs-8">Paid <i className="bi bi-check-circle ms-1"></i></span>
                      </div>
                    </div>
                  )}

                  {activeRole === 'study' && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="fw-bold mb-0">Study Abroad Pathways Integration</h6>
                        <span className="badge bg-warning text-dark fs-8">4 Global Partners</span>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <div className="p-3 border rounded-3 bg-white">
                            <span className="badge bg-primary-subtle text-primary mb-2">GERMANY</span>
                            <h6 className="fw-bold">Technical University of Munich</h6>
                            <p className="text-muted fs-8 mb-2">Target Program: M.Sc Informatics (Winter Intake)</p>
                            <span className="text-success fs-8 fw-semibold"><i className="bi bi-check2-circle me-1"></i> Application Verified</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-3 border rounded-3 bg-white">
                            <span className="badge bg-purple-subtle text-purple mb-2">UNITED STATES</span>
                            <h6 className="fw-bold">Northeastern University, Boston</h6>
                            <p className="text-muted fs-8 mb-2">Target Program: MS in Computer Science (Fall Intake)</p>
                            <span className="text-warning fs-8 fw-semibold"><i className="bi bi-clock-history me-1"></i> Document Review Stage</span>
                          </div>
                        </div>
                      </div>
                      <h6 className="fw-bold mb-3">Language & Visa status tracker</h6>
                      <div className="p-3 border rounded-3 bg-light-subtle d-flex justify-content-between">
                        <div>
                          <span className="text-muted fs-8 d-block">IELTS Mock Score</span>
                          <span className="fw-bold text-dark">7.5 Band (Passed)</span>
                        </div>
                        <div>
                          <span className="text-muted fs-8 d-block">WES Evaluation</span>
                          <span className="fw-bold text-success">Submitted</span>
                        </div>
                        <div>
                          <span className="text-muted fs-8 d-block">Visa Appointment</span>
                          <span className="fw-bold text-primary">Scheduled July 10</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeRole === 'admin' && (
                    <div>
                      <h6 className="fw-bold mb-4">Global Administration Panel</h6>
                      <div className="row g-3 mb-4 text-center">
                        <div className="col-6 col-md-3">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">TOTAL COHORTS</span>
                            <span className="fw-bold text-dark fs-4">24 Active</span>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">TEACHING STAFF</span>
                            <span className="fw-bold text-dark fs-4">18 Trainers</span>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">SYSTEM AVAILABILITY</span>
                            <span className="fw-bold text-success fs-4">99.98%</span>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="p-3 border rounded-3 bg-light">
                            <span className="text-muted fs-8 d-block mb-1">API REQUESTS</span>
                            <span className="fw-bold text-primary fs-4">42K/hr</span>
                          </div>
                        </div>
                      </div>
                      <div className="card border-0 p-3 bg-dark text-white rounded-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-success fs-8 fw-semibold"><i className="bi bi-terminal-fill me-2"></i> System Activity Logs</span>
                          <span className="badge bg-secondary fs-9">Real-time</span>
                        </div>
                        <pre className="mb-0 fs-8 text-white-50 overflow-hidden" style={{ maxHeight: '70px', fontFamily: 'monospace' }}>
                          [14:32:01] AUTH: Student SID_998 token refresh success<br />
                          [14:32:05] INTEGRATION: Automated Github pull for SV998 - OK<br />
                          [14:32:11] AI: Injected ATS suggestions for 14 candidates
                        </pre>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AI POWER SECTION (DARK HIGHLIGHT SECTION) */}
      <section id="ai" className="section-padding bg-gradient-ai text-white position-relative overflow-hidden">
        {/* Glowing Blobs */}
        <div className="glow-blob glow-blue"></div>
        <div className="glow-blob glow-purple"></div>

        <div className="container position-relative z-2">
          <div className="row align-items-center gy-5">
            <div className="col-lg-5 text-start">
              <span className="badge bg-purple text-white mb-2 fs-7 px-3 py-1.5 rounded-3 d-inline-flex align-items-center gap-1.5">
                <Sparkles size={14} /> AI Engine Core
              </span>
              <h2 className="display-5 fw-extrabold mb-3">The AI-Powered Career Engine</h2>
              <p className="text-white-50 mb-4 fs-6">
                Explore the automated features designed to support students and institutions around the clock. Click the options below to interactively test our AI.
              </p>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div 
                    onClick={() => triggerAiResponse('advisor')}
                    className={`ai-highlight-card h-100 style-selector cursor-pointer ${aiModule === 'advisor' ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer', border: aiModule === 'advisor' ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-purple mb-2"><Cpu size={24} /></div>
                    <h5 className="fw-bold fs-7 mb-1 text-white">AI Career Advisor</h5>
                    <span className="text-white-50 fs-9">Roadmaps & suggestions</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div 
                    onClick={() => triggerAiResponse('scheduler')}
                    className={`ai-highlight-card h-100 style-selector cursor-pointer ${aiModule === 'scheduler' ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer', border: aiModule === 'scheduler' ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-purple mb-2"><Calendar size={24} /></div>
                    <h5 className="fw-bold fs-7 mb-1 text-white">AI Scheduler</h5>
                    <span className="text-white-50 fs-9">Automated timetable updates</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div 
                    onClick={() => triggerAiResponse('doubt')}
                    className={`ai-highlight-card h-100 style-selector cursor-pointer ${aiModule === 'doubt' ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer', border: aiModule === 'doubt' ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-purple mb-2"><MessageSquare size={24} /></div>
                    <h5 className="fw-bold fs-7 mb-1 text-white">AI Doubt Assistant</h5>
                    <span className="text-white-50 fs-9">24/7 technical answers</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div 
                    onClick={() => triggerAiResponse('resume')}
                    className={`ai-highlight-card h-100 style-selector cursor-pointer ${aiModule === 'resume' ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer', border: aiModule === 'resume' ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-purple mb-2"><FileText size={24} /></div>
                    <h5 className="fw-bold fs-7 mb-1 text-white">AI Resume Builder</h5>
                    <span className="text-white-50 fs-9">Instant ATS optimization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Playground Output */}
            <div className="col-lg-7">
              <div className="card bg-dark border-secondary rounded-4 shadow-lg p-4 text-start">
                <div className="d-flex align-items-center justify-content-between pb-3 border-bottom border-secondary mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="bg-gradient-soft border d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', borderRadius: '7px' }}>
                      <i className="bi bi-cpu text-gradient fs-6"></i>
                    </span>
                    <span className="fw-bold text-white fs-7">Interactive AI Sandbox</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-secondary-subtle text-secondary fs-8">Model: Career-GPT-v4</span>
                  </div>
                </div>

                {/* Prompt display */}
                <div className="mb-4">
                  <label className="text-white-50 fs-8 fw-semibold mb-1.5 uppercase">Simulated User Input Prompt</label>
                  <div className="p-3 rounded-3 bg-secondary bg-opacity-25 border border-secondary text-white-50 fs-7">
                    {aiPrompt}
                  </div>
                </div>

                {/* Response display */}
                <div>
                  <label className="text-white-50 fs-8 fw-semibold mb-1.5 uppercase">AI Sandbox Output Response</label>
                  <div className="p-3 rounded-3 bg-black bg-opacity-40 border border-secondary text-white fs-7 min-h-150 position-relative" style={{ minHeight: '220px', fontFamily: 'monospace' }}>
                    {isAiLoading ? (
                      <div className="position-absolute top-50 start-50 translate-middle text-center">
                        <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="d-block mt-2 text-white-50 fs-8">Analyzing parameters...</span>
                      </div>
                    ) : (
                      <span style={{ whiteSpace: 'pre-line' }}>{aiResponse}</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <span className="text-white-50 fs-8">Click another module on the left to request another query response.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DASHBOARD PREVIEW (UI SHOWCASE) */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="role-badge mb-2 d-inline-block">Product Tour</span>
            <h2 className="display-5 fw-extrabold text-gradient mb-3">Enterprise Dashboards Showcase</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
              A peek inside the operational analytics panels used by university management and student career officers.
            </p>
          </div>

          <div className="row g-4">
            {/* Mock Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card border rounded-4 shadow-sm p-4 bg-light text-start h-100">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-2">
                    <TrendingUp size={16} className="text-primary" /> Analytics Center
                  </h6>
                  <span className="badge bg-primary-subtle text-primary fs-8">Monthly</span>
                </div>
                <h3 className="fw-bold mb-2">91.4%</h3>
                <span className="text-success fs-7 fw-bold d-block mb-3">
                  <i className="bi bi-arrow-up-right me-1"></i> +8.2% vs last semester placements
                </span>
                <div className="p-3 border bg-white rounded-3">
                  <div className="d-flex justify-content-between fs-8 text-muted mb-2">
                    <span>Highest Salary Package</span>
                    <span className="fw-bold text-dark">42.5 LPA</span>
                  </div>
                  <div className="d-flex justify-content-between fs-8 text-muted">
                    <span>Average Package</span>
                    <span className="fw-bold text-dark">8.7 LPA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card border rounded-4 shadow-sm p-4 bg-light text-start h-100">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-2">
                    <Users size={16} className="text-primary" /> Cohorts Distribution
                  </h6>
                  <span className="badge bg-purple-subtle text-purple fs-8">14 Cohorts</span>
                </div>
                <h3 className="fw-bold mb-2">1,240</h3>
                <span className="text-muted fs-7 d-block mb-3">Total registered active learners</span>
                <div className="p-3 border bg-white rounded-3">
                  <div className="mb-2">
                    <div className="d-flex justify-content-between fs-8 text-muted mb-1">
                      <span>Software Engineering</span>
                      <span className="fw-bold text-dark">620</span>
                    </div>
                    <div className="progress" style={{ height: '4px' }}>
                      <div className="progress-bar bg-primary" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between fs-8 text-muted mb-1">
                      <span>Design & Product</span>
                      <span className="fw-bold text-dark">440</span>
                    </div>
                    <div className="progress" style={{ height: '4px' }}>
                      <div className="progress-bar bg-purple" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Card 3 */}
            <div className="col-lg-4 col-md-12">
              <div className="card border rounded-4 shadow-sm p-4 bg-light text-start h-100">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-2">
                    <Award size={16} className="text-primary" /> Top Recruiter Activity
                  </h6>
                  <span className="badge bg-success-subtle text-success fs-8">Active</span>
                </div>
                <h3 className="fw-bold mb-2">28</h3>
                <span className="text-muted fs-7 d-block mb-3">Recruiters scheduling interviews this week</span>
                <div className="p-3 border bg-white rounded-3">
                  <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom border-light">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fs-8" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>AZ</div>
                    <span className="fs-8 text-muted">Amazon India — <strong>14 shortlist candidates</strong></span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fs-8" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>MS</div>
                    <span className="fs-8 text-muted">Microsoft — <strong>8 shortlist candidates</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section id="testimonials" className="section-padding bg-light-subtle">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="role-badge mb-2 d-inline-block">Success Stories</span>
            <h2 className="display-5 fw-extrabold text-gradient mb-3">What Our Ecosystem Users Say</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
              Read the direct experiences of students, corporate recruiters, and university coordinators using Opulent Vidya CareerOS.
            </p>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="testimonial-card text-start h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="testimonial-quote-icon">“</span>
                  <div className="text-warning mb-3">
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                  </div>
                  <p className="text-muted fs-7 mb-4">
                    "Using the AI Resume builder and synced portfolio pipelines, I secured a backend engineering internship at Microsoft within 3 months. Having study logs, class recordings, and my resume compiler in one app was incredibly convenient."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-wrapper">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Student" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Divya Nair</h6>
                    <span className="text-muted fs-8">Student placed at Microsoft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="testimonial-card text-start h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="testimonial-quote-icon">“</span>
                  <div className="text-warning mb-3">
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                  </div>
                  <p className="text-muted fs-7 mb-4">
                    "Finding top-tier candidates usually takes weeks of reading PDFs. With the CareerOS Recruiter dashboard, we search by verified projects and filter for ready-to-join coders immediately. Hire conversion rates increased by 4x."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-wrapper">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Recruiter" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Rohan Malhotra</h6>
                    <span className="text-muted fs-8">Hiring Lead at Google Cloud</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-12">
              <div className="testimonial-card text-start h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="testimonial-quote-icon">“</span>
                  <div className="text-warning mb-3">
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                    <Star size={16} fill="currentColor" className="me-1" />
                  </div>
                  <p className="text-muted fs-7 mb-4">
                    "We migrated our college student management to CareerOS. The platform provides full visibility over cohort assignments, grades, visa applications, and student placement ready states in real-time."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-wrapper">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="Trainer" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Dr. Amit Varma</h6>
                    <span className="text-muted fs-8">Dean, Career Pathways Academy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CALL TO ACTION */}
      <section id="cta" className="section-padding bg-white">
        <div className="container">
          <div className="card border-0 rounded-5 p-5 bg-gradient-ai text-white position-relative overflow-hidden text-center shadow-lg">
            {/* Glow blobs inside card */}
            <div className="glow-blob glow-blue" style={{ top: '-10%', left: '-10%', width: '200px', height: '200px' }}></div>
            <div className="glow-blob glow-purple" style={{ bottom: '-10%', right: '-10%', width: '200px', height: '200px' }}></div>

            <div className="position-relative z-2 py-4">
              <span className="badge bg-white text-primary fw-extrabold mb-3 text-uppercase fs-8 py-1.5 px-3 rounded-5">
                Join Today
              </span>
              <h2 className="display-4 fw-extrabold mb-3 text-white">Start Your Career Journey Today</h2>
              <p className="lead text-white-50 mx-auto mb-4.5" style={{ maxWidth: '620px', fontSize: '1.1rem' }}>
                Join over 10,000+ students, 200+ recruiters, and leading academic institutions. Get started now to transform your learning into high-tier placements.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4 pt-2">
                <button 
                  onClick={() => alert('Welcome to Opulent Vidya CareerOS! Initializing Student onboarding flow...')}
                  className="btn btn-light text-primary fw-extrabold px-4 py-3 rounded-pill d-inline-flex align-items-center gap-2"
                  style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.25)' }}
                >
                  <span>Join as Student</span>
                  <ArrowUpRight size={18} />
                </button>
                <button 
                  onClick={() => alert('Thank you for booking a demo. Our partnership team will contact you in the next 12 hours.')}
                  className="btn btn-outline-light fw-bold px-4 py-3 rounded-pill"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-dark text-white pt-5 pb-4 border-top border-secondary border-opacity-25">
        <div className="container">
          <div className="row g-4 text-start mb-5">
            {/* Column 1: Info */}
            <div className="col-lg-4 col-md-6">
              <a className="navbar-brand d-inline-flex align-items-center mb-3 text-white" href="#hero">
                <span className="bg-primary-subtle text-primary border d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px', borderRadius: '8px' }}>
                  <i className="bi bi-rocket-takeoff-fill" style={{ fontSize: '1rem' }}></i>
                </span>
                <span className="fw-extrabold fs-5 text-gradient">CareerOS</span>
              </a>
              <p className="text-white-50 fs-7 mb-4" style={{ maxWidth: '300px' }}>
                Opulent Vidya CareerOS is the premium student lifecycle infrastructure driving next-gen placement rate optimization.
              </p>
              <div className="d-flex gap-3 fs-5">
                <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-github"></i></a>
                <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            {/* Column 2: Links Product */}
            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="fw-bold mb-3 fs-7 uppercase text-white-50">Platform</h6>
              <ul className="list-unstyled fs-7">
                <li className="mb-2.5"><a href="#features" className="text-white-50 text-decoration-none hover-text-white">Smart LMS</a></li>
                <li className="mb-2.5"><a href="#features" className="text-white-50 text-decoration-none hover-text-white">GitHub Portfolios</a></li>
                <li className="mb-2.5"><a href="#features" className="text-white-50 text-decoration-none hover-text-white">ATS Resumes</a></li>
                <li className="mb-2.5"><a href="#dashboards" className="text-white-50 text-decoration-none hover-text-white">Partner Portals</a></li>
              </ul>
            </div>

            {/* Column 3: Links Resources */}
            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="fw-bold mb-3 fs-7 uppercase text-white-50">Company</h6>
              <ul className="list-unstyled fs-7">
                <li className="mb-2.5"><a href="#" className="text-white-50 text-decoration-none hover-text-white">About Us</a></li>
                <li className="mb-2.5"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Careers</a></li>
                <li className="mb-2.5"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Partner Program</a></li>
                <li className="mb-2.5"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Contact Sales</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="col-lg-4 col-md-6">
              <h6 className="fw-bold mb-3 fs-7 uppercase text-white-50">Newsletter SignUp</h6>
              <p className="text-white-50 fs-7 mb-3">
                Subscribe to get latest updates about tech placements and career advice.
              </p>
              
              <form onSubmit={handleSubscribe} className="input-group mb-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control bg-dark border-secondary text-white fs-7 py-2.5" 
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

          <div className="border-top border-secondary border-opacity-25 pt-4 text-center">
            <span className="text-white-50 fs-8">
              &copy; {new Date().getFullYear()} Opulent Vidya CareerOS. All Rights Reserved. Made with ❤️ in React & Bootstrap.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
