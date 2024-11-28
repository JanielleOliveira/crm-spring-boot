package com.jane.crm.controller;

import com.jane.crm.model.Venda;
import com.jane.crm.repository.ClienteRepository;
import com.jane.crm.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendas")
public class VendaController {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Cadastrar nova venda
    @PostMapping
    public Venda cadastrarVenda(@RequestParam Long clienteId, @RequestBody Venda venda) {
        return clienteRepository.findById(clienteId).map(cliente -> {
            venda.setCliente(cliente);
            return vendaRepository.save(venda);
        }).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    // Consultar histórico de vendas de um cliente
    @GetMapping("/cliente/{clienteId}")
    public List<Venda> consultarVendas(@PathVariable Long clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }

    // Relatório de vendas por cliente
    @GetMapping("/relatorio/{clienteId}")
    public Double relatorioVendas(@PathVariable Long clienteId) {
        return vendaRepository.findByClienteId(clienteId).stream()
                .mapToDouble(Venda::getValor)
                .sum();
    }

    // Exclusão de venda por cliente
    @DeleteMapping("/cliente/{clienteId}/limpar")
    public ResponseEntity<String> deletarVendasPorCliente(@PathVariable Long clienteId) {
        List<Venda> vendas = vendaRepository.findByClienteId(clienteId);
        if (vendas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhuma venda encontrada para o cliente com ID " + clienteId);
        }

        vendaRepository.deleteAll(vendas);
        return ResponseEntity.ok("Todas as vendas do cliente com ID " + clienteId + " foram apagadas com sucesso!");
    }


}
