const params = new URLSearchParams(location.search);
let page = window.location.hash.substr(1);
if (page === '') page = 'home';
getScheduled();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    requestServiceWorkers();
    requestPermission();
  });
} else {
  console.log('ServiceWorker belum didukung browser ini.');
}

const requestServiceWorkers = () => {
  return navigator.serviceWorker
      .register('/sw.js')
      .then(function() {
        console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function() {
        console.log('Pendaftaran ServiceWorker gagal');
      });
};

loadNav().then((res) => {
  $('.topnav, .sidenav').append(res);
  $(`a[href="#${page}"]`).parent().addClass('active');
  $('.topnav li a, .sidenav li a').click(function() {
    $('li').removeClass('active');
    $(this).parent().addClass('active');
    $('.sidenav').sidenav('close');
    page = $(this).attr('href').substr(1);
    if (page == '') page = 'home';
    loadPage(page);
  });
});

// materialize
$('.sidenav').sidenav();
$('.materialboxed').materialbox();
