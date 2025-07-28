// Profile.tsx
import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api } from "../../api";
import { useState, useEffect } from "react";
import Modal from "../modal";
import placeholderImage from "../../assets/images/placeholder.png";
import axios from "axios";

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
  }>("profile/", {
    username: "",
    handle: "",
    bio: "",
    location: "",
    profile_picture: "",
    cover_image: "",
    followers: 0,
    following: 0,
    posts_count: 0,
  });

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useApi<{
    posts: {
      id: number;
      author: string;
      text: string;
      likes_count: number;
      reposts_count?: number;
      comments_count?: number;
      shares_count?: number;
      created_at?: string;
    }[];
  }>("profile/posts/", { posts: [] });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_csrf_token/", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("CSRF token obtido:", response.data.csrfToken);
        setCsrfToken(response.data.csrfToken);
      })
      .catch((err) => console.error("Erro ao obter CSRF token:", err));
  }, []);

  useEffect(() => {
    if (profileData && !isEditModalOpen) {
      console.log("Inicializando profileData:", profileData);
      setBio(profileData.bio || "");
      setUsername(profileData.username || "");
      setPreviewImage(profileData.profile_picture || null);
    }
  }, [isEditModalOpen, profileData]);

  useEffect(() => {
    console.log("Fetched postsData:", postsData);
  }, [postsData]);

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
      if (!username) {
        throw new Error("Nome de usuário é obrigatório");
      }
      if (username.length < 3) {
        throw new Error("O nome de usuário deve ter pelo menos 3 caracteres");
      }

      const payload = {
        bio: bio || "",
        username: username,
        ...(newPassword &&
          oldPassword && {
            old_password: oldPassword,
            new_password: newPassword,
          }),
      };

      console.log("Enviando JSON:", payload);

      if (!csrfToken) {
        throw new Error("CSRF token não disponível");
      }

      const response = await api.patch("profile/update/", payload, {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Resposta do backend:", response.data);
      refetch();
      setIsEditModalOpen(false);
      setOldPassword("");
      setNewPassword("");
      setShowPasswordFields(false);
      setProfilePicture(null);
      setPreviewImage(null);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "Erro ao atualizar perfil";
      console.error("Erro no handleEditSubmit:", err.response?.data || err);
      setEditError(errorMessage);
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Imagem selecionada:", file.name, `(${file.size} bytes)`);
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    console.log("Imagem de perfil removida");
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
                src={profileData?.profile_picture || placeholderImage}
                alt="Perfil"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
                }}
              />
              <S.UserDetails>
                <h2 style={{ color: "#fff" }}>
                  {profileData?.username || "Usuário"}
                </h2>
                <S.Handle>@{profileData?.handle || "usuário"}</S.Handle>
                <S.Bio>{profileData?.bio || "Nenhuma bio disponível"}</S.Bio>
              </S.UserDetails>
            </S.UserInfoEditGroup>
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(true)}
            >
              Editar Perfil
            </Button>
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
          {Array.isArray(postsData?.posts) ? (
            postsData.posts.map((post) => (
              <Post
                key={post.id}
                username={post.author}
                userid={post.author}
                likes={post.likes_count}
                reposts={post.reposts_count}
                comments={post.comments_count}
                shares={post.shares_count}
                createdAt={post.created_at}
                onLike={() => handleLike(post.id)}
              >
                {post.text}
              </Post>
            ))
          ) : (
            <p>Nenhum post disponível</p>
          )}
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
              <S.ProfilePicturePreview>
                <img
                  src={
                    previewImage ||
                    profileData?.profile_picture ||
                    placeholderImage
                  }
                  alt="Prévia"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
                  }}
                />
                <S.ImageInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </S.ProfilePicturePreview>
              {previewImage && (
                <S.RemoveButton onClick={handleRemoveImage}>
                  Remover Foto
                </S.RemoveButton>
              )}
            </S.ProfilePreview>
            <S.EditForm>
              <S.FormGroup>
                <label>Nome de Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    console.log("Novo username digitado:", e.target.value);
                    setUsername(e.target.value);
                  }}
                  placeholder={
                    profileData?.username || "Digite seu nome de usuário"
                  }
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => {
                    console.log("Nova bio digitada:", e.target.value);
                    setBio(e.target.value);
                  }}
                  placeholder={profileData?.bio || "Conte sobre você"}
                />
              </S.FormGroup>
              {!showPasswordFields ? (
                <S.ChangePasswordText
                  onClick={() => setShowPasswordFields(true)}
                >
                  Criar nova senha
                </S.ChangePasswordText>
              ) : (
                <>
                  <S.FormGroup>
                    <label>Senha Antiga</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Digite sua senha atual"
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <label>Nova Senha</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite sua nova senha"
                    />
                  </S.FormGroup>
                </>
              )}
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
                  {isEditing ? "Salvando..." : "Salvar"}
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
