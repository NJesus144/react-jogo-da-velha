import styles from "./Header.module.css";

import Title from "../title/Title";
import Subtitle from "../subtitle/Subtitle";
import Icon from '../../components/icon/Icon'

function Header() {
  return (
    <div className={styles.header}>
      <Title>Jogo da Velha</Title>
      <Subtitle>Criado por Nalbert</Subtitle>
      <div className={styles.iconContent}>
        <Icon iconName="github" link="https://github.com/NJesus144"/>
      </div>
    </div>
  );
}

export default Header;
