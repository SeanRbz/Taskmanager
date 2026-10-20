import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@/shared/theme';
import { Button, EmptyState } from '@/shared/ui';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

/** Last line of defence: renders a recoverable fallback instead of a white screen. */
export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Hook a crash reporter (e.g. Sentry) in here.
    console.error('Unhandled UI error', error, info.componentStack);
  }

  private reset = () => this.setState({ error: null });

  render() {
    return this.state.error ? <ErrorFallback onRetry={this.reset} /> : this.props.children;
  }
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <EmptyState
        icon="alert-triangle"
        title="Something went wrong"
        message="An unexpected error occurred. Try again — if it keeps happening, restart the app."
        action={<Button label="Try again" icon="refresh-cw" onPress={onRetry} />}
      />
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
}));
