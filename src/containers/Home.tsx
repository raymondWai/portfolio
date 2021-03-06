import React, {
    memo,
    useCallback,
    useState,
    MouseEvent,
    useMemo,
    useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProps } from 'react-router-dom';
import {
    workExperiences,
    sections,
    personalInfos,
    educations,
    skills,
    languages,
} from 'src/constants/resumeData';
import Home from '../components/Home';

const HomeContainer = (props: RouteProps) => {
    const { t } = useTranslation(['general']);
    const [resumeEntries, setResumeEntries] = useState(
        //resume data
        workExperiences.map((exp) => ({
            ...exp,
            expanded: false,
        }))
    );
    const [activeSection, setActiveSection] = useState(0); //state of right sidebar
    const [navDialogShow, setNavDialogShow] = useState(false);
    const expanded = useMemo(
        () => resumeEntries.filter((entry) => !entry.expanded).length === 0, //true if all resume entry shown expanded
        [resumeEntries]
    );

    const onExpand = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (activeSection !== 0) {
                setResumeEntries(
                    resumeEntries.map((exp) => ({
                        ...exp,
                        expanded: !expanded,
                    }))
                );
            }
        },
        [setResumeEntries, resumeEntries, expanded, activeSection]
    );
    const onTitleClick = useCallback(
        (
            e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
            index: number
        ) => {
            if (activeSection !== 0) {
                const newEntries = [...resumeEntries];
                newEntries[index].expanded = !newEntries[index].expanded;
                setResumeEntries(newEntries);
            }
        },
        [setResumeEntries, resumeEntries, activeSection]
    );
    const onSectionClick = useCallback(
        (newSection: string) => {
            setActiveSection(
                sections.findIndex((section) => section === newSection)
            );
        },
        [setActiveSection]
    );
    const onNavDialogShow = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            setNavDialogShow(!navDialogShow);
        },
        [navDialogShow, setNavDialogShow]
    );

    useEffect(() => {
        // expand corr. entries when active section changed
        switch (activeSection) {
            case 0:
                setResumeEntries(
                    personalInfos.map((personalInfo) => ({
                        ...personalInfo,
                        expanded: true,
                    }))
                );
                break;
            case 1:
                setResumeEntries(
                    workExperiences.map((exp) => ({
                        ...exp,
                        expanded: true,
                    }))
                );
                break;
            case 2:
                setResumeEntries(
                    educations.map((education) => ({
                        ...education,
                        expanded: true,
                    }))
                );
                break;
            case 3:
                setResumeEntries(
                    skills.map((skill) => ({
                        ...skill,
                        expanded: true,
                    }))
                );
                break;
            case 4:
                setResumeEntries(
                    languages.map((language) => ({
                        ...language,
                        expanded: true,
                    }))
                );
                break;
            default:
                return setResumeEntries([]);
        }
    }, [activeSection, setResumeEntries]);
    return (
        <Home
            resumeEntries={resumeEntries}
            expanded={expanded}
            activeSection={activeSection}
            navDialogShow={navDialogShow}
            onExpand={onExpand}
            t={t}
            onTitleClick={onTitleClick}
            onSectionClick={onSectionClick}
            onNavDialogShow={onNavDialogShow}
        />
    );
};
export default memo(HomeContainer);
