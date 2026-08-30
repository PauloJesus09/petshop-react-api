package com.petshop.api.controller;

import com.petshop.api.model.Pet;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080"})
public class PetController {

    private static final List<String> ESPECIES_VALIDAS = Arrays.asList("Cachorro", "Gato", "Ave", "Outro");
    private final JdbcTemplate jdbcTemplate;

    public PetController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Busca todos os pets cadastrados
    @GetMapping
    public ResponseEntity<List<Pet>> listarPets() {

        String sql = "SELECT * FROM pets";
        List<Pet> pets = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Pet.class));
        return ResponseEntity.status(200).body(pets);
    }

    // Busca o pet cadastrado pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Pet> listarPetsId(@PathVariable String id) {

        List<Pet> listaPets = jdbcTemplate.query("SELECT * FROM pets WHERE id = ?",
                new BeanPropertyRowMapper<>(Pet.class), id);

        if (listaPets.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(listaPets.get(0));
    }

    // Cadastrar um pet
    @PostMapping
    public ResponseEntity<Pet> cadastrarPet(@RequestBody Pet pet) {

        if (!dadosValidos(pet)) {
            return ResponseEntity.status(400).build();
        }

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO pets (nome, especie, raca, dataNascimento, peso, tutorNome, tutorTelefone) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, pet.getNome());
            ps.setString(2, pet.getEspecie());
            ps.setString(3, pet.getRaca());
            ps.setObject(4, pet.getDataNascimento());
            ps.setDouble(5, pet.getPeso());
            ps.setString(6, pet.getTutorNome());
            ps.setString(7, pet.getTutorTelefone());
            return ps;
        }, keyHolder);

        Number chaveGerada = keyHolder.getKey();
        Integer id = chaveGerada != null ? chaveGerada.intValue() : null;
        pet.setId(id);

        return ResponseEntity.status(201).body(pet);
    }

    // Atualizar as informações de um pet
    @PutMapping("/{id}")
    public ResponseEntity<Pet> atualizarPet(@PathVariable Integer id, @RequestBody Pet pet) {

        if (!dadosValidos(pet)) {
            return ResponseEntity.status(400).build();
        }

        Integer listaPets = jdbcTemplate.update(
                "UPDATE pets SET nome = ?, especie = ?, raca = ?, dataNascimento = ?, peso = ?, " +
                        "tutorNome = ?, tutorTelefone = ? WHERE id = ?",
                pet.getNome(), pet.getEspecie(), pet.getRaca(), pet.getDataNascimento(),
                pet.getPeso(), pet.getTutorNome(), pet.getTutorTelefone(), id);

        if (listaPets == 0) {
            return ResponseEntity.status(404).build();
        }

        pet.setId(id);
        return ResponseEntity.status(200).body(pet);
    }

    // Deletar alguma informação cadastrada
    @DeleteMapping("/{id}")
    public ResponseEntity<Pet> deletarPet(@PathVariable Integer id) {

        String sqlExisteId = "SELECT COUNT(*) FROM pets WHERE id = ?";
        Integer countId = jdbcTemplate.queryForObject(sqlExisteId, Integer.class, id);
        Boolean existePorId = countId == 1;

        if (!existePorId) {
            return ResponseEntity.status(404).build();
        }

        jdbcTemplate.update("DELETE FROM pets WHERE id = ?", id);
        return ResponseEntity.status(204).build();
    }

    private boolean dadosValidos(Pet pet) {

        if (pet.getNome() == null || pet.getNome().isBlank()
                || pet.getNome().length() < 2 || pet.getNome().length() > 60) {
            return false;
        }

        if (pet.getEspecie() == null || pet.getEspecie().isBlank()
                || ESPECIES_VALIDAS.stream().noneMatch(e -> e.equalsIgnoreCase(pet.getEspecie().trim()))) {
            return false;
        }

        if (pet.getRaca() != null && !pet.getRaca().isBlank() && pet.getRaca().length() > 60) {
            return false;
        }

        if (pet.getDataNascimento() == null || pet.getDataNascimento().isAfter(LocalDate.now())) {
            return false;
        }

        if (pet.getPeso() == null || pet.getPeso() <= 0) {
            return false;
        }

        if (pet.getTutorNome() == null || pet.getTutorNome().isBlank()
                || pet.getTutorNome().length() < 2 || pet.getTutorNome().length() > 80) {
            return false;
        }

        if (pet.getTutorTelefone() == null || pet.getTutorTelefone().isBlank()) {
            return false;
        }

        String apenasNumeros = pet.getTutorTelefone().replaceAll("[^0-9]", "");
        return apenasNumeros.length() >= 10 && apenasNumeros.length() <= 11;
    }
}