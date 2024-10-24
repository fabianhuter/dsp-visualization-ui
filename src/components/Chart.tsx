import { SineWaveData } from "../types/types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

import React, {FC} from 'react';

interface ChartProps {
    data: SineWaveData[];
}

const Chart: FC<ChartProps> = ({ data }) => {
    if(data.length === 0) {
        return <h1>No Data here</h1>;
    }
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" label={{ value: 'Samples', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
