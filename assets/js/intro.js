// Abertura animada no estilo das vinhetas da Pixar:
// um gimbal com celular entra pulando, sobe nas letras, amassa o "I" de DIGITAL
// e fica no lugar dele. Depois olha para a câmera e a tela acende.
//
// Uso: HMIntro.play()  -> toca a abertura (retorna uma Promise)
//      HMIntro.auto()  -> toca só na primeira visita da sessão
(function () {
  const FLOOR = 400;           // linha do chão no SVG
  const CAP = 96;              // altura das letras
  const I_X = 285;             // centro do segundo "I" de DIGITAL
  const GB = 1.5;              // escala do gimbal

  const markup = `
  <button class="intro-skip" type="button">Pular abertura</button>
  <svg class="intro-stage" viewBox="0 0 600 470" overflow="visible" aria-hidden="true">
    <defs>
      <linearGradient id="ig-chrome" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0b2f7a"/>
        <stop offset=".38" stop-color="#2a6ef0"/>
        <stop offset=".5" stop-color="#dfeaff"/>
        <stop offset=".62" stop-color="#2f74f2"/>
        <stop offset="1" stop-color="#0a2462"/>
      </linearGradient>
      <linearGradient id="ig-letters" gradientUnits="userSpaceOnUse" x1="0" y1="304" x2="0" y2="400">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".48" stop-color="#eef2f9"/>
        <stop offset=".52" stop-color="#cfd8e8"/>
        <stop offset="1" stop-color="#f4f7fc"/>
      </linearGradient>
      <!-- DIGITAL: letras retas e pesadas, com cantos chanfrados como o logo -->
      <g id="ig-dig-paths">
        <path d="M81 314V390H113L123 380V324L113 314Z"/>
        <path d="M163 304V400"/>
        <path d="M255 314H203V390H245V354H226"/>
        <path id="ig-i" d="M285 304V400"/>
        <path d="M315 314H373M344 324V400"/>
        <path d="M405 400V326L417 314H435L447 326V400M415 358H437"/>
        <path d="M489 304V390H529"/>
      </g>
      <linearGradient id="ig-grip" x1="0" x2="1">
        <stop offset="0" stop-color="#121a2c"/>
        <stop offset=".45" stop-color="#34425f"/>
        <stop offset="1" stop-color="#0e1524"/>
      </linearGradient>
      <linearGradient id="ig-steel" x1="0" x2="1">
        <stop offset="0" stop-color="#4b5d82"/>
        <stop offset=".5" stop-color="#b9c8e6"/>
        <stop offset="1" stop-color="#3c4b6b"/>
      </linearGradient>
      <radialGradient id="ig-beam">
        <stop offset="0" stop-color="#dfeaff" stop-opacity="1"/>
        <stop offset=".25" stop-color="#7fb0ff" stop-opacity=".75"/>
        <stop offset="1" stop-color="#1f56c8" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ig-spot" gradientUnits="userSpaceOnUse" cx="300" cy="140" r="430">
        <stop offset="0" stop-color="#3d6fd6" stop-opacity=".35"/>
        <stop offset="1" stop-color="#3d6fd6" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ig-floor" x1="0" x2="1">
        <stop offset="0" stop-color="#8fb4ff" stop-opacity="0"/>
        <stop offset=".5" stop-color="#8fb4ff" stop-opacity=".45"/>
        <stop offset="1" stop-color="#8fb4ff" stop-opacity="0"/>
      </linearGradient>
      <mask id="ig-sweep-mask">
        <use href="#ig-dig-paths" fill="none" stroke="#fff" stroke-width="20"/>
        <use href="#ig-hm-shape" fill="#fff"/>
      </mask>
    </defs>

    <rect x="-500" y="-300" width="1600" height="1100" fill="url(#ig-spot)"/>
    <rect x="-200" y="${FLOOR}" width="1000" height="1.5" fill="url(#ig-floor)"/>

    <g class="ig-scene">
      <g id="ig-hm-shape" class="ig-hm" transform="translate(171 14) scale(2.15)" fill="url(#ig-chrome)">
        <path d="M2 4h16v22h16V4h16v56H34V40H18v20H2z"/>
        <path d="M56 60V4h15l14 24 14-24h15v56H98V30L85 52 72 30v30z"/>
      </g>

      <g fill="none" stroke-width="20" stroke-linejoin="miter">
        <use href="#ig-dig-paths" stroke="#123a8f" transform="translate(3 4)"/>
        <use href="#ig-dig-paths" stroke="url(#ig-letters)"/>
      </g>

      <rect class="ig-sweep" x="-120" y="0" width="70" height="470" fill="#fff" opacity=".55"
            mask="url(#ig-sweep-mask)" transform="skewX(-18)"/>
    </g>

    <ellipse id="ig-shadow" cx="0" cy="${FLOOR + 2}" rx="26" ry="4.5" fill="#000" opacity=".55"/>

    <circle id="ig-flash" cx="0" cy="0" r="40" fill="url(#ig-beam)" opacity="0"/>

    <g id="gb">
      <g transform="scale(${GB})">
      <g id="gb-squash">
        <ellipse cx="0" cy="-2" rx="14" ry="3" fill="#0b101c"/>
        <rect x="-9" y="-72" width="18" height="70" rx="8" fill="url(#ig-grip)"/>
        <rect x="-6" y="-24" width="12" height="2" rx="1" fill="#2a3550"/>
        <circle cx="0" cy="-58" r="2.6" fill="#7c8aa8"/>
        <circle class="gb-led" cx="0" cy="-46" r="2.6" fill="#4c8dff"/>
        <rect x="-11" y="-86" width="22" height="14" rx="4" fill="url(#ig-steel)"/>
        <g id="gb-neck">
          <rect x="-4" y="-112" width="8" height="28" rx="3" fill="url(#ig-grip)"/>
          <circle cx="0" cy="-114" r="8" fill="url(#ig-steel)"/>
          <path d="M0 -114 L-20 -128" stroke="#2a3550" stroke-width="7" stroke-linecap="round"/>
          <g id="gb-head">
            <circle cx="-20" cy="-128" r="6.5" fill="url(#ig-steel)"/>
            <rect x="-14" y="-149" width="40" height="5" rx="2" fill="#1a2336"/>
            <rect x="-14" y="-120" width="40" height="5" rx="2" fill="#1a2336"/>
            <rect x="-24" y="-147" width="60" height="30" rx="6" fill="#0b111f" stroke="#43537a" stroke-width="1.5"/>
            <rect id="gb-screen" x="-21" y="-144" width="54" height="24" rx="4" fill="#0d2a66"/>
            <g transform="translate(6 -132)">
              <g id="gb-eyes">
                <rect x="-11" y="-6" width="7" height="12" rx="3.5" fill="#dfeaff"/>
                <rect x="4" y="-6" width="7" height="12" rx="3.5" fill="#dfeaff"/>
              </g>
            </g>
          </g>
        </g>
      </g>
      </g>
    </g>
  </svg>
  <p class="intro-tag">Feito para ser lembrado.</p>`;

  function setAttr(el, v) { el.setAttribute("transform", v) }

  function build() {
    const root = document.createElement("div");
    root.className = "intro";
    root.innerHTML = markup;
    document.body.appendChild(root);
    const $ = s => root.querySelector(s);
    // Logo real da HM no brilho final, quando o arquivo estiver configurado
    const logo = window.HM_COMPANY && window.HM_COMPANY.logo;
    if (logo) {
      const g = $("#ig-hm-shape");
      g.removeAttribute("fill");
      g.innerHTML = `<image href="${logo}" x="0" y="0" width="120" height="64" preserveAspectRatio="xMidYMid meet"/>`;
    }
    return {
      root,
      gb: $("#gb"), squash: $("#gb-squash"), neck: $("#gb-neck"), head: $("#gb-head"),
      eyes: $("#gb-eyes"), screen: $("#gb-screen"), letterI: $("#ig-i"),
      shadow: $("#ig-shadow"), beam: $("#ig-flash"), sweep: $(".ig-sweep"),
      scene: $(".ig-scene"), hm: $(".ig-hm"), tag: $(".intro-tag"), skip: $(".intro-skip")
    };
  }

  function play() {
    if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
    const el = build();

    // Estado animado. O GSAP mexe nesses números e render() desenha.
    const s = {
      x: 700, y: FLOOR, sx: 1, sy: 1, neck: 0, head: 0,
      ex: 0, ey: 0, blink: 1, iScale: 1, scene: 0, hm: 0, beam: 0, sweep: -120, glow: 0
    };

    function render() {
      setAttr(el.gb, `translate(${s.x} ${s.y})`);
      setAttr(el.squash, `scale(${s.sx} ${s.sy})`);
      setAttr(el.neck, `rotate(${s.neck} 0 -86)`);
      setAttr(el.head, `rotate(${s.head} -20 -128)`);
      setAttr(el.eyes, `translate(${s.ex} ${s.ey}) scale(1 ${s.blink})`);
      setAttr(el.letterI, `translate(0 ${FLOOR}) scale(1 ${Math.max(s.iScale, 0.001)}) translate(0 ${-FLOOR})`);
      el.letterI.style.opacity = s.iScale < 0.02 ? 0 : 1;
      const lift = Math.max(0, FLOOR - s.y);
      el.shadow.setAttribute("cx", s.x);
      el.shadow.setAttribute("rx", 26 * GB * Math.max(.45, 1 - lift / 260) * s.sx);
      el.shadow.setAttribute("opacity", .55 * Math.max(.2, 1 - lift / 200));
      el.scene.style.opacity = s.scene;
      el.hm.style.opacity = s.hm;
      el.sweep.setAttribute("x", s.sweep);
      el.screen.setAttribute("fill", mix("#0d2a66", "#7fb0ff", s.glow));
      el.beam.setAttribute("cx", s.x + 6 * GB);
      el.beam.setAttribute("cy", s.y - 132 * GB);
      el.beam.setAttribute("r", 30 + s.beam * 340);
      el.beam.setAttribute("opacity", Math.sin(Math.PI * Math.min(s.beam, 1)) * .95);
    }

    const tl = gsap.timeline({ onUpdate: render, paused: true });

    // Um pulo com antecipação, esticada no ar e amassada na queda.
    function hop(toX, toY, height, dur, look = -1) {
      const fromY = s._y ?? s.y;
      const peak = Math.min(fromY, toY) - height;
      tl.to(s, { sx: 1.14, sy: .8, neck: 4 * -look, duration: .13, ease: "power2.in" })
        .addLabel("air")
        .to(s, { x: toX, duration: dur, ease: "none" }, "air")
        .to(s, { y: peak, duration: dur * .5, ease: "power2.out" }, "air")
        .to(s, { y: toY, duration: dur * .5, ease: "power2.in" }, `air+=${dur * .5}`)
        .to(s, { sx: .9, sy: 1.14, neck: -8 * -look, duration: dur * .35, ease: "power1.out" }, "air")
        .to(s, { sx: 1, sy: 1, duration: dur * .3 }, `air+=${dur * .4}`)
        .to(s, { sx: 1.18, sy: .78, neck: 6 * -look, duration: .09, ease: "power2.out" })
        .to(s, { sx: 1, sy: 1, neck: 0, duration: .2, ease: "elastic.out(1, .45)" });
      s._y = toY;
    }

    // Amassada no "I": o gimbal desce junto com o topo da letra.
    function stomp(scale, height) {
      const top = FLOOR - CAP * scale;
      const fromY = s._y;
      tl.to(s, { sx: 1.12, sy: .84, duration: .1, ease: "power2.in" })
        .addLabel("st")
        .to(s, { y: fromY - height, sx: .92, sy: 1.1, duration: .16, ease: "power2.out" }, "st")
        .to(s, { y: top, sx: 1, sy: 1, duration: .14, ease: "power3.in" }, "st+=.16")
        .to(s, { iScale: scale, duration: .14, ease: "power3.in" }, "st+=.16")
        .to(s, { sx: 1.22, sy: .74, duration: .08, ease: "power2.out" })
        .to(s, { sx: 1, sy: 1, duration: .18, ease: "elastic.out(1, .5)" });
      s._y = top;
    }

    const capTop = FLOOR - CAP;

    tl.to(s, { scene: 1, duration: .35, ease: "power1.out" })
      .set(s, { ex: -5 }, "<");

    // Entra pela direita, sobe no A e depois no T
    hop(426, capTop, 80, .55);
    hop(344, capTop, 36, .36);
    // Olha para baixo, para o "I"
    tl.to(s, { neck: -10, head: -22, ex: -6, ey: 4, duration: .22, ease: "power2.out" })
      .to(s, { neck: 0, head: 0, duration: .15 }, "+=.2");
    // Pula em cima do "I" e amassa ele em dois pulinhos
    hop(I_X, capTop, 30, .36);
    stomp(.5, 26);
    stomp(0, 22);
    // Vira para a câmera e pisca
    tl.to(s, { ex: 0, ey: 0, head: 8, neck: 3, duration: .25, ease: "back.out(2)" }, "+=.05")
      .to(s, { blink: .1, duration: .05 }, "+=.15").to(s, { blink: 1, duration: .07 })
      // A tela acende e ilumina tudo, como a luz da luminária
      .to(s, { glow: 1, head: 0, neck: 0, duration: .2 }, "+=.1")
      .to(s, { beam: 1, duration: .9, ease: "power1.inOut" }, "<.05")
      .to(s, { hm: 1, duration: .35, ease: "power2.out" }, "<.35")
      .to(s, { sweep: 700, duration: .8, ease: "power1.inOut" }, "<.15")
      .to(s, { glow: .55, duration: .4 }, "<.3")
      .to({}, { duration: .5 });

    return new Promise(resolve => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        el.root.classList.add("intro-out");
        document.documentElement.classList.remove("intro-lock");
        setTimeout(() => { tl.kill(); el.root.remove(); resolve() }, 650);
      };
      tl.call(() => el.tag.classList.add("on"), [], "-=.6");
      tl.call(finish, [], "+=.1");
      el.skip.addEventListener("click", finish);
      document.documentElement.classList.add("intro-lock");
      render();
      tl.timeScale(1.6);   // velocidade geral da abertura (maior = mais rápida)
      tl.play();
    });
  }

  function mix(a, b, t) {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const ch = sh => Math.round(((pa >> sh) & 255) + (((pb >> sh) & 255) - ((pa >> sh) & 255)) * t);
    return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
  }

  function auto() {
    let seen = false;
    try { seen = sessionStorage.getItem("hm-intro") === "1"; sessionStorage.setItem("hm-intro", "1") } catch {}
    return seen ? Promise.resolve() : play();
  }

  window.HMIntro = { play, auto };
})();
