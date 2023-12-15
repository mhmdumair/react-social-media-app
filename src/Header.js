import React, { useContext } from 'react'
import {FaTabletAlt,FaLaptop,FaMobileAlt} from "react-icons/fa"
// import { fromUnixTime } from 'date-fns';
import DataContext from './contaxt/DataContaxt';

const Header = ({title}) => {
  const {width} = useContext(DataContext)
  return (
    <header className='Header'>
      <h3>{title}</h3>
      {width < 768 ? (<FaMobileAlt />) : width < 992 ? (<FaTabletAlt />) : (<FaLaptop />)}
    </header>
  )
}
Header.defaultProps = {
  title: 'Umair Social Media'
};

export default Header