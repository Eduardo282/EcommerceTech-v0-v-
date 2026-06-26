import { Component } from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback || (
          <section className="min-h-[320px] rounded-2xl bg-red-950/30 p-8 text-red-100">
            <h2 className="mb-2 text-2xl font-semibold">Something went wrong</h2>
            <p className="text-sm text-red-100/80">
              Please refresh the page or try again in a moment.
            </p>
          </section>
        )
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
