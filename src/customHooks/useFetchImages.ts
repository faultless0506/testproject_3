// src/hooks/useFetchImages.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchDogImages } from '../store/slices/dogsSlice';
import { AppDispatch } from '../store/store';

export const useFetchImages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.dog.status);

  const handleMakeMagic = () => {
    dispatch(fetchDogImages());
  };

  return { handleMakeMagic, status };
};
