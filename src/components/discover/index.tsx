import Button from "../button";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { useState, useEffect } from "react";
import { api } from "../../api";

const Discover = () => {
  const {
    data: suggestions,
    loading: suggestionsLoading,
    error: suggestionsError,
    refetch: refetchSuggestions,
  } = useApi<{ suggestions: { id: number; username: string }[] }>(
    "suggestions/",
    { suggestions: [] } // Adicionado initialData com valor padrão
  );

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useApi<{
    following: number[];
  }>("profile/", { following: [] });

  const [isFollowing, setIsFollowing] = useState<number[]>(
    profileData?.following || []
  );

  useEffect(() => {
    setIsFollowing(profileData?.following || []);
  }, [profileData]);

  const toggleFollow = async (userId: number) => {
    try {
      const isFollowingUser = isFollowing.includes(userId);
      if (isFollowingUser) {
        await api.delete(`/follow/${userId}/`);
        setIsFollowing(isFollowing.filter((id) => id !== userId));
        console.log(`Deixou de seguir usuário ${userId}`);
      } else {
        await api.post(`/follow/${userId}/`, {});
        setIsFollowing([...isFollowing, userId]);
        console.log(`Seguiu usuário ${userId}`);
      }
      await refetchProfile();
      await refetchSuggestions();
    } catch (err) {
      console.error("Erro ao seguir/deixar de seguir:", err);
    }
  };

  if (suggestionsLoading || profileLoading)
    return (
      <S.Discover>
        <p>Carregando...</p>
      </S.Discover>
    );
  if (suggestionsError || profileError)
    return (
      <S.Discover>
        <p>Erro: {suggestionsError || profileError}</p>
      </S.Discover>
    );

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
          {suggestions &&
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
                  disabled={false} // Removido disabled para permitir alternância
                >
                  {isFollowing.includes(user.id) ? "Following" : "Follow"}
                </Button>
              </S.ToFollowItem>
            ))}
        </S.ToFollowList>
      </S.ToFollow>
    </S.Discover>
  );
};

export default Discover;
