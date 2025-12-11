'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import PropTypes from 'prop-types';

const Toaster = (props) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        '--normal-bg': '#000',
        '--normal-text': 'var(--popover-foreground)',
      }}
      {...props}
    />
  );
};

Toaster.propTypes = {
  theme: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export { Toaster };
