import { IconToggleOff, IconToggleOn } from '@/icons';
import { LabelView } from '.';

const CheckView = ({ title, label, data, handleSelectAll, allSelected }) => {
  const handleToggle = () => {
    if (allSelected) {
      handleSelectAll([]);
    } else {
      handleSelectAll(data);
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="mb-2 flex items-center justify-between">
        <LabelView name={title} forWhat={label} />
        <div onClick={handleToggle} className="cursor-pointer">
          {allSelected.length === data.length ? (
            <IconToggleOn className="mr-2" title={`Deselect All`} />
          ) : (
            <IconToggleOff className="mr-2" title={`Select All`} />
          )}
        </div>
      </div>
      <div className="flex flex-wrap" id={label}>
        {data}
      </div>
    </div>
  );
};

export default CheckView;