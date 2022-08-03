import React, { useState } from 'react';
import PalestaListaItem from 'components/PaletaListaItem/PaletaListaItem';
import { paletas } from 'mocks/paletas';
import './PaletaLista.css';

function PaletaLista() {
  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const adicionarItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PalestaListaItem key={`PaletaListaItem-${index}`} paleta = {paleta} quantidadeSelecionada = {paletaSelecionada[index]} index = {index}/>
      ))}
    </div>
  );
}

export default PaletaLista;
