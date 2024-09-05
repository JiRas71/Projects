package jiras.DatabaseAppTest.controllers;

import jakarta.validation.Valid;
import jiras.DatabaseAppTest.data.entity.Uzivatel;
import jiras.DatabaseAppTest.models.DTO.UzivatelDTO;
import jiras.DatabaseAppTest.models.services.UzivatelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;

@Controller
@RequestMapping("/")
public class DatabaseController {

    @Autowired
    private UzivatelService uzivatelService;

    @GetMapping("index")
    public String index(Model model,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "id,asc") String sort,
                        @RequestParam(defaultValue = "") String hledej) {
        String[] sortParams = sort.split(",");
        Pageable pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.fromString(sortParams[1]), sortParams[0]));

        // Získání stránky uživatelů, zajištění, že uzivatelePage není null
        Page<Uzivatel> uzivatelePage = hledej.isEmpty()
                ? uzivatelService.getUzivatelePaged(pageable)
                : uzivatelService.searchUzivatele(hledej, pageable);

        // Ošetření pro případ, že stránka je null nebo prázdná
        if (uzivatelePage == null || uzivatelePage.isEmpty()) {
            uzivatelePage = Page.empty(pageable);
        }

        model.addAttribute("uzivatelePage", uzivatelePage);
        model.addAttribute("currentPage", page);
        model.addAttribute("sort", sort);
        model.addAttribute("hledej", hledej);

        return "index";
    }

    @GetMapping("createUzivatel")
    public String renderCreateFormUzivatel(@ModelAttribute UzivatelDTO uzivatelDTO) {
        return "createUzivatel";
    }

    @PostMapping("createUzivatel")
    public String saveOrUpdateUzivatel(@Valid @ModelAttribute UzivatelDTO uzivatelDTO,
                                       BindingResult result, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "createUzivatel";
        }

        Uzivatel uzivatel;
        if (uzivatelDTO.getId() != null && uzivatelDTO.getId() > 0) {
            // Označení původního záznamu jako neaktivního
            Uzivatel staryUzivatel = uzivatelService.getUzivatelById(uzivatelDTO.getId());
            staryUzivatel.setAktivni(false);
            uzivatelService.saveUzivatel(staryUzivatel);

            // Vytvoření nového záznamu s hodnotami z DTO
            uzivatel = new Uzivatel();
        } else {
            // Vytvoření nového záznamu
            uzivatel = new Uzivatel();
        }

        uzivatel.setJmeno(uzivatelDTO.getJmeno().trim().replaceAll("\\s+", ""));
        uzivatel.setPrijmeni(uzivatelDTO.getPrijmeni().trim().replaceAll("\\s+", "").toUpperCase());
        uzivatel.setEmail(uzivatelDTO.getEmail().trim().replaceAll("\\s+", ""));
        uzivatel.setTelefon(uzivatelDTO.getTelefon().trim());
        uzivatel.setAktivni(true);
        uzivatel.setVytvoren(LocalDate.now()); // Nastavení aktuálního data pro nový záznam

        uzivatelService.saveUzivatel(uzivatel);

        // Zjistíme celkový počet stránek po přidání nového uživatele
        int totalPages = uzivatelService.getTotalPages(5); // 5 je počet uživatelů na stránku

        String successMessage = uzivatelDTO.getId() != null && uzivatelDTO.getId() > 0
                ? "Údaje uživatele <strong>" + uzivatel.getJmeno().toUpperCase() + " " + uzivatel.getPrijmeni().toUpperCase() + "</strong> byly úspěšně upraveny."
                : "Nový uživatel <strong>" + uzivatel.getJmeno().toUpperCase() + " " + uzivatel.getPrijmeni().toUpperCase() + "</strong> byl úspěšně vytvořen.";

        redirectAttributes.addFlashAttribute("successMessage", successMessage);

        // Přesměrujeme na poslední stránku
        return "redirect:/index?page=" + (totalPages - 1);
    }

    @GetMapping("/updateUzivatel/{id}")
    public String renderUpdateFormUzivatel(@PathVariable Long id, Model model) {
        Uzivatel uzivatel = uzivatelService.getUzivatelById(id);
        UzivatelDTO uzivatelDTO = new UzivatelDTO();
        uzivatelDTO.setId(uzivatel.getId()); // Nastavení ID do DTO
        uzivatelDTO.setJmeno(uzivatel.getJmeno());
        uzivatelDTO.setPrijmeni(uzivatel.getPrijmeni().toUpperCase());
        uzivatelDTO.setEmail(uzivatel.getEmail());
        uzivatelDTO.setTelefon(uzivatel.getTelefon());

        model.addAttribute("uzivatelDTO", uzivatelDTO);
        return "createUzivatel";  // formulář s daty uživatele
    }

    @PostMapping("deleteUzivatel/{id}")
    public String deleteUzivatel(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        // Načtení uživatele z databáze podle ID
        Uzivatel uzivatel = uzivatelService.getUzivatelById(id);

        // Odstranění uživatele z databáze
        uzivatelService.deleteUzivatelById(id);

        // Přidání úspěšné zprávy do redirect atributů s tučným textem
        redirectAttributes.addFlashAttribute("successMessage",
                "Uživatel <strong>" + uzivatel.getJmeno().toUpperCase() + " " + uzivatel.getPrijmeni().toUpperCase() + "</strong> byl úspěšně odstraněn.");

        return "redirect:/index";
    }
}