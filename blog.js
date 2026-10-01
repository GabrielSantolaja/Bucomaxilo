// ==================== CARREGAR POSTS DO BLOG ====================

const POSTS_API_URL = 'api/posts.php';

function getPostsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('blogPosts')) || [];
}

async function getPosts() {
  try {
    const response = await fetch(`${POSTS_API_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Falha ao carregar posts da API');

    const data = await response.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    return posts;
  } catch (error) {
    console.warn('Usando posts locais (fallback):', error.message);
    return getPostsFromLocalStorage();
  }
}

async function loadBlogPosts() {
  const posts = await getPosts();
  const blogGrid = document.querySelector('.blog-grid');
  const blogCtaLink = document.querySelector('.blog-cta .btn-secondary');
  const fallbackImage = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=400&fit=crop';
  
  if (!blogGrid) return;
  
  if (posts.length === 0) {
    // Card padrão quando ainda não há posts publicados
    blogGrid.innerHTML = `
      <article class="blog-card">
        <div class="blog-image" style="background-image: linear-gradient(135deg, #0a2540, #1e3a5f, #2c5282)"></div>
        <div class="blog-content">
          <h3>Em breve: blogs diários do Dr.</h3>
          <p>Estamos preparando conteúdos exclusivos sobre cirurgia bucomaxilofacial, sono, ATM e recuperação dos pacientes.</p>
        </div>
      </article>
    `;

    if (blogCtaLink) {
      blogCtaLink.textContent = 'Novos conteúdos em breve';
      blogCtaLink.href = '#blog';
    }

    return;
  }
  
  // Mostrar apenas os 6 posts mais recentes
  const recentPosts = posts.slice(0, 6);
  
  blogGrid.innerHTML = recentPosts.map(post => `
    <article class="blog-card" onclick="openPost('${post.id}')">
      <div class="blog-image">
        <img src="${post.image || fallbackImage}" alt="${post.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackImage}'">
      </div>
      <div class="blog-content">
        <div class="blog-meta">
          <span><i class="fas fa-calendar"></i> ${post.date}</span>
          <span><i class="fas fa-tag"></i> ${post.category}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="#" class="card-link" onclick="event.stopPropagation(); openPost('${post.id}')">Leia mais →</a>
      </div>
    </article>
  `).join('');

  if (blogCtaLink) {
    blogCtaLink.textContent = 'Ver todos os posts';
    blogCtaLink.href = '#blog';
  }
}

// ==================== ABRIR POST COMPLETO ====================
function openPost(id) {
  const posts = getPostsFromLocalStorage();
  const post = posts.find(p => p.id === id);
  const fallbackImage = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=400&fit=crop';
  
  if (!post) return;
  
  // Criar modal para exibir o post completo
  const modal = document.createElement('div');
  modal.className = 'post-modal';
  modal.innerHTML = `
    <div class="post-modal-overlay" onclick="closePostModal()"></div>
    <div class="post-modal-content">
      <button class="post-modal-close" onclick="closePostModal()">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="post-header">
        <img src="${post.image || fallbackImage}" alt="${post.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackImage}'">
        <div class="post-header-info">
          <span class="post-category">${post.category}</span>
          <h1>${post.title}</h1>
          <div class="post-meta">
            <span><i class="fas fa-calendar"></i> ${post.date}</span>
            <span><i class="fas fa-user"></i> Dr. Anizzolavo Jesus</span>
          </div>
        </div>
      </div>
      
      <div class="post-body">
        ${post.content.split('\n').map(p => `<p>${p}</p>`).join('')}
      </div>
      
      <div class="post-footer">
        <button onclick="sharePost('${post.id}')" class="btn-share">
          <i class="fab fa-whatsapp"></i> Compartilhar
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closePostModal() {
  const modal = document.querySelector('.post-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

function sharePost(id) {
  const posts = getPostsFromLocalStorage();
  const post = posts.find(p => p.id === id);
  
  if (!post) return;
  
  const text = `Confira este artigo: ${post.title}\n\n${post.excerpt}`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ==================== ESTILOS DO MODAL ====================
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  .post-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .post-modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
  }
  
  .post-modal-content {
    position: relative;
    background: white;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 15px;
    box-shadow: 0 10px 50px rgba(0,0,0,0.3);
  }
  
  .post-modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 10;
    transition: all 0.3s;
  }
  
  .post-modal-close:hover {
    background: #e74c3c;
    color: white;
    transform: rotate(90deg);
  }
  
  .post-header img {
    width: 100%;
    height: min(360px, 52vh);
    object-fit: contain;
    object-position: center;
    background: #f3f6fb;
  }
  
  .post-header-info {
    padding: 30px 40px;
  }
  
  .post-category {
    display: inline-block;
    padding: 5px 15px;
    background: #3498db;
    color: white;
    border-radius: 20px;
    font-size: 0.85rem;
    margin-bottom: 15px;
  }
  
  .post-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 15px;
    line-height: 1.3;
  }
  
  .post-meta {
    display: flex;
    gap: 20px;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  .post-meta i {
    margin-right: 5px;
  }
  
  .post-body {
    padding: 0 40px 40px;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #34495e;
  }
  
  .post-body p {
    margin-bottom: 20px;
  }
  
  .post-footer {
    padding: 30px 40px;
    border-top: 1px solid #ecf0f1;
    text-align: center;
  }
  
  .btn-share {
    padding: 12px 30px;
    background: #25d366;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .btn-share:hover {
    background: #128c7e;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  }
  
  .blog-meta {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    font-size: 0.85rem;
    color: #7f8c8d;
  }
  
  .blog-meta i {
    margin-right: 5px;
  }
  
  @media (max-width: 768px) {
    .post-header h1 {
      font-size: 1.8rem;
    }
    
    .post-header img {
      height: min(240px, 36vh);
    }
    
    .post-header-info,
    .post-body,
    .post-footer {
      padding: 20px;
    }
  }
`;
document.head.appendChild(modalStyles);

// ==================== INICIALIZAR ====================
document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
});

// Recarregar posts a cada 30 segundos (caso admin adicione novos)
setInterval(() => {
  loadBlogPosts();
}, 30000);
