"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const i18n = {
  en: {
    hero: {
      mission: "Permanent capital for a small number of Mexican businesses.",
      cta: "What Saicere is",
    },
    about: {
      heading: "What Saicere is",
      p1: "Saicere Holdings is a permanent-capital operating company. We take a small number of positions in Mexican businesses, build the ones that need building, and hold the ones that work. No fund, no outside investors, no exit clock.",
      p2: "We back what we understand well enough to run ourselves — and we bring more than money: the capital, the back office, the brand and the software a growing business would otherwise have to build for itself.",
    },
    platform: {
      heading: "The platform.",
      body: "Every business we hold runs on the same foundation: capital that doesn't need to be raised, an administration and finance function that already exists, and software built in-house. It's what lets a small team run something bigger than itself.",
      items: ["capital", "operations", "technology"] as const,
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
    hero: {
      mission: "Capital permanente para un n\u00famero reducido de empresas mexicanas.",
      cta: "Qu\u00e9 es Saicere",
    },
    about: {
      heading: "Qu\u00e9 es Saicere",
      p1: "Saicere Holdings es una compa\u00f1\u00eda operativa de capital permanente. Tomamos un n\u00famero reducido de posiciones en empresas mexicanas, construimos las que hay que construir y mantenemos las que funcionan. Sin fondo, sin inversionistas externos, sin reloj de salida.",
      p2: "Respaldamos lo que entendemos lo suficiente para operar nosotros mismos \u2014 y aportamos m\u00e1s que dinero: el capital, la administraci\u00f3n, la marca y el software que un negocio en crecimiento tendr\u00eda que construir por su cuenta.",
    },
    platform: {
      heading: "La plataforma.",
      body: "Cada negocio que sostenemos corre sobre la misma base: capital que no necesita levantarse, una funci\u00f3n de administraci\u00f3n y finanzas que ya existe, y software construido internamente. Es lo que permite que un equipo peque\u00f1o opere algo m\u00e1s grande que \u00e9l mismo.",
      items: ["capital", "operaciones", "tecnolog\u00eda"] as const,
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
  const t = i18n[lang];
  const toggleLang = useCallback(
    () => setLang((l) => (l === "en" ? "es" : "en")),
    [],
  );

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
        .hero-wordmark {
          animation: hero-soft-focus 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
        }
        .hero-mission {
          animation: hero-soft-focus 900ms cubic-bezier(0.22, 1, 0.36, 1) 500ms both;
        }
        .hero-cta {
          animation: hero-soft-focus 700ms cubic-bezier(0.22, 1, 0.36, 1) 900ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-wordmark,
          .hero-mission,
          .hero-cta { animation: none; }
        }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Image
            src="/logo-saicere-white.png"
            alt="Saicere"
            width={570}
            height={172}
            priority
            className="hero-wordmark mx-auto w-full max-w-xl md:max-w-2xl h-auto"
          />
          <p className="hero-mission mt-8 text-lg md:text-xl text-mist font-light leading-relaxed max-w-2xl mx-auto">
            {t.hero.mission}
          </p>
          <div className="hero-cta mt-10">
            <a
              href="#what-saicere-is"
              className="inline-block bg-gold text-ink px-6 py-2.5 text-sm font-medium rounded-md"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </section>

      <section id="what-saicere-is" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <h2 className="text-lg md:text-xl font-medium text-forest mb-10">
              {t.about.heading}
            </h2>
          </RevealSection>
          <RevealSection delay={100}>
            <p className="text-lg md:text-xl text-ink font-light leading-relaxed">
              {t.about.p1}
            </p>
          </RevealSection>
          <RevealSection delay={200}>
            <p className="mt-8 text-lg md:text-xl text-ink font-light leading-relaxed">
              {t.about.p2}
            </p>
          </RevealSection>
        </div>
      </section>

      <section className="py-32 px-6 bg-mist">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <h2 className="text-lg md:text-xl font-medium text-forest mb-10">
              {t.platform.heading}
            </h2>
          </RevealSection>
          <RevealSection delay={100}>
            <p className="text-lg md:text-xl text-ink font-light leading-relaxed">
              {t.platform.body}
            </p>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="mt-16 flex items-stretch justify-center">
              {t.platform.items.map((label, i) => (
                <div key={label} className="flex items-stretch">
                  {i > 0 && <div className="w-px bg-sage mx-6 md:mx-10 self-stretch" />}
                  <span className="text-xs uppercase tracking-[0.25em] text-ink py-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-40 md:py-48 px-6 bg-ink">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <p className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-center leading-tight">
              <span className="text-gold">Why</span>
              <span className="text-sage mx-3 md:mx-5">{"\u2192"}</span>
              <span className="text-gold">What if</span>
              <span className="text-sage mx-3 md:mx-5">{"\u2192"}</span>
              <span className="text-gold">How</span>
            </p>
          </RevealSection>
          <div className="mt-24 md:mt-32 grid md:grid-cols-2 gap-x-16 gap-y-20">
            {valueKeys.map((key, i) => (
              <RevealSection key={key} delay={i * 100}>
                <h3 className="text-lg font-medium text-gold mb-5">
                  {t.values[key].title}
                </h3>
                <ul className="space-y-3">
                  {t.values[key].bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm text-mist font-light leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <h2 className="text-lg md:text-xl font-medium text-forest mb-10">
              {t.work.heading}
            </h2>
          </RevealSection>
          <RevealSection delay={100}>
            <p className="text-lg md:text-xl text-ink font-light leading-relaxed">
              {t.work.body}
            </p>
          </RevealSection>
        </div>
      </section>

      <footer className="py-16 px-6 bg-forest">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white">Saicere Holdings</p>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-sm text-mist border border-white/30 rounded-md cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <Link
              href="/sign-in"
              className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-md"
            >
              {t.signIn}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
