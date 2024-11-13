package com.jane.crm.controller;

import com.jane.crm.model.Contato;
import com.jane.crm.repository.ContatoRepository;
import com.jane.crm.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contatos")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Cadastrar novo contato
    @PostMapping
    public Contato cadastrarContato(@RequestParam Long clienteId, @RequestBody Contato contato) {
        return clienteRepository.findById(clienteId).map(cliente -> {
            contato.setCliente(cliente);
            return contatoRepository.save(contato);
        }).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    // Listar todos os contatos de um cliente
    @GetMapping("/cliente/{clienteId}")
    public List<Contato> listarContatos(@PathVariable Long clienteId) {
        return contatoRepository.findAll().stream()
                .filter(contato -> contato.getCliente().getId().equals(clienteId))
                .toList();
    }

    // Atualizar um contato
    @PutMapping("/{id}")
    public Contato atualizarContato(@PathVariable Long id, @RequestBody Contato contatoAtualizado) {
        return contatoRepository.findById(id).map(contato -> {
            contato.setTipo(contatoAtualizado.getTipo());
            contato.setValor(contatoAtualizado.getValor());
            return contatoRepository.save(contato);
        }).orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

    // Excluir um contato
    @DeleteMapping("/{id}")
    public void excluirContato(@PathVariable Long id) {
        contatoRepository.deleteById(id);
    }
}
