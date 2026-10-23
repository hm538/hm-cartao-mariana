// Monta o cartão a partir de assets/js/perfil.js.
(function () {
  const person = window.HM_PROFILE;
  const company = window.HM_COMPANY;

  const icons = {
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    whatsapp: '<path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z"/><path d="M8.5 9.5c.3 2.4 2.3 4.6 5 5.2l1.2-1.2 2 .9"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'
  };
  const icon = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[n]}</svg>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const initials = name => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const avatar = p => p.photo
    ? `<img src="${esc(p.photo)}" alt="Foto de ${esc(p.name)}">`
    : `<span class="initials" aria-hidden="true">${esc(initials(p.name))}</span>`;
  const wa = p => `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(p.whatsappMsg)}`;
  const ig = handle => `https://instagram.com/${handle}`;

  const defs = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0a2a6b"/><stop offset=".3" stop-color="#2468e8"/>
        <stop offset=".48" stop-color="#d6e6ff"/><stop offset=".6" stop-color="#2f74f2"/>
        <stop offset="1" stop-color="#0b2f7a"/>
      </linearGradient>
      <symbol id="hm" viewBox="0 0 120 64">
        <path d="M2 4h16v22h16V4h16v56H34V40H18v20H2z"/>
        <path d="M56 60V4h15l14 24 14-24h15v56H98V30L85 52 72 30v30z"/>
      </symbol>
    </defs>
  </svg>`;
  // Usa o arquivo do logo quando existir (company.logo); senão, o desenho em SVG.
  const mark = (style = "") => company.logo
    ? `<img class="mark" src="${esc(company.logo)}" alt="HM Digital" ${style}>`
    : `<svg class="mark" viewBox="0 0 120 64" ${style} aria-label="HM"><use href="#hm"/></svg>`;

  const footer = () => `
  <footer>
    ${mark('style="height:40px"')}
    <span class="tagline">Feito para ser lembrado.</span>
    <div class="foot-row"><span>© ${new Date().getFullYear()} HM Digital</span><button type="button" data-replay>Rever abertura</button></div>
  </footer>`;

  const services = () => `
  <section aria-labelledby="s-serv">
    <div class="sec-head">
      <span class="eyebrow">O que a HM faz</span>
      <h2 id="s-serv">Presença digital <span>com acabamento de marca grande.</span></h2>
    </div>
    <div class="services">
      ${company.services.map(s => `<div class="svc"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><span class="tag">${esc(s.tag)}</span></div>`).join("")}
    </div>
  </section>`;

  function link(href, ic, title, sub, primary) {
    const ext = href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    return `<a class="link${primary ? " primary" : ""}" href="${esc(href)}"${ext}>
      <span class="ic">${icon(ic)}</span>
      <span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span>
      ${icon("arrow", "i arrow")}
    </a>`;
  }

  function personPage(p) {
    const first = p.name.split(" ")[0];
    const quick = [
      `<a href="tel:${p.phone.replace(/[^\d+]/g, "")}">${icon("phone")}Ligar</a>`,
      `<a href="${wa(p)}" target="_blank" rel="noopener">${icon("whatsapp")}WhatsApp</a>`,
      p.instagram
        ? `<a href="${ig(p.instagram)}" target="_blank" rel="noopener">${icon("instagram")}Instagram</a>`
        : `<a href="mailto:${esc(p.email)}">${icon("mail")}E-mail</a>`,
      `<button type="button" data-share>${icon("share")}Compartilhar</button>`
    ].join("");

    const links = [
      link(wa(p), "whatsapp", `Me chame no WhatsApp`, `Falo com você pessoalmente`, true),
      p.instagram && link(ig(p.instagram), "instagram", "Me siga no Instagram", `@${p.instagram}`),
      company.instagram && link(ig(company.instagram), "instagram", "Siga a HM no Instagram", "Bastidores e projetos novos"),
      company.site && link(company.site, "globe", "Conheça o site da HM", company.site.replace(/^https?:\/\//, "")),
      link(`mailto:${p.email}`, "mail", "Mande um e-mail", p.email)
    ].filter(Boolean).join("");

    return `
    <header class="top rise">
      <span class="brand">${mark()}<span>Digital</span></span>
      <div class="brand"><span class="eyebrow">Cartão pessoal</span>
        <button class="icon-btn" type="button" data-share aria-label="Compartilhar cartão">${icon("share")}</button>
      </div>
    </header>

    <div class="hero">
      <div class="profile rise" style="animation-delay:.08s">
        <div class="avatar">${avatar(p)}</div>
        <article class="card" id="card">
          <span class="chip status"><span class="dot"></span>${esc(p.status)}</span>
          <h1>${esc(p.name)}<span class="dot-end">.</span></h1>
          <p class="role">${esc(p.role)}</p>
          <div class="bio">${p.bio.map(t => `<p>${esc(t)}</p>`).join("")}</div>
          <p class="signature">${esc(p.signature)}</p>
          <button class="save" type="button" data-vcard>${icon("download")}Salvar na agenda</button>
        </article>
      </div>
      <nav class="quick rise" style="animation-delay:.16s" aria-label="Ações rápidas">${quick}</nav>
      <div class="links rise" style="animation-delay:.24s">${links}</div>
    </div>

    ${services()}

    <div class="qr">
      <div class="qr-box" id="qr" role="img" aria-label="QR code deste cartão"></div>
      <div><h3>Aponte a câmera</h3><p>Este QR code abre o cartão de ${esc(first)}. Mostre na tela e a pessoa já sai com seu contato.</p></div>
    </div>

    <section class="cta" aria-labelledby="s-cta">
      <span class="eyebrow" style="color:var(--ice)">O próximo passo começa com uma conversa</span>
      <h2 id="s-cta">Vamos deixar <em>sua marca</em> inesquecível?</h2>
      ${link(wa(p), "whatsapp", `Converse com ${first}`, "Resposta no mesmo dia", true)}
    </section>

    ${footer()}`;
  }

  // ---------- render ----------
  document.body.insertAdjacentHTML("afterbegin", defs);
  const main = document.createElement("main");
  main.className = "wrap";
  main.innerHTML = personPage(person);
  document.body.appendChild(main);
  document.body.insertAdjacentHTML("beforeend", '<div class="toast" id="toast" role="status" aria-live="polite"></div>');

  // ---------- comportamento ----------
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("on"), 2400);
  }

  document.querySelectorAll("[data-share]").forEach(b => b.addEventListener("click", async () => {
    const data = { title: `${person.name} · ${person.role}`, url: location.href };
    if (navigator.share) { try { await navigator.share(data); return } catch (e) { if (e.name === "AbortError") return } }
    try { await navigator.clipboard.writeText(location.href); toast("Link copiado") } catch { toast(location.href) }
  }));

  document.querySelectorAll("[data-vcard]").forEach(b => b.addEventListener("click", () => {
    const p = person;
    const [given, ...rest] = p.name.split(" ");
    const vcf = [
      "BEGIN:VCARD", "VERSION:3.0",
      `N:${rest.join(" ")};${given};;;`, `FN:${p.name}`,
      `ORG:${p.company}`, `TITLE:${p.role}`,
      `TEL;TYPE=CELL:${p.phone.replace(/[^\d+]/g, "")}`,
      `EMAIL;TYPE=WORK:${p.email}`,
      `URL:${location.href}`,
      p.instagram ? `X-SOCIALPROFILE;TYPE=instagram:${ig(p.instagram)}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
    const url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${p.slug}-hm-digital.vcf` });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Contato baixado. Abra o arquivo para salvar.");
  }));

  const qr = document.getElementById("qr");
  if (qr && window.qrcode) {
    const code = qrcode(0, "M");
    code.addData(location.href);
    code.make();
    qr.innerHTML = code.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  } else if (qr) qr.closest(".qr").hidden = true;

  const card = document.getElementById("card");
  if (card && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
      card.style.transform = `perspective(900px) rotateX(${(.5 - y) * 4}deg) rotateY(${(x - .5) * 6}deg)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = "" });
  }

  document.querySelectorAll("[data-replay]").forEach(b => b.addEventListener("click", () => {
    scrollTo({ top: 0 });
    window.HMIntro && HMIntro.play();
  }));
  window.HMIntro && HMIntro.auto();
})();
