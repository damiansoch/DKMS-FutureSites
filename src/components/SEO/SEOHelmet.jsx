import {Helmet} from 'react-helmet-async';
import {useLanguage} from '../../Context/LanguageContext';

const SEOHelmet = ({page}) => {
    const {language} = useLanguage();
    const siteUrl = import.meta.env.VITE_SITE_URL;

    const seoConfig = {
        home: {
            title: {
                pl: 'Strona główna | WebsiteFactory',
                en: 'Home | WebsiteFactory',
            },
            description: {
                pl: 'Witamy w WebsiteFactory. Tworzymy nowoczesne strony internetowe dopasowane do Twojej marki.',
                en: 'Welcome to WebsiteFactory. We create modern websites tailored to your brand.',
            },
        },
        process: {
            title: {
                pl: 'Proces | WebsiteFactory',
                en: 'Process | WebsiteFactory',
            },
            description: {
                pl: 'Poznaj nasz prosty i przejrzysty proces tworzenia stron internetowych.',
                en: 'Discover our simple and transparent web design process.',
            },
        },
        offer: {
            title: {
                pl: 'Oferta | WebsiteFactory',
                en: 'Offer | WebsiteFactory',
            },
            description: {
                pl: 'Nasza oferta obejmuje strony informacyjne i proste backendy.',
                en: 'Our offer includes informational websites and basic backend options.',
            },
        },
        about: {
            title: {
                pl: 'O nas | WebsiteFactory',
                en: 'About | WebsiteFactory',
            },
            description: {
                pl: 'Dowiedz się więcej o zespole WebsiteFactory i naszej misji.',
                en: 'Learn more about the WebsiteFactory team and our mission.',
            },
        },
    };

    const current = seoConfig[page];

    return (
        <Helmet>
            <title>{current?.title[language]}</title>
            <meta name="description" content={current?.description[language]}/>
            <meta property="og:title" content={current?.title[language]}/>
            <meta property="og:description" content={current?.description[language]}/>
            <meta property="og:url" content={`${siteUrl}/${page}`}/>
        </Helmet>
    );
};

export default SEOHelmet;
