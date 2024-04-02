'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { jwtDecode } from "jwt-decode";
import { useClickOutside, useFetchResource } from '@/hooks';
import { IconClose, IconLeft, IconLogout, IconMenu, IconRight, IconSettings, IconShoppingCart, IconToggleOff, IconToggleOn, IconUser } from '@/icons';
import Link from 'next/link';
import { useDarkMode } from '@/state/DarkModeProvider';
import { BrandView, DesktopNavWrapper, FlexButton, FlexItemCenterWrapper, FullWrapper, GroupAbsoluteInnerIcon, GroupAbsoluteViewAndIcon, GroupAbsoluteWrapper, GroupAvatarView, GroupFlexWrapper, GroupHeadingView, GroupIconView, GroupRelativeWrapper, GroupSeparatorView, InlineFlexWrapper, MenuHoverAbsoluteInnerWrapper, MenuHoverAbsoluteWrapper, MenuHoverGroupWrapper, MenuHoverHeading, MenuHoverWrapper, MobileFlexSpanAndIcon, MobileIconAndView, MobileIconWrapper, MobileItemView, MobileItemViewActions, MobileRelativeWrapper, MobileSpanView, NavInnerWrapper } from '@/helpers';
import MobileNavWrapper from '@/helpers/MobileNavWrapper';
import { AuthContext } from '@/state/AuthProvider';
import { adminMenu } from '@/data/adminmenu';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({name: null, link: null});
  const [selectedSubcategory, setSelectedSubcategory] = useState({name: null, link: null});
  const [showMobileMenu, setShowMobileMenu] = useState(false);


  const { data: dataFetched } = useFetchResource('product-categories/menu');

  useEffect(() => {
    if (dataFetched.success) {
      setCategories(dataFetched.data.categories);
    }
  }, [dataFetched]);


  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const signoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch } = authContext;

  const decodedUser = userInfo ? jwtDecode(userInfo.user.accessToken) : null;

  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const inputRef = useRef(null);

  useClickOutside(inputRef, () => {
    setIsPanelVisible(false);
  });

  const [selectedMenuMobile, setSelectedMenuMobile] = useState(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  
  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
    setSelectedMenuMobile(null);
  };

  return (
    <>
      <DesktopNavWrapper>
        <NavInnerWrapper>
          <FlexItemCenterWrapper>
            <BrandView>
              Brand
            </BrandView>
          </FlexItemCenterWrapper>

          
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
        
        {/* Hover Menu */}
        <MenuHoverWrapper>
          {categories.map((menuItem, index) => (
            <MenuHoverGroupWrapper key={`third-${index}`}>
              <Link href={`/collections/${menuItem.collectionlink}`}>
                <MenuHoverHeading>
                  {menuItem.collectionname}
                </MenuHoverHeading>
              </Link>
              <MenuHoverAbsoluteWrapper>
                {menuItem.Subcategories.map((subcategory, subIndex) => (
                  <MenuHoverAbsoluteInnerWrapper key={`fourth-${subIndex}`}>
                    <Link href={`/collections/${subcategory.collectionlink}`}>
                      <GroupAbsoluteViewAndIcon>
                        All {subcategory.collectionname}
                        <GroupAbsoluteInnerIcon>
                          <IconRight className={`h-5 w-5`}/>
                        </GroupAbsoluteInnerIcon>
                      </GroupAbsoluteViewAndIcon>
                    </Link>
                    {subcategory.Subcategories && subcategory.Subcategories.map((item, itemIndex) => (
                      <Link href={`/collections/${item.collectionlink}`} key={`fiveth-${itemIndex}`}>
                        <MenuHoverHeading>
                          {item.collectionname}
                        </MenuHoverHeading>
                      </Link>
                    ))}
                  </MenuHoverAbsoluteInnerWrapper>
                ))}
              </MenuHoverAbsoluteWrapper>
            </MenuHoverGroupWrapper>
          ))}
        </MenuHoverWrapper>

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

        {showMobileMenu ? (
          <MobileRelativeWrapper>
            {selectedCategory ? (
              selectedSubcategory ? (
                <FullWrapper>
                  <MobileIconAndView click={() => setSelectedSubcategory(null)}>
                    <InlineFlexWrapper>
                      <FlexButton label={`Back to ${selectedSubcategory.name}`}>
                        <IconLeft title={`Back`} className="h-5 w-5" />
                      </FlexButton>
                    </InlineFlexWrapper>
                  </MobileIconAndView>
                  {categories.find((category) => category.collectionname === selectedCategory.name)
                    ?.Subcategories.find((subcategory) => subcategory.collectionname === selectedSubcategory.name)
                    ?.Subcategories.map((item, itemIndex) => (
                      <Link href={`/collections/${item.collectionlink}`} key={`sixth-${itemIndex}`}>
                        <MobileItemView>
                            <MobileSpanView>
                              {item.collectionname}
                            </MobileSpanView>
                        </MobileItemView>
                      </Link>
                    ))}
                    <Link href={`/collections/${selectedSubcategory.link}`}>
                      <MobileItemView>
                          <MobileSpanView>
                            All {selectedSubcategory.name}
                          </MobileSpanView>
                      </MobileItemView>
                    </Link>
                </FullWrapper>
              ) : (
                <FullWrapper>
                  <MobileIconAndView click={() => setSelectedCategory(null)}>
                    <InlineFlexWrapper>
                      <FlexButton label={`Back to Main Menu`}>
                        <IconLeft title={`Back`} className="h-5 w-5" />
                      </FlexButton>
                    </InlineFlexWrapper>
                  </MobileIconAndView>

                  {categories
                    .find((category) => category.collectionname === selectedCategory.name)
                    ?.Subcategories.map((subcategory, subIndex) => (
                      <MobileItemViewActions key={`seventh-${subIndex}`} click={() => setSelectedSubcategory({ name: subcategory.collectionname, link: subcategory.collectionlink })}>
                        <MobileFlexSpanAndIcon>
                          {subcategory.collectionname}
                          {subcategory.Subcategories && (
                            <IconRight className={`h-4 w-4`} />
                          )}
                        </MobileFlexSpanAndIcon>
                      </MobileItemViewActions>
                    ))}
                    <Link href={`/collections/${selectedCategory.link}`}>
                      <MobileItemView>
                          <MobileSpanView>
                            All {selectedCategory.name}
                          </MobileSpanView>
                      </MobileItemView>
                    </Link>
                </FullWrapper>
              )
            ) : (
              <FullWrapper>
                {categories.map((menuItem, index) => (
                  <MobileItemViewActions key={`eighth-${index}`} click={() => setSelectedCategory({ name: menuItem.collectionname, link: menuItem.collectionlink })}>
                    <MobileFlexSpanAndIcon>
                      {menuItem.collectionname}
                      {menuItem.Subcategories && (
                        <IconRight className={`h-4 w-4`} />
                      )}
                    </MobileFlexSpanAndIcon>
                  </MobileItemViewActions>
                ))}
              </FullWrapper>
            )}
          </MobileRelativeWrapper>
        ) : null}

        {showAdminMenu ? (
          <MobileRelativeWrapper>
            {selectedMenuMobile ? (
              <FullWrapper>
                <MobileIconAndView click={() => setSelectedMenuMobile(null)}>
                  <InlineFlexWrapper>
                    <FlexButton label={`Back to Main Menu`}>
                      <IconLeft title={`Back`} className="h-5 w-5" />
                    </FlexButton>
                  </InlineFlexWrapper>
                </MobileIconAndView>
                
                {selectedMenuMobile.options.map((submenu, index) => (
                  <Link href={`/admin/${selectedMenuMobile.link}/${submenu.link}`} key={`nineth-${index}`}>
                    <MobileItemView>
                        <MobileSpanView>
                          {submenu.name}
                        </MobileSpanView>
                    </MobileItemView>
                  </Link>
                ))}
              </FullWrapper>
            ) : (
              <FullWrapper>
                
              </FullWrapper>
            )}
          </MobileRelativeWrapper>
        ) : null}
      </MobileNavWrapper>
    </>
  );
};
export default Navbar;