import React from "react";
import { useNavigate } from "react-router-dom";

// 🔹 A functional wrapper to use navigate() inside the class
function ErrorBoundaryWrapper({ children }) {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("💥 Error caught by boundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.props.navigate("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h2>⚠ Oops! Something went wrong.</h2>
          <p style={styles.message}>Please refresh or return to the home page.</p>
          <div style={styles.buttons}>
            <button onClick={this.handleReload} style={styles.btnReload}>
              🔁 Refresh
            </button>
            <button onClick={this.handleGoHome} style={styles.btnHome}>
              🏠 Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  message: {
    fontSize: "16px",
    color: "#555",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  btnReload: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  btnHome: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ErrorBoundaryWrapper;





