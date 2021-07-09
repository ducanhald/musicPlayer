const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = $('.playlist')
var app = {
    currentIndex: 0,
    songs: [{
            name: 'Cảm ơn',
            singer: 'Đen',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'Trốn tìm',
            singer: 'Đen Vâu',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'Hai triệu năm',
            singer: 'Đen Vâu',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'ĐEBADNG',
            singer: 'Đen Vâu',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'ABC',
            singer: 'Đen Vâu',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'ABC',
            singer: 'Đen Vâu',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'ABC',
            singer: 'Đen Vâu',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
    ],
    handleEvents: function() {
        const cd = $('.cd')
        const cdwidth = cd.offsetWidth
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdwidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdwidth
        }
    },

    render: function() {
        const html = this.songs.map((song) => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = html.join('')
    },
    start: function() {
        this.handleEvents()
        this.render()
    }
}
app.start()