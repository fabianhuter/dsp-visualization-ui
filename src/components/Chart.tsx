import { FunctionData } from "../types/types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

import {FC} from 'react';

interface ChartProps {
    data: FunctionData[];
    xLabel: string;
    yLabel: string;
}

const Chart: FC<ChartProps> = ({ data, xLabel, yLabel }) => {
    if(data.length === 0) {
        return <h1>No Data here</h1>;
    }
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" label={{ value: xLabel, position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
