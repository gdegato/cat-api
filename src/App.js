import './App.css';
import Select from 'react-select'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const urlBreed = 'https://api.thecatapi.com/v1/breeds'

  //para buscar a lista de raças e escolher a raça no menu select
  const [breedList, setBreedList] = useState([]);
  const [breedSelected, setBreedSelected] = useState();

  async function pesquisar() {
    let response = await axios.get(urlBreed);
    setBreedList(response.data);
  }
  useEffect(() => {
    pesquisar()
  }, [])

  //para buscar as fotos e exibir na tela
  const [breedPic, setBreedPic] = useState([]);

  async function obterFoto() {

    const urlPics = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedSelected.id}&api_key=live_WYO9tggRuzfXrzcUauK3FdrhhhhmY7tUXefAgVMTzpFFFF6suyAo3PkXkGeAXWUS`

    let response = await axios.get(urlPics);
    let retorno = response.data?.map(item => {
      return item.url
    })
    setBreedPic(retorno);
  }

  useEffect(() => {
    obterFoto();
  }, [breedSelected])

  return (
    <div className="container-filter base-card">
      <h1>Choose a Breed!</h1>
      <form action="" className='filter-form'>
        <Select
          key="id"
          name="name"
          onChange={(e) => setBreedSelected(e)}
          options={breedList}
          placeholder="Breed"
          classNamePrefix="filter-select"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
        />
      </form>
      {
        breedSelected &&
        <div className='description-container'>
          <h2>{breedSelected?.name}</h2>
          <h4>{breedSelected?.temperament}</h4>
          <p>{breedSelected?.description}</p>
        </div>
      }

      <div className='catpic-container'>
        {breedPic &&
          <>
            <img src={breedPic} alt='' height="250px" />
            <button onClick={obterFoto}>Trocar a foto</button>
          </>
        }
      </div>
    </div>
  )

}

export default App;
