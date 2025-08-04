import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { useState, useEffect } from "react";
import Modal from "../modal";
import placeholderImage from "../../assets/images/placeholder.png";
import { api } from "../../api";

const Profile = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
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
      image?: string;
    }[];
  }>("profile/posts/", { posts: [] });

  const [userActions, setUserActions] = useState<Record<number, string[]>>({});
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
    const fetchCsrfToken = async () => {
      try {
        const response = await api.get("/get_csrf_token/", { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
        console.log("CSRF token obtido no Profile.tsx");
      } catch (err) {
        console.error("Erro ao obter CSRF token:", err);
      }
    };
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (profileData && !isEditModalOpen) {
      setBio(profileData.bio || "");
      setUsername(profileData.username || "");
      setPreviewImage(profileData.profile_picture || null);
    }
  }, [isEditModalOpen, profileData]);

  useEffect(() => {
    const fetchUserActions = async () => {
      if (postsData && Array.isArray(postsData.posts)) {
        const actionsMap: Record<number, string[]> = {};
        for (const post of postsData.posts) {
          try {
            const response = await api.get(`posts/${post.id}/actions/`);
            actionsMap[post.id] = response.data.actions.map(
              (a: { action_type: string }) => a.action_type
            );
          } catch (err) {
            console.error(`Erro ao carregar ações para post ${post.id}:`, err);
          }
        }
        setUserActions(actionsMap);
      } else {
        console.log("Nenhum post válido para buscar ações:", postsData);
      }
    };
    fetchUserActions();
  }, [postsData]);

  const toggleAction = async (postId: number, actionType: string) => {
    console.log(`toggleAction called with postId: ${postId}, actionType: ${actionType}`);
    try {
      if (!csrfToken) {
        throw new Error(`CSRF token não disponível. Não é possível executar ${actionType}.`);
      }
      const response = await api.get(`posts/${postId}/actions/`);
      const userActionsForPost = response.data.actions || [];
      const hasAction = userActionsForPost.some(
        (a: { action_type: string }) => a.action_type === actionType
      );
      console.log(`hasAction for ${actionType}:`, hasAction);

      if (hasAction) {
        await api.delete(`posts/${postId}/${actionType}/`, {
          headers: { "X-CSRFToken": csrfToken },
          withCredentials: true,
        });
        console.log(`Removed ${actionType} for post ${postId}`);
      } else {
        await api.post(
          `posts/${postId}/${actionType}/`,
          {},
          {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
          }
        );
        console.log(`Added ${actionType} for post ${postId}`);
      }
      refetchPosts();
    } catch (err) {
      console.error(`Erro ao executar ${actionType}:`, err);
    }
  };

  const handleLike = async (postId: number) => {
    console.log("handleLike called for postId:", postId);
    await toggleAction(postId, "like");
  };

  const handleRepost = async (postId: number) => {
    console.log("handleRepost called for postId:", postId);
    await toggleAction(postId, "repost");
  };

  const handleComment = async (postId: number) => {
    console.log("handleComment called for postId:", postId);
    await toggleAction(postId, "comment");
  };

  const handleShare = async (postId: number) => {
    console.log("handleShare called for postId:", postId);
    await toggleAction(postId, "share");
  };

  const handleEditSubmit = async () => {
    setIsEditing(true);
    setEditError(null);
    try {
      if (!username || username.length < 3) {
        throw new Error("O nome de utilizador deve ter pelo menos 3 caracteres.");
      }
      if (!csrfToken) {
        throw new Error("CSRF token não disponível.");
      }

      const formData = new FormData();
      formData.append("bio", bio || "");
      formData.append("username", username);
      if (newPassword && oldPassword) {
        formData.append("old_password", oldPassword);
        formData.append("new_password", newPassword);
      }
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      } else if (previewImage === null && profileData?.profile_picture) {
        formData.append("remove_profile_picture", "true");
      }

      const response = await api.patch("profile/update/", formData, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error(response.data.error || "Erro ao atualizar perfil");
      }

      refetchProfile();
      setIsEditModalOpen(false);
      setOldPassword("");
      setNewPassword("");
      setShowPasswordFields(false);
      setProfilePicture(null);
      setPreviewImage(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Erro ao atualizar perfil";
      setEditError(errorMessage);
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
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
                src={profileData?.profile_picture || placeholderImage}
                alt="Perfil"
                onError={(e) => {
                  console.warn(`Failed to load profile picture: ${profileData?.profile_picture}`);
                  e.currentTarget.src = placeholderImage;
                }}
              />
              <S.UserDetails>
                <h2 style={{ color: "#fff" }}>
                  {profileData?.username || "Utilizador"}
                </h2>
                <S.Handle>@{profileData?.handle || "utilizador"}</S.Handle>
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
            postsData.posts.map((post) => {
              console.log("Passing handlers to Post:", {
                postId: post.id,
                onLike: handleLike,
                onRepost: handleRepost,
                onComment: handleComment,
                onShare: handleShare,
              });
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
                  isLiked={userActions[post.id]?.includes("like") || false}
                  isReposted={userActions[post.id]?.includes("repost") || false}
                  isCommented={userActions[post.id]?.includes("comment") || false}
                  isShared={userActions[post.id]?.includes("share") || false}
                  onLike={() => handleLike(post.id)}
                  onRepost={() => handleRepost(post.id)}
                  onComment={() => handleComment(post.id)}
                  onShare={() => handleShare(post.id)}
                  profilePicture={profileData?.profile_picture || placeholderImage}
                  image={post.image || undefined}
                >
                  {post.text}
                </Post>
              );
            })
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
                    (profileData?.profile_picture
                      ? profileData.profile_picture
                      : placeholderImage)
                  }
                  alt="Prévia"
                  onError={(e) => {
                    console.warn(`Failed to load profile picture preview: ${profileData?.profile_picture}`);
                    e.currentTarget.src = placeholderImage;
                  }}
                />
                <S.ImageInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </S.ProfilePicturePreview>
              {(previewImage || profileData?.profile_picture) && (
                <S.RemoveButton onClick={handleRemoveImage}>
                  Remover Foto
                </S.RemoveButton>
              )}
            </S.ProfilePreview>
            <S.EditForm>
              <S.FormGroup>
                <label>Nome de Utilizador</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={
                    profileData?.username || "Digite o seu nome de utilizador"
                  }
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={profileData?.bio || "Conte sobre si"}
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
                      placeholder="Digite a sua senha atual"
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <label>Nova Senha</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite a sua nova senha"
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
                  {isEditing ? "A salvar..." : "Salvar"}
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