import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ingredients {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}

interface compound {
    buns: ingredients;
    sauces: ingredients[];
    fillings: ingredients[];
}

interface ingredientsState {
    ingredients: ingredients[];
    compound: compound;
    ingredientsInfo: ingredients | null;
    order: number;
    isLoading: boolean;
    error: null | string;
}

const initialState: ingredientsState = {
    ingredients: [],
    compound: {
        buns: {
            calories: 0,
            carbohydrates: 0,
            fat: 0,
            image: '',
            image_large: '',
            image_mobile: '',
            name: '',
            price: 0,
            proteins: 0,
            type: '',
            __v: 0,
            _id: '',
        },
        sauces: [],
        fillings: [],
    },
    ingredientsInfo: {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: '',
        image_large: '',
        image_mobile: '',
        name: '',
        price: 0,
        proteins: 0,
        type: '',
        __v: 0,
        _id: '',
    },
    order: 0,
    isLoading: false,
    error: null,
};

const api = `https://norma.nomoreparties.space/api/ingredients`;

export const set = createAsyncThunk('data/setIngredients', async () => {
    try {
        const res = await fetch(api);
        if (!res.ok) {
            throw new Error('Ответ сети был не ok.');
        }
        const value = await res.json();
        if (value.success) {
            return value.data;
        }
    } catch (err) {
        throw new Error('Error.');
    }
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCompounds: (state, action) => {
            state.compound = action.payload;
            return state;
        },
        setIngredientsInfo: (state, action) => {
            state.ingredientsInfo = action.payload;
            return state;
        },
        removeIngredientsInfo: (state) => {
            state.ingredientsInfo = null;
            return state;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
            return state;
        },
    },
    extraReducers: {
        [set.pending.type]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [set.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.ingredients = action.payload;
            return state;
        },
        [set.rejected.type]: (state) => {
            state.error = 'Ошибка';
        },
    },
});

export const {
    setCompounds,
    setIngredientsInfo,
    removeIngredientsInfo,
    setOrder,
} = dataSlice.actions;

export default dataSlice.reducer;
