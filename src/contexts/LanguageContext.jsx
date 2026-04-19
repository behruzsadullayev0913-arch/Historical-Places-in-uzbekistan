import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  UZ: {
    home: "Bosh sahifa",
    places: "Joylar",
    about: "Biz haqimizda",
    contact: "Aloqa",
    login: "Kirish",
    logout: "Chiqish",
    signup: "Ro'yhatdan o'tish",
    no_account: "Hisobingiz yo'qmi? Ro'yhatdan o'ting",
    have_account: "Hisobingiz bormi? Kiring",
    email: "Email",
    password: "Parol",
    name: "Ism",
    name_placeholder: "Ismingizni kiriting",
    email_placeholder: "Email manzilingizni kiriting",
    password_placeholder: "Parolni kiriting",
    fill_all_fields: "Barcha maydonlarni to'ldiring",
    favorites: "Favorite",
    favorites_count: "Favorite",
    details: "Batafsil ma'lumot",
    comments: "Izohlar",
    send: "Yuborish",
    comment_placeholder: "Izohingizni yozing...",
    login_alert: "Favorite uchun tizimga kiring",
    comment_login_alert: "Izoh qoldirish uchun tizimga kiring",
    comment_empty_alert: "Izoh matnini kiriting",
    location: "Joylashgan hudud",
    region: "Viloyat",
    period: "Davri",
    category: "Toifa",
    information: "Ma'lumotlar",
    account: "Hisob",
    account_title: "Mening hisobim",
    account_info:
      "Shaxsiy ma'lumotlaringizni yangilang va sevimlilarni boshqaring.",
    label_favorites: "Sevimlilar",
    favorites_info: "Sizning sevimli joylaringiz ro‘yxati.",
    remove_favorite: "O‘chirish",
    profile_updated: "Profil yangilandi.",
    password_hint:
      "Agar parolni o'zgartirmoqchi bo'lsangiz, yangi parolni kiriting.",
    save_changes: "Saqlash",
    no_favorites: "Siz hali hech qanday sevimli joy qo'shmadingiz.",
    more_places: "Barcha joylarni ko'rish",
    popular_places: "Eng mashhur joylar",
    see_places: "Joylarni ko'rish",
    all_places: "Barchasini ko'rish",
    favorite_action: "Favorite qil",
    back: "Orqaga",
    search: "Qidiruv",
    all_regions: "Barcha viloyatlar",
    hello: "Salom",
    wikipedia: "Wikipedia",
    register_button: "Ro'yhatdan o'tish",
    login_button: "Kirish",
    hero_title: "Sayohatga",
    hero_title_span: "chiqamiz!",
    hero_subtitle: "O'zbekiston bo'ylab eng yaxshi joylarni kashf eting va unutilmas sarguzashtlarga sho'ng'ing.",
    popular_desc: "O'zbekistonning eng ko'p tashrif buyuriladigan va tarixiy ahamiyatga ega maskanlari bilan tanishing.",
    about_us: "Biz haqimizda",
    about_desc: "\"Historical Places\" — bu O'zbekiston sivilizatsiyasi yaratgan eng buyuk meroslarni raqamlashtirish va ularni butun dunyoga tanitishga bag'ishlangan platforma. Bizning maqsadimiz — tariximizni kelajak avlodlarga chiroyli tarzda yetkazish.",
    stats_places: "Tarixiy obidalar",
    search_placeholder: "Izlash...",
    no_results: "Natija topilmadi...",
  },
  ENG: {
    home: "Home",
    places: "Places",
    about: "About",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    signup: "Register",
    no_account: "Don't have an account? Register",
    have_account: "Already have an account? Login",
    email: "Email",
    password: "Password",
    name: "Name",
    name_placeholder: "Enter your name",
    email_placeholder: "Enter your email",
    password_placeholder: "Enter your password",
    fill_all_fields: "Fill in all fields",
    favorites: "Favorite",
    favorites_count: "Favorites",
    details: "Learn more",
    comments: "Comments",
    send: "Send",
    comment_placeholder: "Write your comment...",
    login_alert: "Please login to favorite",
    comment_login_alert: "Please login to add a comment",
    comment_empty_alert: "Enter a comment",
    location: "Location",
    region: "Region",
    period: "Period",
    category: "Category",
    information: "Information",
    account: "Account",
    account_title: "My account",
    account_info: "Update your profile and manage favorites.",
    label_favorites: "Favorites",
    favorites_info: "Your saved favorite places.",
    remove_favorite: "Remove",
    profile_updated: "Profile updated.",
    password_hint: "Leave blank if you don't want to change password.",
    save_changes: "Save changes",
    no_favorites: "You don't have any favorite places yet.",
    more_places: "See all places",
    popular_places: "Most popular places",
    see_places: "View places",
    all_places: "View all",
    favorite_action: "Add favorite",
    back: "Back",
    search: "Search",
    all_regions: "All regions",
    hello: "Hello",
    wikipedia: "Wikipedia",
    register_button: "Register",
    login_button: "Login",
    hero_title: "Let's",
    hero_title_span: "travel!",
    hero_subtitle: "Discover the best places across Uzbekistan and dive into unforgettable adventures.",
    popular_desc: "Get to know the most visited and historically significant places in Uzbekistan.",
    about_us: "About us",
    about_desc: "\"Historical Places\" is a platform dedicated to digitizing the greatest heritage created by the civilization of Uzbekistan and introducing them to the whole world. Our goal is to beautifully convey our history to future generations.",
    stats_places: "Historical monuments",
    search_placeholder: "Search...",
    no_results: "No results found...",
  },
  RUS: {
    home: "Главная",
    places: "Места",
    about: "О нас",
    contact: "Контакты",
    login: "Вход",
    logout: "Выход",
    signup: "Регистрация",
    no_account: "Нет аккаунта? Зарегистрируйтесь",
    have_account: "Уже есть аккаунт? Войдите",
    email: "Email",
    password: "Пароль",
    name: "Имя",
    name_placeholder: "Введите ваше имя",
    email_placeholder: "Введите email",
    password_placeholder: "Введите пароль",
    fill_all_fields: "Заполните все поля",
    favorites: "Избранное",
    favorites_count: "Избранное",
    details: "Подробнее",
    comments: "Комментарии",
    send: "Отправить",
    comment_placeholder: "Напишите комментарий...",
    login_alert: "Пожалуйста, войдите, чтобы добавить в избранное",
    comment_login_alert: "Пожалуйста, войдите, чтобы оставить комментарий",
    comment_empty_alert: "Введите комментарий",
    location: "Расположение",
    region: "Регион",
    period: "Период",
    category: "Категория",
    information: "Информация",
    account: "Аккаунт",
    account_title: "Мой аккаунт",
    account_info: "Обновите профиль и управляйте избранным.",
    label_favorites: "Избранное",
    favorites_info: "Ваши сохраненные любимые места.",
    remove_favorite: "Удалить",
    profile_updated: "Профиль обновлен.",
    password_hint: "Оставьте пустым, если не хотите менять пароль.",
    save_changes: "Сохранить",
    no_favorites: "У вас пока нет избранных мест.",
    more_places: "Посмотреть все места",
    popular_places: "Самые популярные места",
    see_places: "Посмотреть места",
    all_places: "Посмотреть все",
    favorite_action: "Добавить в избранное",
    back: "Назад",
    search: "Поиск",
    all_regions: "Все регионы",
    hello: "Привет",
    wikipedia: "Wikipedia",
    register_button: "Регистрация",
    login_button: "Вход",
    hero_title: "Поехали в",
    hero_title_span: "путешествие!",
    hero_subtitle: "Откройте для себя лучшие места Узбекистана и погрузитесь в незабываемые приключения.",
    popular_desc: "Познакомьтесь с самыми посещаемыми и исторически значимыми местами Узбекистана.",
    about_us: "О нас",
    about_desc: "\"Historical Places\" — это платформа, посвященная оцифровке величайшего наследия, созданного цивилизацией Узбекистана, и ознакомлению с ними всего мира. Наша цель — красиво передать нашу историю будущим поколениям.",
    stats_places: "Исторические памятники",
    search_placeholder: "Поиск...",
    no_results: "Ничего не найдено...",
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("UZ");

  useEffect(() => {
    const saved = localStorage.getItem("language") || "UZ";
    setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.UZ[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
