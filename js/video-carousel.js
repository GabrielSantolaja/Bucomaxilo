document.addEventListener('DOMContentLoaded', () => {
  const getHookElement = (hookClass, fallbackId) => {
    return document.querySelector(`.${hookClass}`) || document.getElementById(fallbackId);
  };

  const escapeHtml = (value) => {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const renderVideos = (videoCarousel, videos) => {
    if (!Array.isArray(videos) || videos.length === 0) {
      return;
    }

    videoCarousel.innerHTML = videos.map((video) => {
      const videoId = escapeHtml(video.id);
      const title = escapeHtml(video.title || 'Conteúdo do canal do Dr. Anizzolavo');
      return `
        <article class="video-card">
          <div class="video-frame">
            <iframe src="https://www.youtube.com/embed/${videoId}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <h3>${title}</h3>
        </article>
      `;
    }).join('');
  };

  const loadVideosFromChannel = async (videoCarousel) => {
    try {
      const response = await fetch(`api/youtube-videos.php?max=30&t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const payload = await response.json();
      if (!payload || payload.success !== true || !Array.isArray(payload.videos)) {
        throw new Error('Payload inválido da API de vídeos');
      }

      renderVideos(videoCarousel, payload.videos);
    } catch (error) {
      console.warn('Falha ao atualizar vídeos automaticamente. Mantendo fallback estático.', error.message);
    }
  };

  const videoCarousel = getHookElement('js-video-carousel', 'videoCarousel');
  const videoPrev = getHookElement('js-video-prev', 'videoPrev');
  const videoNext = getHookElement('js-video-next', 'videoNext');

  if (videoCarousel) {
    loadVideosFromChannel(videoCarousel);
  }

  if (videoCarousel && videoPrev && videoNext) {
    const scrollAmount = () => {
      const card = videoCarousel.querySelector('.video-card');
      return card ? card.offsetWidth + 25 : 325;
    };

    const scrollPrev = () => {
      videoCarousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    };

    const scrollNext = () => {
      videoCarousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    };

    videoPrev.addEventListener('click', (event) => {
      event.preventDefault();
      scrollPrev();
    });

    videoNext.addEventListener('click', (event) => {
      event.preventDefault();
      scrollNext();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    videoCarousel.addEventListener('touchstart', (event) => {
      if (!event.touches || event.touches.length === 0) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    videoCarousel.addEventListener('touchend', (event) => {
      if (!event.changedTouches || event.changedTouches.length === 0) return;
      touchEndX = event.changedTouches[0].clientX;
      touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          scrollPrev();
        } else {
          scrollNext();
        }
      }
    }, { passive: true });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const beforeAfterVideo = document.querySelector('.js-before-after-video') || document.getElementById('beforeAfterVideoMain');

  if (!beforeAfterVideo) {
    return;
  }

  beforeAfterVideo.muted = true;
  beforeAfterVideo.loop = true;
  beforeAfterVideo.autoplay = true;
  beforeAfterVideo.playsInline = true;

  const tryPlay = () => {
    const playPromise = beforeAfterVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  beforeAfterVideo.addEventListener('loadedmetadata', () => {
    if (beforeAfterVideo.currentTime < 0.1) {
      beforeAfterVideo.currentTime = 0.1;
    }
  });

  beforeAfterVideo.addEventListener('loadeddata', () => {
    if (!beforeAfterVideo.videoWidth || !beforeAfterVideo.videoHeight) {
      tryPlay();
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = beforeAfterVideo.videoWidth;
    canvas.height = beforeAfterVideo.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(beforeAfterVideo, 0, 0, canvas.width, canvas.height);
      beforeAfterVideo.setAttribute('poster', canvas.toDataURL('image/jpeg', 0.85));
    }

    tryPlay();
  });

  beforeAfterVideo.addEventListener('canplay', tryPlay);
  tryPlay();
});
