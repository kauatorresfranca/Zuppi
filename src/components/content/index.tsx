import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api } from "../../api";
import { useState, useEffect } from "react";

const Content = () => {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useApi<{
    posts: {
      created_at?: string;
      id: number;
      author: string;
      text: string;
      likes_count: number;
      reposts_count?: number;
      comments_count?: number;
      shares_count?: number;
    }[];
  }>("feed/", { posts: [] });

  const [userActions, setUserActions] = useState<Record<number, string[]>>({});
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserActions = async () => {
      if (posts && Array.isArray(posts.posts)) {
        const actionsMap: Record<number, string[]> = {};
        for (const post of posts.posts) {
          try {
            const response = await api.get(`posts/${post.id}/actions/`);
            const actions = response.data.actions;
            actionsMap[post.id] = Array.isArray(actions)
              ? actions.map((a: { action_type: string }) => a.action_type)
              : [];
          } catch (err) {
            console.error(`Erro ao carregar ações para post ${post.id}:`, err);
            actionsMap[post.id] = []; // Set empty array on error
          }
        }
        setUserActions(actionsMap);
      } else {
        console.log("Nenhum post válido para buscar ações:", posts);
        setUserActions({}); // Reset to empty object if no valid posts
      }
    };
    fetchUserActions();
  }, [posts]);

  const handlePostCreate = async (text: string) => {
    if (!text) return;
    setIsPosting(true);
    setPostError(null);
    try {
      await api.post("posts/create/", { text });
      refetch();
    } catch (err) {
      setPostError("Erro ao criar post");
      console.error("Erro handlePostCreate:", err);
    } finally {
      setIsPosting(false);
    }
  };

  const toggleAction = async (postId: number, actionType: string) => {
    try {
      const response = await api.get(`posts/${postId}/actions/`);
      const userActionsForPost = Array.isArray(response.data.actions) ? response.data.actions : [];
      const hasAction = userActionsForPost.some(
        (a: { action_type: string }) => a.action_type === actionType
      );

      if (hasAction) {
        await api.delete(`posts/${postId}/${actionType}/`);
      } else {
        await api.post(`posts/${postId}/${actionType}/`, {});
      }
      refetch();
    } catch (err) {
      console.error(`Erro ao executar ${actionType}:`, err);
    }
  };

  const handleLike = async (postId: number) => {
    await toggleAction(postId, "like");
  };
  const handleRepost = async (postId: number) => {
    await toggleAction(postId, "repost");
  };
  const handleComment = async (postId: number) => {
    await toggleAction(postId, "comment");
  };
  const handleShare = async (postId: number) => {
    await toggleAction(postId, "share");
  };

  if (loading)
    return (
      <S.Content>
        <p>Carregando...</p>
      </S.Content>
    );
  if (error)
    return (
      <S.Content>
        <p>Erro ao carregar feed: {error || "Tente novamente mais tarde"}</p>
      </S.Content>
    );

  return (
    <S.Content>
      <S.ContentHeader>
        <h2>Para você</h2>
      </S.ContentHeader>
      <S.NewPostField>
        <textarea
          placeholder="O que está acontecendo?"
          disabled={isPosting}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const text = (e.target as HTMLTextAreaElement).value.trim();
              if (text) handlePostCreate(text);
              (e.target as HTMLTextAreaElement).value = "";
            }
          }}
        />
        {postError && <S.ErrorMessage>{postError}</S.ErrorMessage>}
        <S.NewPostTools>
          <S.IconList>
            <i className="ri-image-2-fill"></i>
            <i className="ri-film-fill"></i>
            <i className="ri-file-list-3-line"></i>
            <i className="ri-emoji-sticker-fill"></i>
            <i className="ri-calendar-2-fill"></i>
            <i className="ri-map-pin-fill"></i>
          </S.IconList>
          <Button
            variant="primary"
            disabled={isPosting}
            onClick={() => {
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              const text = textarea.value.trim();
              if (text) handlePostCreate(text);
              textarea.value = "";
            }}
          >
            {isPosting ? "Enviando..." : "Zuppi"}
          </Button>
        </S.NewPostTools>
      </S.NewPostField>
      {Array.isArray(posts?.posts) &&
        posts.posts.map((post) => {
          const postActions = Array.isArray(userActions[post.id]) ? userActions[post.id] : [];
          return (
            <Post
              key={post.id}
              username={post.author}
              userid={post.author}
              likes={post.likes_count}
              reposts={post.reposts_count}
              comments={post.comments_count}
              shares={post.shares_count}
              createdAt={post.created_at}
              isLiked={postActions.includes("like") || false}
              isReposted={postActions.includes("repost") || false}
              isCommented={postActions.includes("comment") || false}
              isShared={postActions.includes("share") || false}
              onLike={() => handleLike(post.id)}
              onRepost={() => handleRepost(post.id)}
              onComment={() => handleComment(post.id)}
              onShare={() => handleShare(post.id)}
            >
              {post.text}
            </Post>
          );
        })}
    </S.Content>
  );
};

export default Content;