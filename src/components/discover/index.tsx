import { useMemo } from "react";
import Button from "../button";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { api } from "../../api";

const Discover = () => {
  const {
    data: suggestions,
    loading: suggestionsLoading,
    error: suggestionsError,
    refetch: refetchSuggestions,
  } = useApi<{ suggestions: { id: number; username: string }[] }>(
    "suggestions/",
    { suggestions: [] }
  );

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useApi<{
    following: number[];
  }>("profile/", { following: [] });

  // Handle the case where following might not be an array
  const followingIds = useMemo(() => {
    const ids = Array.isArray(profileData?.following) ? profileData.following : [];
    console.log("Profile Data:", profileData);
    console.log("Current following IDs:", ids);
    return ids;
  }, [profileData]);

  const toggleFollow = async (userId: number) => {
    try {
      const isFollowingUser = followingIds.includes(userId);
      console.log(`Toggling follow for user ${userId}. Currently following: ${isFollowingUser}`);
      if (isFollowingUser) {
        await api.delete(`/follow/${userId}/`);
      } else {
        await api.post(`/follow/${userId}/`, {});
      }
      await refetchProfile();
      await refetchSuggestions();
    } catch (err) {
      console.error("Error following/unfollowing:", err);
    }
  };

  if (suggestionsLoading || profileLoading) {
    return (
      <S.Discover>
        <p>Loading...</p>
      </S.Discover>
    );
  }

  if (suggestionsError || profileError) {
    return (
      <S.Discover>
        <p>Error: {suggestionsError || profileError}</p>
      </S.Discover>
    );
  }

  return (
    <S.Discover>
      <S.SearchContainer>
        <i className="ri-search-line"></i>
        <input type="text" placeholder="Search Zuppi" />
      </S.SearchContainer>
      <S.Subscribe>
        <h3>Subscribe to Premium</h3>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of ads
          revenue.
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
          {suggestions?.suggestions?.length > 0 ? (
            suggestions.suggestions.map((user) => (
              <S.ToFollowItem key={user.id}>
                <S.ToFollowItemInfo>
                  <i className="ri-user-fill"></i>
                  <S.ToFollowItemName>
                    <h3>{user.username}</h3>
                    <p>@{user.username}</p>
                  </S.ToFollowItemName>
                </S.ToFollowItemInfo>
                <Button
                  variant="primary"
                  onClick={() => toggleFollow(user.id)}
                  disabled={false}
                >
                  {followingIds.includes(user.id) ? "Following" : "Follow"}
                </Button>
              </S.ToFollowItem>
            ))
          ) : (
            <p>No suggestions available</p>
          )}
        </S.ToFollowList>
      </S.ToFollow>
    </S.Discover>
  );
};

export default Discover;