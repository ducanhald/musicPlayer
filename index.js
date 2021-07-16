const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')

var app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [{
            name: 'Cảm ơn',
            singer: 'Đen',
            path: './music/DenVauCamOn.mp3',
            img: './img/denvau.png',
        },
        {
            name: 'Trốn tìm',
            singer: 'Đen Vâu',
            path: './music/Trontim.mp3',
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
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this

        const cdwidth = cd.offsetWidth
            // Xử lý CD quay và Dừng
        const CdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 8000,
            iterations: Infinity
        })
        CdThumbAnimate.pause()
            //Xử lý phóng thu CD
        document.onscroll = function() {
                const scrollTop = document.documentElement.scrollTop
                const newCdWidth = cdwidth - scrollTop
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdwidth
            }
            //Xử lý khi click play
        playBtn.onclick = function() {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            }
            //Khi song được play
        audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
                CdThumbAnimate.play()
            }
            //Khi song bị pause
        audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                CdThumbAnimate.pause()
            }
            //Khi thay đổi tiến độ song
        audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }

            }
            // Xử lý tua song 
        progress.oninput = function(e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime

            }
            // Nest and Prev bài hát
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
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
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        cdThumb.style.background = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path

    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()

    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()

    },
    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()
            // Lắng nghe / xử lý các sự kiện
        this.handleEvents()
            // Load bài hát ra giao diện
        this.loadCurrentSong()
            // Render playlist
        this.render()
    }
}
app.start()