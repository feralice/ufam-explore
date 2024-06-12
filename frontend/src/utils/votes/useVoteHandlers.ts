import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
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
  const userId = "1151183c-0355-43a2-91d0-f9f3453faf27";
  const upvotes = useSelector(
    (store: IStore) => store.post.upvotes[post.id] || 0
  );
  const downvotes = useSelector(
    (store: IStore) => store.post.downvotes[post.id] || 0
  );
  const userUpvotedPosts = useSelector(
    (store: IStore) => store.post.userUpvoted[post.id] || false
  );
  const userDownvotedPosts = useSelector(
    (store: IStore) => store.post.userDownvoted[post.id] || false
  );

  const [upvoted, setUpvoted] = useState(userUpvotedPosts);
  const [downvoted, setDownvoted] = useState(userDownvotedPosts);

  const votingRef = useRef(false);

  // Sincronize o estado local quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      setUpvoted(userUpvotedPosts);
      setDownvoted(userDownvotedPosts);
    }, [userUpvotedPosts, userDownvotedPosts])
  );

  const handleUpvote = async () => {
    if (votingRef.current) return;
    votingRef.current = true;

    const newUpvoted = !upvoted;
    const newDownvoted = false;
    const newUpvoteCount = newUpvoted ? upvotes + 1 : upvotes - 1;
    const newDownvoteCount = downvoted ? downvotes - 1 : downvotes;

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
      setUpvoted(!newUpvoted);
      setDownvoted(newDownvoted);
      setUpvote({ postId: post.id, userId, quantidade: upvotes });
      if (downvoted) {
        setDownvote({ postId: post.id, userId, quantidade: downvotes });
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
    const newDownvoteCount = newDownvoted ? downvotes + 1 : downvotes - 1;
    const newUpvoteCount = upvoted ? upvotes - 1 : upvotes;

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
      setDownvoted(!newDownvoted);
      setUpvoted(newUpvoted);
      setDownvote({ postId: post.id, userId, quantidade: downvotes });
      if (upvoted) {
        setUpvote({ postId: post.id, userId, quantidade: upvotes });
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
    currentUpvote: upvotes,
    currentDownvote: downvotes,
  };
};
