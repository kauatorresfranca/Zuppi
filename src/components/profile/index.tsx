import Button from "../button";
import Post from "../post";
import * as S from "./styles";
import useApi from "../../hooks/useApi";
import { useState, useEffect } from "react";
import Modal from "../modal";
import placeholderImage from "../../assets/images/placeholder.png";
import { api } from "../../api";

const Profile = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useApi<{
    username: string;
    handle: string;
    bio: string;
    location: string;
    profile_picture: string;
    cover_image: string;
    followers: number;
    following: number;
    posts_count: number;
  }>("profile/", {
    username: "",
    handle: "",
    bio: "",
    location: "",
    profile_picture: "",
    cover_image: "",
    followers: 0,
    following: 0,
    posts_count: 0,
  });

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useApi<{
    posts: {
      id: number;
      author: string;
      text: string;
      likes_count: number;
      reposts_count?: number;
      comments_count?: number;
      shares_count?: number;
      created_at?: string;
      image?: string;
    }[];
  }>("profile/posts/", { posts: [] });

  const [userActions, setUserActions] = useState<Record<number, string[]>>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isActionsLoading, setIsActionsLoading] = useState(false);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await api.get("/get_csrf_token/", { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
        console.log("CSRF token obtido no Profile.tsx");
      } catch (err) {
        console.error("Erro ao obter CSRF token:", err);
      }
    };
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (profileData && !isEditModalOpen) {
      setBio(profileData.bio || "");
      setUsername(profileData.username || "");
      setPreviewImage(profileData.profile_picture || null);
    }
  }, [isEditModalOpen, profileData]);

  useEffect(() => {
    const fetchUserActions = async () => {
      if (postsData && Array.isArray(postsData.posts)) {
        setIsActionsLoading(true);
        const actionsMap: Record<number, string[]> = {};
        for (const post of postsData.posts) {
          try {
            const response = await api.get(`posts/${post.id}/actions/`);
            const actions = Array.isArray(response.data.actions)
              ? response.data.actions.map((a: { action_type: string }) => a.action_type)
              : [];
            actionsMap[post.id] = actions;
          } catch (