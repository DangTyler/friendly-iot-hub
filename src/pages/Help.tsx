import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground mt-1">Find answers to common questions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I add a new sensor?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Sensors page and click the "Add Sensor" button. Fill in the sensor details including name, type, and project assignment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I create a new project?</AccordionTrigger>
                <AccordionContent>
                  Go to the Projects page and click "Add Project". Enter the project details, duration, and assign team members and sensors.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What do the sensor status indicators mean?</AccordionTrigger>
                <AccordionContent>
                  Green (Active) means the sensor is online and transmitting data. Orange (Warning) indicates potential issues. Red (Error) means the sensor is offline or malfunctioning. Gray (Inactive) means the sensor is deliberately disabled.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I view historical data?</AccordionTrigger>
                <AccordionContent>
                  Visit the Analytics page and use the time range filters to view historical environmental data. You can export data for further analysis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I add a new employee?</AccordionTrigger>
                <AccordionContent>
                  From the Dashboard, click "Add Employee" or navigate to the signup page. Enter the employee details and assign them to relevant projects.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Contact an administrator for additional support.
            </p>
            <Button onClick={() => navigate("/contact-admin")}>
              Contact Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Help;
