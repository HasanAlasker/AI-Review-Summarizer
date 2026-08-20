import AddBtn from "./AddBtn";
import OutofStockBtn from "./OutofStockBtn";

export default function AdminActions() {
  return (
    <div className="flex w-full justify-between items-center gap-2 mb-5">
      <AddBtn />
      <OutofStockBtn />
    </div>
  );
}
