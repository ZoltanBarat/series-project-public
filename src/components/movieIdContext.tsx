import { createContext } from "react";

interface ContextProps {
    id: number;
    setId: React.Dispatch<React.SetStateAction<number>>;
}

//export const MovieIdContext = createContext<any>({} as any);

export const MovieIdContext = createContext({} as ContextProps);
