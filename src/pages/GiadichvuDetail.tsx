


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import '../static/css/dichvudetail.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import NewsListCarousel from '../components/NewsListCarousel';
import { GiaDichVu, Tintuc } from '../interface/InterfaceCommon';
import GiaDichVuListCarousel from '../components/GiaDichVuListCarousel';
import { FaHandPointRight } from 'react-icons/fa';
import { AiFillFilePdf, AiFillFileWord } from 'react-icons/ai';

const GiadichvuDetail = () => {
    const location = useLocation();
    const giadichvuItem = location.state?.giadichvuItem; // Lấy dữ liệu từ state
    const [giadichvus, setGiaDichVu] = useState<GiaDichVu[]>([]);

    const loadGiadichvu = async (page: number) => {
        try {
            const params = { limit: 1000, page: 1 };
            const response = await Apis.get(endpoints.APIServicePrice, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setGiaDichVu(response.data.data);
                // Sử dụng totalRecords từ API
                const total = response.data.totalRecords || response.data.data.length;
                // setTotalItems(total);

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setGiaDichVu([]);
                // setTotalItems(0);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setGiaDichVu([]);
            // setTotalItems(0);
        }
    };
    useEffect(() => {
        loadGiadichvu(1);
    }, [1]);

    // Nếu không có dữ liệu từ state, hiển thị thông báo
    if (!giadichvuItem) {


        return (
            <div className="gridme wide">
                <h2>Không tìm thấy tin tức</h2>
            </div>
        );
    }
    else {

    }
    const [isHovered, setIsHovered] = useState(false);





    return (
        <>
            <Carousel2 name="BẢNG GIÁ DỊCH VỤ" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom l-9 m-12 c-12">
                        <Titlepage name="Chi tiết" />
                        <div className="detail-dichvu">
                            <h2>{giadichvuItem.title}</h2>

                            <p dangerouslySetInnerHTML={{ __html: giadichvuItem.content || "" }} ></p>
                            {/* <span className='detail-dichvu-postdate'>Ngày đăng: {dichvuItem.postdate}</span> */}

                            <img src={`${SERVER}/${giadichvuItem.image}`} alt={giadichvuItem.image} />

                            <span className="detail-dichvu-postdate">
                                Ngày đăng: {new Date(giadichvuItem.postdate).toLocaleDateString('vi-VN')}
                            </span>

                            <div className="attention-wrapper">
                                {/* <span className="hand-pointer">👉</span> */}

                                <span className="hand-pointer"><FaHandPointRight /></span>

                                <a
                                    href={`${SERVER}/${giadichvuItem.pdfurl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-pdf-link"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <span className="btn-content">
                                        {isHovered ? (
                                            <>
                                                <AiFillFileWord className="btn-icon" />
                                                <span className="btn-text">Xem Word</span>
                                            </>
                                        ) : (
                                            <>
                                                <AiFillFilePdf className="btn-icon" />
                                                <span className="btn-text">Xem PDF</span>
                                            </>
                                        )}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>




                </div>

                <div className="row">
                    <div className="col-custom l-3"></div>

                    <div className="col-custom l-9 m-12 c-12">
                        <br />
                        <hr className='hrbaiviet' />
                        <Titlepage name="BÀI ĐĂNG LIÊN QUAN" />

                        <GiaDichVuListCarousel
                            items={giadichvus} // Tintuc[]
                            // onItemClick={handleOpenDialog} // (item: Tintuc) => void
                            imageBaseUrl={SERVER}
                        />
                    </div>
                </div>


            </div>
        </>
    );
};

export default GiadichvuDetail;