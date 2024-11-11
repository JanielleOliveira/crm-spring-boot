package com.jane.crm.service;

import com.jane.crm.model.Contato;
import com.jane.crm.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    public List<Contato> listarContatos() {
        return contatoRepository.findAll();
    }

    public Optional<Contato> buscarContatoPorId(Long id) {
        return contatoRepository.findById(id);
    }

    public Contato salvarContato(Contato contato) {
        return contatoRepository.save(contato);
    }

    public void deletarContato(Long id) {
        contatoRepository.deleteById(id);
    }
}
