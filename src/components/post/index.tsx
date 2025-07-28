import * as S from "./styles";

type Props = {
  children: React.ReactNode;
  username: string;
  userid: string;
  likes?: number;
  reposts?: number;
  comments?: number;
  shares?: number;
  createdAt?: string;
  isLiked?: boolean;
  isReposted?: boolean;
  isCommented?: boolean;
  isShared?: boolean;
  onLike?: () => void;
  onRepost?: () => void;
  onComment?: () => void;
  onShare?: () => void;
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
  isLiked = false,
  isReposted = false,
  isCommented = false,
  isShared = false,
  onLike,
  onRepost,
  onComment,
  onShare,
}: Props) => {
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
      return `${diffMinutes} minuto${diffMinutes > 1 ? "s" : ""} atrás`;
    if (diffHours < 24)
      return `${diffHours} hora${diffHours > 1 ? "s" : ""} atrás`;
    if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás`;
    if (diffWeeks < 4)
      return `${diffWeeks} semana${diffWeeks > 1 ? "s" : ""} atrás`;
    return `${diffMonths} mês${diffMonths > 1 ? "es" : ""} atrás`;
  };

  return (
    <S.Container>
      <S.PostData>
        <i className="ri-user-fill"></i>
        <S.PostDataContent>
          <S.PostUser>
            <h2>{username}</h2>
            <p>@{userid}</p>
            <p>{formatRelativeTime(createdAt)}</p>
          </S.PostUser>
          <p className="description">{children}</p>
        </S.PostDataContent>
      </S.PostData>
      <S.PostActionsList>
        <S.PostActionItem onClick={onComment} $isActive={isCommented}>
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
  );
};

export default Post;
