/* Altere aqui para o seu número com DDD (ex: 5511999998888) */
const WHATSAPP = '5511948070878';

function abrirMenu() {
    document.getElementById('sidebarMenu').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function fecharMenu() {
    document.getElementById('sidebarMenu').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
    document.body.style.overflow = '';
}

function abrirOrcamento(servico) {
    const message = encodeURIComponent(`Olá, MontanhaWeb! Tenho interesse em: ${servico}. Pode me passar mais informações?`);
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, '_blank');
}

function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    const isDark = html.classList.contains('dark-mode');

    html.classList.remove('dark-mode', 'light-mode');

    if (isDark) {
        html.classList.add('light-mode');
        btn.textContent = '☀️';
        localStorage.setItem('montanhaweb-theme', 'light');
    } else {
        html.classList.add('dark-mode');
        btn.textContent = '🌙';
        localStorage.setItem('montanhaweb-theme', 'dark');
    }
}

function aplicarTemaSalvo() {
    const tema = localStorage.getItem('montanhaweb-theme');
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    if (!btn) return;

    html.classList.remove('dark-mode', 'light-mode');

    if (tema === 'light') {
        html.classList.add('light-mode');
        btn.textContent = '☀️';
    } else {
        html.classList.add('dark-mode');
        btn.textContent = '🌙';
    }
}

function marcarPaginaAtiva() {
    const pagina = document.body.dataset.page;
    if (!pagina) return;
    document.querySelectorAll('.sidebar-menu-list a').forEach(link => {
        if (link.dataset.nav === pagina) link.classList.add('active');
    });
}

function switchTab(event, tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.content-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function filterProjects(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarTemaSalvo();
    marcarPaginaAtiva();

    document.querySelectorAll('.sidebar-menu-list a').forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharMenu();
    });

    const waFloat = document.querySelector('.whatsapp-float');
    if (waFloat) waFloat.href = `https://wa.me/${WHATSAPP}`;
});
