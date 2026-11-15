'use strict';
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
const narrow = window.matchMedia('(max-width: 800px)');
function closeMenu() { menu.hidden = narrow.matches; toggle.setAttribute('aria-expanded', 'false'); }
toggle.hidden = false;
closeMenu();
narrow.addEventListener('change', closeMenu);
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); menu.hidden = !open; });
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && narrow.matches && !menu.hidden) { closeMenu(); toggle.focus(); } });
const form = document.querySelector('#interest-form');
const draft = document.querySelector('#draft');
const status = document.querySelector('#status');
form.addEventListener('submit', event => {
  event.preventDefault();
  const interest = document.querySelector('#interest').value;
  const message = document.querySelector('#message').value.trim();
  draft.value = `Xin chào, tôi quan tâm đến ${interest} trong dự án minh họa Lâm An.${message ? '\n' + message : ''}\nTôi muốn tìm hiểu thêm khi có thông tin chính thức.`;
  document.querySelector('#draft-area').hidden = false;
  status.textContent = 'Đã soạn lời nhắn trên thiết bị. Nội dung chưa được gửi đến bên nào.';
  draft.focus();
});
document.querySelector('#copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(draft.value); status.textContent = 'Đã sao chép. Bạn có thể dán vào kênh liên hệ chính thức khi được công bố.'; }
  catch { draft.focus(); draft.select(); status.textContent = 'Hãy dùng Ctrl+C hoặc thao tác sao chép của thiết bị để sao chép nội dung đã chọn.'; }
});
