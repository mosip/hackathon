import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';

const LanguageRedirect = () => {
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = window.location.pathname;
        const supportedLanguages = ['en', 'fr', 'pt'];
        const pathSegments = currentPath.split('/').filter(Boolean);
        const currentLangInPath = pathSegments[0];
        const hasLangInPath = supportedLanguages.includes(currentLangInPath);

        if (!hasLangInPath) {
            const newPath = `/${i18n.language}${currentPath}`;
            navigate(newPath, {replace: true});
        }
    }, [i18n.language, navigate, location.pathname]);

    return null;
};

export default LanguageRedirect;
