// usePokemonContext.ts
import { useContext } from 'react';
import { PokemonContext } from './PokemonContext';

export const usePokemonContext = () => useContext(PokemonContext);
