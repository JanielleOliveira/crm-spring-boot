package com.jane.crm.controller;

import com.jane.crm.model.Contato;
import com.jane.crm.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contatos")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @GetMapping
    public List<Contato> listarContatos() {
        return contatoService.listarContatos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contato> buscarContatoPorId(@PathVariable Long id) {
        return contatoService.buscarContatoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Contato> salvarContato(@RequestBody Contato contato) {
        Contato novoContato = contatoService.salvarContato(contato);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoContato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contato> atualizarContato(@PathVariable Long id, @RequestBody Contato contato) {
        if (!contatoService.buscarContatoPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        contato.setId(id);
        Contato contatoAtualizado = contatoService.salvarContato(contato);
        return ResponseEntity.ok(contatoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarContato(@PathVariable Long id) {
        if (!contatoService.buscarContatoPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        contatoService.deletarContato(id);
        return ResponseEntity.noContent().build();
    }
}
