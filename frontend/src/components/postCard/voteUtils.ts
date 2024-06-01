import { AxiosResponse } from "axios";
import { IDownvoteResponse, IUpvoteResponse } from "../../services/types";

interface UpdateVotesProps {
  postId: string;
  userId: string;
  currentUpvote: number;
  currentDownvote: number;
  upvoted: boolean;
  downvoted: boolean;
  setUpvoted: (upvoted: boolean) => void;
  setDownvoted: (downvoted: boolean) => void;
  setUpvote: (voteData: {
    postId: string;
    userId: string;
    quantidade: number;
  }) => void;
  setDownvote: (voteData: {
    postId: string;
    userId: string;
    quantidade: number;
  }) => void;
  postUpvoteByPostId: (
    userId: string,
    postId: string
  ) => Promise<AxiosResponse<IUpvoteResponse>>;
  removeUpvoteByPostId: (
    userId: string,
    postId: string
  ) => Promise<AxiosResponse<void>>;
  postDownvoteByPostId: (
    userId: string,
    postId: string
  ) => Promise<AxiosResponse<IDownvoteResponse>>;
  removeDownvoteByPostId: (
    userId: string,
    postId: string
  ) => Promise<AxiosResponse<void>>;
  type: "upvote" | "downvote";
}

export const updateVotesOptimistically = async ({
  postId,
  userId,
  currentUpvote,
  currentDownvote,
  upvoted,
  downvoted,
  setUpvoted,
  setDownvoted,
  setUpvote,
  setDownvote,
  postUpvoteByPostId,
  removeUpvoteByPostId,
  postDownvoteByPostId,
  removeDownvoteByPostId,
  type,
}: UpdateVotesProps) => {
  if (type === "upvote") {
    if (upvoted) {
      setUpvote({ postId, userId, quantidade: currentUpvote - 1 });
      setUpvoted(false);
      await removeUpvoteByPostId(userId, postId);
    } else {
      if (downvoted) {
        setDownvote({ postId, userId, quantidade: currentDownvote - 1 });
        setDownvoted(false);
      }
      setUpvote({ postId, userId, quantidade: currentUpvote + 1 });
      setUpvoted(true);
      await postUpvoteByPostId(userId, postId);
    }
  } else if (type === "downvote") {
    if (downvoted) {
      setDownvote({ postId, userId, quantidade: currentDownvote - 1 });
      setDownvoted(false);
      await removeDownvoteByPostId(userId, postId);
    } else {
      if (upvoted) {
        setUpvote({ postId, userId, quantidade: currentUpvote - 1 });
        setUpvoted(false);
      }
      setDownvote({ postId, userId, quantidade: currentDownvote + 1 });
      setDownvoted(true);
      await postDownvoteByPostId(userId, postId);
    }
  }

  return {
    upvoted: type === "upvote" ? !upvoted : false,
    downvoted: type === "downvote" ? !downvoted : false,
  };
};
