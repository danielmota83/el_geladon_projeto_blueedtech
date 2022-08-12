import './NavBar.css';
import sacola from 'assets/icons/sacola.svg';
import add from 'assets/icons/add.svg';
import logo from 'assets/logo.svg';
import atualizar from 'assets/icons/atualizar.svg';
import { ActionMode } from "constants/index";

function NavBar ({ createPaleta, updatePaleta, mode }) {
  return (
    <div className="Home__header Header">

      

      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo El Geladon"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> El Geladon </span>
        </div>
        <div className="Header__opcoes Opcoes">
        <button
            type="button"
            className={`Opcoes__paleta Paleta ${
              mode === ActionMode.ATUALIZAR && "Paleta--ativa"
            }`}
            onClick={() => updatePaleta()}
          >
            <img
              src={atualizar}
              width="40px"
              className="Paleta__icone"
              alt="Editar paleta"
            />
          </button>
          <button
            type="button"
            className="Opcoes__paleta Paleta"
            onClick={() => createPaleta()}
          >
            <img
              src={add}
              width="40px"
              className="Paleta__icone"
              alt="Adicionar Paleta"
            />
          </button>
          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              width="40px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
