const togleswitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const theme = {
  LIGHT: 'light',
  DARK: 'dark',
};
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === theme.DARK) {
    togleswitch.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', theme.DARK);
    localStorage.setItem('theme', theme.DARK);
  } else {
    document.documentElement.setAttribute('data-theme', theme.LIGHT);
    localStorage.setItem('theme', theme.LIGHT);
  }
}

togleswitch.addEventListener('change', switchTheme, false);
