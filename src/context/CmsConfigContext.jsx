import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getFooterConfig, getHeaderConfig } from '../services/strapi';
import { CmsConfigContext } from './CmsConfigContextBase';

export function CmsConfigProvider({ children }) {
  const [footerConfig, setFooterConfig] = useState(null);
  const [headerConfig, setHeaderConfig] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getHeaderConfig(), getFooterConfig()]).then(
      ([nextHeaderConfig, nextFooterConfig]) => {
        if (!isMounted) return;
        setHeaderConfig(nextHeaderConfig);
        setFooterConfig(nextFooterConfig);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      footerConfig,
      headerConfig,
    }),
    [footerConfig, headerConfig]
  );

  return <CmsConfigContext.Provider value={value}>{children}</CmsConfigContext.Provider>;
}

CmsConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
