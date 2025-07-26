import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api } from "../../api";
import { useState } from "react";
import Modal from "../modal";

const Profile = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch,
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
    refetch: refetchPosts,
  } = useApi<{
    posts: { id: number; author: string; text: string; likes_count: number }[];
  }>("profile/posts/");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bio, setBio] = useState(profileData?.bio || "");
  const [location, setLocation] = useState(profileData?.location || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    profileData?.profile_picture || null
  );

  const handleLike = async (postId: number) => {
    try {
      await api.post(`posts/${postId}/like/`, {});
      refetchPosts();
    } catch (err) {
      console.error("Erro ao curtir post:", err);
    }
  };

  const handleEditSubmit = async () => {
    setIsEditing(true);
    setEditError(null);
    try {
      const formData = new FormData();
      if (bio) formData.append("bio", bio);
      if (location) formData.append("location", location);
      if (profilePicture) formData.append("profile_picture", profilePicture);
      else if (!profilePicture && !profileData?.profile_picture) {
        formData.append("profile_picture", ""); // Indica remoção
      }

      await api.patch("profile/update/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      refetch();
      setIsEditModalOpen(false);
    } catch (err) {
      setEditError("Erro ao atualizar perfil");
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setProfilePicture(null);
    setPreviewImage(null);
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
    <>
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
              <Button
                variant="secondary"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </Button>
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

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <S.ModalHeader>
          <h2>Editar Perfil</h2>
          <i
            className="ri-close-fill"
            onClick={() => setIsEditModalOpen(false)}
          ></i>
        </S.ModalHeader>
        <S.ModalContent>
          <S.EditProfileLayout>
            <S.ProfilePreview>
              <S.ProfilePicturePreview
                src={
                  previewImage ||
                  profileData?.profile_picture ||
                  "https://via.placeholder.com/150"
                }
                alt="Preview"
              />
              {previewImage && (
                <S.RemoveButton onClick={handleRemoveImage}>
                  Remover Foto
                </S.RemoveButton>
              )}
            </S.ProfilePreview>
            <S.EditForm>
              <S.FormGroup>
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Escreva sua bio"
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Localização</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Sua localização"
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Foto de Perfil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </S.FormGroup>
              {editError && <S.ErrorMessage>{editError}</S.ErrorMessage>}
              <S.ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  disabled={isEditing}
                  onClick={handleEditSubmit}
                >
                  {isEditing ? "Editando..." : "Salvar"}
                </Button>
              </S.ButtonGroup>
            </S.EditForm>
          </S.EditProfileLayout>
        </S.ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
