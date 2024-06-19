import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import {
  postDownvoteByPostId,
  postUpvoteByPostId,
  removeDownvoteByPostId,
  removeUpvoteByPostId,
} from "../../services/api";
import { IStore } from "../../store";
import {
  updateCurrentPost,
  updateDownvote,
  updateUpvote,
  updateUserDownvoted,
  updateUserUpvoted,
} from "../../store/post/actions";

export const useVoteHandlers = (postId: string) => {
  const userId = useSelector((state: IStore) => state.user.user.id);

  const upvotes = useSelector(
    (store: IStore) => store.post.upvotes[postId] || 0
  );
  const downvotes = useSelector(
    (store: IStore) => store.post.downvotes[postId] || 0
  );
  const userUpvoted = useSelector(
    (store: IStore) => store.post.userUpvoted[postId] || false
  );
  const userDownvoted = useSelector(
    (store: IStore) => store.post.userDownvoted[postId] || false
  );
  const currentPost = useSelector((store: IStore) => store.post.currentPost);

  const votingRef = useRef(false);

  const updateCurrentPostVotes = (
    newUpvotes: number,
    newDownvotes: number,
    upvoted: boolean,
    downvoted: boolean
  ) => {
    if (currentPost && currentPost.id === postId) {
      const updatedPost = {
        ...currentPost,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        userUpvoted: upvoted,
        userDownvoted: downvoted,
      };
      updateCurrentPost(updatedPost);
    }
  };

  const handleUpvote = useCallback(async () => {
    if (votingRef.current) return;
    votingRef.current = true;

    const newUpvoted = !userUpvoted;
    const newDownvoted = false;
    const newUpvoteCount = newUpvoted ? upvotes + 1 : upvotes - 1;
    const newDownvoteCount = userDownvoted ? downvotes - 1 : downvotes;

    updateUpvote({ postId, userId, quantidade: newUpvoteCount });
    updateUserUpvoted(postId, userId, newUpvoted);
    if (userDownvoted) {
      updateDownvote({ postId, userId, quantidade: newDownvoteCount });
      updateUserDownvoted(postId, userId, newDownvoted);
    }

    updateCurrentPostVotes(
      newUpvoteCount,
      newDownvoteCount,
      newUpvoted,
      newDownvoted
    );

    try {
      if (newUpvoted) {
        await postUpvoteByPostId(userId, postId);
      } else {
        await removeUpvoteByPostId(userId, postId);
      }
      if (userDownvoted) {
        await removeDownvoteByPostId(userId, postId);
      }
    } catch (error) {
      console.error("Failed to update upvotes", error);
      updateUpvote({ postId, userId, quantidade: upvotes });
      updateUserUpvoted(postId, userId, userUpvoted);
      if (userDownvoted) {
        updateDownvote({ postId, userId, quantidade: downvotes });
        updateUserDownvoted(postId, userId, userDownvoted);
      }
      updateCurrentPostVotes(upvotes, downvotes, userUpvoted, userDownvoted);
    } finally {
      votingRef.current = false;
    }
  }, [
    userUpvoted,
    userDownvoted,
    upvotes,
    downvotes,
    userId,
    postId,
    currentPost,
  ]);

  const handleDownvote = useCallback(async () => {
    if (votingRef.current) return;
    votingRef.current = true;

    const newDownvoted = !userDownvoted;
    const newUpvoted = false;
    const newDownvoteCount = newDownvoted ? downvotes + 1 : downvotes - 1;
    const newUpvoteCount = userUpvoted ? upvotes - 1 : upvotes;

    updateDownvote({ postId, userId, quantidade: newDownvoteCount });
    updateUserDownvoted(postId, userId, newDownvoted);
    if (userUpvoted) {
      updateUpvote({ postId, userId, quantidade: newUpvoteCount });
      updateUserUpvoted(postId, userId, newUpvoted);
    }

    updateCurrentPostVotes(
      newUpvoteCount,
      newDownvoteCount,
      newUpvoted,
      newDownvoted
    );

    try {
      if (newDownvoted) {
        await postDownvoteByPostId(userId, postId);
      } else {
        await removeDownvoteByPostId(userId, postId);
      }
      if (userUpvoted) {
        await removeUpvoteByPostId(userId, postId);
      }
    } catch (error) {
      console.error("Failed to update downvotes", error);
      updateDownvote({ postId, userId, quantidade: downvotes });
      updateUserDownvoted(postId, userId, userDownvoted);
      if (userUpvoted) {
        updateUpvote({ postId, userId, quantidade: upvotes });
        updateUserUpvoted(postId, userId, userUpvoted);
      }
      updateCurrentPostVotes(upvotes, downvotes, userUpvoted, userDownvoted);
    } finally {
      votingRef.current = false;
    }
  }, [
    userUpvoted,
    userDownvoted,
    upvotes,
    downvotes,
    userId,
    postId,
    currentPost,
  ]);

  return {
    handleUpvote,
    handleDownvote,
    upvoted: userUpvoted,
    downvoted: userDownvoted,
    currentUpvote: upvotes,
    currentDownvote: downvotes,
  };
};
