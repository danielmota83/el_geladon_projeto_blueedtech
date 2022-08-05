import './Home.css';
import PaletaLista from 'components/PaletaLista/PaletaLista';
import NavBar from 'components/NavBar/NavBar';
import AdicionaPaletaModal from 'components/AdicionaPaletaModal/AdicionaPaletaModal';
import { useState } from 'react';

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);
    const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();
  return (
    <div className="Home">
      <NavBar createPaleta={() => setCanShowAdicionaPaletaModal(true)} />

      <div className="Home__container">
        <PaletaLista paletaCriada={paletaParaAdicionar}/>
        {canShowAdicionaPaletaModal && (
          <AdicionaPaletaModal
            closeModal={() => setCanShowAdicionaPaletaModal(false)} onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
