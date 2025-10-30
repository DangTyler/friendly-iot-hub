import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Settings } from "lucide-react";

const Sensors = () => {
  const sensors = [
    { id: "S001", name: "Temp Sensor A1", type: "Temperature", project: "Greenhouse", status: "active", lastReading: "22.5°C" },
    { id: "S002", name: "Humidity Sensor B2", type: "Humidity", project: "Lab Building", status: "active", lastReading: "65%" },
    { id: "S003", name: "Air Quality C3", type: "Air Quality", project: "Warehouse", status: "warning", lastReading: "AQI 85" },
    { id: "S004", name: "Water Level D4", type: "Water Level", project: "Greenhouse", status: "active", lastReading: "75%" },
    { id: "S005", name: "Temp Sensor E5", type: "Temperature", project: "Lab Building", status: "inactive", lastReading: "N/A" },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sensors</h1>
            <p className="text-muted-foreground mt-1">Monitor all connected IoT sensors</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Sensor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sensor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Reading</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensors.map((sensor) => (
                  <TableRow key={sensor.id}>
                    <TableCell className="font-medium">{sensor.id}</TableCell>
                    <TableCell>{sensor.name}</TableCell>
                    <TableCell>{sensor.type}</TableCell>
                    <TableCell>{sensor.project}</TableCell>
                    <TableCell>
                      <StatusBadge status={sensor.status as any} />
                    </TableCell>
                    <TableCell>{sensor.lastReading}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sensors;
