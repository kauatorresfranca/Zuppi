import Button from "../button";
import * as S from "./styles";

const Discover = () => {
  return (
    <S.Discover>
      <S.SearchContainer>
        <i className="ri-search-line"></i>
        <input type="text" placeholder="Search Zuppi" />
      </S.SearchContainer>
      <S.Subscribe>
        <h3>Subscribe to Premium</h3>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <Button variant="primary">Subscribe</Button>
      </S.Subscribe>
      <S.Happening>
        <h2>What's happening</h2>
        <S.HappeningList>
          <S.HappeningItem>
            <p>NFL LIVE</p>
            <h3>Cardinals at bills</h3>
          </S.HappeningItem>
          <S.HappeningItem>
            <p>Sports Trending</p>
            <h3>Cardinals at bills</h3>
          </S.HappeningItem>
          <S.HappeningItem>
            <p>Sports Trending</p>
            <h3>Kyle Dugger</h3>
          </S.HappeningItem>
          <S.HappeningItem>
            <p>Sports Trending</p>
            <h3>Anthony Richardson</h3>
            <p>12,111</p>
          </S.HappeningItem>
          <S.HappeningItem>
            <p>Sports Trending</p>
            <h3>Bryce Young</h3>
            <p>5,621</p>
          </S.HappeningItem>
          <S.HappeningItem>
            <p>Sports Trending</p>
            <h3>Daboll</h3>
            <p>1,334</p>
          </S.HappeningItem>
        </S.HappeningList>
      </S.Happening>
      <S.ToFollow>
        <h2>Who to follow</h2>
        <S.ToFollowList>
          <S.ToFollowItem>
            <S.ToFollowItemInfo>
              <i className="ri-user-fill"></i>
              <S.ToFollowItemName>
                <h3>teste</h3>
                <p>teste</p>
              </S.ToFollowItemName>
            </S.ToFollowItemInfo>
            <Button variant="primary">Follow</Button>
          </S.ToFollowItem>
          <S.ToFollowItem>
            <S.ToFollowItemInfo>
              <i className="ri-user-fill"></i>
              <S.ToFollowItemName>
                <h3>teste</h3>
                <p>teste</p>
              </S.ToFollowItemName>
            </S.ToFollowItemInfo>
            <Button variant="primary">Follow</Button>
          </S.ToFollowItem>
          <S.ToFollowItem>
            <S.ToFollowItemInfo>
              <i className="ri-user-fill"></i>
              <S.ToFollowItemName>
                <h3>teste</h3>
                <p>teste</p>
              </S.ToFollowItemName>
            </S.ToFollowItemInfo>
            <Button variant="primary">Follow</Button>
          </S.ToFollowItem>
          <S.ToFollowItem>
            <S.ToFollowItemInfo>
              <i className="ri-user-fill"></i>
              <S.ToFollowItemName>
                <h3>teste</h3>
                <p>teste</p>
              </S.ToFollowItemName>
            </S.ToFollowItemInfo>
            <Button variant="primary">Follow</Button>
          </S.ToFollowItem>
          <S.ToFollowItem>
            <S.ToFollowItemInfo>
              <i className="ri-user-fill"></i>
              <S.ToFollowItemName>
                <h3>teste</h3>
                <p>teste</p>
              </S.ToFollowItemName>
            </S.ToFollowItemInfo>
            <Button variant="primary">Follow</Button>
          </S.ToFollowItem>
        </S.ToFollowList>
      </S.ToFollow>
    </S.Discover>
  );
};

export default Discover;
