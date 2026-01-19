export const languages = {
    en: 'English',
    es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
    en: {
        nav: {
            work: 'Work',
            services: 'Services',
            contact: "Let's Talk",
        },
        hero: {
            badge: 'Accepting new clients for Q1 2025',
            title: 'We craft',
            typewriter: [
                'generative AI.',
                'automation workflows.',
                'web platforms.',
                'mobile apps.',
            ],
            subtitle:
                'Boxting Labs is the premium engineering partner for visionary companies. We translate complex requirements into elegant, scalable software.',
            cta: {
                primary: 'Start a Project',
                secondary: 'View Case Studies',
            },
        },
        services: {
            title: 'Our Expertise',
            subtitle:
                'We believe in clean code, user-centric design, and transparent communication.',
            items: [
                {
                    title: 'Cloud Native',
                    description:
                        'Scalable infrastructure built on AWS/Azure/GCP with modern serverless patterns.',
                },
                {
                    title: 'AI Integration',
                    description:
                        'Leveraging LLMs and machine learning to build intelligent, automated workflows.',
                },
                {
                    title: 'Rapid Deployment',
                    description:
                        'We value speed without compromising quality. CI/CD pipelines for instant feedback.',
                },
            ],
        },
        work: {
            title: 'Selected Work',
            subtitle: 'A curated selection of our most impactful projects.',
            viewCaseStudy: 'View Case Study',
            projects: [
                {
                    title: 'Jalhuca',
                    category: 'Mobile Application',
                    description:
                        'A revolutionary logistics platform connecting local drivers with instant delivery requests. Features real-time tracking, secure payments, and an intuitive driver interface.',
                },
                {
                    title: 'Ava Cash',
                    category: 'Fintech Solution',
                    description:
                        'Next-generation personal finance management. Ava Cash empowers users to track expenses, invest in crypto, and manage savings goals with AI-driven insights.',
                },
                {
                    title: 'New Transport',
                    category: 'Web Platform',
                    description:
                        'A comprehensive fleet management dashboard for enterprise logistics. Real-time vehicle telemetry, route optimization, and driver performance analytics in one unified view.',
                },
            ],
        },
        contact: {
            title: 'Ready to build something',
            highlight: 'amazing?',
            subtitle:
                "Let's discuss your project and how we can help you achieve your goals.",
            form: {
                name: 'Name',
                email: 'Email',
                submit: 'Send Message',
            },
        },
        footer: {
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            rights: 'All rights reserved.',
        },
    },
    es: {
        nav: {
            work: 'Proyectos',
            services: 'Servicios',
            contact: 'Hablemos',
        },
        hero: {
            badge: 'Aceptando nuevos clientes para Q1 2025',
            title: 'Creamos',
            typewriter: [
                'IA generativa.',
                'automatización.',
                'plataformas web.',
                'apps móviles.',
            ],
            subtitle:
                'Boxting Labs es el socio de ingeniería premium para empresas visionarias. Transformamos requisitos complejos en software elegante y escalable.',
            cta: {
                primary: 'Iniciar Proyecto',
                secondary: 'Ver Casos de Estudio',
            },
        },
        services: {
            title: 'Nuestra Experiencia',
            subtitle:
                'Creemos en el código limpio, el diseño centrado en el usuario y la comunicación transparente.',
            items: [
                {
                    title: 'Nativa de Nube',
                    description:
                        'Infraestructura escalable construida en AWS/Azure/GCP con patrones serverless modernos.',
                },
                {
                    title: 'Integración de IA',
                    description:
                        'Aprovechando LLMs y aprendizaje automático para construir flujos de trabajo inteligentes y automatizados.',
                },
                {
                    title: 'Despliegue Rápido',
                    description:
                        'Valoramos la velocidad sin comprometer la calidad. Pipelines CI/CD para retroalimentación instantánea.',
                },
            ],
        },
        work: {
            title: 'Proyectos Destacados',
            subtitle: 'Una selección curada de nuestros proyectos de mayor impacto.',
            viewCaseStudy: 'Ver Caso de Estudio',
            projects: [
                {
                    title: 'Jalhuca',
                    category: 'Aplicación Móvil',
                    description:
                        'Una plataforma logística revolucionaria que conecta conductores locales con solicitudes de entrega instantáneas. Rastreo en tiempo real y pagos seguros.',
                },
                {
                    title: 'Ava Cash',
                    category: 'Solución Fintech',
                    description:
                        'Gestión de finanzas personales de próxima generación. Ava Cash permite a los usuarios rastrear gastos, invertir en cripto y gestionar metas de ahorro con IA.',
                },
                {
                    title: 'New Transport',
                    category: 'Plataforma Web',
                    description:
                        'Un panel integral de gestión de flotas para logística empresarial. Telemetría vehicular en tiempo real y análisis de rendimiento.',
                },
            ],
        },
        contact: {
            title: '¿Listo para construir algo',
            highlight: 'increíble?',
            subtitle:
                'Hablemos sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos.',
            form: {
                name: 'Nombre',
                email: 'Correo',
                submit: 'Enviar Mensaje',
            },
        },
        footer: {
            privacy: 'Política de Privacidad',
            terms: 'Términos de Servicio',
            rights: 'Todos los derechos reservados.',
        },
    },
} as const;
