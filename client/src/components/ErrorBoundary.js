import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>⚠ Oops! Something went wrong.</h2>
          <p>Please refresh or return to the home page.</p>

          <button onClick={() => window.location.reload()}>
            🔁 Refresh
          </button>

          <button onClick={() => (window.location.href = "/")}>
            🏠 Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;



