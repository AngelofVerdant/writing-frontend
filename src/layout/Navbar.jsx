'use client'
import React, { useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { IconClose, IconLogout, IconMenu, IconRight, IconSettings, IconShoppingCart, IconToggleOff, IconToggleOn, IconUser } from '@/icons';
import Link from 'next/link';
import { useDarkMode } from '@/state/DarkModeProvider';
import { BrandView, DesktopNavWrapper, FlexItemCenterWrapper, GroupAbsoluteInnerIcon, GroupAbsoluteViewAndIcon, GroupAbsoluteWrapper, GroupAvatarView, GroupFlexWrapper, GroupHeadingView, GroupIconView, GroupRelativeWrapper, GroupSeparatorView, MobileIconWrapper, NavInnerWrapper } from '@/helpers';
import MobileNavWrapper from '@/helpers/MobileNavWrapper';
import { AuthContext } from '@/state/AuthProvider';
import { adminMenu } from '@/data/adminmenu';
import { useFetchResourceOne } from '@/hooks';
import Image from 'next/image';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: dataFetchedCompany } = useFetchResourceOne('companies');

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const signoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch } = authContext;

  const decodedUser = userInfo ? jwtDecode(userInfo.user.accessToken) : null;

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  
  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  return (
    <>
      <DesktopNavWrapper>
        <NavInnerWrapper>
          {dataFetchedCompany?.data && (
            <FlexItemCenterWrapper>
              <Link href={`/`}>
                <BrandView>
                  <Image
                    id="preview"
                    className="w-full h-full object-cover"
                    src={dataFetchedCompany.data.defaultimage?.secure_url}
                    alt="Image Preview" 
                    width={100}
                    height={50}
                  />
                </BrandView>
              </Link>
            </FlexItemCenterWrapper>
          )}
          
          <FlexItemCenterWrapper>
            {/* Shopping Cart Section */}
            <GroupRelativeWrapper>

              <GroupFlexWrapper>
                <GroupHeadingView>
                  Place Order
                </GroupHeadingView>
                <GroupIconView>
                  <IconShoppingCart />
                </GroupIconView>
              </GroupFlexWrapper>

              <GroupAbsoluteWrapper>
                <Link href="/order">
                  <GroupAbsoluteViewAndIcon>
                    Order Now
                    <GroupAbsoluteInnerIcon>
                      <IconRight className={`h-5 w-5`}/>
                    </GroupAbsoluteInnerIcon>
                  </GroupAbsoluteViewAndIcon>
                </Link>
              </GroupAbsoluteWrapper>

            </GroupRelativeWrapper>

            {/* User Profile Section */}
            <GroupRelativeWrapper>
              {userInfo?.user?.accessToken ? (
                <GroupFlexWrapper>
                  <GroupHeadingView>
                    User Profile
                  </GroupHeadingView>
                  <GroupAvatarView>
                    {(decodedUser.firstname[0] + decodedUser.lastname[0]).toLowerCase()}
                  </GroupAvatarView>
                </GroupFlexWrapper>
              ) : (
                <GroupFlexWrapper>
                  <GroupHeadingView>
                    Join / Sign In
                  </GroupHeadingView>
                  <GroupIconView>
                    <IconUser />
                  </GroupIconView>
                </GroupFlexWrapper>
              )}
              {userInfo?.user?.accessToken ? (
                <GroupAbsoluteWrapper>
                  {decodedUser?.iscustomer && (
                    <Link href="/user/o/overview">
                      <GroupAbsoluteViewAndIcon>
                        Dashboard (c)
                        <GroupAbsoluteInnerIcon>
                          <IconRight className={`h-5 w-5`}/>
                        </GroupAbsoluteInnerIcon>
                      </GroupAbsoluteViewAndIcon>
                    </Link>
                  )}
                  {decodedUser?.iswriter && (
                    <Link href="/writer/w/overview">
                      <GroupAbsoluteViewAndIcon>
                        Dashboard (w)
                        <GroupAbsoluteInnerIcon>
                          <IconRight className={`h-5 w-5`}/>
                        </GroupAbsoluteInnerIcon>
                      </GroupAbsoluteViewAndIcon>
                    </Link>
                  )}
                  {decodedUser?.iscustomer && (
                    <Link href="/user/o/orders">
                      <GroupAbsoluteViewAndIcon>
                        My Orders
                        <GroupAbsoluteInnerIcon>
                          <IconRight className={`h-5 w-5`}/>
                        </GroupAbsoluteInnerIcon>
                      </GroupAbsoluteViewAndIcon>
                    </Link>
                  )}
                  {decodedUser?.iswriter && (
                    <Link href="/writer/w/assignments">
                      <GroupAbsoluteViewAndIcon>
                        Assignments
                        <GroupAbsoluteInnerIcon>
                          <IconRight className={`h-5 w-5`}/>
                        </GroupAbsoluteInnerIcon>
                      </GroupAbsoluteViewAndIcon>
                    </Link>
                  )}
                  <GroupSeparatorView />
                  <Link href="#" onClick={signoutHandler}>
                    <GroupAbsoluteViewAndIcon>
                      Logout
                      <GroupAbsoluteInnerIcon>
                        <IconLogout className={`h-5 w-5`}/>
                      </GroupAbsoluteInnerIcon>
                    </GroupAbsoluteViewAndIcon>
                  </Link>
                </GroupAbsoluteWrapper>
              ) : (
                <GroupAbsoluteWrapper>
                  <Link href="/login">
                    <GroupAbsoluteViewAndIcon>
                      Login
                      <GroupAbsoluteInnerIcon>
                        <IconRight className={`h-5 w-5`}/>
                      </GroupAbsoluteInnerIcon>
                    </GroupAbsoluteViewAndIcon>
                  </Link>
                  <Link href="/register">
                    <GroupAbsoluteViewAndIcon>
                      Register
                      <GroupAbsoluteInnerIcon>
                        <IconRight className={`h-5 w-5`}/>
                      </GroupAbsoluteInnerIcon>
                    </GroupAbsoluteViewAndIcon>
                  </Link>
                </GroupAbsoluteWrapper>
              )}
            </GroupRelativeWrapper>

            {/* Store management Section */}
            {decodedUser?.isadmin && (
            <GroupRelativeWrapper>

              <GroupFlexWrapper>
                <GroupHeadingView>
                  Management
                </GroupHeadingView>
                <GroupIconView>
                  <IconSettings />
                </GroupIconView>
              </GroupFlexWrapper>

              <GroupAbsoluteWrapper>
                {adminMenu.map((submenu) => (
                  <Link href={`/admin/${submenu.link}/${submenu.first}`} key={`second-${submenu.id}`}>
                    <GroupAbsoluteViewAndIcon>
                      {submenu.name}
                      <GroupAbsoluteInnerIcon>
                        <IconRight className={`h-5 w-5`}/>
                      </GroupAbsoluteInnerIcon>
                    </GroupAbsoluteViewAndIcon>
                  </Link>
                ))}
              </GroupAbsoluteWrapper>
            </GroupRelativeWrapper>
            )}

            <GroupRelativeWrapper>

              <GroupFlexWrapper>
                <GroupHeadingView>
                  {darkMode ? "Dark" : "White"}
                </GroupHeadingView>
                <GroupIconView>
                  {darkMode ? (
                    <IconToggleOn onClick={toggleDarkMode} />
                  ) : (
                    <IconToggleOff onClick={toggleDarkMode} />
                  )}
                </GroupIconView>
              </GroupFlexWrapper>

            </GroupRelativeWrapper>

          </FlexItemCenterWrapper>

        </NavInnerWrapper>

        <GroupSeparatorView />

      </DesktopNavWrapper>
 
      <MobileNavWrapper menu={showMobileMenu} admin={showAdminMenu}>
        <NavInnerWrapper>
          <FlexItemCenterWrapper>
            <BrandView>
              Brand
            </BrandView>
          </FlexItemCenterWrapper>
          
          <FlexItemCenterWrapper>

            <MobileIconWrapper>
              <IconShoppingCart title="Cart" className={`h-5 w-5`} />
            </MobileIconWrapper>

            <MobileIconWrapper>
              <IconUser title="Profile" className={`h-5 w-5`} />
            </MobileIconWrapper>

            <MobileIconWrapper>
              {showMobileMenu ? (
                <IconClose onClick={toggleMobileMenu} title="Close" className={`h-5 w-5`} />
              ) : (
                <IconMenu onClick={toggleMobileMenu} title="Menu" className={`h-5 w-5`} />
              )}
            </MobileIconWrapper>

            {decodedUser?.isadmin && (
              <MobileIconWrapper>
                {showAdminMenu ? (
                  <IconClose onClick={toggleAdminMenu} title="Close" className={`h-5 w-5`} />
                ) : (
                  <IconSettings onClick={toggleAdminMenu} title="Menu" className={`h-5 w-5`} />
                )}
              </MobileIconWrapper>
            )}

            <MobileIconWrapper>
              {darkMode ? (
                <IconToggleOn className={`h-5 w-5`} title={`Dark`} onClick={toggleDarkMode} />
              ) : (
                <IconToggleOff className={`h-5 w-5`} title={`White`} onClick={toggleDarkMode} />
              )}
            </MobileIconWrapper>

          </FlexItemCenterWrapper>
        </NavInnerWrapper>

        <GroupSeparatorView />

      </MobileNavWrapper>
    </>
  );
};
export default Navbar;