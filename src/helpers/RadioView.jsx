import { LabelView } from '.';

const RadioView = ({ title, label, data }) => {
  return (
    <div className="w-full mb-4">
        <div className="mb-2 ml-2">
        <LabelView name={title} forWhat={label} />
        </div>
        <div className="flex flex-wrap" id={label}>
            {data}
        </div>
    </div>
  );
};
export default RadioView;