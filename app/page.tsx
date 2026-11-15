'use client';
import { site } from './config';
import { Icon } from './icons';
import { Portrait, Sprig } from './portraits';
import { useScrollFx } from './useScrollFx';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';

const Arrow = () => <span aria-hidden>→</span>;
const v = (o: Record<string, string | number>) => o as CSSProperties;

/** Título com palavras que sobem de uma máscara, uma de cada vez. */
type Part = string | [string, true];
function Split({ parts }: { parts: Part[] }) {
  let i = 0;
  const out: ReactNode[] = [];
  parts.forEach((p, k) => {
    const [txt, em] = typeof p === 'string' ? [p, false] : p;
    txt.split(' ').filter(Boolean).forEach((w, j) => {
      const el = <span className="wd"><span style={v({ '--i': i++ })}>{w}</span></span>;
      out.push(em ? <em key={`${k}-${j}`}>{el}</em> : <span key={`${k}-${j}`} className="w0">{el}</span>, ' ');
    });
  });
  return <>{out}</>;
}

/** Texto que "acende" palavra por palavra conforme o scroll (--p vem do pai). */
function Scrub({ text }: { text: string }) {
  const w = text.split(' ');
  return (
    <span style={v({ '--n': w.length })}>
      {w.map((x, i) => <span className="sw" key={i} style={v({ '--i': i })}>{x} </span>)}
    </span>
  );
}

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

/** Triagem por situação + lista do que costuma ajudar a reunir. */
function Cases({ wa }: { wa: (t: string) => string }) {
  const [k, setK] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const c = site.cases[k];
  const got = c.docs.filter((_, i) => done[`${k}-${i}`]).length;
  return (
    <div className="cases reveal">
      <div className="caseList" role="tablist" aria-label="Escolha sua situação">
        {site.cases.map((x, i) => (
          <button key={x.label} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => setK(i)}>
            <b>{String(i + 1).padStart(2, '0')}</b>{x.label}
          </button>
        ))}
      </div>
      <div className="casePanel" key={k} role="tabpanel">
        <h3>{c.title}</h3>
        <p>{c.text}</p>
        <div className="docHead"><small>O que costuma ajudar a reunir</small><span>{got} de {c.docs.length}</span></div>
        <ul className="docs">
          {c.docs.map((d, i) => {
            const id = `${k}-${i}`;
            return (
              <li key={d} style={v({ '--d': `${i * 70}ms` })}>
                <label className={done[id] ? 'ok' : ''}>
                  <input type="checkbox" checked={!!done[id]} onChange={() => setDone({ ...done, [id]: !done[id] })} />
                  <i aria-hidden><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5" /></svg></i>
                  {d}
                </label>
              </li>
            );
          })}
        </ul>
        <p className="note">Você não precisa ter tudo para começar. Conte sua situação e indicamos o que falta.</p>
        <a className="btn mag" href={wa(`Olá! ${c.msg}`)}>Conversar sobre isso <Arrow /></a>
      </div>
    </div>
  );
}

