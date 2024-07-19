import { commentSlice } from '.';
import { store } from '..';
import { IComment } from './types';

export const addComment = (commentData: IComment) => {
  store.dispatch(commentSlice.actions.addComment(commentData));
};

export const setComments = (comments: IComment[]) => {
  store.dispatch(commentSlice.actions.setComments(comments));
};

export const clearComments = () => {
  store.dispatch(commentSlice.actions.clearComments());
};

export const removeComment = (commentId: string) => {
  store.dispatch(commentSlice.actions.removeComment(commentId));
};
