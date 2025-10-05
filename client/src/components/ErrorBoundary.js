// client/src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2 style={{ color: "red" }}>⚠ Something went wrong. Please refresh.</h2>
          <h4 style={{ color: "#333" }}>{this.state.error?.toString()}</h4>
          <details style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: 10, marginTop: 10 }}>
            {this.state.info?.componentStack || "No stack available"}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
