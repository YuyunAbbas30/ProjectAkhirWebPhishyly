// HOME SPLIT TEXT
const { animate, splitText, stagger } = anime;

const { chars: chars1 } = splitText('.home__profession-1', {chars: true });
const { chars: chars2 } = splitText('.home__profession-2', {chars: true });

const openBtn = document.querySelector("#open-popup");
const closeBtn = document.querySelector(".close-btn");



document.addEventListener("DOMContentLoaded", () => {
    const popupTitle = document.querySelector(".h2_popup");
    const popupText = document.querySelector(".text_popup");
    const closeBtn = document.querySelector(".close-btn");

    // Database Materi untuk tiap Card
   const projectData = [
        {
            title: "Ancaman di Balik Tautan Palsu",
            desc: `<p>Phishing merupakan bentuk kejahatan siber yang paling umum terjadi, di mana pelaku menggunakan teknik rekayasa sosial untuk mencuri identitas penting Anda. Penipuan ini bekerja dengan cara memanipulasi psikologis korban melalui pesan-pesan yang dirancang sedemikian rupa agar terlihat berasal dari institusi terpercaya. Fokus utama serangan ini adalah mendapatkan kredensial login, nomor kartu kredit, hingga data pribadi lainnya dengan mengarahkan korban ke sebuah situs palsu yang secara visual sangat identik dengan situs aslinya. Memahami cara kerja phishing adalah langkah awal yang paling krusial untuk melindungi diri di dunia digital yang semakin kompleks.</p>`
        },
        {
            title: "Membedah Anatomi URL Berbahaya",
            desc: `<p>Ketelitian dalam membaca alamat situs adalah kunci utama pertahanan Anda. Link phishing sering kali menyembunyikan identitas aslinya dengan menggunakan struktur URL yang rumit, seperti penambahan subdomain yang menyesatkan atau penggunaan karakter yang hampir mirip (misalnya mengganti huruf 'o' dengan angka '0'). Selain itu, pelaku sering memanfaatkan layanan pemendek tautan (URL shortener) atau menggunakan Top-Level Domain (TLD) yang tidak lazim dan murah seperti .top, .xyz, atau .biz. Dengan mengenali ciri-ciri teknis ini, Anda dapat mendeteksi ketidakwajaran sebuah tautan sebelum sempat berinteraksi dengan konten berbahaya di dalamnya.</p>`
        },
        {
            title: "Langkah Verifikasi Mandiri yang Tepat",
            desc: `<p>Keamanan data dimulai dengan kebiasaan untuk tidak terburu-buru melakukan klik pada setiap tautan yang diterima. Protokol keamanan yang paling efektif adalah dengan selalu memverifikasi sumber pengirim pesan dan memeriksa keberadaan sertifikat SSL (HTTPS) pada situs yang dikunjungi. Namun, perlu diingat bahwa situs phishing modern pun kini sudah banyak yang menggunakan HTTPS. Oleh karena itu, cara paling aman adalah dengan mengakses alamat situs resmi secara manual melalui mesin pencari atau bookmark pribadi Anda, daripada mengikuti tautan yang dikirimkan melalui pesan singkat, email, atau aplikasi pesan instan yang tidak jelas asal-usulnya.</p>`
        },
        {
            title: "Keunggulan Analisis Algoritma Cerdas",
            desc: `<p>Berbeda dengan sistem keamanan tradisional yang hanya mengandalkan daftar hitam (blacklist)—yang sering kali terlambat mendeteksi ancaman baru—sistem deteksi berbasis AI bekerja secara proaktif dan dinamis. Teknologi Machine Learning yang digunakan dalam sistem ini mampu mengekstraksi dan menganalisis puluhan fitur leksikal dari sebuah URL secara otomatis dan real-time. Dengan membedah pola-pola unik dan struktur teknis dari jutaan data yang telah dipelajari sebelumnya, algoritma cerdas ini sanggup memberikan penilaian risiko yang sangat akurat, bahkan terhadap link phishing yang baru saja dibuat oleh pelaku beberapa detik yang lalu.</p>`
        },
        {
            title: "Tindakan Darurat Penyelamatan Akun",
            desc: `<p>Jika Anda menyadari telah mengklik link mencurigakan atau bahkan sempat memasukkan data pribadi, langkah pertama yang harus dilakukan adalah tetap tenang namun bertindak cepat. Segera putus koneksi internet pada perangkat Anda untuk menghentikan pengiriman data secara ilegal ke server pelaku. Langkah selanjutnya adalah segera mengganti seluruh kata sandi akun Anda melalui perangkat lain yang dipastikan aman. Pastikan untuk selalu mengaktifkan fitur Autentikasi Dua Faktor (2FA) sebagai lapisan perlindungan ekstra, serta lakukan pemantauan berkala terhadap log aktivitas login untuk memastikan tidak ada akses asing yang mencoba masuk ke dalam akun pribadi Anda.</p>`
        },
        {
            title: "Dampak Fatal Kebocoran Identitas Digital",
            desc: `<p>Keberhasilan serangan phishing dapat memicu rantai kerugian yang sangat panjang bagi korbannya. Data pribadi yang berhasil dicuri tidak hanya digunakan untuk menguras saldo rekening secara langsung, tetapi juga sering diperjualbelikan di pasar gelap siber untuk kepentingan kriminal lainnya. Identitas Anda bisa disalahgunakan untuk pendaftaran pinjaman online ilegal, penipuan terhadap orang-orang di daftar kontak Anda, hingga eksploitasi identitas digital yang dapat merusak kredibilitas sosial dan stabilitas finansial Anda dalam jangka waktu yang lama. Melindungi data Anda adalah investasi terpenting untuk menjaga privasi dan keamanan di masa depan.</p>`
        }
    ];

    // Klik tombol pada Card
    document.querySelectorAll(".open-popup").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const index = btn.getAttribute("data-index");
            const data = projectData[index];

            if (data) {
                // Isi materi ke popup
                popupTitle.innerHTML = data.title;
                popupText.innerHTML = data.desc;
                
                // Aktifkan class popup (sesuai CSS-mu)
                document.body.classList.add("active-popup");
            }
        });
    });

    // Tutup Popup
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.body.classList.remove("active-popup");
        });
    }

    // 3. LOGIKA POPOVER (PINDAHKAN KE SINI)
    const popoverBtn = document.getElementById("popoverBtn");
    const popover = document.getElementById("popover");

    if (popoverBtn && popover) {
        popoverBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isVisible = popover.style.display === "block";
            popover.style.display = isVisible ? "none" : "block";
        });

        // Agar popover tertutup saat klik di mana saja
        document.addEventListener("click", () => {
            popover.style.display = "none";
        });

        // Cegah popover tertutup saat bagian dalam popover diklik
        popover.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }
});

animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});
animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});

// const btn = document.getElementById("popoverBtn");
// const popover = document.getElementById("popover");

// btn.addEventListener("click", (e) => {
//   e.stopPropagation();
//   popover.style.display =
//   popover.style.display === "block" ? "none" : "block";
// });

// document.addEventListener("click", () => {
//   popover.style.display = "none";
// });


// SWIPER PROJECTS
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,

  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});

// GSAP ANIMATION
gsap.defaults({opacity: 0, ease: 'power4.out', duration: 1.4})

const tl = gsap.timeline()
const splitTitle = new SplitText('.homee__title', { type: 'chars' })

tl.from('.homee__box',{duration: .2}, '.3')
  .from('.homee__bg',{scale: .5}, '.6')
  .from('.nav > *',{y: -30}, '1.5')
  .from('.homee__icon',{y: 90}, '1.8')

// WORK TABS
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector)

    // Disable all content and active tabs
    tabContents.forEach((content) => content.classList.remove('work-active'))
    tabs.forEach((t) => t.classList.remove('work-active'))

    // Active the tab and corresponding content
    tab.classList.add('work-active')
    targetContent.classList.add('work-active')
  })
})


// SERVICES ACCORDION
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button => {
  // Add your height to services info
  const heightInfo = document.querySelector('.services__info')
  heightInfo.style.height = heightInfo.scrollHeight + 'px'
  
  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.parentNode,
          currentInfo = currentCard.querySelector('.services__info'),
          isCardOpen = currentCard.classList.contains('services-open')

    // Close all other services info
    servicesCards.forEach(card => {
      card.classList.replace('services-open', 'services-close')

      const info = card.querySelector('.services__info')
            info.computedStyleMap.height = '0'
    })

    // Open only if not already open
    if(!isCardOpen){
      currentCard.classList.replace('services-close', 'services-open')
      currentInfo.computedStyleMap.height = currentInfo.scrollHeight + 'px'
    }
  })
})

// TESTIMONIALS OF DUPLICATE CARDS
// Duplicate image to make the animation work
const tracks = document.querySelectorAll('.testimonials__content')

tracks.forEach(track => {
  const cards = [...track.children] //spread to make a static copy

  // Duplicate cards only once
  for (const card of cards) {
    track.appendChild(card.cloneNode(true))
  }
})


// CURRENT YEAR OF THE FOOTER
const textYear = document.getElementById('footer-year')
      currentYear = new Date().getFullYear()

// Each year it is update to the current year
textYear.textContent = currentYear


// SCROLL SECTION ACTIVE LINK
// const sections = document.querySelectorAll('section[id]')

// const scrollActive = () => {
//   // We get the position by scrolling down
//   const scrollY = window.scrollY
//   sections.forEach(section => {
//     const id = section.id //id of each section
//           top = section.offsetTop - 50 //Distance from the top edge
//           height = section.offsetHeight //Element height
//           link = document.querySelector('.nav__menu a[href*=' + id + ']') //id nav link

//     if(!link) return

//     link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
//   })
// }
// window.addEventListener('scroll', scrollActive)
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id
    const top = section.offsetTop - 50
    const height = section.offsetHeight
    const link = document.querySelector('.nav__menu a[href*="' + id + '"]')

    if (!link) return

    link.classList.toggle(
      'active-link',
      scrollY > top && scrollY <= top + height
    )
  })
}

window.addEventListener('scroll', scrollActive)


// CUSTOM SURSOR
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 // Store mpuse position

const cursorMove = () => {
  //Position the cursor
  cursor.style.left  = `${mouseX}px`
  cursor.style.top  = `${mouseY}px`
  cursor.style.transform  = 'translate(-50%, -50%)'

  //Update the cursor animation
  requestAnimationFrame(cursorMove)

}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

cursorMove()

// Hide Custom Cursor On Links //
const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor')
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor')
  })
})

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("mouseenter", () => {
  cursor.classList.add("hide-cursor");
});

searchButton.addEventListener("mouseleave", () => {
  cursor.classList.remove("hide-cursor");
});

//  SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
  // reset: true, //animation repeat
})

sr.reveal(`.home__image, .projects__container, .work__container,
            .testimonials__container, .contact__container`)
sr.reveal(`.home__data`, {delay: 900, origin:'bottom'})
sr.reveal(`.home__info`, {delay: 1200, origin:'bottom'})
sr.reveal(`.home__social, .home__cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})


// SEACRH BAR JS

const toggleSearch = (search, button) =>{
  const searchBar = document.getElementById(search),
        searchButton = document.getElementById(button)

  searchButton.addEventListener('click', () =>{
    searchBar.classList.toggle('show-search')
  })
}

toggleSearch('search-bar','search-button')





