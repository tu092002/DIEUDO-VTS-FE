import React, { useEffect, useState } from "react";
// import "../static/css/gridme.scss";
import "../static/css/header.scss";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { FaSearch } from "react-icons/fa"; // Import biểu tượng tìm kiếm từ FontAwesome
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { useTranslation } from "react-i18next";
// import Apis, { endpoints } from "../configs/Apis";


interface HeaderProps {
  onSearch?: (keyword: string) => void;
}

interface Header {
  id: number;
  company_name?: string;
  address?: string;
  fax?: string;
  email?: string;
  number_phone?: string;
  mst?: string;
  branch_name?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const { t, i18n } = useTranslation();
  const [isDesktopAndTablet, setIsDesktopAndTablet] = useState(window.innerWidth >= 740);


  const [searchText, setSearchText] = useState('');
  const { setKeyword } = useSearchContext();
  const location = useLocation();


  // const loadHeader = async () => {
  //   try {
  //     const params = { limit: 7, page: 1 };
  //     const response = await Apis.get(endpoints.APIHeader, { params });
  //     if (response.data && Array.isArray(response.data.data)) {
  //       setHeaders(response.data.data);
  //     } else {
  //       console.error("Dữ liệu API không đúng định dạng:", response.data);
  //       setHeaders([]);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi load header:", error);
  //     setHeaders([]);
  //   } finally {
  //     setLoading(false); // Set loading to false after the API call completes
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await Promise.all([loadHeader()]);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktopAndTablet(window.innerWidth >= 740);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (location.pathname === '/') {
        setKeyword(searchText); // Gửi từ khóa cho Home
      }
      setSearchText('');
    }
  };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };


  return (
    <div className="">
      <div className=" header gridme wide2">
        {/* Thanh Header */}
        <div className="row header-container">
          <div className="col-custom m-12 c-12 l-5 header-left" >
            <div className="contain-logo">
              <img
                src="/logo.png"
                width={50}
                height={50}
                alt="Logo"
                className="animate__animated animate__backInDown header-logo"

              />
            </div>


            <div className="header-name">
              <p className="animate__animated animate__bounceIn company-name">
                {t('companyName')}
              </p>
              <p className="animate__animated animate__backInUp branch-name">{t('branchName')}</p>

            </div>

          </div>
          {/* 
        <div className="col-custom m-12 c-12 header-text l-4">

        </div> */}

          {/* 🔍 Thanh tìm kiếm có icon */}
          <div className={`search-box ${isDesktopAndTablet ? 'animate__animated animate__backInDown' : ''}`}>
            <FaSearch className="search-icon" /> {/* Sử dụng FaSearch */}
            <input
              type="text"
              placeholder={t('searchPlacehoder')}
              className="search-input"

              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Avatar */}
          {/* <div className="col-custom m-2 c-2 changelanguage l-1">
          <img src={vn} alt="VN" className="avatar vietnam" />
          <img src={eng} alt="ENG" className="avatar english" />
        </div> */}

          <div className="col-custom m-2 c-2 changelanguage l-1">
            <img
              src="/vn.png"
              alt="VN"
              className="animate__animated animate__backInDown avatar vietnam"
              onClick={() => changeLanguage("vi")}
              style={{ cursor: "pointer" }}
            />
            <img
              src="/eng.png"
              alt="ENG"
              className="animate__animated animate__backInDown avatar english"
              onClick={() => changeLanguage("en")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Thanh menu */}

        {/* <div className="nav-menu">
        <div className="menu-items">
          <div className="item-menu">
            <span>TRANG CHỦ</span>
          </div>
          <div className="item-menu">
            <span>KẾ HOẠCH DẪN TÀU</span>
          </div>
          <div className="item-menu">
            <span>GIỜ ĐIỀU ĐỘNG & MỚN NƯỚC</span>
          </div>
          <div className="item-menu">
            <span>ĐẶT HÀNG DỊCH VỤ</span>
          </div>
          <div className="item-menu">
            <span>GIÁ DỊCH VỤ</span>
          </div>
          <div className="item-menu">
            <span>DANH SÁCH HOA TIÊU</span>
          </div>
          <div className="item-menu">
            <span>THÔNG SỐ KỸ THUẬT</span>
          </div>
        </div>
      </div> */}
      </div >
      <Navbar />


    </div>

  );
};

export default Header;
