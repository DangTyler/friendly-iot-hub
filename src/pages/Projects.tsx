import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Users, Radio, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Greenhouse Environmental Control",
      duration: "Jan 2025 - Jun 2025",
      employees: 5,
      sensors: 12,
      status: "active",
    },
    {
      id: 2,
      title: "Lab Building Climate Monitor",
      duration: "Feb 2025 - May 2025",
      employees: 3,
      sensors: 8,
      status: "active",
    },
    {
      id: 3,
      title: "Warehouse Humidity Tracking",
      duration: "Dec 2024 - Mar 2025",
      employees: 4,
      sensors: 15,
      status: "completed",
    },
  ]);

  const handleDelete = (id: number) => {
    toast.success("Project deleted successfully");
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your IoT monitoring projects</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === "active" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {project.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {project.employees} Employees
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Radio className="h-4 w-4" />
                    {project.sensors} Sensors
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
