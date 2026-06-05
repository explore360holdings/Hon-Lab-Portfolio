import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Anchor,
  Award,
  Briefcase,
  ChevronDown,
  ChevronUp,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  MapPin,
  Menu,
  Phone,
  Ship,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';

/* ─── DATA ─── */

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

const timelineEvents = [
  {
    year: '2011',
    title: 'Elected to Lagos State House of Assembly',
    desc: 'Represented Ajeromi–Ifelodun Constituency 02; served on House Standing Committees on Finance, Environment, Agriculture & Rural Development.',
  },
  {
    year: '2014',
    title: 'Drafted the "Lagos Position"',
    desc: 'Key member of the Ad-hoc Committee for Constitutional Amendments that produced the landmark Lagos Position document.',
  },
  {
    year: '2015',
    title: 'Health Insurance Bill',
    desc: 'Lead sponsor of the iconic Health Insurance Bill, which established the Lagos State Health Management Agency (LASHEMA).',
  },
  {
    year: '2019',
    title: 'Appointed MD/CEO of LAGFERRY',
    desc: 'Lagos State Governor Babajide Sanwo-Olu appointed Hon. Balogun as Managing Director of Lagos Ferry Services Company.',
  },
  {
    year: '2020–2026',
    title: 'Transforming Water Transport in Lagos',
    desc: 'LAGFERRY ferried over 4.4 million passengers and pioneered the "Watermania Lifestyle" – launching electric-powered boats for sustainable transport.',
  },
];

const achievements = [
  {
    icon: <FileText className="w-7 h-7" />,
    title: 'Health Insurance Bill',
    desc: 'Lead sponsor of the landmark bill that birthed LASHEMA — Lagos State Health Management Agency.',
  },
  {
    icon: <Landmark className="w-7 h-7" />,
    title: 'Lagos Position',
    desc: 'Member of the Ad-hoc Committee that drafted the iconic constitutional amendment document.',
  },
  {
    icon: <Ship className="w-7 h-7" />,
    title: 'Water Transport Revolution',
    desc: 'Pioneered the "Watermania Lifestyle" with 4.4M+ passengers ferried since 2020 and electric boats planned for 2026.',
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: 'Corporate Turnaround Expert',
    desc: 'Proven ability to revitalize organizations, initiate company-wide campaigns, and capture untapped growth opportunities.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'LEG Lagos Challenge',
    desc: 'Organizer of the annual Festival of Football Academies — LEG Lagos Challenge, promoting sports development.',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Blue Economy Visionary',
    desc: 'Driving Lagos to harness its waterways for economic growth aligned with the global $1.5 trillion blue economy.',
  },
];

const educationItems = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    degree: 'B.Sc. (Hons) Economics',
    institution: 'Lagos State University (LASU)',
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    degree: 'Postgraduate Diploma in Marketing',
    institution: 'International Academy of Marketing',
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    degree: 'Masters in Business Administration',
    institution: 'Lagos State University (LASU)',
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    degree: 'MBA in Leadership & Sustainability',
    institution: 'Robert Kennedy College, University of Cumbria, UK',
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    degree: 'Entrepreneurship Programme',
    institution: 'FATE Foundation School of Entrepreneurship',
  },
];

const professionalBodies = [
  'Fellow Member, Institute of Chartered Economists of Nigeria (FCE)',
  'Chartered Marketer, National Institute of Marketing of Nigeria (CNIM)',
  'Professional Member, Certified Marketing Communication Institute of Nigeria',
  'Professional Member, Global Marketing Network, United Kingdom',
  'Alumnus, Judge Business School, University of Cambridge',
];

