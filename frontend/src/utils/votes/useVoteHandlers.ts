import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PostCardProps } from "../../components/post-card/types";
import {
  postDownvoteByPostId,
  postUpvoteByPostId,
  removeDownvoteByPostId,
  removeUpvoteByPostId,
} from "../../services/api";
import { IStore } from "../../store";
import { setDownvote, setUpvote } from "../../store/post/actions";

export const useVoteHandlers = (post: PostCardProps["post"]) => {
  // TODO: usar o userId do usuário logado quando implementar autenticação no front
  const userId = "1151183c-0355-43a2-91d0-f9f3453faf27";
  const upvotes = useSelector((store: IStore) => store.post.upvotes);
  const downvotes = useSelector((store: IStore) => store.post.downvotes);
  const userUpvotedPosts = useSelector(
    (store: IStore) => store.post.userUpvoted
  );
  const userDownvotedPosts = useSelector(
    (store: IStore) => store.post.userDownvoted
  );

  const currentUpvote = upvotes[post.id] || 0;
  const currentDownvote = downvotes[post.id] || 0;
  const [upvoted, setUpvoted] = useState(userUpvotedPosts[post.id] || false);
  const [downvoted, setDownvoted] = useState(
    userDownvotedPosts[post.id] || false
  );

  const votingRef = useRef(false);

  const handleUpvote = async () => {
    if (votingRef.current) return;
    votingRef.current = true;

    const newUpvoted = !upvoted;
    const newDownvoted = false;
    const newUpvoteCount = newUpvoted ? currentUpvote + 1 : currentUpvote - 1;
    const newDownvoteCount = downvoted ? currentDownvote - 1 : currentDownvote;

    setUpvoted(newUpvoted);
    setDownvoted(newDownvoted);
    setUpvote({ postId: post.id, userId, quantidade: newUpvoteCount });
    if (downvoted) {
      setDownvote({ postId: post.id, userId, quantidade: newDownvoteCount });
    }

    try {
      if (newUpvoted) {
        await postUpvoteByPostId(userId, post.id);
      } else {
        await removeUpvoteByPostId(userId, post.id);
      }
      if (downvoted) {
        await removeDownvoteByPostId(userId, post.id);
      }
    } catch (error) {
      console.error("Failed to update upvotes", error);
      // Revert the optimistic update on failure
      setUpvoted(!newUpvoted);
      setDownvoted(newDownvoted);
      setUpvote({ postId: post.id, userId, quantidade: currentUpvote });
      if (downvoted) {
        setDownvote({ postId: post.id, userId, quantidade: currentDownvote });
      }
    } finally {
      votingRef.current = false;
    }
  };

  const handleDownvote = async () => {
    if (votingRef.current) return;
    votingRef.current = true;

    const newDownvoted = !downvoted;
    const newUpvoted = false;
    const newDownvoteCount = newDownvoted
      ? currentDownvote + 1
      : currentDownvote - 1;
    const newUpvoteCount = upvoted ? currentUpvote - 1 : currentUpvote;

    setDownvoted(newDownvoted);
    setUpvoted(newUpvoted);
    setDownvote({ postId: post.id, userId, quantidade: newDownvoteCount });
    if (upvoted) {
      setUpvote({ postId: post.id, userId, quantidade: newUpvoteCount });
    }

    try {
      if (newDownvoted) {
        await postDownvoteByPostId(userId, post.id);
      } else {
        await removeDownvoteByPostId(userId, post.id);
      }
      if (upvoted) {
        await removeUpvoteByPostId(userId, post.id);
      }
    } catch (error) {
      console.error("Failed to update downvotes", error);
      // Revert the optimistic update on failure
      setDownvoted(!newDownvoted);
      setUpvoted(newUpvoted);
      setDownvote({ postId: post.id, userId, quantidade: currentDownvote });
      if (upvoted) {
        setUpvote({ postId: post.id, userId, quantidade: currentUpvote });
      }
    } finally {
      votingRef.current = false;
    }
  };

  return {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  };
};
