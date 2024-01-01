import { VStack, Input, Menu, MenuButton, Button, MenuList, MenuItem, Checkbox, SimpleGrid, Box, Stack, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { PokemonType } from '../../dto/dto';
import styles from './index.module.css';
import axios from 'axios';

export const Pokedex = () => {
    const [types, setTypes] = useState<PokemonType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [pokemons, setPokemons] = useState<PokemonType[]>([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await api.get('/type');
                setTypes(response.data.results);
            } catch (error) {
                console.error("Erro ao buscar dados da PokeAPI", error);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchPokemonsByType = async () => {
            try {
                // Supondo que a API retorne os Pokémons quando um tipo é passado
                const responses = await Promise.all(
                    selectedTypes.map(type => axios.get(`https://pokeapi.co/api/v2/type/${type}`))
                );

                const newPokemons = responses.flatMap(response => response.data.pokemon);
                setPokemons(newPokemons);
            } catch (error) {
                console.error("Erro ao buscar Pokémons", error);
            }
        };

        if (selectedTypes.length > 0) {
            fetchPokemonsByType();
        } else {
            setPokemons([]);
        }
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
                        {pokemons.map(pokemon => (
                            <Box key={pokemon.name}>
                                {pokemon.name}
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </VStack>
        </>
    );
};
