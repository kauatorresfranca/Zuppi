import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api } from "../../api"; // Importe a API aqui

const Content = () => {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useApi<{
    posts: { id: number; author: string; text: string; likes_count: number }[];
  }>("feed/");

  const handlePostCreate = async (text: string) => {
    await api.post("posts/create/", { text }); // Passa o data como segundo argumento
    refetch();
  };

  const handleLike = async (postId: number) => {
    await api.post(`posts/${postId}/like/`, {}); // Passa um objeto vazio como data, pois o back-end não exige corpo
    refetch();
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
        <p>Erro: {error}</p>
      </S.Content>
    );

  return (
    <S.Content>
      <S.ContentHeader>
        <h2>For you</h2>
      </S.ContentHeader>
      <S.NewPostField>
        <textarea
          placeholder="What's happening?"
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const text = (e.target as HTMLTextAreaElement).value.trim();
              if (text) handlePostCreate(text);
              (e.target as HTMLTextAreaElement).value = "";
            }
          }}
        />
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
            onClick={() => {
              const textarea = document.querySelector(
                "textarea"
              ) as HTMLTextAreaElement;
              const text = textarea.value.trim();
              if (text) handlePostCreate(text);
              textarea.value = "";
            }}
          >
            Zuppi
          </Button>
        </S.NewPostTools>
      </S.NewPostField>
      {posts &&
        posts.posts.map((post) => (
          <Post
            key={post.id}
            username={post.author}
            userid={post.author}
            likes={post.likes_count}
            onLike={() => handleLike(post.id)}
          >
            {post.text}
          </Post>
        ))}
    </S.Content>
  );
};

export default Content;
