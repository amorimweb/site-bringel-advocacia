'use client';
import { site } from './config';
import { Icon } from './icons';
import { useEffect, useState } from 'react';

const Arrow = () => <span aria-hidden>↗</span>;

export default function Page() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('seen')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((e) => io.observe(e));

    const cleanups: Array<() => void> = [];
    const media = window.matchMedia('(min-width: 761px)');
    document.querySelectorAll<HTMLElement>('.areaGrid').forEach((track) => {
      const onWheel = (event: WheelEvent) => {
        if (!media.matches || track.scrollWidth <= track.clientWidth + 2 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        const rect = track.getBoundingClientRect();
        if (rect.top < -24 || rect.bottom > window.innerHeight + 24) return;
        const max = track.scrollWidth - track.clientWidth;
        const movingRight = event.deltaY > 0;
        const canMove = movingRight ? track.scrollLeft < max - 1 : track.scrollLeft > 1;
        if (!canMove) return;
        event.preventDefault();
        track.scrollBy({ left: event.deltaY, behavior: 'auto' });
      };
      track.addEventListener('wheel', onWheel, { passive: false });
      cleanups.push(() => track.removeEventListener('wheel', onWheel));
    });

    return () => { io.disconnect(); cleanups.forEach((fn) => fn()); };
  }, []);

  const hasPhone = Boolean(site.whatsapp);
  const wa = hasPhone ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar uma conversa com ' + site.name + '.')}` : site.map;
  const tel = `tel:+${site.whatsapp}`;
  const cta = hasPhone ? 'Fale com o escritório' : 'Ver contato no Google';

  return (
    <main className={`theme-${site.theme}`}>
      <header>
        <a className="brand" href="#inicio"><b>{site.monogram}</b><span>{site.short}</span></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav" aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? 'Fechar' : 'Menu'}</button>
        <nav id="nav" className={menu ? 'open' : ''} aria-label="Navegação principal">
          <a href="#atuacao" onClick={() => setMenu(false)}>Atuação</a>
          <a href="#escritorio" onClick={() => setMenu(false)}>Escritório</a>
          <a href="#faq" onClick={() => setMenu(false)}>Dúvidas</a>
          <a href="#contato" onClick={() => setMenu(false)}>Contato</a>
          {hasPhone && <a className="navPhone" href={tel}>{site.phone}</a>}
          <a className="navCta" href={wa}>Agendar <Arrow /></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <img src={site.image} alt="Ambiente jurídico elegante" fetchPriority="high" />
        <div className="veil" />
        <div className="heroCopy reveal">
          <small>{site.kicker}</small>
          <h1>{site.title}</h1>
          <p>{site.intro}</p>
          <div className="actions">
            <a className="primary" href={wa}>{cta} <Arrow /></a>
            <a className="textLink" href="#atuacao">Conheça a atuação ↓</a>
          </div>
        </div>
        <div className="sideNote">PARAUAPEBAS · PARÁ</div>
        <div className="scroll">Role para descobrir</div>
      </section>

      <div className="ticker reveal" aria-hidden="true">
        <div className="tickerTrack">
          {[...site.areas, ...site.areas, ...site.areas].map((a, i) => (
            <span key={i}>{a[0]}<i>•</i></span>
          ))}
        </div>
      </div>

      <section className="manifest reveal">
        <span>01 · NOSSA VISÃO</span>
        <blockquote>“{site.quote}”</blockquote>
      </section>

      <section className="areas" id="atuacao">
        <div className="sectionHead reveal">
          <span>02 · ÁREAS DE ATUAÇÃO</span>
          <h2>Direito explicado<br />com clareza.</h2>
          <p>Cada demanda começa com escuta atenta, análise responsável e orientação objetiva sobre os caminhos possíveis.</p>
        </div>
        <div className="areaGrid">
          {site.areas.map((a, i) => (
            <article className="reveal" key={a[0]}>
              <div className="areaTop"><Icon name={a[2]} /><i>0{i + 1}</i></div>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="diffs" id="diferenciais">
        <div className="sectionHead reveal">
          <span>03 · POR QUE ESCOLHER</span>
          <h2>Compromisso que<br />se sente no atendimento.</h2>
        </div>
        <div className="diffGrid">
          {site.values.map((v, i) => (
            <article className="reveal" key={v}>
              <Icon name="check" />
              <p>{v}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="escritorio">
        <div className="aboutVisual reveal">
          <img src="/detail.jpg" alt="Detalhes de um ambiente de trabalho jurídico" loading="lazy" decoding="async" />
          <div className="stamp">{site.monogram}<small>PARAUAPEBAS · PA</small></div>
        </div>
        <div className="aboutCopy reveal">
          <span>04 · O ESCRITÓRIO</span>
          <h2>Presença quando<br />mais importa.</h2>
          <p>{site.about}</p>
          <a className="textLink" href={wa}>Converse sobre seu caso <Arrow /></a>
        </div>
      </section>

      <section className="process">
        <div className="sectionHead reveal">
          <span>05 · COMO TRABALHAMOS</span>
          <h2>Estratégia começa<br />por entender.</h2>
        </div>
        <div className="steps">
          <article><b>01</b><h3>Escuta</h3><p>Compreensão do contexto, documentos e prioridades.</p></article>
          <article><b>02</b><h3>Análise</h3><p>Leitura técnica e apresentação clara dos caminhos jurídicos.</p></article>
          <article><b>03</b><h3>Condução</h3><p>Acompanhamento responsável e comunicação ao longo do trabalho.</p></article>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="sectionHead reveal">
          <span>06 · PERGUNTAS FREQUENTES</span>
          <h2>Dúvidas comuns<br />antes de começar.</h2>
        </div>
        <div className="faqList reveal">
          {site.faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<span aria-hidden>+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ctaBand reveal">
        <h2>Sua próxima decisão jurídica<br />merece atenção estratégica.</h2>
        <a className="primary light" href={wa}>{cta} <Arrow /></a>
      </section>

      <section className="contact" id="contato">
        <div className="contactTitle reveal">
          <small>07 · CONTATO</small>
          <h2>Vamos conversar?</h2>
          <p>Agende uma conversa inicial para apresentar sua demanda ao escritório.</p>
          <a className="primary light" href={wa}>{hasPhone ? 'Abrir WhatsApp' : 'Ver contato no Google'} <Arrow /></a>
        </div>
        <div className="contactInfo reveal">
          <div><small>ENDEREÇO</small><p>{site.address}</p><a href={site.map}>Ver no Google Maps <Arrow /></a></div>
          <div><small>TELEFONE</small><p>{hasPhone ? <a href={tel}>{site.phone}</a> : site.phone}</p></div>
          {site.instagram && <div><small>INSTAGRAM</small><a href={site.instagram}>Acessar perfil <Arrow /></a></div>}
        </div>
      </section>

      <footer>
        <div className="footTop">
          <div className="footBrand">
            <div className="brand"><b>{site.monogram}</b><span>{site.short}</span></div>
            <p>{site.about}</p>
          </div>
          <div className="footCol">
            <small>NAVEGUE</small>
            <a href="#atuacao">Atuação</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#escritorio">Escritório</a>
            <a href="#faq">Dúvidas</a>
            <a href="#contato">Contato</a>
          </div>
          <div className="footCol">
            <small>ATENDIMENTO</small>
            <span>{site.address}</span>
            {hasPhone ? <a href={tel}>{site.phone}</a> : <span>{site.phone}</span>}
            {site.instagram && <a href={site.instagram}>Instagram</a>}
            {hasPhone && <a href={wa}>WhatsApp</a>}
          </div>
        </div>
        <div className="footBottom">
          <span>© 2026 {site.short}</span>
          <p>Conteúdo com caráter informativo. Não substitui a análise individual de um advogado nem constitui aconselhamento jurídico específico.</p>
        </div>
      </footer>

      {hasPhone && <a className="whatsapp" href={wa} aria-label="Falar pelo WhatsApp">WhatsApp</a>}
    </main>
  );
}
