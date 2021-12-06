import { ForcastUnitType } from 'src/store/types';

enum TempUnit {
    K = 'K',
    C = 'C',
    F = 'F',
}

export const tempUnitMap: {
    [key in TempUnit]: ForcastUnitType;
} = {
    [TempUnit.K]: ForcastUnitType.Standard,
    [TempUnit.C]: ForcastUnitType.Metric,
    [TempUnit.F]: ForcastUnitType.Imperial,
};
export default TempUnit;
