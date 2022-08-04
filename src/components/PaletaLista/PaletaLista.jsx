import React, { useState, useEffect } from 'react';
import PalestaListaItem from 'components/PaletaListaItem/PaletaListaItem';
import { PaletaService } from 'services/PaletaService';
import './PaletaLista.css';

function PaletaLista() {

  const [paletas, setPaletas] = useState([]);

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

  const getLista = async () =>{
    const response = await PaletaService.getLista();
    setPaletas(response);
  }

  useEffect(() =>{getLista()},[]);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PalestaListaItem key={`PaletaListaItem-${index}`} paleta = {paleta} quantidadeSelecionada = {paletaSelecionada[index]} index = {index} onRemove={index => removerItem (index)} onAdd={index => adicionarItem(index)}/>
      ))}
    </div>
  );
}

export default PaletaLista;
