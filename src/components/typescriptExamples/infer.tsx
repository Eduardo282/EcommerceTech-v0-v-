// Imagina un hook o servicio que trae datos complejos de tu arquitectura monolítica
async function fetchDashboardMetrics() {
  return {
    totalSales: 15000,
    activeUsers: 342,
    recentLogins: ['user_1', 'user_2']
  };
}

// Magia con infer (usando la utilidad nativa Awaited y ReturnType que usan infer por dentro):
// Extraemos el tipo exacto que la promesa resuelve.
type DashboardMetrics = Awaited<ReturnType<typeof fetchDashboardMetrics>>;

// Ahora puedes usar ese tipo inferido directamente en tus componentes
function MetricsCards({ data }: { data: DashboardMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-white shadow">Ventas: ${data.totalSales}</div>
      <div className="p-4 bg-white shadow">Usuarios: {data.activeUsers}</div>
    </div>
  );
}