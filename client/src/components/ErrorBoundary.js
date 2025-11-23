import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError)
      return (
        <div style={{ padding: 20 }}>
          <h2>⚠ Oops! Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;

