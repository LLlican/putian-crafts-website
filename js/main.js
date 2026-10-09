// 莆田工艺品网站 - 自定义脚本
document.addEventListener('DOMContentLoaded', function() {
    // 1. 导航栏滚动效果
    const navbar = document.querySelector('.custom-navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);

    // 2. 产品筛选功能
    const filterButtons = document.querySelectorAll('[data-filter]');
    const productItems = document.querySelectorAll('.product-item');
    if (filterButtons.length > 0 && productItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active-filter');
                    btn.classList.add('btn-outline-brown');
                });
                this.classList.add('active-filter');
                this.classList.remove('btn-outline-brown');
                const filter = this.dataset.filter;
                productItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 3. 产品详情模态框
    const productData = {
        mazu: {
            name: '天上圣母 · 妈祖造像',
            category: '龙眼木圆雕 · 木雕精品',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            description: '由国家级非遗项目莆田木雕省级代表性传承人林青大师创作。妈祖造像神态慈祥庄严，衣纹流畅自然，展现妈祖信俗文化精髓。',
            features: ['龙眼木整料圆雕，无拼接', '神态刻画细腻，慈祥庄严', '衣纹皱褶自然流畅', '妈祖信俗文化代表作']
        },
        qingming: {
            name: '清明上河图 · 长卷木雕',
            category: '精微透雕 · 吉尼斯世界纪录',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
            description: '郑春辉团队创作的吉尼斯世界纪录世界上最长的木雕。采用精微透雕技法，层次分明，精细绝伦。',
            features: ['吉尼斯世界纪录认证', '精微透雕技法，多层立体', '人物建筑数以千计', '莆田木雕里程碑式作品']
        },
        canal: {
            name: '京杭大运河 · 景观雕刻',
            category: '多层透雕 · 大型景观雕',
            image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800',
            description: '郑春辉团队继清明上河图后的又一鸿篇巨制。整块香樟木雕刻数十座古镇，多层透雕，气势恢宏。',
            features: ['整块香樟木整料雕刻', '数十座古镇景观，层次丰富', '多层透雕，空间感强', '展现运河文化历史底蕴']
        }
    };
    const viewDetailButtons = document.querySelectorAll('.view-detail');
    if (viewDetailButtons.length > 0) {
        viewDetailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.product;
                const product = productData[productId];
                if (product) {
                    document.getElementById('modalTitle').textContent = '产品详情';
                    document.getElementById('modalProductName').textContent = product.name;
                    document.getElementById('modalCategory').textContent = product.category;
                    document.getElementById('modalDescription').textContent = product.description;
                    document.getElementById('modalImage').src = product.image;
                    const featuresList = document.getElementById('modalFeatures');
                    featuresList.innerHTML = '';
                    product.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.innerHTML = '<i class="bi-check-circle me-2 text-brown"></i>' + feature;
                        featuresList.appendChild(li);
                    });
                    const modal = new bootstrap.Modal(document.getElementById('productModal'));
                    modal.show();
                }
            });
        });
    }

    // 4. 联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的留言！我们会尽快与您联系。');
            this.reset();
        });
    }

    // 5. 滚动动画效果
    const fadeElements = document.querySelectorAll('.card, .timeline-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // 6. 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});