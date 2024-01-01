import styles from './index.module.css';
import banner from '../../assets/banner.png'
import banner_complete from '../../assets/BannerComplete.png'
import { Link } from 'react-router-dom';
import { HStack, Image, VStack } from '@chakra-ui/react';
const Home = () => {

    return (
        <>

            <HStack w={'100%'} className={styles.section_container}>
                <Image className={styles.image_responsive} src={banner_complete} alt="pikachu" />

                <VStack align={'start'} className={styles.information_container}>
                    <h1 className={styles.title}>
                        <strong>Find</strong> all your
                        favorite <strong>Pokemon</strong>
                    </h1>

                    <h2 className={styles.information}>
                        You can know the type of Pokemon, its strengths, disadvantages and abilities
                    </h2>
                    <button className={styles.button}>
                        <Link to="pokedex">See pokemons </ Link >
                    </button>

                </VStack>
                <Image className={styles.image} src={banner} alt="pikachu" />

            </HStack>
        </>
    )
}

export default Home
