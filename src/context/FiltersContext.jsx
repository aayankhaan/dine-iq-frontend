import { createContext, useContext, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';

export const EMPTY = {
  dateFrom: '', dateTo: '', location: '', item: '', category: '', segment: '',
  channel: '', promotion: '', cls: '', priceMin: '', priceMax: '', ratingMin: '', wasteMax: '',
};
const Ctx = createContext(null);

export function FiltersProvider({ children }) {
  const { user } = useAuth();
  const [filters, setFilters] = useState(EMPTY);
  const value = useMemo(() => {
    const scoped = user?.role === 'manager' ? { ...filters, location: user.restaurant_id || '' } : filters;
    const query = Object.fromEntries(Object.entries(scoped).filter(([, v]) => v !== '' && v != null));
    return {
      filters: scoped, query, activeCount: Object.keys(query).length,
      setFilter: (k, v) => setFilters((f) => ({ ...f, [k]: v })),
      reset: () => setFilters(EMPTY),
    };
  }, [filters, user]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useFilters = () => useContext(Ctx);
