import banner2 from '@/assets/images/homepage/banner-2.png'
import banner3 from '@/assets/images/homepage/banner-3.png'
import banner4 from '@/assets/images/homepage/banner-4.png'
import banner5 from '@/assets/images/homepage/banner-5.png'
import banner6 from '@/assets/images/homepage/banner-6.png'
import banner7 from '@/assets/images/homepage/banner-7.png'
import banner8 from '@/assets/images/homepage/banner-8.png'
import banner9 from '@/assets/images/homepage/banner-9.png'
import banner10 from '@/assets/images/homepage/banner-10.png'
import banner11 from '@/assets/images/homepage/banner-11.png'
import banner12 from '@/assets/images/homepage/banner-12.png'
import serviceListFirstImg1 from '@/assets/images/homepage/service-list-first-img-1.jpg'
import serviceListFirstImg2 from '@/assets/images/homepage/service-list-first-img-2.png'
import serviceListFirstImg3 from '@/assets/images/homepage/service-list-first-img-3.png'
import serviceListFirstImg4 from '@/assets/images/homepage/service-list-first-img-4.png'
import serviceListFirstImg5 from '@/assets/images/homepage/service-list-first-img-5.png'
import serviceListFirstImg6 from '@/assets/images/homepage/service-list-first-img-6.png'
import serviceListSecondImg1 from '@/assets/images/homepage/service-list-second-img-1.jpg'
import serviceListSecondImg2 from '@/assets/images/homepage/service-list-second-img-2.jpg'
import serviceListSecondImg3 from '@/assets/images/homepage/service-list-second-img-3.png'
import serviceListSecondImg4 from '@/assets/images/homepage/service-list-second-img-4.jpg'
import serviceListThirdImg1 from '@/assets/images/homepage/service-list-third-img-1.png'
import serviceListThirdImg2 from '@/assets/images/homepage/service-list-third-img-2.jpg'
import serviceListThirdImg3 from '@/assets/images/homepage/service-list-third-img-3.png'
import serviceListThirdImg4 from '@/assets/images/homepage/service-list-third-img-4.png'
import newListImg1 from '@/assets/images/homepage/news-list-img-1.jpg'
import newListImg2 from '@/assets/images/homepage/news-list-img-2.jpg'
import newListImg3 from '@/assets/images/homepage/news-list-img-3.jpg'
import newListImg4 from '@/assets/images/homepage/news-list-img-4.png'
import newListImg5 from '@/assets/images/homepage/news-list-img-5.png'
import adsListFirstImg1 from '@/assets/images/homepage/ads-list-first-img-1.png'
import adsListFirstImg2 from '@/assets/images/homepage/ads-list-first-img-2.jpg'
import adsListFirstImg3 from '@/assets/images/homepage/ads-list-first-img-3.png'
import adsListSecondImg1 from '@/assets/images/homepage/ads-list-second-img-1.png'
import adsListSecondImg2 from '@/assets/images/homepage/ads-list-second-img-2.png'
import adsListSecondImg3 from '@/assets/images/homepage/ads-list-second-img-3.jpg'
import adsListThirdImg1 from '@/assets/images/homepage/ads-list-third-img-1.jpg'
import adsListThirdImg2 from '@/assets/images/homepage/ads-list-third-img-2.jpg'
import logoVtv from '@/assets/images/homepage/logo-vtv.png'
import logoCesti from '@/assets/images/homepage/logo-cesti.png'
import logoDantri from '@/assets/images/homepage/logo-dantri.png'
import logoTuoitre from '@/assets/images/homepage/logo-tuoitre.png'
import logoFbnc from '@/assets/images/homepage/logo-fbnc.png'
import busSubImage1 from '@/assets/images/homepage/1559637728383.jpeg'
import busSubImage2 from '@/assets/images/homepage/1664766332372.jpeg'
import busSubImage3 from '@/assets/images/homepage/1559637746787.jpeg'
import busSubImage4 from '@/assets/images/homepage/166476633237223.jpeg'
import busSubImage5 from '@/assets/images/homepage/1660614512334.jpeg'

const GENDER_TYPES = [
  {
    text: 'Nam',
    value: 1
  },
  {
    text: 'Nữ',
    value: 0
  }
]

const ORDER_STATUS_TYPES = {
  NEW: 0,
  ALREADY_PAID: 1,
  CANCELED: 2,
  PAYMENT_FAILED: 3
}

