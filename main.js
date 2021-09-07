const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd');
const audio = $('#audio')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const progressed = $('.progressed')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    songs : [
        {
          name: "Mean It",
          singer: "Lauv x Lany",
          path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui992/MeanIt-LauvLany-6136311.mp3?st=XxGoWVjJLqNmF1amJsnfnw&e=1630318298",
          image: "https://static.tagthelove.com/cms/423_79095db0ec6b0adb_1920box.jpg"
        },
        {
          name: "Stay",
          singer: "JB x TKL",
          path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=jXwet7BFBcnw115nbSpZOQ&e=1630319054",
          image:
            "https://i1.sndcdn.com/artworks-slxw7HmMgF28pJzU-mCe61A-t500x500.jpg"
        },
        {
          name: "Blue",
          singer: "Keshi",
          path: "https://c1-ex-swe.nixcdn.com/Unv_Audio159/Blue-keshi-6197825.mp3?st=H6hYzr_0kFN9ngdoTlc6EQ&e=1630429796",
          image:
            "https://newmusicspace.com/wp-content/uploads/2020/04/bc358f7969f90d72bb5d0a6d7036008b.504x504x1.jpg"
        },
        {
            name: "Somebody Else",
            singer: "The 1975",
            path: "https://c1-ex-swe.nixcdn.com/Unv_Audio51/SomebodyElse-The1975-4339233.mp3?st=2tMuptkIcH_BiiJ3eeCVNQ&e=1630430441",
            image: "https://dancingastronaut.com/wp-content/uploads/2016/11/EMBRZ1975_v6-1-1-1.jpeg"
        },
        {
            name: "Payphone",
            singer: "Maroon 5",
            path: "https://c1-ex-swe.nixcdn.com/Unv_Audio39/Payphone-Maroon5WizKhalifa-3630577.mp3?st=SgmWvrCQi9jU5bua2d9Slg&e=1630429946",
            image: "https://i1.sndcdn.com/artworks-000116410772-54c75j-t500x500.jpg"
        },
        {
            name: "Young dump and broke",
            singer: "Khalid",
            path: "https://c1-ex-swe.nixcdn.com/Unv_Audio114/YoungDumbBroke-Khalid-5684218.mp3?st=SI053_6KoMeTVfnfV6YH3A&e=1630430150",
            image: "https://upload.wikimedia.org/wikipedia/en/4/43/Khalid_-_Young_Dumb_%26_Broke_%28Remix%29.png"
        },
        {
            name: "Make you feel my love",
            singer: "Adele",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui940/MakeYouFeelMyLove-SleepingAtLast-4860544.mp3?st=239qovZTWr0_6zXUbikaoA&e=1630553293",
            image: "https://images.eil.com/large_image/ADELE_MAKE%2BYOU%2BFEEL%2BMY%2BLOVE-450548b.jpg"
        },
        {
            name: "Dusk till dawn",
            singer: "Zayn x Sia",
            path: "https://c1-ex-swe.nixcdn.com/Sony_Audio37/DuskTillDawn-ZaynSia-5164057.mp3?st=WG630CXqFm6NKn_t3ETtkw&e=1630427214",
            image: "https://i1.sndcdn.com/artworks-000319118346-qe8tao-t500x500.jpg"
        },
        {
            name: "Cheating on you",
            singer: "Charlie Puth",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui990/CheatingOnYou-CharliePuth-6102890.mp3?st=Ri_-Pi59pjNcACNWnLD4WQ&e=1630430224",
            image: "https://i1.sndcdn.com/artworks-000606602386-58veao-t500x500.jpg"
        },
    ],
    render: function() {
        const playlistHtml = this.songs.map((song,index) => {
            const isActive = this.currentIndex === index;
            return `
                <div class="song ${isActive ? 'active':''}" data-index=${index}>
                    <div 
                        class="thumb" 
                        style="background-image: url(${song.image})"
                    ></div>
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
        playlist.innerHTML = playlistHtml.join('')
        this.scrollIntoSong()
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý sự kiện phóng to/thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth < 0 ? 0:newCdWidth + 'px' ;
            cd.style.opacity = newCdWidth/cdWidth;
        }
        

        
        // Sự kiện CD Thumb quay
        const cdThumbAnimation = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 30000,  //10s
            iterations: Infinity
        })
        cdThumbAnimation.pause()
        
        //Xử lý sự kiện phát/dừng nhạc
        playBtn.onclick = function (){
            if (_this.isPlaying) {
                audio.pause();
            }else {
                audio.play();
            }
        }

        //Khi nhạc được phát
        audio.onplay = function (){
            _this.isPlaying = true;
            cdThumbAnimation.play();
            heading.classList.add('slide-text');
            player.classList.add('playing');
        }

        //Khi dừng nhạc
        audio.onpause = function (){
            _this.isPlaying = false;
            cdThumbAnimation.pause();
            heading.classList.remove('slide-text');
            player.classList.remove('playing');
        }

        //Khi bài hát đang chạy 
        audio.ontimeupdate = function (){
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progressed.style.width = progressPercent + '%';
            }
        }

        //Xử lý sự kiện khi ấn tua
        progress.onclick = function (e){
            if(audio.duration) {
                audio.currentTime = (e.offsetX/progress.offsetWidth) * audio.duration;
            }
        }

        //Nhất nút next
        nextBtn.onclick = function() {
            _this.nextSong()
            _this.render()
            audio.play()
        }

        //Nhấn nút previous
        prevBtn.onclick = function() {
            _this.prevSong()
            _this.render()
            audio.play()
        }

        //Khi bài hát kết thúc
        audio.onended = function() {
            if (_this.isRepeat) {
                _this.loadCurrentSong()
            }else if (_this.isRandom) {
                _this.randomSong()   
            }else {
                _this.nextSong()
            }
            _this.render()
            audio.play()
        }

        //Khi ấn nút random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            if (_this.isRandom && _this.isRepeat) {
                _this.isRepeat = false
                repeatBtn.classList.remove('active')   
            }
            randomBtn.classList.toggle('active')
        }

        //Khi ấn nút repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            if (_this.isRepeat && _this.isRandom) {
                _this.isRandom = false
                randomBtn.classList.remove('active')
            }
            repeatBtn.classList.toggle('active')
        }

        //Khi chọn bài hát
        playlist.onclick = function(e) {
            const songSelected = e.target.closest('.song:not(.active)');
            const option = e.target.closest('.option')
            if (songSelected || option) {
                if (songSelected) {
                    _this.currentIndex = Number(songSelected.getAttribute('data-index'));
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }
    },
    loadCurrentSong: function() {
        const totalLength = this.currentSong.name.length + this.currentSong.singer.length;
        let headingText = this.currentSong.name;
        if (totalLength <= 18) {
            headingText = `${this.currentSong.name} - ${this.currentSong.singer}`;
        }
        heading.textContent = headingText;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path  
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;  
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        let randomIndex = Math.round(Math.random() * (this.songs.length - 1))
        while (randomIndex === this.currentIndex) {
            randomIndex = Math.round(Math.random() * (this.songs.length - 1))
        }
        this.currentIndex = randomIndex
        this.loadCurrentSong()
    },
    scrollIntoSong: function() {
        const activeSong = $('.song.active');
        if (activeSong) {
            position = this.currentIndex < 3 ? 'end': 'center';
            setTimeout(()=>{
                activeSong.scrollIntoView({
                    behavior: 'smooth',
                    block: position
                })
            },200)
        } 
    },
    start: function() {
        this.defineProperties()
        this.handleEvent()

        this.loadCurrentSong()
        this.render()
    }
}

app.start()

