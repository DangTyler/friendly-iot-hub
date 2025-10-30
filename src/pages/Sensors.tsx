import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Radio, Wifi, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Sensors = () => {
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(["greenhouse"]));
  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set(["z1"]));
  const [expandedLeaders, setExpandedLeaders] = useState<Set<string>>(new Set(["l1"]));

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleZone = (zoneId: string) => {
    const newExpanded = new Set(expandedZones);
    if (newExpanded.has(zoneId)) {
      newExpanded.delete(zoneId);
    } else {
      newExpanded.add(zoneId);
    }
    setExpandedZones(newExpanded);
  };

  const toggleLeader = (leaderId: string) => {
    const newExpanded = new Set(expandedLeaders);
    if (newExpanded.has(leaderId)) {
      newExpanded.delete(leaderId);
    } else {
      newExpanded.add(leaderId);
    }
    setExpandedLeaders(newExpanded);
  };

  const getLeaderIcon = (type: string) => {
    switch (type) {
      case "LoRa":
        return <Radio className="h-4 w-4 text-primary" />;
      case "Zigbee":
        return <Wifi className="h-4 w-4 text-primary" />;
      default:
        return <Radio className="h-4 w-4 text-primary" />;
    }
  };

  const sensorData = [
    {
      projectId: "greenhouse",
      projectName: "Greenhouse Environmental Control",
      zones: [
        {
          zoneId: "z1",
          zoneName: "North Wing",
          leaders: [
            {
              leaderId: "l1",
              leaderName: "North LoRa Gateway",
              leaderType: "LoRa",
              leaderStatus: "active" as const,
              nodes: [
                { id: "n1", name: "Temp Sensor A1", type: "Temperature", status: "active" as const, lastReading: "22.5°C" },
                { id: "n2", name: "Humidity Sensor A2", type: "Humidity", status: "active" as const, lastReading: "65%" },
                { id: "n3", name: "Soil Moisture A3", type: "Moisture", status: "warning" as const, lastReading: "45%" },
              ],
            },
            {
              leaderId: "l2",
              leaderName: "North Raspberry Pi Hub",
              leaderType: "Raspberry Pi",
              leaderStatus: "active" as const,
              nodes: [
                { id: "n4", name: "Air Quality B1", type: "Air Quality", status: "active" as const, lastReading: "AQI 45" },
                { id: "n5", name: "CO2 Sensor B2", type: "CO2", status: "active" as const, lastReading: "420 ppm" },
              ],
            },
          ],
        },
        {
          zoneId: "z2",
          zoneName: "South Wing",
          leaders: [
            {
              leaderId: "l3",
              leaderName: "South Zigbee Gateway",
              leaderType: "Zigbee",
              leaderStatus: "active" as const,
              nodes: [
                { id: "n6", name: "Temp Sensor C1", type: "Temperature", status: "active" as const, lastReading: "21.8°C" },
                { id: "n7", name: "Light Sensor C2", type: "Light", status: "active" as const, lastReading: "850 lux" },
              ],
            },
          ],
        },
      ],
    },
    {
      projectId: "lab",
      projectName: "Lab Building Climate Monitor",
      zones: [
        {
          zoneId: "z3",
          zoneName: "Main Lab",
          leaders: [
            {
              leaderId: "l4",
              leaderName: "Lab LoRa Gateway",
              leaderType: "LoRa",
              leaderStatus: "active" as const,
              nodes: [
                { id: "n8", name: "Temp Sensor D1", type: "Temperature", status: "active" as const, lastReading: "20.5°C" },
                { id: "n9", name: "Humidity Sensor D2", type: "Humidity", status: "inactive" as const, lastReading: "N/A" },
              ],
            },
          ],
        },
      ],
    },
  ];

  const filteredData = selectedProject === "all" 
    ? sensorData 
    : sensorData.filter(p => p.projectId === selectedProject);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sensor Hierarchy</h1>
            <p className="text-muted-foreground mt-1">Browse sensors organized by project, zone, and gateway</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="greenhouse">Greenhouse</SelectItem>
                <SelectItem value="lab">Lab Building</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredData.map((project) => (
            <Card key={project.projectId} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleProject(project.projectId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedProjects.has(project.projectId) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <CardTitle className="text-xl">{project.projectName}</CardTitle>
                  </div>
                  <Badge variant="secondary">{project.zones.length} Zones</Badge>
                </div>
              </CardHeader>

              {expandedProjects.has(project.projectId) && (
                <CardContent className="space-y-4 pt-0">
                  {project.zones.map((zone) => (
                    <div key={zone.zoneId} className="border border-border rounded-lg">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg"
                        onClick={() => toggleZone(zone.zoneId)}
                      >
                        <div className="flex items-center gap-3">
                          {expandedZones.has(zone.zoneId) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-semibold">{zone.zoneName}</p>
                            <p className="text-sm text-muted-foreground">
                              {zone.leaders.length} leader sensors
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                          <Plus className="h-3 w-3 mr-1" />
                          Add Leader
                        </Button>
                      </div>

                      {expandedZones.has(zone.zoneId) && (
                        <div className="border-t border-border bg-muted/20 p-4 space-y-3 rounded-b-lg">
                          {zone.leaders.map((leader) => (
                            <div key={leader.leaderId} className="border border-border rounded-lg bg-background">
                              <div
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg"
                                onClick={() => toggleLeader(leader.leaderId)}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                    {getLeaderIcon(leader.leaderType)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{leader.leaderName}</p>
                                      <Badge variant="outline" className="text-xs">
                                        {leader.leaderType}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {leader.nodes.length} sensor nodes
                                    </p>
                                  </div>
                                  <StatusBadge status={leader.leaderStatus} />
                                  {expandedLeaders.has(leader.leaderId) ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                              </div>

                              {expandedLeaders.has(leader.leaderId) && (
                                <div className="border-t border-border p-3 space-y-2 rounded-b-lg">
                                  {leader.nodes.map((node) => (
                                    <div
                                      key={node.id}
                                      className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        <div>
                                          <p className="font-medium text-sm">{node.name}</p>
                                          <p className="text-xs text-muted-foreground">{node.type}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-sm font-mono font-medium">
                                          {node.lastReading}
                                        </span>
                                        <StatusBadge status={node.status} />
                                      </div>
                                    </div>
                                  ))}
                                  <Button variant="outline" size="sm" className="w-full mt-2">
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add Sensor Node
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sensors;
