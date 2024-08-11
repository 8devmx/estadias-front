import React, { useEffect } from 'react';

const chatbot = () => {
  useEffect(() => {
    // Cargar el script para el chatbot
    const scriptInject = document.createElement('script');
    scriptInject.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
    scriptInject.async = true;
    document.body.appendChild(scriptInject);

    // Cargar el script de configuración del chatbot
    const scriptConfig = document.createElement('script');
    scriptConfig.src = 'https://mediafiles.botpress.cloud/fb295648-e26a-4414-ad22-9920bebe09a2/webchat/v2/config.js';
    scriptConfig.async = true;
    document.body.appendChild(scriptConfig);

    // Limpieza de scripts cuando el componente se desmonta
    return () => {
      document.body.removeChild(scriptInject);
      document.body.removeChild(scriptConfig);
    };
  }, []);

  return <div id="bp-webchat" />;
};

export default chatbot;
