"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SaicereLogo } from "./saicere-logo";

const portfolio = [
  {
    key: "caliIce",
    name: "Cali Ice Protein MX",
    href: "https://www.californiaiceprotein.com.mx/",
    logo: { src: "/portfolio/cali-ice.png", width: 562, height: 304 },
    tint: "from-[#e6f6fa] to-white",
  },
  {
    key: "ikaldata",
    name: "Ikaldata",
    href: "https://ikaldata.com/",
    logo: { src: "/portfolio/ikaldata.png", width: 948, height: 162 },
    tint: "from-[#eaf3e6] to-white",
  },
  {
    key: "blackbox",
    name: "Blackbox",
    href: "https://bboxgym.com/",
    logo: { src: "/portfolio/blackbox.svg", width: 1222, height: 697 },
    tint: "from-[#efefef] to-white",
  },
  {
    key: "elathia",
    name: "Elathia",
    href: null,
    logo: { src: "/isotipo.png", width: 982, height: 917 },
    tint: "from-[#e9edf4] to-white",
  },
] as const;

const i18n = {
  en: {
    nav: { about: "About", portfolio: "Portfolio", values: "Values" },
    hero: {
      eyebrow: "Permanent capital \u00b7 Mexico",
      mission: "Permanent capital for a small number of Mexican businesses.",
      cta: "What Saicere is",
      ctaSecondary: "See the portfolio",
    },
    about: {
      heading: "What Saicere is",
      p1: "Saicere Holdings is a permanent-capital operating company. We take a small number of positions in Mexican businesses, build the ones that need building, and hold the ones that work. No fund, no outside investors, no exit clock.",
      p2: "We back what we understand well enough to run ourselves — and we bring more than money: the capital, the back office, the brand and the software a growing business would otherwise have to build for itself.",
    },
    platform: {
      heading: "The platform.",
      body: "Every business we hold runs on the same foundation: capital that doesn't need to be raised, an administration and finance function that already exists, and software built in-house. It's what lets a small team run something bigger than itself.",
      items: [
        { label: "Capital", detail: "Capital that doesn\u2019t need to be raised." },
        { label: "Operations", detail: "Administration and finance that already exist." },
        { label: "Technology", detail: "Software built in-house." },
      ],
    },
    portfolio: {
      heading: "Portfolio",
      subheading: "Companies we invest in and operate.",
      visit: "Visit site",
      paused: "Paused",
      pausedNote: "Investment \u00b7 currently paused",
      companies: {
        caliIce: "High-protein frozen dessert bars made with Greek yogurt and no added sugar \u2014 now in Mexico.",
        ikaldata: "AI-powered revenue optimization: building and running the commercial engine of growing companies.",
        blackbox: "Functional training gyms built on the BLACK BOX SYSTEM\u00ae, across Mexico and Central America.",
        elathia: "An early-stage investment in the portfolio, on hold while we focus on our active builds.",
      },
    },
    values: {
      purpose: {
        title: "Purpose & Congruence",
        bullets: [
          "Purpose guides every decision. If it doesn\u2019t move us closer, we question it.",
          "What we say, what we value, and what we do must match.",
          "We don\u2019t defer life for later. We build aligned with who we are, starting now.",
        ],
      },
      collab: {
        title: "Collaboration & Connection",
        bullets: [
          "We work together because we want to, not because we have to.",
          "Ego stays at the door. Openness and emotional intelligence keep us connected.",
          "We bring direction, perspective, and space for reflection.",
        ],
      },
      curiosity: {
        title: "Curiosity & Innovation",
        bullets: [
          "We\u2019d rather learn something new than prove we\u2019re right.",
          "Innovation means creating more value \u2014 improving what exists or building what doesn\u2019t.",
          "We think in spectrums, not binaries.",
        ],
      },
      ambition: {
        title: "Ambition & Freedom",
        bullets: [
          "We keep moving. We don\u2019t settle and we don\u2019t coast.",
          "Freedom is choosing how we spend our time \u2014 but it can\u2019t come at someone else\u2019s expense.",
          "We grow in the direction of our shared vision, not just any direction.",
        ],
      },
    },
    work: {
      heading: "How we work",
      body: "One business in active build at a time. We take positions we understand well enough to run, and we don't take a second one until the first can run without us.",
    },
    signIn: "Sign In",
  },
  es: {
    nav: { about: "Nosotros", portfolio: "Portafolio", values: "Valores" },
    hero: {
      eyebrow: "Capital permanente \u00b7 M\u00e9xico",
      mission: "Capital permanente para un n\u00famero reducido de empresas mexicanas.",
      cta: "Qu\u00e9 es Saicere",
      ctaSecondary: "Ver el portafolio",
    },
    about: {
      heading: "Qu\u00e9 es Saicere",
      p1: "Saicere Holdings es una compa\u00f1\u00eda operativa de capital permanente. Tomamos un n\u00famero reducido de posiciones en empresas mexicanas, construimos las que hay que construir y mantenemos las que funcionan. Sin fondo, sin inversionistas externos, sin reloj de salida.",
      p2: "Respaldamos lo que entendemos lo suficiente para operar nosotros mismos \u2014 y aportamos m\u00e1s que dinero: el capital, la administraci\u00f3n, la marca y el software que un negocio en crecimiento tendr\u00eda que construir por su cuenta.",
    },
    platform: {
      heading: "La plataforma.",
      body: "Cada negocio que sostenemos corre sobre la misma base: capital que no necesita levantarse, una funci\u00f3n de administraci\u00f3n y finanzas que ya existe, y software construido internamente. Es lo que permite que un equipo peque\u00f1o opere algo m\u00e1s grande que \u00e9l mismo.",
      items: [
        { label: "Capital", detail: "Capital que no necesita levantarse." },
        { label: "Operaciones", detail: "Administraci\u00f3n y finanzas que ya existen." },
        { label: "Tecnolog\u00eda", detail: "Software construido internamente." },
      ],
    },
    portfolio: {
      heading: "Portafolio",
      subheading: "Empresas en las que invertimos y que operamos.",
      visit: "Visitar sitio",
      paused: "En pausa",
      pausedNote: "Inversi\u00f3n \u00b7 actualmente en pausa",
      companies: {
        caliIce: "Paletas heladas altas en prote\u00edna, hechas con yogur griego y sin az\u00facar a\u00f1adida \u2014 ahora en M\u00e9xico.",
        ikaldata: "Optimizaci\u00f3n de ingresos con IA: construye y opera el motor comercial de empresas en crecimiento.",
        blackbox: "Gimnasios de entrenamiento funcional basados en el BLACK BOX SYSTEM\u00ae, en M\u00e9xico y Centroam\u00e9rica.",
        elathia: "Una inversi\u00f3n en etapa temprana del portafolio, en pausa mientras nos enfocamos en los proyectos activos.",
      },
    },
    values: {
      purpose: {
        title: "Prop\u00f3sito y Congruencia",
        bullets: [
          "El prop\u00f3sito gu\u00eda cada decisi\u00f3n. Si no nos acerca, lo cuestionamos.",
          "Lo que decimos, lo que valoramos y lo que hacemos tiene que coincidir.",
          "No diferimos la vida para despu\u00e9s. Construimos alineados con quienes somos, desde hoy.",
        ],
      },
      collab: {
        title: "Colaboraci\u00f3n y Conexi\u00f3n",
        bullets: [
          "Trabajamos juntos porque queremos, no porque debemos.",
          "El ego se queda en la puerta. La apertura y la inteligencia emocional nos mantienen conectados.",
          "Aportamos direcci\u00f3n, perspectiva y espacio para la reflexi\u00f3n.",
        ],
      },
      curiosity: {
        title: "Curiosidad e Innovaci\u00f3n",
        bullets: [
          "Preferimos aprender algo nuevo que demostrar que tenemos raz\u00f3n.",
          "Innovar es crear m\u00e1s valor \u2014 mejorar lo que existe o construir lo que no.",
          "Pensamos en espectros, no en binarios.",
        ],
      },
      ambition: {
        title: "Ambici\u00f3n y Libertad",
        bullets: [
          "Seguimos avanzando. No nos conformamos ni nos estancamos.",
          "Libertad es decidir c\u00f3mo usamos nuestro tiempo \u2014 pero no puede ser a costa de otros.",
          "Crecemos en la direcci\u00f3n de nuestra visi\u00f3n compartida, no en cualquier direcci\u00f3n.",
        ],
      },
    },
    work: {
      heading: "C\u00f3mo trabajamos",
      body: "Un negocio en construcci\u00f3n activa a la vez. Tomamos posiciones que entendemos lo suficiente para operar, y no tomamos una segunda hasta que la primera pueda correr sin nosotros.",
    },
    signIn: "Iniciar Sesi\u00f3n",
  },
} as const;

