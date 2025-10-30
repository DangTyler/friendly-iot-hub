import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Users, Radio, AlertCircle, Plus, TrendingUp } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your system overview.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/signup")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
            <Button onClick={() => navigate("/projects")} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Projects"
            value={12}
            icon={FolderKanban}
            trend="+2 this month"
            trendUp={true}
          />
          <MetricCard
            title="Total Employees"
            value={45}
            icon={Users}
            trend="+5 this month"
            trendUp={true}
          />
          <MetricCard
            title="Connected Sensors"
            value={87}
            icon={Radio}
            trend="3 offline"
            trendUp={false}
          />
          <MetricCard
            title="Active Alerts"
            value={3}
            icon={AlertCircle}
            trend="2 resolved today"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New sensor registered", project: "Greenhouse A", time: "2 hours ago" },
                  { action: "Temperature alert resolved", project: "Lab Building", time: "4 hours ago" },
                  { action: "Employee added", project: "System", time: "5 hours ago" },
                  { action: "Project completed", project: "Warehouse Monitoring", time: "1 day ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.project}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/signup")}
              >
                <Users className="h-4 w-4 mr-2" />
                Add New Employee
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/projects")}
              >
                <FolderKanban className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/sensors")}
              >
                <Radio className="h-4 w-4 mr-2" />
                View All Sensors
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/charts")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
