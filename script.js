document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
    const preloader = document.getElementById('preloader');
    const hidePreloader = () => {
        if (!preloader || preloader.style.display === 'none') return;
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => preloader.style.display = 'none'
        });
    };

    if (preloader) {
        window.addEventListener('load', hidePreloader);
        setTimeout(hidePreloader, 4000);
    }


    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) { 
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { 
                gsap.to(backToTopBtn, { opacity: 1, scale: 1, duration: 0.3, display: 'flex' });
            } else { 
                gsap.to(backToTopBtn, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => backToTopBtn.style.display = 'none' });
            }
        });

        backToTopBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 0.4, 
                scrollTo: { y: 0, autoKill: false }, 
                ease: "power2.inOut" 
            });
        });
    }


    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        // Header dính (sticky header)
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerOffset = header ? header.offsetHeight : 0;
            if (window.scrollY >= sectionTop - headerOffset - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId || link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) { 
                const headerOffset = header ? header.offsetHeight : 0;
                const offsetTop = targetSection.offsetTop - headerOffset;

                gsap.to(window, {
                    duration: 0.4,
                    scrollTo: {
                        y: offsetTop,
                        autoKill: false 
                    },
                    ease: "power2.inOut"
                });
            }

            if (hamburger && navbar && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('projects');
            if (targetSection) {
                const headerOffset = header ? header.offsetHeight : 0;
                const offsetTop = targetSection.offsetTop - headerOffset;
                gsap.to(window, {
                    duration: 0.4,
                    scrollTo: {
                        y: offsetTop,
                        autoKill: false
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    }

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.classList.add('custom-cursor-follower');
    document.body.appendChild(follower);

    gsap.set([cursor, follower], { opacity: 0 });

    let mouseX = 0, mouseY = 0;

    const animateCursor = () => {
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: "none"
        });
        gsap.to(follower, {
            x: mouseX,
            y: mouseY,
            duration: 0.8,
            ease: "power2.out"
        });
        requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    });

    animateCursor();

    document.addEventListener('mouseleave', () => {
        gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    });

    document.addEventListener('mouseenter', () => {
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    });

    const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .filter-button, .cta-button, .back-to-top-btn, .project-link, .skill-item, .contact-card, .hamburger');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 1.5, duration: 0.3, ease: "power2.out" }); 
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, duration: 0.3, ease: "power2.out" }); 
        });
    });

    document.addEventListener('mousedown', () => {
        gsap.to(follower, { scale: 1.5, duration: 0.2, ease: "power2.out" }); 
    });

    document.addEventListener('mouseup', () => {
        gsap.to(follower, { scale: 1, duration: 0.2, ease: "power2.out" }); 
    });

    const translations = {
        vi: {
            nav_home: 'Trang Chủ',
            nav_about: 'Giới Thiệu',
            nav_skills: 'Kỹ Năng',
            nav_projects: 'Dự Án',
            nav_contact: 'Liên Hệ',
            hero_greeting: 'Xin chào, tôi là',
            hero_typing_text: 'Một nhà thiết kế website chuyên nghiệp, biến ý tưởng thành trải nghiệm người dùng tuyệt vời.',
            cta_button: 'Xem Dự Án Của Tôi',
            about_title: 'Giới thiệu',
            about_para1: 'Chào bạn! Tôi là một nhà thiết kế website với đam mê tạo nên giao diện trực quan, thẩm mỹ và thân thiện với người dùng. Với nhiều năm kinh nghiệm, tôi chuyên thiết kế, quản lý và tối ưu website để mang lại trải nghiệm tốt nhất cho người truy cập.',
            about_para2: 'Mục tiêu của tôi là tạo ra những trang web không chỉ hấp dẫn về mặt thị giác mà còn hiệu quả trong việc truyền tải thông điệp và đạt được mục tiêu kinh doanh của khách hàng. Tôi luôn học hỏi các công nghệ và xu hướng mới nhất để mang đến giải pháp tốt nhất.',
            about_para3: 'Hãy cùng kết nối để biến những ý tưởng của bạn thành hiện thực!',
            skills_title: 'Kỹ Năng Chính',
            skill_wordpress: 'WordPress Developer',
            skill_wordpress_desc: 'Thiết kế và phát triển giao diện tùy chỉnh bằng cách kết hợp Theme Builder, ACF, Elementor,... Thành thạo xây dựng theme và plugin riêng, linh hoạt tích hợp nhiều plugin và theme để đáp ứng đa dạng yêu cầu dự án.',
            skill_uiux: 'UI/UX Design',
            skill_uiux_desc: 'Thiết kế trải nghiệm người dùng với Figma, Adobe XD, Canva',
            skill_frontend: 'Front-end Development',
            skill_frontend_desc: 'HTML, CSS, JavaScript, ReactJS',
            skill_backend: 'Back-end Development',
            skill_backend_desc: 'PHP, Laravel – Xây dựng chức năng và xử lý dữ liệu',
            skill_database: 'Database Management',
            skill_database_desc: 'MySQL, phpMyAdmin – Thiết kế và tối ưu hóa dữ liệu',
            skill_hosting: 'Hosting & Triển khai',
            skill_hosting_desc: 'Cài đặt web server, SSL, DNS, kết nối tên miền, gửi mail hệ thống',
            skill_seo_performance: 'SEO & Hiệu suất',
            skill_seo_performance_desc: 'Tối ưu chuẩn SEO onpage, tốc độ tải trang, Google Search Console',
            skill_content_seo: 'Content SEO',
            skill_content_seo_desc: 'Nghiên cứu từ khóa, viết bài chuẩn SEO, tối ưu thẻ tiêu đề, mô tả và nội dung bài viết',
            skill_ecommerce_ops: 'Quản lý & vận hành sàn TMĐT',
            skill_ecommerce_ops_desc: 'Xây dựng sàn TMĐT, đăng sản phẩm, tối ưu gian hàng, xử lý đơn hàng trên Shopee, Lazada, Tiki và website',
            skill_git: 'Git & Version Control',
            skill_git_desc: 'Quản lý dự án bằng Git, GitHub – Triển khai giao diện thông qua GitHub Pages',
            skill_ads: 'Chạy quảng cáo Ads',
            skill_ads_desc: 'Thiết lập và tối ưu chiến dịch quảng cáo trên Google Ads, Facebook Ads – Tăng chuyển đổi, giảm chi phí',
            skill_data_analysis: 'Phân tích dữ liệu',
            skill_data_analysis_desc: 'Sử dụng Google Analytics, Google Tag Manager để theo dõi hành vi người dùng và đo lường hiệu quả website',
            projects_title: 'Dự Án Tiêu Biểu',
            filter_all: 'Tất cả',
            filter_ecommerce: 'E-commerce',
            filter_branding: 'Branding',
            filter_blog: 'Blog',
            load_more: 'Xem Thêm Dự Án',
            contact_title: 'Liên Hệ Với Tôi',
            contact_intro: 'Bạn có ý tưởng hay cần một nhà thiết kế website? Hãy kết nối với tôi qua các kênh sau:',
            contact_email: 'Email',
            contact_phone: 'Điện thoại',
            contact_github: 'GitHub',
            contact_outro: 'Tôi luôn sẵn sàng thảo luận về các dự án mới và cơ hội hợp tác.',
            project_view_details: 'Xem chi tiết',
            hero_name: 'Hiếu',
            footer_text: '&copy; 2024 Hiếu. All rights reserved.',
            page_title: 'Hiếu - Website Developer Portfolio'
        },
        en: {
            nav_home: 'Home',
            nav_about: 'About',
            nav_skills: 'Skills',
            nav_projects: 'Projects',
            nav_contact: 'Contact',
            hero_greeting: 'Hello, I am',
            hero_typing_text: 'A professional website designer turning ideas into great user experiences.',
            cta_button: 'View My Projects',
            about_title: 'About',
            about_para1: 'Hello! I am a web designer passionate about creating intuitive, aesthetic, and user-friendly interfaces. With years of experience, I specialize in designing, managing, and optimizing websites to deliver the best visitor experience.',
            about_para2: 'My goal is to create websites that are not only visually appealing but also effective in communicating the message and achieving the business goals of clients. I continuously learn the latest technologies and trends to provide the best solutions.',
            about_para3: 'Let us connect to turn your ideas into reality!',
            skills_title: 'Key Skills',
            skill_wordpress: 'WordPress Developer',
            skill_wordpress_desc: 'Design and develop custom interfaces using Theme Builder, ACF, and Elementor. Proficient in building custom themes and plugins, and highly adaptable in integrating various tools to meet diverse project requirements.',
            skill_uiux: 'UI/UX Design',
            skill_uiux_desc: 'Design user experiences with Figma, Adobe XD, Canva',
            skill_frontend: 'Front-end Development',
            skill_frontend_desc: 'HTML, CSS, JavaScript, ReactJS',
            skill_backend: 'Back-end Development',
            skill_backend_desc: 'PHP, Laravel – Build functionality and handle data',
            skill_database: 'Database Management',
            skill_database_desc: 'MySQL, phpMyAdmin – Design and optimize data',
            skill_hosting: 'Hosting, VPS & Server',
            skill_hosting_desc: 'Administration and setup of VPS servers, cPanel, and various web panels. Integration of Cloudflare (DNS, CDN, Security). Configuration of web servers, SSL/HTTPS security, webmail, and data backup systems.',
            skill_seo_performance: 'SEO & Performance',
            skill_seo_performance_desc: 'Optimize SEO on-page, page speed, Google Search Console',
            skill_content_seo: 'Content SEO',
            skill_content_seo_desc: 'Keyword research, SEO content writing, optimize titles, meta descriptions, and page content',
            skill_ecommerce_ops: 'E-commerce Operations',
            skill_ecommerce_ops_desc: 'Build e-commerce platforms, add products, optimize storefronts, manage orders on Shopee, Lazada, Tiki, and websites',
            skill_git: 'Git & Version Control',
            skill_git_desc: 'Manage projects with Git and GitHub – deploy interfaces via GitHub Pages',
            skill_ads: 'Ads Campaigns',
            skill_ads_desc: 'Set up and optimize campaigns on Google Ads and Facebook Ads – increase conversions, reduce cost',
            skill_data_analysis: 'Data Analysis',
            skill_data_analysis_desc: 'Use Google Analytics and Google Tag Manager to track user behavior and measure website performance',
            projects_title: 'Featured Projects',
            filter_all: 'All',
            filter_ecommerce: 'E-commerce',
            filter_branding: 'Branding',
            filter_blog: 'Blog',
            load_more: 'Load More Projects',
            contact_title: 'Contact Me',
            contact_intro: 'Do you have an idea or need a web designer? Let’s connect through the following channels:',
            contact_email: 'Email',
            contact_phone: 'Phone',
            contact_github: 'GitHub',
            contact_outro: 'I am always happy to discuss new projects and collaboration opportunities.',
            hero_name: 'Hieu',
            footer_text: '&copy; 2024 Hieu. All rights reserved.',
            page_title: 'Hieu - Website Developer Portfolio',
            project_view_details: 'View Details'
        }
    };

    let filteredProjectsData = [];
    let currentDisplayedProjects = 0;

    const setLang = (lang) => {
        const selectedLang = translations[lang] ? lang : 'vi';
        localStorage.setItem('lang', selectedLang);
        document.documentElement.lang = selectedLang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = translations[selectedLang][key];
            if (translation) {
                if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });

        const loadMoreBtnText = document.querySelector('#loadMoreProjects .button-text');
        if (loadMoreBtnText) {
            loadMoreBtnText.textContent = translations[selectedLang].load_more;
        }

        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = selectedLang;
        }

        if (filteredProjectsData.length > 0) {
            const itemsToShow = currentDisplayedProjects > 0 ? currentDisplayedProjects : 6;
            renderProjects(filteredProjectsData.slice(0, itemsToShow), false);
        }
    };

    const loadUserLang = () => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang && translations[savedLang]) {
            setLang(savedLang);
        } else {
            setLang('vi');
        }
    };

    window.setLang = setLang;

    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', () => setLang(languageSelector.value));
    }

    loadUserLang();


    gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });
    gsap.to(".typewriter-text", {
        text: translations[document.documentElement.lang || 'vi'].hero_typing_text,
        duration: 2.5,
        delay: 1.2,
        ease: "none" 
    });
    gsap.from(".cta-button", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 3
    });
    gsap.to(".hero-background-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });


    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse" 
            }
        });
    });


    gsap.from(".about-image img", {
        opacity: 0,
        x: -100,
        rotation: -10,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.from(".about-text p", {
        opacity: 0,
        x: 100,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2, 
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });


    gsap.utils.toArray(".skill-item").forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });


    gsap.from(".contact-intro", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.utils.toArray(".contact-card").forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
    gsap.from(".contact-outro", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".contact-outro",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });


    const filterButtons = document.querySelectorAll('.filter-button');
    const projectsContainer = document.querySelector('.projects-grid');
    const loadMoreButton = document.getElementById('loadMoreProjects');
    const projectsPerPage = 6;

    const allProjectsData = [
        {
            id: 1,
            title: { vi: 'Website Royalhelmet', en: 'Royalhelmet Website' },
            description: { vi: 'Phát triển website bán hàng – đầy đủ chức năng mua hàng và quản lý đơn hàng.', en: 'Developed an e-commerce website with full purchasing and order management features.' },
            image: `image/demo/royal.png`,
            link: 'https://royalhelmet.com.vn/',
            tags: 'e-commerce'
        },
        {
            id: 2,
            title: { vi: 'Website máy móc', en: 'Machine Equipment Website' },
            description: { vi: 'Website bán hàng – hỗ trợ thanh toán và quản lý đơn hàng.', en: 'E-commerce site with payment support and order management.' },
            image: `image/demo/maymoc.png`,
            link: 'https://maymochoanglong.vn/',
            tags: 'e-commerce'
        },
        {
            id: 3,
            title: { vi: 'Website thực phẩm', en: 'Food Product Website' },
            description: { vi: 'Website bán hàng – đầy đủ chức năng mua hàng và thanh toán.', en: 'Online store with complete purchase and checkout features.' },
            image: `image/demo/thucpham.png`,
            link: 'https://food16.layoutwebdemo.com/',
            tags: 'e-commerce'
        },
        {
            id: 4,
            title: { vi: 'Website gỗ nhựa', en: 'Wood-Plastic Website' },
            description: { vi: 'Website bán hàng – tối ưu trải nghiệm mua sắm và thanh toán.', en: 'Sales website optimized for shopping experience and checkout.' },
            image: `image/demo/gonhua.png`,
            link: 'https://gonhua.layoutwebdemo.com/',
            tags: 'e-commerce'
        },
        {
            id: 5,
            title: { vi: 'Website bánh mì', en: 'Bakery Website' },
            description: { vi: 'Website bán hàng đơn giản – hỗ trợ mua hàng và xử lý đơn hàng.', en: 'Simple e-commerce site supporting purchases and order handling.' },
            image: `image/demo/banhmi.png`,
            link: 'https://food6.layoutwebdemo.com/',
            tags: 'e-commerce'
        },
        {
            id: 6,
            title: { vi: 'Website cơ điện', en: 'Electrical & Mechanical Website' },
            description: { vi: 'Website bán hàng kết hợp giới thiệu doanh nghiệp – hỗ trợ đặt hàng.', en: 'E-commerce and business showcase site with order support.' },
            image: `image/demo/codien.png`,
            link: 'https://satavina.vn/',
            tags: 'e-commerce branding'
        },
        {
            id: 7,
            title: { vi: 'Website spa', en: 'Spa Website' },
            description: { vi: 'Website giới thiệu spa – hỗ trợ đặt lịch và tìm kiếm dịch vụ.', en: 'Spa showcase website with booking and service search.' },
            image: `image/demo/spa.png`,
            link: 'https://spa2.layoutwebdemo.com/',
            tags: 'branding'
        },
        {
            id: 8,
            title: { vi: 'Website cơ điện v2', en: 'Electrical & Mechanical Site v2' },
            description: { vi: 'Website giới thiệu doanh nghiệp – tập trung vào thương hiệu.', en: 'Business introduction site focused on branding.' },
            image: `image/demo/codien-v2.png`,
            link: 'https://v2.satavina.vn/',
            tags: 'branding'
        },
        {
            id: 9,
            title: { vi: 'Website cách nhiệt', en: 'Insulation Product Website' },
            description: { vi: 'Website quảng bá thương hiệu sản phẩm cách nhiệt.', en: 'Brand promotion website for insulation products.' },
            image: `image/demo/cachnhiet.png`,
            link: 'https://www.vietnam-insulation.com/',
            tags: 'branding'
        },
        {
            id: 10,
            title: { vi: 'Website du lịch', en: 'Travel Company Website' },
            description: { vi: 'Website giới thiệu dịch vụ công ty du lịch hỗ trợ book dịch vụ.', en: 'Travel company site with service booking support.' },
            image: `image/demo/dulich.png`,
            link: 'https://dulich8.layoutwebdemo.com/',
            tags: 'branding'
        },
        {
            id: 11,
            title: { vi: 'Website kiến trúc', en: 'Architecture Website' },
            description: { vi: 'Website giới thiệu dịch vụ công ty kiến trúc.', en: 'Architecture firm website with service showcase.' },
            image: `image/demo/kientruc.png`,
            link: 'https://kientruc6.layoutwebdemo.com/',
            tags: 'branding'
        },
        {
            id: 12,
            title: { vi: 'Website trường học', en: 'School Website' },
            description: { vi: 'Website giới thiệu dịch vụ trường học và đội ngũ giáo viên.', en: 'School introduction website presenting services and teaching staff.' },
            image: `image/demo/truonghoc.png`,
            link: 'https://school1.layoutwebdemo.com/',
            tags: 'branding'
        },
        {
            id: 13,
            title: { vi: 'Website B2B nón bảo hiểm', en: 'B2B Helmet Website' },
            description: { vi: 'Website giới thiệu dịch vụ công ty và bán hàng.', en: 'Company showcase and sales website for B2B helmet business.' },
            image: `image/demo/b2b.png`,
            link: 'https://mubaohiemasia.com/',
            tags: 'e-commerce branding'
        },
        {
            id: 14,
            title: { vi: 'Website AsiaHelmet', en: 'AsiaHelmet Website' },
            description: { vi: 'Phát triển website bán hàng – đầy đủ chức năng mua hàng và quản lý đơn hàng.', en: 'Built an e-commerce website with full purchase and order management.' },
            image: `image/demo/asia.png`,
            link: 'https://asiahelmet.com/',
            tags: 'e-commerce branding'
        },
        {
            id: 15,
            title: { vi: 'Website tin tức', en: 'News Website' },
            description: { vi: 'Website đăng bài viết về làm đẹp', en: 'News website posting beauty articles.' },
            image: `image/demo/tintuc.png`,
            link: 'https://tintuc2.layoutwebdemo.com/',
            tags: 'blog'
        },
        {
            id: 16,
            title: { vi: 'Website chợ thuốc sỉ', en: 'Wholesale Pharmacy Website' },
            description: { vi: 'Website bán sản phẩm thuốc đầy đủ chức năng mua hàng quản lý đơn hàng đăng nhập xem giá sản phẩm', en: 'Online pharmacy with full purchase, order management, login, and price viewing.' },
            image: `image/demo/chothuocsi.png`,
            link: 'https://chothuocsi.layoutwebdemo.com/',
            tags: 'e-commerce'
        },
        {
            id: 17,
            title: `Website shop đồ trẻ em`,
            description: `Website bán sản phẩm đồ trẻ em đầy đủ chức năng mua hàng quản lý đơn hàng`,
            image: `image/demo/shopdotreem.png`,
            link: 'https://shopdotreem.layoutwebdemo.com/',
            tags: 'e-commerce'
        },
         {
            id: 18,
            title: { vi: 'Website bán yến sâm', en: 'Ginseng Bird’s Nest Website' },
            description: { vi: 'Website bán sản phẩm yến sâm đầy đủ chức năng mua hàng quản lý đơn hàng', en: 'E-commerce site selling ginseng bird’s nest with full order management.' },
            image: `image/demo/yensam.png`,
            link: 'https://yensam.layoutwebdemo.com/',
            tags: 'e-commerce'
        },
         {
            id: 19,
            title: { vi: 'Website kiến trúc', en: 'Architecture Blog Website' },
            description: { vi: 'Website chia sẽ thông tin kiến thức về dịch vụ thi công nội thất', en: 'Blog sharing knowledge about interior construction services.' },
            image: `image/demo/kientrucxinh.png`,
            link: 'http://kientrucxinh.layoutwebdemo.com/',
            tags: 'blog'
        },
         {
            id: 20,
            title: { vi: 'Website review món ăn', en: 'Food Review Website' },
            description: { vi: 'Website chia sẽ thông tin kiến thức về các địa điểm ăn uống', en: 'Website sharing information and reviews about dining places.' },
            image: `image/demo/reviewmonngon.png`,
            link: 'https://reviewmonngon.com/',
            tags: 'blog'
        },
        {
            id: 21,
            title: { vi: 'Website dịch vụ SEO', en: 'SEO Services Website' },
            description: { vi: 'Website giới thiệu và cung cấp dịch vụ SEO', en: 'Website presenting and offering SEO services.' },
            image: `image/demo/tangdiemdomain.png`,
            link: 'https://tangdiemdomain.com/',
            tags: 'e-commerce blog'
        },
        {
            id: 22,
            title: { vi: 'Website thuê xe', en: 'Car Rental Website' },
            description: { vi: 'Website giới thiệu và cung cấp dịch vụ thuê xe', en: 'Website showcasing and providing car rental services.' },
            image: `image/demo/asialimousine.png`,
            link: 'https://asialimousine.vn/',
            tags: 'e-commerce blog'
        },
    ];



    const renderProjects = (projectsToRender, isInitialLoad = false) => {
        if (!projectsContainer) return;

        if (!isInitialLoad && projectsContainer.children.length > 0) {
            gsap.to(Array.from(projectsContainer.children), {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    projectsContainer.innerHTML = '';
                    currentDisplayedProjects = 0;
                    appendProjects(projectsToRender);
                }
            });
        } else {
            projectsContainer.innerHTML = '';
            currentDisplayedProjects = 0;
            appendProjects(projectsToRender);
        }
    };


    const appendProjects = (projects) => {
        if (!projectsContainer) return;

        const previousCount = projectsContainer.children.length;

        projects.forEach(project => {
            const currentLang = document.documentElement.lang || 'vi';
        const projectTitle = typeof project.title === 'object'
            ? project.title[currentLang] || project.title.vi
            : project.title;
        const projectDescription = typeof project.description === 'object'
            ? project.description[currentLang] || project.description.vi
            : project.description;
        const projectViewText = translations[currentLang].project_view_details;

        const projectHtml = `
            <div class="project-item" data-tags="${project.tags}">
                <img src="${project.image}" alt="${projectTitle}">
                <div class="project-info">
                    <h3>${projectTitle}</h3>
                    <p>${projectDescription}</p>
                    <a href="${project.link}" target="_blank" class="project-link">
                        <i class="fas fa-external-link"></i>
                        <span>${projectViewText}</span>
                    </a>
                </div>
            </div>
        `;
            projectsContainer.insertAdjacentHTML('beforeend', projectHtml);
        });

        const newlyAddedItems = Array.from(projectsContainer.children).slice(previousCount);

        if (newlyAddedItems.length > 0) {
            gsap.fromTo(newlyAddedItems,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: newlyAddedItems[0] || projectsContainer,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        currentDisplayedProjects += projects.length;
        updateLoadMoreButton();
    };

 
    const updateLoadMoreButton = () => {
        if (!loadMoreButton) return;

        if (currentDisplayedProjects < filteredProjectsData.length) {
            loadMoreButton.style.display = 'inline-flex';
            gsap.fromTo(loadMoreButton,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
            loadMoreButton.classList.remove('loading');
        } else {
            gsap.to(loadMoreButton, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                onComplete: () => loadMoreButton.style.display = 'none'
            });
        }
    };


    const loadMoreProjects = () => {
        if (!loadMoreButton || loadMoreButton.classList.contains('loading')) return;

        loadMoreButton.classList.add('loading');

        setTimeout(() => {
            const nextBatch = filteredProjectsData.slice(currentDisplayedProjects, currentDisplayedProjects + projectsPerPage);
            appendProjects(nextBatch);
            loadMoreButton.classList.remove('loading');
        }, 800);
    };

 
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            filteredProjectsData = allProjectsData.filter(project => {
                if (filter === 'all') return true;
                return project.tags.split(' ').includes(filter);
            });

            renderProjects(filteredProjectsData.slice(0, projectsPerPage), false);
        });
    });


    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreProjects);
    }


    filteredProjectsData = [...allProjectsData];
    renderProjects(filteredProjectsData.slice(0, projectsPerPage), true);

});

