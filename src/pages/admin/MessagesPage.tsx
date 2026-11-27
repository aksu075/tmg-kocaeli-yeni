import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, MailOpen, Eye, Phone, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contactApi } from "@/lib/api";

const MessagesPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchMessages = async () => {
    try {
      const data = await contactApi.getAll();
      setMessages(data);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    try {
      await contactApi.delete(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setSelectedMessage(null);
      toast.success("Mesaj silindi");

    } catch {
      toast.error("Mesaj silinemedi");

    }
  };

  const handleViewMessage = async (message: any) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      try {
        await contactApi.markRead(message._id);
        setMessages((prev) =>
          prev.map((m) =>
            m._id === message._id ? { ...m, isRead: true } : m
          )
        );
      } catch {
        // Silent fail
      }
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.isRead;
    if (filter === "read") return m.isRead;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              İletişim Mesajları
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount > 0
                ? `${unreadCount} okunmamış mesaj`
                : "Tüm mesajlar okundu"}
            </p>
          </div>
          <div className="flex gap-2">
            {(["all", "unread", "read"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-tmg-primary" : ""}
              >
                {f === "all" ? "Tümü" : f === "unread" ? "Okunmamış" : "Okunmuş"}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              {filter === "all"
                ? "Henüz mesaj yok"
                : filter === "unread"
                ? "Okunmamış mesaj yok"
                : "Okunmuş mesaj yok"}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {filteredMessages.map((message) => (
              <Card
                key={message._id}
                className={`cursor-pointer transition-colors hover:shadow-md ${
                  !message.isRead ? "border-l-4 border-l-tmg-secondary bg-blue-50/30" : ""
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {message.isRead ? (
                        <MailOpen size={20} className="text-gray-400" />
                      ) : (
                        <Mail size={20} className="text-tmg-secondary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {message.name} {message.surname}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(message.createdAt).toLocaleDateString(
                            "tr-TR",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {message.message}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Message Detail Dialog */}
        <Dialog
          open={!!selectedMessage}
          onOpenChange={() => setSelectedMessage(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Ad Soyad:</span>
                    <p className="font-medium">
                      {selectedMessage.name} {selectedMessage.surname}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">E-posta:</span>
                    <p className="font-medium">{selectedMessage.email || "—"}</p>
                  </div>
                  {selectedMessage.course && (
                    <div className="col-span-2">
                      <span className="text-gray-500">İlgilendiği kurs:</span>
                      <p className="font-medium">{selectedMessage.course}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Telefon:</span>
                    <p className="font-medium flex items-center gap-1">
                      <Phone size={14} /> {selectedMessage.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tarih:</span>
                    <p className="font-medium">
                      {new Date(selectedMessage.createdAt).toLocaleDateString(
                        "tr-TR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <hr />
                <div>
                  <span className="text-sm text-gray-500">Mesaj:</span>
                  <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <hr />
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteMessage(selectedMessage._id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Mesajı Sil
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;
