const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();

  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var tooltips = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(tooltips);
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
    button.innerHTML =
      '<i class="material-icons left">hourglass_empty</i>Entrando...';
    button.disabled = true;
  } else {
    form.classList.remove("loading");
    button.innerHTML = 'Entrar<i class="material-icons right">send</i>';
    button.disabled = false;
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
    } else if (response.status === 403) {
      showMessage("Usuário bloqueado após 3 tentativas inválidas", "error");
    } else if (response.status === 401) {
      showMessage("Usuário ou senha inválidos. Tente novamente.", "error");
    } else {
      showMessage(data.message, "error");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    showMessage("Erro de conexão. Verifique se a API está rodando.", "error");
  } finally {
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

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(testAPIConnection, 1000);
});

async function resetAttempts() {
  try {
    const response = await fetch(`${API_BASE_URL}/testing/reset`, {
      method: "POST",
    });

    if (response.ok) {
      console.log("Tentativas resetadas com sucesso");
    }
  } catch (error) {
    console.error("Erro ao resetar tentativas:", error);
  }
}

window.resetAttempts = resetAttempts;
