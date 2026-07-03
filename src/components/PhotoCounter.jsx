import { createContext, useContext, useMemo, useReducer, useRef } from 'react';

const Ctx = createContext(null);

export function FotoProvider({ children }) {
  const registrados = useRef(new Set());
  const vistos = useRef(new Set());
  const [, force] = useReducer((x) => x + 1, 0);

  const api = useMemo(
    () => ({
      registrar(id) {
        if (!registrados.current.has(id)) {
          registrados.current.add(id);
          force();
        }
        return () => {
          registrados.current.delete(id);
          force();
        };
      },
      marcarVisto(id) {
        if (!vistos.current.has(id)) {
          vistos.current.add(id);
          force();
        }
      },
      get total() {
        return registrados.current.size;
      },
      get vistos() {
        return vistos.current.size;
      },
    }),
    []
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useFotoCounter() {
  return useContext(Ctx);
}