/** Estimativa pela regra geral. Simples de propósito: o resto é análise do CNIS. */
function Sim({ wa }: { wa: (t: string) => string }) {
  const [sex, setSex] = useState<'F' | 'M'>('F');
  const [age, setAge] = useState(55);
  const [yrs, setYrs] = useState(12);
  const needAge = sex === 'F' ? 62 : 65;
  const needYrs = sex === 'F' ? 15 : 20;
  const a = Math.min(age / needAge, 1);
  const c = Math.min(yrs / needYrs, 1);
  const missA = Math.max(0, needAge - age);
  const missC = Math.max(0, needYrs - yrs);
  const wait = Math.max(missA, missC);
  const R = 52, C = 2 * Math.PI * R;
  const ring = (p: number, label: string, big: string, sub: string) => (
    <div className="ringBox">
      <svg viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r={R} className="trk" />
        <circle cx="60" cy="60" r={R} className="bar" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - p) }} />
      </svg>
      <div className="ringTxt"><b>{big}</b><span>{sub}</span></div>
      <small>{label}</small>
    </div>
  );
  return (
    <div className="sim reveal" id="simulador">
      <div className="simCopy">
        <span className="eyebrow">Termômetro</span>
        <h3>Quanto falta para a <em>aposentadoria?</em></h3>
        <p>Uma conta rápida pela regra geral. Mexa nos controles e veja onde você está.</p>
        <div className="seg" role="group" aria-label="Sexo">
          <button className={sex === 'F' ? 'on' : ''} onClick={() => setSex('F')}>Mulher</button>
          <button className={sex === 'M' ? 'on' : ''} onClick={() => setSex('M')}>Homem</button>
        </div>
        <label className="rng">
          <span>Idade <b>{age} anos</b></span>
          <input type="range" min={18} max={80} value={age} onChange={(e) => setAge(+e.target.value)} />
        </label>
        <label className="rng">
          <span>Tempo de contribuição <b>{yrs} {yrs === 1 ? 'ano' : 'anos'}</b></span>
          <input type="range" min={0} max={45} value={yrs} onChange={(e) => setYrs(+e.target.value)} />
        </label>
      </div>
      <div className="simOut">
        <div className="rings">
          {ring(a, `Idade mínima: ${needAge}`, `${age}`, `de ${needAge} anos`)}
          {ring(c, `Contribuição mínima: ${needYrs}`, `${yrs}`, `de ${needYrs} anos`)}
        </div>
        <p className="verdict" aria-live="polite">
          {wait === 0
            ? 'Pela regra geral, os dois requisitos já foram atingidos. O próximo passo é conferir o valor do benefício e se existe regra mais vantajosa.'
            : <>Mantendo as contribuições, a estimativa é de cerca de <b>{wait} {wait === 1 ? 'ano' : 'anos'}</b> até atingir os dois requisitos.{missA > 0 && <> Faltam {missA} {missA === 1 ? 'ano' : 'anos'} de idade.</>}{missC > 0 && <> Faltam {missC} {missC === 1 ? 'ano' : 'anos'} de contribuição.</>}</>}
        </p>
        <a className="btn mag" href={wa(`Olá! Fiz a estimativa no site (${sex === 'F' ? 'mulher' : 'homem'}, ${age} anos, ${yrs} de contribuição) e gostaria de uma análise do meu CNIS.`)}>Quero analisar meu CNIS <Arrow /></a>
        <small className="fine">Estimativa simplificada, pela regra geral (mulheres: 62 anos e 15 de contribuição; homens: 65 e 20), válida para quem começou a contribuir após a reforma de novembro de 2019. Quem já contribuía antes pode ter regras de transição mais vantajosas, e só a leitura do CNIS mostra o caminho certo.</small>
      </div>
    </div>
  );
}

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  const [tag, setTag] = useState('Todos');
  const [fresh, setFresh] = useState(false);
  const [form, setForm] = useState({ nome: '', assunto: site.areas[0][0], msg: '' });
  const lastY = useRef(0);
  const menuRef = useRef(false);
  menuRef.current = menu;

  useScrollFx();

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('seen')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((e) => io.observe(e));
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // o menu some ao descer e volta ao subir
      if (Math.abs(y - lastY.current) > 6) {
        setHide(y > lastY.current && y > 600 && !menuRef.current);
        lastY.current = y;
      }
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? y / h : 0);
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
  const tags = ['Todos', ...Array.from(new Set(site.posts.map((p) => p.tag)))];
  const shown = site.posts.map((p, i) => ({ ...p, i })).filter((p) => tag === 'Todos' || p.tag === tag);

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className={`${scrolled ? 'solid' : ''} ${hide ? 'hide' : ''}`}>
        <a className="brand" href="#inicio" onClick={go}>
          <b>{site.monogram}</b>
          <span>Bringel<small>Advocacia</small></span>
        </a>
        <button className="menuBtn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav">{menu ? 'Fechar' : 'Menu'}</button>
        <nav id="nav" className={menu ? 'open' : ''} aria-label="Navegação principal">
          <a href="#atuacao" onClick={go}>Atuação</a>
          <a href="#seu-caso" onClick={go}>Seu caso</a>
          <a href="#socias" onClick={go}>Sócias</a>
          <a href="#metodo" onClick={go}>Método</a>
          <a href="#conteudos" onClick={go}>Conteúdos</a>
          <a href="#faq" onClick={go}>Dúvidas</a>
          <a className="navCta mag" href="#contato" onClick={go}>Agendar conversa</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio" data-p="leave">
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
              <a className="btn mag" href={waDefault}>Agendar uma conversa <Arrow /></a>
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
            <img src={site.detail} alt="Documentos sobre a mesa de atendimento, com luz natural" fetchPriority="high" style={{ objectPosition: '50% 58%' }} />
            <figcaption>Fig. 01 — Mesa de atendimento</figcaption>
          </figure>
          <figure className="pSmall">
            <img src={site.image} alt="Sala de reuniões do escritório Bringel Advocacia" style={{ objectPosition: '38% 72%' }} />
          </figure>
          <div className="scrollCue" aria-hidden><i /><span>Role</span></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden>
        <div>{[...site.areas, ...site.areas, ...site.areas].map((a, i) => <span key={i}>{a[0]}<i /></span>)}</div>
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
      <section className="manifest reveal" data-p="enter">
        <img className="mbg" src={site.image} alt="" aria-hidden />
        <span className="eyebrow">Nossa visão</span>
        <blockquote>“<Scrub text={site.quote} />”</blockquote>
        <p>— {site.lawyers[0].name.replace('Dra. ', '')} &amp; {site.lawyers[1].name.replace('Dra. ', '')}</p>
      </section>

      {/* AMBIENTE */}
      <section className="gallery" id="ambiente">
        <div className="head reveal">
          <span className="eyebrow">O ambiente</span>
          <h2><Split parts={['Um espaço pensado para ', ['acolher.', true]]} /></h2>
          <p>Luz natural, materiais nobres e silêncio para conversar com calma sobre um assunto que, muitas vezes, pesa.</p>
        </div>
        <div className="amb reveal" data-p="through">
          <figure className="a1">
            <img src={site.image} alt="Sala de reuniões em terrazzo com luz natural" style={{ objectPosition: '50% 72%' }} loading="lazy" />
            <figcaption>Fig. 02 — Sala de reuniões</figcaption>
          </figure>
          <figure className="a2" style={{ transitionDelay: '160ms' }}>
            <img src={site.detail} alt="Documentos sobre a mesa" style={{ objectPosition: '50% 70%' }} loading="lazy" />
            <figcaption>Fig. 03 — Mesa de atendimento</figcaption>
          </figure>
          <figure className="a3" style={{ transitionDelay: '320ms' }}>
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
          <h2><Split parts={['Direito explicado ', ['com clareza.', true]]} /></h2>
          <p>Cada demanda começa com escuta atenta, análise responsável e orientação objetiva sobre os caminhos possíveis.</p>
        </div>
        <div className="areaGrid">
          {site.areas.map((a, i) => (
            <a className={`card reveal c${i % 3}`} href="#seu-caso" key={a[0]} style={v({ '--dl': `${(i % 3) * 110 + Math.floor(i / 3) * 60}ms` })}>
              <div className="ico"><Icon name={a[2]} /></div>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
              <span className="more">Ver o que reunir <Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      {/* SEU CASO + TERMÔMETRO */}
      <section className="tools" id="seu-caso">
        <div className="head reveal">
          <span className="eyebrow">Por onde começar</span>
          <h2><Split parts={['Qual é o ', ['seu caso?', true]]} /></h2>
          <p>Escolha a situação mais parecida com a sua e veja o que costuma ajudar a reunir. Depois, faça uma estimativa rápida de aposentadoria.</p>
        </div>
        <Cases wa={wa} />
        <Sim wa={wa} />
      </section>

      {/* SÓCIAS */}
      <section className="team" id="socias">
        <div className="head reveal">
          <span className="eyebrow">As sócias</span>
          <h2><Split parts={['Duas advogadas, ', ['uma só causa:', true], ' você.']} /></h2>
        </div>
        <div className="duo reveal" data-p="through">
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
            <article className={`lawyer reveal ${i ? 'alt rv-r' : 'rv-l'}`} key={l.name}>
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
      <section className="about" id="escritorio" data-p="through">
        <div className="aboutVisual reveal">
          <img src={site.detail} alt="Documentos sobre a mesa do escritório" loading="lazy" decoding="async" />
          <div className="stamp"><b>BA</b><small>Parauapebas · PA</small></div>
        </div>
        <div className="aboutCopy reveal">
          <span className="eyebrow">O escritório</span>
          <h2><Split parts={['Presença ', ['quando', true], ' mais importa.']} /></h2>
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
          <h2><Split parts={['Estratégia começa ', ['por entender.', true]]} /></h2>
        </div>
        <ol className="steps" data-p="enter">
          {site.steps.map(([t, d], i) => (
            <li key={t} style={v({ '--k': i })}>
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
          <h2><Split parts={['Quem confiou, ', ['recomenda.', true]]} /></h2>
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
          <h2><Split parts={['Informação que ', ['protege', true], ' seu direito.']} /></h2>
        </div>
        <div className="chips reveal" role="group" aria-label="Filtrar por assunto">
          {tags.map((t) => (
            <button key={t} className={t === tag ? 'on' : ''} onClick={() => { setTag(t); setFresh(true); }}>{t}</button>
          ))}
        </div>
        <div className="postGrid reveal">
          {shown.map((p, n) => (
            <article className={`post ${fresh ? 'fresh' : ''}`} key={p.title} style={v({ '--d': `${n * 80}ms` })}>
              <div className={`thumb t${p.i % 3}`}><img src={p.i % 2 ? site.detail : site.image} alt="" style={{ objectPosition: ['30% 70%', '30% 30%', '85% 60%', '60% 80%', '10% 50%', '70% 20%'][p.i % 6] }} loading="lazy" /><span>{p.tag}</span></div>
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
          <h2><Split parts={['Dúvidas comuns ', ['antes de começar.', true]]} /></h2>
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
          <h2><Split parts={['Vamos ', ['conversar?', true]]} /></h2>
          <p>Conte rapidamente sua situação e abriremos uma conversa no WhatsApp com as advogadas.</p>
          <ul className="channels">
            <li><small>Endereço</small><a href={site.map}>{site.address}</a></li>
            <li><small>WhatsApp</small><a href={waDefault}>{site.phone}</a></li>
            <li><small>E-mail</small><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><small>Horário</small><span>{site.hours}</span></li>
          </ul>
          <aside className="scam">
            <b>Atenção a golpes</b>
            <ul>{site.scam.map((s) => <li key={s}>{s}</li>)}</ul>
          </aside>
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
          <button className="btn mag" type="submit">Continuar no WhatsApp <Arrow /></button>
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
            <a href="#atuacao">Atuação</a><a href="#seu-caso">Seu caso</a><a href="#socias">Sócias</a><a href="#metodo">Método</a><a href="#conteudos">Conteúdos</a><a href="#contato">Contato</a>
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
