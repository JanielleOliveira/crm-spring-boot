package com.jane.crm.repository;

import com.jane.crm.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    // Métodos personalizados para Contato, se necessário
}

