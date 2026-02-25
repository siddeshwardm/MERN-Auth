export default function Welcome() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="auth-shell">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-title">Welcome{user?.name ? `, ${user.name}` : ""}</div>
          <div className="welcome-hero">
            You’re logged in{user?.email ? ` as ${user.email}` : ""}.
          </div>
        </div>

        <button className="btn btn-danger" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}