'use client';
import { site } from './config';
import { Icon } from './icons';
import { Portrait, Sprig } from './portraits';
import { useEffect, useRef, useState, type FormEvent } from 'react';

const Arrow = () => <span aria-hidden>→</span>;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({ nome: '', assunto: site.areas[0][0], msg: '' });

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('seen')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((e) => io.observe(e));
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % site.testimonials.length), 7000);
    return () => clearInterval(id);
  }, [slide]);

  const wa = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  const waDefault = wa(`Olá! Gostaria de agendar uma conversa com a ${site.name}.`);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Olá! Meu nome é ${form.nome || '—'}. Assunto: ${form.assunto}.${form.msg ? ' ' + form.msg : ''}`;
    window.open(wa(text), '_blank', 'noopener');
  };
  const go = () => setMenu(false);

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className={scrolled ? 'solid' : ''}>
        <a className="brand" href="#inicio" onClick={go}>
          <b>{site.monogram}</b>
          <span>Bringel<small>Advocacia</small></span>
        </a>
        <button className="menuBtn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav">{menu ? 'Fechar' : 'Menu'}</button>
        <nav id="nav" className={menu ? 'open' : ''} aria-label="Navegação principal">
          <a href="#atuacao" onClick={go}>Atuação</a>
          <a href="#socias" onClick={go}>Sócias</a>
          <a href="#metodo" onClick={go}>Método</a>
          <a href="#conteudos" onClick={go}>Conteúdos</a>
          <a href="#faq" onClick={go}>Dúvidas</a>
          <a className="navCta" href="#contato" onClick={go}>Agendar conversa</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="heroMain">
          <div className="heroTop">
            <span>{site.kicker.split(' · ')[0]}</span>
            <span>Parauapebas, Pará</span>
          </div>
          <h1>
            {site.title.map((l, i) => (
              <span className="line" key={l}><span style={{ animationDelay: `${0.2 + i * 0.14}s` }}>{i === 2 ? <>clareza e <em>cuidado.</em></> : l}</span></span>
            ))}
          </h1>
          <div className="heroLower">
            <p>{site.intro}</p>
            <div className="actions">
              <a className="btn" href={waDefault}>Agendar uma conversa <Arrow /></a>
              <a className="textLink dark" href="#socias">Conheça as sócias</a>
            </div>
          </div>
          <dl className="facts">
            <div><dt>Atendimento</dt><dd>Presencial e online</dd></div>
            <div><dt>Horário</dt><dd>{site.hours}</dd></div>
            <div><dt>Endereço</dt><dd>{site.address.split(' — ')[0]}, Parauapebas</dd></div>
          </dl>
        </div>
        <div className="heroPhotos">
          <figure className="pMain">
            <img src={site.image} alt="Sala de reuniões do escritório Bringel Advocacia" fetchPriority="high" />
            <figcaption>Fig. 01 — O escritório, Rua 6</figcaption>
          </figure>
          <figure className="pSmall">
            <img src={site.detail} alt="Documentos sobre a mesa" />
          </figure>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden>
        <div>{[...site.areas, ...site.areas, ...site.areas].map((a, i) => <span key={i}>{a[0]}<i>✦</i></span>)}</div>
      </div>

      {/* NÚMEROS */}
      <section className="stats">
        {site.stats.map((s) => (
          <div className="reveal" key={s.label}>
            <b><Counter to={s.value} suffix={s.suffix} /></b>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* MANIFESTO */}
      <section className="manifest reveal">
        <img className="mbg" src={site.image} alt="" aria-hidden />
        <span className="eyebrow">Nossa visão</span>
        <blockquote>“{site.quote}”</blockquote>
        <p>— {site.lawyers[0].name.replace('Dra. ', '')} &amp; {site.lawyers[1].name.replace('Dra. ', '')}</p>
      </section>

      {/* AMBIENTE */}
      <section className="gallery" id="ambiente">
        <div className="head reveal">
          <span className="eyebrow">O ambiente</span>
          <h2>Um espaço pensado para <em>acolher.</em></h2>
          <p>Luz natural, materiais nobres e silêncio para conversar com calma sobre um assunto que, muitas vezes, pesa.</p>
        </div>
        <div className="amb">
          <figure className="a1 reveal">
            <img src={site.image} alt="Sala de reuniões em terrazzo com luz natural" style={{ objectPosition: '50% 72%' }} loading="lazy" />
            <figcaption>Fig. 02 — Sala de reuniões</figcaption>
          </figure>
          <figure className="a2 reveal" style={{ transitionDelay: '120ms' }}>
            <img src={site.detail} alt="Documentos sobre a mesa" style={{ objectPosition: '50% 70%' }} loading="lazy" />
            <figcaption>Fig. 03 — Mesa de atendimento</figcaption>
          </figure>
          <figure className="a3 reveal" style={{ transitionDelay: '240ms' }}>
            <img src={site.image} alt="Estante em madeira e luminária" style={{ objectPosition: '92% 58%' }} loading="lazy" />
            <figcaption>Fig. 04 — Arquivo e recepção</figcaption>
          </figure>
        </div>
        <dl className="ambFacts reveal">
          <div><dt>Atendimento</dt><dd>Reservado, com hora marcada</dd></div>
          <div><dt>Formato</dt><dd>Presencial ou por videochamada</dd></div>
          <div><dt>Onde</dt><dd>{site.address}</dd></div>
          <div><a className="textLink" href={site.map}>Como chegar <Arrow /></a></div>
        </dl>
      </section>

      {/* ÁREAS */}
      <section className="areas" id="atuacao">
        <div className="head reveal">
          <span className="eyebrow">Áreas de atuação</span>
          <h2>Direito explicado <em>com clareza.</em></h2>
          <p>Cada demanda começa com escuta atenta, análise responsável e orientação objetiva sobre os caminhos possíveis.</p>
        </div>
        <div className="areaGrid">
          {site.areas.map((a, i) => (
            <a className="card reveal" href="#contato" key={a[0]} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="ico"><Icon name={a[2]} /></div>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
              <span className="more">Saiba mais <Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      {/* SÓCIAS */}
      <section className="team" id="socias">
        <div className="head reveal">
          <span className="eyebrow">As sócias</span>
          <h2>Duas advogadas, <em>uma só causa:</em> você.</h2>
        </div>
        <div className="duo reveal">
          {site.lawyers.map((l, i) => (
            <figure className={`duoItem d${i}`} key={l.name}>
              <div className="duoArch"><Portrait variant={i as 0 | 1} /></div>
              <figcaption><b>{l.name}</b><span>{l.role}</span></figcaption>
            </figure>
          ))}
          <div className="amp" aria-hidden>&amp;</div>
          <Sprig className="duoSprig" />
        </div>
        <div className="teamGrid">
          {site.lawyers.map((l, i) => (
            <article className={`lawyer reveal ${i ? 'alt' : ''}`} key={l.name}>
              <div className="lhead">
                <div className="avatar"><Portrait variant={i as 0 | 1} /></div>
                <div><small>{l.role} · {l.oab}</small><h3>{l.name}</h3></div>
              </div>
              <p className="bio">{l.bio}</p>
              <blockquote>“{l.quote}”</blockquote>
              <ul className="edu">{l.edu.map((e) => <li key={e}>{e}</li>)}</ul>
              <ul className="tags">{l.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="lfoot">
                <span className="sign">{l.name.replace('Dra. ', '')}</span>
                <a className="textLink" href={wa(`Olá, ${l.name}! Gostaria de agendar uma conversa.`)}>Conversar <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ESCRITÓRIO */}
      <section className="about" id="escritorio">
        <div className="aboutVisual reveal">
          <img src={site.detail} alt="Documentos sobre a mesa do escritório" loading="lazy" decoding="async" />
          <div className="stamp"><b>BA</b><small>Parauapebas · PA</small></div>
        </div>
        <div className="aboutCopy reveal">
          <span className="eyebrow">O escritório</span>
          <h2>Presença <em>quando</em> mais importa.</h2>
          <p>{site.about}</p>
          <ul className="values">
            {site.values.map(([t, d]) => (
              <li key={t}><Icon name="check" /><div><b>{t}</b><span>{d}</span></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* MÉTODO */}
      <section className="process" id="metodo">
        <div className="head reveal">
          <span className="eyebrow light">Como trabalhamos</span>
          <h2>Estratégia começa <em>por entender.</em></h2>
        </div>
        <ol className="steps">
          {site.steps.map(([t, d], i) => (
            <li className="reveal" key={t} style={{ transitionDelay: `${i * 90}ms` }}>
              <b>0{i + 1}</b>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* DEPOIMENTOS */}
      <section className="voices">
        <div className="head reveal">
          <span className="eyebrow">Depoimentos</span>
          <h2>Quem confiou, <em>recomenda.</em></h2>
        </div>
        <div className="slider reveal">
          <div className="qmark" aria-hidden>“</div>
          {site.testimonials.map((t, i) => (
            <figure key={t.who} className={i === slide ? 'on' : ''} aria-hidden={i !== slide}>
              <blockquote>{t.text}</blockquote>
              <figcaption><i className="tav">{t.who[0]}</i><b>{t.who}</b><span>{t.meta}</span></figcaption>
            </figure>
          ))}
          <div className="dots">
            {site.testimonials.map((t, i) => <button key={t.who} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} aria-label={`Depoimento ${i + 1}`} />)}
          </div>
        </div>
      </section>

      {/* CONTEÚDOS */}
      <section className="posts" id="conteudos">
        <div className="head reveal">
          <span className="eyebrow">Conteúdos</span>
          <h2>Informação que <em>protege</em> seu direito.</h2>
        </div>
        <div className="postGrid">
          {site.posts.map((p, i) => (
            <article className="post reveal" key={p.title} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className={`thumb t${i}`}><img src={i % 2 ? site.detail : site.image} alt="" style={{ objectPosition: ['30% 70%', '30% 30%', '85% 60%'][i] }} loading="lazy" /><span>{p.tag}</span></div>
              <small>{p.date} · {p.read} de leitura</small>
              <h3>{p.title}</h3>
              <a className="textLink" href="#contato">Ler artigo <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="head reveal">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2>Dúvidas comuns <em>antes de começar.</em></h2>
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

      {/* CONTATO */}
      <section className="contact" id="contato">
        <div className="contactCopy reveal">
          <span className="eyebrow light">Contato</span>
          <h2>Vamos <em>conversar?</em></h2>
          <p>Conte rapidamente sua situação e abriremos uma conversa no WhatsApp com as advogadas.</p>
          <ul className="channels">
            <li><small>Endereço</small><a href={site.map}>{site.address}</a></li>
            <li><small>WhatsApp</small><a href={waDefault}>{site.phone}</a></li>
            <li><small>E-mail</small><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><small>Horário</small><span>{site.hours}</span></li>
          </ul>
        </div>
        <form className="form reveal" onSubmit={submit}>
          <label>Seu nome<input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Como podemos te chamar?" /></label>
          <label>Assunto
            <select value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })}>
              {site.areas.map((a) => <option key={a[0]}>{a[0]}</option>)}
              <option>Outro assunto</option>
            </select>
          </label>
          <label>Mensagem (opcional)<textarea rows={4} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="Conte em poucas palavras o que aconteceu" /></label>
          <button className="btn" type="submit">Continuar no WhatsApp <Arrow /></button>
          <small>Suas informações são usadas apenas para iniciar o atendimento.</small>
        </form>
      </section>

      <footer>
        <div className="footTop">
          <div className="footBrand">
            <div className="brand"><b>{site.monogram}</b><span>Bringel<small>Advocacia</small></span></div>
            <p>{site.about}</p>
          </div>
          <div className="footCol">
            <small>Navegue</small>
            <a href="#atuacao">Atuação</a><a href="#socias">Sócias</a><a href="#metodo">Método</a><a href="#conteudos">Conteúdos</a><a href="#contato">Contato</a>
          </div>
          <div className="footCol">
            <small>Atendimento</small>
            <span>{site.address}</span>
            <a href={waDefault}>WhatsApp {site.phone}</a>
            <a href={site.instagram}>Instagram</a>
          </div>
        </div>
        <div className="footBottom">
          <span>© 2026 {site.short}</span>
          <p>Conteúdo informativo. Não substitui a análise individual de um advogado nem constitui aconselhamento jurídico específico.</p>
        </div>
      </footer>

      <a className="wafab" href={waDefault} aria-label="Falar pelo WhatsApp"><img src="/whatsapp-icon.png" alt="" />WhatsApp</a>
    </main>
  );
}
