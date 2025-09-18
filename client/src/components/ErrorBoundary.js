import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to Render logs or console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          ⚠ Something went wrong. Please refresh.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
