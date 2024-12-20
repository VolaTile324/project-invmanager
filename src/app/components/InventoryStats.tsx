import StatsBox from "./StatsBox";
import { Icons } from "./Icons";

const InventoryStats = ({ totalToday, totalAllTime } : { totalToday: number; totalAllTime: number }) => {
return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <StatsBox
        title="Total Products Today"
        value={totalToday}
        icon={<Icons.CalendarDays className="w-12 h-12" />}
      />
      <StatsBox
        title="Total Products All Time"
        value={totalAllTime}
        icon={<Icons.ArchiveBoxArrowDown className="w-12 h-12" />}
      />
    </div>
  );
};

export default InventoryStats;