import styles from './PetTable.module.css'

function formatarData(data) {
  if (!data) return '-'
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarPeso(peso) {
  if (peso === null || peso === undefined || peso === '') return '-'
  return Number(peso).toFixed(2).replace('.', ',')
}

function PetTable({ pets, onEditar, onRemover }) {
  return (
    <section className={styles.formulario}>
      <h1 className={styles.titulo}>Pets Cadastrados</h1>

      <div className={styles.tabelaWrapper}>
        <table className={styles.tabela}>
          <thead>
            <tr className={styles.tabelaLinha}>
              <th>ID</th>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Raça</th>
              <th>Data Nasc.</th>
              <th>Peso</th>
              <th>Tutor</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr className={styles.tabelaDados} key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.nome}</td>
                <td>{pet.especie}</td>
                <td>{pet.raca}</td>
                <td>{formatarData(pet.dataNascimento)}</td>
                <td>{formatarPeso(pet.peso)}</td>
                <td>{pet.tutorNome}</td>
                <td>{pet.tutorTelefone}</td>
                <td>
                  <div className={styles.botoes}>
                    <button type="button" className={styles.botaoEditar} onClick={() => onEditar(pet)}>Editar</button>
                    <button type="button" className={styles.botaoExcluir} onClick={() => onRemover(pet.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PetTable;