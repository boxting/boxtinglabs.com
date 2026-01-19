'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface LanguageSwitcherProps {
    currentLang: 'en' | 'es';
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
    const toggleLanguage = () => {
        const currentPath = window.location.pathname; // e.g. /boxtinglabs.com/ or /boxtinglabs.com/es/

        // Check if we are in local development (empty base or different) vs production
        // But simpler: just check for /es segment

        // Implementation that works with and without base path:
        // If currentLang is 'en', we want to insert '/es' after the base path or at start
        // If currentLang is 'es', we want to remove '/es' segment

        let newPath;

        if (currentLang === 'en') {
            // Going to Spanish
            // If path ends in / (root), append es/
            // If path is /boxtinglabs.com/, make it /boxtinglabs.com/es/

            // Heuristic: If path doesn't have /es/, add it.
            // CAREFUL: dealing with base path.

            if (currentPath.endsWith('/')) {
                newPath = `${currentPath}es/`;
            } else {
                newPath = `${currentPath}/es/`;
            }
        } else {
            // Going to English
            // We need to remove the /es or /es/ segment.
            // /boxtinglabs.com/es/ -> /boxtinglabs.com/
            newPath = currentPath.replace(/\/es\/?/, '/');
        }

        // Clean up double slashes if any happened
        newPath = newPath.replace('//', '/');

        window.location.href = newPath;
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-brand-navy-900 dark:text-brand-navy-50 gap-2"
        >
            <Globe size={18} />
            <span className="font-medium">{currentLang === 'en' ? 'ES' : 'EN'}</span>
        </Button>
    );
}
