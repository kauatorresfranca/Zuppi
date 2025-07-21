import * as S from "./styles";

const Post = () => {
  return (
    <S.Container>
      <S.PostData>
        <i className="ri-user-fill"></i>
        <S.PostDataContent>
          <S.PostUser>
            <h2>User</h2>
            <p>@user872</p>
            <p>23:48</p>
          </S.PostUser>
          <p className="description">Qual o maior time de alagoas ?</p>
        </S.PostDataContent>
      </S.PostData>
      <S.PostActionsList>
        <S.PostActionItem>
          <i className="ri-chat-3-fill"></i>
          <p>233</p>
        </S.PostActionItem>
        <S.PostActionItem>
          <i className="ri-repeat-fill"></i>
          <p>12</p>
        </S.PostActionItem>
        <S.PostActionItem>
          <i className="ri-heart-3-fill"></i>
          <p>234</p>
        </S.PostActionItem>
        <S.PostActionItem>
          <i className="ri-upload-2-fill"></i>
          <p>0</p>
        </S.PostActionItem>
        <S.PostActionItem></S.PostActionItem>
      </S.PostActionsList>
      <i className="ri-more-fill more"></i>
    </S.Container>
  );
};

export default Post;
