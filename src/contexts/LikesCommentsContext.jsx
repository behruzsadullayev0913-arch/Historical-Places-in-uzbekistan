import React, { createContext, useContext, useState, useEffect } from "react";

const LikesCommentsContext = createContext();

export const useLikesComments = () => {
  const context = useContext(LikesCommentsContext);
  if (!context) {
    throw new Error(
      "useLikesComments must be used within a LikesCommentsProvider",
    );
  }
  return context;
};

export const LikesCommentsProvider = ({ children }) => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Load from localStorage
    const savedLikes = localStorage.getItem("placeLikes");
    const savedComments = localStorage.getItem("placeComments");

    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const toggleFavorite = (placeId, userId) => {
    const key = `${placeId}_${userId}`;
    const newLikes = { ...likes };

    if (newLikes[key]) {
      delete newLikes[key];
    } else {
      newLikes[key] = true;
    }

    setLikes(newLikes);
    localStorage.setItem("placeLikes", JSON.stringify(newLikes));
  };

  const isFavorite = (placeId, userId) => {
    const key = `${placeId}_${userId}`;
    return !!likes[key];
  };

  const getFavoriteCount = (placeId) => {
    return Object.keys(likes).filter((key) => key.startsWith(`${placeId}_`))
      .length;
  };

  const getUserFavorites = (userId) => {
    return Object.keys(likes)
      .filter((key) => key.endsWith(`_${userId}`))
      .map((key) => Number(key.split("_")[0]));
  };

  const getUserFavoriteCount = (userId) => {
    return getUserFavorites(userId).length;
  };

  const addComment = (placeId, userId, userName, text) => {
    const newComments = { ...comments };
    if (!newComments[placeId]) {
      newComments[placeId] = [];
    }

    newComments[placeId].push({
      id: Date.now(),
      userId,
      userName,
      text,
      date: new Date().toISOString(),
    });

    setComments(newComments);
    localStorage.setItem("placeComments", JSON.stringify(newComments));
  };

  const getComments = (placeId) => {
    return comments[placeId] || [];
  };

  const value = {
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    getUserFavorites,
    getUserFavoriteCount,
    addComment,
    getComments,
  };

  return (
    <LikesCommentsContext.Provider value={value}>
      {children}
    </LikesCommentsContext.Provider>
  );
};
