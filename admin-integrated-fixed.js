// ==================== SISTEMA ADMIN INTEGRADO ====================
// ==================== CONFIGURAÇÕES ====================
const ADMIN_USER = 'Anizzolavojesus';
const ADMIN_PASS = 'bucomaxilofacial2026';

// ==================== ELEMENTOS DOM ====================
let btnAdminMenu, adminDropdown, btnLogin;
let modalLoginAdmin, adminPanelIntegrated;
let adminLoginForm, adminErrorMessage;
let btnCloseAdmin, adminBlogForm, adminSuccessMessage, adminPostsList;
let adminImageUpload, adminPostImage, adminImagePreview;

// ==================== INICIALIZAR ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicializando sistema admin...');
  initializeElements();
  if (btnAdminMenu) {
    setupEventListeners();
    console.log('Sistema Admin Integrado carregado! 🚀');
  } else {
    console.error('Elementos do admin não encontrados!');
  }
});

function initializeElements() {
  btnAdminMenu = document.getElementById('btnAdminMenu');
  adminDropdown = document.getElementById('adminDropdown');
  btnLogin = document.getElementById('btnLogin');
  
  modalLoginAdmin = document.getElementById('modalLoginAdmin');
  adminPanelIntegrated = document.getElementById('adminPanelIntegrated');
  
  adminLoginForm = document.getElementById('adminLoginForm');
  adminErrorMessage = document.getElementById('adminErrorMessage');
  
  btnCloseAdmin = document.getElementById('btnCloseAdmin');
  adminBlogForm = document.getElementById('adminBlogForm');
  adminSuccessMessage = document.getElementById('adminSuccessMessage');
  adminPostsList = document.getElementById('adminPostsList');
  
  adminImageUpload = document.getElementById('adminImageUpload');
  adminPostImage = document.getElementById('adminPostImage');
  adminImagePreview = document.getElementById('adminImagePreview');
}

function setupEventListeners() {
  // ==================== DROPDOWN MENU ====================
  btnAdminMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    if (modalLoginAdmin) {
      modalLoginAdmin.classList.add('show');
    }
  });

  document.addEventListener('click', (e) => {
    if (adminDropdown && !adminDropdown.contains(e.target) && !btnAdminMenu.contains(e.target)) {
      adminDropdown.classList.remove('show');
    }
  });

  // ==================== ABRIR MODALS ====================
  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      adminDropdown.classList.remove('show');
      modalLoginAdmin.classList.add('show');
    });
  }

  // Garantir fechamento pelo botão X mesmo se outros scripts falharem
  document.querySelectorAll('.modal-close[data-close-modal]').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = button.getAttribute('data-close-modal');
      if (modalId) {
        closeModal(modalId);
      }
    });
  });

  // ==================== FECHAR MODALS ====================
  modalLoginAdmin.addEventListener('click', (e) => {
    if (e.target === modalLoginAdmin) {
      closeModal('modalLoginAdmin');
    }
  });

  // ==================== LOGIN ADMIN ====================
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      closeModal('modalLoginAdmin');
      openAdminPanel();
      adminLoginForm.reset();
    } else {
      adminErrorMessage.classList.add('show');
      setTimeout(() => {
        adminErrorMessage.classList.remove('show');
      }, 3000);
    }
  });

  // ==================== FECHAR PAINEL ====================
  btnCloseAdmin.addEventListener('click', () => {
    // Confirmar saída
    const confirmar = confirm('Deseja sair do painel administrativo?');
    if (confirmar) {
      adminPanelIntegrated.classList.remove('show');
      document.body.style.overflow = 'auto';
      document.body.classList.remove('admin-open');
      
      // Scroll suave para o topo
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // ==================== TABS ====================
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const tabContent = document.getElementById(`tab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`);
      if (tabContent) {
        tabContent.classList.add('active');
      }
      
      // Carregar avaliações quando clicar na aba
      if (targetTab === 'avaliacoes' && typeof loadAvaliacoesAdmin === 'function') {
        loadAvaliacoesAdmin('pendentes');
      }
    });
  });

  // ==================== UPLOAD DE IMAGEM ====================
  setupImageUpload();

  // ==================== FORMULÁRIO BLOG ====================
  setupBlogForm();
}

// ==================== FUNÇÕES ====================
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
  }
}

function openAdminPanel() {
  adminPanelIntegrated.classList.add('show');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('admin-open');
  loadAdminPosts();
}

