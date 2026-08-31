import { useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx';
import PetForm from './components/PetForm/PetForm.jsx';
import styles from './App.module.css'
import PetTable from './components/PetTable/PetTable.jsx';

const API_URL = 'http://localhost:8080/api/pets'

function App() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState('');

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
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPets();
  }, [])

  // POST
  async function cadastrarPets(pet) {
    try {
      const resposta = await fetch("http://localhost:8080/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet)
      })

      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.mensagem || 'Erro ao cadastrar pet');
      }

      setMensagem('Pet cadastrado com sucesso!');
      await carregarPets(); // atualiza a tabela com o novo pet
      return true;
    } catch (e) {
      setMensagem(`Erro: ${e.message}`);
      return false;
    }
  }

  return (
    <div>
      <Header />

      {mensagem && <p>{mensagem}</p>}
      <PetForm onCadastrar={cadastrarPets} />

      {erro && <p>Erro ao carregar pets: {erro}</p>}
      {carregando && <p>Carregando pets...</p>}

      <PetTable pets={pets} />
    </div>
  );
}

export default App;