import { useGrades } from "@/hooks/useGrades";

export default function GradesPage() {
  const { grades, loading, error } = useGrades();

  const sortedGrades = grades.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="p-4 pb-12 pt-8">
      <h1 className="pb-4 text-2xl font-semibold">Мои оценки</h1>

      {loading ? (
        <p className="text-gray-500 text-sm">Загрузка...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : grades.length === 0 ? (
        <p className="text-gray-500 text-sm">Оценок пока нет.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-medium">
                <th className="py-2 px-3 border-b border-gray-300 w-24">Дата экзамена</th>
                <th className="py-2 px-3 border-b border-gray-300">Предмет</th>
                <th className="py-2 px-3 border-b border-gray-300 w-16 text-center">Оценка</th>
              </tr>
            </thead>
            <tbody>
              {sortedGrades.map((grade) => {
                const date = new Date(grade.date);
                const formattedDate = isNaN(date.getTime())
                  ? "Неверная дата"
                  : date.toLocaleDateString("ru-RU");

                return (
                  <tr key={grade.id} className="even:bg-gray-50">
                    <td className="py-2 px-3 border-b border-gray-200">{formattedDate}</td>
                    <td className="py-2 px-3 border-b border-gray-200">
                      {grade.subject_name}{" "}
                      <span className="text-gray-500">({grade.grade_type})</span>
                    </td>
                    <td
                      className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${
                        grade.grade === "5"
                          ? "text-green-600"
                          : grade.grade === "4"
                          ? "text-yellow-600"
                          : grade.grade === "3"
                          ? "text-orange-600"
                          : grade.grade === "2"
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      {grade.grade}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
