document.addEventListener('DOMContentLoaded', () => {
  const getHookElement = (hookClass, fallbackId) => {
    return document.querySelector(`.${hookClass}`) || document.getElementById(fallbackId);
  };

  const videoCarousel = getHookElement('js-video-carousel', 'videoCarousel');
  const videoPrev = getHookElement('js-video-prev', 'videoPrev');
  const videoNext = getHookElement('js-video-next', 'videoNext');

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
