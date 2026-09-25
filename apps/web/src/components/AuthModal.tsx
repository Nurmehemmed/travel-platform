"use client";

import { useState } from "react";
import { MapPin, Eye, EyeOff, X, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { BrandLogo } from "@/components/BrandLogo";

export interface AuthUser {
  id: string;
  name?: string | null;
  email: string;
  role?: string | null;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "login",
}: AuthModalProps) {
  const { t, language, showToast } = useLanguage();
  const [authMode, setAuthMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSocialNotice(null);
    setAuthLoading(true);

    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        authMode === "login"
          ? { email, password }
          : { name: fullName, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setAuthError(data.error || "Authentication failed. Please check your credentials.");
      } else {
        onSuccess(data.user);
        onClose();
        setEmail("");
        setPassword("");
        setFullName("");
        const name = data.user.name || data.user.email?.split("@")[0] || "";
        const successMsg =
          authMode === "login"
            ? language === "AZ"
              ? `Xoş gəldiniz, ${name}!`
              : language === "RU"
              ? `Добро пожаловать, ${name}!`
              : language === "FR"
              ? `Bienvenue, ${name} !`
              : language === "AR"
              ? `مرحباً بك، ${name}!`
              : language === "DE"
              ? `Willkommen, ${name}!`
              : `Welcome back, ${name}!`
            : language === "AZ"
            ? "Hesabınız yaradıldı!"
            : language === "RU"
            ? "Аккаунт успешно создан!"
            : language === "FR"
            ? "Compte créé avec succès !"
            : language === "AR"
            ? "تم إنشاء الحساب بنجاح!"
            : language === "DE"
            ? "Konto erfolgreich erstellt!"
            : "Account created successfully!";
        showToast(successMsg, "success");
      }
    } catch {
      setAuthError("Network error occurred. Please check your connection.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-[440px] rounded-3xl p-8 shadow-2xl animate-scale-up"
        style={{
          backgroundColor: "#f0f9ff",
          border: "1px solid #e0f2fe",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <BrandLogo variant="dark" />
        </div>

        {/* Tab Pill Switcher */}
        <div className="flex rounded-full border border-[#e5dcd0] p-1 bg-white mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode("login");
              setAuthError(null);
              setSocialNotice(null);
            }}
            className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all cursor-pointer ${
              authMode === "login"
                ? "text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            style={authMode === "login" ? { backgroundColor: "#0f3460" } : {}}
          >
            {t.auth.loginTab}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setAuthError(null);
              setSocialNotice(null);
            }}
            className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all cursor-pointer ${
              authMode === "signup"
                ? "text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            style={authMode === "signup" ? { backgroundColor: "#0f3460" } : {}}
          >
            {t.auth.signupTab}
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
            {authMode === "login" ? t.auth.welcomeBack : t.auth.createAccount}
          </h3>
          <p className="text-xs text-slate-500">
            {authMode === "login" ? t.auth.loginSubtitle : t.auth.signupSubtitle}
          </p>
        </div>

        {/* Social Notice / API Guidance */}
        {socialNotice && (
          <div className="mb-4 rounded-xl p-3 text-xs leading-relaxed bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>{socialNotice}</div>
          </div>
        )}

        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-4 rounded-xl p-3 text-xs leading-relaxed bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div>{authError}</div>
          </div>
        )}

        {/* Social Buttons */}
        <div className="space-y-2.5 mb-5">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/api/auth/oauth/google";
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e2d8cc] bg-white py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            {t.auth.continueGoogle}
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/api/auth/oauth/apple";
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#111111] py-2.5 px-4 text-xs font-semibold text-white hover:bg-black transition-colors shadow-sm cursor-pointer"
          >
            <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.04-2.85 0-.14-.01-.29-.04-.42-.99.04-2.19.66-2.9 1.48-.56.65-1.05 1.7-1.05 2.76 0 .15.02.31.04.42 1.07.08 2.29-.54 2.91-1.39z" />
            </svg>
            {t.auth.continueApple}
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e2d8cc]" />
          </div>
          <span className="relative bg-[#f0f9ff] px-3 text-[11px] text-slate-400">
            {t.auth.orEmail}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3">
          {authMode === "signup" && (
            <div>
              <input
                type="text"
                required
                placeholder={t.auth.fullNamePlaceholder}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-[#e2d8cc] bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0f3460] transition-colors"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              placeholder={t.auth.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#e2d8cc] bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0f3460] transition-colors"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={t.auth.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#e2d8cc] bg-white px-4 py-2.5 pr-10 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0f3460] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {authMode === "login" && (
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  className="text-[11px] font-semibold hover:underline cursor-pointer"
                  style={{ color: "#f59e0b" }}
                >
                  {t.auth.forgotPassword}
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold text-white transition-all duration-200 hover:opacity-95 shadow-md cursor-pointer mt-3 disabled:opacity-70"
            style={{ backgroundColor: "#0f3460" }}
          >
            {authLoading && <Loader2 className="h-4 w-4 animate-spin text-white" />}
            {authMode === "login"
              ? authLoading
                ? t.auth.loggingIn
                : t.auth.loginBtn
              : authLoading
              ? t.auth.creatingAccount
              : t.auth.createAccountBtn}
          </button>
        </form>

        {/* Bottom Toggle */}
        <p className="mt-5 text-center text-xs text-slate-500">
          {authMode === "login" ? (
            <>
              {t.auth.noAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthError(null);
                  setSocialNotice(null);
                }}
                className="font-semibold hover:underline cursor-pointer"
                style={{ color: "#f59e0b" }}
              >
                {t.auth.signUpFree}
              </button>
            </>
          ) : (
            <>
              {t.auth.haveAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                  setSocialNotice(null);
                }}
                className="font-semibold hover:underline cursor-pointer"
                style={{ color: "#f59e0b" }}
              >
                {t.auth.logInLink}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
