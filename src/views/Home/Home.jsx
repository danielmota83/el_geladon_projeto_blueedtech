import './Home.css';
import PaletaLista from 'components/PaletaLista/PaletaLista';
import NavBar from 'components/NavBar/NavBar';
import AdicionaPaletaModal from 'components/AdicionaEditaPaletaModal/AdicionaPaletaModal';
import { useState } from 'react';
import { ActionMode } from 'constants/index';
import DeletaPaletaModal from 'components/DeletaPaletaModal/DeletaPaletaModal';
import SacolaModal from "components/SacolaModal/SacolaModal";
import { SacolaService } from "services/SacolaService";

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);
  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [canOpenBag, setCanOpenBag] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const abrirSacola = async () => {
    const lista = JSON.parse(localStorage.getItem('sacola'));
    const sacola = lista.filter(i => i.quantidade > 0);
  
    await SacolaService.create(sacola)
  
    setCanOpenBag(true)
  }

  const [paletaEditada, setPaletaEditada] = useState();

  const [paletaParaEditar, setPaletaParaEditar] = useState();
  const [paletaParaDeletar, setPaletaParaDeletar] = useState();
  const [paletaRemovida, setPaletaRemovida] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  };

  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <NavBar
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
        openBag={abrirSacola}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
      />

      <div className="Home__container">
        <PaletaLista
          mode={modoAtual}
          paletaCriada={paletaParaAdicionar}
          deletePaleta={handleDeletePaleta}
          paletaRemovida={paletaRemovida}
          updatePaleta={handleUpdatePaleta}
          paletaEditada={paletaEditada}
        />

        {canShowAdicionaPaletaModal && (
          <AdicionaPaletaModal
            mode={modoAtual}
            paletaToUpdate={paletaParaEditar}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
          />
        )}

        {paletaParaDeletar && (
          <DeletaPaletaModal
            paletaParaDeletar={paletaParaDeletar}
            closeModal={handleCloseModal}
            onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
          />
        )}
        {
  canOpenBag &&
  <SacolaModal closeModal={() => setCanOpenBag(false)} />
}
      </div>
    </div>
  );
}

export default Home;
