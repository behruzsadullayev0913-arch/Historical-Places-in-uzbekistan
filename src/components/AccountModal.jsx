import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useLikesComments } from "../contexts/LikesCommentsContext";
import { useLanguage } from "../contexts/LanguageContext";
import placesData from "../data/places.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHeart,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const AccountModal = ({ isOpen, onClose }) => {
  const { user, updateUser, logout } = useUser();
  const { getUserFavorites, toggleFavorite, getUserFavoriteCount } =
    useLikesComments();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const favoriteIds = getUserFavorites(user.id);
  const favoritePlaces = placesData.filter((place) =>
    favoriteIds.includes(place.id),
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage(t("fill_all_fields"));
      return;
    }
    updateUser({
      name: formData.name,
      email: formData.email,
      ...(formData.password ? { password: formData.password } : {}),
    });
    setFormData({ ...formData, password: "" });
    setMessage(t("profile_updated"));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {t("account_title")}
            </h2>
            <p className="text-sm text-slate-500">{t("account_info")}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-6">
          <div className="space-y-6">
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {t("name")}
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t("name_placeholder")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {t("email")}
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t("email_placeholder")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t("password_placeholder")}
                  />
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {t("password_hint")}
                </p>
              </div>

              {message && (
                <div className="text-sm text-primary-600">{message}</div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all"
                >
                  {t("save_changes")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  {t("logout")}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t("label_favorites")}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {t("favorites_info")}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 bg-primary-600 text-white px-3 py-2 rounded-full text-sm font-bold">
                  <FontAwesomeIcon icon={faHeart} />{" "}
                  {getUserFavoriteCount(user.id)}
                </span>
              </div>

              <div className="space-y-3">
                {favoritePlaces.length > 0 ? (
                  favoritePlaces.map((place) => (
                    <div
                      key={place.id}
                      className="flex items-center gap-3 bg-white rounded-3xl p-3 shadow-sm"
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{place.name}</p>
                        <p className="text-slate-500 text-sm">{place.region}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(place.id, user.id)}
                        className="text-red-500 font-bold"
                      >
                        {t("remove_favorite")}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">{t("no_favorites")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
