import { Link as ChakraLink, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo.svg'
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isActive = (path: string) => {
        return location.pathname === path ? styles.navbar_item_selected : '';
    };

    return (
        <header className={styles.header}>
            <Link to="/"><img className={styles.img} src={logo} alt="Logo principal do sistema" /></Link>
            <article className={styles.navbar_container}>
                <ChakraLink as={Link} to="/" className={isActive('/')}>Home</ChakraLink>
                <ChakraLink as={Link} to="/pokedex" className={isActive('/pokedex')}>Pokédex</ChakraLink>
                <ChakraLink as={Link} to="/legendaries" className={isActive('/legendaries')}>Legendaries</ChakraLink>
                <ChakraLink href="https://pokeapi.co/docs/v2#pokemon-section" isExternal>Documentation</ChakraLink>

            </article>

            <article className={styles.hamburger_container}>
                <Menu>
                    <MenuButton>
                        <HamburgerIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <ChakraLink as={Link} to="/">Home</ChakraLink>
                        </MenuItem>
                        <MenuItem>
                            <ChakraLink as={Link} to="/pokedex">Pokédex</ChakraLink>
                        </MenuItem>
                        <MenuItem>
                            <ChakraLink as={Link} to="/legendaries">Legendaries</ChakraLink>
                        </MenuItem>
                        <MenuItem>
                            <ChakraLink href="https://pokeapi.co/docs/v2#pokemon-section" isExternal>Documentation</ChakraLink>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </article>
        </header>
    );
}

export default Header;
