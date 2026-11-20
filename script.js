(function () {
  var root = document.documentElement;

  // theme toggle
  document.getElementById('themeToggle').addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // mobile menu
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });

  // count-up
  function countUp(el) {
    var target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || '';
    var start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('revealed'); });
    document.querySelectorAll('[data-count]').forEach(countUp);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('revealed');
        en.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  }

  // contact form (demo: opens mail client)
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var name = (d.get('name') || '').trim(), email = (d.get('email') || '').trim(), text = (d.get('message') || '').trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !text) {
      msg.textContent = '이름, 올바른 이메일, 문의 내용을 입력해 주세요.';
      return;
    }
    msg.textContent = '메일 앱을 열었습니다. 감사합니다! 🙌';
    location.href = 'mailto:gildong.hong@example.com?subject=' + encodeURIComponent('[홈페이지 문의] ' + name) +
      '&body=' + encodeURIComponent(text + '\n\n- ' + name + ' (' + email + ')');
  });
})();
