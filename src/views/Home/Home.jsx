import './Home.css';
import PaletaLista from 'components/PaletaLista/PaletaLista';
import NavBar from 'components/NavBar/NavBar';
import AdicionaPaletaModal from 'components/AdicionaEditaPaletaModal/AdicionaPaletaModal';
import { useState } from 'react';
import { ActionMode } from "constants/index";

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);
  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  }

  const [paletaEditada, setPaletaEditada] = useState();

  const [paletaParaEditar, setPaletaParaEditar] = useState();
  const [paletaParaDeletar, setPaletaParaDeletar] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  }
  
    const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  }

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  }

  return (
    <div className="Home">
      <NavBar 
        mode = {modoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        updatePaleta={() =>  handleActions(ActionMode.ATUALIZAR)} />

      <div className="Home__container">
        <PaletaLista 
          mode = {modoAtual}
          paletaCriada={paletaParaAdicionar}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta} 
          paletaEditada={paletaEditada}/>

        {canShowAdicionaPaletaModal && (
          <AdicionaPaletaModal
          mode={modoAtual}
          paletaToUpdate={paletaParaEditar}
          closeModal={handleCloseModal}
          onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
