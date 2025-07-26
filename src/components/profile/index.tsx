import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api } from "../../api";

const Profile = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useApi<{
    username: string;
    handle: string;
    bio: string;
    location: string;
    profile_picture: string;
    cover_image: string;
    followers: number;
    following: number;
    posts_count: number;
  }>("profile/");

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    refetch,
  } = useApi<{
    posts: { id: number; author: string; text: string; likes_count: number }[];
  }>("profile/posts/");

  const handleLike = async (postId: number) => {
    await api.post(`posts/${postId}/like/`, {});
    refetch();
  };

  if (profileLoading || postsLoading) {
    return (
      <S.Content>
        <p>Carregando...</p>
      </S.Content>
    );
  }

  if (profileError || postsError) {
    return (
      <S.Content>
        <p>Erro: {profileError || postsError}</p>
      </S.Content>
    );
  }

  return (
    <S.Content>
      <S.ProfileContainer>
        <S.UserInfo>
          <S.UserInfoEditGroup>
            <S.ProfilePicture
              src={
                profileData?.profile_picture ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
            />
            <S.UserDetails>
              <h2>{profileData?.username || "Usuário"}</h2>
              <S.Handle>@{profileData?.handle || "usuário"}</S.Handle>
              <S.Bio>{profileData?.bio || "Sem bio disponível"}</S.Bio>
            </S.UserDetails>
            <Button variant="secondary">Edit Profile</Button>
          </S.UserInfoEditGroup>

          <S.Metrics>
            <span>
              <strong>{profileData?.following || 0}</strong> Seguindo
            </span>
            <span>
              <strong>{profileData?.followers || 0}</strong> Seguidores
            </span>
            <span>
              <strong>{profileData?.posts_count || 0}</strong> Zuppis
            </span>
          </S.Metrics>
        </S.UserInfo>
      </S.ProfileContainer>
      <S.PostsContainer>
        {postsData?.posts?.map((post) => (
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
      </S.PostsContainer>
    </S.Content>
  );
};

export default Profile;
