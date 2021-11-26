import React, { memo } from 'react';
import Demo from 'src/components/Demo';
interface DemoProps {}
const DemoContainer = (props: DemoProps) => {
    return <Demo />;
};
export default memo(DemoContainer);
