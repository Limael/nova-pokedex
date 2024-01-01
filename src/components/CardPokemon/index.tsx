import styles from './index.module.css';
import { Card, Stack, Heading, CardBody, Image } from '@chakra-ui/react';
import { Badge } from '../Badge';

export type PokemonTypeProps = {
    name: string;
    attack: string;
    defense: string;
    types: string[];
    image: string;
    experience?: number;
    abilities?: string[];
    hp?: number;
    spAttack?: number;
    spDefense?: number;
    generation?: number;
    index?: number;


    onClick?: () => void;

};

export const CardPokemon = ({ name, attack, defense, types, image, onClick }: PokemonTypeProps) => {
    return (
        <Card
            className={styles.card}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            onClick={onClick}
            cursor="pointer"

        >
            <Stack>
                <CardBody className={styles.card_body}>
                    <Heading className={styles.pokemon_name}>{name}</Heading>

                    <article className={styles.stats_container}>
                        <article className={styles.stats_column}>
                            <div className={styles.stats}>
                                <span>{attack}</span>
                            </div>
                            <p>Attack</p>
                        </article>

                        <article className={styles.stats_column}>
                            <div className={styles.stats}>
                                <span>{defense}</span>
                            </div>
                            <p>Defense</p>
                        </article>
                    </article>

                    <article className={styles.types_container}>
                        {types.map((type, index) => (
                            <Badge key={index} type={[type]} />
                        ))}
                    </article>
                </CardBody>
            </Stack>

            <article className={types.includes('grass') || types.includes('bug') ? styles.pokemon_container_green :
                types.includes('stile') || types.includes('dark') || types.includes('rock') ? styles.pokemon_container_gray :
                    types.includes('water') || types.includes('ice') ? styles.pokemon_container_blue :
                        types.includes('fire') || types.includes('fighting') || types.includes('dragon') ? styles.pokemon_container_red :
                            types.includes('normal') || types.includes('gosth') ? styles.pokemon_container_light_blue :
                                types.includes('poison') || types.includes('psychic') || types.includes('fairy') || types.includes('ghost') ? styles.pokemon_container_purple :
                                    types.includes('ground') ? styles.pokemon_container_brown :
                                        styles.pokemon_container_yellow
            }>
                <Image className={styles.pokemon_container_img} src={image} alt={name} />
            </article>
        </Card>
    );
};