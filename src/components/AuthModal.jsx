import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useLanguage } from "../contexts/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useUser();
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Simple login - in real app, verify password
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password,
        );
        if (!user) {
          setError(t("login_alert"));
          return;
        }
        login(user);
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError(t("fill_all_fields"));
          return;
        }
        register({
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }
      onClose();
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            {isLogin ? t("login_button") : t("register_button")}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">
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
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={t("name_placeholder")}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">
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
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t("email_placeholder")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">
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
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t("password_placeholder")}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold transition-all"
          >
            {isLogin ? t("login_button") : t("register_button")}
          </button>
        </form>

        <div className="px-6 pb-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-600 hover:text-primary-800 font-bold"
          >
            {isLogin ? t("no_account") : t("have_account")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
