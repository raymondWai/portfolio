import { Button, Step, Stepper } from '@mui/material';
import React, { MouseEvent } from 'react';
import { TFunction } from 'react-i18next';
import { sections } from 'src/constants/resumeData';
import StyledStepLabel from './StyledStepLabel';

interface HomeNavProps {
    expanded: boolean;
    activeSection: number;
    t: TFunction;
    onSectionClick: (section: string) => void;
    onExpand: (e: MouseEvent<HTMLButtonElement>) => void;
}
const HomeNav = ({
    expanded,
    activeSection,
    t,
    onSectionClick,
    onExpand,
}: HomeNavProps) => (
    <>
        <Stepper
            orientation='vertical'
            activeStep={activeSection}
            sx={{
                marginLeft: '0.5rem',
            }}
        >
            {sections.map((section, index) => (
                <Step key={index} onClick={() => onSectionClick(section)}>
                    <StyledStepLabel>{t(`general:${section}`)}</StyledStepLabel>
                </Step>
            ))}
        </Stepper>
        <Button
            sx={{
                marginBottom: '0.5rem',
                marginLeft: '0.5rem',
                textAlign: 'right',
                justifyContent: 'flex-start',
                opacity: activeSection !== 0 ? 1 : 0,
            }}
            onClick={onExpand}
        >
            {t(`general:${expanded ? 'collapse_all' : 'expand_all'}`)}
        </Button>
    </>
);
export default HomeNav;
