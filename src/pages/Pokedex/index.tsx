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

    // useEffect é um Hook do React que executa efeitos colaterais (side effects) em componentes funcionais.
    // Ele é chamado após a montagem e atualização do componente.
    useEffect(() => {
        // Definição de uma função assíncrona para buscar Pokémons baseados nos tipos selecionados.
        const fetchPokemonsByType = async () => {
            // Verifica se existem tipos selecionados.
            if (selectedTypes.length > 0) {
                try {
                    // Fazendo chamadas simultâneas à API para cada tipo selecionado.
                    const responses = await Promise.all(
                        selectedTypes.map(typeName =>
                            axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
                        )
                    );

                    // Extrai os Pokémons de cada resposta e os combina em uma única lista.
                    const newPokemons = responses.flatMap(response =>
                        response.data.pokemon.map((poke: { pokemon: string; }) => poke.pokemon)
                    );

                    // Atualiza o estado 'pokemons' com a nova lista de Pokémons.
                    setPokemons(newPokemons);
                } catch (error) {
                    // Captura e loga quaisquer erros ocorridos durante a busca.
                    console.error("Erro ao buscar Pokémons", error);
                }
            } else {
                // Se nenhum tipo estiver selecionado, limpa a lista de Pokémons e redefine a contagem visível.
                setPokemons([]);
                setVisibleCount(9)
            }
        };

        // Executa a função fetchPokemonsByType.
        fetchPokemonsByType();
        // Especifica que o efeito deve ser executado novamente se 'selectedTypes' mudar.
    }, [selectedTypes]);


    // Função para lidar com a mudança de seleção de tipos de Pokémon.
    const handleTypeChange = (typeName: string) => {
        // Atualiza o estado 'selectedTypes' baseado no estado anterior 'prev'.
        setSelectedTypes(prev => {
            // Verifica se o 'typeName' já está incluído no estado anterior.
            if (prev.includes(typeName)) {
                // Se já estiver incluído, significa que o usuário quer desmarcar esse tipo.
                // Portanto, retorna um novo array filtrado sem o 'typeName'.
                return prev.filter(t => t !== typeName);
            } else {
                // Se não estiver incluído, significa que o usuário quer marcar esse tipo.
                // Portanto, retorna um novo array com o 'typeName' adicionado.
                return [...prev, typeName];
            }
        });
    };

    // 'loadMorePokemons' é uma função que aumenta o número de Pokémons visíveis.
    const loadMorePokemons = () => {
        // Atualiza o estado 'visibleCount', que controla quantos Pokémons são mostrados.
        // Incrementa o valor atual de 'visibleCount' em 9.
        setVisibleCount(current => current + 9);
    };

    // 'displayedPokemons' determina quais Pokémons devem ser exibidos com base no filtro de tipos.
    const displayedPokemons = selectedTypes.length > 0
        // Se há tipos selecionados (ou seja, 'selectedTypes' não está vazio),
        // filtra a lista 'pokemons' para incluir apenas os Pokémons até o 'visibleCount'.
        ? pokemons.slice(0, visibleCount)
        // Se não há tipos selecionados (ou seja, 'selectedTypes' está vazio),
        // usa a lista padrão de Pokémons ('defaultPokemons') e filtra ela até o 'visibleCount'.
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
