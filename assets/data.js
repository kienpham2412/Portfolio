// File chứa toàn bộ dữ liệu cấu hình cho Portfolio (định dạng JSON Object)
// Bạn chỉ cần chỉnh sửa dữ liệu trong file này, website sẽ tự động cập nhật ngay lập tức!
const PORTFOLIO_DATA = {
  "brand": {
    "badge": "K",
    "title": "Kien Pham",
    "website": "kienphamdev.vercel.app",
    "websiteUrl": "index.html"
  },
  "education": [
    {
      "degree": "Cử nhân Kinh tế xây dựng",
      "description": "Tốt nghiệp loại khá",
      "period": "2014 – 2019",
      "school": "Đại học Kiến trúc Hà Nội"
    },
    {
      "degree": "Cử nhân Khoa học máy tính",
      "description": "Tốt nghiệp loại giỏi",
      "period": "2020 – 2022",
      "school": "Đại học Bách khoa Hà Nội"
    }
  ],
  "experience": [
    {
      "company": "Công Ty Cổ Phần Công Nghệ Cscmobi Việt Nam",
      "highlights": [
        {
          "showCV": true,
          "showPortfolio": false,
          "text": "Phụ trách chính (Lead Developer) lập trình kiến trúc và logic gameplay cho các dự án game puzzle 3D/2D thị trường Global."
        },
        {
          "showCV": true,
          "showPortfolio": false,
          "text": "Xây dựng hệ thống vật lý tương tác (Physics) mượt mà; lập trình custom shader và Shader Graph tạo hiệu ứng đồ họa ấn tượng."
        },
        {
          "showCV": true,
          "showPortfolio": false,
          "text": "Ứng dụng Unity Job System và Multithreading giải quyết bài toán mô phỏng lượng hạt/vật thể lớn (Sand Rush), giữ vững 60 FPS ổn định."
        },
        {
          "showCV": true,
          "showPortfolio": false,
          "text": "Sử dụng Unity Profiler để tối ưu hóa bộ nhớ RAM, Draw Calls, giảm thiểu rò rỉ bộ nhớ (memory leaks) và tối ưu dung lượng cài đặt."
        },
        {
          "showCV": true,
          "showPortfolio": false,
          "text": "Phối hợp cùng Product Owner, Game Designer và Artist theo quy trình Agile/Scrum để hoàn thiện sản phẩm đạt chuẩn phát hành Global."
        }
      ],
      "period": "2022 – Hiện tại",
      "role": "Unity Game Developer"
    }
  ],
  "hero": {
    "avatar": "./assets/images/avatar.webp",
    "bio": "Đam mê xây dựng các trò chơi tương tác lôi cuốn, đồ họa bắt mắt và phát triển ứng dụng tối ưu hiệu năng cao. Luôn khát khao học hỏi và tạo ra các sản phẩm mang lại giá trị thực tế.",
    "greeting": "Xin chào, tôi là",
    "role": "Game Developer",
    "tags": []
  },
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
      "type": "email",
      "value": "kienpham241296@gmail.com"
    },
    {
      "label": "Số điện thoại",
      "raw": "0935581686",
      "type": "phone",
      "value": "(+84) 935581686"
    }
  ],
  "projects": [
    {
      "category": "Puzzle",
      "description": "Sand Rush là một trò chơi giải đố phân loại cát thư giãn nhưng đầy thử thách, nơi bạn phá vỡ các cấu trúc hình khối đầy màu sắc thành dòng cát chảy.",
      "image": "https://drive.google.com/thumbnail?id=13YWdy3YTyqVd2DwlKW828eJQKIuVnpEd&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://play.google.com/store/apps/details?id=com.cscmobi.sandrush&hl=vi",
      "tech": [
        "Unity",
        "C#",
        "URP",
        "Job system"
      ],
      "title": "Sand Rush",
      "url": "https://drive.google.com/file/d/1l16hJYDlHbFbL2I-pCHZpSfJNwp20F0X/view?usp=sharing"
    },
    {
      "category": "Puzzle",
      "description": "Chào mừng bạn đến với Jelly Breaker – trò chơi giải đố cực kỳ đã mắt, kết hợp hoàn hảo giữa chiến thuật ghép màu, vật lý bóng nảy và những màn phá hủy pixel đầy mãn nhãn!",
      "image": "https://drive.google.com/thumbnail?id=16tXbSjOK9XlMsBQBOPo0_QJWtdXrsIPk&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://app.sensortower.com/overview/com.cscmobi.jellybreaker?country=US",
      "tech": [
        "Unity",
        "C#",
        "Custom shader"
      ],
      "title": "Jelly Breaker",
      "url": "https://drive.google.com/file/d/1lKsW1HY_dIOkrvmhplKtyCPaGsmLU2Mx/view?usp=sharing"
    },
    {
      "category": "Puzzle",
      "description": "Rèn luyện trí não với Pin Association, một trò chơi giải đố 3D thư giãn, nơi bạn khám phá những chiếc ghim ẩn và ghép chúng thành các bộ sưu tập theo chủ đề.",
      "image": "https://drive.google.com/thumbnail?id=1nSr0YMZWXvaSDeoBiRpGMa1lO8chAIgp&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://app.sensortower.com/overview/com.cscmobi.pin.association?country=US",
      "tech": [
        "Unity",
        "C#",
        "URP",
        "Unity Physics"
      ],
      "title": "Pin Association",
      "url": "https://drive.google.com/file/d/1Ly1OpZEEBE1IUxnCA7nu54Y-v7Om9Ohh/view?usp=sharing"
    },
    {
      "category": "Puzzle",
      "description": "Topic Solitaire là một phiên bản mới mẻ và thư giãn của thể loại bài solitaire cổ điển — nơi mỗi lá bài là một vật thể được minh họa đẹp mắt, và mục tiêu của bạn là sắp xếp chúng vào đúng danh mục chủ đề.",
      "image": "https://drive.google.com/thumbnail?id=1_0vB9eSbbPkGySniQwMT2C6AO0MXL3Oc&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://play.google.com/store/apps/details?id=com.cscmobi.topic.solitaire&hl=vi",
      "tech": [
        "Unity",
        "C#"
      ],
      "title": "Topic Solitaire",
      "url": "https://drive.google.com/file/d/12tpZ8ccfy1h1qrSSlOKIw-euRODmLT9r/view?usp=sharing"
    },
    {
      "category": "Puzzle",
      "description": "Block Knit Jam là một trò chơi giải đố thư giãn, nơi bạn di chuyển các khối len nhiều màu vào đúng cổng tương ứng để tháo gỡ sợi chỉ và hoàn thành một bức tranh thêu đầy màu sắc trên khung vải phía trên.",
      "image": "https://drive.google.com/thumbnail?id=15OzTvhFYdqcCGgGZ44CHZfbMzAoeIN6d&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://app.sensortower.com/overview/com.block.knit.jam.color?country=US",
      "tech": [
        "Unity",
        "C#",
        "Unity Physics",
        "Custom shader"
      ],
      "title": "Block Knit Jam",
      "url": "https://drive.google.com/file/d/1scIBLsSyAKxso9vL2mqnlZus6xFQcuDG/view?usp=sharing"
    },
    {
      "category": "Puzzle",
      "description": "Trong Nut Screw Jam Puzzle, mục tiêu của bạn đơn giản nhưng đầy thử thách: ghép các con ốc vít, đai ốc và bu-lông theo màu trước khi thời gian kết thúc.",
      "image": "https://drive.google.com/thumbnail?id=19VHIP4Dgu14ApfCbE-ORo3hRusPmE3qW&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://app.sensortower.com/overview/com.pl.csc.screwjam3d.rescue.puzzle?country=US",
      "tech": [
        "Unity",
        "C#",
        "Unity Physics",
        "Shader graph"
      ],
      "title": "Nut Screw Jam Puzzle",
      "url": "https://drive.google.com/file/d/1OP48IhoIG8bEV7jjJ90wt2VS3uFU7gry/view?usp=sharing"
    },
    {
      "category": "Puzzle",
      "description": "Perfect Pack là một trò chơi giải đố thông minh và thư giãn, nơi bạn phải sắp xếp thật khéo léo và suy nghĩ thật nhanh!",
      "image": "https://drive.google.com/thumbnail?id=17523h5TemPsKLokAJIqxmYVD-Ud65XjG&sz=w1000",
      "role": "Lead Developer",
      "storeUrl": "https://app.sensortower.com/overview/com.cscmobi.perfectpack?country=US",
      "tech": [
        "Unity",
        "C#"
      ],
      "title": "Perfect Pack",
      "url": "https://drive.google.com/file/d/1JzQM-yaxc__JpdwxdzpYm57SiWfFo52y/view?usp=sharing"
    }
  ],
  "skills": [
    {
      "description": "Chuyên sâu về lập trình Unity, xây dựng logic gameplay, quản lý asset bộ nhớ, tối ưu hóa FPS.",
      "icon": "layers",
      "tags": [
        "Unity 3D / 2D",
        "C#",
        "Shader Graph & HLSL",
        "Animation & IK",
        "DOTS / Job system"
      ],
      "title": "Game Development"
    },
    {
      "description": "",
      "icon": "tools",
      "tags": [
        "Git",
        "Blender",
        "Photoshop",
        "Unity Profiler",
        "Rider / Antigravity"
      ],
      "title": "Công cụ & Quy trình"
    }
  ],
  "stats": [
    {
      "label": "Dự án hoàn thành",
      "value": "15+"
    },
    {
      "label": "Đam mê & Cam kết",
      "value": "100%"
    }
  ]
};
