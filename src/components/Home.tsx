import React, {
    forwardRef,
    RefObject,
    MouseEvent,
    useRef,
    useState,
    useEffect,
} from 'react';
import {
    Dialog,
    Fab,
    Grid,
    GridTypeMap,
    Step,
    StepContent,
    Stepper,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { ResumeEntryType } from 'src/constants/resumeData';
import { useTheme } from '@mui/styles';
import { TFunction } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import NavigationIcon from '@mui/icons-material/Navigation';
import { getDisplayType } from 'src/utils/getDisplayType';
import { useWindowSize } from 'src/hooks/useWindowSize';
import StyledStepLabel from './StyledStepLabel';
import HomeNav from './HomeNav';

const HomePageContainer = forwardRef<
    RefObject<HTMLDivElement>,
    DefaultComponentProps<GridTypeMap<{}, 'div'>> & { component: 'div' }
>(({ children, ...restProps }, ref) => (
    <Grid {...restProps} ref={ref as RefObject<HTMLDivElement>}>
        {children}
    </Grid>
));

interface HomeProps {
    expanded: boolean;
    resumeEntries: Array<ResumeEntryType & { expanded: boolean }>;
    activeSection: number;
    navDialogShow: boolean;
    t: TFunction;
    onExpand: (e: MouseEvent<HTMLButtonElement>) => void;
    onTitleClick: (e: MouseEvent<HTMLDivElement>, index: number) => void;
    onSectionClick: (section: string) => void;
    onNavDialogShow: (e: MouseEvent<HTMLButtonElement>) => void;
}
const Home = ({
    resumeEntries,
    expanded,
    activeSection,
    navDialogShow,
    t,
    onExpand,
    onTitleClick,
    onSectionClick,
    onNavDialogShow,
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

    const isSM = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <HomePageContainer
            container
            direction={'row'}
            component='div'
            flexGrow={1}
            flexWrap={'wrap'}
            sx={{
                display: 'flex',
            }}
        >
            <Grid
                item
                container
                xs={isSM ? 9 : 12}
                justifyContent={isSM ? 'flex-start' : 'center'}
                alignContent={'center'}
                flexGrow={1}
                sx={{
                    overflowY: 'scroll',
                    display: displayType,
                    [theme.breakpoints.down('sm')]: {
                        width: '100vw',
                    },
                    [theme.breakpoints.up('sm')]: {
                        paddingLeft: '5%',
                        maxHeight: 'max(12rem, 100vh - 5rem)',
                    },
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
            {!isSM && (
                <Fab
                    color='primary'
                    sx={{
                        position: 'absolute',
                        bottom: 50,
                        right: 10,
                    }}
                    onClick={onNavDialogShow}
                >
                    <NavigationIcon />
                </Fab>
            )}

            {isSM && (
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
                    <HomeNav
                        expanded={expanded}
                        activeSection={activeSection}
                        t={t}
                        onSectionClick={onSectionClick}
                        onExpand={onExpand}
                    />
                </Grid>
            )}
            <Dialog
                open={navDialogShow}
                onClose={onNavDialogShow}
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.default',
                    },
                }}
            >
                <Grid
                    item
                    container
                    direction='column'
                    justifyContent={'space-between'}
                    xs={3}
                >
                    <HomeNav
                        expanded={expanded}
                        activeSection={activeSection}
                        t={t}
                        onSectionClick={onSectionClick}
                        onExpand={onExpand}
                    />
                </Grid>
            </Dialog>
        </HomePageContainer>
    );
};
Home.propTypes = {};
export default Home;
