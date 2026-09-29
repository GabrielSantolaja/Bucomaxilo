// ==================== CONFIGURAÇÕES ====================
const ADMIN_USER = 'Anizzolavojesus';
const ADMIN_PASS = 'bucomaxilofacial2026';

// ==================== ELEMENTOS DOM ====================
const loginContainer = document.getElementById('loginContainer');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const blogForm = document.getElementById('blogForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const postsList = document.getElementById('postsList');
const btnLogout = document.getElementById('btnLogout');
const btnCancel = document.getElementById('btnCancel');
const formTitle = document.getElementById('formTitle');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const passwordEyeIcon = document.getElementById('passwordEyeIcon');

const imageUpload = document.getElementById('imageUpload');
const postImage = document.getElementById('postImage');
const imagePreview = document.getElementById('imagePreview');

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  if (!passwordInput || !passwordEyeIcon) return;

  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  passwordEyeIcon.classList.toggle('fa-eye', !isHidden);
  passwordEyeIcon.classList.toggle('fa-eye-slash', isHidden);
}

if (togglePasswordBtn) {
  togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
}

// ==================== STORAGE ====================
let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
let editingPostId = null;

// ==================== LOGIN ====================
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem('adminLoggedIn', 'true');
    showAdminPanel();
  } else {
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
  }
});

// ==================== LOGOUT ====================
btnLogout.addEventListener('click', () => {
  localStorage.removeItem('adminLoggedIn');
  location.reload();
});

// ==================== VERIFICAR LOGIN ====================
function checkLogin() {
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (isLoggedIn === 'true') {
    showAdminPanel();
  }
}

function showAdminPanel() {
  loginContainer.style.display = 'none';
  adminPanel.style.display = 'block';
  loadPosts();
}

// ==================== UPLOAD DE IMAGEM ====================
imageUpload.addEventListener('click', () => {
  postImage.click();
});

postImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Drag and drop
imageUpload.addEventListener('dragover', (e) => {
  e.preventDefault();
  imageUpload.style.borderColor = '#3498db';
});

imageUpload.addEventListener('dragleave', () => {
  imageUpload.style.borderColor = '#ecf0f1';
});

imageUpload.addEventListener('drop', (e) => {
  e.preventDefault();
  imageUpload.style.borderColor = '#ecf0f1';
  
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    postImage.files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// ==================== SALVAR POST ====================
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const postId = document.getElementById('postId').value;
  const title = document.getElementById('postTitle').value;
  const excerpt = document.getElementById('postExcerpt').value;
  const content = document.getElementById('postContent').value;
  const category = document.getElementById('postCategory').value;
  const image = imagePreview.src || 'https://via.placeholder.com/800x400?text=Sem+Imagem';
  
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
    // Editar post existente
    const index = posts.findIndex(p => p.id === postId);
    posts[index] = post;
  } else {
    // Novo post
    posts.unshift(post);
  }
  
  // Salvar no localStorage
  localStorage.setItem('blogPosts', JSON.stringify(posts));
  
  // Mostrar mensagem de sucesso
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
  
  // Resetar formulário
  blogForm.reset();
  imagePreview.style.display = 'none';
  imagePreview.src = '';
  editingPostId = null;
  formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Novo Post';
  btnCancel.style.display = 'none';
  
  // Recarregar lista
  loadPosts();
});

// ==================== CANCELAR EDIÇÃO ====================
btnCancel.addEventListener('click', () => {
  blogForm.reset();
  imagePreview.style.display = 'none';
  imagePreview.src = '';
  editingPostId = null;
  document.getElementById('postId').value = '';
  formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Novo Post';
  btnCancel.style.display = 'none';
});

// ==================== CARREGAR POSTS ====================
function loadPosts() {
  posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  
  if (posts.length === 0) {
    postsList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-file-alt"></i>
        <p>Nenhum post publicado ainda.</p>
        <p>Crie seu primeiro post usando o formulário ao lado!</p>
      </div>
    `;
    return;
  }
  
  postsList.innerHTML = posts.map(post => `
    <div class="post-item">
      <div class="post-info">
        <h3>${post.title}</h3>
        <p>${post.excerpt.substring(0, 80)}...</p>
        <span class="post-date">
          <i class="fas fa-calendar"></i> ${post.date} | 
          <i class="fas fa-tag"></i> ${post.category}
        </span>
      </div>
      <div class="post-actions">
        <button class="btn-edit" onclick="editPost('${post.id}')">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete" onclick="deletePost('${post.id}')">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </div>
    </div>
  `).join('');
}

// ==================== EDITAR POST ====================
function editPost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  
  document.getElementById('postId').value = post.id;
  document.getElementById('postTitle').value = post.title;
  document.getElementById('postExcerpt').value = post.excerpt;
  document.getElementById('postContent').value = post.content;
  document.getElementById('postCategory').value = post.category;
  
  if (post.image && post.image !== 'https://via.placeholder.com/800x400?text=Sem+Imagem') {
    imagePreview.src = post.image;
    imagePreview.style.display = 'block';
  }
  
  formTitle.innerHTML = '<i class="fas fa-edit"></i> Editar Post';
  btnCancel.style.display = 'block';
  
  // Scroll para o formulário
  document.querySelector('.blog-form-container').scrollIntoView({ behavior: 'smooth' });
}

// ==================== DELETAR POST ====================
function deletePost(id) {
  if (confirm('Tem certeza que deseja excluir este post?')) {
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    loadPosts();
  }
}

// ==================== INICIALIZAR ====================
checkLogin();
