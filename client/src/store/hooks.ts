import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/index';

// useAppDispatch — bản useDispatch có type AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useAppSelector — bản useSelector biết RootState có gì
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);