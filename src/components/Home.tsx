import React, {
    forwardRef,
    RefObject,
    MouseEvent,
    useRef,
    useState,
    useEffect,
} from 'react';
import {
    Button,
    Grid,
    GridTypeMap,
    Step,
    StepContent,
    StepLabel,
    stepLabelClasses,
    Stepper,
    Typography,
} from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { ResumeEntryType, sections } from 'src/constants/resumeData';
import { styled, useTheme } from '@mui/styles';
import { TFunction } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { getDisplayType } from 'src/utils/getDisplayType';
import { useWindowSize } from 'src/hooks/useWindowSize';

const HomePageContainer = forwardRef<
    RefObject<HTMLDivElement>,
    DefaultComponentProps<GridTypeMap<{}, 'div'>> & { component: 'div' }
>(({ children, ...restProps }, ref) => (
    <Grid {...restProps} ref={ref as RefObject<HTMLDivElement>}>
        {children}
    </Grid>
));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    [`& .${stepLabelClasses.label}`]: {
        color: `${theme.palette.secondary.main} !important`,
    },
}));
interface HomeProps {
    expanded: boolean;
    resumeEntries: Array<ResumeEntryType & { expanded: boolean }>;
    activeSection: number;
    t: TFunction;
    onExpand: (e: MouseEvent<HTMLButtonElement>) => void;
    onTitleClick: (e: MouseEvent<HTMLDivElement>, index: number) => void;
    onSectionClick: (section: string) => void;
}
const Home = ({
    resumeEntries,
    expanded,
    activeSection,
    t,
    onExpand,
    onTitleClick,
    onSectionClick,
}: HomeProps) => {
    const theme = useTheme();

    const stepperContainerRef = useRef<HTMLDivElement>(null);
    const stepperRef = useRef<HTMLDivElement>(null);
    const [displayType, setDisplayType] = useState('flex');
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [_, windowHeight] = useWindowSize();
    /* eslint-enable @typescript-eslint/no-unused-vars */

    useEffect(() => {
        setDisplayType(getDisplayType(stepperContainerRef, stepperRef));
    }, [windowHeight, setDisplayType, stepperContainerRef, stepperRef]);
    return (
        <HomePageContainer
            container
            direction={'row'}
            component='div'
            sx={{
                height: '100%',
            }}
        >
            <Grid
                item
                container
                xs={9}
                justifyContent={'flex-start'}
                alignContent={'center'}
                flexGrow={1}
                sx={{
                    paddingLeft: '5%',
                    maxHeight: 'max(12rem, 100vh - 5rem)',
                    overflowY: 'scroll',
                    display: displayType,
                }}
                ref={stepperContainerRef}
            >
                <Stepper
                    orientation='vertical'
                    activeStep={-1}
                    sx={{
                        maxWidth: '80%',
                    }}
                    ref={stepperRef}
                >
                    {resumeEntries.map((step, index) => (
                        <Step key={index} expanded={step.expanded}>
                            <StyledStepLabel
                                optional={
                                    <Grid item container direction={'column'}>
                                        <Typography
                                            sx={{
                                                color: 'secondary.light',
                                            }}
                                        >
                                            {step.company}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'secondary.light',
                                            }}
                                        >
                                            {step.duration}
                                        </Typography>
                                    </Grid>
                                }
                                StepIconComponent={(props) => (
                                    <InfoIcon sx={{ color: 'primary.main' }} />
                                )}
                                onClick={(e: MouseEvent<HTMLDivElement>) =>
                                    onTitleClick(e, index)
                                }
                            >
                                {step.position}
                            </StyledStepLabel>
                            <StepContent>{step.description}</StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid
                item
                container
                direction='column'
                justifyContent={'space-between'}
                xs={3}
                sx={{
                    borderLeft: `0.1rem solid ${theme.palette.primary.main}`,
                }}
            >
                <Stepper
                    orientation='vertical'
                    activeStep={activeSection}
                    sx={{
                        marginLeft: '0.5rem',
                    }}
                >
                    {sections.map((section, index) => (
                        <Step
                            key={index}
                            onClick={() => onSectionClick(section)}
                        >
                            <StyledStepLabel>
                                {t(`general:${section}`)}
                            </StyledStepLabel>
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
            </Grid>
        </HomePageContainer>
    );
};
Home.propTypes = {};
export default Home;
