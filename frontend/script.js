document.addEventListener("DOMContentLoaded", function() {
     // URL do backend
    const apiUrlContatos = "http://localhost:8080/api/contatos";
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
                    li.innerHTML = `
                        ${cliente.nome} - ${cliente.email} - ${cliente.telefone}
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                        <button onclick="excluirCliente(${cliente.id})">Excluir</button>
                    `;
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
        .then(() => {
            listarClientes(); // Atualiza a lista
            formCliente.reset(); // Limpa o formulário
        })
        .catch(error => console.error('Erro ao cadastrar cliente:', error));
    });

    // Função para editar um cliente
    window.editarCliente = function(id) {
        const nome = prompt("Digite o novo nome:");
        const email = prompt("Digite o novo email:");
        const telefone = prompt("Digite o novo telefone:");

        const clienteAtualizado = {
            nome,
            email,
            telefone
        };

        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clienteAtualizado)
        })
        .then(() => listarClientes())
        .catch(error => console.error('Erro ao atualizar cliente:', error));
    };

    // Função para excluir um cliente
    window.excluirCliente = function(id) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
        .then(() => listarClientes())
        .catch(error => console.error('Erro ao excluir cliente:', error));
    };

    // Carrega a lista de clientes quando a página carrega
    listarClientes();

    // Função para listar Vendas
    function listarVendas(clienteId) {
        fetch(`/api/vendas/cliente/${clienteId}`)
            .then(response => response.json())
            .then(vendas => {
                const vendasList = document.getElementById("vendas-lista");
                vendasList.innerHTML = '';
                vendas.forEach(venda => {
                    const li = document.createElement("li");
                    li.textContent = `${venda.dataVenda}: ${venda.produto} - R$${venda.valor}`;
                    vendasList.appendChild(li);
                });
            });
    }
    // Função para Adicionar Venda
        document.getElementById("formVenda").addEventListener("submit", function(event) {
            event.preventDefault();
            const dataVenda = document.getElementById("dataVenda").value;
            const produto = document.getElementById("produto").value;
            const valor = parseFloat(document.getElementById("valorVenda").value);

            fetch(`/api/vendas?clienteId=${clienteId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataVenda, produto, valor })
            })
            .then(() => listarVendas(clienteId));
        });

        // Seletores
        const formRelatorio = document.getElementById('formRelatorio');
        const relatorioResultado = document.getElementById('relatorioResultado');

        // Função para gerar o relatório de vendas
        formRelatorio.addEventListener('submit', async (event) => {
            event.preventDefault();

            const clienteId = document.getElementById('clienteId').value;

            try {
                const response = await fetch(`http://localhost:8080/relatorio/${clienteId}`);
                if (response.ok) {
                    const totalVendas = await response.json();
                    relatorioResultado.innerHTML = `<p>Total de vendas para o cliente ${clienteId}: R$ ${totalVendas.toFixed(2)}</p>`;
                } else {
                    relatorioResultado.innerHTML = `<p>Erro: Cliente não encontrado ou não há vendas registradas.</p>`;
                }
            } catch (error) {
                console.error("Erro ao buscar o relatório de vendas:", error);
                relatorioResultado.innerHTML = `<p>Erro ao gerar o relatório.</p>`;
            }
        });

    // Função para listar contatos de um cliente
    function listarContatos(clienteId) {
        fetch(`${apiUrlContatos}/cliente/${clienteId}`)
            .then(response => response.json())
            .then(contatos => {
                const contatosList = document.getElementById("contatos");
                contatosList.innerHTML = ''; // Limpa a lista
                contatos.forEach(contato => {
                    const li = document.createElement("li");
                    li.textContent = `${contato.tipo}: ${contato.valor}`;
                    contatosList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro ao listar contatos:', error));
    }

    // Função para cadastrar um contato
    const formContato = document.getElementById("formContato");
    formContato.addEventListener("submit", function(event) {
        event.preventDefault();

        const clienteId = 1; // Substitua com o ID do cliente selecionado
        const tipo = document.getElementById("tipo").value;
        const valor = document.getElementById("valor").value;

        const contato = {
            tipo,
            valor
        };

        fetch(apiUrlContatos + `?clienteId=${clienteId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contato)
        })
        .then(response => response.json())
        .then(() => listarContatos(clienteId)) // Atualiza a lista de contatos
        .catch(error => console.error('Erro ao cadastrar contato:', error));
    });


});
