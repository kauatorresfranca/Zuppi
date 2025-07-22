import Content from "../../components/content";
import Discover from "../../components/discover";
import SideBar from "../../components/sidebar";
import * as S from "./styles";

const Feed = () => {
  return (
    <S.Background>
      <S.Container>
        <SideBar />
        <Content />
        <Discover />
      </S.Container>
    </S.Background>
  );
};

export default Feed;
