import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg';

export default function Logo() {
  return (
    <Link to='/' className='logo'>
      <img className='logo__image' src={logo} alt='Логотип' />
    </Link>
  );
}
