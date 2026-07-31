/**
 * Typed Redux hooks.
 *
 * Use these everywhere instead of the plain `useDispatch` / `useSelector` from react-redux
 * so that TypeScript always knows the full store shape and dispatch type.
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector);
