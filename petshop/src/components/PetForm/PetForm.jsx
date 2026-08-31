import { useState } from 'react'
import styles from './PetForm.module.css'

const ESPECIES = ['Cachorro', 'Gato', 'Ave', 'Outro']

const CAMPOS_INICIAIS = {
  nome: '',
  especie: '',
  raca: '',
  dataNascimento: '',
  peso: '',
  tutorNome: '',
  tutorTelefone: '',
}

function PetForm({ onCadastrar, enviando }) {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)

  function handleChange(evento) {
    const name = evento.target.name;
    const value = evento.target.value;

    const novosCampos = {
      nome: campos.nome,
      especie: campos.especie,
      raca: campos.raca,
      dataNascimento: campos.dataNascimento,
      peso: campos.peso,
      tutorNome: campos.tutorNome,
      tutorTelefone: campos.tutorTelefone,
    }

    novosCampos[name] = value;
    setCampos(novosCampos);
  }

  async function enviar(evento) {
    evento.preventDefault()

    const pet = {
      nome: campos.nome,
      especie: campos.especie,
      raca: campos.raca,
      dataNascimento: campos.dataNascimento,
      peso: campos.peso === '' ? null : Number(campos.peso),
      tutorNome: campos.tutorNome,
      tutorTelefone: campos.tutorTelefone,
    }

    const sucesso = await onCadastrar(pet)
    if (sucesso) {
      setCampos(CAMPOS_INICIAIS)
    }
  }

  return (
    <form className={styles.formulario} onSubmit={enviar}>
      <h1 className={styles.tituloSecao}>Cadastrar Pet</h1>
      <div className={styles.formColunas}>
        <div className={styles.dadosPet}>
          <h4 className={styles.subTituloSecao}>Dados do Pet</h4>

          <div className={styles.campo}>
            <label htmlFor="nome">Nome do Pet</label>
            <input type="text" id="nome" name="nome" placeholder="Ex: Thor" value={campos.nome} onChange={handleChange} required/>
          </div>

          <div className={styles.separar}>
            <div className={styles.campo}>
              <label htmlFor="especie">Espécie</label>
              <select id="especie" name="especie" value={campos.especie} onChange={handleChange} required>
                <option value="" disabled> Selecione uma espécie </option>
                {ESPECIES.map((especie) => (
                  <option key={especie} value={especie}> {especie} </option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label htmlFor="raca">Raça</label>
              <input type="text" id="raca" name="raca" placeholder="Ex: Golden Retriever" value={campos.raca} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.linhaMenor}>
            <div className={styles.campo}>
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input type="date" id="dataNascimento" name="dataNascimento" value={campos.dataNascimento} onChange={handleChange} required/>
            </div>

            <div className={styles.campo}>
              <label htmlFor="peso">Peso (kg)</label>
              <input type="number" id="peso" name="peso" placeholder="Ex: 12,50" value={campos.peso} onChange={handleChange} required/>
            </div>
          </div>
        </div>

        <div className={styles.dadosTutor}>
          <h4 className={styles.subTituloSecao}>Dados do Tutor</h4>

          <div className={styles.campo}>
            <label htmlFor="tutorNome">Nome do Tutor</label>
            <input type="text" id="tutorNome" name="tutorNome" placeholder="Ex: Paulo Gonçalves" value={campos.tutorNome} onChange={handleChange} required/>
          </div>

          <div className={styles.campo}>
            <label htmlFor="tutorTelefone">Telefone do Tutor</label>
            <input type="text" id="tutorTelefone" name="tutorTelefone" placeholder="Ex: (11) 99999-9999" value={campos.tutorTelefone} onChange={handleChange} required/>
          </div>
        </div>
      </div>

      <button type="submit" className={styles.botao} disabled={enviando}> {enviando ? 'Cadastrando...' : 'Cadastrar Pet'} </button>
    </form>
  );
}

export default PetForm;