// File chứa toàn bộ dữ liệu cấu hình cho Portfolio (định dạng JSON Object)
// Bạn chỉ cần chỉnh sửa dữ liệu trong file này, website sẽ tự động cập nhật ngay lập tức!
const PORTFOLIO_DATA = {
  "brand": {
    "badge": "K",
    "title": "Kien Pham"
  },
  "hero": {
    "greeting": "Xin chào, tôi là",
    "role": "Game Developer",
    "avatar": "./assets/images/avatar.webp",
    "tags": [
      "Unity & C#",
      "Software Engineer"
    ],
    "bio": "Đam mê xây dựng các trò chơi tương tác lôi cuốn, đồ họa bắt mắt và phát triển ứng dụng tối ưu hiệu năng cao. Luôn khát khao học hỏi và tạo ra các sản phẩm mang lại giá trị thực tế."
  },
  "stats": [
    {
      "value": "15+",
      "label": "Dự án hoàn thành"
    },
    {
      "value": "100%",
      "label": "Đam mê & Cam kết"
    }
  ],
  "personalInfo": [
    {
      "label": "Họ và tên",
      "value": "Phạm Hồng Kiên"
    },
    {
      "label": "Ngày sinh",
      "value": "24 / 12 / 1996"
    },
    {
      "label": "Giới tính",
      "value": "Nam"
    },
    {
      "label": "Nơi sinh sống",
      "value": "Hà Nội, Việt Nam"
    },
    {
      "label": "Email",
      "value": "kienpham241296@gmail.com",
      "type": "email"
    },
    {
      "label": "Số điện thoại",
      "value": "(+84) 935581686",
      "type": "phone",
      "raw": "0935581686"
    }
  ],
  "education": [
    {
      "period": "2014 – 2020",
      "degree": "Cử nhân Kinh tế xây dựng",
      "school": "Đại học Kiến trúc Hà Nội",
      "description": "Tốt nghiệp loại khá"
    },
    {
      "period": "2020 – 2022",
      "degree": "Cử nhân Khoa học máy tính",
      "school": "Đại học Bách khoa Hà Nội",
      "description": "Tốt nghiệp loại giỏi"
    }
  ],
  "experience": [
    {
      "period": "2022 – Hiện tại",
      "company": "Công Ty Cổ Phần Công Nghệ Cscmobi Việt Nam",
      "role": "Unity Game Developer"
    }
  ],
  "skills": [
    {
      "icon": "layers",
      "title": "Game Development",
      "description": "Chuyên sâu về lập trình Unity, xây dựng logic gameplay, quản lý asset bộ nhớ, tối ưu hóa FPS.",
      "tags": [
        "Unity 3D / 2D",
        "C#",
        "Shader Graph & HLSL",
        "Animation & IK",
        "DOTS / Job system"
      ]
    },
    {
      "icon": "tools",
      "title": "Công cụ & Quy trình",
      "description": "",
      "tags": [
        "Git",
        "Blender",
        "Photoshop",
        "Unity Profiler",
        "Rider / Antigravity"
      ]
    }
  ],
  "projects": [
    {
      "title": "Sand Rush",
      "category": "Puzzle",
      "role": "Lead Developer",
      "image": "./assets/images/sandrush.webp",
      "description": "Sand Rush là một trò chơi giải đố phân loại cát thư giãn nhưng đầy thử thách, nơi bạn phá vỡ các cấu trúc hình khối đầy màu sắc thành dòng cát chảy.",
      "tech": [
        "Unity",
        "C#",
        "URP",
        "Job system"
      ],
      "url": "https://drive.google.com/file/d/1l16hJYDlHbFbL2I-pCHZpSfJNwp20F0X/view?usp=sharing",
      "storeUrl": "https://play.google.com/store/apps/details?id=com.cscmobi.sandrush&hl=vi"
    },
    {
      "title": "Jelly Breaker",
      "category": "Puzzle",
      "role": "Lead Developer",
      "image": "./assets/images/jellybreaker.webp",
      "description": "Chào mừng bạn đến với Jelly Breaker – trò chơi giải đố cực kỳ đã mắt, kết hợp hoàn hảo giữa chiến thuật ghép màu, vật lý bóng nảy và những màn phá hủy pixel đầy mãn nhãn!",
      "tech": [
        "Unity",
        "C#",
        "Custom shader"
      ],
      "url": "https://drive.google.com/file/d/1lKsW1HY_dIOkrvmhplKtyCPaGsmLU2Mx/view?usp=sharing",
      "storeUrl": "https://app.sensortower.com/overview/com.cscmobi.jellybreaker?country=US"
    },
    {
      "title": "Pin Association",
      "category": "Puzzle",
      "role": "Lead Developer",
      "image": "./assets/images/pin.webp",
      "description": "Rèn luyện trí não với Pin Association, một trò chơi giải đố 3D thư giãn, nơi bạn khám phá những chiếc ghim ẩn và ghép chúng thành các bộ sưu tập theo chủ đề.",
      "tech": [
        "Unity",
        "C#",
        "URP",
        "Unity Physics"
      ],
      "url": "https://drive.google.com/file/d/1Ly1OpZEEBE1IUxnCA7nu54Y-v7Om9Ohh/view?usp=sharing",
      "storeUrl": "https://app.sensortower.com/overview/com.cscmobi.pin.association?country=US"
    },
    {
      "title": "Block Knit Jam",
      "category": "Puzzle",
      "role": "Lead Developer",
      "image": "./assets/images/blockknit.webp",
      "description": "Block Knit Jam là một trò chơi giải đố thư giãn, nơi bạn di chuyển các khối len nhiều màu vào đúng cổng tương ứng để tháo gỡ sợi chỉ và hoàn thành một bức tranh thêu đầy màu sắc trên khung vải phía trên.",
      "tech": [
        "Unity",
        "C#",
        "Unity Physics",
        "Custom shader"
      ],
      "url": "https://drive.google.com/file/d/1scIBLsSyAKxso9vL2mqnlZus6xFQcuDG/view?usp=sharing",
      "storeUrl": "https://app.sensortower.com/overview/com.block.knit.jam.color?country=US"
    },
    {
      "title": "Nut Screw Jam Puzzle",
      "category": "Puzzle",
      "role": "Lead Developer",
      "image": "./assets/images/nutscrew.webp",
      "description": "Trong Nut Screw Jam Puzzle, mục tiêu của bạn đơn giản nhưng đầy thử thách: ghép các con ốc vít, đai ốc và bu-lông theo màu trước khi thời gian kết thúc.",
      "tech": [
        "Unity",
        "C#",
        "Unity Physics",
        "Shader graph"
      ],
      "url": "https://drive.google.com/file/d/1OP48IhoIG8bEV7jjJ90wt2VS3uFU7gry/view?usp=sharing",
      "storeUrl": "https://app.sensortower.com/overview/com.pl.csc.screwjam3d.rescue.puzzle?country=US"
    }
  ]
};
