import { useState } from "react";
import Content from "../../components/content";
import Discover from "../../components/discover";
import SideBar from "../../components/sidebar";
import * as S from "./styles";
import Profile from "../../components/profile";

// Define a type for the content
type ActiveContent = "feed" | "profile";

const Feed = () => {
  // State to track the active content
  const [activeContent, setActiveContent] = useState<ActiveContent>("feed");

  // Callback to change the active content
  const handleContentChange = (content: ActiveContent) => {
    setActiveContent(content);
  };

  return (
    <S.Background>
      <S.Container>
        <SideBar onContentChange={handleContentChange} />
        {activeContent === "feed" ? <Content /> : <Profile />}
        <Discover />
      </S.Container>
    </S.Background>
  );
};

export default Feed;
