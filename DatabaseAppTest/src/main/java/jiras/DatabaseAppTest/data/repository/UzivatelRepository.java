package jiras.DatabaseAppTest.data.repository;

import jiras.DatabaseAppTest.data.entity.Uzivatel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UzivatelRepository extends JpaRepository<Uzivatel, Long> {
    List<Uzivatel> findAllByAktivniTrue();

    Page<Uzivatel> findAll(Pageable pageable);

    Page<Uzivatel> findAllByAktivniTrue(Pageable pageable);

    Page<Uzivatel> findByAktivniTrueAndJmenoContainingIgnoreCaseOrPrijmeniContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String jmeno, String prijmeni, String email, Pageable pageable);
}