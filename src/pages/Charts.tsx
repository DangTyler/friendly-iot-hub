import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Charts = () => {
  const tempHumidityData = [
    { time: "00:00", temperature: 22, humidity: 65 },
    { time: "04:00", temperature: 20, humidity: 70 },
    { time: "08:00", temperature: 24, humidity: 60 },
    { time: "12:00", temperature: 28, humidity: 55 },
    { time: "16:00", temperature: 26, humidity: 58 },
    { time: "20:00", temperature: 23, humidity: 63 },
  ];

  const airQualityData = [
    { time: "00:00", aqi: 45, pm25: 12 },
    { time: "04:00", aqi: 38, pm25: 10 },
    { time: "08:00", aqi: 52, pm25: 15 },
    { time: "12:00", aqi: 68, pm25: 20 },
    { time: "16:00", aqi: 85, pm25: 28 },
    { time: "20:00", aqi: 62, pm25: 18 },
  ];

  const waterLevelData = [
    { time: "00:00", level: 75 },
    { time: "04:00", level: 73 },
    { time: "08:00", level: 70 },
    { time: "12:00", level: 68 },
    { time: "16:00", level: 72 },
    { time: "20:00", level: 74 },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Real-time environmental data visualization</p>
        </div>

        <Tabs defaultValue="temp" className="space-y-6">
          <TabsList>
            <TabsTrigger value="temp">Temperature & Humidity</TabsTrigger>
            <TabsTrigger value="air">Air Quality</TabsTrigger>
            <TabsTrigger value="water">Water Level</TabsTrigger>
          </TabsList>

          <TabsContent value="temp">
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Humidity Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={tempHumidityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)"
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="air">
            <Card>
              <CardHeader>
                <CardTitle>Air Quality Index & PM2.5</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={airQualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)"
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="aqi" 
                      stroke="hsl(var(--accent))" 
                      fill="hsl(var(--accent) / 0.2)"
                      strokeWidth={2}
                      name="AQI"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pm25" 
                      stroke="hsl(var(--destructive))" 
                      fill="hsl(var(--destructive) / 0.2)"
                      strokeWidth={2}
                      name="PM2.5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water">
            <Card>
              <CardHeader>
                <CardTitle>Water Level Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={waterLevelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)"
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="level" 
                      stroke="hsl(var(--secondary))" 
                      fill="hsl(var(--secondary) / 0.3)"
                      strokeWidth={2}
                      name="Water Level (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Charts;
