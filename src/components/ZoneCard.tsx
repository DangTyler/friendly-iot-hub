import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Radio, Wifi } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface SensorNode {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "warning" | "error";
  lastReading: string;
}

interface LeaderSensor {
  id: string;
  name: string;
  type: "LoRa" | "Raspberry Pi" | "Zigbee";
  status: "active" | "inactive" | "warning" | "error";
  nodes: SensorNode[];
}

interface Zone {
  id: string;
  name: string;
  description: string;
  leaderSensors: LeaderSensor[];
}

interface ZoneCardProps {
  zone: Zone;
  projectId: string;
}

export const ZoneCard = ({ zone, projectId }: ZoneCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedLeaders, setExpandedLeaders] = useState<Set<string>>(new Set());

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
        return <Radio className="h-4 w-4" />;
      case "Zigbee":
        return <Wifi className="h-4 w-4" />;
      default:
        return <Radio className="h-4 w-4" />;
    }
  };

  const totalNodes = zone.leaderSensors.reduce((sum, leader) => sum + leader.nodes.length, 0);
  const activeNodes = zone.leaderSensors.reduce(
    (sum, leader) => sum + leader.nodes.filter(n => n.status === "active").length,
    0
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <CardTitle className="text-lg">{zone.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{zone.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {zone.leaderSensors.length} Leaders
            </Badge>
            <Badge variant="outline">
              {activeNodes}/{totalNodes} Nodes
            </Badge>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-3">
          {zone.leaderSensors.map((leader) => (
            <div key={leader.id} className="border border-border rounded-lg">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg"
                onClick={() => toggleLeader(leader.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    {getLeaderIcon(leader.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{leader.name}</p>
                      <Badge variant="outline" className="text-xs">{leader.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {leader.nodes.length} connected nodes
                    </p>
                  </div>
                  <StatusBadge status={leader.status} />
                  {expandedLeaders.has(leader.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedLeaders.has(leader.id) && leader.nodes.length > 0 && (
                <div className="border-t border-border bg-muted/20 rounded-b-lg">
                  <div className="p-3 space-y-2">
                    {leader.nodes.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center justify-between p-3 bg-background rounded-md border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <div>
                            <p className="font-medium text-sm">{node.name}</p>
                            <p className="text-xs text-muted-foreground">{node.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono">{node.lastReading}</span>
                          <StatusBadge status={node.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {expandedLeaders.has(leader.id) && leader.nodes.length === 0 && (
                <div className="border-t border-border p-4 text-center">
                  <p className="text-sm text-muted-foreground">No sensor nodes connected</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Sensor Node
                  </Button>
                </div>
              )}
            </div>
          ))}

          {zone.leaderSensors.length === 0 && (
            <div className="text-center py-6 border border-dashed border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">No leader sensors in this zone</p>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Add Leader Sensor
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
