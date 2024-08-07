import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentInitialState } from './state';
import { IComment } from './types';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: CommentInitialState,
  reducers: {
    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments.push(action.payload);
    },
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
});
