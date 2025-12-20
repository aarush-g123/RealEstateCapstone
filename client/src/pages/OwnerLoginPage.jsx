import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Prototype-only Google owner sign-in using Google Identity Services (GIS).
// Access is restricted to a single "owner" email set in VITE_OWNER_EMAIL.
export default function OwnerLoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // idle | ok | denied | error
  const [message, setMessage] = useState("");

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL;

  const canInit = useMemo(() => Boolean(clientId), [clientId]);

  useEffect(() => {
    // If already signed in, skip
    const already = localStorage.getItem("ownerAuthed") === "true";
    if (already) {
      navigate("/dashboard");
      return;
    }

    if (!canInit) {
      setStatus("error");
      setMessage("Missing VITE_GOOGLE_CLIENT_ID. Add it to client/.env to enable Google sign-in.");
      return;
    }

    // Wait until the GIS script is available
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(document.getElementById("googleSignInDiv"), {
          theme: "outline",
          size: "large",
          width: 280,
        });

        // Optional: show One Tap (disabled by default for predictable demos)
        // window.google.accounts.id.prompt();
      }
    }, 50);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canInit, clientId, navigate]);

  function handleCredentialResponse(response) {
    try {
      // Decode the JWT payload (prototype-level). In production, verify on the backend.
      const payload = decodeJwtPayload(response.credential);
      const email = payload?.email;

      if (!email) {
        setStatus("error");
        setMessage("Could not read email from Google credential.");
        return;
      }

      // If an owner email is provided, enforce it
      if (ownerEmail && email.toLowerCase() !== String(ownerEmail).toLowerCase()) {
        setStatus("denied");
        setMessage(`Access denied. Signed in as ${email}, but this page is restricted to the site owner.`);
        localStorage.removeItem("ownerAuthed");
        localStorage.removeItem("ownerEmail");
        return;
      }

      localStorage.setItem("ownerAuthed", "true");
      localStorage.setItem("ownerEmail", email);

      setStatus("ok");
      setMessage(`Signed in as ${email}. Redirecting…`);
      navigate("/dashboard");
    } catch (e) {
      setStatus("error");
      setMessage("Google sign-in failed. Try again.");
    }
  }

  function decodeJwtPayload(jwt) {
    const parts = jwt.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8">
      <h1 className="text-3xl font-bold">Owner Sign In</h1>
      <p className="mt-2 text-slate-600">
        Sign in with Google to view the dashboard.
      </p>

      <div className="mt-6 flex flex-col gap-3 items-start">
        <div id="googleSignInDiv" />

        {status !== "idle" && (
          <div
            className={`text-sm ${
              status === "ok"
                ? "text-emerald-700"
                : status === "denied"
                ? "text-rose-700"
                : "text-amber-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="text-xs text-slate-500 max-w-prose">
          {!ownerEmail && (
            <p className="mt-2">
              Tip: set <span className="font-mono">VITE_OWNER_EMAIL</span> in <span className="font-mono">client/.env</span>{" "}
              to restrict sign-in to a single owner account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
