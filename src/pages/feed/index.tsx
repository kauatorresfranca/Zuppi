import Button from "../../components/button";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import * as S from "./styles";

const Feed = () => {
  return (
    <S.Background>
      <S.Container>
        <SideBar />
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
          <Post />
        </S.Content>
      </S.Container>
    </S.Background>
  );
};

export default Feed;
