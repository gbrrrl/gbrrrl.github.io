        // function to randomize array

        function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

        return array;
    }

        // this one goes first and does not change so it should be added at the beginning of the array after it is randomized
        // '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://hellwatermelon.tumblr.com" target="_blank">HELLWATERMELON</a></td>',

        // last does not change and should be excluded until the end
        //'<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://cor-humanum.tumblr.com" target="_blank">COR-HUMANUM</a></td>',

        // create array without the first and last value
        let columnArray = [
      
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://neumochi.tumblr.com" target="_blank">NEUMOCHI</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://nuclearharvest.tumblr.com" target="_blank">NUCLEARHARVEST</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://encoffin.tumblr.com" target="_blank">ENCOFFIN</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://westerneyez.tumblr.com" target="_blank">WESTERNEYEZ</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://cyberianpunks.tumblr.com" target="_blank">CYBERIANPUNKS</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://bienenkiste.tumblr.com" target="_blank">BIENENKISTE</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://onikaan.tumblr.com" target="_blank">ONIKAAN</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://netals.tumblr.com" target="_blank">NETALS</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://littlehorrorshop.tumblr.com" target="_blank">LITTLEHORRORSHOP</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://lunarnymph.tumblr.com" target="_blank">LUNARNYMPH</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://deathcults.tumblr.com" target="_blank">DEATHCULTS</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://malglories.tumblr.com" target="_blank">MALGLORIES</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://nod.tumblr.com" target="_blank">NOD</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://ugly-pierrot.tumblr.com" target="_blank">UGLY-PIERROT</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://theoddsideofme.tumblr.com" target="_blank">THEODDSIDEOFME</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://dreams-of-mutiny.tumblr.com" target="_blank">DREAMS-OF-MUTINY</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://splinter.tumblr.com" target="_blank">SPLINTER</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://maldororlebtnoch.tumblr.com" target="_blank">MALDORORLEBTNOCH</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://oculus-de-malus.tumblr.com" target="_blank">OCULUS-DE-MALUS</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://catoptromantia.tumblr.com" target="_blank">CATOPTROMANTIA</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://ticker-tape-of-the-unconscious.tumblr.com" target="_blank">TICKER-TAPE-OF-THE-</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://hairtusk.tumblr.com" target="_blank">HAIRTUSK</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://mydeadpony.tumblr.com" target="_blank">MYDEADPONY</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://crystallcoffin.tumblr.com" target="_blank">CRYSTALLCOFFIN</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://wellof-souls.tumblr.com" target="_blank">WELLOF-SOULS</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://aleprouswitch.tumblr.com" target="_blank">ALEPROUSWITCH</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://janerra-ava.tumblr.com/" target="_blank">JANERRA-AVA</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://mirroir.tumblr.com" target="_blank">MIRROIR</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://nattasang.tumblr.com" target="_blank">NATTASANG</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://3y3.tumblr.com" target="_blank">3Y3</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://venusimleder.tumblr.com" target="_blank">VENUSIMLEDER</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://moldavite.tumblr.com" target="_blank">MOLDAVITE</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://lucifer.tumblr.com" target="_blank">LUCIFER</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://funstealer.tumblr.com" target="_blank">FUNSTEALER</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://hexafu.tumblr.com" target="_blank">HEXAFU</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://cutecave.tumblr.com" target="_blank">CUTECAVE</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://pinkblanc.tumblr.com" target="_blank">PINKBLANC</a></td>',
            '<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://solvetcoagulate.tumblr.com" target="_blank">SOLVETCOAGULATE</a></td>',


            ];

            // randomize array

            shuffle(columnArray);

            // Add to the beginning of array with unshift

            columnArray.unshift('<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://hellwatermelon.tumblr.com" target="_blank">HELLWATERMELON</a></td>');

            // add another element to beginning of array so we can start on #1
            columnArray.unshift('');

            // Add to end of the array with push
            columnArray.push('<td align="center" valign="middle" bgcolor="#FFFFFF"><a href="https://cor-humanum.tumblr.com" target="_blank">COR-HUMANUM</a></td>');

            let targetElem = document.getElementById('column-array');
            console.log(targetElem);

            let columnOutput = '';

            for(let i = 0; i < columnArray.length; i++){

                if(i % 4 === 0 && i !== 0){
                    columnOutput += columnArray[i] + '</tr><tr>';

                }else{
                    columnOutput += columnArray[i];
                }


            }


            targetElem.innerHTML = columnOutput;


    function randomBackground() {
        var imgArray = Array(
            'https://64.media.tumblr.com/7518d9701e6790be04e5443a926431c8/1c9dfcfa9f99a391-dd/s540x810/ceabf20be50de0a4f3362fcf65e7699c16ffa075.gif',
            'https://64.media.tumblr.com/193e266952809fd167745d9c3a5440d9/aa625902e3499d78-66/s540x810/ebc5d5353f1576573378dea27a4fced079aeb147.gif',
            'https://64.media.tumblr.com/aaf2d209642b8d541ce4e43c351e7288/bd8f5db2564f6e51-24/s540x810/11e681e3ff59b7d6e39ffcab49eaf1166d5261fe.gif',
            'https://64.media.tumblr.com/b3f7a6bc294679d0fd5fd5cc1daa271a/6c5925aad0ac6024-8b/s540x810/6a8405d16f83824083b3e9f3ce021c7fab95aec1.gif',
            'https://64.media.tumblr.com/d855a8da379d10d6bc28e170afb038eb/cced85c1a48abf92-b3/s540x810/06c4f1ce123840bfb29a01fb3a1451647e31355c.gif',
            'https://64.media.tumblr.com/b841d7feeb21dc14c6f1d4932af7cd15/687b857485b3517d-88/s540x810/a2745584de74d9f923100a65fc8d8f4ddc9612cc.gif',
            'https://64.media.tumblr.com/24d1a665d9a2b7d2bdc53d6869852e44/500ec3a4aa6cd7ec-f1/s540x810/a040b99874ab8f33d53e4cad40f5f5cc99e4e843.gif',
            'https://64.media.tumblr.com/e3ccfc703e6d48b4ca1f9308e590dd5b/4810efe46d3a0266-64/s540x810/5c2161a5f11af56a0f036fc35ed888d976a12838.gif',
            'https://64.media.tumblr.com/cd1264c983e21a6689e3f12c16c3c6ba/7aaed89f6eee2e01-24/s540x810/5f73372de7a228761f0dc7989cffb77dc66146ce.gif',
            'https://64.media.tumblr.com/f58cd55250691fccd2089ca7e790d4b1/ec5f5b88ced5d29d-8f/s540x810/646edd1f64193e599152d117f01919607807551a.gif',
            'https://64.media.tumblr.com/68eef59876683fa9ea019f65c211e9e2/fe1a6d1d083d0ee2-77/s540x810/5bb1be2e7f0995818ba5a53b79a3e9d248ed75b1.gif',
            'https://64.media.tumblr.com/1d412a3b5e40d7268f150cba0ef60118/0fdf03566d1dc742-b4/s540x810/75c889df12fdf3cbcd39bbadf8151c6fcc5524b7.gif',
            'https://64.media.tumblr.com/f06bba295d92c8a1ac4b04644d87fa02/4ed95858518b3773-1d/s540x810/a99d9b581f1970bc2bf17f334a20d173e4cecec8.gif',
            'https://64.media.tumblr.com/d9a366d16cc21c28815cae7938b14324/832f1fe2d8ed268b-59/s540x810/354b1fe19f7228513023a11bc05a011b48bd9f97.gif',
            'https://64.media.tumblr.com/79b19743db7c922bba082ab11c22a891/6de0e692cf4a6e48-2a/s540x810/dd3ee437ffa146920a7231741f81b57fc3bfb628.gif',
            'https://64.media.tumblr.com/b0b3267562b74b82302b64063fe950ae/50d61d936d363de8-f4/s540x810/42ab8993f54a6454f8b6ce242ff3dfbef4f4b737.gif',
            'https://64.media.tumblr.com/6c93bce34d90b5f3d005ba9bfce1051e/2d9da45749e06f5b-5a/s540x810/9f18d75a2eb70801a207592704a2d61b1599fea6.gif',
            'https://64.media.tumblr.com/cb39cebd0bc0bb454544496d128e580b/eeec6b1ca156d6ba-4f/s540x810/c186d2de451fb72d96aac6440e955e769582386c.gif',
            'https://64.media.tumblr.com/22e49c86c8e76484eab97dada0b55e6d/dd28171e34b6a669-14/s540x810/ed7bb8f3343b3bc47c086c77bad199de268b5bdf.gif',
            'https://64.media.tumblr.com/043bea1830437feffee7b8cfae6007cf/64ecea14c403e371-28/s540x810/f2dada71bf2d8812085f0b709778719a97ddf645.gif',
            'https://64.media.tumblr.com/46f58a3cdd17e3b2d421cad6e5bf05e9/6bba08506c70e6e4-75/s540x810/cddaa47e9da28ff2073b3acabab6a9012c3df5dc.gif',
            'https://64.media.tumblr.com/6ab402128ab8277fc58a3371447e6c77/313075bafda088f2-39/s540x810/b8db4f7c483cc580f94d411ef22cc4306d918a4c.gif',
            'https://64.media.tumblr.com/76f8893de2e55e7211a6f6d72b048db4/6c854ade5f483753-10/s540x810/cde5cb79a3f7bb6885866da70dd94a93ad084413.gif',
            'https://64.media.tumblr.com/78b43b19112117b9b4321d19aff8d997/bc32da8677a697f4-66/s540x810/39033ff9e86ab16a0ba4490b89feead2a073f28d.gif',
            'https://64.media.tumblr.com/ad0bbcf0c1e8734ae3fed2adc3ced495/06fe19ae1641c28b-a3/s540x810/22159ad1460fad34a5785e342b470f0fbb4159d0.gif',
            'https://64.media.tumblr.com/8d67afc675601bfd3ffab59049cb73f1/94f47cdbebf608b0-8f/s540x810/ce800a70860c6edfe21e84ee6338f3f1bf61868c.gif',
            'https://64.media.tumblr.com/3b69854dd59164554be73bb06bf3461f/7a8f208a8074ed52-57/s540x810/3f5c6d129a6be10e44be7bd0424ade129dda44e6.gif',
            'https://64.media.tumblr.com/c62b7f6e280d7e1f28ce8c8d662e00c5/cd588b37b3bf17eb-c0/s540x810/71f8e65d62e5503af7865d288178cf6ad477ddd7.gif',
            'https://64.media.tumblr.com/ffd755962a4b42245cad7a1cac0618de/14b2f7dc80e22cf5-59/s540x810/e2b957f085c727b88011f81853630a2d3df0a059.gif',
            'https://64.media.tumblr.com/71a8b98a51591dd4473e7e22a019f950/75954248af83b339-9f/s540x810/bea067249025767f812dc34fd8e5ea94589d4f0d.gif',
            'https://64.media.tumblr.com/9dde822f71a4009e23ee591548174c1e/60e9bbd9204dba63-bc/s540x810/7753590721af80fba6a1911b4790d594103ac564.gif',
            'https://64.media.tumblr.com/ccc5ff5f33c61ceec1417e36d715022b/16bb96a975ecff87-b3/s540x810/9bc690314088b73f3bac6693bfc92992bbc6f855.gif',
            'https://64.media.tumblr.com/0f0a82f755538ba751b0c192a4763f89/b148ff9775d222e9-66/s540x810/4927f54ed3d63e8ae88e5d33dc77af8ad2508f52.gif',
            'https://64.media.tumblr.com/01a72c93d0d15d0f97793b6e8d5b15cf/8001be2b684fe23d-7e/s540x810/90451a3af51c05fc78d614fc16e4830485afd3b1.gif',
            'https://64.media.tumblr.com/434f42809b416ceaf930bc3fc6ef576e/5fc8f672ba8e2588-dc/s540x810/a6049cf3b9a6ced9e94104c6355ab0a121a9dd20.gif',
            'https://64.media.tumblr.com/60d3e847339cf5805ac3a1d446f553f8/dbdff826aa019aac-9b/s540x810/2e3adc1c75058b83dbb658ed38d1a25e449d8915.gif',
            'https://64.media.tumblr.com/8d3458ff8a37a830304c8137cda43e37/4cba70691f07c4ea-ab/s540x810/391720e3dc87a348d40da60651770f0de2f4ab23.gif',
            'https://64.media.tumblr.com/2b2e6c4d9b82f7a57f914b136e7ad1f6/0457f5ed50e5935d-65/s540x810/a0a813afca7fa7dd21570c49b23f5bf6ae95aadb.gif',
            'https://64.media.tumblr.com/148002e27eafb315a780f59c8095c099/48aa3e7be5526a19-ed/s540x810/c7b8d2c20a1e1f228baa7e7b365efbe1efbfc19a.gif',
            'https://64.media.tumblr.com/978a20b2c6796eb28e8cd41cee318df5/eabbddc6cc2aaff5-86/s540x810/fb1f024335a0dc4232eea54a6cc3a5530d939f95.gif',
            'https://64.media.tumblr.com/763b2bc6196176f80a489b459ddafa64/db4083a1f454d160-e2/s540x810/d95ffb0bffc7d775e5118098d688828b86665f87.gif',
            'https://64.media.tumblr.com/c52211c7081e24e771c7620b275d9f60/7cb422c58c860211-8b/s540x810/9e6121a64df46638d80b08de778e957c0b6b50c8.gif',
            'https://64.media.tumblr.com/09a582d156c69d6973496e554744f551/5b946515fdc22cbf-cf/s540x810/5668326e3c557828c6ed372c970a922b8c4e15cf.gif',
            'https://64.media.tumblr.com/e27addd185fb0d48bee7d1656cfceb6f/6b583ed468700d7b-66/s540x810/c48a43c64e8f86aa34ba685089dc504def0b3bc3.gif',
            'https://64.media.tumblr.com/266165f3dc944b0a17a9472c783dc774/61f58aa5190b8bf1-fb/s540x810/b65dbe78eb4b03fd21821068fea14f3ea3e1f06a.gif',
            'https://64.media.tumblr.com/5a5130b9c0df387c3052c50b704cf515/4d4d054b2ddfddb8-2b/s540x810/b3f5fafea6fcf22a997d19425dc3ddebe7d9fbe5.gif',
            'https://64.media.tumblr.com/5883f1ea7ef2aa6849cb7557caf96b33/ada18b58867596b7-cc/s540x810/a9705b53ebc85bfaae707f8198d294ba8a5eacd7.gif',
            'https://64.media.tumblr.com/91ab0c449624282bcc4f7cbd3c68f4bd/f75549893364f831-d5/s540x810/c3ff9c27c6c4f78bb95446a8c6cb9431ad001960.gif'
        );

        var bgImage = imgArray[Math.floor(Math.random() * imgArray.length)];

        var divBG = document.getElementById('bg');

        divBG.innerHTML = '<img src="' + bgImage + '" />';
    }
    window.addEventListener('load', (event) => {
        randomBackground();
    });