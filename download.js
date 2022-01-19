const fs = require('fs'),
      request = require('request');

const download = function(uri, filename){
    request
        .get(uri, { followAllRedirects: true })
        .on('response', function(response) {
            console.log(response.statusCode)
        })
        .pipe(fs.createWriteStream(filename))
};

const images = [
    [
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/2ac252c64b563f75b02c7935f438017d_4592022834646721379.jpeg",
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/b5c0b819f33ec2192e3964720a4aff31_273669266008440571.jpeg",
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/cc7c5fcc778aeabc03ebe1e03d634924_6789034556239763083.jpeg"
    ],
    [
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/cb55187133c2e7bbaa920b19ef4af4fe_17560327423731422.jpeg",
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/3e9b001a96abf71d3cfaa7cf677aa8fd_26222426471854123.jpeg",
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/3a8a4decffa9b630a53cb5b9353a7c6f_4739111663495868.jpeg"
    ],
    [
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/afb38906cf826d02dd595c6b1dbc443b_3689199053531163850.jpeg",
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/f5e65634396856dcb92a255399507ddc_3778061770029050113.jpeg",
    "https://uploadstatic-sea.mihoyo.com/map_manage/20210719/b23bb81da5bd38e5c604eb4f2558f861_5570714739468966812.jpeg",
    ]
]

indexes = ['0', '256', '512', '768', '1024', '1280', '1536', '1792', '2048', '2304', '2560', '2816', '3072', '3328', '3584', '3840']
rangeMin = -16
rangeMax = 32
const ranges = []
const imagePack = 2

for (let a = rangeMin; a < rangeMax; a++) {
    ranges.push(a)
}

for (row in indexes) {
    for (i in images[imagePack]) {
        for (x in indexes) {
            args = `?x-oss-process=image/resize,p_100/crop,x_${indexes[x]},y_${indexes[row]},w_256,h_256`
            imgPath = `images/6/${ranges[parseInt(x) + (parseInt(i) * 16)]}-${parseInt(row) + (imagePack * 16)}.jpeg`
            download(images[imagePack][i] + args, imgPath);
        }
    }
}