type Lang = keyof typeof i18n;

const valueKeys = ["purpose", "collab", "curiosity", "ambition"] as const;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, revealed } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal-section ${revealed ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const t = i18n[lang];
  const toggleLang = useCallback(
    () => setLang((l) => (l === "en" ? "es" : "en")),
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes hero-soft-focus {
          from { opacity: 0; filter: blur(8px); transform: translateY(8px); }
          to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
        }
        @keyframes hero-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(24px, -18px) scale(1.06); }
        }
        .hero-eyebrow { animation: hero-soft-focus 800ms cubic-bezier(0.22, 1, 0.36, 1) 0ms both; }
        .hero-wordmark { animation: hero-soft-focus 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both; }
        .hero-mission { animation: hero-soft-focus 900ms cubic-bezier(0.22, 1, 0.36, 1) 450ms both; }
        .hero-cta { animation: hero-soft-focus 700ms cubic-bezier(0.22, 1, 0.36, 1) 800ms both; }
        .hero-blob { animation: hero-drift 14s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-eyebrow,
          .hero-wordmark,
          .hero-mission,
          .hero-cta,
          .hero-blob { animation: none; }
        }
      `}</style>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-forest/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#top"
            aria-label="Saicere"
            className={`block transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <SaicereLogo className="h-9 w-auto" />
          </a>
          <div className="flex items-center gap-1 md:gap-2">
            <a href="#what-saicere-is" className="hidden md:inline-block px-3 py-2 text-sm text-ink/70 hover:text-forest transition-colors">
              {t.nav.about}
            </a>
            <a href="#portfolio" className="hidden md:inline-block px-3 py-2 text-sm text-ink/70 hover:text-forest transition-colors">
              {t.nav.portfolio}
            </a>
            <a href="#values" className="hidden md:inline-block px-3 py-2 text-sm text-ink/70 hover:text-forest transition-colors">
              {t.nav.values}
            </a>
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-1.5 text-xs font-medium tracking-wide text-forest border border-forest/20 rounded-full hover:border-forest/50 transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <Link
              href="/sign-in"
              className="ml-1 px-4 py-1.5 text-sm font-medium text-white bg-forest rounded-full hover:bg-forest/90 transition-colors"
            >
              {t.signIn}
            </Link>
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-mist/50 via-white to-white"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="hero-blob absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-sage/30 blur-3xl" />
          <div className="hero-blob absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-gold/20 blur-3xl [animation-delay:-6s]" />
          <div className="hero-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-mist/70 blur-3xl [animation-delay:-3s]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-forest backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {t.hero.eyebrow}
          </span>
          <SaicereLogo className="hero-wordmark mx-auto mt-10 w-full max-w-xl md:max-w-3xl h-auto" />
          <p className="hero-mission mt-10 text-xl md:text-2xl text-ink/80 font-light leading-relaxed max-w-2xl mx-auto">
            {t.hero.mission}
          </p>
          <div className="hero-cta mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#what-saicere-is"
              className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3 text-sm font-medium rounded-full shadow-lg shadow-gold/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30 transition-all"
            >
              {t.hero.cta}
              <span aria-hidden>{"\u2193"}</span>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-forest rounded-full border border-forest/20 bg-white/60 backdrop-blur hover:border-forest/50 transition-colors"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <section id="what-saicere-is" className="scroll-mt-16 py-28 md:py-36 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <RevealSection>
            <SectionLabel>{t.about.heading}</SectionLabel>
          </RevealSection>
          <div>
            <RevealSection delay={100}>
              <p className="text-xl md:text-2xl text-ink font-light leading-relaxed">
                {t.about.p1}
              </p>
            </RevealSection>
            <RevealSection delay={200}>
              <p className="mt-8 text-lg md:text-xl text-ink/70 font-light leading-relaxed">
                {t.about.p2}
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 px-6 bg-gradient-to-b from-mist/40 to-mist/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
            <RevealSection>
              <SectionLabel>{t.platform.heading}</SectionLabel>
            </RevealSection>
            <RevealSection delay={100}>
              <p className="text-lg md:text-xl text-ink/80 font-light leading-relaxed">
                {t.platform.body}
              </p>
            </RevealSection>
          </div>
          <div className="mt-16 grid sm:grid-cols-3 gap-4 md:gap-6">
            {t.platform.items.map((item, i) => (
              <RevealSection key={item.label} delay={150 + i * 100}>
                <div className="group h-full rounded-2xl bg-white p-7 border border-forest/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <span className="text-sm font-medium text-gold tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-medium text-forest">{item.label}</h3>
                  <p className="mt-2 text-sm text-ink/60 leading-relaxed">{item.detail}</p>
                  <div className="mt-6 h-0.5 w-8 rounded-full bg-sage transition-all group-hover:w-16 group-hover:bg-gold" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="scroll-mt-16 py-28 md:py-36 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <SectionLabel>{t.portfolio.heading}</SectionLabel>
            <p className="mt-6 text-3xl md:text-4xl font-light tracking-tight text-ink max-w-2xl">
              {t.portfolio.subheading}
            </p>
          </RevealSection>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {portfolio.map((company, i) => {
              const body = (
                <>
                  <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${company.tint} px-10`}>
                    {!company.href && (
                      <span className="absolute top-4 right-4 rounded-full border border-ink/10 bg-white/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink/60">
                        {t.portfolio.paused}
                      </span>
                    )}
                    <Image
                      src={company.logo.src}
                      alt={company.name}
                      width={company.logo.width}
                      height={company.logo.height}
                      unoptimized={company.logo.src.endsWith(".svg")}
                      className={`max-h-24 w-auto max-w-full object-contain transition-transform duration-500 ${
                        company.href ? "group-hover:scale-105" : "opacity-70"
                      }`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg font-medium text-forest">{company.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink/60 leading-relaxed">
                      {t.portfolio.companies[company.key]}
                    </p>
                    {company.href ? (
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-gold transition-colors">
                        {t.portfolio.visit}
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          {"\u2197"}
                        </span>
                      </span>
                    ) : (
                      <span className="mt-6 text-sm text-ink/40">{t.portfolio.pausedNote}</span>
                    )}
                  </div>
                </>
              );
              const cardClass =
                "group flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm transition-all";
              return (
                <RevealSection key={company.key} delay={100 + i * 100}>
                  {company.href ? (
                    <a
                      href={company.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardClass} hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      <section id="values" className="relative scroll-mt-16 overflow-hidden py-36 md:py-44 px-6 bg-forest">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-sage/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <RevealSection>
            <p className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-center leading-tight">
              <span className="text-white">Why</span>
              <span className="text-gold mx-3 md:mx-5">{"\u2192"}</span>
              <span className="text-white">What if</span>
              <span className="text-gold mx-3 md:mx-5">{"\u2192"}</span>
              <span className="text-white">How</span>
            </p>
          </RevealSection>
          <div className="mt-20 md:mt-24 grid md:grid-cols-2 gap-5 md:gap-6">
            {valueKeys.map((key, i) => (
              <RevealSection key={key} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
                  <h3 className="flex items-center gap-3 text-lg font-medium text-gold mb-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {t.values[key].title}
                  </h3>
                  <ul className="space-y-3">
                    {t.values[key].bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-mist/90 font-light leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <RevealSection>
            <SectionLabel>{t.work.heading}</SectionLabel>
          </RevealSection>
          <RevealSection delay={100}>
            <p className="border-l-2 border-gold pl-6 md:pl-8 text-xl md:text-2xl text-ink font-light leading-relaxed">
              {t.work.body}
            </p>
          </RevealSection>
        </div>
      </section>

      <footer className="py-14 px-6 bg-ink">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <SaicereLogo variant="white" className="h-10 w-auto" />
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-medium text-mist border border-white/20 rounded-full hover:border-white/50 transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <Link
              href="/sign-in"
              className="px-4 py-1.5 text-sm text-white border border-white/20 rounded-full hover:border-white/50 transition-colors"
            >
              {t.signIn}
            </Link>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-10 text-xs text-white/40 text-center md:text-left">
          {"\u00a9"} {new Date().getFullYear()} Saicere Holdings
        </p>
      </footer>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-forest">
      <span className="h-px w-8 bg-gold" />
      {children}
    </h2>
  );
}
