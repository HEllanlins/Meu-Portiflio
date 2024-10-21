const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const name = document.querySelector("#name");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");
const btnClearDB = document.querySelector("#btnClearDB");

const registradosCount = document.getElementById("registrados");
const confirmadosCount = document.getElementById("confirmados");
const canceladosCount = document.getElementById("cancelados");

let registros = [];

function clearDB() {
  // Remove password prompt and confirmation dialog
  registros = [];
  updateCounts(); // Update counts after clearing the database
  loadItems(); // Recarrega a tabela com itens vazios
}

btnNew.addEventListener('click', () => {
  if (descItem.value === "" || name.value === "" || type.value === "Selecione") {
    return alert("Preencha todos os campos!");
  }

  const horarioInput = document.querySelector("#horario"); 
  const valorInput = document.querySelector("#valor"); 

  const registro = {
    name: name.value,
    type: type.value,
    desc: descItem.value,
    horario: parseFloat(horarioInput.value), // Update this line
    valor: parseFloat(valorInput.value),
    situacao: "pendente"
  };

  registros.push(registro);

  loadItems();
  updateCounts(); // Update counts after adding a new record

  descItem.value = "";
  name.value = "";
  type.value = "Selecione";
  horarioInput.value = ""; 
  valorInput.value = ""; 
});

function confirmarRegistro(index) {
  const registro = registros[index];
  registro.situacao = "confirmado";
  loadItems();
  updateCounts(); // Update counts after confirming a record
}

function cancelarRegistro(index) {
  const registro = registros[index];
  registro.situacao = "cancelado";
  loadItems();
  updateCounts(); // Update counts after canceling a record
}

function editarRegistro(index) {
  const registro = registros[index];
  const modal = document.getElementById("editar-modal");
  const modalContent = document.getElementById("editar-modal-content");

  // Create the modal content
  modalContent.innerHTML = `
    <div class="div11">
      <label>Cliente:</label>
      <input type="text" value="${registro.name}" id="nome-editar">
    </div>
    <br>
    <div class="div11">
      <label>Tipo:</label>
      <select id="type-editar">
                    <option value="Selecione" ${registro.type === "Selecione" ? "selected" : ""}>Selecione</option>
                    <option value="Dedetização" ${registro.type === "Dedetização" ? "selected" : ""}>Dedetização</option>
                    <option value="Desinsetização" ${registro.type === "Desinsetização" ? "selected" : ""}>Desinsetização</option>
                    <option value="Desratização" ${registro.type === "Desratização" ? "selected" : ""}>Desratização</option>
                    <option value="Descupinização" ${registro.type === "Descupinização" ? "selected" : ""}>Descupinização</option>
                    <option value="Sanitização" ${registro.type === "Sanitização" ? "selected" : ""}>Sanitização</option>
                    <option value="Controle de Pragas" ${registro.type === "Controle de Pragas" ? "selected" : ""}>Controle de Pragas</option>
      </select>
    </div>
    <br>
    <div class="div11">
      <label class="label1">Descrição:</label>
      <textarea class="textarea" id="desc-editar">${registro.desc}</textarea>
    </div>
    <br>
    <div class="div11">
      <label>Horário:</label>
      <input type="number" value="${registro.horario}" id="horario-editar">
    </div>
    <br>
    <div class="div11">
      <label>Valor:</label>
      <input type="number" value="${registro.valor}" id="valor-editar">
    </div>
    <br>
    <div class="div11">
      <button onclick="salvarEdicao(${index})">Salvar</button>
    </div>
  `;

  // Show the modal window
  modal.style.display = "block";

  // Add an event listener to close the modal when the user clicks outside
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Add an event listener to close the modal when the user clicks the close button
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    modal.style.display = "none";
  });
}


function salvarEdicao(index) {
  const registro = registros[index];
  const nomeEditar = document.getElementById("nome-editar").value;
  const typeEditar = document.getElementById("type-editar").value;
  const descEditar = document.getElementById("desc-editar").value;
  const horarioEditar = parseFloat(document.getElementById("horario-editar").value);
  const valorEditar = parseFloat(document.getElementById("valor-editar").value);

  registro.name = nomeEditar;
  registro.type = typeEditar;
  registro.desc = descEditar;
  registro.horario = horarioEditar;
  registro.valor = valorEditar;

  // Atualize o array registros com as novas informações
  registros[index] = registro;

  loadItems();
  updateCounts(); // Update counts after saving edits

  // Close the modal window
  document.getElementById("editar-modal").style.display = "none";
}

