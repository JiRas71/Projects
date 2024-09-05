package jiras.DatabaseAppTest.models.DTO;

import jakarta.validation.constraints.NotBlank;

public class UzivatelDTO {

    private Long id;
    @NotBlank(message = "Zadejte jméno")
    private String jmeno;

    @NotBlank(message = "Zadejte příjmení")
    private String prijmeni;

    @NotBlank(message = "Zadejte e-mail")
    private String email;

    @NotBlank(message = "Zadejte telefon")
    private String telefon;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJmeno() {
        return jmeno;
    }

    public void setJmeno(String jmeno) {
        this.jmeno = jmeno;
    }

    public String getPrijmeni() {
        return prijmeni;
    }

    public void setPrijmeni(String prijmeni) {
        this.prijmeni = prijmeni;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
}
