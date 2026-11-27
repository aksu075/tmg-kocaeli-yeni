import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Megaphone, Mail, MailOpen } from "lucide-react";
import { coursesApi, announcementsApi, contactApi } from "@/lib/api";

interface DashboardStats {
  totalCourses: number;
  totalAnnouncements: number;
  totalMessages: number;
  unreadMessages: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalAnnouncements: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, announcements, messages] = await Promise.allSettled([
          coursesApi.getAll(),
          announcementsApi.getAll(),
          contactApi.getAll(),
        ]);

        const courseData = courses.status === "fulfilled" ? courses.value : [];
        const announcementData = announcements.status === "fulfilled" ? announcements.value : [];
        const messageData = messages.status === "fulfilled" ? messages.value : [];

        setStats({
          totalCourses: courseData.length,
          totalAnnouncements: announcementData.length,
          totalMessages: messageData.length,
          unreadMessages: messageData.filter((m: any) => !m.isRead).length,
        });

        setRecentMessages(messageData.slice(0, 5));
      } catch {
        // Stats will remain at 0
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Toplam Kurs",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Duyurular",
      value: stats.totalAnnouncements,
      icon: Megaphone,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Toplam Mesaj",
      value: stats.totalMessages,
      icon: Mail,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Okunmamış Mesaj",
      value: stats.unreadMessages,
      icon: MailOpen,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-full`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Son Mesajlar</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Yükleniyor...</p>
            ) : recentMessages.length === 0 ? (
              <p className="text-gray-500">Henüz mesaj yok</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg: any) => (
                  <div
                    key={msg._id}
                    className={`p-3 rounded-lg border ${
                      msg.isRead ? "bg-white" : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">
                          {msg.name} {msg.surname}
                        </p>
                        <p className="text-sm text-gray-600">{msg.subject}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
