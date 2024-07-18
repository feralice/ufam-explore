import { commentSlice } from '.';
import { store } from '..';
import { IComment } from './types';

export const addComment = (commentData: IComment) => {
  store.dispatch(commentSlice.actions.addComment(commentData));
};

export const setComments = (comments: IComment[]) => {
  store.dispatch(commentSlice.actions.setComments(comments));
};
