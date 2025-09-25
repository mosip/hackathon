import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageRedirect = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const currentPath = window.location.pathname;
        const supportedLanguages = ['en', 'fr', 'pt'];
        const pathSegments = currentPath.split('/').filter(Boolean);
        const currentLangInPath = pathSegments[0];
        const hasLangInPath = supportedLanguages.includes(currentLangInPath);

        if (!hasLangInPath) {
            const newPath = `/${i18n.language}${currentPath}`;
            window.location.replace(window.location.origin + newPath);
        }
    }, [i18n.language]);

    return null;
};

export default LanguageRedirect;
