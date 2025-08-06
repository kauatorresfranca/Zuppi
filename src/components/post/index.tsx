import { useState, useEffect } from "react";
import * as S from "./styles";
import placeholderImage from "../../assets/images/placeholder.png";
import Modal from "../modal";
import { api } from "../../api";

type Props = {
  children: React.ReactNode;
  username: string;
  userid: string;
  likes?: number;
  reposts?: number;
  comments?: number;
  shares?: number;
  createdAt?: string;
  profilePicture?: string;
  image?: string;
  isLiked?: boolean;
  isReposted?: boolean;
  isShared?: boolean;
  onLike?: () => void;
  onRepost?: () => void;
  onComment?: (text: string) => void;
  onShare?: () => void;
  postId: number;
};

type Comment = {
  id: number;
  text: string;
  author: string;
  created_at: string;
  profile_picture: string;
};

const Post = ({
  children,
  username,
  userid,
  likes = 0,
  reposts = 0,
  comments = 0,
  shares = 0,
  createdAt,
  profilePicture,
  image,
  isLiked = false,
  isReposted = false,
  isShared = false,
  onLike,
  onRepost,
  onComment,
  onShare,
  postId,
}: Props) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const formatRelativeTime = (dateStr?: string): string => {
    if (!dateStr) return "Agora mesmo";
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    if (diffSeconds < 60) return "Agora mesmo";
    if (diffMinutes < 60)
      return `${diffMinutes} minuto${diffMinutes !== 1 ? "s" : ""} atrás`;
    if (diffHours < 24)
      return `${diffHours} hora${diffHours !== 1 ? "s" : ""} atrás`;
    if (diffDays < 7)
      return `${diffDays} dia${diffDays !== 1 ? "s" : ""} atrás`;
    if (diffWeeks < 4)
      return `${diffWeeks} semana${diffWeeks !== 1 ? "s" : ""} atrás`;
    return `${diffMonths} mês${diffMonths !== 1 ? "es" : ""} atrás`;
  };

  const fetchComments = async () => {
    if (!postId) {
      console.warn("postId is undefined, cannot fetch comments");
      setCommentsError("ID do post inválido");
      setIsLoadingComments(false);
      return;
    }
    setIsLoadingComments(true);
    setCommentsError(null);
    try {
      console.log(`Fetching comments for post ${postId}`);
      const response = await api.get(`posts/${postId}/comments/`);
      const comments = response.data.comments || [];
      console.log(`Received comments for post ${postId}:`, comments);
      setCommentsList(comments);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Erro ao carregar comentários";
      console.error(`Erro ao carregar comentários para post ${postId}:`, err);
      setCommentsError(errorMessage);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    if (isCommentModalOpen && postId) {
      fetchComments();
    }
  }, [isCommentModalOpen, postId]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      setCommentError("O comentário não pode estar vazio");
      console.log("Comentário vazio, não enviado");
      return;
    }
    if (!postId) {
      setCommentError("ID do post inválido");
      console.warn("postId is undefined, cannot submit comment");
      return;
    }
    console.log(`handleCommentSubmit called with commentText: "${commentText}"`);
    setCommentError(null);
    try {
      if (onComment) {
        await onComment(commentText.trim());
        console.log(`Comment submitted for post ${postId}: "${commentText}"`);
        setCommentText("");
        await fetchComments(); // Atualizar a lista de comentários após envio
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Erro ao adicionar comentário";
      console.error(`Erro ao executar comment para post ${postId}:`, err);
      setCommentError(errorMessage);
    }
  };

  return (
    <>
      <S.Container>
        <S.PostData>
          {profilePicture ? (
            <S.ProfilePicture
              src={
                profilePicture.startsWith("http")
                  ? profilePicture
                  : `https://res.cloudinary.com/dtqpej5qg${profilePicture}`
              }
              alt={`${username}'s profile`}
              onError={(e) => {
                console.warn(`Failed to load profile picture: ${profilePicture}`);
                e.currentTarget.src = placeholderImage;
              }}
            />
          ) : (
            <S.ProfilePicture src={placeholderImage} alt="Placeholder" />
          )}
          <S.PostDataContent>
            <S.PostUser>
              <h2>{username}</h2>
              <p>@{userid}</p>
              <p>{formatRelativeTime(createdAt)}</p>
            </S.PostUser>
            <p className="description">{children}</p>
            {image && (
              <img
                src={
                  image.startsWith("http")
                    ? image
                    : `https://res.cloudinary.com/dtqpej5qg${image}`
                }
                alt="Post image"
                style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", marginTop: "10px" }}
                onError={(e) => {
                  console.warn(`Failed to load post image: ${image}`);
                  e.currentTarget.src = placeholderImage;
                }}
              />
            )}
          </S.PostDataContent>
        </S.PostData>
        <S.PostActionsList>
          <S.PostActionItem onClick={() => setIsCommentModalOpen(true)}>
            <i className="ri-chat-3-fill"></i>
            <p>{comments}</p>
          </S.PostActionItem>
          <S.PostActionItem onClick={onRepost} $isActive={isReposted}>
            <i className="ri-repeat-fill"></i>
            <p>{reposts}</p>
          </S.PostActionItem>
          <S.PostActionItem onClick={onLike} $isActive={isLiked}>
            <i className="ri-heart-3-fill"></i>
            <p>{likes}</p>
          </S.PostActionItem>
          <S.PostActionItem onClick={onShare} $isActive={isShared}>
            <i className="ri-upload-2-fill"></i>
            <p>{shares}</p>
          </S.PostActionItem>
          <S.PostActionItem></S.PostActionItem>
        </S.PostActionsList>
        <i className="ri-more-fill more"></i>
      </S.Container>

      <Modal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)}>
        <S.ModalHeader>
          <h2>Comentários</h2>
          <i
            className="ri-close-fill"
            onClick={() => setIsCommentModalOpen(false)}
          ></i>
        </S.ModalHeader>
        <S.ModalContent>
          <S.CommentList>
            {isLoadingComments && <p>Carregando comentários...</p>}
            {commentsError && <S.ErrorMessage>{commentsError}</S.ErrorMessage>}
            {commentsList.length === 0 && !isLoadingComments && !commentsError && (
              <p>Nenhum comentário ainda.</p>
            )}
            {commentsList.map((comment) => (
              <S.CommentItem key={comment.id}>
                <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                <S.CommentText>{comment.text}</S.CommentText>
                <S.CommentDate>{formatRelativeTime(comment.created_at)}</S.CommentDate>
              </S.CommentItem>
            ))}
          </S.CommentList>
          <S.CommentInput
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escreva um comentário..."
          />
          {commentError && <S.ErrorMessage>{commentError}</S.ErrorMessage>}
          <S.CommentButton onClick={handleCommentSubmit} disabled={!commentText.trim()}>
            Comentar
          </S.CommentButton>
        </S.ModalContent>
      </Modal>
    </>
  );
};

export default Post;