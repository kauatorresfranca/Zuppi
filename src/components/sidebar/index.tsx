import Button from "../button";
import * as S from "./styles";

const SideBar = () => {
  return (
    <S.SideBar>
      <h1>
        <i className="ri-twitter-fill"></i>
      </h1>
      <S.MenuList>
        <S.MenuItem>
          <i className="ri-home-4-fill"></i>
          <h4>Home</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-hashtag"></i>
          <h4>Explore</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-notification-2-fill"></i>
          <h4>notifications</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-mail-fill"></i>
          <h4>Messages</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-bookmark-fill"></i>
          <h4>Bookmarks</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-group-fill"></i>
          <h4>Communities</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-twitter-fill"></i>
          <h4>Premium</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-user-fill"></i>
          <h4>Profile</h4>
        </S.MenuItem>
        <S.MenuItem>
          <i className="ri-more-fill"></i>
          <h4>More</h4>
        </S.MenuItem>
        <Button variant="primary">Zuppi</Button>
      </S.MenuList>
    </S.SideBar>
  );
};

export default SideBar;
