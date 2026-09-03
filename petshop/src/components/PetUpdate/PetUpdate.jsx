import { useState, useEffect } from 'react'
import styles from './PetUpdate.module.css'

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

function PetUpdate({ pet, onCancelar, onSalvar, enviando }) {
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

        const dadosAtualizados = {
            nome: campos.nome,
            especie: campos.especie,
            raca: campos.raca,
            dataNascimento: campos.dataNascimento,
            peso: campos.peso === '' ? null : Number(campos.peso),
            tutorNome: campos.tutorNome,
            tutorTelefone: campos.tutorTelefone,
        }

        const sucesso = await onSalvar(pet.id, dadosAtualizados)
        if (sucesso) {
            setCampos(CAMPOS_INICIAIS)
        }
    }

    useEffect(() => {
        if (pet) {
            setCampos({
            nome: pet.nome,
            especie: pet.especie,
            raca: pet.raca ?? '',
            dataNascimento: pet.dataNascimento,
            peso: pet.peso,
            tutorNome: pet.tutorNome,
            tutorTelefone: pet.tutorTelefone,
            })
        }
    }, [pet])

  return (
    <div>
        <form className={styles.formulario} onSubmit={enviar}>
        <h1 className={styles.tituloSecao}>Editar Pet #{pet.id}</h1>
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
        
        <div className={styles.agruparBotoes}>
            <button type="submit" className={styles.botao} disabled={enviando}> {enviando ? 'Cadastrando...' : 'Salvar Alterações'} </button>
            <button type="button" className={styles.botaoCancelar} onClick={onCancelar} disabled={enviando}>Cancelar</button>
        </div>
        </form>
    </div>
  );
}

export default PetUpdate;