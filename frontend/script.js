document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "http://localhost:8080/api/clientes";

    // Função para listar clientes
    function listarClientes() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(clientes => {
                const clientesList = document.getElementById("clientes");
                clientesList.innerHTML = ''; // Limpa a lista
                clientes.forEach(cliente => {
                    const li = document.createElement("li");
                    li.textContent = `${cliente.nome} - ${cliente.email} - ${cliente.telefone}`;
                    clientesList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro ao listar clientes:', error));
    }

    // Função para cadastrar um cliente
    const formCliente = document.getElementById("formCliente");
    formCliente.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;

        const cliente = {
            nome,
            email,
            telefone
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        })
        .then(response => response.json())
        .then(novoCliente => {
            listarClientes(); // Atualiza a lista
            formCliente.reset(); // Limpa o formulário
        })
        .catch(error => console.error('Erro ao cadastrar cliente:', error));
    });

    // Carrega a lista de clientes quando a página carrega
    listarClientes();
});
