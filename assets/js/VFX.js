function randomBackground() {
        var imgArray = Array(
            'https://gbrrrl.com/assets/theme/glitch_vfx_bg_01.gif',
            'https://gbrrrl.com/assets/theme/glitch_vfx_bg_02.gif',
            'https://gbrrrl.com/assets/theme/glitch_vfx_bg_03.gif',
            'https://gbrrrl.com/assets/theme/glitch_vfx_bg_04.gif',
            'https://gbrrrl.com/assets/theme/hypno_bg.gif',	
        );

        var bgImage = imgArray[Math.floor(Math.random() * imgArray.length)];

        var divBG = document.getElementById('bg');

        divBG.innerHTML = '<img src="' + bgImage + '" />';
    }
    window.addEventListener('load', (event) => {
        randomBackground();
    });