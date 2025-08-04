import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api, setCsrfToken } from "../../api";
import { useState, useEffect } from "react";

interface PostData {
  created_at?: string;
  id: number;
  author: string;
  text: string;
  likes_count: number;
  reposts_count?: number;
  comments_count?: number;
  shares_count?: number;
}

const Content = () => {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useApi<{ posts: PostData[] }>("feed/", { posts: [] });

  const [userActions, setUserActions] = useState<Record<number, string[]>>({});
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [isActionsLoading, setIsActionsLoading] = useState(false);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await api.get<{ csrfToken: string }>("/get_csrf_token/", {
          withCredentials: true,
        });
        if (response.data.csrfToken) {
          setCsrfToken(response.data.csrfToken);
          console.log("CSRF token obtido no Content.tsx");
        }
      } catch (error) {
        console.error("Falha ao obter o token CSRF no Content.tsx:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    const fetchUserActions = async () => {
      if (!posts || !Array.isArray(posts.posts)) {
        console.log("Nenhum post válido para buscar ações:", posts);
        setUserActions({});
        setIsActionsLoading(false);
        return;
      }

      setIsActionsLoading(true);
      const actionsMap: Record<number, string[]> = {};
      try {
        for (const post of posts.posts) {
          console.debug(`Buscando ações para post ${post.id}`);
          try {
            const response = await api.get<{ actions: { action_type: string }[] }>(
              `posts/${post.id}/actions/`
            );
            console.debug(`Resposta para post ${post.id}:`, response.data);
            actionsMap[post.id] = Array.isArray(response.data.actions)
              ? response.data.actions.map((a) => a.action_type)
              : [];
          } catch (err) {
            console.error(`Erro ao carregar ações para post ${post.id}:`, err);
            actionsMap[post.id] = [];
          }
        }
        console.debug("Actions map atualizado:", actionsMap);
        setUserActions(actionsMap);
      } catch (err) {
        console.error("Erro geral em fetchUserActions:", err);
      } finally {
        setIsActionsLoading(false);
      }
    };
    fetchUserActions();
  }, [posts]);

  const handlePostCreate = async (text: string) => {
    if (!text) return;
    setIsPosting(true);
    setPostError(null);
    try {
      console.log("Enviando post...");
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
    console.log(`toggleAction chamado para postId: ${postId}, actionType: ${actionType}`);
    try {
      const response = await api.get<{ actions: { action_type: string }[] }>(
        `posts/${postId}/actions/`
      );
      const userActionsForPost = Array.isArray(response.data.actions)
        ? response.data.actions
        : [];
      const hasAction = userActionsForPost.some((a) => a.action_type === actionType);
      console.log(`hasAction para ${actionType}:`, hasAction);

      if (hasAction) {
        await api.delete(`posts/${postId}/${actionType}/`);
        console.log(`Removido ${actionType} para o post ${postId}`);
      } else {
        await api.post(`posts/${postId}/${actionType}/`, {});
        console.log(`Adicionado ${actionType} para o post ${postId}`);
      }
      refetch();
    } catch (err) {
      console.error(`Erro ao executar ${actionType}:`, err);
    }
  };

  const handleLike = async (postId: number) => {
    console.log("handleLike chamado para postId:", postId);
    await toggleAction(postId, "like");
  };
  const handleRepost = async (postId: number) => {
    console.log("handleRepost chamado para postId:", postId);
    await toggleAction(postId, "repost");
  };
  const handleComment = async (postId: number) => {
    console.log("handleComment chamado para postId:", postId);
    await toggleAction(postId, "comment");
  };
  const handleShare = async (postId: number) => {
    console.log("handleShare chamado para postId:", postId);
    await toggleAction(postId, "share");
  };

  if (loading || isActionsLoading) {
    return (
      <S.Content>
        <p>Carregando...</p>
      </S.Content>
    );
  }

  if (error) {
    return (
      <S.Content>
        <p>Erro: {error}</p>
      </S.Content>
    );
  }

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
              const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
              const text = textarea.value.trim();
              if (text) handlePostCreate(text);
              textarea.value = "";
            }}
          >
            {isPosting ? "Enviando..." : "Zuppi"}
          </Button>
        </S.NewPostTools>
      </S.NewPostField>
      {Array.isArray(posts?.posts) && posts.posts.length > 0 ? (
        posts.posts.map((post) => {
          const actions = userActions[post.id] || [];
          console.debug(`Renderizando post ${post.id} com ações:`, actions);
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
              isLiked={Array.isArray(actions) && actions.includes("like")}
              isReposted={Array.isArray(actions) && actions.includes("repost")}
              isCommented={Array.isArray(actions) && actions.includes("comment")}
              isShared={Array.isArray(actions) && actions.includes("share")}
              onLike={() => handleLike(post.id)}
              onRepost={() => handleRepost(post.id)}
              onComment={() => handleComment(post.id)}
              onShare={() => handleShare(post.id)}
            >
              {post.text}
            </Post>
          );
        })
      ) : (
        <p>Nenhum post disponível</p>
      )}
    </S.Content>
  );
};

export default Content;