import { StepLabel, stepLabelClasses } from "@mui/material";
import { styled } from "@mui/styles";

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    [`& .${stepLabelClasses.label}`]: {
        color: `${theme.palette.secondary.main} !important`,
    },
}));
export default StyledStepLabel;