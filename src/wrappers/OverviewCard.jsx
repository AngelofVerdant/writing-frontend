import Image from 'next/image';

const OverviewCard = ({ imageUrl, title, description, darkMode }) => {
  return (
    <div className={`w-full p-4 pt-0 pb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
      <div className={`p-2 rounded-lg flex items-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        {imageUrl && (
          <div className="w-1/2 mr-4 rounded-md h-96 relative overflow-hidden">
            <Image src={imageUrl} alt="Card Image" className="object-cover w-full h-full rounded-md" layout="fill" />
          </div>
        )}
        <div className="w-1/2 flex flex-col justify-center">
          {title && <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{title}</h2>}
          {description && <div className={`prose md:prose-lg lg:prose-xl ${darkMode ? 'text-white' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: description }}></div>}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;