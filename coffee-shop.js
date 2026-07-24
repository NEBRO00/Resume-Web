// Page navigation
const navButtons = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
function showPage(id){
  pages.forEach(p => p.classList.toggle('active', p.id === 'page-' + id));
  document.querySelectorAll('nav.links [data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === id));
  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
}
navButtons.forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Menu category tabs
const menuTabs = document.querySelectorAll('#menuTabs button');
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('#ticketGrid .ticket').forEach(t => {
      t.style.display = t.classList.contains('cat-' + cat) ? '' : 'none';
    });
  });
});
