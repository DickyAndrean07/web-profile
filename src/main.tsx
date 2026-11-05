import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

function Preloader({ onFinish }: { onFinish: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const finish = useRef(onFinish);
  finish.current = onFinish;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || sessionStorage.getItem('dicky-intro-seen')) {
      finish.current();
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('dicky-intro-seen', '1');
          finish.current();
        },
      });
      tl.fromTo('.preloader-wash', { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 0.35, ease: 'power2.out' })
        .fromTo('.sketch-line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, stagger: 0.045, ease: 'power1.inOut' }, '-=0.04')
        .fromTo('.flow-dot', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.18, stagger: 0.1, ease: 'back.out(2)' }, '-=0.05')
        .fromTo('.preloader-word', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.34, ease: 'power3.out' }, '-=0.04')
        .to('.preloader-panel', { yPercent: -100, duration: 0.48, ease: 'power3.inOut', delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);

  const skip = () => {
    sessionStorage.setItem('dicky-intro-seen', '1');
    gsap.killTweensOf('.preloader-panel');
    gsap.to('.preloader-panel', { yPercent: -100, duration: 0.24, onComplete: finish.current });
  };

  return <div ref={root} className="preloader-panel" aria-label="Intro DICKY" role="status">
    <div className="preloader-wash" />
    <button className="skip-intro" onClick={skip} type="button">Lewati intro</button>
    <div className="preloader-art" aria-hidden="true">
      <svg viewBox="0 0 520 290" className="preloader-sketch">
        <path className="sketch-line" pathLength="1" d="M60 34h400v222H60z M60 72h400 M84 52h15m12 0h15m12 0h15 M92 101h135v16H92z M92 132h100 M92 145h125 M92 158h105 M257 101h170v112H257z M274 124h112m-112 18h90m-90 18h105 M92 190h335" />
        <path className="sketch-line" pathLength="1" d="M26 149h63m138-40 28 0m170 57h42" strokeDasharray="1" />
        <circle className="flow-dot" cx="27" cy="149" r="7" /><circle className="flow-dot" cx="241" cy="109" r="7" /><circle className="flow-dot" cx="467" cy="166" r="7" />
      </svg>
      <div className="preloader-word">DICKY</div>
    </div>
    <span className="intro-note">Rangka ide, jadi pengalaman.</span>
  </div>;
}

