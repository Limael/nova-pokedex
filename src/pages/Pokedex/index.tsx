import { useEffect, useState } from 'react';
import {
    VStack, Input, Menu, MenuButton, Button, MenuList, MenuItem, Checkbox,
    SimpleGrid, Box, Stack, Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Pokemon, PokemonType } from '../../dto/dto';
import { usePokemonContext } from '../../Context/usePokemonContext';
import styles from './index.module.css';

export const Pokedex = () => {
    const [types, setTypes] = useState<PokemonType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const { pokemons: defaultPokemons } = usePokemonContext();
    const [visibleCount, setVisibleCount] = useState(9);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');
                setTypes(response.data.results);
            } catch (error) {
                console.error("Erro ao buscar dados da PokeAPI", error);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchPokemonsByType = async () => {
            if (selectedTypes.length > 0) {
                try {
                    const responses = await Promise.all(
                        selectedTypes.map(typeName =>
                            axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
                        )
                    );

                    const newPokemons = responses.flatMap(response =>
                        response.data.pokemon.map((poke: { pokemon: string; }) => poke.pokemon)
                    );
                    setPokemons(newPokemons);
                } catch (error) {
                    console.error("Erro ao buscar Pokémons", error);
                }
            } else {
                setPokemons([]);
                setVisibleCount(9)
            }
        };

        fetchPokemonsByType();
    }, [selectedTypes]);

    const handleTypeChange = (typeName: string) => {
        setSelectedTypes(prev => {
            if (prev.includes(typeName)) {
                return prev.filter(t => t !== typeName);
            } else {
                return [...prev, typeName];
            }
        });
    };

    const loadMorePokemons = () => {
        setVisibleCount(current => current + 9);
    };

    const displayedPokemons = selectedTypes.length > 0
        ? pokemons.slice(0, visibleCount)
        : defaultPokemons.slice(0, visibleCount);

    return (
        <>
            <VStack className={styles.section_container}>
                <Box className={styles.pokedex_container}>
                    <Text className={styles.pokemon_quantity}>
                        <strong>Pokemons</strong> for you to choose your favorite
                    </Text>

                    <Input className={styles.input} type="text" placeholder="Encontre o seu pokemon" />

                    <Stack className={styles.filter_section}>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Tipo
                            </MenuButton>
                            <MenuList maxHeight="15rem" overflowY="scroll">
                                {types.map(typeItem => (
                                    <MenuItem key={typeItem.name}>
                                        <Checkbox
                                            w={'100%'}
                                            textTransform={'capitalize'}
                                            isChecked={selectedTypes.includes(typeItem.name)}
                                            onChange={() => handleTypeChange(typeItem.name)}
                                        >
                                            {typeItem.name}
                                        </Checkbox>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Stack>

                    <SimpleGrid columns={[1, null, 2, 3]} spacing={[0, null, '34px']}>
                        {displayedPokemons.map(pokemon => (
                            <Box key={pokemon.name}>
                                {pokemon.name}
                            </Box>
                        ))}
                    </SimpleGrid>
                    {displayedPokemons.length < (selectedTypes.length > 0 ? pokemons.length : defaultPokemons.length) && (
                        <Button my={12} onClick={loadMorePokemons}>Carregar Mais</Button>
                    )}
                </Box>
            </VStack>
        </>
    );
};
