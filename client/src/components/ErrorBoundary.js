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
          <p>{this.state.error?.toString()}</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.info?.componentStack || "No stack available"}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
