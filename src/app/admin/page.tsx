import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Video, Users, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the uMovies control panel.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6 text-accent" />
              Video Management
            </CardTitle>
            <CardDescription>Upload, edit, and manage video content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/videos" passHref>
              <Button className="w-full">Manage Videos</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              User Management
            </CardTitle>
            <CardDescription>View and manage user accounts (Coming Soon).</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Manage Users</Button>
          </CardContent>
        </Card>

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Site Settings
            </CardTitle>
            <CardDescription>Configure application settings (Coming Soon).</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Configure Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
