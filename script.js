document.addEventListener("DOMContentLoaded", function () {

  // === Toggle Thème ===
  const btn = document.getElementById("themeToggle");
  if (btn) {
    let theme = localStorage.getItem("theme") || "dark";
    applyTheme(theme);

    btn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme(theme);
      localStorage.setItem("theme", theme);
    });
  }

  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    if (btn) btn.textContent = mode === "dark" ? "☀️" : "🌙";
  }

  // === Modal Vidéo ===
  const videoModal = document.getElementById('videoModal');
  const videoModalIframe = document.getElementById('videoModalIframe');
  const videoModalClose = document.getElementById('videoModalClose');

  function getYoutubeId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
    return match ? match[1] : url;
  }

  document.querySelectorAll('.video-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = getYoutubeId(btn.dataset.yt);
      videoModalIframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      videoModal.classList.add('is-open');
    });
  });

  function closeVideoModal() {
    videoModal.classList.remove('is-open');
    setTimeout(() => { videoModalIframe.src = ''; }, 300);
  }

  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', e => {
      if (e.target === videoModal || e.target.classList.contains('video-modal__backdrop')) {
        closeVideoModal();
      }
    });
  }

  // === Bouton Retour en haut ===
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Fade-in au Scroll ===
  const fadeElements = document.querySelectorAll('.intro.card, #transformation, #techniques');

  function checkFadeIn() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  // Première vérification au chargement
  setTimeout(checkFadeIn, 300);

// === Bouton Voix ===
const voiceBtn = document.getElementById('voiceBtn');
const voiceAudio = document.getElementById('voiceAudio');

if (voiceBtn && voiceAudio) {
  voiceBtn.addEventListener('click', () => {
    if (voiceAudio.paused) {
      voiceAudio.currentTime = 0;
      voiceAudio.play();
      voiceBtn.textContent = '⏹ Stopper';
    } else {
      voiceAudio.pause();
      voiceAudio.currentTime = 0;
      voiceBtn.textContent = '🔊 Voix de Goku Black';
    }
  });

  voiceAudio.addEventListener('ended', () => {
    voiceBtn.textContent = '🔊 Voix de Goku Black';
  });
}

});