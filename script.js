document.addEventListener('DOMContentLoaded', () => {
    // Đăng ký các plugin GSAP cần thiết
    gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

    // --- Chức năng Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Đảm bảo preloader biến mất sau khi toàn bộ trang tải xong
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8, // Thời gian chuyển động mờ dần
                onComplete: () => preloader.style.display = 'none' // Ẩn hoàn toàn sau khi mờ dần
            });
        });
    }

    // --- Nút "Back to Top" ---
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) { // Kiểm tra xem nút có tồn tại không
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống hơn 300px
                gsap.to(backToTopBtn, { opacity: 1, scale: 1, duration: 0.3, display: 'flex' });
            } else { // Ẩn nút khi cuộn lên gần đầu trang
                gsap.to(backToTopBtn, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => backToTopBtn.style.display = 'none' });
            }
        });

        backToTopBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 0.4, // Thời gian cuộn
                scrollTo: { y: 0, autoKill: false }, // Cuộn lên đầu trang
                ease: "power2.inOut" // Kiểu chuyển động
            });
        });
    }

    // --- Header, Điều hướng & Menu Hamburger ---
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.nav-links'); // Container của các liên kết điều hướng

    window.addEventListener('scroll', () => {
        // Header dính (sticky header)
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        // Đánh dấu liên kết điều hướng đang hoạt động
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerOffset = header ? header.offsetHeight : 0;
            // Điều chỉnh offset để liên kết active sớm hơn một chút khi cuộn
            if (scrollY >= sectionTop - headerOffset - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Kiểm tra cả 'data-section' và 'href' để đảm bảo tính linh hoạt
            if (link.getAttribute('data-section') === currentSectionId || link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // Xử lý sự kiện click vào các liên kết điều hướng (cuộn mượt)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ 'a'
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) { // Đảm bảo phần tử mục tiêu tồn tại
                const headerOffset = header ? header.offsetHeight : 0;
                const offsetTop = targetSection.offsetTop - headerOffset;

                gsap.to(window, {
                    duration: 0.4,
                    scrollTo: {
                        y: offsetTop,
                        autoKill: false // Không tự động dừng cuộn khi có tương tác khác
                    },
                    ease: "power2.inOut"
                });
            }

            // Đóng menu di động nếu đang mở sau khi nhấp vào liên kết
            if (hamburger && navbar && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Chức năng bật/tắt Menu Hamburger
    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // --- Các Animation GSAP kích hoạt bởi cuộn ---

    // Animation cho phần Hero
    gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });
    gsap.to(".typewriter-text", {
        text: "Một nhà thiết kế website chuyên nghiệp, biến ý tưởng thành trải nghiệm người dùng tuyệt vời.",
        duration: 2.5,
        delay: 1.2,
        ease: "none" // Hiệu ứng gõ chữ
    });
    gsap.from(".cta-button", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 3
    });
    gsap.to(".hero-background-parallax", {
        yPercent: 30, // Di chuyển 30% theo trục Y khi cuộn
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true // Cuộn mượt mà theo vị trí cuộn
        }
    });

    // Animation cho tiêu đề các phần chung
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%", // Kích hoạt khi tiêu đề vào 80% màn hình từ trên xuống
                toggleActions: "play none none reverse" // Phát khi vào, đảo ngược khi ra
            }
        });
    });

    // Animation cho phần About
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
        stagger: 0.2, // Hiệu ứng xuất hiện lần lượt
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });

    // Animation cho phần Skills
    gsap.utils.toArray(".skill-item").forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)", // Hiệu ứng nảy nhẹ
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animation cho phần Contact
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

    // --- Lọc và Tải thêm Dự án (Portfolio) ---
const filterButtons = document.querySelectorAll('.filter-button');
const projectsContainer = document.querySelector('.projects-grid');
const loadMoreButton = document.getElementById('loadMoreProjects');
const projectsPerPage = 6;
let currentDisplayedProjects = 0;
let filteredProjectsData = [];

const allProjectsData = [
     {
            id: 1,
            title: `Website máy móc`,
            description: `Phát triển website bán hàng đầy đủ chức năng mua hàng thanh toán và quản lý đơn hàng`,
            image: `image/demo/maymoc.png`,
            link: 'https://maymochoanglong.vn/',
            tags: 'web-design e-commerce'
        },
        {
            id: 2,
            title: `Website spa`,
            description: `Phát triển website quảng bá thương hiệu đầy đủ chức năng đặt lịch và tìm kiếm dịch vụ.`,
            image: `image/demo/spa.png`,
            link: 'https://spa2.layoutwebdemo.com/',
            tags: 'web-design branding'
        },
        {
            id: 3,
            title: `Website thực phẩm`,
            description: `Phát triển website bán hàng đầy đủ chức năng mua hàng thanh toán và quản lý đơn hàng`,
            image: `image/demo/thucpham.png`,
            link: 'https://food16.layoutwebdemo.com/',
            tags: 'web-design e-commerce'
        },
        {
            id: 4,
            title: `Website gỗ nhựa`,
            description: `Phát triển website bán hàng đầy đủ chức năng mua hàng thanh toán và quản lý đơn hàng`,
            image: `image/demo/gonhua.png`,
            link: 'https://gonhua.layoutwebdemo.com/',
            tags: 'web-design branding e-commerce'
        },
        {
            id: 5,
            title: `Website bánh mì`,
            description: `Phát triển website bán hàng đầy đủ chức năng mua hàng thanh toán và quản lý đơn hàng`,
            image: `image/demo/banhmi.png`,
            link: 'https://food6.layoutwebdemo.com/',
            tags: 'web-design e-commerce'
        },
        {
            id: 6,
            title: `Website cơ điện`,
            description: `Phát triển website bán hàng đầy đủ chức năng mua hàng thanh toán và quản lý đơn hàng`,
            image: `image/demo/codien.png`,
            link: 'https://satavina.vn/',
            tags: 'web-design branding e-commerce'
        },
        {
            id: 7,
            title: `Website cơ điện v2`,
            description: `Phát triển website quảng bá thương hiệu `,
            image: `image/demo/codien-v2.png`,
            link: 'https://v2.satavina.vn/',
            tags: 'web-design branding'
        },
        {
            id: 8,
            title: `Website cách nhiệt`,
            description: `Phát triển website quảng bá thương hiệu.`,
            image: `image/demo/cachnhiet.png`,
            link: 'https://www.vietnam-insulation.com/',
            tags: 'web-design branding'
        },
];

// Hàm render các dự án
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

// Hàm thêm và animate các dự án
const appendProjects = (projects) => {
    if (!projectsContainer) return;

    const previousCount = projectsContainer.children.length;

    projects.forEach(project => {
        const projectHtml = `
            <div class="project-item" data-tags="${project.tags}">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-link">
                        <i data-tabler-icon="external-link"></i> Xem chi tiết
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

// Cập nhật nút Load More
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

// Load thêm dự án
const loadMoreProjects = () => {
    if (!loadMoreButton || loadMoreButton.classList.contains('loading')) return;

    loadMoreButton.classList.add('loading');

    setTimeout(() => {
        const nextBatch = filteredProjectsData.slice(currentDisplayedProjects, currentDisplayedProjects + projectsPerPage);
        appendProjects(nextBatch);
        loadMoreButton.classList.remove('loading');
    }, 800);
};

// Xử lý filter dự án
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

// Sự kiện Load More
if (loadMoreButton) {
    loadMoreButton.addEventListener('click', loadMoreProjects);
}

// Khởi tạo ban đầu
filteredProjectsData = [...allProjectsData];
renderProjects(filteredProjectsData.slice(0, projectsPerPage), true);

});