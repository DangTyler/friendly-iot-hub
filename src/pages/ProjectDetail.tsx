import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ZoneCard } from "@/components/ZoneCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Users, Radio, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - this would come from your backend
  const project = {
    id: 1,
    title: "Greenhouse Environmental Control",
    duration: "Jan 2025 - Jun 2025",
    employees: 5,
    status: "active",
    zones: [
      {
        id: "z1",
        name: "North Wing",
        description: "Primary growing area with climate control",
        leaderSensors: [
          {
            id: "l1",
            name: "North LoRa Gateway",
            type: "LoRa" as const,
            status: "active" as const,
            nodes: [
              { id: "n1", name: "Temp Sensor A1", type: "Temperature", status: "active" as const, lastReading: "22.5°C" },
              { id: "n2", name: "Humidity Sensor A2", type: "Humidity", status: "active" as const, lastReading: "65%" },
              { id: "n3", name: "Soil Moisture A3", type: "Moisture", status: "warning" as const, lastReading: "45%" },
            ],
          },
          {
            id: "l2",
            name: "North Raspberry Pi Hub",
            type: "Raspberry Pi" as const,
            status: "active" as const,
            nodes: [
              { id: "n4", name: "Air Quality B1", type: "Air Quality", status: "active" as const, lastReading: "AQI 45" },
              { id: "n5", name: "CO2 Sensor B2", type: "CO2", status: "active" as const, lastReading: "420 ppm" },
            ],
          },
        ],
      },
      {
        id: "z2",
        name: "South Wing",
        description: "Secondary growing area",
        leaderSensors: [
          {
            id: "l3",
            name: "South Zigbee Gateway",
            type: "Zigbee" as const,
            status: "active" as const,
            nodes: [
              { id: "n6", name: "Temp Sensor C1", type: "Temperature", status: "active" as const, lastReading: "21.8°C" },
              { id: "n7", name: "Light Sensor C2", type: "Light", status: "active" as const, lastReading: "850 lux" },
            ],
          },
        ],
      },
      {
        id: "z3",
        name: "Equipment Room",
        description: "HVAC and control systems monitoring",
        leaderSensors: [],
      },
    ],
  };

  const totalLeaders = project.zones.reduce((sum, zone) => sum + zone.leaderSensors.length, 0);
  const totalNodes = project.zones.reduce(
    (sum, zone) => sum + zone.leaderSensors.reduce((s, l) => s + l.nodes.length, 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/projects")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {project.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.employees} Employees
                </div>
                <div className="flex items-center gap-1">
                  <Radio className="h-4 w-4" />
                  {totalNodes} Total Sensors
                </div>
              </div>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Zone
          </Button>
        </div>

        <Tabs defaultValue="zones" className="space-y-6">
          <TabsList>
            <TabsTrigger value="zones">Zones & Sensors</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="zones" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Zones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{project.zones.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Leader Sensors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalLeaders}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Sensor Nodes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalNodes}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {project.zones.map((zone) => (
                <ZoneCard key={zone.id} zone={zone} projectId={project.id.toString()} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Team member management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Project-specific analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
