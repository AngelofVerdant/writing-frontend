'use client'
import { useState } from 'react';
import Link from 'next/link';
import { IconLeft, IconRight, IconToggleOff, IconToggleOn } from '@/icons';
import { RoleProtection } from '@/helpers';
import { useDarkMode } from '@/state/DarkModeProvider';
import { adminMenu } from '@/data/adminmenu';

const Layout = ({ children }) => {
  const [selectedMenuDesktop, setSelectedMenuDesktop] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { darkMode } = useDarkMode();

  return (
    <>
      <div className={`hidden md:flex items-start p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {isMenuVisible ? (
          <IconToggleOn className={`ml-4 cursor-pointer ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => setIsMenuVisible(!isMenuVisible)} />
        ) : (
          <IconToggleOff className={`ml-4 cursor-pointer ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => setIsMenuVisible(!isMenuVisible)} />
        )}
      </div>
      <div className={`flex h-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {isMenuVisible && (
        <nav className={`w-${isMenuVisible ? '1/5' : '0'} hidden md:block p-4 m-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}>
          <div className="p-4 font-bold">Menu</div>
          <div className={`mb-4 p-4 m-0 rounded-md focus:outline-none ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
          } focus:ring-2 focus:ring-blue-500`}>
            <div>
              {selectedMenuDesktop ? (
                <>
                  <div
                    className={`p-4 mb-2 mx-2 rounded cursor-pointer ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                    onClick={() => setSelectedMenuDesktop(null)}
                  >
                    <span className={`flex justify-between items-center ml-0 text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-700'} capitalize`}>
                      <span>Main Menu</span>
                      <IconLeft className="h-4 w-4 mr-4" />
                    </span>
                  </div>
                  {selectedMenuDesktop.options.map((submenu) => (
                    <div
                      className={`p-4 mb-2 mx-2 rounded cursor-pointer ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                      key={submenu.id}
                    >
                      <Link href={`/admin/${selectedMenuDesktop.link}/${submenu.link}`}>
                        <span className={`flex justify-between ml-0 text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                          {submenu.name}
                        </span>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  {adminMenu.map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className={`p-4 mb-2 mx-2 rounded cursor-pointer ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                      onClick={() => setSelectedMenuDesktop(menuItem)}
                    >
                      <span className={`flex justify-between items-center ml-0 text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-700'} capitalize`}>
                        <span>{menuItem.name}</span>
                        <IconRight className="h-4 w-4 ml-4" />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
        )}

        {/* Content */}
        <div className="flex-1 p-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default RoleProtection(['admin'])(Layout);