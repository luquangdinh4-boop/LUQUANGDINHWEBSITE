// small utility
    const $ = sel => document.querySelector(sel);
    const $$ = sel => Array.from(document.querySelectorAll(sel));

    // smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth', block:'start'});
        // set active
        document.querySelectorAll('nav.mainnav a').forEach(x=>x.classList.remove('active'));
        if(a.closest('nav')) a.classList.add('active');
      })
    });

    // cta handlers
    $('#ctaContact').addEventListener('click', ()=> $('#contact').scrollIntoView({behavior:'smooth'}));
    $('#ctaServices').addEventListener('click', ()=> $('#services').scrollIntoView({behavior:'smooth'}));
    $('#contactNowTop').addEventListener('click', ()=> $('#contact').scrollIntoView({behavior:'smooth'}));
    $('#moreServices').addEventListener('click', ()=> $('#services').scrollIntoView({behavior:'smooth'}));
    $('#floatingContactBtn').addEventListener('click', ()=> $('#contact').scrollIntoView({behavior:'smooth'}));

    // reveal on scroll
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('show');
      })
    },{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

    // contact form behaviour (client-only demo)
    $('#contactForm').addEventListener('submit', function(e){
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const status = $('#formStatus');
      btn.disabled = true; btn.textContent = 'Đang gửi...';
      // demo: simulate async send
      setTimeout(()=>{
        status.textContent = 'Yêu cầu đã được gửi. Chúng tôi sẽ liên hệ sớm nhất.';
        btn.disabled = false; btn.textContent = 'Gửi yêu cầu';
        this.reset();
      }, 900);
    });
    $('#btnReset').addEventListener('click', ()=> $('#contactForm').reset());

    // insert year
    document.getElementById('year').textContent = new Date().getFullYear();

    // keyboard accessibility: allow Enter on contactNowTop
    $('#contactNowTop').addEventListener('keyup', (e)=>{ if(e.key === 'Enter') $('#contact').scrollIntoView({behavior:'smooth'}) });

    // small active nav on scroll
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    window.addEventListener('scroll', ()=>{
      const pos = window.scrollY + 120;
      for(let s of sections){
        const top = s.offsetTop;
        const h = s.offsetHeight;
        const id = s.getAttribute('id');
        if(pos >= top && pos < top + h){
          document.querySelectorAll('nav.mainnav a').forEach(x=>x.classList.remove('active'));
          const link = document.querySelector(`nav.mainnav a[href="#${id}"]`);
          if(link) link.classList.add('active');
        }
      }
    });
    
    


  


let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Kéo xuống nhiều → ẩn header
    header.classList.add('header-hidden');
  } else {
    // Kéo lên → hiện header
    header.classList.remove('header-hidden');
  }

  // Nếu cuộn xuống chút xíu → thu nhỏ
  if (scrollTop > 50) {
    header.classList.add('header-small');
  } else {
    header.classList.remove('header-small');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});