const ORDER_STATUS_TYPES_NAME = [
  {
    text: 'Mới',
    value: ORDER_STATUS_TYPES.NEW
  },
  {
    text: 'Đã trả tiền',
    value: ORDER_STATUS_TYPES.ALREADY_PAID
  },
  {
    text: 'Đã hủy',
    value: ORDER_STATUS_TYPES.CANCELED
  },
  {
    text: 'Thanh toán thất bại',
    value: ORDER_STATUS_TYPES.PAYMENT_FAILED
  }
]

const HIGHEST_LEVEL = 0
const MAXLENGTH_DISPLAY = 18
const DEFAULT_PARAMS_SEARCH_TRIPS = {
  departure_location_id: 23,
  destination_location_id: 15,
  departure_date: new Date()
}
const SEAT_TYPES = [
  {
    text: 'Ghế ngồi',
    value: 0
  },
  {
    text: 'Giường nằm',
    value: 1
  },
  {
    text: 'Limousine',
    value: 2
  }
]

const LIST_IMAGES_SERVICE = [
  banner2,
  banner3,
  banner4
]

const FIRST_TOP_FOUR_JOURNEY_IMAGES = [
  banner5,
  banner6,
  banner7,
  banner8
]

const NEXT_TOP_FOUR_JOURNEY_IMAGES = [
  banner9,
  banner10,
  banner11,
  banner12
]

const TOMORROW = new Date()
TOMORROW.setDate(new Date().getDate() + 1)

const CURRENT_PAGE = 0

const PAYMENT_METHOD_TYPES = [
  {
    text: 'Ship COD',
    value: 0
  },
  {
    text: 'ATM',
    value: 1
  },
  {
    text: 'International Card',
    value: 2
  },
  {
    text: 'Momo',
    value: 3
  }
]

const BUS_SEAT_TYPES = [
  {
    text: 'Ghế ngồi',
    value: 0
  },
  {
    text: 'Giường nằm',
    value: 1
  },
  {
    text: 'Limounsine',
    value: 2
  }
]

const TRIPS_TO_SHOW = 20
const SERVICE_LIST_FIRST_ITEMS = [
  {
    title: 'Ưu đãi vé xe Lễ 30/4 - 1/5 đến 50%',
    imgSrc: serviceListFirstImg1
  },
  {
    title: 'Danh sách các nhà xe đã mở bán vé Lễ 30/4 - 1/5',
    imgSrc: serviceListFirstImg2
  },
  {
    title: 'Lịch nghỉ lễ 30/4 - 1/5/2023',
    imgSrc: serviceListFirstImg3
  },
  {
    title: 'Nên mua vé re Lễ ở bến xe hay HuyVietBus?',
    imgSrc: serviceListFirstImg4
  },
  {
    title: 'Lưu ý khi đặt vé Lễ 30/4 - 1/5',
    imgSrc: serviceListFirstImg5
  },
  {
    title: 'Các vấn đề thường gặp và cách xử lý vé xe Lễ',
    imgSrc: serviceListFirstImg6
  }
]

const SERVICE_LIST_SECOND_ITEMS = [
  {
    title: 'Dịch vụ thuê xe từ Sân bay Tân Sơn Nhất đi các quận TPHCM',
    imgSrc: serviceListSecondImg1
  },
  {
    title: 'Thuê xe máy giá rẻ, chất lượng tại HuyVietBus',
    imgSrc: serviceListSecondImg2
  },
  {
    title: 'Vé xe buýt Hop On Hop Off ở Thành phố Hồ Chí Minh',
    imgSrc: serviceListSecondImg3
  },
  {
    title: 'Dịch vụ thuê xe tại HuyVietBus',
    imgSrc: serviceListSecondImg4
  }
]

const SERVICE_LIST_THIRD_ITEMS = [
  {
    title: 'Lợi ích khi sử dụng vé điện tử cung cấp bởi HuyVietBus',
    imgSrc: serviceListThirdImg1
  },
  {
    title: 'Đăng ký treo banner quảng cáo tại HuyVietBus',
    imgSrc: serviceListThirdImg2
  },
  {
    title: 'Đăng ký mở bán vé tại HuyVietBus.com',
    imgSrc: serviceListThirdImg3
  },
  {
    title: 'Ứng dụng Quản lý nhà xe của HuyVietBus',
    imgSrc: serviceListThirdImg4
  }
]

