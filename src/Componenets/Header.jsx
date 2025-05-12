import { useState, useEffect } from "react";
import { IoMoonOutline, IoMoon  } from "react-icons/io5";


const Header = () => {
    const [changeTheme, setChangeTheme] = useState(true);

    useEffect(() => {
        document.body.classList.toggle('dark_theme')
    }, [changeTheme]);

    const handleThemeChange = () => setChangeTheme(theme => !theme);

    return (
        <header className='header'>
            <h1>Where in the world?</h1>

            <div className='theme_switch' onClick={handleThemeChange}>
                { changeTheme ?
                    <>
                        <IoMoon className="lightTheme_icon" />
                        <span>Light Mode</span>
                    </> :
                    <> 
                        
                        <IoMoonOutline className='darktheme_icon' />
                        <span>Dark Mode</span>
                    </>
                }
            </div>
        </header>
    )
};

export default Header;