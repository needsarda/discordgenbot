const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

let prefix = '.'; // 'let' ile prefix değişkenini tanımla
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.user.setActivity('.gg/civciv yardım için .help', { type: 'PLAYING' });
});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'gen') {
        const stockFolder = './stock'; // 'stock' klasörünüzün yolu
        const requestedFile = `${args[0]}.txt`; // Kullanıcının girdiği dosya adı

        const filePath = `${stockFolder}/${requestedFile}`;
        if (fs.existsSync(filePath)) {
            let accounts = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
            if (accounts.length > 0) {
                let accountToSend = accounts.shift(); // İlk hesabı al ve listeden çıkar
                // Kullanıcının DM'ine embed ile gönder
                const embedDM = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Hesap Bilgileri / Discord Server')
                    .setDescription(`\`\`\`${accountToSend}\`\`\``) // Kod blokları içinde hesap bilgisi
                    .setURL('https://discord.gg/civciv')
                    .setImage('https://yandex.com.tr/gorsel/search?cbir_id=12031956%2Fez313ABh8K5MsNNkG8FCMQ5337&cbir_page=similar&img_url=https%3A%2F%2Fimg-9gag-fun.9cache.com%2Fphoto%2FamPGG56_460s.jpg&lr=11504&ogl_url=https%3A%2F%2Fimg-9gag-fun.9cache.com%2Fphoto%2FamPGG56_460s.jpg&p=1&pos=27&redircnt=1716925337.1&rlt_url=https%3A%2F%2Fwallmost.com%2Fwp-content%2Fuploads%2Fduck-holding-a-knife-Fond-decran-telephone-Fond.jpg&rpt=imageview&text=url%3A%22avatars.mds.yandex.net%2Fget-images-cbir%2F12031956%2Fez313ABh8K5MsNNkG8FCMQ5337%2Forig%22&url=https%3A%2F%2Favatars.mds.yandex.net%2Fget-images-cbir%2F12031956%2Fez313ABh8K5MsNNkG8FCMQ5337%2Forig') // Reklam olarak gösterilecek resim
                    .setTimestamp()
                    .setFooter('Gen Bot', client.user.avatarURL());
                await message.author.send(embedDM);

                fs.writeFileSync(filePath, accounts.join('\n')); // Güncellenmiş listeyi dosyaya yaz
                
                // Kanala başarı mesajı embed olarak gönder
                const embedChannel = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('İstenen hesap başarıyla özel mesajlarınıza gönderildi!')
                    .setImage('https://yandex.com.tr/gorsel/search?cbir_id=12031956%2Fez313ABh8K5MsNNkG8FCMQ5337&cbir_page=similar&img_url=https%3A%2F%2Fimg-9gag-fun.9cache.com%2Fphoto%2FamPGG56_460s.jpg&lr=11504&ogl_url=https%3A%2F%2Fimg-9gag-fun.9cache.com%2Fphoto%2FamPGG56_460s.jpg&p=1&pos=27&redircnt=1716925337.1&rlt_url=https%3A%2F%2Fwallmost.com%2Fwp-content%2Fuploads%2Fduck-holding-a-knife-Fond-decran-telephone-Fond.jpg&rpt=imageview&text=url%3A%22avatars.mds.yandex.net%2Fget-images-cbir%2F12031956%2Fez313ABh8K5MsNNkG8FCMQ5337%2Forig%22&url=https%3A%2F%2Favatars.mds.yandex.net%2Fget-images-cbir%2F12031956%2Fez313ABh8K5MsNNkG8FCMQ5337%2Forig') // Reklam olarak gösterilecek resim
                    .setTimestamp()
                    .setFooter('Gen Bot', client.user.avatarURL());
                message.channel.send(embedChannel);
            } else {
                message.channel.send('Stokta hesap kalmadı.');
            }
        } else {
            message.channel.send(`Geçersiz Hesap.`);
        }
    }
    if (command === 'stock') {
        const stockFolder = './stock'; // 'stock' klasörünüzün yolu
        fs.readdir(stockFolder, (err, files) => {
            if (err) {
                return message.channel.send('Stok klasörü okunamadı!');
            }

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stok Durumu')
                .setDescription('Stok Listesi:')
                .setTimestamp()
                .setImage('https://cdn.discordapp.com/attachments/1233504291717910548/1236594938863554642/standard.gif?ex=66389448&is=663742c8&hm=39bfa6d1d44b8f937fdf0c76c3ab028c64bfbdf96b07394191d26f4cca8037b7&') // Reklam olarak gösterilecek resim
                .setFooter('Gen Bot', client.user.avatarURL());
                

            files.forEach(file => {
                if (file.endsWith('.txt')) {
                    const filePath = `${stockFolder}/${file}`;
                    const stockCount = fs.readFileSync(filePath, 'utf-8').trim().split('\n').filter(Boolean).length;
                    embed.addField(file, `${stockCount} adet stok`, true);
                }
            });

            message.channel.send(embed);
        });
    }
    if (command === 'prefix') {
        const newPrefix = args[0];
        if (newPrefix) { // Yeni prefix'in geçerli olduğunu kontrol et
            prefix = newPrefix; // Prefix değişkenini güncelle
            message.channel.send(`Komut öneki '${newPrefix}' olarak ayarlandı.`);
        } else {
            message.channel.send('Lütfen geçerli bir komut öneki girin.');
        }
    } else if (command === 'help') {
        // Yardım mesajını gönder
        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000') // Kırmızı renk için hex kodu
            .setTitle('Yardım Menüsü')
            .setDescription(`Şu anki komut Prefixi: \`${prefix}\``)
            .addField(`${prefix}gen [hesap adı adı]`, 'Belirtilen dosyadan bir hesap alır ve DM yoluyla gönderir.')
            .addField(`${prefix}stock`, 'Mevcut tüm stokları ve miktarlarını gösterir.')
            .addField(`${prefix}prefix`, 'Belirtilen prefixi değiştirir.')
            .addField(`${prefix}help`, 'Mevcut tüm komutları ve açıklamalarını gösterir.')
            .setImage('https://cdn.discordapp.com/attachments/1233504291717910548/1236594938863554642/standard.gif?ex=66389448&is=663742c8&hm=39bfa6d1d44b8f937fdf0c76c3ab028c64bfbdf96b07394191d26f4cca8037b7&') // Reklam olarak gösterilecek resim
            .setTimestamp()
            .setFooter('Gen Bot', client.user.avatarURL());

        message.channel.send(embed);
    }
});

client.login(process.env.TOKEN);
