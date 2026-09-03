import { useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx';
import PetForm from './components/PetForm/PetForm.jsx';
import styles from './App.module.css'
import PetTable from './components/PetTable/PetTable.jsx';
import PetUpdate from './components/PetUpdate/PetUpdate.jsx';

const API_URL = 'http://localhost:8080/api/pets'

function App() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [petEditando, setPetEditando] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [tipoMensagem, setTipoMensagem] = useState(null);

  // GET
  async function carregarPets() {
    setCarregando(true)
    setErro(null)

    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)

      const dados = await resposta.json();
      setPets(dados)
    } catch (e) {
      setErro(e.message);
      setTipoMensagem('erro');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPets();
  }, [])

  // POST
  async function handleCadastrar(pet) {
    setEnviando(true);
    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet)
      })

      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.mensagem || 'Erro ao cadastrar pet');
      }
    
      setMensagem('Pet cadastrado com sucesso!');
      setTipoMensagem('sucesso');
      await carregarPets(); // atualiza a tabela com o novo pet
      return true;
    } catch (e) {
      setMensagem(`Erro: ${e.message}`);
      setTipoMensagem('erro');
      return false;
    }
    finally{
      setEnviando(false) 
    }
  }

  async function handleSalvarEdicao(id, pet) {
    setEnviando(true)
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet)
      })

      if (!resposta.ok) {
        const erro = await resposta.json()
        throw new Error(erro.mensagem || 'Erro ao salvar alterações')
      }

      setMensagem('Pet atualizado com sucesso!')
      setTipoMensagem('sucesso');
      setPetEditando(null)      // volta pro modo cadastro
      await carregarPets()      // atualiza a tabela com os dados novos
      return true
    } catch (e) {
      setMensagem(`Erro: ${e.message}`)
      setTipoMensagem('erro');
      return false
    }
    finally{
      setEnviando(false) 
    }
  }

  async function handleRemover(id) {
    try {
      const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)
      setMensagem('Pet removido com sucesso!')
      setTipoMensagem('sucesso');
      await carregarPets()
    } catch (e) {
      setMensagem(`Erro: ${e.message}`)
      setTipoMensagem('erro');
    }
  }

  function handleEditar(pet) {
    setPetEditando(pet);
  }

  function handleCancelarEdicao() {
    setPetEditando(null);
  }

  return (
    <div>
      <Header />

      {petEditando ? (
        <PetUpdate pet={petEditando} onCancelar={handleCancelarEdicao} onSalvar={handleSalvarEdicao} enviando={enviando} />
      ) : (
        <PetForm onCadastrar={handleCadastrar} enviando={enviando} />
      )}
      {mensagem && (
        <p className={`${styles.mensagem} ${tipoMensagem === 'erro' ? styles.erro : styles.sucesso}`}>
          {mensagem}
        </p>
      )}

      {erro && <p>Erro ao carregar pets: {erro}</p>}
      {carregando && <p>Carregando pets...</p>}

      <PetTable pets={pets} onEditar={handleEditar} enviando={enviando} onRemover={handleRemover} />
    </div>
  );
}

export default App;