const NEWS_LIST_ITEMS = [
  {
    title: '[Phóng sự HTV9] HuyVietBus và công cuộc cách mạng hoá ngành vận tải hành khách',
    imgSrc: newListImg1
  },
  {
    title: '[Phóng sự VTV9] Đặt vé xe khách nhanh chóng, tiện lợi',
    imgSrc: newListImg2
  },
  {
    title: 'Bộ Thông tin - Truyền thông công nhận HuyVietBus là Nền tảng số',
    imgSrc: newListImg3
  },
  {
    title: 'HuyVietBus - G8 Open Tour đồng hành cùng chương trình Tết Đong Đầy',
    imgSrc: newListImg4
  },
  {
    title: 'HuyVietBus - Vie Limousine đồng hành cùng cuộc thi Hoa Hậu',
    imgSrc: newListImg5
  }
]

const ADS_LIST_FIRST_ITEMS = [
  {
    title: 'Tổng hợp chương trình khuyến mãi trong tháng',
    imgSrc: adsListFirstImg1
  },
  {
    title: 'Giới thiệu bạn mới - Nhận quà khủng từ HuyVietBus',
    imgSrc: adsListFirstImg2
  },
  {
    title: 'Ưu đãi bất ngờ khi đặt HuyVietBus',
    imgSrc: adsListFirstImg3
  }
]

const ADS_LIST_SECOND_ITEMS = [
  {
    title: 'Nhận ưu đãi Gojek 20K khi đặt vé tại HuyVietBus',
    imgSrc: adsListSecondImg1
  },
  {
    title: 'Giảm 50K cho đơn từ 200K khi đặt giao hàng tại ứng dụng Lalamove',
    imgSrc: adsListSecondImg2
  },
  {
    title: 'Nhận ưu đãi HuyVietBus lên đến 400K khi đăng ký mở thẻ tín dụng VPBank',
    imgSrc: adsListSecondImg3
  }
]

const ADS_LIST_THIRD_ITEMS = [
  {
    title: 'Chủ động và an tâm hơn trong mọi hành trình với tính năng GPS định vị xe khách',
    imgSrc: adsListThirdImg1
  },
  {
    title: 'Bảo hiểm chuyến đi” chính thức ra mắt tại HuyVietBus',
    imgSrc: adsListThirdImg2
  },
  {
    title: '',
    imgSrc: ''
  }
]

const LOGO_MENTIONED = [
  {
    alt: 'vtv',
    imgSrc: logoVtv
  },
  {
    alt: 'cesti',
    imgSrc: logoCesti
  },
  {
    alt: 'dan-tri',
    imgSrc: logoDantri
  },
  {
    alt: 'tuoi-tre',
    imgSrc: logoTuoitre
  },
  {
    alt: 'fbnc',
    imgSrc: logoFbnc
  }
]

const BUS_SUB_IMAGES = [
  { imgSrc: busSubImage1 },
  { imgSrc: busSubImage2 },
  { imgSrc: busSubImage3 },
  { imgSrc: busSubImage4 },
  { imgSrc: busSubImage5 }
]

const THIRTY_DAYS_AFTER_TODAY = new Date(Date.now())
THIRTY_DAYS_AFTER_TODAY.setDate((new Date(Date.now()).getDate() + 30))

const ORDERS_TO_SHOW = 10

export {
  HIGHEST_LEVEL,
  DEFAULT_PARAMS_SEARCH_TRIPS,
  MAXLENGTH_DISPLAY,
  SEAT_TYPES,
  LIST_IMAGES_SERVICE,
  FIRST_TOP_FOUR_JOURNEY_IMAGES,
  NEXT_TOP_FOUR_JOURNEY_IMAGES,
  TOMORROW,
  GENDER_TYPES,
  ORDER_STATUS_TYPES,
  ORDER_STATUS_TYPES_NAME,
  CURRENT_PAGE,
  PAYMENT_METHOD_TYPES,
  BUS_SEAT_TYPES,
  TRIPS_TO_SHOW,
  SERVICE_LIST_FIRST_ITEMS,
  SERVICE_LIST_SECOND_ITEMS,
  SERVICE_LIST_THIRD_ITEMS,
  NEWS_LIST_ITEMS,
  ADS_LIST_FIRST_ITEMS,
  ADS_LIST_SECOND_ITEMS,
  ADS_LIST_THIRD_ITEMS,
  LOGO_MENTIONED,
  BUS_SUB_IMAGES,
  THIRTY_DAYS_AFTER_TODAY,
  ORDERS_TO_SHOW
}