function setupImageUpload() {
  if (!adminImageUpload || !adminPostImage || !adminImagePreview) return;

  adminImageUpload.addEventListener('click', () => {
    adminPostImage.click();
  });

  adminPostImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        adminImagePreview.src = e.target.result;
        adminImagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Drag and drop
  adminImageUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    adminImageUpload.style.borderColor = '#3498db';
  });

  adminImageUpload.addEventListener('dragleave', () => {
    adminImageUpload.style.borderColor = '#e0e0e0';
  });

  adminImageUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    adminImageUpload.style.borderColor = '#e0e0e0';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      adminPostImage.files = e.dataTransfer.files;
      const reader = new FileReader();
      reader.onload = (e) => {
        adminImagePreview.src = e.target.result;
        adminImagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
}

function setupBlogForm() {
  if (!adminBlogForm) return;

  adminBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const postId = document.getElementById('adminPostId').value;
    const title = document.getElementById('adminPostTitle').value;
    const excerpt = document.getElementById('adminPostExcerpt').value;
    const content = document.getElementById('adminPostContent').value;
    const category = document.getElementById('adminPostCategory').value;
    const image = adminImagePreview.src || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=400&fit=crop';
    
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    const post = {
      id: postId || Date.now().toString(),
      title,
      excerpt,
      content,
      category,
      image,
      date: new Date().toLocaleDateString('pt-BR'),
      timestamp: Date.now()
    };
    
    if (postId) {
      const index = posts.findIndex(p => p.id === postId);
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    adminSuccessMessage.classList.add('show');
    setTimeout(() => {
      adminSuccessMessage.classList.remove('show');
    }, 3000);
    
    adminBlogForm.reset();
    adminImagePreview.style.display = 'none';
    adminImagePreview.src = '';
    document.getElementById('adminPostId').value = '';
    document.getElementById('adminFormTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Novo Post';
    const btnCancel = document.getElementById('btnAdminCancel');
    if (btnCancel) btnCancel.style.display = 'none';
    
    loadAdminPosts();
    if (typeof loadBlogPosts === 'function') {
      loadBlogPosts();
    }
  });

  const btnCancel = document.getElementById('btnAdminCancel');
  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      adminBlogForm.reset();
      adminImagePreview.style.display = 'none';
      adminImagePreview.src = '';
      document.getElementById('adminPostId').value = '';
      document.getElementById('adminFormTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Novo Post';
      btnCancel.style.display = 'none';
    });
  }
}

function loadAdminPosts() {
  if (!adminPostsList) return;

  const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  
  if (posts.length === 0) {
    adminPostsList.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #7f8c8d;">
        <i class="fas fa-file-alt" style="font-size: 4rem; opacity: 0.3; margin-bottom: 20px; display: block;"></i>
        <p>Nenhum post publicado ainda.</p>
        <p>Crie seu primeiro post!</p>
      </div>
    `;
    return;
  }
  
  adminPostsList.innerHTML = posts.map(post => `
    <div class="admin-post-item">
      <div class="admin-post-info">
        <h4>${post.title}</h4>
        <p>${post.excerpt.substring(0, 80)}...</p>
        <span class="admin-post-date">
          <i class="fas fa-calendar"></i> ${post.date} | 
          <i class="fas fa-tag"></i> ${post.category}
        </span>
      </div>
      <div class="admin-post-actions">
        <button class="btn-edit-post" onclick="editAdminPost('${post.id}')">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete-post" onclick="deleteAdminPost('${post.id}')">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </div>
    </div>
  `).join('');
}

function editAdminPost(id) {
  const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const post = posts.find(p => p.id === id);
  if (!post) return;
  
  document.getElementById('adminPostId').value = post.id;
  document.getElementById('adminPostTitle').value = post.title;
  document.getElementById('adminPostExcerpt').value = post.excerpt;
  document.getElementById('adminPostContent').value = post.content;
  document.getElementById('adminPostCategory').value = post.category;
  
  const adminImagePreview = document.getElementById('adminImagePreview');
  if (post.image && !post.image.includes('placeholder') && adminImagePreview) {
    adminImagePreview.src = post.image;
    adminImagePreview.style.display = 'block';
  }
  
  document.getElementById('adminFormTitle').innerHTML = '<i class="fas fa-edit"></i> Editar Post';
  const btnCancel = document.getElementById('btnAdminCancel');
  if (btnCancel) btnCancel.style.display = 'block';
  
  const activeTab = document.querySelector('.admin-tab-content.active');
  if (activeTab) activeTab.scrollTop = 0;
}

function deleteAdminPost(id) {
  if (confirm('Tem certeza que deseja excluir este post?')) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    loadAdminPosts();
    
    if (typeof loadBlogPosts === 'function') {
      loadBlogPosts();
    }
  }
}
