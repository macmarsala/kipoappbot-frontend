import { useDocuments } from "@/hooks/useDocuments";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";

export default function DocumentsPage() {
  const { documents, loading, error } = useDocuments();

  const grouped = documents.reduce<Record<string, typeof documents>>((acc, doc) => {
    const key = doc.category || "Без категории";
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort();

  return (
    <div className="p-4 pb-12 pt-8 space-y-4">
      <h1 className="pb-4 text-2xl font-semibold">Мои документы</h1>

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500">Документов пока нет.</p>
      ) : (
        sortedCategories.map((category) => (
          <div key={category} className="space-y-2">
            <h2 className="text-lg font-medium">{category}</h2>
            <div className="grid grid-cols-2 gap-3">
              {grouped[category].map((doc) => (
                <Card key={doc.id} className="flex flex-col h-full">
                  <CardContent className="pl-4 pr-4 flex flex-col gap-2 flex-grow">
                    <div className="flex justify-center text-gray-500">
                      <FileIcon className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-medium text-center">{doc.title}</div>
                    <p className="text-xs text-gray-600 text-center">
                      {doc.subject_name ? `${doc.subject_name} · ` : ""}
                      {doc.group_name}
                    </p>
                    <div className="mt-auto flex flex-col gap-2">
                      <Button size="sm" className="w-full" onClick={() => window.open(doc.url, "_blank")}>
                        Открыть
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
