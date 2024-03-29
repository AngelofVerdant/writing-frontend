import Image from 'next/image';
import { useDarkMode } from '@/state/DarkModeProvider';

const UserCollectionOverview = ({ imageUrl, title, description }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full p-4 pt-0 pb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
      <div className={`p-2 rounded-lg flex ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        {imageUrl && (
          <div className="w-1/2 pr-4">
            <Image src={imageUrl} alt="Card Image" className="w-full h-96 object-fit rounded-md" height={250} width={250} />
          </div>
        )}
        <div className="w-1/2">
          {title && <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{title}</h2>}
          {description && <div className={`prose md:prose-lg lg:prose-xl ${darkMode ? 'text-white' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: description }}></div>}
        </div>
      </div>
    </div>
  );
};

export default UserCollectionOverview;