function WebsiteMini() {
  return <div className="mini-browser" aria-hidden="true"><div className="mini-top"><i /><i /><i /><span>ruang.web</span></div><div className="mini-body"><small>PORTAL INFORMASI DESA</small><b>Ruang untuk<br />cerita lokal.</b><div className="mini-lines"><i /><i /><i /></div><div className="mini-visual"><span>DESA<br />BENDUNG</span><b>01</b></div></div></div>;
}
function FlowMini() {
  return <div className="flow-mini" aria-hidden="true"><div className="flow-step trigger"><span>01</span><b>Form masuk</b><small>data baru</small></div><div className="flow-connector"><i /><i /><i /></div><div className="flow-step process"><span>02</span><b>AI merapikan</b><small>teks terstruktur</small></div><div className="flow-connector"><i /><i /><i /></div><div className="flow-step result"><span>03</span><b>Siap ditinjau</b><small>oleh manusia</small></div></div>;
}
function OfficeMini() {
  return <div className="office-mini" aria-hidden="true"><div className="office-ceiling" /><div className="office-window"><i /><i /><i /></div><div className="office-desk"><span /><b /><i /></div><div className="office-label">RUANG KERJA DIGITAL</div></div>;
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setIntroDone(true); return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: introDone ? 0 : 0.08 });
      tl.fromTo('.hero-copy > *', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.11, ease: 'power3.out' })
        .fromTo('.float-card', { y: 42, opacity: 0, rotateX: 9 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.55');
      gsap.to('.website-card', { y: -9, rotateZ: -1.5, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.flow-card', { y: 10, rotateZ: 1.3, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
      gsap.to('.office-card', { y: -7, rotateZ: 1.6, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }, heroRef);
    const revealCtx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });
    }, document);
    return () => { ctx.revert(); revealCtx.revert(); };
  }, [introDone]);

  return <>
    {!introDone && <Preloader onFinish={() => setIntroDone(true)} />}
    <header className="site-header">
      <a className="brand" href="#top" aria-label="DICKY, ke atas">DICKY<span className="brand-period">.</span></a>
      <nav aria-label="Navigasi utama"><a href="#tentang">Tentang</a><a href="#proyek">Proyek</a><a href="#layanan">Layanan</a><a href="#kontak">Kontak</a></nav>
      <a className="header-note" href="#kontak">Terbuka untuk kolaborasi <span>↗</span></a>
    </header>
    <main>
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-copy">
          <p className="hero-kicker">Mahasiswa Informatika · Web & automasi</p>
          <h1>Membangun web.<br /><em>Merangkai</em> automasi.</h1>
          <p className="hero-intro">Saya Dicky, mahasiswa Teknik Informatika yang sedang mengembangkan proyek dan kemampuan di web development serta automasi AI.</p>
          <div className="hero-actions"><a className="button button-primary" href="#proyek">Lihat proyek</a><a className="button button-quiet" href="#kontak">Hubungi saya</a></div>
        </div>
        <div className="hero-stage" aria-label="Cuplikan minat dan proyek Dicky">
          <article className="float-card website-card"><span className="card-index">WEB / 01</span><WebsiteMini /><p>Portal informasi<br />Desa Bendung</p></article>
          <article className="float-card flow-card"><span className="card-index">FLOW / 02</span><FlowMini /><p>Automasi dengan<br />human review</p></article>
          <a className="float-card office-card" href="#office"><span className="card-index">RUANG / 03</span><OfficeMini /><p>Ruang kerja digital<br />Konsep terpisah</p></a>
        </div>
        <div className="hero-foot"><span>Profil personal & jasa</span><a href="#tentang">Gulir untuk mengenal saya <span>↓</span></a><span>Gresik, Indonesia</span></div>
      </section>

      <section className="about section-pad" id="tentang" data-reveal>
        <p className="section-tag">Tentang saya</p><div className="about-copy"><h2>Belajar lewat hal yang <span>dibangun.</span></h2><p>Saya mahasiswa S1 Teknik Informatika di Universitas Muhammadiyah Gresik. Saya tertarik membuat pengalaman web yang berguna dan merancang automasi AI yang tetap memberi ruang untuk pemeriksaan manusia.</p><p>Di luar belajar, saya mengembangkan proyek personal dan eksplorasi yang masih terus bertumbuh.</p></div>
      </section>

      <section className="focus section-pad" data-reveal>
        <div className="focus-heading"><p className="section-tag">Fokus saat ini</p><h2>Yang sedang<br />saya tekuni.</h2></div>
        <div className="focus-list"><article><span>01</span><div><h3>Web development</h3><p>Antarmuka yang responsif, jelas, dan dirancang untuk kebutuhan nyata.</p></div></article><article><span>02</span><div><h3>AI automation</h3><p>Alur kerja yang mengurangi tugas berulang dengan kontrol manusia.</p></div></article><article><span>03</span><div><h3>Eksperimen produk</h3><p>Belajar dengan membuat, menguji, lalu memperbaiki ide.</p></div></article></div>
      </section>

      <section className="projects section-pad" id="proyek" data-reveal>
        <div className="section-heading"><p className="section-tag">Proyek terpilih</p><h2>Masih tumbuh.<br />Tetap bisa dilihat.</h2></div>
        <div className="project-list"><article className="project-row"><span className="project-type">01 / WEB</span><div><h3>Portal Informasi Desa Bendung</h3><p>Proyek KKN untuk menyajikan informasi desa. Detail kontribusi dan tautan demo perlu ditinjau pemilik.</p></div><span className="project-status">Detail untuk ditinjau</span></article><article className="project-row"><span className="project-type">02 / PRODUK</span><div><h3>ZliritDo</h3><p>Aplikasi pelacak disiplin dan fokus. Status implementasi serta materi visual perlu dilengkapi.</p></div><span className="project-status">Detail untuk ditinjau</span></article><article className="project-row project-placeholder"><span className="project-type">03 / PLACEHOLDER</span><div><h3>Proyek berikutnya</h3><p>[Tambahkan nama, peran, dan tautan setelah dikonfirmasi.]</p></div><span className="project-status">Belum diisi</span></article></div>
      </section>

      <section className="services section-pad" id="layanan" data-reveal>
        <div className="service-intro"><p className="section-tag">Layanan</p><h2>Ide yang perlu<br />jadi lebih nyata?</h2><p>Saya terbuka untuk diskusi kebutuhan web dan automasi. Lingkup dan jadwal dibicarakan sesuai kebutuhan.</p></div>
        <div className="service-lines"><article><span>01</span><h3>Website</h3><p>Halaman profil, landing page, dan antarmuka web.</p></article><article><span>02</span><h3>Automasi AI</h3><p>Eksplorasi alur kerja dengan titik tinjau manusia.</p></article></div>
      </section>

      <section className="office-section section-pad" id="office" data-reveal>
        <div><p className="section-tag">Eksplorasi mendatang</p><h2>Satu ruang.<br />Banyak cara bekerja.</h2><p>Teaser untuk konsep Office 3D Ruang. Scene dan halaman terpisah belum termasuk dalam implementasi ini.</p><span className="coming-label">Konsep, belum tersedia</span></div><div className="office-large"><OfficeMini /></div>
      </section>

      <section className="contact section-pad" id="kontak" data-reveal>
        <p className="section-tag">Kontak</p><div className="contact-inner"><h2>Ada ide<br />untuk dibahas?</h2><p>Sampaikan kebutuhan web atau automasi yang sedang Anda pikirkan.</p><a className="contact-link" href="https://github.com/DickyAndrean07" target="_blank" rel="noreferrer">Profil GitHub <span>↗</span></a><small>Kontak langsung dapat ditambahkan setelah alamatnya dikonfirmasi.</small></div>
      </section>
    </main>
    <footer><a className="brand" href="#top">DICKY<span className="brand-period">.</span></a><span>Profil personal · Dibangun bertahap</span><a href="#top">Kembali ke atas ↑</a></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
