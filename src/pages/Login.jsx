import { useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const roles = {
  explorer: {
    label: "Explorer",
    title: "Mulai perjalanan belajar Anda.",
    description:
      "Bangun kebiasaan, selesaikan tantangan, dan lihat progres skill Anda.",
    email: "explorer@minichallenge.ai",
  },
  mentor: {
    label: "Mentor / Admin",
    title: "Bantu lebih banyak orang bertumbuh.",
    description:
      "Kelola challenge, pantau progres, dan bimbing komunitas Anda.",
    email: "mentor@minichallenge.ai",
  },
};

function Login({ onLogin }) {
  const [role, setRole] = useState("explorer");
  const [email, setEmail] = useState(roles.explorer.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function selectRole(nextRole) {
    setRole(nextRole);
    setEmail(roles[nextRole].email);
  }

  function submitLogin(event) {
    event.preventDefault();
    onLogin({
      role,
      name: role === "mentor" ? "Mentor Mini Challenge" : "Aden Wildan Zamzami",
      email,
    });
  }

  const currentRole = roles[role];

  return (
    <main className="login-page">
      <section className="login-showcase">
        <div className="login-brand">
          <div className="brand-mark">
            <BrainCircuit size={21} />
          </div>
          <strong>
            mini<span>challenge</span>
          </strong>
        </div>
        <div className="showcase-copy">
          <p className="eyebrow light">
            <Sparkles size={15} /> LEARNING SPACE
          </p>
          <h1>
            Small steps.
            <br />
            <em>Real growth.</em>
          </h1>
          <p>
            Ruang belajar untuk ide-ide yang ingin diwujudkan menjadi skill
            nyata.
          </p>
        </div>
        <div className="login-quote">
          <ShieldCheck size={17} />
          <span>Progress Anda tersimpan di satu tempat.</span>
        </div>
      </section>
      <section className="login-form-wrap">
        <div className="login-form-content">
          <div className="mobile-login-brand">
            <div className="brand-mark">
              <BrainCircuit size={21} />
            </div>
            <strong>
              mini<span>challenge</span>
            </strong>
          </div>
          <p className="eyebrow">WELCOME BACK</p>
          <h2>{currentRole.title}</h2>
          <p className="login-description">{currentRole.description}</p>
          <div
            className="role-tabs"
            role="tablist"
            aria-label="Pilih tipe akun"
          >
            {Object.entries(roles).map(([key, item]) => (
              <button
                key={key}
                className={role === key ? "selected" : ""}
                onClick={() => selectRole(key)}
                type="button"
              >
                <UserRound size={15} /> {item.label}
              </button>
            ))}
          </div>
          <form className="login-form" onSubmit={submitLogin}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Mail size={17} />
            </label>
            <label>
              Password
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label="Tampilkan password"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
                <LockKeyhole size={17} />
              </div>
            </label>
            <div className="login-options">
              <label className="remember">
                <input type="checkbox" /> Ingat saya
              </label>
              <button type="button" className="forgot-button">
                Lupa password?
              </button>
            </div>
            <button className="login-submit" type="submit">
              Masuk sebagai {currentRole.label} <ArrowRight size={17} />
            </button>
          </form>
          <p className="login-note">
            Demo login: isi password apa saja minimal 4 karakter.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
