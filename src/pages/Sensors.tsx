import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Radio, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Sensors = () => {
  const [expandedGateways, setExpandedGateways] = useState<Set<string>>(new Set(["gw1"]));
  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set(["esp1"]));

  const toggleGateway = (gatewayId: string) => {
    const newExpanded = new Set(expandedGateways);
    if (newExpanded.has(gatewayId)) {
      newExpanded.delete(gatewayId);
    } else {
      newExpanded.add(gatewayId);
    }
    setExpandedGateways(newExpanded);
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

  const gatewayData = [
    {
      gatewayId: "gw1",
      gatewayName: "Greenhouse Pi Gateway",
      status: "active" as const,
      ipAddress: "192.168.1.100",
      zones: [
        {
          zoneId: "esp1",
          zoneName: "North Wing ESP32",
          espAddress: "0x3C:A4:B1:2F",
          status: "active" as const,
          sensors: [
            { id: "s1", name: "Temperature Sensor", type: "DHT22", status: "active" as const, lastReading: "22.5°C" },
            { id: "s2", name: "Humidity Sensor", type: "DHT22", status: "active" as const, lastReading: "65%" },
            { id: "s3", name: "Soil Moisture", type: "Capacitive", status: "warning" as const, lastReading: "45%" },
          ],
        },
        {
          zoneId: "esp2",
          zoneName: "South Wing ESP32",
          espAddress: "0x3C:A4:B1:30",
          status: "active" as const,
          sensors: [
            { id: "s4", name: "Temperature Sensor", type: "DHT22", status: "active" as const, lastReading: "21.8°C" },
            { id: "s5", name: "Light Sensor", type: "BH1750", status: "active" as const, lastReading: "850 lux" },
          ],
        },
      ],
    },
    {
      gatewayId: "gw2",
      gatewayName: "Lab Building Pi Gateway",
      status: "active" as const,
      ipAddress: "192.168.1.101",
      zones: [
        {
          zoneId: "esp3",
          zoneName: "Main Lab ESP32",
          espAddress: "0x3C:A4:B1:31",
          status: "active" as const,
          sensors: [
            { id: "s6", name: "Air Quality Sensor", type: "MQ-135", status: "active" as const, lastReading: "AQI 45" },
            { id: "s7", name: "CO2 Sensor", type: "MH-Z19", status: "inactive" as const, lastReading: "N/A" },
          ],
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sensor Hierarchy</h1>
            <p className="text-muted-foreground mt-1">Manage gateways, ESP32 zones, and sensors</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Gateway
          </Button>
        </div>

        <div className="space-y-4">
          {gatewayData.map((gateway) => (
            <Card key={gateway.gatewayId} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleGateway(gateway.gatewayId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedGateways.has(gateway.gatewayId) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Radio className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{gateway.gatewayName}</CardTitle>
                      <p className="text-sm text-muted-foreground">IP: {gateway.ipAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{gateway.zones.length} ESP32 Zones</Badge>
                    <StatusBadge status={gateway.status} />
                  </div>
                </div>
              </CardHeader>

              {expandedGateways.has(gateway.gatewayId) && (
                <CardContent className="space-y-4 pt-0">
                  {gateway.zones.map((zone) => (
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
                              Address: {zone.espAddress}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{zone.sensors.length} Sensors</Badge>
                          <StatusBadge status={zone.status} />
                        </div>
                      </div>

                      {expandedZones.has(zone.zoneId) && (
                        <div className="border-t border-border bg-muted/20 p-4 space-y-2 rounded-b-lg">
                          {zone.sensors.map((sensor) => (
                            <div
                              key={sensor.id}
                              className="flex items-center justify-between p-3 bg-background rounded-md border border-border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <div>
                                  <p className="font-medium text-sm">{sensor.name}</p>
                                  <p className="text-xs text-muted-foreground">{sensor.type}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-mono font-medium">
                                  {sensor.lastReading}
                                </span>
                                <StatusBadge status={sensor.status} />
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Sensor
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Add ESP32 Zone
                  </Button>
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
