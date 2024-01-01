import Header from '../Header';
import { LayoutProps } from '../../dto/dto';
import { Footer } from '../Footer';
import styles from './index.module.css';
import { useLocation } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();

    const getBackgroundClass = () => {
        switch (location.pathname) {
            case '/':
                return styles.background_home;
            case '/pokedex':
                return styles.background_pokedex;
            case '/legendaries':
                return styles.background_legendary;
            default:
                return '';
        }
    };

    return (
        <>
            <Header />
            <VStack minH={`calc(100vh - 93px)`} align={'center'} className={getBackgroundClass()}>
                {children}
                <Footer />

            </VStack>
        </>
    );
};

export default Layout;