function excluirRegistro(index) {
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Digite a senha para excluir o registro";

  const passwordForm = document.createElement("form");
  passwordForm.appendChild(passwordInput);

  const passwordDialog = document.createElement("div");
  passwordDialog.innerHTML = "Digite a senha para excluir o registro";
  passwordDialog.appendChild(passwordForm);

  passwordDialog.style.position = "absolute";
  passwordDialog.style.top = "50%";
  passwordDialog.style.left = "50%";
  passwordDialog.style.transform = "translate(-50%, -50%)";
  passwordDialog.style.background = "white";
  passwordDialog.style.padding = "20px";
  passwordDialog.style.border = "1px solid black";
  passwordDialog.style.borderRadius = "20px";
  passwordDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

  document.body.appendChild(passwordDialog);

  passwordInput.focus();

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password === "Gelins77") {
      // Open confirmation modal
      const confirmDialog = document.createElement("div");
      confirmDialog.innerHTML = `Você tem certeza que deseja realmente  excluir o registro ${registros[index].name}?`;
      confirmDialog.style.position = "absolute";
      confirmDialog.style.top = "50%";
      confirmDialog.style.left = "50%";
      confirmDialog.style.transform = "translate(-50%, -50%)";
      confirmDialog.style.background = "white";
      confirmDialog.style.padding = "20px";
      confirmDialog.style.border = "1px solid black";
      confirmDialog.style.borderRadius = "20px";
      confirmDialog.style.boxShadow = "0 0 10px gray";

      const confirmButton = document.createElement("button");
      confirmButton.style.margin = "10px"; /* Add margin to the buttons */
      confirmButton.textContent = "Sim, excluir";
      confirmButton.onclick = () => {
        registros.splice(index, 1);
        loadItems();
        updateCounts(); // Update counts after deleting a record
        document.body.removeChild(passwordDialog);
        document.body.removeChild(confirmDialog);
      };

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancelar";
      cancelButton.onclick = () => {
        document.body.removeChild(passwordDialog);
        document.body.removeChild(confirmDialog);
      };

      // Add margin to the buttons
      confirmButton.style.marginRight = "10px"; // Add 10px margin to the right of the confirm button
      cancelButton.style.marginLeft = "10px"; // Add 10px margin to the left of the cancel button
      

      confirmDialog.appendChild(confirmButton);
      confirmDialog.appendChild(cancelButton);

      document.body.appendChild(confirmDialog);
    } else {
      alert("Senha incorreta!");
    }
  });
}

function clearDB() {
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Digite a senha para limpar o banco de dados";

  const passwordForm = document.createElement("form");
  passwordForm.appendChild(passwordInput);

  const passwordDialog = document.createElement("div");
  passwordDialog.innerHTML = "Digite a senha para limpar o banco de dados";
  passwordDialog.appendChild(passwordForm);

  passwordDialog.style.position = "absolute";
  passwordDialog.style.top = "50%";
  passwordDialog.style.left = "50%";
  passwordDialog.style.transform = "translate(-50%, -50%)";
  passwordDialog.style.background = "white";
  passwordDialog.style.padding = "20px";
  passwordDialog.style.border = "1px solid black";
  passwordDialog.style.borderRadius = "10px";
  passwordDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

  document.body.appendChild(passwordDialog);

  passwordInput.focus();

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password === "Gelins77") {
      // Open confirmation modal
      const confirmDialog = document.createElement("div");
      confirmDialog.innerHTML = "Você tem certeza que deseja limpar o banco de dados? Esta ação é irreversível!";
      confirmDialog.style.position = "absolute";
      confirmDialog.style.top = "50%";
      confirmDialog.style.left = "50%";
      confirmDialog.style.transform = "translate(-50%, -50%)";
      confirmDialog.style.background = "white";
      confirmDialog.style.padding = "20px";
      confirmDialog.style.border = "1px solid black";
      confirmDialog.style.borderRadius = "10px";
      confirmDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

      const confirmButton = document.createElement("button");
      confirmButton.style.margin = "10px"; /* Add margin to the buttons */
      confirmButton.textContent = "Sim, limpar";
      confirmButton.onclick = () => {
        registros = [];
        loadItems(); // Recarrega a tabela com itens vazios
        updateCounts(); // Update counts after clearing the database
        document.body.removeChild(passwordDialog);
        document.body.removeChild(confirmDialog);
      };

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancelar";
      cancelButton.onclick = () => {
        document.body.removeChild(passwordDialog);
        document.body.removeChild(confirmDialog);
      };

      // Add margin to the buttons
      confirmButton.style.marginRight = "10px"; // Add 10px margin to the right of the confirm button
      cancelButton.style.marginLeft = "10px"; // Add 10px margin to the left of the cancel button

      confirmDialog.appendChild(confirmButton);
      confirmDialog.appendChild(cancelButton);

      document.body.appendChild(confirmDialog);
    } else {
      alert("Senha incorreta!");
    }
  });
}

function insertItem(registro, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${registro.name}</td>
    <td>${registro.type}</td>
    <td>${registro.desc}</td>
    <td>${registro.horario ? registro.horario + " h" : "A Preencher"}</td>
    <td>${registro.valor ? "R$ " + registro.valor.toFixed(2) : "A Preencher"}</td>
    <td>${registro.situacao}</td>
    <td class="columnAction">
      <button class="btn-confirmar" onclick="confirmarRegistro(${index})">Confirmar</button>
      <button class="btn-cancelar" onclick="cancelarRegistro(${index})">Cancelar</button>
      <button class="btn-editar" onclick="editarRegistro(${index})">Editar</button>
      <button class="btn-excluir" onclick="excluirRegistro(${index})">Excluir</button>
    </td>
  `;

  tbody.appendChild(tr);
}

function loadItems() {
  tbody.innerHTML = "";
  registros.forEach((registro, index) => {
    insertItem(registro, index);
  });
}

// Update the counts of registered, confirmed, and canceled items
function updateCounts() {
  const registrados = registros.filter((registro) => registro.situacao === "pendente").length;
  const confirmados = registros.filter((registro) => registro.situacao === "confirmado").length;
  const cancelados = registros.filter((registro) => registro.situacao === "cancelado").length;

  registradosCount.textContent = registrados;
  confirmadosCount.textContent = confirmados;
  canceladosCount.textContent = cancelados;
}

// Add event listener to clear DB button
btnClearDB.addEventListener("click", clearDB);

// Add event listener to load items on page load
window.addEventListener("load", loadItems);

// Call updateCounts to initialize the counts when the page loads
updateCounts(); 