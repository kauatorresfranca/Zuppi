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
  return (
    <S.Container>
      <S.PostData>
        <i className="ri-user-fill"></i>
        <S.PostDataContent>
          <S.PostUser>
            <h2>{username}</h2>
            <p>@{userid}</p>
            <p>{createdAt || "Agora"}</p>
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
