import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { time: '00:00', tps: 20, cpu: 30, memory: 45 },
  { time: '01:00', tps: 19.5, cpu: 35, memory: 48 },
  { time: '02:00', tps: 19.8, cpu: 40, memory: 52 },
  { time: '03:00', tps: 20, cpu: 38, memory: 50 },
  { time: '04:00', tps: 19.7, cpu: 42, memory: 55 },
  { time: '05:00', tps: 19.9, cpu: 45, memory: 58 },
];

export function Performance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Server Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time"
                  padding={{ left: 0, right: 0 }}
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                />
                <YAxis
                  padding={{ top: 20, bottom: 20 }}
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tps" 
                  stroke="hsl(var(--chart-1))" 
                  name="TPS"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="hsl(var(--chart-2))" 
                  name="CPU %"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="hsl(var(--chart-3))" 
                  name="Memory %"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average TPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.8</div>
            <p className="text-xs text-muted-foreground">Last 6 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Peak Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <p className="text-xs text-muted-foreground">4GB / 8GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average CPU Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <p className="text-xs text-muted-foreground">Last 6 hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}