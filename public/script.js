const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar MaterializeCSS
  M.AutoInit();

  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var tooltips = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(tooltips);

  // Testar conexão com API
  setTimeout(testAPIConnection, 1000);

  // Event listener para o formulário de lembrar senha
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const sendPasswordReminder = document.getElementById("sendPasswordReminder");

  // Event listener para submit do formulário (Enter)
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleForgotPassword();
    });
  }

  // Event listener para clique no botão
  if (sendPasswordReminder) {
    sendPasswordReminder.addEventListener("click", function (e) {
      e.preventDefault();
      handleForgotPassword();
    });
  }

  // Função centralizada para lidar com "Esqueci minha senha"
  function handleForgotPassword() {
    const email = document.getElementById("email").value.trim();

    if (!email) {
      showModalMessage("Por favor, preencha o campo email", "warning");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showModalMessage("Formato de email inválido", "error");
      return;
    }

    performForgotPassword(email);
  }

  // Limpar campo email quando modal for fechado
  const forgotPasswordModal = document.getElementById("forgotPasswordModal");
  if (forgotPasswordModal) {
    // Limpar campo email sempre que o modal for aberto
    forgotPasswordModal.addEventListener("click", function (e) {
      if (e.target === forgotPasswordModal) {
        const emailField = document.getElementById("email");
        if (emailField) {
          emailField.value = "";
        }
      }
    });
  }

  // Limpar campo email quando modal for aberto
  const forgotPasswordLink = document.querySelector(
    'a[href="#forgotPasswordModal"]'
  );
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function () {
      const emailField = document.getElementById("email");
      if (emailField) {
        emailField.value = "";
        M.updateTextFields(); // Atualizar labels do MaterializeCSS
      }
    });
  }
});

function showMessage(message, type = "info") {
  const statusMessage = document.getElementById("statusMessage");
  const messageContent = document.getElementById("message-area");

  messageContent.className = "card-panel";

  switch (type) {
    case "success":
      messageContent.classList.add("success-message");
      break;
    case "error":
      messageContent.classList.add("error-message");
      break;
    case "warning":
      messageContent.classList.add("warning-message");
      break;
    default:
      messageContent.classList.add("success-message");
  }

  messageContent.innerHTML = `
        <i class="material-icons left">${
          type === "success"
            ? "check_circle"
            : type === "error"
            ? "error"
            : "info"
        }</i>
        ${message}
    `;

  statusMessage.style.display = "block";

  setTimeout(() => {
    statusMessage.style.display = "none";
  }, 5000);
}

function clearMessage() {
  document.getElementById("statusMessage").style.display = "none";
}

function setLoading(loading = true) {
  const form = document.getElementById("loginForm");
  const button = form.querySelector('button[type="submit"]');

  if (loading) {
    form.classList.add("loading");
    // NÃO alterar texto do botão - melhor prática de UX
  } else {
    form.classList.remove("loading");
    // Botão sempre com texto original
  }
}

async function performLogin(username, password) {
  try {
    setLoading(true);
    clearMessage();

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    console.log(
      "Status:",
      response.status,
      "Mensagem:",
      data.message,
      "Username:",
      username
    );

    if (response.ok) {
      showMessage(data.message, "success");
      // Limpar campos após login bem-sucedido
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      M.updateTextFields(); // Atualizar labels do MaterializeCSS
      setLoading(false); // Reabilitar botão após sucesso
    } else if (response.status === 403) {
      showMessage("Usuário bloqueado após 3 tentativas inválidas", "error");
      // Limpar campos quando usuário estiver bloqueado
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      M.updateTextFields(); // Atualizar labels do MaterializeCSS
      setLoading(false); // Reabilitar botão após bloqueio
    } else if (response.status === 401) {
      showMessage("Usuário ou senha inválidos. Tente novamente.", "error");
      setLoading(false);
    } else {
      showMessage(data.message, "error");
      setLoading(false);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    showMessage("Erro de conexão. Verifique se a API está rodando.", "error");
    setLoading(false);
  }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showMessage("Por favor, preencha todos os campos.", "warning");
    return;
  }

  performLogin(username, password);
});

async function testAPIConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/api-docs`);
    if (response.ok) {
      console.log("API está rodando e acessível");
    } else {
      console.warn("API pode não estar rodando corretamente");
    }
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    showMessage(
      "API não está acessível. Certifique-se de que está rodando na porta 3000.",
      "warning"
    );
  }
}

// Nota: O bloqueio só é resetado reiniciando a API
// Conforme especificado no README do Desafio 3:
// "O desbloqueio do usuário só ocorre ao reiniciar o servidor, pois todos os dados são armazenados em memória."
// Para resetar: pare a API (Ctrl+C) e reinicie (node index.js)

// Função para exibir mensagens dentro do modal
function showModalMessage(message, type = "info") {
  const modal = document.getElementById("forgotPasswordModal");
  const modalContent = modal.querySelector(".modal-content");

  // Remover mensagem anterior se existir
  const existingMessage = modalContent.querySelector(".modal-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Criar nova mensagem seguindo o padrão da tela de login
  const messageDiv = document.createElement("div");
  messageDiv.className = "modal-message card-panel";

  // Aplicar classes CSS baseadas no tipo (igual ao showMessage)
  switch (type) {
    case "success":
      messageDiv.classList.add("success-message");
      break;
    case "error":
      messageDiv.classList.add("error-message");
      break;
    case "warning":
      messageDiv.classList.add("warning-message");
      break;
    default:
      messageDiv.classList.add("success-message");
  }

  messageDiv.style.marginTop = "15px";
  messageDiv.style.marginBottom = "15px";

  const icon =
    type === "success" ? "check_circle" : type === "error" ? "error" : "info";
  messageDiv.innerHTML = `
    <i class="material-icons left">${icon}</i>
    ${message}
  `;

  // Inserir antes do formulário (mais seguro)
  const form = modalContent.querySelector("#forgotPasswordForm");
  if (form) {
    modalContent.insertBefore(messageDiv, form.nextSibling);
  } else {
    // Fallback: inserir no final do modal
    modalContent.appendChild(messageDiv);
  }

  // Auto-remover após 5 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Função para lembrar senha
async function performForgotPassword(email) {
  try {
    setLoading(true);
    clearMessage();

    const response = await fetch(`${API_BASE_URL}/lembrar-senha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    console.log(
      "Status:",
      response.status,
      "Mensagem:",
      data.message,
      "Email:",
      email
    );

    if (response.ok) {
      showModalMessage("Email enviado com sucesso", "success");
      // Fechar modal após 2 segundos
      setTimeout(() => {
        const modal = M.Modal.getInstance(
          document.getElementById("forgotPasswordModal")
        );
        modal.close();
      }, 2000);
    } else if (response.status === 404) {
      showModalMessage("Email não encontrado", "error");
    } else {
      showModalMessage(data.message, "error");
    }
  } catch (error) {
    console.error("Erro ao enviar lembrete:", error);
    showModalMessage(
      "Erro de conexão. Verifique se a API está rodando.",
      "error"
    );
  } finally {
    setLoading(false);
  }
}
