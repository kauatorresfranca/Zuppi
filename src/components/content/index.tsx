import Button from "../button";
import Post from "../post";
import * as S from "./styles";

const Content = () => {
  return (
    <S.Content>
      <S.ContentHeader>
        <h2>For you</h2>
      </S.ContentHeader>
      <S.NewPostField>
        <textarea placeholder="What's happening?" />
        <S.NewPostTools>
          <S.IconList>
            <i className="ri-image-2-fill"></i>
            <i className="ri-film-fill"></i>
            <i className="ri-file-list-3-line"></i>
            <i className="ri-emoji-sticker-fill"></i>
            <i className="ri-calendar-2-fill"></i>
            <i className="ri-map-pin-fill"></i>
          </S.IconList>
          <Button variant="primary">Zuppi</Button>
        </S.NewPostTools>
      </S.NewPostField>
      <Post username="kauã torres" userid="kauatorres_">
        Csa é o maior de alagoas !
      </Post>
      <Post username="Luiz miguel" userid="luiztorres">
        quem tem mais tem 40 !
      </Post>
      <Post username="Luiz miguel" userid="luiztorres">
        quem tem mais tem 40 !
      </Post>
      <Post username="Luiz miguel" userid="luiztorres">
        quem tem mais tem 40 !
      </Post>
      <Post username="Luiz miguel" userid="luiztorres">
        quem tem mais tem 40 !
      </Post>
      <Post username="Luiz miguel" userid="luiztorres">
        quem tem mais tem 40 !
      </Post>
    </S.Content>
  );
};

export default Content;