const leadershipRoles = [
  {
    role: 'Managing Director / CEO',
    org: 'LAGFERRY – Lagos Ferry Services Company',
    icon: <Anchor className="w-5 h-5" />,
  },
  {
    role: 'Honourable Member',
    org: 'Lagos State House of Assembly (2011–2015)',
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    role: 'Founding Director',
    org: 'The Economic Club, Nigeria',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    role: 'Co-Founder',
    org: 'Legislative Advocacy and Impact Faculty',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    role: 'President',
    org: 'BAQI Foundation (NGO)',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    role: 'Vice President',
    org: 'FATE Foundation Alumni Association',
    icon: <Users className="w-5 h-5" />,
  },
  {
    role: 'Board Member',
    org: 'Lagos State Boxing Association',
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    role: 'Chief Organizer',
    org: 'LEG Lagos Challenge – Festival of Football Academies',
    icon: <Home className="w-5 h-5" />,
  },
];

/* ─── HOOKS ─── */

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}

function useInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ─── ANIMATION VARIANTS ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── SECTION HELPER ─── */

function Section({
  id, children, bg = 'white',
}: {
  id?: string; children: React.ReactNode; bg?: string;
}) {
  const ref = useInView as any;
  const sectionRef = useInView(ref);
  return (
    <section id={id} className={`py-20 md:py-28 ${bg === 'dark' ? 'bg-slate-900 text-white' : bg === 'slate' ? 'bg-slate-50 text-slate-800' : 'bg-white text-slate-800'}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={ref as any}
          initial="hidden"
          animate={sectionRef ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ children, subtitle, light = false }: { children: React.ReactNode; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-14 text-center">
      <motion.h2 variants={fadeUp} className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-playfair ${light ? 'text-white' : 'text-slate-900'}`}>
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className={`mt-4 max-w-2xl mx-auto text-lg ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          {subtitle}
        </motion.p>
      )}
      <motion.div variants={fadeUp} className={`mt-6 mx-auto h-1 w-20 rounded-full ${light ? 'bg-amber-400' : 'bg-amber-600'}`} />
    </div>
  );
}

/* ─── NAVBAR ─── */

function Navbar() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const solid = scrollY > 80;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/95 backdrop-blur shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#home" className={`font-playfair text-xl font-bold tracking-tight transition-colors ${solid ? 'text-slate-900' : 'text-white'}`}>
          Hon. Balogun<span className="text-amber-500">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  solid ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${solid ? 'text-slate-900' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${solid ? 'text-slate-900' : 'text-white'}`} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t shadow-xl"
          >
            <ul className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-slate-700 font-medium hover:text-amber-600"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── HERO ─── */

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Lagos Waterways"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-4 py-32 sm:px-6 lg:flex-row lg:gap-16">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold tracking-widest text-amber-400 uppercase border border-amber-500/30"
          >
            Managing Director & CEO
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Honourable <br />
            <span className="text-amber-400">Abdoulbaq</span>
            <br />
            Ladi Balogun
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed text-slate-300"
          >
            A strategic, results-oriented leader transforming water transportation in Lagos
            and driving the Blue Economy vision forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#about"
              className="rounded-lg bg-amber-500 px-8 py-3.5 font-semibold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 hover:shadow-xl"
            >
              Discover More
            </a>
            <a
              href="#achievements"
              className="rounded-lg border border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Key Achievements
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex-shrink-0"
        >
          <div className="relative h-72 w-60 overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/20 sm:h-96 sm:w-80">
            <img
              src="/images/profile.jpg"
              alt="Hon. Abdoulbaq Ladi Balogun"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </div>
          {/* Decorative */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-xl bg-amber-500/30 blur-xl" />
          <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-blue-500/20 blur-xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center text-white/60 hover:text-amber-400 transition">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

/* ─── ABOUT ─── */

function About() {
  return (
    <Section id="about" bg="white">
      <SectionTitle subtitle="A visionary leader with rich experience in public service, business, and community development.">
        About Hon. Balogun
      </SectionTitle>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <motion.div variants={fadeUp} className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/office.jpg"
              alt="Executive Office"
              className="h-80 w-full object-cover md:h-96"
            />
          </div>
          {/* Stats card */}
          <div className="absolute -bottom-6 -right-4 rounded-xl bg-slate-900 p-5 shadow-xl sm:-right-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full bg-amber-500/30 ring-2 ring-slate-900 flex items-center justify-center text-lg">
                    {['⚓', '🏛️', '⚡'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-lg">15+ Years</p>
                <p className="text-slate-400 text-sm">of Impactful Leadership</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={fadeUp} className="space-y-5">
          <p className="text-lg leading-relaxed text-slate-600">
            A native of Ilorin, Kwara State, born in Ajegunle, Ajeromi Ifelodun Local Government Area
            of Lagos State. Hon. Balogun is a strategic, articulate and multi-faceted Public Servant
            with a proven ability to revitalize organizations, initiate company-wide campaigns, and
            capture untapped opportunities for growth.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            Astute and full of integrity; leveraging technical, business and financial acumen to
            increase sales and grow bottom line while spearheading operational improvements to drive
            productivity and reduce costs. He has demonstrated proven skills and expertise in turning
            around lagging operations and preparing companies for fast growth and profitability.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            Customer-focused, creative problem-solver and change consultant with team leadership
            attributes, and multi-cultural relationship-building skills.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { label: 'Passengers Ferried', value: '4.4M+' },
              { label: 'Professional Bodies', value: '4+' },
              { label: 'Years in Public Service', value: '15+' },
              { label: 'Organizations Led', value: '6+' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-2xl font-bold text-amber-600 font-playfair">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── EDUCATION ─── */

function Education() {
  return (
    <Section id="education" bg="slate">
      <SectionTitle subtitle="Academic credentials and professional affiliations that define excellence.">
        Education & Qualifications
      </SectionTitle>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Degrees */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-6">
            <GraduationCap className="w-6 h-6 text-amber-600" />
            Academic Degrees
          </h3>
          {educationItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm border border-slate-100 transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex-shrink-0 rounded-lg bg-amber-50 p-3 text-amber-600">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{item.degree}</p>
                <p className="text-sm text-slate-500 mt-0.5">{item.institution}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Bodies */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-6">
            <Award className="w-6 h-6 text-amber-600" />
            Professional Memberships
          </h3>
          {professionalBodies.map((body, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm border border-slate-100 transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex-shrink-0 mt-1 rounded-full bg-green-100 p-1.5">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-slate-700 leading-snug">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── ACHIEVEMENTS ─── */

function Achievements() {
  return (
    <Section id="achievements" bg="dark">
      <SectionTitle subtitle="Defining moments and transformative contributions in public service and business." light>
        Key Achievements
      </SectionTitle>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="group rounded-2xl bg-white/5 border border-white/10 p-8 transition-all hover:bg-white/10 hover:border-amber-500/30"
          >
            <div className="mb-5 inline-flex rounded-xl bg-amber-500/20 p-3 text-amber-400 transition group-hover:bg-amber-500/30">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── TIMELINE ─── */

function Timeline() {
  return (
    <Section id="timeline" bg="white">
      <SectionTitle subtitle="A journey of leadership, service, and transformation.">
        Career Milestones
      </SectionTitle>

      <div className="relative mx-auto max-w-3xl">
        {/* Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 md:left-1/2 md:-translate-x-px" />

        {timelineEvents.map((evt, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Dot */}
            <div className="absolute left-6 md:left-1/2 w-3 h-3 -translate-x-1.5 md:-translate-x-1.5 mt-1.5 rounded-full bg-amber-500 ring-4 ring-amber-100 z-10" />

            {/* Content */}
            <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 mb-2">
                {evt.year}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
              <p className="mt-2 text-slate-500 leading-relaxed">{evt.desc}</p>
            </div>

            {/* Spacer for alternating */}
            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── LEADERSHIP ─── */

function Leadership() {
  return (
    <Section id="leadership" bg="slate">
      <SectionTitle subtitle="Roles that demonstrate a commitment to governance, entrepreneurship, and community.">
        Leadership & Community
      </SectionTitle>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {leadershipRoles.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-lg"
          >
            <div className="absolute top-0 right-0 h-20 w-20 -mr-6 -mt-6 rounded-full bg-amber-50 transition group-hover:bg-amber-100" />
            <div className="relative">
              <div className="mb-4 inline-flex rounded-xl bg-amber-50 p-3 text-amber-600">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{item.role}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── LEGISLATIVE ─── */

function Legislative() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const items = [
    {
      q: 'What was Hon. Balogun\'s role in the Lagos State House of Assembly?',
      a: 'Hon. Balogun was elected as an Honourable Member of Parliament to represent Ajeromi–Ifelodun Constituency 02 in 2011. He served on the House Standing Committees on Finance, Environment, Agriculture, and Rural Development. He was also a member of the Ad-hoc Committee for Constitutional Amendments which drafted the famous "Lagos Position" in 2014.',
    },
    {
      q: 'What is the Health Insurance Bill he sponsored?',
      a: 'As a performing legislator, Hon. Balogun was the lead sponsor of the iconic Health Insurance Bill, fashioned after the famous Obamacare, which gave birth to the Lagos State Health Management Agency (LASHEMA). This landmark legislation has provided health coverage to millions of Lagosians.',
    },
    {
      q: 'What is the "Lagos Position"?',
      a: 'The Lagos Position is a landmark constitutional amendment document drafted by the Ad-hoc Committee for Constitutional Amendments, of which Hon. Balogun was a key member. It articulated Lagos State\'s position on constitutional reforms and has been widely referenced in national debates.',
    },
    {
      q: 'What are his contributions to sports in Lagos?',
      a: 'As a Sports Enthusiast and Promoter, Hon. Balogun organizes the successful annual Festival of Football Academies — LEG LAGOS CHALLENGE and sits on the board of the Lagos State Boxing Association, contributing to the development of sports talent in Lagos.',
    },
  ];

  return (
    <Section id="legislative" bg="white">
      <SectionTitle subtitle="Insights into his legislative work, achievements, and vision for Lagos.">
        Frequently Asked Questions
      </SectionTitle>

      <div className="mx-auto max-w-3xl space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-xl border border-slate-200 overflow-hidden transition hover:border-amber-300"
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
              {expanded === i ? (
                <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── QUOTE BANNER ─── */

function QuoteBanner() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-amber-500 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-blue-400 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Ship className="mx-auto w-12 h-12 text-amber-400 mb-6" />
          <blockquote className="font-playfair text-2xl md:text-4xl italic text-white leading-relaxed">
            "Lagos, as a coastal state in Nigeria, has the potential to leverage its maritime resources
            to benefit greatly from the potentials of the blue economy."
          </blockquote>
          <div className="mt-8">
            <p className="text-amber-400 font-semibold">Hon. Abdoulbaq Ladi Balogun</p>
            <p className="text-slate-400 text-sm mt-1">Managing Director, LAGFERRY</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CONTACT / FOOTER ─── */

function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400">
      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-10 md:p-14 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900">
            Ready to Collaborate?
          </h2>
          <p className="mt-4 text-slate-800 max-w-xl mx-auto text-lg">
            For business inquiries, partnerships, or media engagement with LAGFERRY.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:md@lagferry.gov.ng"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <Phone className="w-4 h-4" />
              Contact LAGFERRY
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-900 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-900/10"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-playfair text-xl font-bold text-white">
                Hon. Abdoulbaq Ladi Balogun
              </p>
              <p className="text-sm mt-1">Managing Director / CEO, LAGFERRY</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <MapPin className="w-4 h-4 text-amber-500" />
                Lagos Ferry Services, Lagos, Nigeria
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#home" className="hover:text-amber-400 transition">Home</a>
              <a href="#about" className="hover:text-amber-400 transition">About</a>
              <a href="#achievements" className="hover:text-amber-400 transition">Achievements</a>
              <a href="#leadership" className="hover:text-amber-400 transition">Leadership</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Hon. Abdoulbaq Ladi Balogun. All rights reserved.</p>
            <p className="mt-1">Lagos Ferry Services Company — Pioneering the Blue Economy.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */

export default function App() {
  return (
    <div className="font-inter antialiased bg-white">
      <style>{`
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-inter { font-family: 'Inter', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Achievements />
      <Timeline />
      <QuoteBanner />
      <Leadership />
      <Legislative />
      <Footer />
    </div>
  );
}
