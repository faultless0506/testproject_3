import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRandomDogImage } from '../../services/dogApi';

interface DogState {
  images: {url: string,likes: number}[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DogState = {
  images: [],
  status: 'idle',
  error: null,
};

export const fetchDogImages =  createAsyncThunk('dogs/fetchDogImage', async () => {
  const images = await getRandomDogImage(10);
  return images.map((image) => ({ url: image, likes: 0 }));
});

const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
        state.images.push({ url: action.payload, likes: 0 });
    },
    likeImage: (state, action: PayloadAction<number>) => {
        state.images[action.payload].likes += 1;
      },
      deleteImage: (state, action: PayloadAction<number>) => {
        state.images.splice(action.payload, 1);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDogImages.fulfilled, (state, action: PayloadAction<{ url: string,likes: number}[]>) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchDogImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addImage, likeImage, deleteImage } = dogSlice.actions;
export default dogSlice.reducer;