package jiras.DatabaseAppTest.models.services;

import jiras.DatabaseAppTest.data.entity.Uzivatel;
import jiras.DatabaseAppTest.data.repository.UzivatelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UzivatelService {

    @Autowired
    private UzivatelRepository uzivatelRepository;

    public Uzivatel saveUzivatel(Uzivatel uzivatel) {
        return uzivatelRepository.save(uzivatel);
    }

    public Uzivatel getUzivatelById(Long id) {
        return uzivatelRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Neplatné ID uživatele: " + id));
    }

    public List<Uzivatel> getActiveUzivatele() {
        return uzivatelRepository.findAllByAktivniTrue();
    }

    public void deleteUzivatelById(Long id) {
        uzivatelRepository.deleteById(id);
    }

    public Page<Uzivatel> getUzivatelePaged(Pageable pageable) {
        return uzivatelRepository.findAllByAktivniTrue(pageable);
    }

    public int getTotalPages(int size) {
        long count = uzivatelRepository.count(); // Získáme celkový počet uživatelů
        return (int) Math.ceil((double) count / size); // Vypočítáme celkový počet stránek
    }

    public Page<Uzivatel> searchUzivatele(String keyword, Pageable pageable) {
        return uzivatelRepository.findByAktivniTrueAndJmenoContainingIgnoreCaseOrPrijmeniContainingIgnoreCaseOrEmailContainingIgnoreCase(
                keyword, keyword, keyword, pageable);
    }
}