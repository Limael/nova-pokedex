// PokemonContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/api';
import { Pokemon } from '../dto/dto';


interface PokemonContextData {
    pokemons: Pokemon[];
    legendaryPokemons: Pokemon[];
    loading: boolean;
}

export const PokemonContext = createContext<PokemonContextData>({
    pokemons: [],
    legendaryPokemons: [],
    loading: true,
});

interface PokemonProviderProps {
    children: ReactNode;
}

const PokemonProvider = ({ children }: PokemonProviderProps) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [legendaryPokemons, setLegendaryPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPokemons = async () => {
            try {
                const response = await api.get('/pokemon?limit=150');
                setPokemons(response.data.results);
                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar dados da PokeAPI", error);
                setLoading(false);
            }
        };

        const fetchLegendaries = async () => {
            try {
                const response = await api.get('/egg-group/15');
                setLegendaryPokemons(response.data.results);
                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar dados da PokeAPI", error);
                setLoading(false);
            }
        }

        fetchPokemons();
        fetchLegendaries();
    }, []);

    return (
        <PokemonContext.Provider value={{ pokemons, loading, legendaryPokemons }}>
            {children}
        </PokemonContext.Provider>
    );
};

export default PokemonProvider;
